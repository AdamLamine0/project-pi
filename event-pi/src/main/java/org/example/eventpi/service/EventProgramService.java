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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.example.eventpi.repository.EventProgramRepository;
import org.example.eventpi.repository.EventRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class EventProgramService {

    private final EventProgramRepository programRepository;
    private final EventRepository eventRepository;
    private final GeminiService geminiService;

    public List<EventProgramResponse> getByEvent(Long eventId) {
        return programRepository.findByEventIdOrderByOrderIndexAsc(eventId)
                .stream().map(this::toResponse).toList();
    }

    @Transactional
    public EventProgramResponse create(Long eventId, EventProgramRequest request) {
        var event = eventRepository.findById(eventId)
                .orElseThrow(() -> new EventNotFoundException(eventId));

        EventProgram slot = EventProgram.builder()
                .event(event)
                .title(request.getTitle())
                .description(request.getDescription())
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .orderIndex(request.getOrderIndex() != null ? request.getOrderIndex() : 0)
                .type(request.getType())
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

        return toResponse(programRepository.save(slot));
    }

    @Transactional
    public void delete(Long slotId) {
        if (!programRepository.existsById(slotId)) {
            throw new EventNotFoundException(slotId);
        }
        programRepository.deleteById(slotId);
    }

    // ── AI GENERATION ─────────────────────────────────────────────────────

    /**
     * Asks the AI to generate a program for the given event, persists the
     * resulting slots, and returns the saved responses.
     *
     * <p>Slots are appended after any existing program slots so that
     * manually-created slots are never overwritten. Times are calculated
     * sequentially starting from {@code event.startDate} (null if the
     * event has no start date yet).
     */
    @Transactional
    public List<EventProgramResponse> generateProgram(Long eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new EventNotFoundException(eventId));

        // Build the location context string for the AI prompt
        String locationCtx = event.getLocation() != null && !event.getLocation().isBlank()
                ? event.getLocation()
                : (event.getLocationType() != null
                        ? event.getLocationType().name()
                        : "Online");

        List<ProgramSlotDraft> drafts = geminiService.generateProgram(
                event.getTitle(),
                event.getType().name(),
                locationCtx
        );

        // Determine the next orderIndex so generated slots follow existing ones
        int nextIndex = programRepository
                .findByEventIdOrderByOrderIndexAsc(eventId)
                .stream()
                .mapToInt(EventProgram::getOrderIndex)
                .max()
                .orElse(-1) + 1;

        // Walk a cursor through time if the event has a start date
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

    /** Parses the AI-returned type string; falls back to PRESENTATION on unknown values. */
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
        return EventProgramResponse.builder()
                .id(p.getId())
                .eventId(p.getEvent().getId())
                .title(p.getTitle())
                .description(p.getDescription())
                .startTime(p.getStartTime())
                .endTime(p.getEndTime())
                .orderIndex(p.getOrderIndex())
                .type(p.getType())
                .build();
    }
}