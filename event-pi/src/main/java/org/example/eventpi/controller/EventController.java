package org.example.eventpi.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.eventpi.dto.*;
import org.example.eventpi.exception.ForbiddenException;
import org.example.eventpi.model.EventStatus;
import org.example.eventpi.model.EventType;
import org.example.eventpi.service.EventService;
import org.example.eventpi.service.GeminiService;
import org.example.eventpi.service.ImageStorageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;
    private final ImageStorageService imageStorageService;
    private final GeminiService geminiService;

    private static final Set<String> WRITE_ROLES =
            Set.of("ADMIN", "MENTOR", "PARTENAIRE");
    private static final Set<String> ADMIN_ROLES =
            Set.of("ADMIN");

    // ── IMAGE UPLOAD ──────────────────────────────────────────────────────
    @PostMapping("/upload-image")
    public ResponseEntity<Map<String, String>> uploadImage(
            @RequestParam("file") MultipartFile file,
            @RequestHeader("X-User-Role") String role) {
        requireRole(role, WRITE_ROLES);
        String url = imageStorageService.store(file);
        return ResponseEntity.ok(Map.of("url", url));
    }

    // ── CREATE ────────────────────────────────────────────────────────────
    @PostMapping
    public ResponseEntity<EventResponse> createEvent(
            @RequestBody @Valid EventRequest request,
            @RequestHeader("X-User-Id") String userId,
            @RequestHeader("X-User-Role") String role) {
        requireRole(role, WRITE_ROLES);
        EventResponse response = eventService.createEvent(
                request, Integer.parseInt(userId), role);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // ── SUBMIT FOR VALIDATION ─────────────────────────────────────────────
    // MENTOR/PARTENAIRE submit their draft for admin review
    // ADMIN calling this publishes directly
    @PatchMapping("/{id}/submit")
    public ResponseEntity<EventResponse> submitForValidation(
            @PathVariable Long id,
            @RequestHeader("X-User-Id") String userId,
            @RequestHeader("X-User-Role") String role) {
        requireRole(role, WRITE_ROLES);
        return ResponseEntity.ok(eventService.submitForValidation(
                id, Integer.parseInt(userId), role));
    }

    // ── APPROVE (ADMIN only) ──────────────────────────────────────────────
    @PatchMapping("/{id}/approve")
    public ResponseEntity<EventResponse> approveEvent(
            @PathVariable Long id,
            @RequestHeader("X-User-Id") String userId,
            @RequestHeader("X-User-Role") String role) {
        requireRole(role, ADMIN_ROLES);
        return ResponseEntity.ok(
                eventService.approveEvent(id, Integer.parseInt(userId)));
    }

    // ── REJECT (ADMIN only) ───────────────────────────────────────────────
    @PatchMapping("/{id}/reject")
    public ResponseEntity<EventResponse> rejectEvent(
            @PathVariable Long id,
            @RequestBody ValidationRequest request,
            @RequestHeader("X-User-Id") String userId,
            @RequestHeader("X-User-Role") String role) {
        requireRole(role, ADMIN_ROLES);
        return ResponseEntity.ok(eventService.rejectEvent(
                id, Integer.parseInt(userId), request.getRejectionReason()));
    }

    // ── PUBLISH ───────────────────────────────────────────────────────────
    @PatchMapping("/{id}/publish")
    public ResponseEntity<EventResponse> publishEvent(
            @PathVariable Long id,
            @RequestHeader("X-User-Id") String userId,
            @RequestHeader("X-User-Role") String role) {
        requireRole(role, WRITE_ROLES);
        return ResponseEntity.ok(eventService.publishEvent(
                id, Integer.parseInt(userId), role));
    }

    // ── PENDING EVENTS (admin validation queue) ───────────────────────────
    @GetMapping("/pending")
    public ResponseEntity<List<EventResponse>> getPendingEvents(
            @RequestHeader("X-User-Role") String role) {
        requireRole(role, ADMIN_ROLES);
        return ResponseEntity.ok(eventService.getPendingEvents());
    }

    // ── READ ONE ──────────────────────────────────────────────────────────
    @GetMapping("/{id}")
    public ResponseEntity<EventResponse> getEvent(@PathVariable Long id) {
        return ResponseEntity.ok(eventService.getEventById(id));
    }

    // ── READ ALL ──────────────────────────────────────────────────────────
    @GetMapping
    public ResponseEntity<List<EventResponse>> getAllEvents(
            @RequestParam(required = false) EventStatus status,
            @RequestParam(required = false) EventType type,
            @RequestParam(required = false) Integer organizerId,
            @RequestHeader(value = "X-User-Role", required = false) String role) {

        String r = normalize(role);   // ← normalize first

        if (r.isEmpty() || (!r.equals("ADMIN") && !r.equals("MENTOR") && !r.equals("PARTENAIRE"))) {
            return ResponseEntity.ok(eventService.getAllEvents(EventStatus.PUBLIE, type, organizerId));
        }

        return ResponseEntity.ok(eventService.getAllEvents(status, type, organizerId));
    }
    // ── UPDATE ────────────────────────────────────────────────────────────
    @PutMapping("/{id}")
    public ResponseEntity<EventResponse> updateEvent(
            @PathVariable Long id,
            @RequestBody UpdateEventRequest request,
            @RequestHeader("X-User-Id") String userId,
            @RequestHeader("X-User-Role") String role) {
        requireRole(role, WRITE_ROLES);
        return ResponseEntity.ok(eventService.updateEvent(
                id, request, Integer.parseInt(userId), role));
    }

    // ── DELETE ────────────────────────────────────────────────────────────
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(
            @PathVariable Long id,
            @RequestHeader("X-User-Role") String role) {
        requireRole(role, ADMIN_ROLES);
        eventService.deleteEvent(id);
        return ResponseEntity.noContent().build();
    }

    // ── ROLE HELPER ───────────────────────────────────────────────────────
    private void requireRole(String role, Set<String> allowed) {
        if (role == null || !allowed.contains(normalize(role))) {
            throw new ForbiddenException("Access denied for role: " + role);
        }
    }

    private String normalize(String role) {
        if (role == null) return "";
        return role.startsWith("ROLE_") ? role.substring(5) : role;
    }


    @PostMapping("/generate-description")
    public ResponseEntity<DescriptionResponse> generateDescription(
            @RequestBody DescriptionRequest request,
            @RequestHeader("X-User-Role") String role) {
        requireRole(role, WRITE_ROLES);
        String description = geminiService.generateEventDescription(
                request.getTitle(),
                request.getDate(),
                request.getEventType()
        );
        return ResponseEntity.ok(new DescriptionResponse(description));
    }




}