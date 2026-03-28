package org.example.partenariatpi.model;

import jakarta.persistence.*;
import lombok.*;
import org.example.partenariatpi.enums.StatutConvention;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Convention {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String numeroConvention;

    // ── The two parties ───────────────────────────────────────────────────────

    // The entrepreneur — inter-service ref (user lives in user-pi)
    private Integer userId;

    // The institution
    @ManyToOne
    @JoinColumn(name = "organisation_partenaire_id", nullable = false)
    private OrganisationPartenaire organisationPartenaire;

    // ── Dates ─────────────────────────────────────────────────────────────────

    private LocalDate dateDebut;
    private LocalDate dateFin;

    // ── Objectifs ─────────────────────────────────────────────────────────────
    // Commitments of both parties. Each Objectif has a 'responsable' field.
    // Created separately via POST /api/objectifs after the convention exists.
    @OneToMany(mappedBy = "convention", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Objectif> objectifs = new ArrayList<>();

    // ── Lifecycle ─────────────────────────────────────────────────────────────

    @Enumerated(EnumType.STRING)
    private StatutConvention statut = StatutConvention.BROUILLON;

    private String documentUrl;

    // Auto-set when statut changes to SIGNEE
    private LocalDate signedAt;

    // ── Renewal ───────────────────────────────────────────────────────────────
    // null           → no renewal pending
    // "ROLE_USER"    → entrepreneur requested → PARTNER must accept
    // "ROLE_PARTNER" → institution requested → USER must accept
    private String renouvellementDemandeParRole;
}