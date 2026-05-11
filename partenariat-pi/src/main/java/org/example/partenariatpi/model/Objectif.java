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

    @ManyToOne
    @JoinColumn(name = "convention_id", nullable = false)
    private Convention convention;

    private String titre;
    private String description;

    @Enumerated(EnumType.STRING)
    private ResponsableObjectif responsable;

    // dateEcheance REMOVED — objectifs have no deadline,
    // the convention's dateFin is the only temporal boundary.

    @Enumerated(EnumType.STRING)
    private StatutObjectif statut = StatutObjectif.IN_PROGRESS;

    private String commentaire;
    private LocalDate dateCreation;
}