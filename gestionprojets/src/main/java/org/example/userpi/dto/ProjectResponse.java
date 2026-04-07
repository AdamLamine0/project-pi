package org.example.userpi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectResponse {
    private String id;
    private String titre;
    private String description;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private Double budget;
    private String statut;
    private String managerId;
    private String managerName;
    private List<String> memberIds;
    private List<RoadmapStepResponse> roadmapSteps;
    private List<ProjectDocumentResponse> documents;
    private LocalDateTime dateCreation;
    private LocalDateTime dateModification;
    private String priorite;
    private String categorie;
    private Double progressPercentage;
}
