package org.example.partenariatpi.dto;

import lombok.Data;
import org.example.partenariatpi.enums.StatutPartenaire;
import org.example.partenariatpi.enums.TypePartenaire;

@Data
public class OrganisationPartenaireResponse {
    private Integer id;
    private String nom;
    private TypePartenaire type;
    private String description;
    private String siteWeb;
    private String contactNom;
    private String contactEmail;
    private String region;
    private Integer userId;
    private StatutPartenaire statut;
}