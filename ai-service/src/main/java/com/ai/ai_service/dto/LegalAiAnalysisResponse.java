package com.ai.ai_service.dto;

import java.util.List;
import java.util.UUID;

public record LegalAiAnalysisResponse(
        UUID procedureId,
        AiDecision decision,
        String appliedStatus,
        boolean llmAvailable,
        String remark,
        List<String> technicalFindings,
        List<String> llmFindings,
        List<DocumentAiAnalysisResponse> documents
) {}
