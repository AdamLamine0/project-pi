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

    // ── Clean duplicate role header (gateway + frontend both set it) ──────────
    private String cleanRole(String role) {
        if (role == null) return "";
        return role.split(",")[0].trim();
    }

    @GetMapping
    public ResponseEntity<List<ConventionResponse>> getAll(
            @RequestHeader("X-User-Role") String role) {
        checkAdmin(cleanRole(role));
        return ResponseEntity.ok(conventionService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ConventionResponse> getById(
            @PathVariable Integer id,
            @RequestHeader("X-User-Role") String role,
            @RequestHeader("X-User-Id") Integer userId) {
        conventionService.checkOwnership(id, cleanRole(role), userId);
        return ResponseEntity.ok(conventionService.getById(id));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ConventionResponse>> getByUser(
            @PathVariable Integer userId,
            @RequestHeader("X-User-Role") String role,
            @RequestHeader("X-User-Id") Integer requestingUserId) {
        String r = cleanRole(role);
        if (!"ROLE_ADMIN".equals(r) && !requestingUserId.equals(userId))
            throw new RuntimeException("Access denied: you can only view your own conventions");
        return ResponseEntity.ok(conventionService.getByUserId(userId));
    }

    @GetMapping("/organisation/{orgId}")
    public ResponseEntity<List<ConventionResponse>> getByOrganisation(
            @PathVariable Integer orgId,
            @RequestHeader("X-User-Role") String role) {
        String r = cleanRole(role);
        if (!"ROLE_ADMIN".equals(r) && !"ROLE_PARTNER".equals(r))
            throw new RuntimeException("Access denied");
        return ResponseEntity.ok(conventionService.getByOrganisationId(orgId));
    }

    @GetMapping("/user/{userId}/organisation/{orgId}")
    public ResponseEntity<List<ConventionResponse>> getByUserAndOrganisation(
            @PathVariable Integer userId,
            @PathVariable Integer orgId,
            @RequestHeader("X-User-Role") String role,
            @RequestHeader("X-User-Id") Integer requestingUserId) {
        String r = cleanRole(role);
        if (!"ROLE_ADMIN".equals(r) && !requestingUserId.equals(userId))
            throw new RuntimeException("Access denied");
        return ResponseEntity.ok(conventionService.getByUserAndOrganisation(userId, orgId));
    }

    @GetMapping("/pending-renewal")
    public ResponseEntity<List<ConventionResponse>> getPendingRenewal(
            @RequestHeader("X-User-Role") String role) {
        checkAdmin(cleanRole(role));
        return ResponseEntity.ok(conventionService.getPendingRenewal());
    }

    @PostMapping
    public ResponseEntity<ConventionResponse> create(
            @Valid @RequestBody ConventionRequest request,
            @RequestHeader("X-User-Role") String role,
            @RequestHeader("X-User-Id") Integer requestingUserId) {
        String r = cleanRole(role);
        if ("ROLE_USER".equals(r) && !request.getUserId().equals(requestingUserId))
            throw new RuntimeException("Access denied: you can only create conventions for yourself");
        return ResponseEntity.ok(conventionService.create(request, r));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ConventionResponse> update(
            @PathVariable Integer id,
            @Valid @RequestBody ConventionRequest request,
            @RequestHeader("X-User-Role") String role,
            @RequestHeader("X-User-Id") Integer requestingUserId) {
        String r = cleanRole(role);
        conventionService.checkOwnership(id, r, requestingUserId);
        return ResponseEntity.ok(conventionService.update(id, request, r));
    }

    @PatchMapping("/{id}/statut")
    public ResponseEntity<ConventionResponse> updateStatut(
            @PathVariable Integer id,
            @RequestParam StatutConvention statut,
            @RequestHeader("X-User-Role") String role) {
        return ResponseEntity.ok(conventionService.updateStatut(id, statut));
    }

    @PatchMapping("/{id}/renouvellement/demander")
    public ResponseEntity<ConventionResponse> demanderRenouvellement(
            @PathVariable Integer id,
            @RequestHeader("X-User-Id") Integer userId,
            @RequestHeader("X-User-Role") String role) {
        return ResponseEntity.ok(
                conventionService.demanderRenouvellement(id, cleanRole(role), userId));
    }

    @PostMapping("/{id}/renouvellement/accepter")
    public ResponseEntity<ConventionResponse> accepterRenouvellement(
            @PathVariable Integer id,
            @Valid @RequestBody ConventionRequest newTerms,
            @RequestHeader("X-User-Role") String role,
            @RequestHeader("X-User-Id") Integer userId) {
        return ResponseEntity.ok(
                conventionService.accepterRenouvellement(id, newTerms, cleanRole(role), userId));
    }

    @PostMapping("/{id}/confirmer")
    public ResponseEntity<ConventionResponse> confirmer(
            @PathVariable Integer id,
            @RequestHeader("X-User-Role") String role,
            @RequestHeader("X-User-Id") Integer requestingUserId) {
        String r = cleanRole(role);
        conventionService.checkOwnership(id, r, requestingUserId);
        return ResponseEntity.ok(conventionService.confirmer(id, r));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Integer id,
            @RequestHeader("X-User-Role") String role,
            @RequestHeader("X-User-Id") Integer requestingUserId) {
        String r = cleanRole(role);
        conventionService.delete(id, r, requestingUserId);
        return ResponseEntity.noContent().build();
    }

    private void checkAdmin(String role) {
        if (!"ROLE_ADMIN".equals(role))
            throw new RuntimeException("Access denied: ADMIN role required");
    }
}