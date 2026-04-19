package org.example.eventpi.dto;

import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class SpeakerResponse {
    private Long id;
    private String fullName;
    private String title;
    private String company;
    private String bio;
    private String photoUrl;
    private String linkedinUrl;
    private List<Long> eventIds;
}