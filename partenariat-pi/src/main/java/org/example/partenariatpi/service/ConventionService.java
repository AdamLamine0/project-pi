package org.example.partenariatpi.service;

import lombok.RequiredArgsConstructor;
import org.example.partenariatpi.dto.ConventionMapper;
import org.example.partenariatpi.dto.ConventionRequest;
import org.example.partenariatpi.dto.ConventionResponse;
import org.example.partenariatpi.enums.StatutConvention;
import org.example.partenariatpi.model.Convention;
import org.example.partenariatpi.model.OrganisationPartenaire;
import org.example.partenariatpi.repository.ConventionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ConventionService {

    private final ConventionRepository repository;
    private final ConventionMapper mapper;
    private final OrganisationPartenaireService orgService;

    // ── READ ──────────────────────────────────────────────────────────────────

    public List<ConventionResponse> getAll() {
        return repository.findAll().stream().map(mapper::toResponse).toList();
    }

    public ConventionResponse getById(Integer id) {
        return mapper.toResponse(findById(id));
    }

    // All conventions of a given user (entrepreneur)
    public List<ConventionResponse> getByUserId(Integer userId) {
        return repository.findByUserId(userId)
                .stream().map(mapper::toResponse).toList();
    }

    // All conventions of a given organisation (institution)
    public List<ConventionResponse> getByOrganisationId(Integer orgId) {
        return repository.findByOrganisationPartenaireId(orgId)
                .stream().map(mapper::toResponse).toList();
    }

    // Convention between a specific user and a specific organisation
    public List<ConventionResponse> getByUserAndOrganisation(Integer userId,
                                                             Integer orgId) {
        return repository.findByUserIdAndOrganisationPartenaireId(userId, orgId)
                .stream().map(mapper::toResponse).toList();
    }

    // All conventions with a pending renewal request
    public List<ConventionResponse> getPendingRenewal() {
        return repository.findByRenouvellementDemandeParRoleIsNotNull()
                .stream().map(mapper::toResponse).toList();
    }

    // ── CREATE ────────────────────────────────────────────────────────────────

    public ConventionResponse create(ConventionRequest request) {
        OrganisationPartenaire org =
                orgService.findById(request.getOrganisationPartenaireId());

        Convention c = mapper.toEntity(request, org);
        Convention saved = repository.save(c);

        // Auto-generate: CONV-2025-0001
        saved.setNumeroConvention(
                "CONV-" + LocalDate.now().getYear()
                        + "-" + String.format("%04d", saved.getId())
        );
        return mapper.toResponse(repository.save(saved));
    }

    // ── UPDATE ────────────────────────────────────────────────────────────────

    public ConventionResponse update(Integer id, ConventionRequest request) {
        Convention existing = findById(id);
        existing.setDateDebut(request.getDateDebut());
        existing.setDateFin(request.getDateFin());
        // objectifs managed separately via /api/objectifs
        return mapper.toResponse(repository.save(existing));
    }

    // ADMIN only: move statut through lifecycle
    public ConventionResponse updateStatut(Integer id, StatutConvention statut) {
        Convention existing = findById(id);
        existing.setStatut(statut);
        if (statut == StatutConvention.SIGNEE && existing.getSignedAt() == null) {
            existing.setSignedAt(LocalDate.now());
        }
        return mapper.toResponse(repository.save(existing));
    }

    // ── RENEWAL ───────────────────────────────────────────────────────────────
    //
    // Business rule:
    //   Step 1 — one party requests renewal   → renouvellementDemandeParRole = their role
    //   Step 2 — the OTHER party accepts      → old convention expires, new one created
    //
    // ADMIN can perform both steps on behalf of anyone.

    // Step 1: request renewal
    // Who can call: USER, PARTNER, or ADMIN
    public ConventionResponse demanderRenouvellement(Integer id,
                                                     String requestingRole,
                                                     Integer requestingUserId) {
        Convention existing = findById(id);
        checkIsParty(existing, requestingRole, requestingUserId);

        if (existing.getStatut() != StatutConvention.ACTIVE) {
            throw new RuntimeException(
                    "Renewal can only be requested for ACTIVE conventions");
        }
        if (existing.getRenouvellementDemandeParRole() != null) {
            throw new RuntimeException(
                    "A renewal request already exists for this convention — "
                            + "waiting for the other party to accept");
        }

        existing.setRenouvellementDemandeParRole(requestingRole);
        return mapper.toResponse(repository.save(existing));
    }

    // Step 2: accept renewal
    // Who can call: the OTHER party (not who requested), or ADMIN
    public ConventionResponse accepterRenouvellement(Integer id,
                                                     ConventionRequest newTerms,
                                                     String requestingRole,
                                                     Integer requestingUserId) {
        Convention existing = findById(id);

        String requesterRole = existing.getRenouvellementDemandeParRole();
        if (requesterRole == null) {
            throw new RuntimeException(
                    "No renewal has been requested for this convention");
        }

        if (!"ROLE_ADMIN".equals(requestingRole)) {
            // Must be a party of the convention
            checkIsParty(existing, requestingRole, requestingUserId);
            // Cannot accept your own request
            if (requesterRole.equals(requestingRole)) {
                throw new RuntimeException(
                        "You cannot accept your own renewal request — "
                                + "the other party must accept it");
            }
        }

        // Expire old convention
        existing.setStatut(StatutConvention.EXPIREE);
        existing.setRenouvellementDemandeParRole(null);
        repository.save(existing);

        // Create new convention with new terms (same parties)
        return create(newTerms);
    }

    // ── DELETE ────────────────────────────────────────────────────────────────

    public void delete(Integer id, String requestingRole, Integer requestingUserId) {
        Convention existing = findById(id);
        if (!"ROLE_ADMIN".equals(requestingRole)) {
            checkIsParty(existing, requestingRole, requestingUserId);
        }
        repository.deleteById(id);
    }

    // ── SECURITY ──────────────────────────────────────────────────────────────

    // Checks the requesting user is one of the two parties of this convention
    public void checkIsParty(Convention convention,
                             String role,
                             Integer requestingUserId) {
        if ("ROLE_ADMIN".equals(role)) return;

        boolean isUser = convention.getUserId().equals(requestingUserId);

        boolean isPartner = false;
        if ("ROLE_PARTNER".equals(role)) {
            try {
                OrganisationPartenaire myOrg = orgService.findByUserId(requestingUserId);
                isPartner = myOrg.getId()
                        .equals(convention.getOrganisationPartenaire().getId());
            } catch (Exception ignored) {}
        }

        if (!isUser && !isPartner) {
            throw new RuntimeException(
                    "Access denied: you are not a party of this convention");
        }
    }

    public void checkOwnership(Integer conventionId,
                               String role,
                               Integer requestingUserId) {
        checkIsParty(findById(conventionId), role, requestingUserId);
    }

    // Package-private — reused by ObjectifService
    Convention findById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Convention not found with id: " + id));
    }
}