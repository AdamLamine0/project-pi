package com.example.demo.dto;

import com.example.demo.enums.AiDecision;
import com.example.demo.enums.ProcedureStatus;

import java.util.List;
import java.util.UUID;

public record LegalAiAnalysisResponse(
        UUID procedureId,
        AiDecision decision,
        ProcedureStatus appliedStatus,
        boolean llmAvailable,
        String remark,
        List<String> technicalFindings,
        List<String> llmFindings,
        List<DocumentAiAnalysisResponse> documents
) {}
