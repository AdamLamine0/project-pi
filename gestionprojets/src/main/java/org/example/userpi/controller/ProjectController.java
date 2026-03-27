package org.example.userpi.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.userpi.dto.*;
import org.example.userpi.service.ProjectService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    // CRUD Operations

    /**
     * Create a new project
     * Requires authentication
     */
    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ProjectResponse> createProject(
            @Valid @RequestBody CreateProjectRequest request,
            @RequestHeader("X-User-Id") String userId) {
        ProjectResponse response = projectService.createProject(request, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Get all projects
     * Requires authentication
     */
    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<ProjectResponse>> getAllProjects() {
        List<ProjectResponse> projects = projectService.getAllProjects();
        return ResponseEntity.ok(projects);
    }

    /**
     * Get project by ID
     * Requires authentication
     */
    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ProjectResponse> getProjectById(@PathVariable String id) {
        return projectService.getProjectById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Update project
     * Only manager can update their own project
     */
    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ProjectResponse> updateProject(
            @PathVariable String id,
            @Valid @RequestBody UpdateProjectRequest request,
            @RequestHeader("X-User-Id") String userId) {
        ProjectResponse response = projectService.updateProject(id, request, userId);
        return ResponseEntity.ok(response);
    }

    /**
     * Delete project
     * Only manager can delete their own project
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> deleteProject(
            @PathVariable String id,
            @RequestHeader("X-User-Id") String userId) {
        projectService.deleteProject(id, userId);
        return ResponseEntity.noContent().build();
    }

    // Filter Operations

    /**
     * Get projects managed by a specific user
     */
    @GetMapping("/manager/{managerId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<ProjectResponse>> getProjectsByManager(@PathVariable String managerId) {
        List<ProjectResponse> projects = projectService.getProjectsByManager(managerId);
        return ResponseEntity.ok(projects);
    }

    /**
     * Get projects where user is a member
     */
    @GetMapping("/member/{userId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<ProjectResponse>> getProjectsByMember(@PathVariable String userId) {
        List<ProjectResponse> projects = projectService.getProjectsByMember(userId);
        return ResponseEntity.ok(projects);
    }

    /**
     * Get projects by status
     */
    @GetMapping("/status/{statut}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<ProjectResponse>> getProjectsByStatus(@PathVariable String statut) {
        List<ProjectResponse> projects = projectService.getProjectsByStatus(statut);
        return ResponseEntity.ok(projects);
    }

    /**
     * Get projects by priority
     */
    @GetMapping("/priority/{priorite}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<ProjectResponse>> getProjectsByPriority(@PathVariable String priorite) {
        List<ProjectResponse> projects = projectService.getProjectsByPriority(priorite);
        return ResponseEntity.ok(projects);
    }

    /**
     * Get projects by category
     */
    @GetMapping("/category/{categorie}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<ProjectResponse>> getProjectsByCategory(@PathVariable String categorie) {
        List<ProjectResponse> projects = projectService.getProjectsByCategory(categorie);
        return ResponseEntity.ok(projects);
    }

    /**
     * Get projects in a date range
     */
    @GetMapping("/date-range")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<ProjectResponse>> getProjectsInDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<ProjectResponse> projects = projectService.getProjectsInDateRange(startDate, endDate);
        return ResponseEntity.ok(projects);
    }

    /**
     * Search projects by title
     */
    @GetMapping("/search")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<ProjectResponse>> searchProjects(@RequestParam String titre) {
        List<ProjectResponse> projects = projectService.searchProjects(titre);
        return ResponseEntity.ok(projects);
    }

    // Roadmap Operations

    /**
     * Add a roadmap step to a project
     */
    @PostMapping("/{projectId}/roadmap-steps")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ProjectResponse> addRoadmapStep(
            @PathVariable String projectId,
            @Valid @RequestBody CreateRoadmapStepRequest request,
            @RequestHeader("X-User-Id") String userId) {
        ProjectResponse response = projectService.addRoadmapStep(projectId, request, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Update roadmap step status
     * Users can mark steps as PENDING, IN_PROGRESS, or DONE
     */
    @PutMapping("/{projectId}/roadmap-steps/{stepId}/status")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ProjectResponse> updateRoadmapStepStatus(
            @PathVariable String projectId,
            @PathVariable String stepId,
            @RequestParam String status,
            @RequestHeader("X-User-Id") String userId) {
        ProjectResponse response = projectService.updateRoadmapStepStatus(projectId, stepId, status, userId);
        return ResponseEntity.ok(response);
    }

    /**
     * Delete a roadmap step
     */
    @DeleteMapping("/{projectId}/roadmap-steps/{stepId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ProjectResponse> deleteRoadmapStep(
            @PathVariable String projectId,
            @PathVariable String stepId,
            @RequestHeader("X-User-Id") String userId) {
        ProjectResponse response = projectService.deleteRoadmapStep(projectId, stepId, userId);
        return ResponseEntity.ok(response);
    }

    /**
     * Generate AI-based roadmap for a project
     * Creates 4 main phases: Planning, Development, Testing, Deployment
     */
    @PostMapping("/{projectId}/generate-roadmap")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ProjectResponse> generateAiRoadmap(
            @PathVariable String projectId,
            @RequestHeader("X-User-Id") String userId) {
        ProjectResponse response = projectService.generateAiRoadmap(projectId, userId);
        return ResponseEntity.ok(response);
    }

    /**
     * Get project progress percentage
     * Based on completed roadmap steps
     */
    @GetMapping("/{projectId}/progress")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Double> getProjectProgress(@PathVariable String projectId) {
        Double progress = projectService.calculateProjectProgress(projectId);
        return ResponseEntity.ok(progress);
    }
}
