package org.example.partenariatpi.dto;

import org.example.partenariatpi.model.OrganisationPartenaire;
import org.springframework.stereotype.Component;

@Component
public class OrganisationPartenaireMapper {

    public OrganisationPartenaire toEntity(OrganisationPartenaireRequest request) {
        OrganisationPartenaire o = new OrganisationPartenaire();
        o.setNom(request.getNom());
        o.setType(request.getType());
        o.setDescription(request.getDescription());
        o.setSiteWeb(request.getSiteWeb());
        o.setContactNom(request.getContactNom());
        o.setContactEmail(request.getContactEmail());
        o.setRegion(request.getRegion());
        o.setUserId(request.getUserId());
        return o;
    }

    public OrganisationPartenaireResponse toResponse(OrganisationPartenaire o) {
        OrganisationPartenaireResponse r = new OrganisationPartenaireResponse();
        r.setId(o.getId());
        r.setNom(o.getNom());
        r.setType(o.getType());
        r.setDescription(o.getDescription());
        r.setSiteWeb(o.getSiteWeb());
        r.setContactNom(o.getContactNom());
        r.setContactEmail(o.getContactEmail());
        r.setRegion(o.getRegion());
        r.setUserId(o.getUserId());
        r.setStatut(o.getStatut());
        return r;
    }
}