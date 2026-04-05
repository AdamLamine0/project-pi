package org.example.partenariatpi.dto;

import lombok.RequiredArgsConstructor;
import org.example.partenariatpi.model.Convention;
import org.example.partenariatpi.model.OrganisationPartenaire;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ConventionMapper {

    private final ObjectifMapper objectifMapper;

    public Convention toEntity(ConventionRequest request,
                               OrganisationPartenaire organisationPartenaire) {
        Convention c = new Convention();
        c.setUserId(request.getUserId());
        c.setOrganisationPartenaire(organisationPartenaire);
        c.setDateDebut(request.getDateDebut());
        c.setDateFin(request.getDateFin());
        // objectifs are NOT set here — added separately via POST /api/objectifs
        return c;
    }

    public ConventionResponse toResponse(Convention c) {
        ConventionResponse r = new ConventionResponse();
        r.setId(c.getId());
        r.setNumeroConvention(c.getNumeroConvention());
        r.setUserId(c.getUserId());
        r.setOrganisationPartenaireId(c.getOrganisationPartenaire().getId());
        r.setOrganisationPartenaireNom(c.getOrganisationPartenaire().getNom());
        r.setDateDebut(c.getDateDebut());
        r.setDateFin(c.getDateFin());
        r.setStatut(c.getStatut());
        r.setDocumentUrl(c.getDocumentUrl());
        r.setSignedAt(c.getSignedAt());
        r.setRenouvellementDemandeParRole(c.getRenouvellementDemandeParRole());
        r.setConfirmeParUser(c.getConfirmeParUser());
        r.setConfirmeParPartenaire(c.getConfirmeParPartenaire());
        r.setModifieParRole(c.getModifieParRole());
        // Map objectifs list — guard against null (new convention has empty list)
        List<ObjectifResponse> objectifResponses =
                c.getObjectifs() == null
                        ? Collections.emptyList()
                        : c.getObjectifs().stream()
                        .map(objectifMapper::toResponse)
                        .toList();
        r.setObjectifs(objectifResponses);
        r.setSignatureUser(c.getSignatureUser());
        r.setSignaturePartenaire(c.getSignaturePartenaire());
        return r;
    }
}