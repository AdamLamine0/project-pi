package com.example.demo.dto;


import com.example.demo.enums.ProcedureStatus;
import jakarta.validation.constraints.NotNull;

public record ChangeProcedureStatusRequest(@NotNull ProcedureStatus status) {}
