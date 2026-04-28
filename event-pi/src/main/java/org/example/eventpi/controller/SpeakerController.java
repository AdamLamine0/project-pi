package org.example.eventpi.controller;

import lombok.RequiredArgsConstructor;
import org.example.eventpi.dto.SpeakerCandidateResponse;
import org.example.eventpi.dto.SpeakerRequest;
import org.example.eventpi.dto.SpeakerResponse;
import org.example.eventpi.exception.ForbiddenException;
import org.example.eventpi.service.ImageStorageService;
import org.example.eventpi.service.LinkedInImportService;
import org.example.eventpi.service.SpeakerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequiredArgsConstructor
public class SpeakerController {

    private final SpeakerService speakerService;
    private final LinkedInImportService linkedInImportService;
    private final ImageStorageService imageStorageService;

    private static final Set<String> WRITE_ROLES =
            Set.of("ADMIN", "MENTOR", "PARTNER");

    // ── LINKEDIN IMPORT ───────────────────────────────────────────────────

    /**
     * Searches LinkedIn for speakers matching {@code keywords}.
     * The RapidAPI key is resolved server-side and never sent to the browser.
     */
    @GetMapping("/api/speakers/search")
    public ResponseEntity<List<SpeakerCandidateResponse>> searchLinkedIn(
            @RequestParam String keywords,
            @RequestHeader("X-User-Role") String role) {
        requireRole(role, WRITE_ROLES);
        return ResponseEntity.ok(linkedInImportService.searchSpeakers(keywords));
    }

    /**
     * Persists a LinkedIn candidate as a Speaker, or returns the existing
     * Speaker if one with the same LinkedIn URL is already in the database.
     */
    @PostMapping("/api/speakers/import-one")
    public ResponseEntity<SpeakerResponse> importOne(
            @RequestBody SpeakerCandidateResponse candidate,
            @RequestHeader("X-User-Role") String role) {
        requireRole(role, WRITE_ROLES);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(speakerService.importOrReuse(candidate));
    }

    // ── CRUD ─────────────────────────────────────────────────────────────

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
        requireRole(role, Set.of("ADMIN"));
        speakerService.delete(id);
        return ResponseEntity.noContent().build();
    }

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

    @PostMapping("/api/speakers/{id}/upload-photo")
    public ResponseEntity<Map<String, String>> uploadPhoto(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file,
            @RequestHeader("X-User-Role") String role) {

        requireRole(role, WRITE_ROLES);
        String url = imageStorageService.storeInFolder(file, "uploads/speakers");

        // Update speaker's photoUrl directly via service
        speakerService.updatePhoto(id, url); // ← cleaner than new SpeakerRequest()

        return ResponseEntity.ok(Map.of("url", url));
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
