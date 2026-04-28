package org.example.partenariatpi.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;

@Service
public class ZoomSignatureService {

    @Value("${zoom.sdk-key:}")
    private String sdkKey;

    @Value("${zoom.sdk-secret:}")
    private String sdkSecret;

    /**
     * Generate a Zoom Meeting SDK JWT signature for joining a meeting.
     *
     * @param meetingNumber The Zoom meeting number
     * @param role 0 for participant, 1 for host
     * @return JWT signature valid for 1 hour
     */
    public String generateSignature(String meetingNumber, int role) {
        if (!hasValidCredentials()) {
            throw new RuntimeException("Zoom SDK credentials missing: set zoom.sdk-key and zoom.sdk-secret");
        }

        long issuedAt = Instant.now().getEpochSecond();
        long expiresAt = issuedAt + 3600; // 1 hour validity

        return Jwts.builder()
                .claim("iss", sdkKey)
                .claim("exp", expiresAt)
                .claim("iat", issuedAt)
                .claim("tpc", meetingNumber)
                .claim("role_type", role)
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(sdkSecret.getBytes(StandardCharsets.UTF_8));
    }

    private boolean hasValidCredentials() {
        return sdkKey != null && !sdkKey.isBlank()
                && sdkSecret != null && !sdkSecret.isBlank();
    }
}

