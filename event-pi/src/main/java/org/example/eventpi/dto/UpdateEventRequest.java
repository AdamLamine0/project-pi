package org.example.eventpi.dto;

import lombok.Data;
import org.example.eventpi.model.EventStatus;
import org.example.eventpi.model.EventType;
import org.example.eventpi.model.LocationType;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class UpdateEventRequest {


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
}