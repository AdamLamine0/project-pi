package com.example.demo.dto;


import com.example.demo.enums.ProcedureType;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public record UpdateLegalProcedureRequest(
        UUID expertId,
        ProcedureType procedureType,
        @Size(max = 5000) String notes
) {}

