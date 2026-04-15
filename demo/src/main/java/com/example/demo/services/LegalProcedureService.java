package com.example.demo.services;

import com.example.demo.dto.*;

import java.util.List;
import java.util.UUID;

public interface LegalProcedureService {

    // ENTREPRENEUR
    LegalProcedureResponse create(CreateLegalProcedureRequest request, UUID entrepreneurId);
    List<LegalProcedureResponse> findByEntrepreneur(UUID entrepreneurId);
    LegalProcedureResponse findById(UUID id);
    LegalProcedureResponse submit(UUID id, UUID entrepreneurId);
    void deleteDraft(UUID id, UUID entrepreneurId);

    // EXPERT
    List<LegalProcedureResponse> findByExpert(UUID expertId);
    LegalProcedureResponse applyExpertDecision(UUID id, ExpertDecisionRequest request, UUID expertId);

    // IA
    LegalProcedureResponse setAiResult(UUID id, boolean approved, String remark);
}