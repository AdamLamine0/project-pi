package com.example.demo.dto;

import java.util.UUID;

public record ProcedureChecklistItemResponse(
        String code,
        String label,
        String description,
        boolean required,
        boolean uploaded,
        String fileUrl,
        UUID documentId
) {}
