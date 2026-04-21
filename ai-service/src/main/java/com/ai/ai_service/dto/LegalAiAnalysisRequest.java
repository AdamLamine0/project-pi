package com.ai.ai_service.dto;

import java.util.List;
import java.util.UUID;

public record LegalAiAnalysisRequest(
        UUID procedureId,
        String procedureType,
        String projectName,
        List<DocumentAnalysisRequest> documents
) {}
