package org.example.eventpi.service;

import lombok.RequiredArgsConstructor;
import org.example.eventpi.dto.EventRequest;
import org.example.eventpi.dto.EventResponse;
import org.example.eventpi.model.Event;
import org.example.eventpi.model.EventStatus;
import org.example.eventpi.repository.EventRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;

    // ─── CREATE ──────────────────────────────────────────
    public EventResponse createEvent(EventRequest request, Integer organizerId) {

        Event event = Event.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .type(request.getType())
                .status(EventStatus.BROUILLON)
                .startDate(request.getStartDate())
                .locationType(request.getLocationType())
                .capacityMax(request.getCapacityMax())
                .coverImageUrl(request.getCoverImageUrl())
                .targetSector(request.getTargetSector())
                .targetStage(request.getTargetStage())
                .organizerId(organizerId)
                .build();

        Event saved = eventRepository.save(event);

        return toResponse(saved);
    }

    // ─── MAPPER interne ──────────────────────────────────
    private EventResponse toResponse(Event event) {
        return EventResponse.builder()
                .id(event.getId())
                .title(event.getTitle())
                .description(event.getDescription())
                .type(event.getType())
                .status(event.getStatus())
                .startDate(event.getStartDate())
                .locationType(event.getLocationType())
                .capacityMax(event.getCapacityMax())
                .coverImageUrl(event.getCoverImageUrl())
                .targetSector(event.getTargetSector())
                .targetStage(event.getTargetStage())
                .organizerId(event.getOrganizerId())
                .createdAt(event.getCreatedAt())
                .build();
    }
}