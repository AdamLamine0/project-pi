package org.example.eventpi.dto;

import lombok.Data;

@Data
public class SpeakerRequest {
    private String fullName;
    private String title;
    private String company;
    private String bio;
    private String photoUrl;
    private String linkedinUrl;
}