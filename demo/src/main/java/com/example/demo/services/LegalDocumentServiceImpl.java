package com.example.demo.services;


import com.example.demo.dto.CreateLegalDocumentRequest;
import com.example.demo.dto.LegalDocumentResponse;
import com.example.demo.dto.UpdateLegalDocumentStatusRequest;
import com.example.demo.entity.LegalDocument;
import com.example.demo.entity.LegalProcedure;
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
    public LegalDocumentResponse upload(UUID procedureId, String requirementCode, MultipartFile file, LocalDateTime expiresAt) {
        LegalProcedure procedure = procedureRepository.findById(procedureId)
                .orElseThrow(() -> new ResourceNotFoundException("Dossier introuvable avec l'id : " + procedureId));

        if (procedure.getStatus() == ProcedureStatus.ARCHIVE) {
            throw new BusinessException("Impossible d'ajouter un document à un dossier archivé.");
        }

        String fileUrl = fileStorageService.store(file);

        LegalDocument document = LegalDocument.builder()
                .procedure(procedure)
                .requirementCode(requirementCode)
                .documentType(requirementCode)
                .fileUrl(fileUrl)
                .expiresAt(expiresAt)
                .build();

        return mapper.toDocumentResponse(documentRepository.save(document));
    }
    @Override
    @Transactional(readOnly = true)
    public List<LegalDocumentResponse> findByProcedure(UUID procedureId) {
        if (!procedureRepository.existsById(procedureId)) {
            throw new ResourceNotFoundException("Dossier introuvable avec l'id : " + procedureId);
        }

        return documentRepository.findByProcedureId(procedureId)
                .stream()
                .map(mapper::toDocumentResponse)
                .toList();
    }

    @Override
    public LegalDocumentResponse updateStatus(UUID documentId, UpdateLegalDocumentStatusRequest request) {
        LegalDocument document = documentRepository.findById(documentId)
                .orElseThrow(() -> new ResourceNotFoundException("Document introuvable avec l'id : " + documentId));

        if (document.getProcedure().getStatus() == ProcedureStatus.ARCHIVE) {
            throw new BusinessException("Impossible de modifier un document lié à un dossier archivé.");
        }

        document.setStatus(request.status());
        return mapper.toDocumentResponse(documentRepository.save(document));
    }

    @Override
    public void delete(UUID documentId) {
        LegalDocument document = documentRepository.findById(documentId)
                .orElseThrow(() -> new ResourceNotFoundException("Document introuvable avec l'id : " + documentId));

        if (document.getProcedure().getStatus() == ProcedureStatus.ARCHIVE) {
            throw new BusinessException("Impossible de supprimer un document d'un dossier archivé.");
        }

        documentRepository.delete(document);
    }
}

