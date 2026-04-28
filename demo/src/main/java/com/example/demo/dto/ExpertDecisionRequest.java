package com.example.demo.dto;

import jakarta.validation.constraints.NotNull;

public record ExpertDecisionRequest(
        @NotNull Boolean approved,
        String remark
) {}