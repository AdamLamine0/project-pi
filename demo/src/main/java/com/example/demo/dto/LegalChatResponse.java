package com.example.demo.dto;

public record LegalChatResponse(
        String answer,
        boolean llmAvailable,
        String disclaimer
) {}
