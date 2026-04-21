package com.example.demo.dto;

import com.example.demo.enums.ProcedureStatus;
import com.example.demo.enums.ProcedureType;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record LegalProcedureResponse(
        UUID id,
        Integer entrepreneurId,
        Integer expertId,
        String projectName,
        ProcedureType procedureType,
        String description,
        ProcedureStatus status,
        String remark,
        Float completionRate,
        LocalDateTime createdAt,
        LocalDateTime submittedAt,
        LocalDateTime completedAt,
        String finalDocumentUrl,
        LocalDateTime finalDocumentGeneratedAt,
        List<LegalDocumentResponse> documents
) {}
