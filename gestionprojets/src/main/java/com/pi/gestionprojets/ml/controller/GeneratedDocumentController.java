package com.pi.gestionprojets.ml.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pi.gestionprojets.ml.dto.GeneratedDocumentDTO;
import com.pi.gestionprojets.ml.service.GeneratedDocumentService;
import com.pi.gestionprojets.ml.service.MlClientService;
import com.pi.gestionprojets.model.DocumentType;
import com.pi.gestionprojets.model.Project;
import com.pi.gestionprojets.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/documents")
public class GeneratedDocumentController {

    @Autowired
    private GeneratedDocumentService documentService;

    @Autowired
    private MlClientService mlClientService;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<GeneratedDocumentDTO>> getDocumentsByProject(@PathVariable Long projectId) {
        return ResponseEntity.ok(documentService.getDocumentsByProject(projectId));
    }

    @PostMapping
    public ResponseEntity<GeneratedDocumentDTO> saveDocument(@RequestBody GeneratedDocumentDTO dto) {
        return ResponseEntity.ok(documentService.saveDocument(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<GeneratedDocumentDTO> updateDocument(@PathVariable Long id, @RequestBody GeneratedDocumentDTO dto) {
        return ResponseEntity.ok(documentService.updateDocument(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDocument(@PathVariable Long id) {
        documentService.deleteDocument(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/project/{projectId}/generate/bmc")
    public ResponseEntity<GeneratedDocumentDTO> generateBmc(@PathVariable Long projectId) {
        Project project = projectService.getProjectById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        Map<String, Object> result = mlClientService.generateBmc(projectId, project);

        GeneratedDocumentDTO dto = new GeneratedDocumentDTO();
        dto.setProjectId(projectId);
        dto.setTitle("Business Model Canvas - " + project.getTitle());
        dto.setType(DocumentType.BUSINESS_MODEL_CANVAS);
        try {
            dto.setContent(objectMapper.writeValueAsString(result.get("bmc")));
        } catch (Exception e) {
            dto.setContent(String.valueOf(result.get("bmc")));
        }

        return ResponseEntity.ok(documentService.saveDocument(dto));
    }

    @PostMapping("/project/{projectId}/generate/swot")
    public ResponseEntity<GeneratedDocumentDTO> generateSwot(@PathVariable Long projectId, @RequestParam(required = false) String marketContext) {
        Project project = projectService.getProjectById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        Map<String, Object> result = mlClientService.generateSwot(projectId, project, marketContext);

        GeneratedDocumentDTO dto = new GeneratedDocumentDTO();
        dto.setProjectId(projectId);
        dto.setTitle("SWOT Analysis - " + project.getTitle());
        dto.setType(DocumentType.SWOT_ANALYSIS);
        try {
            dto.setContent(objectMapper.writeValueAsString(result.get("swot")));
        } catch (Exception e) {
            dto.setContent(String.valueOf(result.get("swot")));
        }

        return ResponseEntity.ok(documentService.saveDocument(dto));
    }

    @PostMapping("/project/{projectId}/generate/pitch")
    public ResponseEntity<GeneratedDocumentDTO> generatePitch(@PathVariable Long projectId, @RequestParam(required = false) String targetMarket) {
        Project project = projectService.getProjectById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        Map<String, Object> result = mlClientService.generatePitchDeck(projectId, project, targetMarket);

        GeneratedDocumentDTO dto = new GeneratedDocumentDTO();
        dto.setProjectId(projectId);
        dto.setTitle("Pitch Deck - " + project.getTitle());
        dto.setType(DocumentType.PITCH_DECK);
        try {
            dto.setContent(objectMapper.writeValueAsString(result.get("pitch")));
        } catch (Exception e) {
            dto.setContent(String.valueOf(result.get("pitch")));
        }

        return ResponseEntity.ok(documentService.saveDocument(dto));
    }
}
