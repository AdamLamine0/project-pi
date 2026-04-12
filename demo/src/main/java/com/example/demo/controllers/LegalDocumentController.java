package com.example.demo.controllers;




import com.example.demo.dto.LegalDocumentResponse;
import com.example.demo.dto.UpdateLegalDocumentStatusRequest;
import com.example.demo.services.LegalDocumentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/legal-procedures/{procedureId}/documents")
@RequiredArgsConstructor
public class LegalDocumentController {

    private final LegalDocumentService service;

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<LegalDocumentResponse> upload(
            @PathVariable UUID procedureId,
            @RequestParam("requirementCode") String requirementCode,
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "expiresAt", required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime expiresAt
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.upload(procedureId, requirementCode, file, expiresAt));
    }

    // In any controller method:
    @GetMapping
    public ResponseEntity<?> example(
            @RequestHeader("X-User-Id") String userId,
            @RequestHeader("X-User-Role") String role) {

        return null;
    }
    @GetMapping
    public ResponseEntity<List<LegalDocumentResponse>> findByProcedure(@PathVariable UUID procedureId) {
        return ResponseEntity.ok(service.findByProcedure(procedureId));
    }

    @PatchMapping("/{documentId}/status")
    public ResponseEntity<LegalDocumentResponse> updateStatus(
            @PathVariable UUID documentId,
            @Valid @RequestBody UpdateLegalDocumentStatusRequest request
    ) {
        return ResponseEntity.ok(service.updateStatus(documentId, request));
    }

    @DeleteMapping("/{documentId}")
    public ResponseEntity<Void> delete(@PathVariable UUID documentId) {
        service.delete(documentId);
        return ResponseEntity.noContent().build();
    }
}