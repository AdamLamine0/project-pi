package org.example.eventpi.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class WeatherResponse {
    private boolean available;
    private String reason;
    private Double temperature;
    private Double feelsLike;
    private String description;
    private String icon;
    private String iconUrl;
    private Integer humidity;
    private Double windSpeedKmh;
    private Integer rainProbability;
    private String condition;       // EXCELLENT | GOOD | FAIR | POOR
    private String conditionLabel;
    private String location;
}
