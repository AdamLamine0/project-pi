package org.example.eventpi.controller;

import lombok.RequiredArgsConstructor;
import org.example.eventpi.dto.EventProgramRequest;
import org.example.eventpi.dto.EventProgramResponse;
import org.example.eventpi.exception.ForbiddenException;
import org.example.eventpi.service.EventProgramService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/events/{eventId}/program")
@RequiredArgsConstructor
public class EventProgramController {

    private final EventProgramService programService;
    private static final Set<String> WRITE_ROLES =
            Set.of("ADMIN", "MENTOR", "PARTENAIRE");

    @GetMapping
    public ResponseEntity<List<EventProgramResponse>> getProgram(
            @PathVariable Long eventId) {
        return ResponseEntity.ok(programService.getByEvent(eventId));
    }

    @PostMapping
    public ResponseEntity<EventProgramResponse> create(
            @PathVariable Long eventId,
            @RequestBody EventProgramRequest request,
            @RequestHeader("X-User-Role") String role) {
        requireRole(role, WRITE_ROLES);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(programService.create(eventId, request));
    }

    @PutMapping("/{slotId}")
    public ResponseEntity<EventProgramResponse> update(
            @PathVariable Long eventId,
            @PathVariable Long slotId,
            @RequestBody EventProgramRequest request,
            @RequestHeader("X-User-Role") String role) {
        requireRole(role, WRITE_ROLES);
        return ResponseEntity.ok(programService.update(slotId, request));
    }

    @DeleteMapping("/{slotId}")
    public ResponseEntity<Void> delete(
            @PathVariable Long eventId,
            @PathVariable Long slotId,
            @RequestHeader("X-User-Role") String role) {
        requireRole(role, WRITE_ROLES);
        programService.delete(slotId);
        return ResponseEntity.noContent().build();
    }

    // ── SPEAKER ASSIGNMENT ────────────────────────────────────────────────

    /** Removes the speaker assignment from a slot without deleting the speaker. */
    @DeleteMapping("/{slotId}/speaker")
    public ResponseEntity<EventProgramResponse> unassignSpeaker(
            @PathVariable Long eventId,
            @PathVariable Long slotId,
            @RequestHeader("X-User-Role") String role) {
        requireRole(role, WRITE_ROLES);
        return ResponseEntity.ok(programService.unassignSpeaker(slotId));
    }

    // ── AI GENERATE ───────────────────────────────────────────────────────
    @PostMapping("/generate")
    public ResponseEntity<List<EventProgramResponse>> generate(
            @PathVariable Long eventId,
            @RequestHeader("X-User-Role") String role) {
        requireRole(role, WRITE_ROLES);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(programService.generateProgram(eventId));
    }

    private void requireRole(String role, Set<String> allowed) {
        String normalized = normalizeRole(role);
        if (normalized == null || !allowed.contains(normalized)) {
            throw new ForbiddenException("Access denied for role: " + role);
        }
    }

    private String normalizeRole(String role) {
        if (role == null) return null;
        return role.startsWith("ROLE_") ? role.substring(5) : role;
    }
}