package com.example.demo.services;

import com.example.demo.dto.ProcedureChecklistItemResponse;
import com.example.demo.dto.ProcedureChecklistResponse;
import com.example.demo.entity.LegalDocument;
import com.example.demo.entity.LegalProcedure;
import com.example.demo.entity.ProcedureDocumentRequirement;
import com.example.demo.enums.DocumentStatus;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.LegalDocumentRepository;
import com.example.demo.repository.LegalProcedureRepository;
import com.example.demo.repository.ProcedureDocumentRequirementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ChecklistServiceImpl implements ChecklistService {

    private final LegalProcedureRepository procedureRepository;
    private final ProcedureDocumentRequirementRepository requirementRepository;
    private final LegalDocumentRepository documentRepository;

    @Override
    public ProcedureChecklistResponse getChecklist(UUID procedureId) {

        LegalProcedure procedure = procedureRepository.findById(procedureId)
                .orElseThrow(() -> new ResourceNotFoundException("Case not found: " + procedureId));

        List<ProcedureDocumentRequirement> requirements =
                requirementRepository.findByProcedureType(procedure.getProcedureType());

        List<LegalDocument> documents =
                documentRepository.findByProcedureId(procedureId);

        // Construit les items de la checklist
        List<ProcedureChecklistItemResponse> items = requirements.stream()
                .map(req -> {
                    Optional<LegalDocument> doc = documents.stream()
                            .filter(d -> d.getRequirementCode().equals(req.getCode()))
                            .findFirst();

                    boolean uploaded = doc.isPresent() &&
                            doc.get().getStatus() != DocumentStatus.NON_DEPOSE;

                    return new ProcedureChecklistItemResponse(
                            req.getCode(),
                            req.getLabel(),
                            req.getDescription(),
                            req.getRequired(),
                            uploaded,
                            doc.map(LegalDocument::getFileUrl).orElse(null),
                            doc.map(LegalDocument::getId).orElse(null)
                    );
                })
                .toList();

        // Calcul des compteurs
        long uploadedCount = items.stream()
                .filter(ProcedureChecklistItemResponse::uploaded)
                .count();

        long requiredCount = requirements.stream()
                .filter(ProcedureDocumentRequirement::getRequired)
                .count();

        double completionPercentage = requiredCount == 0 ? 0 :
                Math.round(((double) uploadedCount / requiredCount) * 100 * 100.0) / 100.0;

        return new ProcedureChecklistResponse(
                procedureId,
                procedure.getProcedureType(),
                items,
                uploadedCount,
                requiredCount,
                completionPercentage
        );
    }

    @Override
    public boolean areAllRequiredDocumentsUploaded(UUID procedureId) {

        LegalProcedure procedure = procedureRepository.findById(procedureId)
                .orElseThrow(() -> new ResourceNotFoundException("Case not found: " + procedureId));

        List<ProcedureDocumentRequirement> requirements =
                requirementRepository.findByProcedureType(procedure.getProcedureType());

        List<LegalDocument> documents =
                documentRepository.findByProcedureId(procedureId);

        // Checks that every required item has an UPLOADED or VALIDATED document.
        return requirements.stream()
                .filter(ProcedureDocumentRequirement::getRequired)
                .allMatch(req -> documents.stream()
                        .anyMatch(doc ->
                                doc.getRequirementCode().equals(req.getCode()) &&
                                        doc.getStatus() != DocumentStatus.NON_DEPOSE
                        )
                );
    }
}
