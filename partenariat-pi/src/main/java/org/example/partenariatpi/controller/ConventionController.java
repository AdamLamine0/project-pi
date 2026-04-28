package org.example.partenariatpi.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.partenariatpi.dto.ConventionRequest;
import org.example.partenariatpi.dto.ConventionResponse;
import org.example.partenariatpi.enums.StatutConvention;
import org.example.partenariatpi.model.Convention;
import org.example.partenariatpi.service.ConventionPdfService;
import org.example.partenariatpi.service.ConventionService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/conventions")
@RequiredArgsConstructor
public class ConventionController {

    private final ConventionService conventionService;
    private final ConventionPdfService conventionPdfService;

    private String cleanRole(String role) {
        if (role == null) return "";
        return role.split(",")[0].trim();
    }

    // ── GET ALL (ADMIN only) ──────────────────────────────────────────────────
    @GetMapping
    public ResponseEntity<List<ConventionResponse>> getAll(
            @RequestHeader("X-User-Role") String role) {
        checkAdmin(cleanRole(role));
        return ResponseEntity.ok(conventionService.getAll());
    }

    // ── GET BY ID ─────────────────────────────────────────────────────────────
    @GetMapping("/{id}")
    public ResponseEntity<ConventionResponse> getById(
            @PathVariable Integer id,
            @RequestHeader("X-User-Role") String role,
            @RequestHeader("X-User-Id") String userIdRaw) {
        Integer userId = Integer.parseInt(userIdRaw.split(",")[0].trim());
        conventionService.checkOwnership(id, cleanRole(role), userId);
        return ResponseEntity.ok(conventionService.getById(id));
    }

    // ── GET PDF ───────────────────────────────────────────────────────────────
    @GetMapping("/{id}/pdf")
    public ResponseEntity<byte[]> downloadPdf(
            @PathVariable Integer id,
            @RequestHeader("X-User-Role") String role,
            @RequestHeader("X-User-Id") String userIdRaw) {
        String r = cleanRole(role);
        Integer userId = Integer.parseInt(userIdRaw.split(",")[0].trim());

        Convention convention = conventionService.findById(id);
        conventionService.checkIsParty(convention, r, userId);

        byte[] pdf = conventionPdfService.generateConventionPdf(id);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"convention-" + id + ".pdf\"")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }

    // ── GET BY USER ───────────────────────────────────────────────────────────
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ConventionResponse>> getByUser(
            @PathVariable Integer userId,
            @RequestHeader("X-User-Role") String role,
            @RequestHeader("X-User-Id") String requestingUserIdRaw) {
        String r = cleanRole(role);
        Integer requestingUserId = Integer.parseInt(requestingUserIdRaw.split(",")[0].trim());
        if (!"ROLE_ADMIN".equals(r) && !requestingUserId.equals(userId))
            throw new RuntimeException("Access denied: you can only view your own conventions");
        return ResponseEntity.ok(conventionService.getByUserId(userId));
    }

    // ── GET BY ORGANISATION ───────────────────────────────────────────────────
    @GetMapping("/organisation/{orgId}")
    public ResponseEntity<List<ConventionResponse>> getByOrganisation(
            @PathVariable Integer orgId,
            @RequestHeader("X-User-Role") String role) {
        String r = cleanRole(role);
        if (!"ROLE_ADMIN".equals(r) && !"ROLE_PARTNER".equals(r))
            throw new RuntimeException("Access denied");
        return ResponseEntity.ok(conventionService.getByOrganisationId(orgId));
    }

    // ── GET BY USER AND ORGANISATION ──────────────────────────────────────────
    @GetMapping("/user/{userId}/organisation/{orgId}")
    public ResponseEntity<List<ConventionResponse>> getByUserAndOrganisation(
            @PathVariable Integer userId,
            @PathVariable Integer orgId,
            @RequestHeader("X-User-Role") String role,
            @RequestHeader("X-User-Id") String requestingUserIdRaw) {
        String r = cleanRole(role);
        Integer requestingUserId = Integer.parseInt(requestingUserIdRaw.split(",")[0].trim());
        if (!"ROLE_ADMIN".equals(r) && !requestingUserId.equals(userId))
            throw new RuntimeException("Access denied");
        return ResponseEntity.ok(conventionService.getByUserAndOrganisation(userId, orgId));
    }

    // ── GET PENDING RENEWAL ───────────────────────────────────────────────────
    @GetMapping("/pending-renewal")
    public ResponseEntity<List<ConventionResponse>> getPendingRenewal(
            @RequestHeader("X-User-Role") String role) {
        checkAdmin(cleanRole(role));
        return ResponseEntity.ok(conventionService.getPendingRenewal());
    }

    // ── CREATE ────────────────────────────────────────────────────────────────
    @PostMapping
    public ResponseEntity<ConventionResponse> create(
            @Valid @RequestBody ConventionRequest request,
            @RequestHeader("X-User-Role") String role,
            @RequestHeader("X-User-Id") String requestingUserIdRaw) {
        String r = cleanRole(role);
        Integer requestingUserId = Integer.parseInt(requestingUserIdRaw.split(",")[0].trim());
        if (isEntrepreneurRole(r) && !request.getUserId().equals(requestingUserId))
            throw new RuntimeException("Access denied: you can only create conventions for yourself");
        return ResponseEntity.ok(conventionService.create(request, r));
    }

    // ── UPDATE ────────────────────────────────────────────────────────────────
    @PutMapping("/{id}")
    public ResponseEntity<ConventionResponse> update(
            @PathVariable Integer id,
            @Valid @RequestBody ConventionRequest request,
            @RequestHeader("X-User-Role") String role,
            @RequestHeader("X-User-Id") String requestingUserIdRaw) {
        String r = cleanRole(role);
        Integer requestingUserId = Integer.parseInt(requestingUserIdRaw.split(",")[0].trim());
        conventionService.checkOwnership(id, r, requestingUserId);
        return ResponseEntity.ok(conventionService.update(id, request, r));
    }

    // ── UPDATE STATUT ─────────────────────────────────────────────────────────
    @PatchMapping("/{id}/statut")
    public ResponseEntity<ConventionResponse> updateStatut(
            @PathVariable Integer id,
            @RequestParam StatutConvention statut,
            @RequestHeader("X-User-Role") String role) {
        return ResponseEntity.ok(conventionService.updateStatut(id, statut));
    }

    // ── CONFIRMER (avec signature) ────────────────────────────────────────────
    @PostMapping("/{id}/confirmer")
    public ResponseEntity<ConventionResponse> confirmer(
            @PathVariable Integer id,
            @RequestBody(required = false) Map<String, String> body,
            @RequestHeader("X-User-Role") String role,
            @RequestHeader("X-User-Id") String userIdRaw) {
        String r = cleanRole(role);
        Integer userId = Integer.parseInt(userIdRaw.split(",")[0].trim());
        conventionService.checkOwnership(id, r, userId);
        String signature = (body != null) ? body.get("signature") : null;
        return ResponseEntity.ok(conventionService.confirmer(id, r, signature));
    }

    // ── DEMANDER RENOUVELLEMENT ───────────────────────────────────────────────
    @PatchMapping("/{id}/renouvellement/demander")
    public ResponseEntity<ConventionResponse> demanderRenouvellement(
            @PathVariable Integer id,
            @RequestHeader("X-User-Id") String userIdRaw,
            @RequestHeader("X-User-Role") String role) {
        Integer userId = Integer.parseInt(userIdRaw.split(",")[0].trim());
        return ResponseEntity.ok(
                conventionService.demanderRenouvellement(id, cleanRole(role), userId));
    }

    // ── ACCEPTER RENOUVELLEMENT ───────────────────────────────────────────────
    @PostMapping("/{id}/renouvellement/accepter")
    public ResponseEntity<ConventionResponse> accepterRenouvellement(
            @PathVariable Integer id,
            @Valid @RequestBody ConventionRequest newTerms,
            @RequestHeader("X-User-Role") String role,
            @RequestHeader("X-User-Id") String userIdRaw) {
        Integer userId = Integer.parseInt(userIdRaw.split(",")[0].trim());
        return ResponseEntity.ok(
                conventionService.accepterRenouvellement(id, newTerms, cleanRole(role), userId));
    }

    // ── DELETE ────────────────────────────────────────────────────────────────
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Integer id,
            @RequestHeader("X-User-Role") String role,
            @RequestHeader("X-User-Id") String requestingUserIdRaw) {
        String r = cleanRole(role);
        Integer requestingUserId = Integer.parseInt(requestingUserIdRaw.split(",")[0].trim());
        conventionService.delete(id, r, requestingUserId);
        return ResponseEntity.noContent().build();
    }

    // ── HELPER ────────────────────────────────────────────────────────────────
    private void checkAdmin(String role) {
        if (!"ROLE_ADMIN".equals(role))
            throw new RuntimeException("Access denied: ADMIN role required");
    }

    private boolean isEntrepreneurRole(String role) {
        return "ROLE_USER".equals(role) || "ROLE_ENTREPRENEUR".equals(role);
    }
    @PostMapping("/{id}/annuler")
    public ResponseEntity<ConventionResponse> annuler(
            @PathVariable Integer id,
            @RequestHeader("X-User-Role") String role,
            @RequestHeader("X-User-Id") String userIdRaw) {
        String r = cleanRole(role);
        Integer userId = Integer.parseInt(userIdRaw.split(",")[0].trim());
        return ResponseEntity.ok(conventionService.annuler(id, r, userId));
    }
}
