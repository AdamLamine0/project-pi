package org.example.eventpi.controller;

import lombok.RequiredArgsConstructor;
import org.example.eventpi.dto.EventRegistrationResponse;
import org.example.eventpi.service.EventRegistrationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventRegistrationController {

    private final EventRegistrationService registrationService;

    // Register current user
    @PostMapping("/{eventId}/register")
    public ResponseEntity<EventRegistrationResponse> register(
            @PathVariable Long eventId,
            @RequestHeader("X-User-Id") String userId) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(registrationService.register(eventId, Integer.parseInt(userId)));
    }

    // Cancel registration
    @DeleteMapping("/{eventId}/register")
    public ResponseEntity<EventRegistrationResponse> cancel(
            @PathVariable Long eventId,
            @RequestHeader("X-User-Id") String userId) {
        return ResponseEntity.ok(registrationService.cancel(eventId, Integer.parseInt(userId)));
    }

    // Get all registrations for an event
    @GetMapping("/{eventId}/registrations")
    public ResponseEntity<List<EventRegistrationResponse>> getByEvent(
            @PathVariable Long eventId) {
        return ResponseEntity.ok(registrationService.getByEvent(eventId));
    }

    // Get my registrations
    @GetMapping("/my-registrations")
    public ResponseEntity<List<EventRegistrationResponse>> getMyRegistrations(
            @RequestHeader("X-User-Id") String userId) {
        return ResponseEntity.ok(registrationService.getByUser(Integer.parseInt(userId)));
    }

    // Check-in
    @PatchMapping("/registrations/{registrationId}/checkin")
    public ResponseEntity<EventRegistrationResponse> checkIn(
            @PathVariable Long registrationId) {
        return ResponseEntity.ok(registrationService.checkIn(registrationId));
    }
}