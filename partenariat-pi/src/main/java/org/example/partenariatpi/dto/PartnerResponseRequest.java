package org.example.partenariatpi.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * Payload sent by the partner when responding to a meeting request.
 *
 * action = "ACCEPT"        → creates Zoom meeting, status becomes ACCEPTED
 * action = "REJECT"        → no Zoom created, status becomes REJECTED (comment required)
 * action = "SUGGEST_TIME"  → no Zoom created yet, status becomes TIME_SUGGESTED,
 *                            suggestedDateTime must be provided
 */
@Data
public class PartnerResponseRequest {

    /**
     * One of: ACCEPT | REJECT | SUGGEST_TIME
     */
    @NotBlank(message = "Action is required")
    private String action;

    /**
     * Required when action = REJECT or SUGGEST_TIME.
     * For REJECT: explains why the request was declined.
     * For SUGGEST_TIME: optional note to accompany the new proposed time.
     */
    private String comment;

    /**
     * Required when action = SUGGEST_TIME.
     * The partner-proposed alternative date/time.
     */
    private LocalDateTime suggestedDateTime;
}