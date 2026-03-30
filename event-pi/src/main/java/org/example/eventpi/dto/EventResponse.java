package org.example.eventpi.dto;

import lombok.Builder;
import lombok.Data;
import org.example.eventpi.model.EventStatus;
import org.example.eventpi.model.EventType;
import org.example.eventpi.model.LocationType;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class EventResponse {

    private Long id;
    private String title;
    private String description;
    private EventType type;
    private EventStatus status;
    private LocalDateTime startDate;
    private LocationType locationType;
    private Integer capacityMax;
    private String coverImageUrl;
    private List<String> targetSector;
    private List<String> targetStage;
    private Integer organizerId;
    private String organizerRole;
    private LocalDateTime createdAt;

    private String rejectionReason;
    private Integer validatedBy;
    private LocalDateTime validatedAt;
    private LocalDateTime submittedAt;
}