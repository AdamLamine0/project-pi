package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

public record CreateLegalDocumentRequest(
        @NotBlank @Size(max = 100) String documentType,
        @NotBlank String fileUrl,
        LocalDateTime expiresAt
) {}

