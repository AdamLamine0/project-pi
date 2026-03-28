package org.example.partenariatpi.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.partenariatpi.dto.ConventionRequest;
import org.example.partenariatpi.dto.ConventionResponse;
import org.example.partenariatpi.enums.StatutConvention;
import org.example.partenariatpi.service.ConventionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/conventions")
@RequiredArgsConstructor
public class ConventionController {

    private final ConventionService conventionService;

    // ── READ ──────────────────────────────────────────────────────────────────

    // ADMIN only
    @GetMapping
    public ResponseEntity<List<ConventionResponse>> getAll(
            @RequestHeader("X-User-Role") String role) {
        checkAdmin(role);
        return ResponseEntity.ok(conventionService.getAll());
    }

    // Any party of the convention
    @GetMapping("/{id}")
    public ResponseEntity<ConventionResponse> getById(
            @PathVariable Integer id,
            @RequestHeader("X-User-Role") String role,
            @RequestHeader("X-User-Id") Integer userId) {
        conventionService.checkOwnership(id, role, userId);
        return ResponseEntity.ok(conventionService.getById(id));
    }

    // USER: all my conventions
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ConventionResponse>> getByUser(
            @PathVariable Integer userId,
            @RequestHeader("X-User-Role") String role,
            @RequestHeader("X-User-Id") Integer requestingUserId) {
        if (!"ROLE_ADMIN".equals(role) && !requestingUserId.equals(userId))
            throw new RuntimeException("Access denied: you can only view your own conventions");
        return ResponseEntity.ok(conventionService.getByUserId(userId));
    }

    // PARTNER or ADMIN: conventions of an organisation
    @GetMapping("/organisation/{orgId}")
    public ResponseEntity<List<ConventionResponse>> getByOrganisation(
            @PathVariable Integer orgId,
            @RequestHeader("X-User-Role") String role) {
        if (!"ROLE_ADMIN".equals(role) && !"ROLE_PARTNER".equals(role))
            throw new RuntimeException("Access denied");
        return ResponseEntity.ok(conventionService.getByOrganisationId(orgId));
    }

    // Check if a convention exists between user X and org Y
    @GetMapping("/user/{userId}/organisation/{orgId}")
    public ResponseEntity<List<ConventionResponse>> getByUserAndOrganisation(
            @PathVariable Integer userId,
            @PathVariable Integer orgId,
            @RequestHeader("X-User-Role") String role,
            @RequestHeader("X-User-Id") Integer requestingUserId) {
        if (!"ROLE_ADMIN".equals(role) && !requestingUserId.equals(userId))
            throw new RuntimeException("Access denied");
        return ResponseEntity.ok(conventionService.getByUserAndOrganisation(userId, orgId));
    }

    // ADMIN: see all pending renewals
    @GetMapping("/pending-renewal")
    public ResponseEntity<List<ConventionResponse>> getPendingRenewal(
            @RequestHeader("X-User-Role") String role) {
        checkAdmin(role);
        return ResponseEntity.ok(conventionService.getPendingRenewal());
    }

    // ── CREATE ────────────────────────────────────────────────────────────────

    // USER, PARTNER, or ADMIN
    @PostMapping
    public ResponseEntity<ConventionResponse> create(
            @Valid @RequestBody ConventionRequest request,
            @RequestHeader("X-User-Role") String role,
            @RequestHeader("X-User-Id") Integer requestingUserId) {
        if ("ROLE_USER".equals(role) && !request.getUserId().equals(requestingUserId))
            throw new RuntimeException("Access denied: you can only create conventions for yourself");
        return ResponseEntity.ok(conventionService.create(request));
    }

    // ── UPDATE ────────────────────────────────────────────────────────────────

    // Any party or ADMIN
    @PutMapping("/{id}")
    public ResponseEntity<ConventionResponse> update(
            @PathVariable Integer id,
            @Valid @RequestBody ConventionRequest request,
            @RequestHeader("X-User-Role") String role,
            @RequestHeader("X-User-Id") Integer requestingUserId) {
        conventionService.checkOwnership(id, role, requestingUserId);
        return ResponseEntity.ok(conventionService.update(id, request));
    }


    @PatchMapping("/{id}/statut")
    public ResponseEntity<ConventionResponse> updateStatut(
            @PathVariable Integer id,
            @RequestParam StatutConvention statut,
            @RequestHeader("X-User-Role") String role) {
        return ResponseEntity.ok(conventionService.updateStatut(id, statut));
    }

    // ── RENEWAL ───────────────────────────────────────────────────────────────

    // Step 1 — any party requests renewal (USER, PARTNER, or ADMIN)
    @PatchMapping("/{id}/renouvellement/demander")
    public ResponseEntity<ConventionResponse> demanderRenouvellement(
            @PathVariable Integer id,
            @RequestHeader("X-User-Id") Integer userId,
            @RequestHeader("X-User-Role") String role) {
        return ResponseEntity.ok(
                conventionService.demanderRenouvellement(id, role, userId));
    }

    // Step 2 — the OTHER party accepts (not who requested), or ADMIN
    @PostMapping("/{id}/renouvellement/accepter")
    public ResponseEntity<ConventionResponse> accepterRenouvellement(
            @PathVariable Integer id,
            @Valid @RequestBody ConventionRequest newTerms,
            @RequestHeader("X-User-Role") String role,
            @RequestHeader("X-User-Id") Integer userId) {
        return ResponseEntity.ok(
                conventionService.accepterRenouvellement(id, newTerms, role, userId));
    }

    // ── DELETE ────────────────────────────────────────────────────────────────

    // Any party or ADMIN
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Integer id,
            @RequestHeader("X-User-Role") String role,
            @RequestHeader("X-User-Id") Integer requestingUserId) {
        conventionService.delete(id, role, requestingUserId);
        return ResponseEntity.noContent().build();
    }

    // ── HELPER ───────────────────────────────────────────────────────────────

    private void checkAdmin(String role) {
        if (!"ROLE_ADMIN".equals(role))
            throw new RuntimeException("Access denied: ADMIN role required");
    }
}