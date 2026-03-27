package org.example.userpi.model;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RoadmapStep {
    private String id;
    private String titre;
    private String description;
    private String statut; // "PENDING", "IN_PROGRESS", "DONE"
    private Integer ordre;
    private String parent; // reference to parent step if nested
    private LocalDateTime dateCreation;
    private LocalDateTime dateModification;
    private String creePar; // user id
}
