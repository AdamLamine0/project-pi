package com.example.demo.services;

import com.example.demo.entity.*;
import com.example.demo.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ChecklistServiceImpl implements ChecklistService {

    private final LegalProcedureRepository procedureRepository;
    private final ProcedureDocumentRequirementRepository requirementRepository;
    private final LegalDocumentRepository documentRepository;

    @Override
    public Map<String, Object> getChecklist(UUID procedureId) {

        LegalProcedure procedure = procedureRepository.findById(procedureId)
                .orElseThrow(() -> new RuntimeException("Dossier introuvable"));

        var requirements = requirementRepository.findByProcedureType(procedure.getProcedureType());
        var documents = documentRepository.findByProcedureId(procedureId);

        List<Map<String, Object>> items = new ArrayList<>();

        for (var req : requirements) {

            Optional<LegalDocument> doc = documents.stream()
                    .filter(d -> d.getRequirementCode().equals(req.getCode()))
                    .findFirst();

            Map<String, Object> item = new HashMap<>();
            item.put("code", req.getCode());
            item.put("label", req.getLabel());
            item.put("required", req.getRequired());
            item.put("uploaded", doc.isPresent());
            item.put("fileUrl", doc.map(LegalDocument::getFileUrl).orElse(null));

            items.add(item);
        }

        return Map.of(
                "procedureId", procedureId,
                "procedureType", procedure.getProcedureType(),
                "items", items
        );
    }
}
