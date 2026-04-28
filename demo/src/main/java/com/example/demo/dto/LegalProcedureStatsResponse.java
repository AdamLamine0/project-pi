package com.example.demo.dto;

import java.util.Map;

public record LegalProcedureStatsResponse(
        long total,
        long drafts,
        long inProgress,
        long waitingExpert,
        long completed,
        long rejected,
        double averageCompletion,
        Map<String, Long> byType
) {
}
