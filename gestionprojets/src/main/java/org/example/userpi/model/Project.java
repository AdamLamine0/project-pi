package org.example.userpi.model;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "projects")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Project {
    @Id
    private String id;
    
    private String titre;
    private String description;
    
    private LocalDate dateDebut;
    private LocalDate dateFin;
    
    private Double budget;
    private String statut; // "NOT_STARTED", "IN_PROGRESS", "COMPLETED", "ON_HOLD", "CANCELLED"
    
    private String managerId; // reference to User service user id
    private String managerName;

    @ElementCollection
    @CollectionTable(name = "project_members", joinColumns = @JoinColumn(name = "project_id"))
    @Column(name = "member_id")
    private List<String> memberIds = new ArrayList<>(); // list of user IDs from User service

    @ElementCollection
    @CollectionTable(name = "project_roadmap_steps", joinColumns = @JoinColumn(name = "project_id"))
    private List<RoadmapStep> roadmapSteps = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "project_documents", joinColumns = @JoinColumn(name = "project_id"))
    private List<ProjectDocument> documents = new ArrayList<>();

    private LocalDateTime dateCreation;
    private LocalDateTime dateModification;

    private String priorite; // "LOW", "MEDIUM", "HIGH", "CRITICAL"
    private String categorie; // project category/type
    private Double progressPercentage; // calculated based on roadmap steps
}
