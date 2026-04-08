package org.example.eventpi.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
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

        } catch (Exception e) {
            log.error("Groq API call failed: {}", e.getMessage());
            throw new RuntimeException("Failed to generate description. Please try again.");
        }
    }

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