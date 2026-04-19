package org.example.partenariatpi.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.example.partenariatpi.enums.TypePartenaire;

@Data
public class OrganisationPartenaireRequest {

    @NotBlank(message = "Nom is required")
    private String nom;

    @NotNull(message = "Type is required")
    private TypePartenaire type;

    private String description;
    private String siteWeb;

    @NotBlank(message = "Contact name is required")
    private String contactNom;

    @Email(message = "Invalid contact email")
    @NotBlank(message = "Contact email is required")
    private String contactEmail;

    private String region;

    // Optional at creation — admin can assign later via PUT /{id}/assign-user/{userId}
    private Integer userId;
}