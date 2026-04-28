package org.example.partenariatpi.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Base64;
import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class ZoomSignatureService {

    @Value("${zoom.sdk-key:}")
    private String sdkKey;

    @Value("${zoom.sdk-secret:}")
    private String sdkSecret;

    public String generateSignature(String meetingNumber, int role) {
        if (!hasValidCredentials()) {
            throw new RuntimeException("Zoom SDK credentials missing");
        }

        try {
            long iat = Instant.now().getEpochSecond() - 30;
            long exp = iat + 3600;

            // Header
            Map<String, Object> header = new LinkedHashMap<>();
            header.put("alg", "HS256");
            header.put("typ", "JWT");

            // Payload — exact keys Zoom SDK requires
            Map<String, Object> payload = new LinkedHashMap<>();
            payload.put("appKey", sdkKey);
            payload.put("sdkKey", sdkKey);
            payload.put("mn", meetingNumber);
            payload.put("role", role);
            payload.put("iat", iat);
            payload.put("exp", exp);
            payload.put("tokenExp", exp);

            ObjectMapper mapper = new ObjectMapper();

            String headerJson = mapper.writeValueAsString(header);
            String payloadJson = mapper.writeValueAsString(payload);

            String encodedHeader = Base64.getUrlEncoder()
                    .withoutPadding()
                    .encodeToString(headerJson.getBytes(StandardCharsets.UTF_8));

            String encodedPayload = Base64.getUrlEncoder()
                    .withoutPadding()
                    .encodeToString(payloadJson.getBytes(StandardCharsets.UTF_8));

            String signingInput = encodedHeader + "." + encodedPayload;

            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(
                    sdkSecret.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
            byte[] signatureBytes = mac.doFinal(
                    signingInput.getBytes(StandardCharsets.UTF_8));

            String encodedSignature = Base64.getUrlEncoder()
                    .withoutPadding()
                    .encodeToString(signatureBytes);

            return signingInput + "." + encodedSignature;

        } catch (Exception e) {
            throw new RuntimeException("Failed to generate Zoom signature", e);
        }
    }

    private boolean hasValidCredentials() {
        return sdkKey != null && !sdkKey.isBlank()
                && sdkSecret != null && !sdkSecret.isBlank();
    }
}