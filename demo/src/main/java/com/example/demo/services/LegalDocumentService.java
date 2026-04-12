package com.example.demo.services;


import com.example.demo.dto.LegalDocumentResponse;
import com.example.demo.dto.UpdateLegalDocumentStatusRequest;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface LegalDocumentService {

    LegalDocumentResponse upload(UUID procedureId, String requirementCode, MultipartFile file, LocalDateTime expiresAt);

    List<LegalDocumentResponse> findByProcedure(UUID procedureId);

    LegalDocumentResponse updateStatus(UUID documentId, UpdateLegalDocumentStatusRequest request);

    void delete(UUID documentId);
}