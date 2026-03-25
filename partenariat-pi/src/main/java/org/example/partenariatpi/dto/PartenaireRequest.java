package org.example.partenariatpi.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class PartenaireRequest {

    @NotBlank(message = "Nom is required")
    private String nom;

    @NotBlank(message = "Type is required")
    private String type;

    private String contact;
    private String siteWeb;
}