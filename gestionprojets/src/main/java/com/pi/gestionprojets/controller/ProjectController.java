package com.pi.gestionprojets.controller;

import com.pi.gestionprojets.model.Project;
import com.pi.gestionprojets.model.ProjectStatus;
import com.pi.gestionprojets.ml.service.MlClientService;
import com.pi.gestionprojets.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    
    @Autowired
    private ProjectService projectService;

    @Autowired
    private MlClientService mlClientService;
    
    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {
        return ResponseEntity.ok(projectService.getAllProjects());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        Optional<Project> project = projectService.getProjectById(id);
        return project.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(projectService.createProject(project));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable Long id, 
                                                  @RequestBody Project projectDetails) {
        Project updatedProject = projectService.updateProject(id, projectDetails);
        if (updatedProject != null) {
            return ResponseEntity.ok(updatedProject);
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Project>> getProjectsByStatus(@PathVariable ProjectStatus status) {
        return ResponseEntity.ok(projectService.getProjectsByStatus(status));
    }
    
    @GetMapping("/leader/{leaderId}")
    public ResponseEntity<List<Project>> getProjectsByLeaderId(@PathVariable Long leaderId) {
        return ResponseEntity.ok(projectService.getProjectsByLeaderId(leaderId));
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Project>> searchProjects(@RequestParam String title) {
        return ResponseEntity.ok(projectService.searchProjects(title));
    }

    @PostMapping("/{id}/score")
    public ResponseEntity<?> scoreProject(@PathVariable Long id) {
        Optional<Project> project = projectService.getProjectById(id);
        return project.map(value -> ResponseEntity.ok(mlClientService.scoreProject(id, value)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/roadmap")
    public ResponseEntity<?> generateRoadmap(@PathVariable Long id, @RequestBody(required = false) Map<String, Object> payload) {
        Optional<Project> project = projectService.getProjectById(id);
        if (project.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        String feedback = payload == null ? null : String.valueOf(payload.getOrDefault("feedback", ""));
        return ResponseEntity.ok(mlClientService.generateRoadmap(id, project.get(), feedback));
    }

    @PostMapping("/{id}/plagiarism")
    public ResponseEntity<?> analyzePlagiarism(@PathVariable Long id, @RequestBody(required = false) Map<String, Object> payload) {
        Optional<Project> project = projectService.getProjectById(id);
        if (project.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        List<String> documentTexts = payload == null ? List.of() : extractStringList(payload.get("documentTexts"));
        List<String> webSources = payload == null ? List.of() : extractStringList(payload.get("webSources"));
        String descriptionHash = project.get().getDescription() == null ? "" : String.valueOf(project.get().getDescription().hashCode());
        return ResponseEntity.ok(mlClientService.analyzePlagiarism(id, project.get(), documentTexts, webSources, descriptionHash));
    }

    @PostMapping("/analyze-description")
    public ResponseEntity<?> analyzeDescription(@RequestBody Map<String, Object> payload) {
        Object projectIdValue = payload.get("projectId");
        if (projectIdValue == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "projectId est requis"));
        }
        Long projectId = Long.valueOf(String.valueOf(projectIdValue));
        Optional<Project> project = projectService.getProjectById(projectId);
        return project.map(value -> ResponseEntity.ok(mlClientService.analyzeDescription(projectId, value)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/recommendations")
    public ResponseEntity<?> recommendations(@PathVariable Long id) {
        Optional<Project> project = projectService.getProjectById(id);
        return project.map(value -> ResponseEntity.ok(mlClientService.recommendations(id, value)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/entrepreneur-playground")
    public ResponseEntity<?> entrepreneurPlayground(@PathVariable Long id, @RequestBody(required = false) Map<String, Object> payload) {
        Optional<Project> project = projectService.getProjectById(id);
        if (project.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(mlClientService.entrepreneurPlayground(id, project.get(), payload == null ? Map.of() : payload));
    }

    private List<String> extractStringList(Object value) {
        if (value instanceof List<?> list) {
            return list.stream().map(String::valueOf).toList();
        }
        return List.of();
    }
}
