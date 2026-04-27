package org.example.eventpi.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegistrationPredictionResponse {

    @JsonProperty("predicted_registrations")
    private Integer predictedRegistrations;
}
