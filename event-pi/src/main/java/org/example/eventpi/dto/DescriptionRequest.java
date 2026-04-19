package org.example.eventpi.dto;

import lombok.Data;

@Data
public class DescriptionRequest {
    private String title;
    private String date;
    private String eventType;
}