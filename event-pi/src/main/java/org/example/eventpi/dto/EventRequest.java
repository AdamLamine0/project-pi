package org.example.eventpi.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import org.example.eventpi.model.EventType;
import org.example.eventpi.model.LocationType;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class EventRequest {

    @NotBlank(message = "Le titre est obligatoire")
    @Size(min = 3, max = 200, message = "Le titre doit contenir entre 3 et 200 caractères")
    private String title;

    @Size(max = 5000, message = "La description ne peut pas dépasser 5000 caractères")
    private String description;

    @NotNull(message = "Le type est obligatoire")
    private EventType type;

    @NotNull(message = "La date de début est obligatoire")
    @Future(message = "La date de début doit être dans le futur")
    private LocalDateTime startDate;

    // endDate is optional but validated against startDate in the service layer
    private LocalDateTime endDate;

    private LocationType locationType;

    @Size(max = 300, message = "La localisation ne peut pas dépasser 300 caractères")
    private String location;

    @DecimalMin(value = "0.0", message = "Le prix du ticket ne peut pas être négatif")
    private Double ticketPrice;

    @Min(value = 1, message = "La capacité maximale doit être d'au moins 1 personne")
    private Integer capacityMax;

    private String coverImageUrl;

    private List<String> targetSector;

    private List<String> targetStage;

    @Size(max = 500, message = "L'adresse ne peut pas dépasser 500 caractères")
    private String address;

    private Double latitude;

    private Double longitude;
}