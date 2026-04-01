package com.example.demo.services;



import com.example.demo.dto.CreateLegalDocumentRequest;
import com.example.demo.dto.LegalDocumentResponse;
import com.example.demo.dto.UpdateLegalDocumentStatusRequest;

import java.util.List;
import java.util.UUID;

public interface LegalDocumentService {
    LegalDocumentResponse create(UUID procedureId, CreateLegalDocumentRequest request);
    List<LegalDocumentResponse> findByProcedure(UUID procedureId);
    LegalDocumentResponse updateStatus(UUID documentId, UpdateLegalDocumentStatusRequest request);
    void delete(UUID documentId);
}

