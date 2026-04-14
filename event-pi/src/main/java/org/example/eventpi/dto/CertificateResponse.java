package org.example.eventpi.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class CertificateResponse {
    private Long id;
    private Integer userId;
    private Long eventId;
    private String recipientName;
    private String eventTitle;
    private LocalDateTime eventDate;
    private String verificationToken;
    private String downloadUrl;    // constructed by controller
    private LocalDateTime generatedAt;
}