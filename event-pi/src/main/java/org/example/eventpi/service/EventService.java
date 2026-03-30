package org.example.eventpi.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.eventpi.dto.EventRequest;
import org.example.eventpi.dto.EventResponse;
import org.example.eventpi.dto.UpdateEventRequest;
import org.example.eventpi.exception.EventNotFoundException;
import org.example.eventpi.exception.ForbiddenException;
import org.example.eventpi.model.Event;
import org.example.eventpi.model.EventStatus;
import org.example.eventpi.model.EventType;
import org.example.eventpi.repository.EventRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class EventService {

    private final EventRepository eventRepository;
    private final ImageStorageService imageStorageService;
    private final NotificationService notificationService;

    // ── CREATE ────────────────────────────────────────────────────────────
    @Transactional
    public EventResponse createEvent(EventRequest request,
                                     Integer organizerId,
                                     String organizerRole) {
        // ADMIN → BROUILLON (can publish directly)
        // MENTOR / PARTENAIRE → BROUILLON (must submit for validation first)
        EventStatus initialStatus = EventStatus.BROUILLON;

        Event event = Event.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .type(request.getType())
                .status(initialStatus)
                .startDate(request.getStartDate())
                .locationType(request.getLocationType())
                .capacityMax(request.getCapacityMax())
                .coverImageUrl(request.getCoverImageUrl())
                .targetSector(request.getTargetSector())
                .targetStage(request.getTargetStage())
                .organizerId(organizerId)
                .organizerRole(organizerRole)
                .build();

        return toResponse(eventRepository.save(event));
    }

    // ── SUBMIT FOR VALIDATION (MENTOR / PARTENAIRE only) ──────────────────
    @Transactional
    public EventResponse submitForValidation(Long id, Integer userId,
                                             String role) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new EventNotFoundException(id));

        // Only the owner can submit
        if (!event.getOrganizerId().equals(userId)) {
            throw new ForbiddenException(
                    "Vous ne pouvez soumettre que vos propres événements.");
        }

        // Only BROUILLON events can be submitted
        if (event.getStatus() != EventStatus.BROUILLON) {
            throw new ForbiddenException(
                    "Seuls les événements en brouillon peuvent être soumis.");
        }

        // ADMIN can publish directly without validation
        if ("ROLE_ADMIN".equals(role)) {
            event.setStatus(EventStatus.PUBLIE);
            log.info("Admin {} published event {} directly", userId, id);
        } else {
            // MENTOR / PARTENAIRE must wait for admin approval
            event.setStatus(EventStatus.EN_ATTENTE_VALIDATION);
            event.setSubmittedAt(LocalDateTime.now());
            log.info("Event {} submitted for validation by userId {} ({})",
                    id, userId, role);
        }

        return toResponse(eventRepository.save(event));
    }

    // ── APPROVE (ADMIN only) ──────────────────────────────────────────────
    @Transactional
    public EventResponse approveEvent(Long id, Integer adminId) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new EventNotFoundException(id));

        if (event.getStatus() != EventStatus.EN_ATTENTE_VALIDATION) {
            throw new ForbiddenException(
                    "Seuls les événements en attente peuvent être approuvés.");
        }

        event.setStatus(EventStatus.APPROUVE);
        event.setValidatedBy(adminId);
        event.setValidatedAt(LocalDateTime.now());
        event.setRejectionReason(null);

        Event saved = eventRepository.save(event);
        log.info("Event {} approved by admin {}", id, adminId);

        // Notify organizer
        try {
            notificationService.sendEventApproved(
                    event.getOrganizerId(), event);
        } catch (Exception e) {
            log.warn("Could not send approval notification: {}", e.getMessage());
        }

        return toResponse(saved);
    }

    // ── REJECT (ADMIN only) ───────────────────────────────────────────────
    @Transactional
    public EventResponse rejectEvent(Long id, Integer adminId,
                                     String reason) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new EventNotFoundException(id));

        if (event.getStatus() != EventStatus.EN_ATTENTE_VALIDATION) {
            throw new ForbiddenException(
                    "Seuls les événements en attente peuvent être rejetés.");
        }

        event.setStatus(EventStatus.REJETE);
        event.setValidatedBy(adminId);
        event.setValidatedAt(LocalDateTime.now());
        event.setRejectionReason(reason);

        Event saved = eventRepository.save(event);
        log.info("Event {} rejected by admin {} — reason: {}", id, adminId, reason);

        // Notify organizer
        try {
            notificationService.sendEventRejected(
                    event.getOrganizerId(), event, reason);
        } catch (Exception e) {
            log.warn("Could not send rejection notification: {}", e.getMessage());
        }

        return toResponse(saved);
    }

    // ── PUBLISH (after approval) ──────────────────────────────────────────
    @Transactional
    public EventResponse publishEvent(Long id, Integer userId, String role) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new EventNotFoundException(id));

        // ADMIN can publish from BROUILLON or APPROUVE
        // MENTOR/PARTENAIRE can only publish from APPROUVE
        boolean isAdmin = "ROLE_ADMIN".equals(role);
        boolean isOwner = event.getOrganizerId().equals(userId);

        if (!isAdmin && !isOwner) {
            throw new ForbiddenException(
                    "Vous ne pouvez publier que vos propres événements.");
        }

        if (isAdmin) {
            if (event.getStatus() != EventStatus.BROUILLON &&
                    event.getStatus() != EventStatus.APPROUVE) {
                throw new ForbiddenException(
                        "L'événement ne peut pas être publié depuis ce statut.");
            }
        } else {
            // Non-admin must have admin approval first
            if (event.getStatus() != EventStatus.APPROUVE) {
                throw new ForbiddenException(
                        "Votre événement doit être approuvé par un admin avant publication.");
            }
        }

        event.setStatus(EventStatus.PUBLIE);
        return toResponse(eventRepository.save(event));
    }

    // ── GET PENDING EVENTS (admin validation queue) ───────────────────────
    public List<EventResponse> getPendingEvents() {
        return eventRepository
                .findByStatusOrderBySubmittedAtAsc(
                        EventStatus.EN_ATTENTE_VALIDATION)
                .stream().map(this::toResponse).toList();
    }

    // ── READ ONE ─────────────────────────────────────────────────────────
    public EventResponse getEventById(Long id) {
        return eventRepository.findById(id)
                .map(this::toResponse)
                .orElseThrow(() -> new EventNotFoundException(id));
    }

    // ── READ ALL ──────────────────────────────────────────────────────────
    public List<EventResponse> getAllEvents(EventStatus status,
                                            EventType type,
                                            Integer organizerId) {
        List<Event> events;
        if (status != null)            events = eventRepository.findByStatus(status);
        else if (type != null)         events = eventRepository.findByType(type);
        else if (organizerId != null)  events = eventRepository.findByOrganizerId(organizerId);
        else                           events = eventRepository.findAll();
        return events.stream().map(this::toResponse).toList();
    }

    // ── UPDATE ────────────────────────────────────────────────────────────
    @Transactional
    public EventResponse updateEvent(Long id, UpdateEventRequest request,
                                     Integer userId, String role) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new EventNotFoundException(id));

        boolean isAdmin = "ROLE_ADMIN".equals(role);
        boolean isOwner = event.getOrganizerId().equals(userId);

        if (!isAdmin && !isOwner) {
            throw new ForbiddenException(
                    "Vous ne pouvez modifier que vos propres événements.");
        }

        // Prevent editing events that are pending/approved/published
        // unless you are admin
        if (!isAdmin && event.getStatus() == EventStatus.EN_ATTENTE_VALIDATION) {
            throw new ForbiddenException(
                    "Vous ne pouvez pas modifier un événement en cours de validation.");
        }

        if (request.getTitle() != null)        event.setTitle(request.getTitle());
        if (request.getDescription() != null)  event.setDescription(request.getDescription());
        if (request.getType() != null)         event.setType(request.getType());
        if (request.getStartDate() != null)    event.setStartDate(request.getStartDate());
        if (request.getLocationType() != null) event.setLocationType(request.getLocationType());
        if (request.getCapacityMax() != null)  event.setCapacityMax(request.getCapacityMax());
        if (request.getTargetSector() != null) event.setTargetSector(request.getTargetSector());
        if (request.getTargetStage() != null)  event.setTargetStage(request.getTargetStage());

        // Admin can change status directly
        if (isAdmin && request.getStatus() != null) {
            event.setStatus(request.getStatus());
        }

        if (request.getCoverImageUrl() != null) {
            imageStorageService.delete(event.getCoverImageUrl());
            event.setCoverImageUrl(request.getCoverImageUrl());
        }

        return toResponse(eventRepository.save(event));
    }

    // ── DELETE ────────────────────────────────────────────────────────────
    @Transactional
    public void deleteEvent(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new EventNotFoundException(id));
        imageStorageService.delete(event.getCoverImageUrl());
        eventRepository.delete(event);
    }

    // ── MAPPER ────────────────────────────────────────────────────────────
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
                .organizerRole(event.getOrganizerRole())
                .createdAt(event.getCreatedAt())
                .rejectionReason(event.getRejectionReason())
                .validatedBy(event.getValidatedBy())
                .validatedAt(event.getValidatedAt())
                .submittedAt(event.getSubmittedAt())
                .build();
    }
}