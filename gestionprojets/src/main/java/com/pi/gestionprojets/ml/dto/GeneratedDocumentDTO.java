package com.pi.gestionprojets.ml.dto;

import com.pi.gestionprojets.model.DocumentType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GeneratedDocumentDTO {
    private Long id;
    private Long projectId;
    private String title;
    private DocumentType type;
    private String content;
    private String fileName;
    private String filePath;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
