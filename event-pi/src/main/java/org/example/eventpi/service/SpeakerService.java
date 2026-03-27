package org.example.eventpi.service;

import lombok.RequiredArgsConstructor;
import org.example.eventpi.dto.SpeakerRequest;
import org.example.eventpi.dto.SpeakerResponse;
import org.example.eventpi.exception.EventNotFoundException;
import org.example.eventpi.model.Event;
import org.example.eventpi.model.Speaker;
import org.example.eventpi.repository.EventRepository;
import org.example.eventpi.repository.SpeakerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SpeakerService {

    private final SpeakerRepository speakerRepository;
    private final EventRepository eventRepository;

    public List<SpeakerResponse> getAll() {
        return speakerRepository.findAll().stream().map(this::toResponse).toList();
    }

    public SpeakerResponse getById(Long id) {
        return speakerRepository.findById(id)
                .map(this::toResponse)
                .orElseThrow(() -> new EventNotFoundException(id));
    }

    public List<SpeakerResponse> getByEvent(Long eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new EventNotFoundException(eventId));
        return event.getSpeakers().stream().map(this::toResponse).toList();
    }

    @Transactional
    public SpeakerResponse create(SpeakerRequest request) {
        Speaker speaker = Speaker.builder()
                .fullName(request.getFullName())
                .title(request.getTitle())
                .company(request.getCompany())
                .bio(request.getBio())
                .photoUrl(request.getPhotoUrl())
                .linkedinUrl(request.getLinkedinUrl())
                .events(new ArrayList<>())
                .build();
        return toResponse(speakerRepository.save(speaker));
    }

    @Transactional
    public SpeakerResponse update(Long id, SpeakerRequest request) {
        Speaker speaker = speakerRepository.findById(id)
                .orElseThrow(() -> new EventNotFoundException(id));

        if (request.getFullName() != null)    speaker.setFullName(request.getFullName());
        if (request.getTitle() != null)       speaker.setTitle(request.getTitle());
        if (request.getCompany() != null)     speaker.setCompany(request.getCompany());
        if (request.getBio() != null)         speaker.setBio(request.getBio());
        if (request.getPhotoUrl() != null)    speaker.setPhotoUrl(request.getPhotoUrl());
        if (request.getLinkedinUrl() != null) speaker.setLinkedinUrl(request.getLinkedinUrl());

        return toResponse(speakerRepository.save(speaker));
    }

    @Transactional
    public void delete(Long id) {
        if (!speakerRepository.existsById(id)) {
            throw new EventNotFoundException(id);
        }
        speakerRepository.deleteById(id);
    }

    @Transactional
    public SpeakerResponse linkToEvent(Long speakerId, Long eventId) {
        Speaker speaker = speakerRepository.findById(speakerId)
                .orElseThrow(() -> new EventNotFoundException(speakerId));
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new EventNotFoundException(eventId));

        if (!speaker.getEvents().contains(event)) {
            speaker.getEvents().add(event);
            speakerRepository.save(speaker);
        }
        return toResponse(speaker);
    }

    @Transactional
    public void unlinkFromEvent(Long speakerId, Long eventId) {
        Speaker speaker = speakerRepository.findById(speakerId)
                .orElseThrow(() -> new EventNotFoundException(speakerId));
        speaker.getEvents().removeIf(e -> e.getId().equals(eventId));
        speakerRepository.save(speaker);
    }

    private SpeakerResponse toResponse(Speaker s) {
        return SpeakerResponse.builder()
                .id(s.getId())
                .fullName(s.getFullName())
                .title(s.getTitle())
                .company(s.getCompany())
                .bio(s.getBio())
                .photoUrl(s.getPhotoUrl())
                .linkedinUrl(s.getLinkedinUrl())
                .eventIds(s.getEvents() != null
                        ? s.getEvents().stream().map(Event::getId).toList()
                        : List.of())
                .build();
    }
    @Transactional
    public void updatePhoto(Long id, String photoUrl) {
        Speaker speaker = speakerRepository.findById(id)
                .orElseThrow(() -> new EventNotFoundException(id));
        speaker.setPhotoUrl(photoUrl);
        speakerRepository.save(speaker);
    }
}