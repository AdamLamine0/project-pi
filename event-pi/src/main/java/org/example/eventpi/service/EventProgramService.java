package org.example.eventpi.service;

import lombok.RequiredArgsConstructor;
import org.example.eventpi.dto.EventProgramRequest;
import org.example.eventpi.dto.EventProgramResponse;
import org.example.eventpi.exception.EventNotFoundException;
import org.example.eventpi.model.EventProgram;
import org.example.eventpi.repository.EventProgramRepository;
import org.example.eventpi.repository.EventRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EventProgramService {

    private final EventProgramRepository programRepository;
    private final EventRepository eventRepository;

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