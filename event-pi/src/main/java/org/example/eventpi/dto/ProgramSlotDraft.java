package org.example.eventpi.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Internal-only DTO used to parse the raw JSON array returned by the AI
 * for program generation. Never serialised to HTTP responses.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class ProgramSlotDraft {
    private String title;
    private String description;
    /** One of PRESENTATION | KEYNOTE | WORKSHOP | QA | BREAK (case-insensitive). */
    private String type;
    private Integer durationMinutes;
}
