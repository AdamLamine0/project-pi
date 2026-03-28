package org.example.partenariatpi.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.partenariatpi.dto.OrganisationPartenaireRequest;
import org.example.partenariatpi.dto.OrganisationPartenaireResponse;
import org.example.partenariatpi.enums.StatutPartenaire;
import org.example.partenariatpi.service.OrganisationPartenaireService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/organisations")
@RequiredArgsConstructor
public class OrganisationPartenaireController {

    private final OrganisationPartenaireService service;

    // ── ANY AUTHENTICATED USER ────────────────────────────────────────────────

    @GetMapping
    public ResponseEntity<List<OrganisationPartenaireResponse>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrganisationPartenaireResponse> getById(
            @PathVariable Integer id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping("/statut/{statut}")
    public ResponseEntity<List<OrganisationPartenaireResponse>> getByStatut(
            @PathVariable StatutPartenaire statut) {
        return ResponseEntity.ok(service.getByStatut(statut));
    }

    // ── PARTNER: own dashboard only ───────────────────────────────────────────

    // PARTNER clicks "Mon tableau de bord"
    // Gateway injects X-User-Id from JWT automatically
    @GetMapping("/my-dashboard")
    public ResponseEntity<OrganisationPartenaireResponse> getMyDashboard(
            @RequestHeader("X-User-Id") Integer userId,
            @RequestHeader("X-User-Role") String role) {
        checkRole(role, "ROLE_PARTNER");
        return ResponseEntity.ok(service.getMyDashboard(userId));
    }

    // PARTNER: update only their contact info (contactNom, contactEmail, siteWeb)
    @PutMapping("/{id}/contact")
    public ResponseEntity<OrganisationPartenaireResponse> updateContactInfo(
            @PathVariable Integer id,
            @Valid @RequestBody OrganisationPartenaireRequest request,
            @RequestHeader("X-User-Id") Integer userId,
            @RequestHeader("X-User-Role") String role) {
        checkRole(role, "ROLE_PARTNER");
        return ResponseEntity.ok(service.updateContactInfo(id, request, userId));
    }

    // ── ADMIN only ────────────────────────────────────────────────────────────

    @PostMapping
    public ResponseEntity<OrganisationPartenaireResponse> create(
            @Valid @RequestBody OrganisationPartenaireRequest request,
            @RequestHeader("X-User-Role") String role) {
        checkAdmin(role);
        return ResponseEntity.ok(service.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrganisationPartenaireResponse> update(
            @PathVariable Integer id,
            @Valid @RequestBody OrganisationPartenaireRequest request,
            @RequestHeader("X-User-Role") String role) {
        checkAdmin(role);
        return ResponseEntity.ok(service.update(id, request));
    }

    @PatchMapping("/{id}/statut")
    public ResponseEntity<OrganisationPartenaireResponse> updateStatut(
            @PathVariable Integer id,
            @RequestParam StatutPartenaire statut,
            @RequestHeader("X-User-Role") String role) {
        checkAdmin(role);
        return ResponseEntity.ok(service.updateStatut(id, statut));
    }

    // ADMIN assigns a User (Role.PARTNER) to manage this institution's dashboard
    @PutMapping("/{id}/assign-user/{userId}")
    public ResponseEntity<OrganisationPartenaireResponse> assignUser(
            @PathVariable Integer id,
            @PathVariable Integer userId,
            @RequestHeader("X-User-Role") String role) {
        checkAdmin(role);
        return ResponseEntity.ok(service.assignUser(id, userId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Integer id,
            @RequestHeader("X-User-Role") String role) {
        checkAdmin(role);
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    // ── HELPERS ───────────────────────────────────────────────────────────────

    private void checkAdmin(String role) {
        if (!"ROLE_ADMIN".equals(role))
            throw new RuntimeException("Access denied: ADMIN role required");
    }

    private void checkRole(String role, String required) {
        if (!required.equals(role))
            throw new RuntimeException("Access denied: " + required + " role required");
    }
}