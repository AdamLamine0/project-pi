package org.example.partenariatpi.model;

import jakarta.persistence.*;
import lombok.*;
import org.example.partenariatpi.enums.ResponsableObjectif;
import org.example.partenariatpi.enums.StatutObjectif;

import java.time.LocalDate;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Objectif {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // An Objectif always belongs to one Convention.
    // It is created AFTER the convention exists (needs conventionId).
    @ManyToOne
    @JoinColumn(name = "convention_id", nullable = false)
    private Convention convention;

    // Short title: "Fournir 30 slots PFE par an"
    private String titre;

    // Detailed description of the commitment
    private String description;

    // Who is responsible: USER (entrepreneur), PARTENAIRE (institution), LES_DEUX
    @Enumerated(EnumType.STRING)
    private ResponsableObjectif responsable;

    private LocalDate dateEcheance;

    @Enumerated(EnumType.STRING)
    private StatutObjectif statut = StatutObjectif.EN_COURS;

    // Optional note when closing or blocking an objectif
    private String commentaire;

    private LocalDate dateCreation;
}