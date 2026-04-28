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

    public List<ConventionResponse> getByUserId(Integer userId) {
        return repository.findByUserId(userId)
                .stream().map(mapper::toResponse).toList();
    }

    public List<ConventionResponse> getByOrganisationId(Integer orgId) {
        return repository.findByOrganisationPartenaireId(orgId)
                .stream().map(mapper::toResponse).toList();
    }

    public List<ConventionResponse> getByUserAndOrganisation(Integer userId, Integer orgId) {
        return repository.findByUserIdAndOrganisationPartenaireId(userId, orgId)
                .stream().map(mapper::toResponse).toList();
    }

    public List<ConventionResponse> getPendingRenewal() {
        return repository.findByRenouvellementDemandeParRoleIsNotNull()
                .stream().map(mapper::toResponse).toList();
    }

    // ── CREATE ────────────────────────────────────────────────────────────────
    // Dates are NOT required at creation time.
    // They are negotiated and locked when both parties sign (confirmer).

    public ConventionResponse create(ConventionRequest request, String role) {
        OrganisationPartenaire org = orgService.findById(request.getOrganisationPartenaireId());
        Convention c = mapper.toEntity(request, org);
        c.setModifieParRole(role);
        c.setConfirmeParUser(false);
        c.setConfirmeParPartenaire(false);

        Convention saved = repository.save(c);
        saved.setNumeroConvention(
                "CONV-" + LocalDate.now().getYear()
                        + "-" + String.format("%04d", saved.getId())
        );
        return mapper.toResponse(repository.save(saved));
    }

    // ── CONFIRM ───────────────────────────────────────────────────────────────
    //
    // Rules:
    //  1. You CANNOT confirm if YOU were the last one to modify (modifieParRole == your role)
    //     unless the other party already confirmed.
    //  2. You CANNOT confirm twice.
    //  3. The FIRST party to confirm must supply dateDebut + dateFin — these are validated
    //     and locked on the convention.  The second party confirms the same locked dates.
    //  4. Once both confirmed → ACTIVE.
    //  5. If one party confirms and the other modifies → both confirmations reset.

    public ConventionResponse confirmer(Integer id, String role, String signature,
                                        LocalDate dateDebut, LocalDate dateFin) {
        Convention existing = findById(id);

        // ── Block check: modifier cannot self-confirm until other party has confirmed ──
        if (role.equals(existing.getModifieParRole())) {
            boolean otherHasConfirmed =
                    "ROLE_USER".equals(role)
                            ? Boolean.TRUE.equals(existing.getConfirmeParPartenaire())
                            : Boolean.TRUE.equals(existing.getConfirmeParUser());
            if (!otherHasConfirmed) {
                throw new RuntimeException(
                        "Vous avez fait le dernier changement — attendez que l'autre partie confirme d'abord.");
            }
            existing.setModifieParRole(null);
        }

        // ── Already confirmed check ───────────────────────────────────────────
        if ("ROLE_USER".equals(role) && Boolean.TRUE.equals(existing.getConfirmeParUser())) {
            throw new RuntimeException("Vous avez déjà confirmé cette convention.");
        }
        if ("ROLE_PARTNER".equals(role) && Boolean.TRUE.equals(existing.getConfirmeParPartenaire())) {
            throw new RuntimeException("Vous avez déjà confirmé cette convention.");
        }

        // ── Date handling ────────────────────────────────────────────────────
        // Neither party has confirmed yet → dates must be provided and are validated + locked.
        boolean neitherConfirmedYet = !Boolean.TRUE.equals(existing.getConfirmeParUser())
                && !Boolean.TRUE.equals(existing.getConfirmeParPartenaire());

        if (neitherConfirmedYet) {
            // First confirmer must supply valid dates
            if (dateDebut == null || dateFin == null) {
                throw new RuntimeException(
                        "Vous devez fournir dateDebut et dateFin lors de la première confirmation.");
            }
            validateDates(dateDebut, dateFin);
            existing.setDateDebut(dateDebut);
            existing.setDateFin(dateFin);
        }
        // Second confirmer: dates are already locked — ignore any supplied values.

        // ── Store signature ───────────────────────────────────────────────────
        if (signature != null && !signature.isBlank()) {
            if ("ROLE_USER".equals(role)) {
                existing.setSignatureUser(signature);
            } else if ("ROLE_PARTNER".equals(role)) {
                existing.setSignaturePartenaire(signature);
            }
        }

        // ── Mark confirmation ─────────────────────────────────────────────────
        if ("ROLE_USER".equals(role)) {
            existing.setConfirmeParUser(true);
        } else if ("ROLE_PARTNER".equals(role)) {
            existing.setConfirmeParPartenaire(true);
        }

        // ── Activate if both have confirmed ───────────────────────────────────
        if (Boolean.TRUE.equals(existing.getConfirmeParUser())
                && Boolean.TRUE.equals(existing.getConfirmeParPartenaire())) {
            existing.setStatut(StatutConvention.ACTIVE);
            existing.setSignedAt(LocalDate.now());
            existing.setModifieParRole(null);
        } else {
            existing.setStatut(StatutConvention.SIGNED);
        }

        return mapper.toResponse(repository.save(existing));
    }

    // ── UPDATE ────────────────────────────────────────────────────────────────
    // Dates remain optional here too; they are proposed as part of negotiation
    // and finalized only at confirmation.

    public ConventionResponse update(Integer id, ConventionRequest request, String role) {
        Convention existing = findById(id);
        // Only update dates if the requester explicitly sends them
        if (request.getDateDebut() != null) existing.setDateDebut(request.getDateDebut());
        if (request.getDateFin()   != null) existing.setDateFin(request.getDateFin());
        resetConfirmations(existing, role);
        return mapper.toResponse(repository.save(existing));
    }

    // ── RESET CONFIRMATIONS ───────────────────────────────────────────────────

    public ConventionResponse resetConfirmationsAfterObjectifChange(Integer conventionId, String role) {
        Convention existing = findById(conventionId);
        resetConfirmations(existing, role);
        return mapper.toResponse(repository.save(existing));
    }

    private void resetConfirmations(Convention c, String role) {
        c.setConfirmeParUser(false);
        c.setConfirmeParPartenaire(false);
        c.setStatut(StatutConvention.DRAFT);
        c.setModifieParRole(role);
    }

    // ── STATUT ────────────────────────────────────────────────────────────────

    public ConventionResponse updateStatut(Integer id, StatutConvention statut) {
        Convention existing = findById(id);
        existing.setStatut(statut);
        if (statut == StatutConvention.SIGNED && existing.getSignedAt() == null) {
            existing.setSignedAt(LocalDate.now());
        }
        return mapper.toResponse(repository.save(existing));
    }

    // ── RENEWAL ───────────────────────────────────────────────────────────────

    public ConventionResponse demanderRenouvellement(Integer id,
                                                     String requestingRole,
                                                     Integer requestingUserId) {
        Convention existing = findById(id);
        checkIsParty(existing, requestingRole, requestingUserId);

        if (existing.getStatut() != StatutConvention.ACTIVE) {
            throw new RuntimeException("Renewal can only be requested for ACTIVE conventions");
        }
        if (existing.getRenouvellementDemandeParRole() != null) {
            throw new RuntimeException("A renewal request already exists for this convention");
        }

        existing.setRenouvellementDemandeParRole(requestingRole);
        return mapper.toResponse(repository.save(existing));
    }

    public ConventionResponse accepterRenouvellement(Integer id,
                                                     ConventionRequest newTerms,
                                                     String requestingRole,
                                                     Integer requestingUserId) {
        Convention existing = findById(id);
        String requesterRole = existing.getRenouvellementDemandeParRole();

        if (requesterRole == null) {
            throw new RuntimeException("No renewal has been requested for this convention");
        }
        if (!"ROLE_ADMIN".equals(requestingRole)) {
            checkIsParty(existing, requestingRole, requestingUserId);
            if (requesterRole.equals(requestingRole)) {
                throw new RuntimeException("You cannot accept your own renewal request");
            }
        }

        existing.setStatut(StatutConvention.EXPIRED);
        existing.setRenouvellementDemandeParRole(null);
        repository.save(existing);

        return create(newTerms, requestingRole);
    }

    // ── DELETE ────────────────────────────────────────────────────────────────

    public void delete(Integer id, String requestingRole, Integer requestingUserId) {
        Convention existing = findById(id);
        if (!"ROLE_ADMIN".equals(requestingRole)) {
            checkIsParty(existing, requestingRole, requestingUserId);
        }
        repository.deleteById(id);
    }

    // ── ANNULER ───────────────────────────────────────────────────────────────

    public ConventionResponse annuler(Integer id, String role, Integer requestingUserId) {
        Convention existing = findById(id);
        checkIsParty(existing, role, requestingUserId);

        if (existing.getStatut() == StatutConvention.EXPIRED) {
            throw new RuntimeException("Convention déjà expirée.");
        }

        existing.setStatut(StatutConvention.EXPIRED);
        return mapper.toResponse(repository.save(existing));
    }

    // ── SECURITY ──────────────────────────────────────────────────────────────

    public void checkIsParty(Convention convention, String role, Integer requestingUserId) {
        if ("ROLE_ADMIN".equals(role)) return;

        boolean isUser = convention.getUserId().equals(requestingUserId);

        boolean isPartner = false;
        if ("ROLE_PARTNER".equals(role)) {
            try {
                OrganisationPartenaire myOrg = orgService.findByUserId(requestingUserId);
                isPartner = myOrg.getId().equals(convention.getOrganisationPartenaire().getId());
            } catch (Exception ignored) {}
        }

        if (!isUser && !isPartner) {
            throw new RuntimeException("Access denied: you are not a party of this convention");
        }
    }

    public void checkOwnership(Integer conventionId, String role, Integer requestingUserId) {
        checkIsParty(findById(conventionId), role, requestingUserId);
    }

    public Convention findById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Convention not found with id: " + id));
    }

    public void markAsCompleted(Integer id) {
        Convention existing = findById(id);
        existing.setStatut(StatutConvention.COMPLETED);
        repository.save(existing);
    }

    // ── DATE VALIDATION (only called at confirmation time) ────────────────────

    private void validateDates(LocalDate dateDebut, LocalDate dateFin) {
        LocalDate tomorrow = LocalDate.now().plusDays(1);

        if (dateDebut.isBefore(tomorrow)) {
            throw new RuntimeException(
                    "La date de début doit être au minimum demain (" + tomorrow + ").");
        }
        // dateFin must be AT LEAST 3 months after dateDebut (inclusive)
        LocalDate minDateFin = dateDebut.plusMonths(3);
        if (dateFin.isBefore(minDateFin)) {
            throw new RuntimeException(
                    "La date de fin doit être au minimum 3 mois après la date de début (au plus tôt le "
                            + minDateFin + ").");
        }
    }
}