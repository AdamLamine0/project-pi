package com.ai.ai_service.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record DocumentAnalysisRequest(
        UUID documentId,
        String requirementCode,
        String documentType,
        String fileUrl,
        LocalDateTime expiresAt
) {}
