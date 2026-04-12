package com.example.demo.mapper;


import com.example.demo.dto.LegalDocumentResponse;
import com.example.demo.dto.LegalProcedureResponse;
import com.example.demo.entity.LegalDocument;
import com.example.demo.entity.LegalProcedure;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface LegalMapper {
    LegalDocumentResponse toDocumentResponse(LegalDocument document);
    LegalProcedureResponse toProcedureResponse(LegalProcedure procedure);
}

