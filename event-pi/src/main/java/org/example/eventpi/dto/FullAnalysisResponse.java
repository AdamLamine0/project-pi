package org.example.eventpi.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class FullAnalysisResponse {

    private RegistrationEstimate registrationEstimate;
    private OptimalSlot optimalSlot;
    private List<ConflictWarning> conflicts;
    private Integer suggestedCapacity;
    private Double successScore;
    private String label;

    // ── Nested types ───────────────────────────────────────────────────────

    @Data
    @Builder
    public static class RegistrationEstimate {
        private Integer min;
        private Integer max;
        private Integer pointEstimate;
        private Integer confidence;
    }

    @Data
    @Builder
    public static class OptimalSlot {
        private String dayName;
        private String timeWindow;
        private Integer boostVsAverage;
    }

    @Data
    @Builder
    public static class ConflictWarning {
        private String eventTitle;
        private String eventDate;
        private String eventType;
        /** HIGH = same type + same week; MEDIUM = same week only */
        private String severity;
    }
}
