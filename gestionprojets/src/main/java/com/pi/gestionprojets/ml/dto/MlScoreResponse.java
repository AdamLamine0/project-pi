package com.pi.gestionprojets.ml.dto;

import java.util.Map;

public record MlScoreResponse(
        Long projectId,
        Double score,
        Double confidence,
        String label,
        String explanation,
        Map<String, Double> featureBreakdown,
        String modelVersion) {
}
