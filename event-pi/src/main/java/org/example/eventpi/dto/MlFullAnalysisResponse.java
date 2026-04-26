package org.example.eventpi.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

/** Mirrors the Python /predict/full-analysis response schema. */
@Data
public class MlFullAnalysisResponse {

    @JsonProperty("registration_estimate")
    private RegistrationEstimate registrationEstimate;

    @JsonProperty("optimal_slot")
    private OptimalSlot optimalSlot;

    @JsonProperty("suggested_capacity")
    private Integer suggestedCapacity;

    @JsonProperty("success_score")
    private Double successScore;

    @JsonProperty("label")
    private String label;

    @Data
    public static class RegistrationEstimate {
        private Integer min;
        private Integer max;
        @JsonProperty("point_estimate") private Integer pointEstimate;
        private Integer confidence;
    }

    @Data
    public static class OptimalSlot {
        @JsonProperty("day_name")      private String dayName;
        @JsonProperty("time_window")   private String timeWindow;
        @JsonProperty("boost_vs_average") private Integer boostVsAverage;
    }
}
