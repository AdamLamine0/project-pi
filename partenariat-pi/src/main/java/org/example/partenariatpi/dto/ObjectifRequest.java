package org.example.partenariatpi.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.example.partenariatpi.enums.ResponsableObjectif;

@Data
public class ObjectifRequest {

    @NotNull(message = "Convention ID is required")
    private Integer conventionId;

    @NotBlank(message = "Titre is required")
    private String titre;

    private String description;

    @NotNull(message = "Responsable is required")
    private ResponsableObjectif responsable;

    // dateEcheance REMOVED — dates belong on the convention, not on individual objectifs.

    private String commentaire;
}