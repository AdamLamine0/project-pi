package org.example.eventpi.dto;

import lombok.Builder;
import lombok.Data;
import org.example.eventpi.model.PaymentStatus;
import org.example.eventpi.model.RegistrationStatus;
import java.time.LocalDateTime;

@Data
@Builder
public class EventRegistrationResponse {
    private Long id;
    private Long eventId;
    private String eventTitle;
    private Integer userId;
    private String userName;
    private RegistrationStatus status;
    private Boolean attended;
    private LocalDateTime checkInTime;
    private LocalDateTime registeredAt;
    private String ticketNumber;
    private PaymentStatus paymentStatus;
}