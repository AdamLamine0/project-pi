package org.example.partenariatpi.dto;

import lombok.Data;
import org.example.partenariatpi.enums.ResponsableObjectif;
import org.example.partenariatpi.enums.StatutObjectif;
import java.time.LocalDate;

@Data
public class ObjectifResponse {
    private Integer id;
    private Integer conventionId;
    private String titre;
    private String description;
    private ResponsableObjectif responsable;
    private LocalDate dateEcheance;
    private StatutObjectif statut;
    private String commentaire;
    private LocalDate dateCreation;
}