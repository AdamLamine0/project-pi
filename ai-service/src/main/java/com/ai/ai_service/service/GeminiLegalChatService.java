package com.ai.ai_service.service;

import com.ai.ai_service.config.AiProperties;
import com.ai.ai_service.dto.LegalChatRequest;
import com.ai.ai_service.dto.LegalChatResponse;
import com.fasterxml.jackson.databind.JsonNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.time.Duration;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class GeminiLegalChatService {

    private static final Logger log = LoggerFactory.getLogger(GeminiLegalChatService.class);

    private static final String DISCLAIMER =
            "Informational AI-generated response. Confirm sensitive points with a legal expert.";

    private final AiProperties properties;
    private final WebClient.Builder webClientBuilder;

    public GeminiLegalChatService(AiProperties properties, WebClient.Builder webClientBuilder) {
        this.properties = properties;
        this.webClientBuilder = webClientBuilder;
    }

    public LegalChatResponse answer(LegalChatRequest request) {
        if (request == null || request.question() == null || request.question().isBlank()) {
            return new LegalChatResponse("Ask a legal question to get an answer.", false, DISCLAIMER);
        }
        if (!properties.getGemini().isEnabled()) {
            return unavailable("Gemini disabled", request);
        }
        if (properties.getGemini().getApiKey() == null || properties.getGemini().getApiKey().isBlank()) {
            return unavailable("Gemini API key is missing", request);
        }

        WebClient client = webClientBuilder
                .baseUrl(properties.getGemini().getBaseUrl())
                .build();

        String lastError = "Gemini temporarily unavailable";
        for (String model : modelCandidates()) {
            try {
                JsonNode response = generateContent(client, model, buildPayload(request, model));
                String answer = readText(response);
                if (answer.isBlank()) {
                    lastError = describeEmptyResponse(response);
                    continue;
                }
                return new LegalChatResponse(answer, true, DISCLAIMER);
            } catch (WebClientResponseException e) {
                lastError = "Gemini HTTP " + e.getStatusCode().value() + ": " + readApiError(e);
                if (!isRetryable(e)) {
                    break;
                }
            } catch (RuntimeException e) {
                lastError = e.getMessage();
                break;
            }
        }

        log.warn("Gemini legal chat unavailable: {}", lastError);
        return unavailable(lastError, request);
    }

    private Map<String, Object> buildPayload(LegalChatRequest request, String model) {
        Map<String, Object> generationConfig = model != null && model.startsWith("gemini-2.5")
                ? Map.of(
                        "temperature", 0.15,
                        "maxOutputTokens", 1200,
                        "thinkingConfig", Map.of("thinkingBudget", 0)
                )
                : Map.of(
                        "temperature", 0.15,
                        "maxOutputTokens", 1200
                );

        return Map.of(
                "contents", List.of(Map.of(
                        "role", "user",
                        "parts", List.of(Map.of("text", buildPrompt(request)))
                )),
                "generationConfig", generationConfig
        );
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
        JsonNode body = null;
        try {
            body = new com.fasterxml.jackson.databind.ObjectMapper().readTree(e.getResponseBodyAsString());
        } catch (RuntimeException | com.fasterxml.jackson.core.JsonProcessingException ignored) {
            // Fall through to a generic message.
        }
        if (body != null) {
            String status = body.path("error").path("status").asText("");
            String message = body.path("error").path("message").asText("");
            if (!status.isBlank() && !message.isBlank()) {
                return status + " - " + message;
            }
            if (!message.isBlank()) {
                return message;
            }
        }
        return e.getMessage();
    }

    private String buildPrompt(LegalChatRequest request) {
        return """
                You are a procedure support assistant for an entrepreneur platform.
                Help the user understand the current procedure, documents, status, and next action.
                Do not provide definitive legal advice or promise administrative approval.
                If expert validation is needed, say that an expert must confirm.

                Available procedure catalog:
                - SARL: creation of a Limited Liability Company with multiple shareholders.
                - SUARL: creation of a Single-Member Limited Liability Company with one shareholder.
                - LABEL_STARTUP: startup label application, innovative project, pitch deck, proof of concept.
                - PI: intellectual property, filing/protection of an idea, trademark, creation, or technical asset.
                - FISCALITE: tax assistance, tax documents, declarations, tax situation.
                - CONFORMITE: document compliance review, updated bylaws, RNE, supporting documents.

                Reply format:
                - Use the same language as the user's question when obvious; otherwise use English.
                - Start with a direct answer.
                - Add 2 to 4 practical bullets when useful.
                - End with "Next action:" and one concrete action.
                - If no procedureType is provided, recommend the best procedure and start with "Procedure conseillee: <name>".

                Case context:
                procedureType=%s
                procedureStatus=%s
                projectName=%s
                requiredDocuments=%s
                uploadedDocuments=%s
                missingDocuments=%s
                progressionDocuments=%s/%s

                Historique recent:
                %s

                Question:
                %s
                """.formatted(
                nullToDash(request.procedureType()),
                nullToDash(request.procedureStatus()),
                nullToDash(request.projectName()),
                request.requiredDocuments() == null ? List.of() : request.requiredDocuments(),
                request.uploadedDocuments() == null ? List.of() : request.uploadedDocuments(),
                request.missingDocuments() == null ? List.of() : request.missingDocuments(),
                request.uploadedDocuments() == null ? 0 : request.uploadedDocuments().size(),
                request.requiredDocuments() == null ? 0 : request.requiredDocuments().size(),
                formatHistory(request.history()),
                request.question()
        );
    }

    private String formatHistory(List<LegalChatRequest.ChatMessage> history) {
        if (history == null || history.isEmpty()) {
            return "-";
        }
        int fromIndex = Math.max(0, history.size() - 8);
        return history.subList(fromIndex, history.size())
                .stream()
                .map(message -> nullToDash(message.role()) + ": " + nullToDash(message.text()))
                .reduce((left, right) -> left + "\n" + right)
                .orElse("-");
    }

    private String readText(JsonNode response) {
        if (response == null) {
            return "";
        }
        JsonNode parts = response.path("candidates").path(0).path("content").path("parts");
        if (!parts.isArray()) {
            return "";
        }
        StringBuilder text = new StringBuilder();
        parts.forEach(part -> text.append(part.path("text").asText("")));
        return text.toString().trim();
    }

    private String describeEmptyResponse(JsonNode response) {
        if (response == null) {
            return "Gemini returned an empty response";
        }
        String blockReason = response.path("promptFeedback").path("blockReason").asText("");
        if (!blockReason.isBlank()) {
            return "Gemini blocked the prompt: " + blockReason;
        }
        String finishReason = response.path("candidates").path(0).path("finishReason").asText("");
        if (!finishReason.isBlank()) {
            return "Gemini returned no text. finishReason=" + finishReason;
        }
        return "Gemini returned an empty response";
    }

    private String nullToDash(String value) {
        return value == null || value.isBlank() ? "-" : value;
    }

    private LegalChatResponse unavailable(String reason, LegalChatRequest request) {
        String answer = fallbackAnswer(request);
        if (reason != null && (reason.contains("API key") || reason.contains("403") || reason.contains("401"))) {
            answer += "\n\nNote: Gemini is not connected for live reasoning, so this answer is based only on the case data already loaded in the platform.";
        }
        return new LegalChatResponse(answer, false, DISCLAIMER);
    }

    private String fallbackAnswer(LegalChatRequest request) {
        String procedureType = nullToDash(request == null ? null : request.procedureType());
        String projectName = nullToDash(request == null ? null : request.projectName());
        String status = nullToDash(request == null ? null : request.procedureStatus());
        List<String> missingDocuments = request == null || request.missingDocuments() == null
                ? List.of()
                : request.missingDocuments();
        List<String> uploadedDocuments = request == null || request.uploadedDocuments() == null
                ? List.of()
                : request.uploadedDocuments();
        String question = request == null ? "" : nullToDash(request.question()).toLowerCase();

        if ("-".equals(procedureType)) {
            return """
                    Procedure conseillee: SARL or SUARL, depending on the number of founders.
                    - Choose SARL if the company has several shareholders.
                    - Choose SUARL if there is one founder/shareholder.
                    - For an innovative startup project, LABEL_STARTUP may be the better procedure.
                    Next action: Choose the procedure type, then prepare the required identity and project documents.
                    """.trim();
        }

        if (question.contains("document") || question.contains("prepare") || !missingDocuments.isEmpty()) {
            if (missingDocuments.isEmpty()) {
                return """
                        All required documents currently appear uploaded for %s.
                        - Uploaded documents: %s.
                        - The case can move forward if the files are readable, coherent, and still valid.
                        Next action: Run the AI analysis or wait for the expert review if the case is already submitted.
                        """.formatted(procedureLabel(procedureType), formatList(uploadedDocuments)).trim();
            }
            return """
                    You still need to prepare missing documents for %s.
                    - Missing document%s: %s.
                    - Upload clear, readable files and make sure dates, names, and company information match.
                    Next action: Upload %s, then relaunch the analysis.
                    """.formatted(
                    procedureLabel(procedureType),
                    missingDocuments.size() > 1 ? "s" : "",
                    formatList(missingDocuments),
                    missingDocuments.get(0)
            ).trim();
        }

        if ("EN_ATTENTE_EXPERT".equalsIgnoreCase(status)) {
            return """
                    Your %s case for %s is waiting for expert review.
                    - The automated checks are complete.
                    - An expert must now confirm the final decision.
                    Next action: Wait for the expert decision, or review the uploaded documents if you notice an error.
                    """.formatted(procedureLabel(procedureType), projectName).trim();
        }

        return """
                Your %s case for %s is currently in status %s.
                - Make sure all required documents are uploaded.
                - Documents should be readable, coherent with the procedure, and not expired.
                Next action: If all documents are ready, submit the case or run the AI analysis.
                """.formatted(procedureLabel(procedureType), projectName, status).trim();
    }

    private String procedureLabel(String procedureType) {
        return switch (procedureType) {
            case "SARL" -> "SARL company creation";
            case "SUARL" -> "SUARL single-member company creation";
            case "LABEL_STARTUP" -> "Startup Label";
            case "PI" -> "intellectual property";
            case "FISCALITE" -> "tax support";
            case "CONFORMITE" -> "compliance";
            default -> procedureType;
        };
    }

    private String formatList(List<String> values) {
        if (values == null || values.isEmpty()) {
            return "none";
        }
        return String.join(", ", values);
    }
}
