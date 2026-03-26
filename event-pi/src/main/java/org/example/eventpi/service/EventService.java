package org.example.eventpi.service;

import lombok.RequiredArgsConstructor;
import org.example.eventpi.dto.EventRequest;
import org.example.eventpi.dto.EventResponse;
import org.example.eventpi.dto.UpdateEventRequest;
import org.example.eventpi.exception.EventNotFoundException;
import org.example.eventpi.model.Event;
import org.example.eventpi.model.EventStatus;
import org.example.eventpi.model.EventType;
import org.example.eventpi.repository.EventRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EventService {

    private final EventRepository eventRepository;
    private final ImageStorageService imageStorageService;



    //CREATE
    @Transactional
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

        return toResponse(eventRepository.save(event));
    }

    // READ ONE
    public EventResponse getEventById(Long id) {
        return eventRepository.findById(id)
                .map(this::toResponse)
                .orElseThrow(() -> new EventNotFoundException(id));
    }

    //READ ALL
    public List<EventResponse> getAllEvents(EventStatus status,
                                            EventType type,
                                            Integer organizerId) {
        List<Event> events;

        if (status != null)          events = eventRepository.findByStatus(status);
        else if (type != null)       events = eventRepository.findByType(type);
        else if (organizerId != null) events = eventRepository.findByOrganizerId(organizerId);
        else                          events = eventRepository.findAll();

        return events.stream().map(this::toResponse).toList();
    }

    // UPDATE
    @Transactional
    public EventResponse updateEvent(Long id, UpdateEventRequest request) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new EventNotFoundException(id));

        if (request.getTitle() != null)       event.setTitle(request.getTitle());
        if (request.getDescription() != null) event.setDescription(request.getDescription());
        if (request.getType() != null)        event.setType(request.getType());
        if (request.getStatus() != null)      event.setStatus(request.getStatus());
        if (request.getStartDate() != null)   event.setStartDate(request.getStartDate());
        if (request.getLocationType() != null) event.setLocationType(request.getLocationType());
        if (request.getCapacityMax() != null) event.setCapacityMax(request.getCapacityMax());
        if (request.getTargetSector() != null) event.setTargetSector(request.getTargetSector());
        if (request.getTargetStage() != null) event.setTargetStage(request.getTargetStage());

        // Delete old image file if being replaced
        if (request.getCoverImageUrl() != null) {
            imageStorageService.delete(event.getCoverImageUrl());
            event.setCoverImageUrl(request.getCoverImageUrl());
        }

        return toResponse(eventRepository.save(event));
    }

    //  DELETE
    @Transactional
    public void deleteEvent(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new EventNotFoundException(id));
        imageStorageService.delete(event.getCoverImageUrl());
        eventRepository.delete(event);
    }

    // MAPPER
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