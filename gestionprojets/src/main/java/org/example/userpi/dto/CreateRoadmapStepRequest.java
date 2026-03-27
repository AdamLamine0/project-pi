package org.example.userpi.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateRoadmapStepRequest {
    
    @NotBlank(message = "Title is required")
    private String titre;
    
    @NotBlank(message = "Description is required")
    private String description;
    
    @NotNull(message = "Order is required")
    private Integer ordre;
    
    private String parent; // parent step id if nested
    
    @NotNull(message = "Status is required")
    private String statut; // "PENDING", "IN_PROGRESS", "DONE"
}
