package com.example.demo.dto;


import com.example.demo.enums.DocumentStatus;
import jakarta.validation.constraints.NotNull;

public record UpdateLegalDocumentStatusRequest(@NotNull DocumentStatus status) {}

