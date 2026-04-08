package org.example.eventpi.dto;

import lombok.Builder;
import lombok.Data;
import org.example.eventpi.model.ProgramSlotType;
import java.time.LocalDateTime;

@Data
@Builder
public class EventProgramResponse {
    private Long id;
    private Long eventId;
    private String title;
    private String description;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Integer orderIndex;
    private ProgramSlotType type;
}