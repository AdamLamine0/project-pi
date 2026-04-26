package org.example.eventpi.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.eventpi.dto.ProgramSlotDraft;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class GeminiService {

    @Value("${groq.api.key}")
    private String apiKey;

    @Value("${groq.api.url}")
    private String apiUrl;

    @Value("${groq.api.model}")
    private String model;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public String generateEventDescription(String title, String date, String eventType) {
        String prompt = buildPrompt(title, date, eventType);

        Map<String, Object> body = Map.of(
                "model", model,
                "messages", List.of(
                        Map.of("role", "user", "content", prompt)
                ),
                "temperature", 0.7,
                "max_tokens", 512
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(
                    apiUrl, request, String.class
            );
            log.info("Groq raw response: {}", response.getBody());
            return extractText(response.getBody());

        } catch (HttpStatusCodeException e) {
            log.error("Groq API returned HTTP {}: {}", e.getStatusCode(), e.getResponseBodyAsString());
            if (e.getStatusCode().value() == 401) {
                throw new RuntimeException("Groq API key is invalid or expired. Please regenerate it at console.groq.com.");
            }
            throw new RuntimeException("Failed to generate description. Please try again.");
        } catch (Exception e) {
            log.error("Groq API call failed", e);
            throw new RuntimeException("Failed to generate description. Please try again.");
        }
    }

    // ── PROGRAM GENERATION ────────────────────────────────────────────────

    /**
     * Calls the Groq API to generate a structured program schedule.
     *
     * @param title     event title
     * @param eventType event type name (e.g. CONFERENCE, WORKSHOP)
     * @param location  physical location or format (e.g. "En ligne", "Paris")
     * @return parsed list of slot drafts ready to be persisted
     */
    public List<ProgramSlotDraft> generateProgram(String title,
                                                   String eventType,
                                                   String location) {
        String prompt = buildProgramPrompt(title, eventType, location);

        Map<String, Object> body = Map.of(
                "model", model,
                "messages", List.of(
                        Map.of("role", "system", "content",
                                "You are an expert event planner. You always respond with valid JSON only, "
                                + "no markdown, no explanation, no code fences."),
                        Map.of("role", "user", "content", prompt)
                ),
                "temperature", 0.6,
                "max_tokens", 1024
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(
                    apiUrl, request, String.class);
            String raw = extractText(response.getBody());
            log.debug("AI program raw response: {}", raw);
            return parseProgramSlots(raw);
        } catch (HttpStatusCodeException e) {
            log.error("Groq API returned HTTP {} during program generation: {}", e.getStatusCode(), e.getResponseBodyAsString());
            if (e.getStatusCode().value() == 401) {
                throw new RuntimeException("Groq API key is invalid or expired. Please regenerate it at console.groq.com.");
            }
            throw new RuntimeException("Failed to generate program. Please try again.");
        } catch (RuntimeException e) {
            throw e;
        } catch (Exception e) {
            log.error("Groq program generation failed", e);
            throw new RuntimeException("Failed to generate program. Please try again.");
        }
    }

    private String buildProgramPrompt(String title, String eventType, String location) {
        return String.format(
                "Generate a realistic agenda for the following event.\n\n"
                + "Event title: \"%s\"\n"
                + "Event type: %s\n"
                + "Location: %s\n\n"
                + "Return a JSON array of 4 to 8 slots. "
                + "Each slot must have exactly these fields:\n"
                + "  \"title\": concise slot title specific to the event topic,\n"
                + "  \"description\": one or two sentences describing the slot,\n"
                + "  \"type\": one of PRESENTATION | KEYNOTE | WORKSHOP | QA | BREAK,\n"
                + "  \"durationMinutes\": integer between 15 and 120.\n\n"
                + "Slot mix guidelines:\n"
                + "- CONFERENCE: KEYNOTE opener, 2-4 PRESENTATION, 1-2 QA, 1 BREAK\n"
                + "- WORKSHOP: PRESENTATION intro, 2-3 WORKSHOP, 1 QA, 1 BREAK\n"
                + "- WEBINAIRE: 2-3 PRESENTATION, 1 QA, no BREAK\n"
                + "- BOOTCAMP: PRESENTATION intro, 3-4 WORKSHOP, 2 BREAK, final QA\n"
                + "- PITCH: brief PRESENTATION intro, 4-6 PRESENTATION pitches, final QA\n\n"
                + "Respond with the JSON array only.",
                title, eventType, location
        );
    }

    private List<ProgramSlotDraft> parseProgramSlots(String raw) {
        String cleaned = raw.trim();

        // Strip markdown code fences (```json ... ``` or ``` ... ```)
        if (cleaned.startsWith("```")) {
            cleaned = cleaned.replaceFirst("^```[a-zA-Z]*\\r?\\n?", "")
                             .replaceFirst("```\\s*$", "")
                             .trim();
        }

        // Locate the JSON array if surrounded by prose
        int start = cleaned.indexOf('[');
        int end   = cleaned.lastIndexOf(']');
        if (start != -1 && end != -1 && end > start) {
            cleaned = cleaned.substring(start, end + 1);
        }

        try {
            return objectMapper.readValue(
                    cleaned,
                    objectMapper.getTypeFactory()
                                .constructCollectionType(List.class, ProgramSlotDraft.class)
            );
        } catch (Exception e) {
            log.error("Cannot parse AI program JSON: {}", cleaned, e);
            throw new RuntimeException(
                    "The AI returned an unexpected format. Please try again.");
        }
    }

    // ── DESCRIPTION GENERATION ────────────────────────────────────────────

    private String buildPrompt(String title, String date, String eventType) {
        return String.format(
                "Generate a professional and engaging event description for the following event. " +
                        "Event title: \"%s\". Event date: %s. Event type: %s. " +
                        "Write 2-3 concise paragraphs. Do not include placeholders or generic filler text. " +
                        "Respond with the description only, no extra formatting.",
                title, date, eventType != null ? eventType : "general"
        );
    }

    private String extractText(String responseBody) throws Exception {
        JsonNode root = objectMapper.readTree(responseBody);
        return root
                .path("choices").get(0)
                .path("message")
                .path("content")
                .asText();
    }
}