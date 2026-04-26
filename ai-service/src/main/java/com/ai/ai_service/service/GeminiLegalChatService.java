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
            "Reponse informative generee par IA. Confirmez les points sensibles avec un expert juridique.";

    private final AiProperties properties;
    private final WebClient.Builder webClientBuilder;

    public GeminiLegalChatService(AiProperties properties, WebClient.Builder webClientBuilder) {
        this.properties = properties;
        this.webClientBuilder = webClientBuilder;
    }

    public LegalChatResponse answer(LegalChatRequest request) {
        if (request == null || request.question() == null || request.question().isBlank()) {
            return new LegalChatResponse("Posez une question juridique pour obtenir une reponse.", false, DISCLAIMER);
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
                Tu es un assistant juridique francophone integre dans une plateforme de procedures.
                Ta mission est d'aider un entrepreneur a comprendre son dossier courant et les actions utiles.

                Regles de comprehension:
                - Reponds toujours par rapport au dossier fourni, pas de maniere generique.
                - Si aucun procedureId/procedureType n'est fourni, tu es en mode orientation: aide l'utilisateur a choisir une procedure parmi le catalogue.
                - Si la question est vague, deduis l'intention la plus probable depuis le statut, les documents manquants et l'historique.
                - Si l'utilisateur demande "quoi faire", donne les prochaines actions classees par priorite.
                - Si l'utilisateur demande un terme court ou un acronyme, explique simplement puis relie-le a la procedure.
                - Si un document manque, cite son nom exact et explique quoi preparer.
                - Si le dossier est refuse ou contient des remarques, aide a corriger avant resoumission.
                - Si le dossier est en attente expert, explique que l'utilisateur doit attendre la decision expert sauf demande de precision.
                - Si le dossier est complet, explique comment utiliser le document final.

                Limites:
                - Ne promets pas une validation administrative certaine.
                - Ne donne pas de conseil juridique definitif; recommande l'expert pour les points sensibles.
                - Si une information manque dans le contexte, dis-le et propose la meilleure verification.

                Format attendu:
                - Reponds en francais.
                - Commence par une reponse directe en 1 phrase.
                - Puis ajoute 2 a 5 puces pratiques si utile.
                - Termine par "Prochaine action:" avec une action concrete.
                - Evite les longs paragraphes.

                Catalogue des procedures disponibles:
                - SARL: creation d'une Societe a Responsabilite Limitee, avec plusieurs associes.
                - SUARL: creation d'une Societe Unipersonnelle a Responsabilite Limitee, avec associe unique.
                - LABEL_STARTUP: demande de label startup, projet innovant, pitch deck, preuve de concept.
                - PI: propriete intellectuelle, depot/protection d'une idee, marque, creation, actif technique.
                - FISCALITE: assistance fiscale, documents fiscaux, declarations, situation fiscale.
                - CONFORMITE: verification de conformite documentaire, statuts a jour, RNE, justificatifs.

                En mode orientation:
                - Commence par "Procedure conseillee: <nom>".
                - Explique pourquoi en 2 ou 3 puces.
                - Cite les premiers documents a preparer si possible.
                - Si deux procedures sont plausibles, donne l'option principale et l'alternative.

                Contexte dossier:
                procedureId=%s
                procedureType=%s
                procedureStatus=%s
                projectName=%s
                documentsObligatoires=%s
                documentsDeposes=%s
                documentsManquants=%s
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
                ? "Le chatbot juridique est indisponible car la configuration Gemini doit etre verifiee."
                : "Le chatbot juridique est temporairement indisponible car Gemini est surcharge. Reessayez dans quelques instants.";
        return new LegalChatResponse(answer, false, DISCLAIMER);
    }
}
