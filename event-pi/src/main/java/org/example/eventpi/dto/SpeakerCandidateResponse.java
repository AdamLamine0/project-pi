package org.example.eventpi.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents a speaker profile fetched from LinkedIn via the RapidAPI proxy.
 * This DTO is used both as the search-result payload returned to the frontend
 * and as the import body sent back when the admin confirms a selection.
 * It is never persisted directly — {@code SpeakerService.importOrReuse()} maps
 * it to a {@link org.example.eventpi.model.Speaker} entity.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class SpeakerCandidateResponse {
    private String fullName;
    private String title;
    private String company;
    private String bio;
    private String photoUrl;
    private String linkedinUrl;
}
