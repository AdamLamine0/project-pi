package com.example.demo.dto;

import com.example.demo.enums.DocumentStatus;
import java.time.LocalDateTime;
import java.util.UUID;

public record LegalDocumentResponse(
        UUID id,
        String requirementCode,
        String documentType,
        String fileUrl,
        DocumentStatus status,
        LocalDateTime uploadedAt,
        LocalDateTime expiresAt
) {}