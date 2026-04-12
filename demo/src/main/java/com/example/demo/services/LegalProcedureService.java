package com.example.demo.services;



import com.example.demo.dto.ChangeProcedureStatusRequest;
import com.example.demo.dto.CreateLegalProcedureRequest;
import com.example.demo.dto.LegalProcedureResponse;
import com.example.demo.dto.UpdateLegalProcedureRequest;

import java.util.List;
import java.util.UUID;

public interface LegalProcedureService {
    LegalProcedureResponse create(CreateLegalProcedureRequest request);
    List<LegalProcedureResponse> findAll();
    LegalProcedureResponse findById(UUID id);
    LegalProcedureResponse update(UUID id, UpdateLegalProcedureRequest request);
    LegalProcedureResponse changeStatus(UUID id, ChangeProcedureStatusRequest request);
    void archive(UUID id);
    void deleteDraft(UUID id);
}
