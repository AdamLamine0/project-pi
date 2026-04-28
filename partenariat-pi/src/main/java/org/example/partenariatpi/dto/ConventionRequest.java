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

    // Dates are now OPTIONAL during creation/update.
    // They become REQUIRED only at confirmation time (sent in the confirmer payload).
    // Both parties negotiate objectifs first, then lock in the dates when they sign.
    private LocalDate dateDebut;
    private LocalDate dateFin;

    // Set by the controller (not sent by client — server-side only)
    private String modifieParRole;
}