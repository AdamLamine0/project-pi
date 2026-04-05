package org.example.eventpi.dto;

import lombok.Data;
import org.example.eventpi.model.RegistrationStatus;

@Data
public class EventRegistrationRequest {
    private RegistrationStatus status;
}