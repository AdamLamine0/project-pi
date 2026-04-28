package com.example.demo.services;

import com.example.demo.config.AiServiceProperties;
import com.example.demo.dto.LegalAiAnalysisRequest;
import com.example.demo.dto.LegalAiAnalysisResponse;
import com.example.demo.dto.LegalAiDocumentRequest;
import com.example.demo.dto.LegalChatRequest;
import com.example.demo.dto.LegalChatResponse;
import com.example.demo.entity.LegalDocument;
import com.example.demo.entity.LegalProcedure;
import com.example.demo.enums.AiDecision;
import com.example.demo.enums.ProcedureStatus;
import com.example.demo.exception.BusinessException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.LegalDocumentRepository;
import com.example.demo.repository.LegalProcedureRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDateTime;
import java.time.Duration;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class LegalAiAnalysisService {

    private final LegalProcedureRepository procedureRepository;
    private final LegalDocumentRepository documentRepository;
    private final AiServiceProperties properties;
    private final WebClient.Builder webClientBuilder;

    @Transactional
    public LegalAiAnalysisResponse analyzeProcedure(UUID procedureId) {
        LegalProcedure procedure = procedureRepository.findById(procedureId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Legal case not found with id: " + procedureId));

        if (procedure.getStatus() != ProcedureStatus.EN_COURS) {
            throw new BusinessException("AI can only analyze IN_PROGRESS cases.");
        }

        List<LegalDocument> documents = documentRepository.findByProcedureId(procedureId);
        if (documents.isEmpty()) {
            throw new BusinessException("No documents to analyze.");
        }

        LegalAiAnalysisRequest request = new LegalAiAnalysisRequest(
                procedure.getId(),
                procedure.getProcedureType().name(),
                procedure.getProjectName(),
                documents.stream().map(this::toAiDocumentRequest).toList()
        );

        LegalAiAnalysisResponse response = webClientBuilder
                .baseUrl(properties.getBaseUrl())
                .build()
                .post()
                .uri("/api/ai/legal/analyze")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(LegalAiAnalysisResponse.class)
                .timeout(Duration.ofSeconds(properties.getTimeoutSeconds()))
                .block();

        if (response == null) {
            throw new BusinessException("The AI service did not return a response.");
        }

        applyAiDecision(procedure, response);
        procedureRepository.save(procedure);

        return response;
    }

    public void analyzeProcedureSafely(UUID procedureId) {
        try {
            analyzeProcedure(procedureId);
        } catch (RuntimeException e) {
            log.warn("AI service analysis failed for procedure {}: {}", procedureId, e.getMessage());
            procedureRepository.findById(procedureId).ifPresent(procedure -> {
                procedure.setRemark("AI analysis failed: " + e.getMessage());
                procedureRepository.save(procedure);
            });
        }
    }

    public LegalChatResponse chat(LegalChatRequest request) {
        LegalChatResponse response = webClientBuilder
                .baseUrl(properties.getBaseUrl())
                .build()
                .post()
                .uri("/api/ai/legal/chat")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(LegalChatResponse.class)
                .timeout(Duration.ofSeconds(properties.getTimeoutSeconds()))
                .block();

        if (response == null) {
            throw new BusinessException("The legal chatbot did not return a response.");
        }
        return response;
    }

    private LegalAiDocumentRequest toAiDocumentRequest(LegalDocument document) {
        return new LegalAiDocumentRequest(
                document.getId(),
                document.getRequirementCode(),
                document.getDocumentType(),
                document.getFileUrl(),
                document.getExpiresAt()
        );
    }

    private void applyAiDecision(LegalProcedure procedure, LegalAiAnalysisResponse response) {
        procedure.setRemark(response.remark());

        if (response.decision() == AiDecision.REJECTED) {
            procedure.setStatus(ProcedureStatus.REFUSE);
            procedure.setCompletedAt(null);
            return;
        }

        procedure.setStatus(ProcedureStatus.EN_ATTENTE_EXPERT);
        procedure.setCompletedAt(null);
    }
}
