package com.example.demo.dto;

import com.example.demo.enums.ProcedureType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.UUID;

public record CreateLegalProcedureRequest(
        @NotBlank String projectName,
        @NotNull ProcedureType procedureType,
        @NotNull UUID expertId,
        @Size(max = 5000) String description
) {}