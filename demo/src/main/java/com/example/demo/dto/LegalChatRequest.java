package com.example.demo.dto;

import java.util.List;
import java.util.UUID;

public record LegalChatRequest(
        UUID procedureId,
        String procedureType,
        String procedureStatus,
        String projectName,
        String question,
        List<String> requiredDocuments,
        List<String> uploadedDocuments,
        List<String> missingDocuments,
        List<ChatMessage> history
) {
    public record ChatMessage(String role, String text) {
    }
}
