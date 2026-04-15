package com.example.demo.dto;

import java.util.UUID;

public record ExpertSummaryResponse(
        UUID id,
        String fullName,
        String email
) {}