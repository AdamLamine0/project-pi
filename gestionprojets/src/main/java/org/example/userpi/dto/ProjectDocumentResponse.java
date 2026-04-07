package org.example.userpi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDocumentResponse {
    private String id;
    private String type;
    private String title;
    private String fileName;
    private String filePath;
    private LocalDateTime uploadedAt;
    private String uploadedBy;
}
