package org.example.eventpi.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.eventpi.dto.EventRequest;
import org.example.eventpi.dto.EventResponse;
import org.example.eventpi.dto.UpdateEventRequest;
import org.example.eventpi.dto.UserResponse;
import org.example.eventpi.exception.EventNotFoundException;
import org.example.eventpi.exception.EventPastException;
import org.example.eventpi.exception.ForbiddenException;
import org.example.eventpi.feign.UserClient;
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
    private final UserClient userClient;

    // ── CREATE ────────────────────────────────────────────────────────────
    @Transactional
    public EventResponse createEvent(EventRequest request,
                                     Integer organizerId,
                                     String organizerRole) {
        validateDates(request.getStartDate(), request.getEndDate());

        Event event = Event.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .type(request.getType())
                .status(EventStatus.BROUILLON)
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .locationType(request.getLocationType())
                .location(request.getLocation())
                .ticketPrice(request.getTicketPrice())
                .capacityMax(request.getCapacityMax())
                .coverImageUrl(request.getCoverImageUrl())
                .targetSector(request.getTargetSector())
                .targetStage(request.getTargetStage())
                .organizerId(organizerId)
                .organizerRole(organizerRole)
                .build();

        return toResponse(eventRepository.save(event));
    }

    // ── SUBMIT FOR VALIDATION ─────────────────────────────────────────────
    @Transactional
    public EventResponse submitForValidation(Long id, Integer userId, String role) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new EventNotFoundException(id));

        if (!event.getOrganizerId().equals(userId)) {
            throw new ForbiddenException("Vous ne pouvez soumettre que vos propres événements.");
        }
        if (event.getStatus() != EventStatus.BROUILLON) {
            throw new ForbiddenException("Seuls les événements en brouillon peuvent être soumis.");
        }
        // Guard: refuse if start date has already passed
        if (event.getStartDate() != null && event.getStartDate().isBefore(LocalDateTime.now())) {
            throw new EventPastException();
        }

        if ("ADMIN".equals(role)) {
            event.setStatus(EventStatus.PUBLIE);
            log.info("Admin {} published event {} directly", userId, id);
        } else {
            event.setStatus(EventStatus.EN_ATTENTE_VALIDATION);
            event.setSubmittedAt(LocalDateTime.now());
            log.info("Event {} submitted for validation by userId {} ({})", id, userId, role);
        }

        return toResponse(eventRepository.save(event));
    }

    // ── APPROVE (ADMIN only) ──────────────────────────────────────────────
    @Transactional
    public EventResponse approveEvent(Long id, Integer adminId) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new EventNotFoundException(id));

        if (event.getStatus() != EventStatus.EN_ATTENTE_VALIDATION) {
            throw new ForbiddenException("Seuls les événements en attente peuvent être approuvés.");
        }

        event.setStatus(EventStatus.APPROUVE);
        event.setValidatedBy(adminId);
        event.setValidatedAt(LocalDateTime.now());
        event.setRejectionReason(null);

        Event saved = eventRepository.save(event);
        log.info("Event {} approved by admin {}", id, adminId);

        try {
            notificationService.sendEventApproved(event.getOrganizerId(), event);
        } catch (Exception e) {
            log.warn("Could not send approval notification: {}", e.getMessage());
        }

        return toResponse(saved);
    }

    // ── REJECT (ADMIN only) ───────────────────────────────────────────────
    @Transactional
    public EventResponse rejectEvent(Long id, Integer adminId, String reason) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new EventNotFoundException(id));

        if (event.getStatus() != EventStatus.EN_ATTENTE_VALIDATION) {
            throw new ForbiddenException("Seuls les événements en attente peuvent être rejetés.");
        }

        event.setStatus(EventStatus.REJETE);
        event.setValidatedBy(adminId);
        event.setValidatedAt(LocalDateTime.now());
        event.setRejectionReason(reason);

        Event saved = eventRepository.save(event);
        log.info("Event {} rejected by admin {} — reason: {}", id, adminId, reason);

        try {
            notificationService.sendEventRejected(event.getOrganizerId(), event, reason);
        } catch (Exception e) {
            log.warn("Could not send rejection notification: {}", e.getMessage());
        }

        return toResponse(saved);
    }

    // ── PUBLISH ───────────────────────────────────────────────────────────
    @Transactional
    public EventResponse publishEvent(Long id, Integer userId, String role) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new EventNotFoundException(id));

        boolean isAdmin = "ADMIN".equals(role);
        boolean isOwner = event.getOrganizerId().equals(userId);

        if (!isAdmin && !isOwner) {
            throw new ForbiddenException("Vous ne pouvez publier que vos propres événements.");
        }
        if (isAdmin) {
            if (event.getStatus() != EventStatus.BROUILLON &&
                    event.getStatus() != EventStatus.APPROUVE) {
                throw new ForbiddenException("L'événement ne peut pas être publié depuis ce statut.");
            }
        } else {
            if (event.getStatus() != EventStatus.APPROUVE) {
                throw new ForbiddenException(
                        "Votre événement doit être approuvé par un admin avant publication.");
            }
        }

        event.setStatus(EventStatus.PUBLIE);
        return toResponse(eventRepository.save(event));
    }

    // ── GET PENDING ───────────────────────────────────────────────────────
    public List<EventResponse> getPendingEvents() {
        return eventRepository
                .findByStatusOrderBySubmittedAtAsc(EventStatus.EN_ATTENTE_VALIDATION)
                .stream().map(this::toResponse).toList();
    }

    // ── READ ONE ──────────────────────────────────────────────────────────
    public EventResponse getEventById(Long id) {
        return eventRepository.findById(id)
                .map(this::toResponse)
                .orElseThrow(() -> new EventNotFoundException(id));
    }

    // ── READ ALL ──────────────────────────────────────────────────────────
    public List<EventResponse> getAllEvents(EventStatus status, EventType type,
                                            Integer organizerId) {
        List<Event> events;

        if (organizerId != null && status != null) {
            events = eventRepository.findByOrganizerIdAndStatus(organizerId, status);
        } else if (organizerId != null && type != null) {
            events = eventRepository.findByOrganizerIdAndType(organizerId, type);
        } else if (organizerId != null) {
            events = eventRepository.findByOrganizerId(organizerId);
        } else if (status != null) {
            events = eventRepository.findByStatus(status);
        } else if (type != null) {
            events = eventRepository.findByType(type);
        } else {
            events = eventRepository.findAll();
        }

        return events.stream().map(this::toResponse).toList();
    }

    // ── UPDATE ────────────────────────────────────────────────────────────
    @Transactional
    public EventResponse updateEvent(Long id, UpdateEventRequest request,
                                     Integer userId, String role) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new EventNotFoundException(id));

        boolean isAdmin = "ADMIN".equals(role);
        boolean isOwner = event.getOrganizerId().equals(userId);

        if (!isAdmin && !isOwner) {
            throw new ForbiddenException("Vous ne pouvez modifier que vos propres événements.");
        }
        if (!isAdmin && event.getStatus() == EventStatus.EN_ATTENTE_VALIDATION) {
            throw new ForbiddenException(
                    "Vous ne pouvez pas modifier un événement en cours de validation.");
        }

        // Resolve effective dates for cross-field validation
        LocalDateTime effectiveStart = request.getStartDate() != null
                ? request.getStartDate() : event.getStartDate();
        LocalDateTime effectiveEnd = request.getEndDate() != null
                ? request.getEndDate() : event.getEndDate();
        validateDates(effectiveStart, effectiveEnd);

        if (request.getTitle() != null)        event.setTitle(request.getTitle());
        if (request.getDescription() != null)  event.setDescription(request.getDescription());
        if (request.getType() != null)         event.setType(request.getType());
        if (request.getStartDate() != null)    event.setStartDate(request.getStartDate());
        if (request.getEndDate() != null)      event.setEndDate(request.getEndDate());
        if (request.getLocationType() != null) event.setLocationType(request.getLocationType());
        if (request.getLocation() != null)     event.setLocation(request.getLocation());
        if (request.getTicketPrice() != null)  event.setTicketPrice(request.getTicketPrice());
        if (request.getTargetSector() != null) event.setTargetSector(request.getTargetSector());
        if (request.getTargetStage() != null)  event.setTargetStage(request.getTargetStage());

        // When capacity is increased, recalculate availablePlaces
        if (request.getCapacityMax() != null) {
            int oldMax = event.getCapacityMax() != null ? event.getCapacityMax() : 0;
            int newMax = request.getCapacityMax();
            int diff = newMax - oldMax;
            event.setCapacityMax(newMax);
            int currentAvailable = event.getAvailablePlaces() != null
                    ? event.getAvailablePlaces() : 0;
            int newAvailable = Math.max(0, currentAvailable + diff);
            event.setAvailablePlaces(newAvailable);
            event.setIsFull(newAvailable <= 0);
        }

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

    // ── DATE VALIDATION ───────────────────────────────────────────────────
    private void validateDates(LocalDateTime start, LocalDateTime end) {
        if (start != null && start.isBefore(LocalDateTime.now())) {
            throw new EventPastException();
        }
        if (start != null && end != null && !end.isAfter(start)) {
            throw new ForbiddenException(
                    "La date de fin doit être postérieure à la date de début.");
        }
    }

    // ── MAPPER ────────────────────────────────────────────────────────────
    private EventResponse toResponse(Event event) {
        String organizerName = "Organisateur #" + event.getOrganizerId();
        String organizerEmail = null;

        try {
            UserResponse user = userClient.getUserById(event.getOrganizerId());
            if (user != null) {
                String name = user.getName() != null ? user.getName() : "";
                String prenom = user.getPrenom() != null ? user.getPrenom() : "";
                String fullName = (name + " " + prenom).trim();
                organizerName = fullName.isEmpty()
                        ? "Organisateur #" + event.getOrganizerId()
                        : fullName;
                organizerEmail = user.getEmail();
            }
        } catch (Throwable t) {
            log.warn("Could not resolve organizer {} for event {}: {}",
                    event.getOrganizerId(), event.getId(), t.getMessage());
        }

        return EventResponse.builder()
                .id(event.getId())
                .title(event.getTitle())
                .description(event.getDescription())
                .type(event.getType())
                .status(event.getStatus())
                .startDate(event.getStartDate())
                .endDate(event.getEndDate())
                .locationType(event.getLocationType())
                .location(event.getLocation())
                .ticketPrice(event.getTicketPrice())
                .capacityMax(event.getCapacityMax())
                .availablePlaces(event.getAvailablePlaces())
                .isFull(event.getIsFull())
                .coverImageUrl(event.getCoverImageUrl())
                .targetSector(event.getTargetSector())
                .targetStage(event.getTargetStage())
                .organizerId(event.getOrganizerId())
                .organizerRole(event.getOrganizerRole())
                .organizerName(organizerName)
                .organizerEmail(organizerEmail)
                .createdAt(event.getCreatedAt())
                .rejectionReason(event.getRejectionReason())
                .validatedBy(event.getValidatedBy())
                .validatedAt(event.getValidatedAt())
                .submittedAt(event.getSubmittedAt())
                .build();
    }
}