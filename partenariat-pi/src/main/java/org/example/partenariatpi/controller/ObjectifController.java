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

    private String cleanRole(String role) {
        if (role == null) return "";
        return role.split(",")[0].trim();
    }

    @GetMapping("/convention/{conventionId}")
    public ResponseEntity<List<ObjectifResponse>> getByConvention(
            @PathVariable Integer conventionId) {
        return ResponseEntity.ok(objectifService.getByConvention(conventionId));
    }

    @GetMapping("/convention/{conventionId}/statut/{statut}")
    public ResponseEntity<List<ObjectifResponse>> getByConventionAndStatut(
            @PathVariable Integer conventionId,
            @PathVariable StatutObjectif statut) {
        return ResponseEntity.ok(objectifService.getByConventionAndStatut(conventionId, statut));
    }

    @GetMapping("/convention/{conventionId}/responsable/{responsable}")
    public ResponseEntity<List<ObjectifResponse>> getByConventionAndResponsable(
            @PathVariable Integer conventionId,
            @PathVariable ResponsableObjectif responsable) {
        return ResponseEntity.ok(objectifService.getByConventionAndResponsable(conventionId, responsable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ObjectifResponse> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(objectifService.getById(id));
    }

    @PostMapping
    public ResponseEntity<ObjectifResponse> create(
            @Valid @RequestBody ObjectifRequest request,
            @RequestHeader("X-User-Role") String role,
            @RequestHeader("X-User-Id") String userIdRaw) {
        Integer userId = Integer.parseInt(userIdRaw.split(",")[0].trim());
        return ResponseEntity.ok(objectifService.create(request, cleanRole(role), userId));
    }


    @PutMapping("/{id}")
    public ResponseEntity<ObjectifResponse> update(
            @PathVariable Integer id,
            @Valid @RequestBody ObjectifRequest request,
            @RequestHeader("X-User-Role") String role,
            @RequestHeader("X-User-Id") String userIdRaw) {
        Integer userId = Integer.parseInt(userIdRaw.split(",")[0].trim());
        return ResponseEntity.ok(objectifService.update(id, request, cleanRole(role), userId));
    }

    @PatchMapping("/{id}/statut")
    public ResponseEntity<ObjectifResponse> updateStatut(
            @PathVariable Integer id,
            @RequestParam StatutObjectif statut,
            @RequestParam(required = false) String commentaire,
            @RequestHeader("X-User-Role") String role,
            @RequestHeader("X-User-Id") String userIdRaw) {
        Integer userId = Integer.parseInt(userIdRaw.split(",")[0].trim());
        return ResponseEntity.ok(
                objectifService.updateStatut(id, statut, commentaire, cleanRole(role), userId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Integer id,
            @RequestHeader("X-User-Role") String role,
            @RequestHeader("X-User-Id") String userIdRaw) {
        Integer userId = Integer.parseInt(userIdRaw.split(",")[0].trim());
        objectifService.delete(id, cleanRole(role), userId);
        return ResponseEntity.noContent().build();
    }
}