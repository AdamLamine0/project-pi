package org.example.eventpi.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.eventpi.dto.EventRequest;
import org.example.eventpi.dto.EventResponse;
import org.example.eventpi.dto.UpdateEventRequest;
import org.example.eventpi.exception.ForbiddenException;
import org.example.eventpi.model.EventStatus;
import org.example.eventpi.model.EventType;
import org.example.eventpi.service.EventService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    private static final Set<String> WRITE_ROLES = Set.of("ROLE_ADMIN", "ROLE_MENTOR", "ROLE_PARTENAIRE");
    private static final Set<String> ADMIN_ROLES  = Set.of("ROLE_ADMIN");

    // CREATE
    @PostMapping
    public ResponseEntity<EventResponse> createEvent(
            @RequestBody @Valid EventRequest request,
            @RequestHeader("X-User-Id") String userId,
            @RequestHeader("X-User-Role") String role) {

        requireRole(role, WRITE_ROLES);
        EventResponse response = eventService.createEvent(request, Integer.parseInt(userId));
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    //READ ONE
    @GetMapping("/{id}")
    public ResponseEntity<EventResponse> getEvent(@PathVariable Long id) {
        return ResponseEntity.ok(eventService.getEventById(id));
    }

    //READ ALL
    @GetMapping
    public ResponseEntity<List<EventResponse>> getAllEvents(
            @RequestParam(required = false) EventStatus status,
            @RequestParam(required = false) EventType type,
            @RequestParam(required = false) Integer organizerId) {

        return ResponseEntity.ok(eventService.getAllEvents(status, type, organizerId));
    }

    //UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<EventResponse> updateEvent(
            @PathVariable Long id,
            @RequestBody UpdateEventRequest request,
            @RequestHeader("X-User-Role") String role) {

        requireRole(role, WRITE_ROLES);
        return ResponseEntity.ok(eventService.updateEvent(id, request));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(
            @PathVariable Long id,
            @RequestHeader("X-User-Role") String role) {

        requireRole(role, ADMIN_ROLES);
        eventService.deleteEvent(id);
        return ResponseEntity.noContent().build();
    }

    //ROLE HELPER
    private void requireRole(String role, Set<String> allowed) {
        if (role == null || !allowed.contains(role)) {
            throw new ForbiddenException("Access denied for role: " + role);
        }
    }
}