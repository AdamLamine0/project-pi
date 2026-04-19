package org.example.eventpi.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.example.eventpi.model.EventType;
import org.example.eventpi.model.LocationType;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class EventRequest {

    @NotBlank(message = "Le titre est obligatoire")
    private String title;

    private String description;

    @NotNull(message = "Le type est obligatoire")
    private EventType type;

    private LocalDateTime startDate;

    private LocationType locationType;

    private Integer capacityMax;

    private String coverImageUrl;

    private List<String> targetSector;

    private List<String> targetStage;
}