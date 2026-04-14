package org.example.eventpi.dto;

import lombok.Builder;
import lombok.Data;
import org.example.eventpi.model.LocationType;
import org.example.eventpi.model.PaymentStatus;
import org.example.eventpi.model.RegistrationStatus;

import java.time.LocalDateTime;

@Data
@Builder
public class TicketResponse {
    private String ticketNumber;
    private Long registrationId;
    private Long eventId;
    private String eventTitle;
    private LocalDateTime eventDate;
    private LocalDateTime eventEndDate;
    private String eventLocation;
    private LocationType locationType;
    private Integer userId;
    private Double ticketPrice;
    private PaymentStatus paymentStatus;
    private RegistrationStatus registrationStatus;
    private LocalDateTime registeredAt;
    private String downloadUrl;
}
