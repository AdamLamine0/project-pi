package com.projectmentor.communityservice.marketplace.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "opportunities")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Opportunity {

    @Id
    private String id;

    private String publisherId;

    private OpportunityType type;       // EMPLOI / STAGE / PARTENARIAT / FREELANCE

    private String title;

    private String description;

    @Builder.Default
    private List<String> skillsRequired = new ArrayList<>();

    private String sector;

    private String location;

    private OpportunityStatus status;   // OPEN / IN_PROGRESS / CLOSED / EXPIRED

    private int viewsCount;

    private int applicationsCount;

    private LocalDateTime expiresAt;

    private LocalDateTime createdAt;

    private boolean deleted;            // soft delete
}