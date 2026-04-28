package com.pi.gestionprojets.service;

import com.pi.gestionprojets.model.Project;
import com.pi.gestionprojets.model.ProjectPriority;
import com.pi.gestionprojets.model.ProjectStatus;
import com.pi.gestionprojets.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Optional<Project> getProjectById(Long id) {
        return projectRepository.findById(id);
    }

    public Project createProject(Project project) {
        // Set required defaults if not provided
        if (project.getStatus() == null) {
            project.setStatus(ProjectStatus.BROUILLON);
        }
        if (project.getPriority() == null) {
            project.setPriority(ProjectPriority.NORMALE);
        }
        if (project.getStartDate() == null) {
            project.setStartDate(LocalDateTime.now());
        }
        if (project.getEndDate() == null) {
            project.setEndDate(LocalDateTime.now().plusMonths(6));
        }
        if (project.getLeaderId() == null) {
            project.setLeaderId(0L);
        }
        if (project.getCreatedBy() == null) {
            project.setCreatedBy(0L);
        }
        return projectRepository.save(project);
    }

    public Project updateProject(Long id, Project projectDetails) {
        Optional<Project> project = projectRepository.findById(id);
        if (project.isPresent()) {
            Project existingProject = project.get();
            existingProject.setTitle(projectDetails.getTitle());
            existingProject.setSector(projectDetails.getSector());
            existingProject.setStage(projectDetails.getStage());
            existingProject.setShortDescription(projectDetails.getShortDescription());
            existingProject.setProblemSolved(projectDetails.getProblemSolved());
            existingProject.setRevenueModel(projectDetails.getRevenueModel());
            existingProject.setTeamSize(projectDetails.getTeamSize());
            existingProject.setHasPitchDeck(projectDetails.getHasPitchDeck());
            existingProject.setHasBusinessPlan(projectDetails.getHasBusinessPlan());
            existingProject.setDescription(projectDetails.getDescription());
            existingProject.setStatus(projectDetails.getStatus());
            existingProject.setPriority(projectDetails.getPriority());
            existingProject.setStartDate(projectDetails.getStartDate());
            existingProject.setEndDate(projectDetails.getEndDate());
            existingProject.setBudget(projectDetails.getBudget());
            existingProject.setLeaderId(projectDetails.getLeaderId());
            existingProject.setProgress(projectDetails.getProgress());
            return projectRepository.save(existingProject);
        }
        return null;
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }

    public List<Project> getProjectsByStatus(ProjectStatus status) {
        return projectRepository.findByStatus(status);
    }

    public List<Project> getProjectsByLeaderId(Long leaderId) {
        return projectRepository.findByLeaderId(leaderId);
    }

    public List<Project> searchProjects(String title) {
        return projectRepository.findByTitleContainingIgnoreCase(title);
    }
}

