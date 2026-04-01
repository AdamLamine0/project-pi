package com.example.demo.services;



import com.example.demo.dto.ChangeProcedureStatusRequest;
import com.example.demo.dto.CreateLegalProcedureRequest;
import com.example.demo.dto.LegalProcedureResponse;
import com.example.demo.dto.UpdateLegalProcedureRequest;
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

    @Override
    public LegalProcedureResponse create(CreateLegalProcedureRequest request) {
        LegalProcedure procedure = LegalProcedure.builder()
                .entrepreneurId(request.entrepreneurId())
                .expertId(request.expertId())
                .procedureType(request.procedureType())
                .notes(request.notes())
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
    public LegalProcedureResponse findById(UUID id) {
        return mapper.toProcedureResponse(getProcedureEntity(id));
    }

    @Override
    public LegalProcedureResponse update(UUID id, UpdateLegalProcedureRequest request) {
        LegalProcedure procedure = getProcedureEntity(id);

        if (procedure.getStatus() == ProcedureStatus.ARCHIVE) {
            throw new BusinessException("Impossible de modifier un dossier archivé.");
        }

        if (request.expertId() != null) {
            procedure.setExpertId(request.expertId());
        }
        if (request.procedureType() != null) {
            procedure.setProcedureType(request.procedureType());
        }
        if (request.notes() != null) {
            procedure.setNotes(request.notes());
        }

        return mapper.toProcedureResponse(procedureRepository.save(procedure));
    }

    @Override
    public LegalProcedureResponse changeStatus(UUID id, ChangeProcedureStatusRequest request) {
        LegalProcedure procedure = getProcedureEntity(id);
        ProcedureStatus newStatus = request.status();

        if (procedure.getStatus() == ProcedureStatus.ARCHIVE) {
            throw new BusinessException("Impossible de changer le statut d'un dossier archivé.");
        }

        procedure.setStatus(newStatus);

        if (newStatus == ProcedureStatus.EN_ATTENTE_INSTITUTION && procedure.getSubmittedAt() == null) {
            procedure.setSubmittedAt(LocalDateTime.now());
        }

        if (newStatus == ProcedureStatus.COMPLETE || newStatus == ProcedureStatus.REFUSE || newStatus == ProcedureStatus.ABANDONNE) {
            procedure.setCompletedAt(LocalDateTime.now());
        }

        recalculateCompletionRate(procedure);
        return mapper.toProcedureResponse(procedureRepository.save(procedure));
    }

    @Override
    public void archive(UUID id) {
        LegalProcedure procedure = getProcedureEntity(id);

        if (!(procedure.getStatus() == ProcedureStatus.COMPLETE
                || procedure.getStatus() == ProcedureStatus.REFUSE
                || procedure.getStatus() == ProcedureStatus.ABANDONNE)) {
            throw new BusinessException("Un dossier doit être COMPLETE, REFUSE ou ABANDONNE avant archivage.");
        }

        procedure.setStatus(ProcedureStatus.ARCHIVE);
        procedureRepository.save(procedure);
    }

    @Override
    public void deleteDraft(UUID id) {
        LegalProcedure procedure = getProcedureEntity(id);

        if (procedure.getStatus() != ProcedureStatus.BROUILLON) {
            throw new BusinessException("Seul un dossier en brouillon peut être supprimé.");
        }

        if (procedure.getCreatedAt().isBefore(LocalDateTime.now().minusHours(48))) {
            throw new BusinessException("Suppression autorisée uniquement dans les 48h pour un brouillon.");
        }

        procedureRepository.delete(procedure);
    }

    private LegalProcedure getProcedureEntity(UUID id) {
        return procedureRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Dossier juridique introuvable avec l'id : " + id));
    }

    private void recalculateCompletionRate(LegalProcedure procedure) {
        long total = documentRepository.countByProcedureId(procedure.getId());
        if (total == 0) {
            procedure.setCompletionRate(0F);
            return;
        }

        long validated = documentRepository.countByProcedureIdAndStatus(procedure.getId(), DocumentStatus.VALIDE_PAR_EXPERT);
        float rate = ((float) validated / total) * 100;
        procedure.setCompletionRate(Math.round(rate * 100f) / 100f);
    }
}

