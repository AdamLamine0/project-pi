package com.ai.ai_service.dto;

public record LegalChatResponse(
        String answer,
        boolean llmAvailable,
        String disclaimer
) {}
