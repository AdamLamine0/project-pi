package com.example.demo.controllers;



import com.example.demo.dto.CreateLegalDocumentRequest;
import com.example.demo.dto.LegalDocumentResponse;
import com.example.demo.dto.UpdateLegalDocumentStatusRequest;
import com.example.demo.services.LegalDocumentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/legal-procedures/{procedureId}/documents")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class LegalDocumentController {

    private final LegalDocumentService service;

    @PostMapping
    public ResponseEntity<LegalDocumentResponse> create(@PathVariable UUID procedureId,
                                                        @Valid @RequestBody CreateLegalDocumentRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(procedureId, request));
    }

    @GetMapping
    public ResponseEntity<List<LegalDocumentResponse>> findByProcedure(@PathVariable UUID procedureId) {
        return ResponseEntity.ok(service.findByProcedure(procedureId));
    }

    @PatchMapping("/{documentId}/status")
    public ResponseEntity<LegalDocumentResponse> updateStatus(@PathVariable UUID documentId,
                                                              @Valid @RequestBody UpdateLegalDocumentStatusRequest request) {
        return ResponseEntity.ok(service.updateStatus(documentId, request));
    }

    @DeleteMapping("/{documentId}")
    public ResponseEntity<Void> delete(@PathVariable UUID documentId) {
        service.delete(documentId);
        return ResponseEntity.noContent().build();
    }
}

