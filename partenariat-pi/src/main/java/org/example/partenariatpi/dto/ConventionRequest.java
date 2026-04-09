package org.example.partenariatpi.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDate;

@Data
public class ConventionRequest {

    @NotNull(message = "OrganisationPartenaire is required")
    private Integer organisationPartenaireId;

    @NotNull(message = "User required")
    private Integer userId;

    @NotNull(message = "Date debut is required")
    private LocalDate dateDebut;

    @NotNull(message = "Date fin is required")
    private LocalDate dateFin;

    // Set by the controller (not sent by client — server-side only)
    private String modifieParRole;
}