package com.example.demo.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record LegalAiDocumentRequest(
        UUID documentId,
        String requirementCode,
        String documentType,
        String fileUrl,
        LocalDateTime expiresAt
) {}
