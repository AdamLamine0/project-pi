package org.example.partenariatpi.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
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

    @NotNull(message = "Date debut is required")
    private LocalDate dateDebut;

    @NotNull(message = "Date fin is required")
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

    // Ajouter après confirmeParPartenaire :
    @Column(columnDefinition = "TEXT")
    private String signatureUser;

    @Column(columnDefinition = "TEXT")
    private String signaturePartenaire;

    // ── Renewal ───────────────────────────────────────────────────────────────
    // null           → no renewal pending
    // "ROLE_USER"    → entrepreneur requested → PARTNER must accept
    // "ROLE_PARTNER" → institution requested → USER must accept
    @Column(name = "renouvellement_demande_par_role")
    private String renouvellementDemandeParRole;

    // NEW: tracks who last modified (so the OTHER party must re-confirm)
    @Column(name = "modifie_par_role")
    private String modifieParRole;   // "ROLE_USER" | "ROLE_PARTNER" | null

    // NEW: tracks confirmations
    private Boolean confirmeParUser      = false;
    private Boolean confirmeParPartenaire = false;}

