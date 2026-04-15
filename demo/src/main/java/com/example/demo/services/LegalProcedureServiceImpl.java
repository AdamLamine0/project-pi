package com.example.demo.services;

import com.example.demo.dto.*;
import com.example.demo.entity.LegalProcedure;
import com.example.demo.enums.DocumentStatus;
import com.example.demo.enums.ProcedureStatus;
import com.example.demo.exception.BusinessException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.mapper.LegalMapper;
import com.example.demo.repository.LegalDocumentRepository;
import com.example.demo.repository.LegalProcedureRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class LegalProcedureServiceImpl implements LegalProcedureService {

    private final LegalProcedureRepository procedureRepository;
    private final LegalDocumentRepository documentRepository;
    private final LegalMapper mapper;
    private final ChecklistService checklistService;

    @Override
    public LegalProcedureResponse create(CreateLegalProcedureRequest request, Integer entrepreneurId) {
        LegalProcedure procedure = LegalProcedure.builder()
                .entrepreneurId(entrepreneurId)
                .expertId(request.expertId())
                .projectName(request.projectName())
                .procedureType(request.procedureType())
                .description(request.description())
                .status(ProcedureStatus.BROUILLON)
                .completionRate(0F)
                .build();

        return mapper.toProcedureResponse(procedureRepository.save(procedure));
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
    @Transactional(readOnly = true)
    public LegalProcedureResponse findById(UUID id) {
        return mapper.toProcedureResponse(getProcedureEntity(id));
    }

    @Override
    public LegalProcedureResponse submit(UUID id, Integer entrepreneurId) {
        LegalProcedure procedure = getProcedureEntity(id);

        if (!procedure.getEntrepreneurId().equals(entrepreneurId)) {
            throw new BusinessException("Accès non autorisé à ce dossier.");
        }
        if (procedure.getStatus() != ProcedureStatus.BROUILLON) {
            throw new BusinessException("Seul un dossier en BROUILLON peut être soumis.");
        }

        boolean allUploaded = checklistService.areAllRequiredDocumentsUploaded(id);
        if (!allUploaded) {
            throw new BusinessException("Tous les documents obligatoires doivent être déposés avant la soumission.");
        }

        procedure.setStatus(ProcedureStatus.EN_COURS);
        procedure.setSubmittedAt(LocalDateTime.now());
        recalculateCompletionRate(procedure);

        return mapper.toProcedureResponse(procedureRepository.save(procedure));
    }

    @Override
    public void deleteDraft(UUID id, Integer entrepreneurId) {
        LegalProcedure procedure = getProcedureEntity(id);

        if (!procedure.getEntrepreneurId().equals(entrepreneurId)) {
            throw new BusinessException("Accès non autorisé.");
        }
        if (procedure.getStatus() != ProcedureStatus.BROUILLON) {
            throw new BusinessException("Seul un dossier en BROUILLON peut être supprimé.");
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
            throw new BusinessException("Ce dossier ne vous est pas assigné.");
        }
        if (procedure.getStatus() != ProcedureStatus.EN_ATTENTE_EXPERT) {
            throw new BusinessException("Le dossier doit être EN_ATTENTE_EXPERT pour une décision expert.");
        }

        if (request.approved()) {
            procedure.setStatus(ProcedureStatus.COMPLETE);
        } else {
            procedure.setStatus(ProcedureStatus.REFUSE);
        }

        procedure.setCompletedAt(LocalDateTime.now());

        if (request.remark() != null) {
            procedure.setRemark(request.remark());
        }

        recalculateCompletionRate(procedure);
        return mapper.toProcedureResponse(procedureRepository.save(procedure));
    }

    @Override
    public LegalProcedureResponse setAiResult(UUID id, boolean approved, String remark) {
        LegalProcedure procedure = getProcedureEntity(id);

        if (procedure.getStatus() != ProcedureStatus.EN_COURS) {
            throw new BusinessException("L'IA ne peut analyser qu'un dossier EN_COURS.");
        }

        if (approved) {
            procedure.setStatus(ProcedureStatus.EN_ATTENTE_EXPERT);
        } else {
            procedure.setStatus(ProcedureStatus.REFUSE);
            procedure.setCompletedAt(LocalDateTime.now());
        }

        if (remark != null) {
            procedure.setRemark(remark);
        }

        return mapper.toProcedureResponse(procedureRepository.save(procedure));
    }

    private LegalProcedure getProcedureEntity(UUID id) {
        return procedureRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Dossier juridique introuvable avec l'id : " + id));
    }

    private void recalculateCompletionRate(LegalProcedure procedure) {
        long total = documentRepository.countByProcedureId(procedure.getId());
        if (total == 0) {
            procedure.setCompletionRate(0F);
            return;
        }
        long deposed = documentRepository.countByProcedureIdAndStatus(
                procedure.getId(), DocumentStatus.DEPOSE);
        long validated = documentRepository.countByProcedureIdAndStatus(
                procedure.getId(), DocumentStatus.VALIDE);
        float rate = ((float)(deposed + validated) / total) * 100;
        procedure.setCompletionRate(Math.round(rate * 100f) / 100f);
    }
}