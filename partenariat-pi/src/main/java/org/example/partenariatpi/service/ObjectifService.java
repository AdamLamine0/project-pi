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

    // Get all objectifs of a convention
    public List<ObjectifResponse> getByConvention(Integer conventionId) {
        return repository.findByConventionId(conventionId)
                .stream().map(mapper::toResponse).toList();
    }

    // Filter by statut: EN_COURS, ATTEINT, EN_RETARD, ANNULE
    public List<ObjectifResponse> getByConventionAndStatut(Integer conventionId,
                                                           StatutObjectif statut) {
        return repository.findByConventionIdAndStatut(conventionId, statut)
                .stream().map(mapper::toResponse).toList();
    }

    // Filter by responsable: USER objectifs vs PARTENAIRE objectifs
    public List<ObjectifResponse> getByConventionAndResponsable(
            Integer conventionId, ResponsableObjectif responsable) {
        return repository.findByConventionIdAndResponsable(conventionId, responsable)
                .stream().map(mapper::toResponse).toList();
    }

    public ObjectifResponse getById(Integer id) {
        return mapper.toResponse(findById(id));
    }

    // ── CREATE ────────────────────────────────────────────────────────────────

    // Created by front automatically when convention is created.
    // Any party (USER, PARTNER, ADMIN) can create objectifs on their convention.
    // The responsable field in the request tells who is committed:
    //   USER → the entrepreneur commits to this objectif
    //   PARTENAIRE → the institution commits to this objectif
    //   LES_DEUX → both commit
    public ObjectifResponse create(ObjectifRequest request,
                                   String requestingRole,
                                   Integer requestingUserId) {
        Convention convention = conventionService.findById(request.getConventionId());

        // Verify requester is a party of this convention (or admin)
        conventionService.checkIsParty(convention, requestingRole, requestingUserId);

        Objectif o = mapper.toEntity(request, convention);
        return mapper.toResponse(repository.save(o));
    }

    // ── UPDATE ────────────────────────────────────────────────────────────────

    // Any party of the convention can update objectifs
    public ObjectifResponse update(Integer id,
                                   ObjectifRequest request,
                                   String requestingRole,
                                   Integer requestingUserId) {
        Objectif existing = findById(id);

        // Verify requester is a party of the convention this objectif belongs to
        conventionService.checkIsParty(
                existing.getConvention(), requestingRole, requestingUserId);

        existing.setTitre(request.getTitre());
        existing.setDescription(request.getDescription());
        existing.setResponsable(request.getResponsable());
        existing.setDateEcheance(request.getDateEcheance());
        existing.setCommentaire(request.getCommentaire());
        return mapper.toResponse(repository.save(existing));
    }

    // ── UPDATE STATUT ─────────────────────────────────────────────────────────

    // Any party can mark an objectif as ATTEINT, EN_RETARD, ANNULE
    public ObjectifResponse updateStatut(Integer id,
                                         StatutObjectif statut,
                                         String commentaire,
                                         String requestingRole,
                                         Integer requestingUserId) {
        Objectif existing = findById(id);

        conventionService.checkIsParty(
                existing.getConvention(), requestingRole, requestingUserId);

        existing.setStatut(statut);
        if (commentaire != null && !commentaire.isBlank()) {
            existing.setCommentaire(commentaire);
        }
        return mapper.toResponse(repository.save(existing));
    }

    // ── DELETE ────────────────────────────────────────────────────────────────

    // Any party of the convention can delete their objectifs
    public void delete(Integer id,
                       String requestingRole,
                       Integer requestingUserId) {
        Objectif existing = findById(id);

        conventionService.checkIsParty(
                existing.getConvention(), requestingRole, requestingUserId);

        repository.deleteById(id);
    }

    // ── HELPER ───────────────────────────────────────────────────────────────

    private Objectif findById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Objectif not found with id: " + id));
    }
}