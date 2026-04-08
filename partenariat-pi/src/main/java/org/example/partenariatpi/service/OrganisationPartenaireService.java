package org.example.partenariatpi.service;

import lombok.RequiredArgsConstructor;
import org.example.partenariatpi.dto.OrganisationPartenaireMapper;
import org.example.partenariatpi.dto.OrganisationPartenaireRequest;
import org.example.partenariatpi.dto.OrganisationPartenaireResponse;
import org.example.partenariatpi.feign.UserClient;
import org.example.partenariatpi.model.OrganisationPartenaire;
import org.example.partenariatpi.enums.StatutPartenaire;
import org.example.partenariatpi.repository.OrganisationPartenaireRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrganisationPartenaireService {

    private final OrganisationPartenaireRepository repository;
    private final OrganisationPartenaireMapper mapper;
    private final UserClient userClient;

    // ── READ ──────────────────────────────────────────────────────────────────

    public List<OrganisationPartenaireResponse> getAll() {
        return repository.findAll().stream().map(mapper::toResponse).toList();
    }

    public OrganisationPartenaireResponse getById(Integer id) {
        return mapper.toResponse(findById(id));
    }

    public List<OrganisationPartenaireResponse> getByStatut(StatutPartenaire statut) {
        return repository.findByStatut(statut).stream().map(mapper::toResponse).toList();
    }

    // PARTNER: find their institution by userId from JWT
    public OrganisationPartenaireResponse getMyDashboard(Integer userId) {
        return mapper.toResponse(findByUserId(userId));
    }

    // ── CREATE ────────────────────────────────────────────────────────────────

    public OrganisationPartenaireResponse create(OrganisationPartenaireRequest request) {
        if (request.getUserId() != null) {
            verifyUserExists(request.getUserId());
        }
        return mapper.toResponse(repository.save(mapper.toEntity(request)));
    }

    // ── UPDATE ────────────────────────────────────────────────────────────────

    // ADMIN: update all fields
    public OrganisationPartenaireResponse update(Integer id,
                                                 OrganisationPartenaireRequest request) {
        OrganisationPartenaire existing = findById(id);
        existing.setNom(request.getNom());
        existing.setType(request.getType());
        existing.setDescription(request.getDescription());
        existing.setSiteWeb(request.getSiteWeb());
        existing.setContactNom(request.getContactNom());
        existing.setContactEmail(request.getContactEmail());
        existing.setRegion(request.getRegion());
        existing.setUserId(request.getUserId());
        return mapper.toResponse(repository.save(existing));
    }

    // PARTNER: update only their own contact info
    public OrganisationPartenaireResponse updateContactInfo(
            Integer id,
            OrganisationPartenaireRequest request,
            Integer requestingUserId) {

        OrganisationPartenaire existing = findById(id);

        if (!existing.getUserId().equals(requestingUserId)) {
            throw new RuntimeException(
                    "Access denied: you can only update your own organisation");
        }

        existing.setNom(request.getNom());           // ← add
        existing.setType(request.getType());
        existing.setContactNom(request.getContactNom());
        existing.setContactEmail(request.getContactEmail());
        existing.setSiteWeb(request.getSiteWeb());
        existing.setDescription(request.getDescription()); // ← add if you want description editable too
        existing.setRegion(request.getRegion());
        return mapper.toResponse(repository.save(existing));
    }

    // ADMIN: change statut
    public OrganisationPartenaireResponse updateStatut(Integer id,
                                                       StatutPartenaire statut) {
        OrganisationPartenaire existing = findById(id);
        existing.setStatut(statut);
        return mapper.toResponse(repository.save(existing));
    }

    // ADMIN: assign a User (Role.PARTNER) to this institution
    public OrganisationPartenaireResponse assignUser(Integer orgId, Integer userId) {
        verifyUserExists(userId);
        OrganisationPartenaire existing = findById(orgId);
        existing.setUserId(userId);
        return mapper.toResponse(repository.save(existing));
    }

    // ── DELETE ────────────────────────────────────────────────────────────────

    public void delete(Integer id) {
        findById(id);
        repository.deleteById(id);
    }

    // ── HELPERS ───────────────────────────────────────────────────────────────

    // Used by ConventionService to verify partner ownership
    OrganisationPartenaire findByUserId(Integer userId) {
        return repository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException(
                        "No OrganisationPartenaire found for userId: " + userId));
    }

    // Package-private — reused by ConventionService
    OrganisationPartenaire findById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "OrganisationPartenaire not found with id: " + id));
    }

    private void verifyUserExists(Integer userId) {
        userClient.getUserById(userId);
    }
}