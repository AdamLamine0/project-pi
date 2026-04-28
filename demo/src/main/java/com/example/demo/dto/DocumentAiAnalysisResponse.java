package com.example.demo.dto;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public record DocumentAiAnalysisResponse(
        UUID documentId,
        String requirementCode,
        String fileUrl,
        boolean ocrAvailable,
        int extractedTextLength,
        String extractedTextPreview,
        boolean visionAvailable,
        Double blurScore,
        boolean blurred,
        LocalDate detectedExpirationDate,
        boolean expired,
        List<String> findings
) {}
