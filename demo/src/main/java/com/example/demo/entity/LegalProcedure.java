package com.example.demo.entity;

import com.example.demo.enums.ProcedureStatus;
import com.example.demo.enums.ProcedureType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "legal_procedures")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LegalProcedure {

    @Id
    @GeneratedValue
    @UuidGenerator
    private UUID id;

    // Récupéré automatiquement depuis X-User-Id header (jamais saisi)
    @Column(name = "entrepreneur_id", nullable = false)
    private UUID entrepreneurId;

    // Choisi depuis liste statique (utilisateurs avec role EXPERT)
    @Column(name = "expert_id")
    private UUID expertId;

    @Column(name = "project_name", nullable = false)
    private String projectName;

    @Enumerated(EnumType.STRING)
    @Column(name = "procedure_type", nullable = false, length = 50)
    private ProcedureType procedureType;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private ProcedureStatus status;

    // Remarque ajoutée par l'IA ou l'expert (optionnelle)
    @Column(columnDefinition = "TEXT")
    private String remark;

    @Column(name = "completion_rate", nullable = false)
    private Float completionRate;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "submitted_at")
    private LocalDateTime submittedAt;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    @OneToMany(mappedBy = "procedure", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<LegalDocument> documents = new ArrayList<>();

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        if (this.status == null) {
            this.status = ProcedureStatus.BROUILLON;
        }
        if (this.completionRate == null) {
            this.completionRate = 0F;
        }
    }
}