package org.example.partenariatpi.dto;

import lombok.Data;
import org.example.partenariatpi.enums.StatutConvention;
import java.time.LocalDate;
import java.util.List;

@Data
public class ConventionResponse {

    private Integer id;
    private String numeroConvention;

    // Both parties
    private Integer userId;
    private Integer organisationPartenaireId;
    private String organisationPartenaireNom;

    private LocalDate dateDebut;
    private LocalDate dateFin;

    // All objectifs of this convention embedded in the response
    private List<ObjectifResponse> objectifs;

    private StatutConvention statut;
    private String documentUrl;
    private LocalDate signedAt;

    // null           → no renewal requested
    // "ROLE_USER"    → entrepreneur requested, waiting for PARTNER to accept
    // "ROLE_PARTNER" → institution requested, waiting for USER to accept
    private String renouvellementDemandeParRole;
}