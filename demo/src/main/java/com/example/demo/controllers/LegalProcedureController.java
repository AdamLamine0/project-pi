package com.example.demo.controllers;

import com.example.demo.dto.ChangeProcedureStatusRequest;
import com.example.demo.dto.CreateLegalProcedureRequest;
import com.example.demo.dto.LegalProcedureResponse;
import com.example.demo.dto.UpdateLegalProcedureRequest;
import com.example.demo.services.ChecklistService;
import com.example.demo.services.LegalProcedureService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/legal-procedures")
@RequiredArgsConstructor
public class LegalProcedureController {

    private final LegalProcedureService service;
    private final ChecklistService checklistService;
    @PostMapping
    public ResponseEntity<LegalProcedureResponse> create(@Valid @RequestBody CreateLegalProcedureRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(request));
    }
    @GetMapping
    public ResponseEntity<?> example(
            @RequestHeader("X-User-Id") String userId,
            @RequestHeader("X-User-Role") String role) {

        return null;
    }

    @GetMapping
    public ResponseEntity<List<LegalProcedureResponse>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LegalProcedureResponse> findById(@PathVariable UUID id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<LegalProcedureResponse> update(@PathVariable UUID id,
                                                         @Valid @RequestBody UpdateLegalProcedureRequest request) {
        return ResponseEntity.ok(service.update(id, request));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<LegalProcedureResponse> changeStatus(@PathVariable UUID id,
                                                               @Valid @RequestBody ChangeProcedureStatusRequest request) {
        return ResponseEntity.ok(service.changeStatus(id, request));
    }

    @PatchMapping("/{id}/archive")
    public ResponseEntity<Void> archive(@PathVariable UUID id) {
        service.archive(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDraft(@PathVariable UUID id) {
        service.deleteDraft(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/checklist")
    public Object getChecklist(@PathVariable UUID id) {
        return checklistService.getChecklist(id);
    }
}

