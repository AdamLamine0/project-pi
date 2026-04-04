package org.example.partenariatpi.service;

import lombok.RequiredArgsConstructor;
import org.example.partenariatpi.dto.ObjectifMapper;
import org.example.partenariatpi.dto.ObjectifRequest;
import org.example.partenariatpi.dto.ObjectifResponse;
import org.example.partenariatpi.model.Convention;
import org.example.partenariatpi.model.Objectif;
import org.example.partenariatpi.enums.ResponsableObjectif;
import org.example.partenariatpi.enums.StatutObjectif;
import org.example.partenariatpi.repository.ObjectifRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ObjectifService {

    private final ObjectifRepository repository;
    private final ObjectifMapper mapper;
    private final ConventionService conventionService;

    // ── READ ──────────────────────────────────────────────────────────────────

    public List<ObjectifResponse> getByConvention(Integer conventionId) {
        return repository.findByConventionId(conventionId)
                .stream().map(mapper::toResponse).toList();
    }

    public List<ObjectifResponse> getByConventionAndStatut(Integer conventionId, StatutObjectif statut) {
        return repository.findByConventionIdAndStatut(conventionId, statut)
                .stream().map(mapper::toResponse).toList();
    }

    public List<ObjectifResponse> getByConventionAndResponsable(
            Integer conventionId, ResponsableObjectif responsable) {
        return repository.findByConventionIdAndResponsable(conventionId, responsable)
                .stream().map(mapper::toResponse).toList();
    }

    public ObjectifResponse getById(Integer id) {
        return mapper.toResponse(findById(id));
    }

    // ── CREATE ────────────────────────────────────────────────────────────────

    public ObjectifResponse create(ObjectifRequest request,
                                   String requestingRole,
                                   Integer requestingUserId) {
        Convention convention = conventionService.findById(request.getConventionId());
        conventionService.checkIsParty(convention, requestingRole, requestingUserId);

        Objectif o = mapper.toEntity(request, convention);
        ObjectifResponse saved = mapper.toResponse(repository.save(o));

        // ── KEY FIX: creating an objectif counts as a modification ────────────
        // The OTHER party must see it and re-confirm before activation
        conventionService.resetConfirmationsAfterObjectifChange(
                request.getConventionId(), requestingRole);

        return saved;
    }

    // ── UPDATE ────────────────────────────────────────────────────────────────

    public ObjectifResponse update(Integer id,
                                   ObjectifRequest request,
                                   String requestingRole,
                                   Integer requestingUserId) {
        Objectif existing = findById(id);
        conventionService.checkIsParty(existing.getConvention(), requestingRole, requestingUserId);

        existing.setTitre(request.getTitre());
        existing.setDescription(request.getDescription());
        existing.setResponsable(request.getResponsable());
        existing.setDateEcheance(request.getDateEcheance());
        existing.setCommentaire(request.getCommentaire());
        ObjectifResponse saved = mapper.toResponse(repository.save(existing));

        // ── KEY FIX: updating an objectif also resets confirmations ──────────
        conventionService.resetConfirmationsAfterObjectifChange(
                existing.getConvention().getId(), requestingRole);

        return saved;
    }

    // ── UPDATE STATUT ─────────────────────────────────────────────────────────
    // Updating statut (EN_COURS → ATTEINT etc.) does NOT reset confirmations
    // — it is a progress update, not a structural change to the convention

    public ObjectifResponse updateStatut(Integer id,
                                         StatutObjectif statut,
                                         String commentaire,
                                         String requestingRole,
                                         Integer requestingUserId) {
        Objectif existing = findById(id);
        conventionService.checkIsParty(existing.getConvention(), requestingRole, requestingUserId);

        existing.setStatut(statut);
        if (commentaire != null && !commentaire.isBlank()) {
            existing.setCommentaire(commentaire);
        }
        return mapper.toResponse(repository.save(existing));
    }

    // ── DELETE ────────────────────────────────────────────────────────────────

    public void delete(Integer id, String requestingRole, Integer requestingUserId) {
        Objectif existing = findById(id);
        conventionService.checkIsParty(existing.getConvention(), requestingRole, requestingUserId);

        Integer conventionId = existing.getConvention().getId();
        repository.deleteById(id);

        // ── KEY FIX: deleting an objectif also resets confirmations ──────────
        conventionService.resetConfirmationsAfterObjectifChange(conventionId, requestingRole);
    }

    // ── HELPER ───────────────────────────────────────────────────────────────

    private Objectif findById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Objectif not found with id: " + id));
    }
}