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
            Set.of("ROLE_ADMIN", "ROLE_MENTOR", "ROLE_PARTENAIRE");

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

    private void requireRole(String role, Set<String> allowed) {
        if (role == null || !allowed.contains(role)) {
            throw new ForbiddenException("Access denied for role: " + role);
        }
    }
}