package com.ai.ai_service.service;

import com.ai.ai_service.config.AiProperties;
import com.ai.ai_service.dto.AiDecision;
import com.ai.ai_service.dto.LegalAiAnalysisRequest;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.time.Duration;
import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class GeminiLegalReasoningService {

    private static final Logger log = LoggerFactory.getLogger(GeminiLegalReasoningService.class);

    private final AiProperties properties;
    private final WebClient.Builder webClientBuilder;
    private final ObjectMapper objectMapper;

    public GeminiLegalReasoningService(
            AiProperties properties,
            WebClient.Builder webClientBuilder,
            ObjectMapper objectMapper
    ) {
        this.properties = properties;
        this.webClientBuilder = webClientBuilder;
        this.objectMapper = objectMapper;
    }

    public LlmVerdict analyze(
            LegalAiAnalysisRequest request,
            List<LlmDocumentContext> documents,
            List<String> technicalFindings
    ) {
        if (!properties.getGemini().isEnabled()) {
            return LlmVerdict.unavailable("Gemini disabled");
        }
        if (properties.getGemini().getApiKey() == null || properties.getGemini().getApiKey().isBlank()) {
            return LlmVerdict.unavailable("Gemini API key is missing. Set GEMINI_API_KEY.");
        }

        WebClient client = webClientBuilder.baseUrl(properties.getGemini().getBaseUrl()).build();
        Map<String, Object> payload = Map.of(
                "contents", List.of(Map.of(
                        "role", "user",
                        "parts", List.of(Map.of("text", buildPrompt(request, documents, technicalFindings)))
                )),
                "generationConfig", Map.of(
                        "temperature", 0.1,
                        "responseMimeType", "application/json"
                )
        );

        String lastError = "Gemini temporarily unavailable";
        for (String model : modelCandidates()) {
            try {
                JsonNode response = generateContent(client, model, payload);
                String raw = readGeminiText(response);
                if (raw.isBlank()) {
                    lastError = "Gemini returned an empty response";
                    continue;
                }

                JsonNode verdict = objectMapper.readTree(extractJsonObject(raw));
                AiDecision decision = parseDecision(verdict.path("decision").asText("REVIEW"));
                String remark = verdict.path("remark").asText("Gemini analysis completed.");
                List<String> findings = readFindings(verdict.path("incoherences"));
                return new LlmVerdict(true, decision, remark, findings, null);
            } catch (WebClientResponseException e) {
                lastError = "Gemini HTTP " + e.getStatusCode().value() + ": " + readApiError(e);
                if (!isRetryable(e)) {
                    break;
                }
            } catch (RuntimeException | JsonProcessingException e) {
                lastError = e.getMessage();
                break;
            }
        }

        log.warn("Gemini legal analysis unavailable: {}", lastError);
        return LlmVerdict.unavailable(lastError);
    }

    private JsonNode generateContent(WebClient client, String model, Map<String, Object> payload) {
        return client.post()
                .uri(uriBuilder -> uriBuilder
                        .path("/v1beta/models/{model}:generateContent")
                        .build(model))
                .header("x-goog-api-key", properties.getGemini().getApiKey())
                .bodyValue(payload)
                .retrieve()
                .bodyToMono(JsonNode.class)
                .timeout(Duration.ofSeconds(properties.getGemini().getTimeoutSeconds()))
                .block();
    }

    private List<String> modelCandidates() {
        Set<String> models = new LinkedHashSet<>();
        if (properties.getGemini().getModel() != null && !properties.getGemini().getModel().isBlank()) {
            models.add(properties.getGemini().getModel());
        }
        if (properties.getGemini().getFallbackModels() != null) {
            properties.getGemini().getFallbackModels().stream()
                    .filter(model -> model != null && !model.isBlank())
                    .forEach(models::add);
        }
        return new ArrayList<>(models);
    }

    private boolean isRetryable(WebClientResponseException e) {
        int status = e.getStatusCode().value();
        return status == 429 || status == 500 || status == 502 || status == 503 || status == 504;
    }

    private String readApiError(WebClientResponseException e) {
        String body = e.getResponseBodyAsString();
        if (body == null || body.isBlank()) {
            return e.getMessage();
        }
        try {
            JsonNode error = objectMapper.readTree(body).path("error");
            String message = error.path("message").asText("");
            String status = error.path("status").asText("");
            if (!message.isBlank() && !status.isBlank()) {
                return status + " - " + message;
            }
            if (!message.isBlank()) {
                return message;
            }
        } catch (JsonProcessingException ignored) {
            // Fall through and return the raw body.
        }
        return body;
    }

    private String buildPrompt(
            LegalAiAnalysisRequest request,
            List<LlmDocumentContext> documents,
            List<String> technicalFindings
    ) {
        StringBuilder builder = new StringBuilder();
        builder.append("""
                You are a cloud legal assistant for a legal support module.
                Analyze the full case using local OCR text and OpenCV/rule-based technical alerts.
                Never validate an expired document. If OCR or image quality is insufficient, choose REVIEW.
                Return strict JSON only:
                {"decision":"VALID|REJECTED|REVIEW","remark":"explication courte","incoherences":["..."]}

                Case:
                """);
        builder.append("procedureType=").append(request.procedureType()).append('\n');
        builder.append("projectName=").append(request.projectName()).append('\n');

        builder.append("\nAlertes techniques:\n");
        if (technicalFindings.isEmpty()) {
            builder.append("- No technical alerts.\n");
        } else {
            technicalFindings.forEach(finding -> builder.append("- ").append(finding).append('\n'));
        }

        builder.append("\nDocuments OCR:\n");
        for (LlmDocumentContext document : documents) {
            builder.append("\n--- Document ").append(document.requirementCode()).append(" ---\n");
            builder.append("blurred=").append(document.blurred()).append('\n');
            builder.append("expiration=").append(document.detectedExpirationDate()).append('\n');
            builder.append("findings=").append(document.findings()).append('\n');
            builder.append("text=\n").append(limit(document.text(), 2500)).append('\n');
        }

        return builder.toString();
    }

    private String readGeminiText(JsonNode response) {
        if (response == null) {
            return "";
        }
        JsonNode parts = response.path("candidates").path(0).path("content").path("parts");
        if (!parts.isArray() || parts.isEmpty()) {
            JsonNode blockReason = response.path("promptFeedback").path("blockReason");
            return blockReason.isMissingNode() ? "" : "{\"decision\":\"REVIEW\",\"remark\":\"Gemini blocked the prompt: "
                    + blockReason.asText()
                    + "\",\"incoherences\":[]}";
        }
        StringBuilder text = new StringBuilder();
        parts.forEach(part -> text.append(part.path("text").asText("")));
        return text.toString().trim();
    }

    private String extractJsonObject(String value) {
        String trimmed = value.trim();
        if (trimmed.startsWith("```")) {
            trimmed = trimmed.replaceFirst("^```(?:json)?", "").replaceFirst("```$", "").trim();
        }
        int start = trimmed.indexOf('{');
        int end = trimmed.lastIndexOf('}');
        if (start >= 0 && end > start) {
            return trimmed.substring(start, end + 1);
        }
        return trimmed;
    }

    private String limit(String value, int maxLength) {
        if (value == null || value.length() <= maxLength) {
            return value == null ? "" : value;
        }
        return value.substring(0, maxLength) + "...";
    }

    private AiDecision parseDecision(String raw) {
        try {
            return AiDecision.valueOf(raw.trim().toUpperCase());
        } catch (RuntimeException e) {
            return AiDecision.REVIEW;
        }
    }

    private List<String> readFindings(JsonNode node) {
        if (node == null || !node.isArray()) {
            return List.of();
        }

        List<String> findings = new ArrayList<>();
        node.forEach(item -> {
            if (item != null && !item.asText("").isBlank()) {
                findings.add(item.asText());
            }
        });
        return findings;
    }

    public record LlmDocumentContext(
            String requirementCode,
            String text,
            boolean blurred,
            LocalDate detectedExpirationDate,
            List<String> findings
    ) {}

    public record LlmVerdict(
            boolean available,
            AiDecision decision,
            String remark,
            List<String> findings,
            String error
    ) {
        public static LlmVerdict unavailable(String error) {
            return new LlmVerdict(
                    false,
                    AiDecision.REVIEW,
                    userSafeUnavailableRemark(error),
                    List.of(),
                    error
            );
        }

        private static String userSafeUnavailableRemark(String error) {
            if (error != null && (error.contains("API key") || error.contains("403") || error.contains("401"))) {
                return "Gemini analysis is unavailable because the API configuration must be checked. The case is sent to the expert for manual review.";
            }
            return "Gemini analysis is temporarily unavailable. OCR/OpenCV checks were completed and the case is sent to the expert for manual review.";
        }
    }
}
