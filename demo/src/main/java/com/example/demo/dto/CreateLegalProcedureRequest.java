package com.example.demo.dto;


import com.example.demo.enums.ProcedureType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public record CreateLegalProcedureRequest(
        @NotNull UUID entrepreneurId,
        UUID expertId,
        @NotNull ProcedureType procedureType,
        @Size(max = 5000) String notes
) {}

