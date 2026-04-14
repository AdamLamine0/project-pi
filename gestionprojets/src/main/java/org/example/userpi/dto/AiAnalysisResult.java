package org.example.userpi.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AiAnalysisResult {
    private String validationStatus;       // VALID, INVALID
    private List<String> validationReasons;
    private String plagiarismStatus;       // CLEAR, FLAGGED, REJECTED
    private Double plagiarismSimilarityScore;
    private String plagiarismDetails;
    private Integer maturityScore;         // 0-100
    private Integer innovationScore;
    private Integer marketViabilityScore;
    private Integer teamScore;
    private Integer tractionScore;
    private Integer feasibilityScore;
    private Boolean roadmapGenerated;
}
