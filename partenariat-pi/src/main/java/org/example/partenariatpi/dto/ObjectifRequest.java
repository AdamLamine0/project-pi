package org.example.partenariatpi.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.example.partenariatpi.enums.ResponsableObjectif;
import java.time.LocalDate;

@Data
public class ObjectifRequest {

    // Must exist before creating objectif — convention is created first
    @NotNull(message = "Convention ID is required")
    private Integer conventionId;

    @NotBlank(message = "Titre is required")
    private String titre;

    private String description;

    @NotNull(message = "Responsable is required")
    private ResponsableObjectif responsable;

    private LocalDate dateEcheance;
    private String commentaire;
}