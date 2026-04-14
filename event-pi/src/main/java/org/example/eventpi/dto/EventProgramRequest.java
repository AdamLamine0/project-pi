package org.example.eventpi.dto;

import lombok.Data;
import org.example.eventpi.model.ProgramSlotType;
import java.time.LocalDateTime;

@Data
public class EventProgramRequest {
    private String title;
    private String description;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Integer orderIndex;
    private ProgramSlotType type;
    /** ID of an existing Speaker to assign to this slot. Null = no change. */
    private Long speakerId;
}