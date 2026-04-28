package com.pi.gestionprojets.ml.service;

import com.pi.gestionprojets.ml.dto.GeneratedDocumentDTO;
import com.pi.gestionprojets.model.GeneratedDocument;
import com.pi.gestionprojets.model.Project;
import com.pi.gestionprojets.repository.GeneratedDocumentRepository;
import com.pi.gestionprojets.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GeneratedDocumentService {

    @Autowired
    private GeneratedDocumentRepository documentRepository;

    @Autowired
    private ProjectRepository projectRepository;

    public List<GeneratedDocumentDTO> getDocumentsByProject(Long projectId) {
        return documentRepository.findByProjectId(projectId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public GeneratedDocumentDTO saveDocument(GeneratedDocumentDTO dto) {
        Project project = projectRepository.findById(dto.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + dto.getProjectId()));

        GeneratedDocument document = new GeneratedDocument();
        document.setProject(project);
        document.setTitle(dto.getTitle());
        document.setType(dto.getType());
        document.setContent(dto.getContent());
        document.setFileName(dto.getFileName());
        document.setFilePath(dto.getFilePath());

        GeneratedDocument saved = documentRepository.save(document);
        return convertToDTO(saved);
    }

    public GeneratedDocumentDTO updateDocument(Long id, GeneratedDocumentDTO dto) {
        GeneratedDocument existing = documentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Document not found with id: " + id));

        existing.setTitle(dto.getTitle());
        existing.setContent(dto.getContent());
        existing.setFileName(dto.getFileName());
        existing.setFilePath(dto.getFilePath());

        GeneratedDocument updated = documentRepository.save(existing);
        return convertToDTO(updated);
    }

    public void deleteDocument(Long id) {
        documentRepository.deleteById(id);
    }

    private GeneratedDocumentDTO convertToDTO(GeneratedDocument entity) {
        GeneratedDocumentDTO dto = new GeneratedDocumentDTO();
        dto.setId(entity.getId());
        dto.setProjectId(entity.getProject().getId());
        dto.setTitle(entity.getTitle());
        dto.setType(entity.getType());
        dto.setContent(entity.getContent());
        dto.setFileName(entity.getFileName());
        dto.setFilePath(entity.getFilePath());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());
        return dto;
    }
}
