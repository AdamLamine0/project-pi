package org.example.eventpi.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SuccessPredictionResponse {

    @JsonProperty("success_score")
    private Double successScore;

    @JsonProperty("label")
    private String label;
}
