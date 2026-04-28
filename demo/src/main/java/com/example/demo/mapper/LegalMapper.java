package com.example.demo.mapper;

import com.example.demo.dto.LegalDocumentResponse;
import com.example.demo.dto.LegalProcedureResponse;
import com.example.demo.entity.LegalDocument;
import com.example.demo.entity.LegalProcedure;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface LegalMapper {

    // requirementCode existe dans LegalDocument → mappé automatiquement ✅
    LegalDocumentResponse toDocumentResponse(LegalDocument document);

    // notes (entité) → description (record) : mapping explicite nécessaire
    @Mapping(source = "description", target = "description")
    // documents (List<LegalDocument>) → documents (List<LegalDocumentResponse>)
    // MapStruct utilise toDocumentResponse() automatiquement car il est dans le même mapper ✅
    LegalProcedureResponse toProcedureResponse(LegalProcedure procedure);
}