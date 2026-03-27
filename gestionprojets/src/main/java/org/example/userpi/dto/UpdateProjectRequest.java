package org.example.userpi.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProjectRequest {
    
    private String titre;
    private String description;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private Double budget;
    private String statut;
    private List<String> memberIds;
    private String priorite;
    private String categorie;
}
