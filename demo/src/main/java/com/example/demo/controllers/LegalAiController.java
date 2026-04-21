package com.example.demo.controllers;

import com.example.demo.dto.LegalAiAnalysisResponse;
import com.example.demo.dto.LegalChatRequest;
import com.example.demo.dto.LegalChatResponse;
import com.example.demo.services.LegalAiAnalysisService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/legal-procedures")
@RequiredArgsConstructor
public class LegalAiController {

    private final LegalAiAnalysisService legalAiAnalysisService;

    @PostMapping("/{id}/ai-analysis")
    public ResponseEntity<LegalAiAnalysisResponse> analyze(@PathVariable UUID id) {
        return ResponseEntity.ok(legalAiAnalysisService.analyzeProcedure(id));
    }

    @PostMapping("/ai-chat")
    public ResponseEntity<LegalChatResponse> chat(@RequestBody LegalChatRequest request) {
        return ResponseEntity.ok(legalAiAnalysisService.chat(request));
    }
}
