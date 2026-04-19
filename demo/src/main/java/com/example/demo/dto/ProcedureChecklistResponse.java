package com.example.demo.dto;

import com.example.demo.enums.ProcedureType;

import java.util.List;
import java.util.UUID;

public record ProcedureChecklistResponse(
        UUID procedureId,
        ProcedureType procedureType,
        List<ProcedureChecklistItemResponse> items,
        long uploadedCount,
        long requiredCount,
        double completionPercentage
) {}
