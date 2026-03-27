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
public class CreateProjectRequest {
    
    @NotBlank(message = "Project title is required")
    private String titre;
    
    @NotBlank(message = "Description is required")
    private String description;
    
    @NotNull(message = "Start date is required")
    @FutureOrPresent(message = "Start date must be today or in the future")
    private LocalDate dateDebut;
    
    @NotNull(message = "End date is required")
    private LocalDate dateFin;
    
    @NotNull(message = "Budget is required")
    @Positive(message = "Budget must be greater than 0")
    private Double budget;
    
    @NotBlank(message = "Manager ID is required")
    private String managerId;
    
    @NotNull(message = "Members list is required")
    private List<String> memberIds;
    
    @NotNull(message = "Priority is required")
    private String priorite; // "LOW", "MEDIUM", "HIGH", "CRITICAL"
    
    private String categorie;
}
