package org.example.eventpi.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class FullAnalysisRequest {

    // ── ML features (forwarded to Python service) ──────────────────────────
    @JsonProperty("event_type")
    private Integer eventType;

    @JsonProperty("location_type")
    private Integer locationType;

    @JsonProperty("capacity_max")
    private Integer capacityMax;

    @JsonProperty("ticket_price")
    private Double ticketPrice;

    @JsonProperty("speaker_count")
    private Integer speakerCount;

    @JsonProperty("program_slots_count")
    private Integer programSlotsCount;

    @JsonProperty("sector_count")
    private Integer sectorCount;

    @JsonProperty("stage_count")
    private Integer stageCount;

    @JsonProperty("day_of_week")
    private Integer dayOfWeek;

    @JsonProperty("month")
    private Integer month;

    @JsonProperty("hour_of_day")
    private Integer hourOfDay;

    @JsonProperty("days_published_before_event")
    private Integer daysPublishedBeforeEvent;

    // ── Extra context for conflict detection (used by Java only) ───────────
    /** ISO-8601 datetime of the proposed event start (e.g. 2025-05-20T19:00:00) */
    private String proposedDate;

    /** String event type code, e.g. WEBINAIRE, WORKSHOP */
    private String eventTypeCode;
}
