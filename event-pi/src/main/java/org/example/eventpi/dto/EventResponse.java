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
    private LocalDateTime endDate;
    private LocationType locationType;
    private String location;
    private Double ticketPrice;
    private Integer capacityMax;
    private Integer availablePlaces;
    private Boolean isFull;
    private String coverImageUrl;
    private List<String> targetSector;
    private List<String> targetStage;
    private Integer organizerId;
    private String organizerRole;
    private String organizerName;
    private String organizerEmail;
    private LocalDateTime createdAt;
    private String rejectionReason;
    private Integer validatedBy;
    private LocalDateTime validatedAt;
    private LocalDateTime submittedAt;
    private Integer registeredCount;
    private String address;
    private Double latitude;
    private Double longitude;
}