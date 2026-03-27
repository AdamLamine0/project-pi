package org.example.userpi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoadmapStepResponse {
    private String id;
    private String titre;
    private String description;
    private String statut;
    private Integer ordre;
    private String parent;
    private LocalDateTime dateCreation;
    private LocalDateTime dateModification;
    private String creePar;
}
