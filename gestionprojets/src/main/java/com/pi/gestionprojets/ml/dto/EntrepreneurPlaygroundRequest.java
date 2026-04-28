package com.pi.gestionprojets.ml.dto;

import java.util.List;
import java.util.Map;

public record EntrepreneurPlaygroundRequest(
        Long projectId,
        String title,
        String description,
        String sector,
        String stage,
        Double budget,
        String revenueModel,
        String teamSize,
        String userMessage,
        String documentTitle,
        String documentDraft,
        String tone,
        List<Map<String, Object>> conversation,
        String bmc,
        String swot,
        String budgetNotes,
        List<String> goals,
        List<Map<String, Object>> documents
) {
}
