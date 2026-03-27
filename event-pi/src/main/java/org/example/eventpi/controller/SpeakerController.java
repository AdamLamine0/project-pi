package org.example.eventpi.controller;

import lombok.RequiredArgsConstructor;
import org.example.eventpi.dto.SpeakerRequest;
import org.example.eventpi.dto.SpeakerResponse;
import org.example.eventpi.exception.ForbiddenException;
import org.example.eventpi.service.SpeakerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Set;

@RestController
@RequiredArgsConstructor
public class SpeakerController {

    private final SpeakerService speakerService;
    private static final Set<String> WRITE_ROLES =
            Set.of("ROLE_ADMIN", "ROLE_MENTOR", "ROLE_PARTENAIRE");

    // ── SPEAKER CRUD ──────────────────────────────
    @GetMapping("/api/speakers")
    public ResponseEntity<List<SpeakerResponse>> getAll() {
        return ResponseEntity.ok(speakerService.getAll());
    }

    @GetMapping("/api/speakers/{id}")
    public ResponseEntity<SpeakerResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(speakerService.getById(id));
    }

    @PostMapping("/api/speakers")
    public ResponseEntity<SpeakerResponse> create(
            @RequestBody SpeakerRequest request,
            @RequestHeader("X-User-Role") String role) {
        requireRole(role, WRITE_ROLES);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(speakerService.create(request));
    }

    @PutMapping("/api/speakers/{id}")
    public ResponseEntity<SpeakerResponse> update(
            @PathVariable Long id,
            @RequestBody SpeakerRequest request,
            @RequestHeader("X-User-Role") String role) {
        requireRole(role, WRITE_ROLES);
        return ResponseEntity.ok(speakerService.update(id, request));
    }

    @DeleteMapping("/api/speakers/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id,
            @RequestHeader("X-User-Role") String role) {
        requireRole(role, Set.of("ROLE_ADMIN"));
        speakerService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // ── SPEAKER ↔ EVENT LINKING ───────────────────
    @GetMapping("/api/events/{eventId}/speakers")
    public ResponseEntity<List<SpeakerResponse>> getByEvent(
            @PathVariable Long eventId) {
        return ResponseEntity.ok(speakerService.getByEvent(eventId));
    }

    @PostMapping("/api/events/{eventId}/speakers/{speakerId}")
    public ResponseEntity<SpeakerResponse> linkToEvent(
            @PathVariable Long eventId,
            @PathVariable Long speakerId,
            @RequestHeader("X-User-Role") String role) {
        requireRole(role, WRITE_ROLES);
        return ResponseEntity.ok(speakerService.linkToEvent(speakerId, eventId));
    }

    @DeleteMapping("/api/events/{eventId}/speakers/{speakerId}")
    public ResponseEntity<Void> unlinkFromEvent(
            @PathVariable Long eventId,
            @PathVariable Long speakerId,
            @RequestHeader("X-User-Role") String role) {
        requireRole(role, WRITE_ROLES);
        speakerService.unlinkFromEvent(speakerId, eventId);
        return ResponseEntity.noContent().build();
    }

    private void requireRole(String role, Set<String> allowed) {
        if (role == null || !allowed.contains(role)) {
            throw new ForbiddenException("Access denied for role: " + role);
        }
    }
}