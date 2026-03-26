package org.example.eventpi.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.eventpi.dto.EventRequest;
import org.example.eventpi.dto.EventResponse;
import org.example.eventpi.service.EventService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    // ─── CREATE ──────────────────────────────────────────────
    @PostMapping
    public ResponseEntity<EventResponse> createEvent(
            @RequestBody @Valid EventRequest request,
            @RequestHeader("X-User-Id") String userId,
            @RequestHeader("X-User-Role") String role) {

        // Seuls ADMIN, MENTOR et PARTENAIRE peuvent créer
        if (!List.of("ADMIN", "MENTOR", "PARTENAIRE").contains(role)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        EventResponse response = eventService.createEvent(request, Integer.parseInt(userId));
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
