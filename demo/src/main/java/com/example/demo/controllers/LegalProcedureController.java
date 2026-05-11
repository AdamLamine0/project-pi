package com.example.demo.controllers;

import com.example.demo.dto.*;
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

    // ═══════════════════════════════════════════════
    // INTERFACE ENTREPRENEUR
    // ═══════════════════════════════════════════════

    @PostMapping
    public ResponseEntity<LegalProcedureResponse> create(
            @Valid @RequestBody CreateLegalProcedureRequest request,
            @RequestHeader("X-User-Id") Integer entrepreneurId) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.create(request, entrepreneurId));
    }

    @GetMapping("/my-procedures")
    public ResponseEntity<List<LegalProcedureResponse>> myProcedures(
            @RequestHeader("X-User-Id") Integer entrepreneurId) {
        return ResponseEntity.ok(service.findByEntrepreneur(entrepreneurId));
    }

    @GetMapping("/admin/all")
    public ResponseEntity<List<LegalProcedureResponse>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/stats")
    public ResponseEntity<LegalProcedureStatsResponse> stats() {
        return ResponseEntity.ok(service.getStats());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LegalProcedureResponse> findById(@PathVariable UUID id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping("/{id}/checklist")
    public ResponseEntity<ProcedureChecklistResponse> getChecklist(@PathVariable UUID id) {
        return ResponseEntity.ok(checklistService.getChecklist(id));
    }

    @PostMapping("/{id}/submit")
    public ResponseEntity<LegalProcedureResponse> submit(
            @PathVariable UUID id,
            @RequestHeader("X-User-Id") Integer entrepreneurId) {
        return ResponseEntity.ok(service.submit(id, entrepreneurId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDraft(
            @PathVariable UUID id,
            @RequestHeader("X-User-Id") Integer entrepreneurId) {
        service.deleteDraft(id, entrepreneurId);
        return ResponseEntity.noContent().build();
    }

    // ═══════════════════════════════════════════════
    // INTERFACE EXPERT
    // ═══════════════════════════════════════════════

    @GetMapping("/expert/assigned")
    public ResponseEntity<List<LegalProcedureResponse>> assignedToExpert(
            @RequestHeader("X-User-Id") Integer expertId) {
        return ResponseEntity.ok(service.findByExpert(expertId));
    }

    @PostMapping("/{id}/expert-decision")
    public ResponseEntity<LegalProcedureResponse> expertDecision(
            @PathVariable UUID id,
            @Valid @RequestBody ExpertDecisionRequest request,
            @RequestHeader("X-User-Id") Integer expertId) {
        return ResponseEntity.ok(service.applyExpertDecision(id, request, expertId));
    }
}
