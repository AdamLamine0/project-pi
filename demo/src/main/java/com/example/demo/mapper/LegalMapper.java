package com.example.demo.mapper;

import com.example.demo.dto.LegalDocumentResponse;
import com.example.demo.dto.LegalProcedureResponse;
import com.example.demo.entity.LegalDocument;
import com.example.demo.entity.LegalProcedure;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface LegalMapper {

    // requirementCode exists in LegalDocument and is mapped automatically.
    LegalDocumentResponse toDocumentResponse(LegalDocument document);

    // notes (entity) to description (record): explicit mapping required.
    @Mapping(source = "description", target = "description")
    // documents (List<LegalDocument>) to documents (List<LegalDocumentResponse>)
    // MapStruct uses toDocumentResponse() automatically because it is in the same mapper.
    LegalProcedureResponse toProcedureResponse(LegalProcedure procedure);
}
