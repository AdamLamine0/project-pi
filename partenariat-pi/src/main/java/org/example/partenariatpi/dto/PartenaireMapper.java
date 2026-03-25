package org.example.partenariatpi.dto;

import org.example.partenariatpi.model.Partenaire;
import org.springframework.stereotype.Component;

@Component
public class PartenaireMapper {

    // Request DTO → Entity (for create/update)
    public Partenaire toEntity(PartenaireRequest request) {
        Partenaire p = new Partenaire();
        p.setNom(request.getNom());
        p.setType(request.getType());
        p.setContact(request.getContact());
        p.setSiteWeb(request.getSiteWeb());
        return p;
    }

    // Entity → Response DTO (for returning to client)
    public PartenaireResponse toResponse(Partenaire p) {
        PartenaireResponse response = new PartenaireResponse();
        response.setId(p.getId());
        response.setNom(p.getNom());
        response.setType(p.getType());
        response.setContact(p.getContact());
        response.setSiteWeb(p.getSiteWeb());
        response.setUserIds(p.getUserIds());
        return response;
    }
}