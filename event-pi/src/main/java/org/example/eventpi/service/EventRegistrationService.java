package org.example.eventpi.service;

import lombok.RequiredArgsConstructor;
import org.example.eventpi.dto.EventRegistrationResponse;
import org.example.eventpi.exception.EventNotFoundException;
import org.example.eventpi.exception.ForbiddenException;
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
public class EventRegistrationService {

    private final EventRegistrationRepository registrationRepository;
    private final EventRepository eventRepository;

    // Register current user to event
    @Transactional
    public EventRegistrationResponse register(Long eventId, Integer userId) {
        if (registrationRepository.existsByEventIdAndUserId(eventId, userId)) {
            throw new ForbiddenException("Vous êtes déjà inscrit à cet événement.");
        }

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new EventNotFoundException(eventId));

        long currentCount = registrationRepository
                .countByEventIdAndStatus(eventId, RegistrationStatus.INSCRIT);

        RegistrationStatus status = (event.getCapacityMax() != null
                && currentCount >= event.getCapacityMax())
                ? RegistrationStatus.LISTE_ATTENTE
                : RegistrationStatus.INSCRIT;

        EventRegistration reg = EventRegistration.builder()
                .event(event)
                .userId(userId)
                .status(status)
                .attended(false)
                .build();

        return toResponse(registrationRepository.save(reg));
    }

    // Cancel registration
    @Transactional
    public EventRegistrationResponse cancel(Long eventId, Integer userId) {
        EventRegistration reg = registrationRepository
                .findByEventIdAndUserId(eventId, userId)
                .orElseThrow(() -> new EventNotFoundException(eventId));

        reg.setStatus(RegistrationStatus.ANNULE);
        return toResponse(registrationRepository.save(reg));
    }

    // Get all registrations for an event (admin/organizer)
    public List<EventRegistrationResponse> getByEvent(Long eventId) {
        return registrationRepository.findByEventId(eventId)
                .stream().map(this::toResponse).toList();
    }

    // Get all registrations for a user
    public List<EventRegistrationResponse> getByUser(Integer userId) {
        return registrationRepository.findByUserId(userId)
                .stream().map(this::toResponse).toList();
    }

    // Check-in (mark attendance)
    @Transactional
    public EventRegistrationResponse checkIn(Long registrationId) {
        EventRegistration reg = registrationRepository.findById(registrationId)
                .orElseThrow(() -> new EventNotFoundException(registrationId));

        reg.setAttended(true);
        reg.setCheckInTime(LocalDateTime.now());
        reg.setStatus(RegistrationStatus.PRESENT);
        return toResponse(registrationRepository.save(reg));
    }

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