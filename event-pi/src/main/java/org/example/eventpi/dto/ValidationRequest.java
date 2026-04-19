package org.example.eventpi.dto;

import lombok.Data;

@Data
public class ValidationRequest {
    private String rejectionReason; // only used when rejecting
}