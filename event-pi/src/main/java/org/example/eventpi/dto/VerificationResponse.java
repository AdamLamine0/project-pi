package org.example.eventpi.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class VerificationResponse {
    private boolean valid;
    private String recipientName;
    private String eventTitle;
    private LocalDateTime eventDate;
    private LocalDateTime generatedAt;
    private String message;
}