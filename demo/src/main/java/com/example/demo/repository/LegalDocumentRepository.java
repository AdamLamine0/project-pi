package com.example.demo.repository;

import com.example.demo.entity.LegalDocument;
import com.example.demo.enums.DocumentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface LegalDocumentRepository extends JpaRepository<LegalDocument, UUID> {
    List<LegalDocument> findByProcedureId(UUID procedureId);
    long countByProcedureId(UUID procedureId);
    long countByProcedureIdAndStatus(UUID procedureId, DocumentStatus status);
}

