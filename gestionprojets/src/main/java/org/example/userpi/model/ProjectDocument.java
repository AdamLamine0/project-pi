package org.example.userpi.model;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ProjectDocument {
    private String id;
    private String type;
    private String title;
    private String fileName;
    private String filePath;
    private LocalDateTime uploadedAt;
    private String uploadedBy;
}
