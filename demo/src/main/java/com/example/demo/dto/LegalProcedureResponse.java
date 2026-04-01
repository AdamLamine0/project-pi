package com.example.demo.dto;



import com.example.demo.enums.ProcedureStatus;
import com.example.demo.enums.ProcedureType;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record LegalProcedureResponse(
        UUID id,
        UUID entrepreneurId,
        UUID expertId,
        ProcedureType procedureType,
        ProcedureStatus status,
        Float completionRate,
        LocalDateTime createdAt,
        LocalDateTime submittedAt,
        LocalDateTime completedAt,
        String notes,
        List<LegalDocumentResponse> documents
) {}

