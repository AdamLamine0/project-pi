package org.example.userpi.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.userpi.dto.*;
import org.example.userpi.model.Project;
import org.example.userpi.model.ProjectDocument;
import org.example.userpi.model.RoadmapStep;
import org.example.userpi.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final AiValidationService aiValidationService;
    private final PlagiarismService plagiarismService;
    private final MaturityScoringService maturityScoringService;
    private final RoadmapGeneratorService roadmapGeneratorService;
    private final ProgressCalculationService progressCalculationService;
    private final AdaptiveRoadmapService adaptiveRoadmapService;

    @Value("${app.upload.dir:uploads}")
    private String uploadDir;

    // ─── CRUD ──────────────────────────────────────────────────────────────────

    @Override
    public ProjectResponse createProject(CreateProjectRequest request, String userId) {
        log.info("Creating project: {}", request.getTitre());

        Project project = new Project();
        project.setId(UUID.randomUUID().toString());
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

        // ── AI Pipeline ────────────────────────────────────────────────────────

        // 1. Validate
        AiValidationService.ValidationResult validation = aiValidationService.validate(project);
        project.setAiValidationStatus(validation.status());
        if ("INVALID".equals(validation.status())) {
            throw new RuntimeException("AI Validation failed: " + String.join("; ", validation.reasons()));
        }

        // 2. Save first so plagiarism can query DB (new project won't be compared to itself)
        Project saved = projectRepository.save(project);

        // 3. Plagiarism check
        PlagiarismService.PlagiarismResult plagiarism = plagiarismService.check(saved);
        saved.setPlagiarismStatus(plagiarism.status());
        saved.setPlagiarismSimilarityScore(plagiarism.similarityScore());
        saved.setPlagiarismDetails(plagiarism.details());
        if ("REJECTED".equals(plagiarism.status())) {
            projectRepository.delete(saved);
            throw new RuntimeException("Plagiarism detected: " + plagiarism.details());
        }

        // 4. Generate roadmap
        List<RoadmapStep> generatedSteps = roadmapGeneratorService.generate(saved, userId);
        saved.setRoadmapSteps(generatedSteps);

        // 5. Compute maturity score
        MaturityScoringService.ScoreBreakdown scoreBreakdown = maturityScoringService.computeScore(saved);
        saved.setAiScore((double) scoreBreakdown.total());

        // 6. Compute progress
        double progress = progressCalculationService.calculate(saved);
        saved.setProgressPercentage(progress);

        saved.setDateModification(LocalDateTime.now());
        Project finalProject = projectRepository.save(saved);
        log.info("Project created with AI score: {}, plagiarism: {}", scoreBreakdown.total(), plagiarism.status());

        return mapToResponse(finalProject);
    }

    @Override
    public Optional<ProjectResponse> getProjectById(String projectId) {
        return projectRepository.findById(projectId).map(this::mapToResponse);
    }

    @Override
    public List<ProjectResponse> getAllProjects() {
        return projectRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ProjectResponse updateProject(String projectId, UpdateProjectRequest request, String userId) {
        log.info("Updating project: {}", projectId);

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

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

        // Re-score on update
        MaturityScoringService.ScoreBreakdown score = maturityScoringService.computeScore(project);
        project.setAiScore((double) score.total());

        // Recalculate progress
        double progress = progressCalculationService.calculate(project);
        project.setProgressPercentage(progress);

        return mapToResponse(projectRepository.save(project));
    }

    @Override
    public void deleteProject(String projectId, String userId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        projectRepository.delete(project);
    }

    // ─── Filter Queries ─────────────────────────────────────────────────────────

    @Override
    public List<ProjectResponse> getProjectsByManager(String managerId) {
        return projectRepository.findByManagerId(managerId).stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public List<ProjectResponse> getProjectsByMember(String userId) {
        return projectRepository.findByMemberIdsContaining(userId).stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public List<ProjectResponse> getProjectsByStatus(String statut) {
        return projectRepository.findByStatut(statut).stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public List<ProjectResponse> getProjectsByPriority(String priorite) {
        return projectRepository.findByPriorite(priorite).stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public List<ProjectResponse> getProjectsByCategory(String categorie) {
        return projectRepository.findByCategorie(categorie).stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public List<ProjectResponse> getProjectsInDateRange(LocalDate startDate, LocalDate endDate) {
        return projectRepository.findProjectsInDateRange(startDate, endDate).stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public List<ProjectResponse> searchProjects(String titre) {
        return projectRepository.searchByTitle(titre).stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    // ─── Roadmap ─────────────────────────────────────────────────────────────

    @Override
    public ProjectResponse addRoadmapStep(String projectId, CreateRoadmapStepRequest request, String userId) {
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

        // Recalculate
        project.setAiScore((double) maturityScoringService.computeScore(project).total());
        project.setProgressPercentage(progressCalculationService.calculate(project));

        return mapToResponse(projectRepository.save(project));
    }

    @Override
    public ProjectResponse updateRoadmapStepStatus(String projectId, String stepId, String newStatus, String userId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        RoadmapStep step = project.getRoadmapSteps().stream()
                .filter(s -> s.getId().equals(stepId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Roadmap step not found"));

        step.setStatut(newStatus);
        step.setDateModification(LocalDateTime.now());
        project.setDateModification(LocalDateTime.now());

        // Recalculate progress & score
        project.setProgressPercentage(progressCalculationService.calculate(project));
        project.setAiScore((double) maturityScoringService.computeScore(project).total());

        return mapToResponse(projectRepository.save(project));
    }

    @Override
    public ProjectResponse deleteRoadmapStep(String projectId, String stepId, String userId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        project.getRoadmapSteps().removeIf(s -> s.getId().equals(stepId));
        project.setDateModification(LocalDateTime.now());
        project.setProgressPercentage(progressCalculationService.calculate(project));

        return mapToResponse(projectRepository.save(project));
    }

    @Override
    public ProjectResponse generateAiRoadmap(String projectId, String userId) {
        log.info("Generating AI roadmap for project: {}", projectId);

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        project.getRoadmapSteps().clear();
        List<RoadmapStep> steps = roadmapGeneratorService.generate(project, userId);
        project.setRoadmapSteps(steps);
        project.setDateModification(LocalDateTime.now());

        // Recalculate score & progress
        project.setAiScore((double) maturityScoringService.computeScore(project).total());
        project.setProgressPercentage(progressCalculationService.calculate(project));

        return mapToResponse(projectRepository.save(project));
    }

    @Override
    public Double calculateProjectProgress(String projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        return progressCalculationService.calculate(project);
    }

    // ─── Documents ────────────────────────────────────────────────────────────

    @Override
    public ProjectResponse addProjectDocument(String projectId, MultipartFile file, String type, String title, String userId) {
        if (file == null || file.isEmpty()) {
            throw new RuntimeException("Document file is required");
        }

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        String originalName = file.getOriginalFilename() == null ? "document" : file.getOriginalFilename();
        String cleanName = originalName.replaceAll("[^a-zA-Z0-9._-]", "_");
        String storedFileName = UUID.randomUUID() + "_" + cleanName;

        try {
            Path projectUploadDir = Paths.get(uploadDir, "projects", projectId).toAbsolutePath().normalize();
            Files.createDirectories(projectUploadDir);
            Path targetPath = projectUploadDir.resolve(storedFileName);
            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

            ProjectDocument document = new ProjectDocument();
            document.setId(UUID.randomUUID().toString());
            document.setType(type == null || type.isBlank() ? "OTHER" : type);
            document.setTitle(title == null || title.isBlank() ? cleanName : title);
            document.setFileName(cleanName);
            document.setFilePath(targetPath.toString());
            document.setUploadedAt(LocalDateTime.now());
            document.setUploadedBy(userId);

            project.getDocuments().add(document);
            project.setDateModification(LocalDateTime.now());

            // ── Adaptive Roadmap ─────────────────────────────────────────────
            adaptiveRoadmapService.adapt(project, document, userId);

            // ── Recalculate score & progress ─────────────────────────────────
            project.setAiScore((double) maturityScoringService.computeScore(project).total());
            project.setProgressPercentage(progressCalculationService.calculate(project));

            return mapToResponse(projectRepository.save(project));
        } catch (IOException ex) {
            throw new RuntimeException("Could not store document", ex);
        }
    }

    @Override
    public ProjectResponse deleteProjectDocument(String projectId, String documentId, String userId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        ProjectDocument document = project.getDocuments().stream()
                .filter(d -> d.getId().equals(documentId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Document not found"));

        if (document.getFilePath() != null && !document.getFilePath().isBlank()) {
            try {
                Files.deleteIfExists(Paths.get(document.getFilePath()));
            } catch (IOException ex) {
                log.warn("Could not delete file from disk: {}", document.getFilePath());
            }
        }

        project.getDocuments().removeIf(d -> d.getId().equals(documentId));
        project.setDateModification(LocalDateTime.now());
        project.setProgressPercentage(progressCalculationService.calculate(project));
        project.setAiScore((double) maturityScoringService.computeScore(project).total());

        return mapToResponse(projectRepository.save(project));
    }

    @Override
    public Resource downloadProjectDocument(String projectId, String documentId) {
        ProjectDocumentResponse metadata = getProjectDocumentMetadata(projectId, documentId);
        try {
            Path filePath = Paths.get(metadata.getFilePath()).toAbsolutePath().normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (!resource.exists() || !resource.isReadable()) {
                throw new RuntimeException("File not found or not readable");
            }
            return resource;
        } catch (MalformedURLException ex) {
            throw new RuntimeException("Invalid file path", ex);
        }
    }

    @Override
    public ProjectDocumentResponse getProjectDocumentMetadata(String projectId, String documentId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        ProjectDocument document = project.getDocuments().stream()
                .filter(d -> d.getId().equals(documentId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Document not found"));

        return mapDocumentToResponse(document);
    }

    // ─── Mapping ──────────────────────────────────────────────────────────────

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
                .sorted(Comparator.comparingInt(RoadmapStep::getOrdre))
                .map(this::mapRoadmapStepToResponse)
                .collect(Collectors.toList()));
        response.setDocuments(project.getDocuments().stream()
                .map(this::mapDocumentToResponse)
                .collect(Collectors.toList()));
        response.setDateCreation(project.getDateCreation());
        response.setDateModification(project.getDateModification());
        response.setPriorite(project.getPriorite());
        response.setCategorie(project.getCategorie());
        response.setProgressPercentage(project.getProgressPercentage());
        // AI fields
        response.setAiScore(project.getAiScore());
        response.setAiValidationStatus(project.getAiValidationStatus());
        response.setPlagiarismStatus(project.getPlagiarismStatus());
        response.setPlagiarismSimilarityScore(project.getPlagiarismSimilarityScore());
        response.setPlagiarismDetails(project.getPlagiarismDetails());
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

    private ProjectDocumentResponse mapDocumentToResponse(ProjectDocument document) {
        ProjectDocumentResponse response = new ProjectDocumentResponse();
        response.setId(document.getId());
        response.setType(document.getType());
        response.setTitle(document.getTitle());
        response.setFileName(document.getFileName());
        response.setFilePath(document.getFilePath());
        response.setUploadedAt(document.getUploadedAt());
        response.setUploadedBy(document.getUploadedBy());
        return response;
    }
}
