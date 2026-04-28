package com.pi.gestionprojets.ml.dto;

import java.util.List;
import java.util.Map;

public record MlProjectRequest(
        Long projectId,
        String title,
        String description,
        String sector,
        String stage,
        Double budget,
        String teamSize,
        String revenueModel,
        Boolean hasPitchDeck,
        Boolean hasBusinessPlan,
        List<String> objectives,
        String feedback,
        String documentSummary,
        List<String> documentTexts,
        List<String> webSources,
        Map<String, Object> extraFeatures) {
}
