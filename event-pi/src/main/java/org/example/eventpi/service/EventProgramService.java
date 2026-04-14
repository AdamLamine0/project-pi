package org.example.eventpi.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.eventpi.dto.EventProgramRequest;
import org.example.eventpi.dto.EventProgramResponse;
import org.example.eventpi.dto.ProgramSlotDraft;
import org.example.eventpi.exception.EventNotFoundException;
import org.example.eventpi.model.Event;
import org.example.eventpi.model.EventProgram;
import org.example.eventpi.model.ProgramSlotType;
import org.example.eventpi.model.Speaker;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.example.eventpi.repository.EventProgramRepository;
import org.example.eventpi.repository.EventRepository;
import org.example.eventpi.repository.SpeakerRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class EventProgramService {

    private final EventProgramRepository programRepository;
    private final EventRepository        eventRepository;
    private final SpeakerRepository      speakerRepository;
    private final GeminiService          geminiService;

    // ── READ ─────────────────────────────────────────────────────────────────

    public List<EventProgramResponse> getByEvent(Long eventId) {
        // Fetch-join avoids N+1 when mapping speaker fields inside toResponse()
        return programRepository.findByEventIdWithSpeaker(eventId)
                .stream().map(this::toResponse).toList();
    }

    // ── WRITE ────────────────────────────────────────────────────────────────

    @Transactional
    public EventProgramResponse create(Long eventId, EventProgramRequest request) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new EventNotFoundException(eventId));

        Speaker speaker = resolveSpeaker(request.getSpeakerId());

        EventProgram slot = EventProgram.builder()
                .event(event)
                .title(request.getTitle())
                .description(request.getDescription())
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .orderIndex(request.getOrderIndex() != null ? request.getOrderIndex() : 0)
                .type(request.getType() != null ? request.getType() : ProgramSlotType.PRESENTATION)
                .speaker(speaker)
                .build();

        return toResponse(programRepository.save(slot));
    }

    @Transactional
    public EventProgramResponse update(Long slotId, EventProgramRequest request) {
        EventProgram slot = programRepository.findById(slotId)
                .orElseThrow(() -> new EventNotFoundException(slotId));

        if (request.getTitle() != null)       slot.setTitle(request.getTitle());
        if (request.getDescription() != null) slot.setDescription(request.getDescription());
        if (request.getStartTime() != null)   slot.setStartTime(request.getStartTime());
        if (request.getEndTime() != null)     slot.setEndTime(request.getEndTime());
        if (request.getOrderIndex() != null)  slot.setOrderIndex(request.getOrderIndex());
        if (request.getType() != null)        slot.setType(request.getType());
        // Non-null speakerId → assign; existing speaker remains if omitted
        if (request.getSpeakerId() != null)   slot.setSpeaker(resolveSpeaker(request.getSpeakerId()));

        return toResponse(programRepository.save(slot));
    }

    @Transactional
    public void delete(Long slotId) {
        if (!programRepository.existsById(slotId)) {
            throw new EventNotFoundException(slotId);
        }
        programRepository.deleteById(slotId);
    }

    /** Removes the assigned speaker from a program slot without deleting the speaker. */
    @Transactional
    public EventProgramResponse unassignSpeaker(Long slotId) {
        EventProgram slot = programRepository.findById(slotId)
                .orElseThrow(() -> new EventNotFoundException(slotId));
        slot.setSpeaker(null);
        return toResponse(programRepository.save(slot));
    }

    // ── AI GENERATION ────────────────────────────────────────────────────────

    /**
     * Asks the AI to generate a program for the given event, persists the
     * resulting slots, and returns the saved responses.
     *
     * <p>Slots are appended after any existing program slots so that
     * manually-created slots are never overwritten. Times are calculated
     * sequentially starting from {@code event.startDate}.
     */
    @Transactional
    public List<EventProgramResponse> generateProgram(Long eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new EventNotFoundException(eventId));

        String locationCtx = event.getLocation() != null && !event.getLocation().isBlank()
                ? event.getLocation()
                : (event.getLocationType() != null ? event.getLocationType().name() : "Online");

        List<ProgramSlotDraft> drafts = geminiService.generateProgram(
                event.getTitle(), event.getType().name(), locationCtx);

        int nextIndex = programRepository
                .findByEventIdOrderByOrderIndexAsc(eventId)
                .stream()
                .mapToInt(EventProgram::getOrderIndex)
                .max()
                .orElse(-1) + 1;

        LocalDateTime cursor = event.getStartDate();
        List<EventProgram> saved = new ArrayList<>();

        for (int i = 0; i < drafts.size(); i++) {
            ProgramSlotDraft draft = drafts.get(i);
            ProgramSlotType slotType = toSlotType(draft.getType());
            int duration = draft.getDurationMinutes() != null
                    ? Math.max(5, draft.getDurationMinutes()) : 60;

            LocalDateTime slotStart = cursor;
            LocalDateTime slotEnd   = cursor != null ? cursor.plusMinutes(duration) : null;

            EventProgram slot = EventProgram.builder()
                    .event(event)
                    .title(draft.getTitle() != null ? draft.getTitle() : "Créneau " + (i + 1))
                    .description(draft.getDescription())
                    .startTime(slotStart)
                    .endTime(slotEnd)
                    .orderIndex(nextIndex + i)
                    .type(slotType)
                    .build();

            saved.add(programRepository.save(slot));
            log.info("AI slot saved: [{}] {} ({} min)", slotType, slot.getTitle(), duration);
            if (cursor != null) cursor = slotEnd;
        }

        return saved.stream().map(this::toResponse).toList();
    }

    // ── HELPERS ──────────────────────────────────────────────────────────────

    private Speaker resolveSpeaker(Long speakerId) {
        if (speakerId == null) return null;
        return speakerRepository.findById(speakerId)
                .orElseThrow(() -> new EventNotFoundException(speakerId));
    }

    private ProgramSlotType toSlotType(String raw) {
        if (raw == null) return ProgramSlotType.PRESENTATION;
        try {
            return ProgramSlotType.valueOf(raw.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            log.warn("Unknown slot type from AI: '{}', defaulting to PRESENTATION", raw);
            return ProgramSlotType.PRESENTATION;
        }
    }

    private EventProgramResponse toResponse(EventProgram p) {
        Speaker s = p.getSpeaker();
        return EventProgramResponse.builder()
                .id(p.getId())
                .eventId(p.getEvent().getId())
                .title(p.getTitle())
                .description(p.getDescription())
                .startTime(p.getStartTime())
                .endTime(p.getEndTime())
                .orderIndex(p.getOrderIndex())
                .type(p.getType())
                .speakerId(s != null ? s.getId() : null)
                .speakerName(s != null ? s.getFullName() : null)
                .speakerTitle(s != null ? s.getTitle() : null)
                .speakerCompany(s != null ? s.getCompany() : null)
                .speakerPhotoUrl(s != null ? s.getPhotoUrl() : null)
                .speakerLinkedinUrl(s != null ? s.getLinkedinUrl() : null)
                .build();
    }
}
