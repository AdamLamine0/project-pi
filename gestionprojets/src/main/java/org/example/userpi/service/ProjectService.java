package org.example.userpi.service;

import org.example.userpi.dto.CreateProjectRequest;
import org.example.userpi.dto.CreateRoadmapStepRequest;
import org.example.userpi.dto.ProjectDocumentResponse;
import org.example.userpi.dto.ProjectResponse;
import org.example.userpi.dto.UpdateProjectRequest;
import org.example.userpi.model.Project;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ProjectService {
    
    // CRUD Operations
    ProjectResponse createProject(CreateProjectRequest request, String userId);
    
    Optional<ProjectResponse> getProjectById(String projectId);
    
    List<ProjectResponse> getAllProjects();
    
    ProjectResponse updateProject(String projectId, UpdateProjectRequest request, String userId);
    
    void deleteProject(String projectId, String userId);
    
    // Filter Operations
    List<ProjectResponse> getProjectsByManager(String managerId);
    
    List<ProjectResponse> getProjectsByMember(String userId);
    
    List<ProjectResponse> getProjectsByStatus(String statut);
    
    List<ProjectResponse> getProjectsByPriority(String priorite);
    
    List<ProjectResponse> getProjectsByCategory(String categorie);
    
    List<ProjectResponse> getProjectsInDateRange(LocalDate startDate, LocalDate endDate);
    
    List<ProjectResponse> searchProjects(String titre);
    
    // Roadmap Operations
    ProjectResponse addRoadmapStep(String projectId, CreateRoadmapStepRequest request, String userId);
    
    ProjectResponse updateRoadmapStepStatus(String projectId, String stepId, String newStatus, String userId);
    
    ProjectResponse deleteRoadmapStep(String projectId, String stepId, String userId);
    
    // Progress Calculation
    Double calculateProjectProgress(String projectId);
    
    // Generate AI Roadmap
    ProjectResponse generateAiRoadmap(String projectId, String userId);

    // Project Documents
    ProjectResponse addProjectDocument(String projectId, MultipartFile file, String type, String title, String userId);

    ProjectResponse deleteProjectDocument(String projectId, String documentId, String userId);

    Resource downloadProjectDocument(String projectId, String documentId);

    ProjectDocumentResponse getProjectDocumentMetadata(String projectId, String documentId);
}
