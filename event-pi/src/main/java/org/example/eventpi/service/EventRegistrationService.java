package org.example.eventpi.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.eventpi.dto.EventRegistrationResponse;
import org.example.eventpi.dto.EventStatsResponse;
import org.example.eventpi.dto.UserResponse;
import org.example.eventpi.exception.EventFullException;
import org.example.eventpi.exception.EventNotFoundException;
import org.example.eventpi.exception.ForbiddenException;
import org.example.eventpi.feign.UserClient;
import org.example.eventpi.model.*;
import org.example.eventpi.repository.EventRegistrationRepository;
import org.example.eventpi.repository.EventRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class EventRegistrationService {

    private final EventRegistrationRepository registrationRepository;
    private final EventRepository eventRepository;
    private final NotificationService notificationService;
    private final UserClient userClient;
    private final BadgeService badgeService;

    // ── REGISTER ──────────────────────────────────────────────────────────
    @Transactional
    public EventRegistrationResponse register(Long eventId, Integer userId) {

        if (registrationRepository.existsByEventIdAndUserId(eventId, userId)) {
            throw new ForbiddenException("Vous êtes déjà inscrit(e) à cet événement.");
        }

        Event event = eventRepository.findByIdForUpdate(eventId)
                .orElseThrow(() -> new EventNotFoundException(eventId));

        if (event.getStatus() != EventStatus.PUBLIE) {
            throw new ForbiddenException(
                    "Les inscriptions ne sont pas ouvertes pour cet événement.");
        }

        // Determine if the user goes to waitlist or gets a confirmed seat
        RegistrationStatus regStatus;

        if (event.getCapacityMax() != null) {
            if (Boolean.TRUE.equals(event.getIsFull())) {
                // Event is full — place on waitlist
                regStatus = RegistrationStatus.LISTE_ATTENTE;
            } else {
                // Confirmed seat — decrement available places
                event.decrementAvailablePlaces();
                eventRepository.save(event);
                regStatus = RegistrationStatus.INSCRIT;
            }
        } else {
            // Unlimited capacity
            regStatus = RegistrationStatus.INSCRIT;
        }

        EventRegistration reg = EventRegistration.builder()
                .event(event)
                .userId(userId)
                .status(regStatus)
                .attended(false)
                .build();

        EventRegistration saved = registrationRepository.save(reg);

        try {
            UserResponse user = userClient.getUserById(userId);
            String fullName = user.getName() + " " + user.getPrenom();
            if (regStatus == RegistrationStatus.INSCRIT) {
                notificationService.sendRegistrationConfirmed(
                        user.getEmail(), fullName, saved);
            } else {
                notificationService.sendWaitlistNotification(
                        user.getEmail(), fullName, saved);
            }
        } catch (Exception e) {
            log.warn("Could not send notification for userId {}: {}",
                    userId, e.getMessage());
        }

        return toResponse(saved);
    }

    // ── CANCEL ────────────────────────────────────────────────────────────
    @Transactional
    public EventRegistrationResponse cancel(Long eventId, Integer userId) {

        EventRegistration reg = registrationRepository
                .findByEventIdAndUserId(eventId, userId)
                .orElseThrow(() -> new EventNotFoundException(eventId));

        if (reg.getStatus() == RegistrationStatus.ANNULE) {
            throw new ForbiddenException("Cette inscription est déjà annulée.");
        }

        boolean wasConfirmed = reg.getStatus() == RegistrationStatus.INSCRIT;
        reg.setStatus(RegistrationStatus.ANNULE);
        registrationRepository.save(reg);

        // Restore the seat on the event (use write lock so concurrent registrations
        // that are checking capacity see the freed seat immediately)
        if (wasConfirmed) {
            Event event = eventRepository.findByIdForUpdate(eventId)
                    .orElseThrow(() -> new EventNotFoundException(eventId));
            event.incrementAvailablePlaces();
            eventRepository.save(event);
        }

        try {
            UserResponse user = userClient.getUserById(userId);
            notificationService.sendCancellationConfirmed(
                    user.getEmail(),
                    user.getName() + " " + user.getPrenom(),
                    reg.getEvent()
            );
        } catch (Exception e) {
            log.warn("Could not send cancellation email: {}", e.getMessage());
        }

        if (wasConfirmed) {
            promoteFromWaitlist(eventId);
        }

        return toResponse(reg);
    }

    // ── WAITLIST PROMOTION ────────────────────────────────────────────────
    private void promoteFromWaitlist(Long eventId) {
        registrationRepository
                .findFirstByEventIdAndStatusOrderByRegisteredAtAsc(
                        eventId, RegistrationStatus.LISTE_ATTENTE)
                .ifPresent(waiting -> {
                    // Consume the seat that was just freed (re-fetch with lock)
                    Event event = eventRepository.findByIdForUpdate(eventId)
                            .orElseThrow(() -> new EventNotFoundException(eventId));
                    event.decrementAvailablePlaces();
                    eventRepository.save(event);

                    waiting.setStatus(RegistrationStatus.INSCRIT);
                    registrationRepository.save(waiting);
                    log.info("Promoted userId {} from waitlist for eventId {}",
                            waiting.getUserId(), eventId);

                    try {
                        UserResponse user = userClient.getUserById(waiting.getUserId());
                        notificationService.sendWaitlistPromotion(
                                user.getEmail(),
                                user.getName() + " " + user.getPrenom(),
                                waiting
                        );
                    } catch (Exception e) {
                        log.warn("Could not send promotion email: {}", e.getMessage());
                    }
                });
    }

    // ── CHECK IN ──────────────────────────────────────────────────────────
    @Transactional
    public EventRegistrationResponse checkIn(Long registrationId) {
        EventRegistration reg = registrationRepository.findById(registrationId)
                .orElseThrow(() -> new EventNotFoundException(registrationId));

        if (reg.getStatus() != RegistrationStatus.INSCRIT) {
            throw new ForbiddenException(
                    "Seuls les participants inscrits peuvent être checkés.");
        }

        reg.setAttended(true);
        reg.setCheckInTime(LocalDateTime.now());
        reg.setStatus(RegistrationStatus.PRESENT);
        EventRegistration saved = registrationRepository.save(reg);

        try {
            badgeService.onAttendanceConfirmed(
                    saved.getUserId(), saved.getEvent().getId());
        } catch (Exception e) {
            log.warn("Badge/certificate generation failed for userId={}: {}",
                    saved.getUserId(), e.getMessage());
        }

        return toResponse(saved);
    }

    // ── READ ──────────────────────────────────────────────────────────────
    public List<EventRegistrationResponse> getByEvent(Long eventId) {
        return registrationRepository.findByEventId(eventId)
                .stream().map(this::toResponse).toList();
    }

    public List<EventRegistrationResponse> getByUser(Integer userId) {
        return registrationRepository.findByUserId(userId)
                .stream().map(this::toResponse).toList();
    }

    // ── STATS ─────────────────────────────────────────────────────────────
    public EventStatsResponse getStats(Long eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new EventNotFoundException(eventId));

        List<EventRegistration> regs =
                registrationRepository.findByEventId(eventId);

        long confirmed = regs.stream()
                .filter(r -> r.getStatus() == RegistrationStatus.INSCRIT)
                .count();
        long waitlist = regs.stream()
                .filter(r -> r.getStatus() == RegistrationStatus.LISTE_ATTENTE)
                .count();
        long cancelled = regs.stream()
                .filter(r -> r.getStatus() == RegistrationStatus.ANNULE)
                .count();
        long attended = regs.stream()
                .filter(EventRegistration::getAttended)
                .count();
        int capacity = event.getCapacityMax() != null ? event.getCapacityMax() : 0;

        return EventStatsResponse.builder()
                .eventId(eventId)
                .eventTitle(event.getTitle())
                .capacityMax(capacity)
                .availablePlaces(event.getAvailablePlaces())
                .isFull(event.getIsFull())
                .totalRegistrations((int) (confirmed + waitlist))
                .confirmed((int) confirmed)
                .waitlist((int) waitlist)
                .cancelled((int) cancelled)
                .attended((int) attended)
                .attendanceRate(confirmed > 0
                        ? Math.round((double) attended / confirmed * 100) : 0)
                .fillRate(capacity > 0
                        ? Math.round((double) confirmed / capacity * 100) : 0)
                .build();
    }

    // ── MAPPER ────────────────────────────────────────────────────────────
    private EventRegistrationResponse toResponse(EventRegistration r) {
        return EventRegistrationResponse.builder()
                .id(r.getId())
                .eventId(r.getEvent().getId())
                .eventTitle(r.getEvent().getTitle())
                .userId(r.getUserId())
                .status(r.getStatus())
                .attended(r.getAttended())
                .checkInTime(r.getCheckInTime())
                .registeredAt(r.getRegisteredAt())
                .build();
    }
}