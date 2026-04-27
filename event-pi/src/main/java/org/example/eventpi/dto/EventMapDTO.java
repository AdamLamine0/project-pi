package org.example.eventpi.dto;

import lombok.Builder;
import lombok.Data;
import org.example.eventpi.model.EventStatus;
import org.example.eventpi.model.EventType;

import java.time.LocalDateTime;

@Data
@Builder
public class EventMapDTO {
    private Long id;
    private String title;
    private EventType type;
    private EventStatus status;
    private LocalDateTime startDate;
    private String address;
    private Double latitude;
    private Double longitude;
    private String coverImage;
}
