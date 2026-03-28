package org.example.partenariatpi.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.partenariatpi.dto.ObjectifRequest;
import org.example.partenariatpi.dto.ObjectifResponse;
import org.example.partenariatpi.enums.ResponsableObjectif;
import org.example.partenariatpi.enums.StatutObjectif;
import org.example.partenariatpi.service.ObjectifService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/objectifs")
@RequiredArgsConstructor
public class ObjectifController {

    private final ObjectifService objectifService;

    // ── READ ──────────────────────────────────────────────────────────────────

    // All objectifs of a convention
    @GetMapping("/convention/{conventionId}")
    public ResponseEntity<List<ObjectifResponse>> getByConvention(
            @PathVariable Integer conventionId) {
        return ResponseEntity.ok(objectifService.getByConvention(conventionId));
    }

    // Filter by statut: EN_COURS / ATTEINT / EN_RETARD / ANNULE
    @GetMapping("/convention/{conventionId}/statut/{statut}")
    public ResponseEntity<List<ObjectifResponse>> getByConventionAndStatut(
            @PathVariable Integer conventionId,
            @PathVariable StatutObjectif statut) {
        return ResponseEntity.ok(
                objectifService.getByConventionAndStatut(conventionId, statut));
    }

    // Filter by responsable: USER / PARTENAIRE / LES_DEUX
    // → useful for front: show "mes engagements" vs "engagements du partenaire"
    @GetMapping("/convention/{conventionId}/responsable/{responsable}")
    public ResponseEntity<List<ObjectifResponse>> getByConventionAndResponsable(
            @PathVariable Integer conventionId,
            @PathVariable ResponsableObjectif responsable) {
        return ResponseEntity.ok(
                objectifService.getByConventionAndResponsable(conventionId, responsable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ObjectifResponse> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(objectifService.getById(id));
    }

    // ── CREATE ────────────────────────────────────────────────────────────────

    // Any party (USER, PARTNER, ADMIN) can create objectifs on their convention
    // Front calls this automatically when convention is created
    @PostMapping
    public ResponseEntity<ObjectifResponse> create(
            @Valid @RequestBody ObjectifRequest request,
            @RequestHeader("X-User-Role") String role,
            @RequestHeader("X-User-Id") Integer userId) {
        return ResponseEntity.ok(objectifService.create(request, role, userId));
    }

    // ── UPDATE ────────────────────────────────────────────────────────────────

    // Any party of the convention can update
    @PutMapping("/{id}")
    public ResponseEntity<ObjectifResponse> update(
            @PathVariable Integer id,
            @Valid @RequestBody ObjectifRequest request,
            @RequestHeader("X-User-Role") String role,
            @RequestHeader("X-User-Id") Integer userId) {
        return ResponseEntity.ok(objectifService.update(id, request, role, userId));
    }

    // Any party can change statut + add comment
    @PatchMapping("/{id}/statut")
    public ResponseEntity<ObjectifResponse> updateStatut(
            @PathVariable Integer id,
            @RequestParam StatutObjectif statut,
            @RequestParam(required = false) String commentaire,
            @RequestHeader("X-User-Role") String role,
            @RequestHeader("X-User-Id") Integer userId) {
        return ResponseEntity.ok(
                objectifService.updateStatut(id, statut, commentaire, role, userId));
    }

    // ── DELETE ────────────────────────────────────────────────────────────────

    // Any party of the convention can delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Integer id,
            @RequestHeader("X-User-Role") String role,
            @RequestHeader("X-User-Id") Integer userId) {
        objectifService.delete(id, role, userId);
        return ResponseEntity.noContent().build();
    }
}