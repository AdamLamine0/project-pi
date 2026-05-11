package org.example.partenariatpi.dto;

import org.example.partenariatpi.model.Convention;
import org.example.partenariatpi.model.Objectif;
import org.springframework.stereotype.Component;
import java.time.LocalDate;

@Component
public class ObjectifMapper {

    public Objectif toEntity(ObjectifRequest request, Convention convention) {
        Objectif o = new Objectif();
        o.setConvention(convention);
        o.setTitre(request.getTitre());
        o.setDescription(request.getDescription());
        o.setResponsable(request.getResponsable());
        // dateEcheance no longer mapped
        o.setCommentaire(request.getCommentaire());
        o.setDateCreation(LocalDate.now());
        return o;
    }

    public ObjectifResponse toResponse(Objectif o) {
        ObjectifResponse r = new ObjectifResponse();
        r.setId(o.getId());
        r.setConventionId(o.getConvention().getId());
        r.setTitre(o.getTitre());
        r.setDescription(o.getDescription());
        r.setResponsable(o.getResponsable());
        // dateEcheance no longer mapped
        r.setStatut(o.getStatut());
        r.setCommentaire(o.getCommentaire());
        r.setDateCreation(o.getDateCreation());
        return r;
    }
}