package org.example.eventpi.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Data;
import org.example.eventpi.model.RegistrationStatus;

@Data
public class EventRegistrationRequest {
    private RegistrationStatus status;

    @Min(value = 1, message = "At least 1 place is required")
    @Max(value = 10, message = "Cannot reserve more than 10 places at once")
    private Integer numberOfPlaces;
}