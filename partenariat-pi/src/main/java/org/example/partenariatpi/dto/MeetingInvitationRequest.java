package org.example.partenariatpi.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MeetingInvitationRequest {

    @NotBlank(message = "Requester name is required")
    private String requesterName;

    @NotBlank(message = "Subject is required")
    private String subject;

    @NotNull(message = "Suggested date/time is required")
    @Future(message = "Suggested date/time must be in the future")
    private LocalDateTime suggestedDateTime;

    // Optional duration in minutes. Defaults to 30 in service when null.
    private Integer durationMinutes;

    private String note;
}


