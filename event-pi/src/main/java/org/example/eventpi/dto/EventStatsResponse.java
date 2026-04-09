package org.example.eventpi.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EventStatsResponse {
    private Long eventId;
    private String eventTitle;
    private int capacityMax;
    private Integer availablePlaces;
    private Boolean isFull;
    private int totalRegistrations;
    private int confirmed;
    private int waitlist;
    private int cancelled;
    private int attended;
    private long attendanceRate;
    private long fillRate;
}