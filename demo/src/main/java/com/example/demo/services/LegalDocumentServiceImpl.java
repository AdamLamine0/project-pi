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
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class LegalDocumentServiceImpl implements LegalDocumentService {

    private final LegalDocumentRepository documentRepository;
    private final LegalProcedureRepository procedureRepository;
    private final LegalMapper mapper;
    private final FileStorageService fileStorageService;

    @Override
    public LegalDocumentResponse upload(UUID procedureId, String requirementCode,
                                        MultipartFile file, LocalDateTime expiresAt) {

        LegalProcedure procedure = procedureRepository.findById(procedureId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Dossier introuvable avec l'id : " + procedureId));

        // Upload autorisé uniquement en BROUILLON
        if (procedure.getStatus() != ProcedureStatus.BROUILLON) {
            throw new BusinessException(
                    "Les documents ne peuvent être déposés que sur un dossier en BROUILLON.");
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
                .expiresAt(expiresAt)
                .status(DocumentStatus.DEPOSE)
                .build();

        return mapper.toDocumentResponse(documentRepository.save(document));
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
        return mapper.toDocumentResponse(documentRepository.save(document));
    }

    @Override
    public void delete(UUID documentId) {
        LegalDocument document = documentRepository.findById(documentId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Document introuvable avec l'id : " + documentId));

        // Suppression autorisée uniquement en BROUILLON
        if (document.getProcedure().getStatus() != ProcedureStatus.BROUILLON) {
            throw new BusinessException(
                    "Impossible de supprimer un document d'un dossier déjà soumis.");
        }

        documentRepository.delete(document);
    }

    // ─── HELPER ──────────────────────────────────────────────────────

    private boolean isLocked(ProcedureStatus status) {
        return status == ProcedureStatus.COMPLETE || status == ProcedureStatus.REFUSE;
    }
}