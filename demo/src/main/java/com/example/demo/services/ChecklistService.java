package com.example.demo.services;

import com.example.demo.dto.ProcedureChecklistResponse;
import java.util.UUID;

public interface ChecklistService {
    ProcedureChecklistResponse getChecklist(UUID procedureId);
    boolean areAllRequiredDocumentsUploaded(UUID procedureId); // NOUVEAU
}