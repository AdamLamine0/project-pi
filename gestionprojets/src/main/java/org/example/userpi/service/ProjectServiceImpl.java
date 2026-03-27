package org.example.userpi.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.userpi.dto.*;
import org.example.userpi.model.Project;
import org.example.userpi.model.RoadmapStep;
import org.example.userpi.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    @Override
    public ProjectResponse createProject(CreateProjectRequest request, String userId) {
        log.info("Creating new project: {}", request.getTitre());
        
        Project project = new Project();
        project.setTitre(request.getTitre());
        project.setDescription(request.getDescription());
        project.setDateDebut(request.getDateDebut());
        project.setDateFin(request.getDateFin());
        project.setBudget(request.getBudget());
        project.setStatut("NOT_STARTED");
        project.setManagerId(request.getManagerId());
        project.setMemberIds(new ArrayList<>(request.getMemberIds()));
        project.setPriorite(request.getPriorite());
        project.setCategorie(request.getCategorie());
        project.setProgressPercentage(0.0);
        project.setDateCreation(LocalDateTime.now());
        project.setDateModification(LocalDateTime.now());
        
        Project savedProject = projectRepository.save(project);
        log.info("Project created with ID: {}", savedProject.getId());
        
        return mapToResponse(savedProject);
    }

    @Override
    public Optional<ProjectResponse> getProjectById(String projectId) {
        log.info("Fetching project with ID: {}", projectId);
        return projectRepository.findById(projectId).map(this::mapToResponse);
    }

    @Override
    public List<ProjectResponse> getAllProjects() {
        log.info("Fetching all projects");
        return projectRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ProjectResponse updateProject(String projectId, UpdateProjectRequest request, String userId) {
        log.info("Updating project with ID: {}", projectId);
        
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        
        // Update fields if provided
        if (request.getTitre() != null) project.setTitre(request.getTitre());
        if (request.getDescription() != null) project.setDescription(request.getDescription());
        if (request.getDateDebut() != null) project.setDateDebut(request.getDateDebut());
        if (request.getDateFin() != null) project.setDateFin(request.getDateFin());
        if (request.getBudget() != null) project.setBudget(request.getBudget());
        if (request.getStatut() != null) project.setStatut(request.getStatut());
        if (request.getMemberIds() != null) project.setMemberIds(request.getMemberIds());
        if (request.getPriorite() != null) project.setPriorite(request.getPriorite());
        if (request.getCategorie() != null) project.setCategorie(request.getCategorie());
        
        project.setDateModification(LocalDateTime.now());
        
        Project updatedProject = projectRepository.save(project);
        log.info("Project updated successfully");
        
        return mapToResponse(updatedProject);
    }

    @Override
    public void deleteProject(String projectId, String userId) {
        log.info("Deleting project with ID: {}", projectId);
        
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        
        projectRepository.delete(project);
        log.info("Project deleted successfully");
    }

    @Override
    public List<ProjectResponse> getProjectsByManager(String managerId) {
        log.info("Fetching projects managed by: {}", managerId);
        return projectRepository.findByManagerId(managerId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProjectResponse> getProjectsByMember(String userId) {
        log.info("Fetching projects for member: {}", userId);
        return projectRepository.findByMemberIdsContaining(userId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProjectResponse> getProjectsByStatus(String statut) {
        log.info("Fetching projects with status: {}", statut);
        return projectRepository.findByStatut(statut).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProjectResponse> getProjectsByPriority(String priorite) {
        log.info("Fetching projects with priority: {}", priorite);
        return projectRepository.findByPriorite(priorite).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProjectResponse> getProjectsByCategory(String categorie) {
        log.info("Fetching projects in category: {}", categorie);
        return projectRepository.findByCategorie(categorie).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProjectResponse> getProjectsInDateRange(LocalDate startDate, LocalDate endDate) {
        log.info("Fetching projects between {} and {}", startDate, endDate);
        return projectRepository.findProjectsInDateRange(startDate, endDate).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProjectResponse> searchProjects(String titre) {
        log.info("Searching projects with title: {}", titre);
        return projectRepository.searchByTitle(titre).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ProjectResponse addRoadmapStep(String projectId, CreateRoadmapStepRequest request, String userId) {
        log.info("Adding roadmap step to project: {}", projectId);
        
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        
        RoadmapStep step = new RoadmapStep();
        step.setId(UUID.randomUUID().toString());
        step.setTitre(request.getTitre());
        step.setDescription(request.getDescription());
        step.setStatut(request.getStatut());
        step.setOrdre(request.getOrdre());
        step.setParent(request.getParent());
        step.setDateCreation(LocalDateTime.now());
        step.setDateModification(LocalDateTime.now());
        step.setCreePar(userId);
        
        project.getRoadmapSteps().add(step);
        project.setDateModification(LocalDateTime.now());
        
        Project updatedProject = projectRepository.save(project);
        log.info("Roadmap step added successfully");
        
        return mapToResponse(updatedProject);
    }

    @Override
    public ProjectResponse updateRoadmapStepStatus(String projectId, String stepId, String newStatus, String userId) {
        log.info("Updating roadmap step {} status to: {}", stepId, newStatus);
        
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        
        RoadmapStep step = project.getRoadmapSteps().stream()
                .filter(s -> s.getId().equals(stepId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Roadmap step not found"));
        
        step.setStatut(newStatus);
        step.setDateModification(LocalDateTime.now());
        project.setDateModification(LocalDateTime.now());
        
        // Recalculate progress
        project.setProgressPercentage(calculateProjectProgress(projectId));
        
        Project updatedProject = projectRepository.save(project);
        log.info("Roadmap step status updated successfully");
        
        return mapToResponse(updatedProject);
    }

    @Override
    public ProjectResponse deleteRoadmapStep(String projectId, String stepId, String userId) {
        log.info("Deleting roadmap step {} from project: {}", stepId, projectId);
        
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        
        project.getRoadmapSteps().removeIf(s -> s.getId().equals(stepId));
        project.setDateModification(LocalDateTime.now());
        
        Project updatedProject = projectRepository.save(project);
        log.info("Roadmap step deleted successfully");
        
        return mapToResponse(updatedProject);
    }

    @Override
    public Double calculateProjectProgress(String projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        
        if (project.getRoadmapSteps().isEmpty()) {
            return 0.0;
        }
        
        long completedSteps = project.getRoadmapSteps().stream()
                .filter(s -> "DONE".equals(s.getStatut()))
                .count();
        
        double progress = (completedSteps * 100.0) / project.getRoadmapSteps().size();
        return Math.round(progress * 100.0) / 100.0; // Round to 2 decimal places
    }

    @Override
    public ProjectResponse generateAiRoadmap(String projectId, String userId) {
        log.info("Generating AI roadmap for project: {}", projectId);
        
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        
        // Generate basic roadmap structure based on project dates
        project.getRoadmapSteps().clear();
        
        LocalDate start = project.getDateDebut();
        LocalDate end = project.getDateFin();
        long daysBetween = java.time.temporal.ChronoUnit.DAYS.between(start, end);
        
        // Generate 4 main phases based on project duration
        String[] phases = {"Planning & Analysis", "Development & Implementation", 
                          "Testing & QA", "Deployment & Launch"};
        
        for (int i = 0; i < phases.length; i++) {
            RoadmapStep step = new RoadmapStep();
            step.setId(UUID.randomUUID().toString());
            step.setTitre(phases[i]);
            step.setDescription("Phase " + (i + 1) + ": " + phases[i]);
            step.setStatut("PENDING");
            step.setOrdre(i + 1);
            step.setDateCreation(LocalDateTime.now());
            step.setDateModification(LocalDateTime.now());
            step.setCreePar(userId);
            
            project.getRoadmapSteps().add(step);
        }
        
        project.setDateModification(LocalDateTime.now());
        project.setProgressPercentage(0.0);
        
        Project updatedProject = projectRepository.save(project);
        log.info("AI roadmap generated successfully with {} steps", updatedProject.getRoadmapSteps().size());
        
        return mapToResponse(updatedProject);
    }

    // Helper method to map Project to ProjectResponse
    private ProjectResponse mapToResponse(Project project) {
        ProjectResponse response = new ProjectResponse();
        response.setId(project.getId());
        response.setTitre(project.getTitre());
        response.setDescription(project.getDescription());
        response.setDateDebut(project.getDateDebut());
        response.setDateFin(project.getDateFin());
        response.setBudget(project.getBudget());
        response.setStatut(project.getStatut());
        response.setManagerId(project.getManagerId());
        response.setManagerName(project.getManagerName());
        response.setMemberIds(project.getMemberIds());
        response.setRoadmapSteps(project.getRoadmapSteps().stream()
                .map(this::mapRoadmapStepToResponse)
                .collect(Collectors.toList()));
        response.setDateCreation(project.getDateCreation());
        response.setDateModification(project.getDateModification());
        response.setPriorite(project.getPriorite());
        response.setCategorie(project.getCategorie());
        response.setProgressPercentage(project.getProgressPercentage());
        return response;
    }

    private RoadmapStepResponse mapRoadmapStepToResponse(RoadmapStep step) {
        RoadmapStepResponse response = new RoadmapStepResponse();
        response.setId(step.getId());
        response.setTitre(step.getTitre());
        response.setDescription(step.getDescription());
        response.setStatut(step.getStatut());
        response.setOrdre(step.getOrdre());
        response.setParent(step.getParent());
        response.setDateCreation(step.getDateCreation());
        response.setDateModification(step.getDateModification());
        response.setCreePar(step.getCreePar());
        return response;
    }
}
