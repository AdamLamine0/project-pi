package com.ai.ai_service.service;

import com.ai.ai_service.config.AiProperties;
import com.ai.ai_service.dto.LegalChatRequest;
import com.ai.ai_service.dto.LegalChatResponse;
import com.fasterxml.jackson.databind.JsonNode;
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
            return unavailable("Gemini disabled");
        }
        if (properties.getGemini().getApiKey() == null || properties.getGemini().getApiKey().isBlank()) {
            return unavailable("Gemini API key is missing");
        }

        Map<String, Object> payload = Map.of(
                "contents", List.of(Map.of(
                        "role", "user",
                        "parts", List.of(Map.of("text", buildPrompt(request)))
                )),
                "generationConfig", Map.of(
                        "temperature", 0.15,
                        "maxOutputTokens", 1200
                )
        );

        WebClient client = webClientBuilder
                .baseUrl(properties.getGemini().getBaseUrl())
                .build();

        String lastError = "Gemini temporarily unavailable";
        for (String model : modelCandidates()) {
            try {
                JsonNode response = generateContent(client, model, payload);
                String answer = readText(response);
                if (answer.isBlank()) {
                    lastError = "Gemini returned an empty response";
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

        return unavailable(lastError);
    }

    private JsonNode generateContent(WebClient client, String model, Map<String, Object> payload) {
        return client.post()
                .uri(uriBuilder -> uriBuilder
                        .path("/v1beta/models/{model}:generateContent")
                        .queryParam("key", properties.getGemini().getApiKey())
                        .build(model))
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
                You are an English-speaking legal assistant integrated into a procedures platform.
                Your mission is to help an entrepreneur understand the current case and useful next actions.

                Regles de comprehension:
                - Always answer based on the provided case, not generically.
                - If no procedureId/procedureType is provided, you are in guidance mode: help the user choose a procedure from the catalog.
                - If the question is vague, infer the most likely intent from the status, missing documents, and history.
                - If the user asks "what should I do", give the next actions ranked by priority.
                - If the user asks about a short term or acronym, explain it simply and connect it to the procedure.
                - If a document is missing, cite its exact name and explain what to prepare.
                - If the case is rejected or contains remarks, help fix it before resubmission.
                - If the case is waiting for expert review, explain that the user should wait for the expert decision unless they ask for clarification.
                - If the case is completed, explain how to use the final document.

                Limites:
                - Ne promets pas une validation administrative certaine.
                - Do not give definitive legal advice; recommend the expert for sensitive points.
                - If information is missing from the context, say so and suggest the best verification.

                Format attendu:
                - Answer in English.
                - Commence par une reponse directe en 1 phrase.
                - Then add 2 to 5 practical bullet points when useful.
                - End with "Next action:" and one concrete action.
                - Avoid long paragraphs.

                Catalogue des procedures disponibles:
                - SARL: creation of a Limited Liability Company with multiple shareholders.
                - SUARL: creation of a Single-Member Limited Liability Company with one shareholder.
                - LABEL_STARTUP: startup label application, innovative project, pitch deck, proof of concept.
                - IP: intellectual property, filing/protection of an idea, trademark, creation, or technical asset.
                - TAX SUPPORT: tax assistance, tax documents, declarations, tax situation.
                - COMPLIANCE: document compliance review, updated bylaws, RNE, supporting documents.

                En mode orientation:
                - Commence par "Procedure conseillee: <nom>".
                - Explique pourquoi en 2 ou 3 puces.
                - Mention the first documents to prepare when possible.
                - If two procedures are plausible, give the main option and the alternative.

                Case context:
                procedureId=%s
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
                request.procedureId(),
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

    private String nullToDash(String value) {
        return value == null || value.isBlank() ? "-" : value;
    }

    private LegalChatResponse unavailable(String reason) {
        String answer = reason != null && (reason.contains("API key") || reason.contains("403") || reason.contains("401"))
                ? "The legal chatbot is unavailable because the Gemini configuration must be checked."
                : "The legal chatbot is temporarily unavailable because Gemini is overloaded. Please try again shortly.";
        return new LegalChatResponse(answer, false, DISCLAIMER);
    }
}
