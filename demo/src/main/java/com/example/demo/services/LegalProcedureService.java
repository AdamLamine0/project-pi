package com.example.demo.services;

import com.example.demo.dto.*;

import java.util.List;
import java.util.UUID;

public interface LegalProcedureService {

    LegalProcedureResponse create(CreateLegalProcedureRequest request, Integer entrepreneurId);
    List<LegalProcedureResponse> findAll();
    List<LegalProcedureResponse> findByEntrepreneur(Integer entrepreneurId);
    LegalProcedureResponse findById(UUID id);
    LegalProcedureResponse submit(UUID id, Integer entrepreneurId);
    void deleteDraft(UUID id, Integer entrepreneurId);

    List<LegalProcedureResponse> findByExpert(Integer expertId);
    LegalProcedureResponse applyExpertDecision(UUID id, ExpertDecisionRequest request, Integer expertId);
    LegalProcedureStatsResponse getStats();

    LegalProcedureResponse setAiResult(UUID id, boolean approved, String remark);
}
