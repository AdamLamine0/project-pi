package org.example.eventpi.controller;

import lombok.RequiredArgsConstructor;
import org.example.eventpi.dto.EventRegistrationRequest;
import org.example.eventpi.dto.EventRegistrationResponse;
import org.example.eventpi.dto.EventStatsResponse;
import org.example.eventpi.model.RegistrationStatus;
import org.example.eventpi.service.EventRegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;
import jakarta.mail.internet.MimeMessage;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventRegistrationController {

    private final EventRegistrationService registrationService;


    @Autowired
    private JavaMailSender mailSender;

    // ── REGISTER ──────────────────────────────────────────────────────────
    @PostMapping("/{eventId}/register")
    public ResponseEntity<EventRegistrationResponse> register(
            @PathVariable Long eventId,
            @RequestHeader("X-User-Id") String userId,
            @RequestBody(required = false) EventRegistrationRequest request) {
        int places = (request != null && request.getNumberOfPlaces() != null)
                ? request.getNumberOfPlaces() : 1;
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(registrationService.register(eventId, Integer.parseInt(userId), places));
    }

    // ── CANCEL ────────────────────────────────────────────────────────────
    @DeleteMapping("/{eventId}/register")
    public ResponseEntity<EventRegistrationResponse> cancel(
            @PathVariable Long eventId,
            @RequestHeader("X-User-Id") String userId) {
        return ResponseEntity.ok(
                registrationService.cancel(eventId, Integer.parseInt(userId)));
    }

    // ── GET BY EVENT ──────────────────────────────────────────────────────
    @GetMapping("/{eventId}/registrations")
    public ResponseEntity<List<EventRegistrationResponse>> getByEvent(
            @PathVariable Long eventId) {
        return ResponseEntity.ok(registrationService.getByEvent(eventId));
    }

    // ── MY REGISTRATIONS ──────────────────────────────────────────────────
    @GetMapping("/my-registrations")
    public ResponseEntity<List<EventRegistrationResponse>> getMyRegistrations(
            @RequestHeader("X-User-Id") String userId) {
        return ResponseEntity.ok(
                registrationService.getByUser(Integer.parseInt(userId)));
    }

    // ── CHECK IN ──────────────────────────────────────────────────────────
    @PatchMapping("/registrations/{registrationId}/checkin")
    public ResponseEntity<EventRegistrationResponse> checkIn(
            @PathVariable Long registrationId) {
        return ResponseEntity.ok(registrationService.checkIn(registrationId));
    }

    // ── APPROVE PAYMENT ───────────────────────────────────────────────────
    @PatchMapping("/registrations/{registrationId}/approve")
    public ResponseEntity<EventRegistrationResponse> approve(
            @PathVariable Long registrationId) {
        return ResponseEntity.ok(registrationService.approve(registrationId));
    }

    // ── REJECT PAYMENT ────────────────────────────────────────────────────
    @PatchMapping("/registrations/{registrationId}/reject")
    public ResponseEntity<EventRegistrationResponse> reject(
            @PathVariable Long registrationId,
            @RequestBody(required = false) java.util.Map<String, String> body) {
        String reason = body != null ? body.getOrDefault("reason", "") : "";
        return ResponseEntity.ok(registrationService.reject(registrationId, reason));
    }

    // ── ADMIN: ALL REGISTRATIONS ──────────────────────────────────────────
    @GetMapping("/registrations")
    public ResponseEntity<List<EventRegistrationResponse>> getAllRegistrations(
            @RequestParam(required = false) Long eventId,
            @RequestParam(required = false) RegistrationStatus status) {
        return ResponseEntity.ok(registrationService.getAllRegistrations(eventId, status));
    }

    // ── STATS ─────────────────────────────────────────────────────────────
    @GetMapping("/{eventId}/stats")
    public ResponseEntity<EventStatsResponse> getStats(
            @PathVariable Long eventId) {
        return ResponseEntity.ok(registrationService.getStats(eventId));
    }

    // ── TEST EMAIL ────────────────────────────────────────────────────────
    @GetMapping("/test-email")
    public ResponseEntity<String> testEmail() {
        try {
            MimeMessage msg = mailSender.createMimeMessage();
            MimeMessageHelper helper =
                    new MimeMessageHelper(msg, true, "UTF-8");
            helper.setTo("farahzouari84@gmail.com");
            helper.setSubject("Test PIcloud email");
            helper.setText("<b>Email test works!</b>", true);
            mailSender.send(msg);
            return ResponseEntity.ok("Email sent successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body("FAILED: " + e.getMessage());
        }
    }
}