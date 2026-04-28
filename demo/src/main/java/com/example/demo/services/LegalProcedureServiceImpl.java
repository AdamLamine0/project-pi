package com.example.demo.services;

import com.example.demo.dto.CreateLegalProcedureRequest;
import com.example.demo.dto.ExpertDecisionRequest;
import com.example.demo.dto.LegalProcedureResponse;
import com.example.demo.dto.LegalProcedureStatsResponse;
import com.example.demo.entity.LegalProcedure;
import com.example.demo.enums.DocumentStatus;
import com.example.demo.enums.ProcedureStatus;
import com.example.demo.exception.BusinessException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.mapper.LegalMapper;
import com.example.demo.repository.LegalDocumentRepository;
import com.example.demo.repository.LegalProcedureRepository;
import com.example.demo.repository.ProcedureDocumentRequirementRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Map;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class LegalProcedureServiceImpl implements LegalProcedureService {

    private final LegalProcedureRepository procedureRepository;
    private final LegalDocumentRepository documentRepository;
    private final ProcedureDocumentRequirementRepository requirementRepository;
    private final LegalMapper mapper;
    private final ChecklistService checklistService;
    private final LegalAiAnalysisService legalAiAnalysisService;
    private final FinalLegalDocumentService finalLegalDocumentService;

    @Override
    public LegalProcedureResponse create(CreateLegalProcedureRequest request, Integer entrepreneurId) {
        if (request.procedureType() == com.example.demo.enums.ProcedureType.AUTRE) {
            throw new BusinessException("This procedure type is no longer available.");
        }

        LegalProcedure procedure = LegalProcedure.builder()
                .entrepreneurId(entrepreneurId)
                .expertId(request.expertId())
                .projectName(request.projectName())
                .procedureType(request.procedureType())
                .status(ProcedureStatus.BROUILLON)
                .completionRate(0F)
                .build();

        return mapper.toProcedureResponse(procedureRepository.save(procedure));
    }

    @Override
    @Transactional(readOnly = true)
    public List<LegalProcedureResponse> findAll() {
        return procedureRepository.findAll()
                .stream()
                .map(mapper::toProcedureResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<LegalProcedureResponse> findByEntrepreneur(Integer entrepreneurId) {
        return procedureRepository.findByEntrepreneurId(entrepreneurId)
                .stream()
                .map(mapper::toProcedureResponse)
                .toList();
    }

    @Override
    public LegalProcedureResponse findById(UUID id) {
        LegalProcedure procedure = getProcedureEntity(id);
        ensureFinalDocumentGenerated(procedure);
        return mapper.toProcedureResponse(procedure);
    }

    @Override
    public LegalProcedureResponse submit(UUID id, Integer entrepreneurId) {
        LegalProcedure procedure = getProcedureEntity(id);

        if (!procedure.getEntrepreneurId().equals(entrepreneurId)) {
            throw new BusinessException("Access to this case is not authorized.");
        }
        if (procedure.getStatus() != ProcedureStatus.BROUILLON
                && procedure.getStatus() != ProcedureStatus.REFUSE) {
            throw new BusinessException("Only a DRAFT or REJECTED case can be submitted.");
        }

        boolean allUploaded = checklistService.areAllRequiredDocumentsUploaded(id);
        if (!allUploaded) {
            throw new BusinessException("All required documents must be uploaded before submission.");
        }

        procedure.setStatus(ProcedureStatus.EN_COURS);
        procedure.setSubmittedAt(LocalDateTime.now());
        procedure.setCompletedAt(null);
        procedure.setRemark(null);
        recalculateCompletionRate(procedure);
        procedureRepository.save(procedure);
        scheduleAiAnalysisAfterCommit(id);

        return mapper.toProcedureResponse(procedure);
    }

    @Override
    public void deleteDraft(UUID id, Integer entrepreneurId) {
        LegalProcedure procedure = getProcedureEntity(id);

        if (!procedure.getEntrepreneurId().equals(entrepreneurId)) {
            throw new BusinessException("Unauthorized access.");
        }
        if (procedure.getStatus() != ProcedureStatus.BROUILLON) {
            throw new BusinessException("Only a DRAFT case can be deleted.");
        }

        procedureRepository.delete(procedure);
    }

    @Override
    @Transactional(readOnly = true)
    public List<LegalProcedureResponse> findByExpert(Integer expertId) {
        return procedureRepository
                .findByExpertIdAndStatus(expertId, ProcedureStatus.EN_ATTENTE_EXPERT)
                .stream()
                .map(mapper::toProcedureResponse)
                .toList();
    }

    @Override
    public LegalProcedureResponse applyExpertDecision(UUID id, ExpertDecisionRequest request, Integer expertId) {
        LegalProcedure procedure = getProcedureEntity(id);

        if (!procedure.getExpertId().equals(expertId)) {
            throw new BusinessException("This case is not assigned to you.");
        }
        if (procedure.getStatus() != ProcedureStatus.EN_ATTENTE_EXPERT) {
            throw new BusinessException("The case must be WAITING_FOR_EXPERT_REVIEW before an expert decision can be made.");
        }

        procedure.setStatus(request.approved() ? ProcedureStatus.COMPLETE : ProcedureStatus.REFUSE);
        procedure.setCompletedAt(LocalDateTime.now());

        if (request.remark() != null) {
            procedure.setRemark(request.remark());
        }

        if (request.approved()) {
            String finalDocumentUrl = finalLegalDocumentService.generate(procedure);
            procedure.setFinalDocumentUrl(finalDocumentUrl);
            procedure.setFinalDocumentGeneratedAt(LocalDateTime.now());
            procedure.setFinalDocumentTemplateVersion(FinalLegalDocumentService.TEMPLATE_VERSION);
        } else {
            procedure.setFinalDocumentUrl(null);
            procedure.setFinalDocumentGeneratedAt(null);
            procedure.setFinalDocumentTemplateVersion(null);
        }

        recalculateCompletionRate(procedure);
        return mapper.toProcedureResponse(procedureRepository.save(procedure));
    }

    @Override
    @Transactional(readOnly = true)
    public LegalProcedureStatsResponse getStats() {
        long total = procedureRepository.count();
        Map<String, Long> byType = Arrays.stream(com.example.demo.enums.ProcedureType.values())
                .collect(Collectors.toMap(Enum::name, procedureRepository::countByProcedureType));
        double averageCompletion = total == 0 ? 0 : procedureRepository.findAll()
                .stream()
                .map(LegalProcedure::getCompletionRate)
                .filter(rate -> rate != null)
                .mapToDouble(Float::doubleValue)
                .average()
                .orElse(0);

        return new LegalProcedureStatsResponse(
                total,
                procedureRepository.countByStatus(ProcedureStatus.BROUILLON),
                procedureRepository.countByStatus(ProcedureStatus.EN_COURS),
                procedureRepository.countByStatus(ProcedureStatus.EN_ATTENTE_EXPERT),
                procedureRepository.countByStatus(ProcedureStatus.COMPLETE),
                procedureRepository.countByStatus(ProcedureStatus.REFUSE),
                Math.round(averageCompletion * 10.0) / 10.0,
                byType
        );
    }

    @Override
    public LegalProcedureResponse setAiResult(UUID id, boolean approved, String remark) {
        LegalProcedure procedure = getProcedureEntity(id);

        if (procedure.getStatus() != ProcedureStatus.EN_COURS) {
            throw new BusinessException("AI can only analyze an IN_PROGRESS case.");
        }

        if (approved) {
            procedure.setStatus(ProcedureStatus.EN_ATTENTE_EXPERT);
            procedure.setCompletedAt(null);
        } else {
            procedure.setStatus(ProcedureStatus.REFUSE);
            procedure.setCompletedAt(null);
        }

        if (remark != null) {
            procedure.setRemark(remark);
        }

        recalculateCompletionRate(procedure);
        return mapper.toProcedureResponse(procedureRepository.save(procedure));
    }

    private LegalProcedure getProcedureEntity(UUID id) {
        return procedureRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Legal case not found with id: " + id));
    }

    private void ensureFinalDocumentGenerated(LegalProcedure procedure) {
        if (procedure.getStatus() != ProcedureStatus.COMPLETE) {
            return;
        }
        boolean hasCurrentDocument = procedure.getFinalDocumentUrl() != null
                && !procedure.getFinalDocumentUrl().isBlank()
                && FinalLegalDocumentService.TEMPLATE_VERSION.equals(procedure.getFinalDocumentTemplateVersion());
        if (hasCurrentDocument) {
            return;
        }

        String finalDocumentUrl = finalLegalDocumentService.generate(procedure);
        procedure.setFinalDocumentUrl(finalDocumentUrl);
        procedure.setFinalDocumentGeneratedAt(LocalDateTime.now());
        procedure.setFinalDocumentTemplateVersion(FinalLegalDocumentService.TEMPLATE_VERSION);
        procedureRepository.save(procedure);
    }

    private void recalculateCompletionRate(LegalProcedure procedure) {
        if (procedure.getStatus() == ProcedureStatus.COMPLETE) {
            procedure.setCompletionRate(100F);
            return;
        }

        if (procedure.getStatus() == ProcedureStatus.EN_ATTENTE_EXPERT
                || procedure.getStatus() == ProcedureStatus.EN_COURS) {
            procedure.setCompletionRate(50F);
            return;
        }

        List<String> requiredCodes = requirementRepository
                .findByProcedureType(procedure.getProcedureType())
                .stream()
                .filter(requirement -> Boolean.TRUE.equals(requirement.getRequired()))
                .map(requirement -> requirement.getCode())
                .toList();

        if (requiredCodes.isEmpty()) {
            procedure.setCompletionRate(0F);
            return;
        }

        long uploadedRequired = documentRepository.findByProcedureId(procedure.getId())
                .stream()
                .filter(document -> requiredCodes.contains(document.getRequirementCode()))
                .filter(document -> document.getStatus() != DocumentStatus.NON_DEPOSE)
                .count();

        float rate = ((float) uploadedRequired / requiredCodes.size()) * 50F;
        procedure.setCompletionRate(Math.round(rate * 100f) / 100f);
    }

    private void scheduleAiAnalysisAfterCommit(UUID procedureId) {
        Runnable task = () -> legalAiAnalysisService.analyzeProcedureSafely(procedureId);

        if (TransactionSynchronizationManager.isSynchronizationActive()) {
            TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
                @Override
                public void afterCommit() {
                    CompletableFuture.runAsync(task);
                }
            });
            return;
        }

        CompletableFuture.runAsync(task);
    }
}
