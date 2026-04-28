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

    @Column(name = "entrepreneur_id", nullable = false)
    private Integer entrepreneurId;

    @Column(name = "expert_id")
    private Integer expertId;

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

    // Optional note added by AI or the expert.
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

    @Column(name = "final_document_url")
    private String finalDocumentUrl;

    @Column(name = "final_document_generated_at")
    private LocalDateTime finalDocumentGeneratedAt;

    @Column(name = "final_document_template_version")
    private String finalDocumentTemplateVersion;

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
