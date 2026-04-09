package org.example.eventpi.controller;

import lombok.RequiredArgsConstructor;
import org.example.eventpi.dto.CertificateResponse;
import org.example.eventpi.dto.VerificationResponse;
import org.example.eventpi.service.CertificateService;

import org.example.eventpi.model.Certificate;
import org.example.eventpi.service.CertificateService;
import org.example.eventpi.service.NotificationService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class CertificateController {

    private final CertificateService certificateService;

    private final NotificationService notificationService;


    @Value("${app.base-url}")
    private String baseUrl;

    // ── MY CERTIFICATES ───────────────────────────────────────────────────
    @GetMapping("/api/certificates/me")
    public ResponseEntity<List<CertificateResponse>> getMyCertificates(
            @RequestHeader("X-User-Id") String userId) {
        return ResponseEntity.ok(
                certificateService.getByUser(Integer.parseInt(userId), baseUrl));
    }

    // ── DOWNLOAD PDF ──────────────────────────────────────────────────────
    @GetMapping("/api/certificates/{id}/download")
    public ResponseEntity<byte[]> download(
            @PathVariable Long id,
            @RequestHeader("X-User-Id") String userId) {
        byte[] pdf = certificateService.downloadPdf(id, Integer.parseInt(userId));
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"certificate-" + id + ".pdf\"")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }

    // ── PUBLIC VERIFICATION (no auth needed) ──────────────────────────────
    @GetMapping("/api/verify/{token}")
    public ResponseEntity<VerificationResponse> verify(@PathVariable String token) {
        return ResponseEntity.ok(certificateService.verify(token));
    }


    @GetMapping("/api/certificates/{id}/resend-email")
    public ResponseEntity<String> resendEmail(
            @PathVariable Long id,
            @RequestHeader("X-User-Id") String userId) {
        Certificate cert = certificateService.getCertificateById(id);
        notificationService.sendCertificateIssued(
                "your-test-email@gmail.com",
                "Test User",
                cert.getEventTitle(),
                cert.getEventDate(),
                baseUrl + "/api/certificates/" + id + "/download"
        );
        return ResponseEntity.ok("Email resent");
    }



    @GetMapping("/api/badges/{id}/image")
    public ResponseEntity<byte[]> downloadBadgeImage(
            @PathVariable Long id,
            @RequestHeader("X-User-Id") String userId) {
        try {
            // token is stored on certificate — find by badgeId
            Certificate cert = certificateService.getByBadgeId(id);
            byte[] png = Files.readAllBytes(
                    Paths.get("uploads/badges/" + cert.getVerificationToken() + ".png"));
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=\"badge-" + id + ".png\"")
                    .contentType(MediaType.IMAGE_PNG)
                    .body(png);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

}