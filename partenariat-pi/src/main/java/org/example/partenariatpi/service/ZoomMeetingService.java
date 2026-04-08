package org.example.partenariatpi.service;

import tools.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestClient;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Service
public class ZoomMeetingService {

    private static final DateTimeFormatter ZOOM_TIME_FORMAT = DateTimeFormatter.ISO_OFFSET_DATE_TIME;

    private final RestClient restClient = RestClient.builder().build();

    @Value("${zoom.client-id:}")
    private String clientId;

    @Value("${zoom.client-secret:}")
    private String clientSecret;

    @Value("${zoom.account-id:}")
    private String accountId;

    @Value("${zoom.user-id:me}")
    private String userId;

    @Value("${zoom.base-url:https://api.zoom.us}")
    private String zoomBaseUrl;

    public ZoomMeetingData createMeeting(String topic, LocalDateTime startAt, Integer durationMinutes, String agenda) {
        String token = fetchAccessToken();

        Map<String, Object> payload = new HashMap<>();
        payload.put("topic", topic);
        payload.put("type", 2);
        payload.put("start_time", startAt.atOffset(ZoneOffset.UTC).format(ZOOM_TIME_FORMAT));
        payload.put("duration", durationMinutes == null ? 30 : durationMinutes);
        payload.put("timezone", "UTC");
        payload.put("agenda", agenda);

        JsonNode response = restClient.post()
                .uri(zoomBaseUrl + "/v2/users/" + userId + "/meetings")
                .contentType(MediaType.APPLICATION_JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                .body(payload)
                .retrieve()
                .body(JsonNode.class);

        if (response == null || response.get("id") == null) {
            throw new RuntimeException("Zoom meeting creation failed: empty response");
        }

        return new ZoomMeetingData(
                response.get("id").asText(),
                response.path("join_url").asText(""),
                response.path("start_url").asText(""),
                response.path("password").asText("")
        );
    }

    private String fetchAccessToken() {
        if (!StringUtils.hasText(clientId) || !StringUtils.hasText(clientSecret) || !StringUtils.hasText(accountId)) {
            throw new RuntimeException("Zoom credentials are missing: set zoom.client-id, zoom.client-secret and zoom.account-id");
        }

        String auth = Base64.getEncoder()
                .encodeToString((clientId + ":" + clientSecret).getBytes(StandardCharsets.UTF_8));

        JsonNode tokenResponse = restClient.post()
                .uri("https://zoom.us/oauth/token?grant_type=account_credentials&account_id=" + accountId)
                .header(HttpHeaders.AUTHORIZATION, "Basic " + auth)
                .retrieve()
                .body(JsonNode.class);

        if (tokenResponse == null || tokenResponse.get("access_token") == null) {
            throw new RuntimeException("Zoom token retrieval failed");
        }

        return tokenResponse.get("access_token").asText();
    }

    public record ZoomMeetingData(String meetingId, String joinUrl, String startUrl, String password) {
    }
}


