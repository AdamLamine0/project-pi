package com.ai.ai_service.controller;

import com.ai.ai_service.dto.LegalAiAnalysisRequest;
import com.ai.ai_service.dto.LegalAiAnalysisResponse;
import com.ai.ai_service.dto.LegalChatRequest;
import com.ai.ai_service.dto.LegalChatResponse;
import com.ai.ai_service.service.GeminiLegalChatService;
import com.ai.ai_service.service.LegalAiAnalysisService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ai/legal")
public class LegalAiController {

    private static final Logger log = LoggerFactory.getLogger(LegalAiController.class);

    private final LegalAiAnalysisService legalAiAnalysisService;
    private final GeminiLegalChatService legalChatService;

    public LegalAiController(LegalAiAnalysisService legalAiAnalysisService, GeminiLegalChatService legalChatService) {
        this.legalAiAnalysisService = legalAiAnalysisService;
        this.legalChatService = legalChatService;
    }

    @PostMapping("/analyze")
    public ResponseEntity<LegalAiAnalysisResponse> analyze(@RequestBody LegalAiAnalysisRequest request) {
        try {
            return ResponseEntity.ok(legalAiAnalysisService.analyze(request));
        } catch (Throwable e) {
            log.error("AI legal analysis failed unexpectedly", e);
            return ResponseEntity.ok(legalAiAnalysisService.reviewResponse(
                    request,
                    "Unexpected AI service error: " + safeMessage(e)
            ));
        }
    }

    @PostMapping("/chat")
    public ResponseEntity<LegalChatResponse> chat(@RequestBody LegalChatRequest request) {
        return ResponseEntity.ok(legalChatService.answer(request));
    }

    private String safeMessage(Throwable e) {
        Throwable cursor = e;
        String message = null;
        while (cursor != null) {
            if (cursor.getMessage() != null && !cursor.getMessage().isBlank()) {
                message = cursor.getMessage();
            }
            cursor = cursor.getCause();
        }
        return message == null || message.isBlank()
                ? e.getClass().getSimpleName()
                : message;
    }
}
