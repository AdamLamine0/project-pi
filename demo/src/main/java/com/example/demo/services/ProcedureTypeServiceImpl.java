package com.example.demo.services;

import com.example.demo.entity.ProcedureDocumentRequirement;
import com.example.demo.repository.LegalProcedureRepository;
import com.example.demo.repository.ProcedureDocumentRequirementRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ProcedureTypeServiceImpl implements ProcedureTypeService {

    private final ProcedureDocumentRequirementRepository requirementRepository;
    private final LegalProcedureRepository procedureRepository;

    @Override
    public List<Map<String, Object>> getOverview() {

        List<Map<String, Object>> result = new ArrayList<>();

        Arrays.stream(com.example.demo.enums.ProcedureType.values()).forEach(type -> {

            List<ProcedureDocumentRequirement> requirements =
                    requirementRepository.findByProcedureType(type);

            long count = procedureRepository.countByProcedureType(type);

            Map<String, Object> item = new HashMap<>();
            item.put("procedureType", type);
            item.put("title", type.name());
            item.put("description", "Procédure " + type.name());
            item.put("requiredDocuments", requirements.stream().map(r -> r.getLabel()).toList());
            item.put("procedureCount", count);

            result.add(item);
        });

        return result;
    }

    @Override
    public List<ProcedureDocumentRequirement> getRequirements(String type) {
        return requirementRepository.findByProcedureType(
                com.example.demo.enums.ProcedureType.valueOf(type)
        );
    }
}
