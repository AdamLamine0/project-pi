package org.example.partenariatpi.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * Sent by the original requester (user/admin) when they want to update
 * the suggested date/time after the partner proposed an alternative.
 * The invitation goes back to PENDING status for the partner to re-evaluate.
 */
@Data
public class UpdateMeetingTimeRequest {

    @NotNull(message = "New date/time is required")
    @Future(message = "New date/time must be in the future")
    private LocalDateTime newSuggestedDateTime;

    /** Optional note to accompany the updated time */
    private String note;
}