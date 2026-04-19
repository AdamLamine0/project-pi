package org.example.partenariatpi.model;

import jakarta.persistence.*;
import lombok.*;
import org.example.partenariatpi.enums.StatutPartenaire;
import org.example.partenariatpi.enums.TypePartenaire;

@Entity
@Table(name = "organisation_partenaire")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class OrganisationPartenaire {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // Name of the institution: IHEC, Flat6Labs, Ooredoo...
    private String nom;

    @Enumerated(EnumType.STRING)
    private TypePartenaire type;

    private String description;
    private String siteWeb;
    private String contactNom;
    private String contactEmail;
    private String region;

    // Reference to User (Role.PARTNER) in user-pi service.
    // NOT a JPA @ManyToOne — inter-service reference by ID only.
    // This is the person who logs in and manages this institution's dashboard.
    private Integer userId;

    @Enumerated(EnumType.STRING)
    private StatutPartenaire statut = StatutPartenaire.EN_ATTENTE;
}