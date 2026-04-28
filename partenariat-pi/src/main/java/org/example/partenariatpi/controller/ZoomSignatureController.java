package org.example.partenariatpi.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.partenariatpi.dto.ZoomSignatureRequest;
import org.example.partenariatpi.dto.ZoomSignatureResponse;
import org.example.partenariatpi.service.ZoomSignatureService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/zoom")
@RequiredArgsConstructor
public class ZoomSignatureController {

    private final ZoomSignatureService zoomSignatureService;

    @Value("${zoom.sdk-key:}")
    private String sdkKey;

    /**
     * Generate a JWT signature for joining a Zoom meeting.
     * The signature is valid for 1 hour.
     *
     * Request role: 0 = participant, 1 = host
     * Most users should use role 0 (participant).
     */
    @PostMapping("/signature")
    public ResponseEntity<ZoomSignatureResponse> generateSignature(
            @Valid @RequestBody ZoomSignatureRequest request,
            @RequestHeader("X-User-Role") String role
    ) {
        String cleanRole = cleanRole(role);
        if (!"ROLE_USER".equals(cleanRole) && !"ROLE_ADMIN".equals(cleanRole) && !"ROLE_PARTNER".equals(cleanRole)) {
            throw new RuntimeException("Access denied: USER, ADMIN, or PARTNER role required");
        }

        String signature = zoomSignatureService.generateSignature(
                request.getMeetingNumber(),
                request.getRole()
        );

        ZoomSignatureResponse response = new ZoomSignatureResponse();
        response.setSignature(signature);
        response.setSdkKey(sdkKey);

        return ResponseEntity.ok(response);
    }

    private String cleanRole(String role) {
        if (role == null) {
            return "";
        }
        return role.split(",")[0].trim();
    }
}

