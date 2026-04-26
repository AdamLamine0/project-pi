package com.example.demo.services;

import com.example.demo.dto.LegalDocumentResponse;
import com.example.demo.dto.UpdateLegalDocumentStatusRequest;
import com.example.demo.entity.LegalDocument;
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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class LegalDocumentServiceImpl implements LegalDocumentService {

    private final LegalDocumentRepository documentRepository;
    private final LegalProcedureRepository procedureRepository;
    private final ProcedureDocumentRequirementRepository requirementRepository;
    private final LegalMapper mapper;
    private final FileStorageService fileStorageService;

    @Override
    public LegalDocumentResponse upload(UUID procedureId, String requirementCode, MultipartFile file) {

        LegalProcedure procedure = procedureRepository.findById(procedureId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Dossier introuvable avec l'id : " + procedureId));

        if (!canEditDocuments(procedure.getStatus())) {
            throw new BusinessException(
                    "Les documents ne peuvent etre modifies que sur un dossier en BROUILLON ou REFUSE.");
        }

        // Si un document existe déjà pour ce requirement → on le remplace
        documentRepository.findByProcedureId(procedureId).stream()
                .filter(d -> d.getRequirementCode().equals(requirementCode))
                .findFirst()
                .ifPresent(documentRepository::delete);

        String fileUrl = fileStorageService.store(file);

        LegalDocument document = LegalDocument.builder()
                .procedure(procedure)
                .requirementCode(requirementCode)
                .documentType(requirementCode)
                .fileUrl(fileUrl)
                .status(DocumentStatus.DEPOSE)
                .build();

        LegalDocument saved = documentRepository.save(document);
        recalculateCompletionRate(procedure);
        procedureRepository.save(procedure);

        return mapper.toDocumentResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<LegalDocumentResponse> findByProcedure(UUID procedureId) {
        if (!procedureRepository.existsById(procedureId)) {
            throw new ResourceNotFoundException(
                    "Dossier introuvable avec l'id : " + procedureId);
        }
        return documentRepository.findByProcedureId(procedureId)
                .stream()
                .map(mapper::toDocumentResponse)
                .toList();
    }

    @Override
    public LegalDocumentResponse updateStatus(UUID documentId,
                                              UpdateLegalDocumentStatusRequest request) {
        LegalDocument document = documentRepository.findById(documentId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Document introuvable avec l'id : " + documentId));

        if (isLocked(document.getProcedure().getStatus())) {
            throw new BusinessException(
                    "Impossible de modifier un document d'un dossier terminé.");
        }

        document.setStatus(request.status());
        LegalDocument saved = documentRepository.save(document);
        recalculateCompletionRate(document.getProcedure());
        procedureRepository.save(document.getProcedure());

        return mapper.toDocumentResponse(saved);
    }

    @Override
    public void delete(UUID documentId) {
        LegalDocument document = documentRepository.findById(documentId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Document introuvable avec l'id : " + documentId));

        if (!canEditDocuments(document.getProcedure().getStatus())) {
            throw new BusinessException(
                    "Impossible de supprimer un document d'un dossier deja soumis, sauf apres refus IA.");
        }

        LegalProcedure procedure = document.getProcedure();
        documentRepository.delete(document);
        documentRepository.flush();
        recalculateCompletionRate(procedure);
        procedureRepository.save(procedure);
    }

    private boolean isLocked(ProcedureStatus status) {
        return status == ProcedureStatus.COMPLETE;
    }

    private boolean canEditDocuments(ProcedureStatus status) {
        return status == ProcedureStatus.BROUILLON || status == ProcedureStatus.REFUSE;
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
}
