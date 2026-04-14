package org.example.userpi.controller;

import lombok.RequiredArgsConstructor;
import org.example.userpi.dto.AiAnalysisResult;
import org.example.userpi.dto.ProjectResponse;
import org.example.userpi.model.Project;
import org.example.userpi.repository.ProjectRepository;
import org.example.userpi.service.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Dedicated controller for AI analysis endpoints.
 * Exposes score, status, and re-analysis triggers.
 */
@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectAiController {

    private final ProjectRepository projectRepository;
    private final AiValidationService aiValidationService;
    private final PlagiarismService plagiarismService;
    private final MaturityScoringService maturityScoringService;
    private final RoadmapGeneratorService roadmapGeneratorService;
    private final ProgressCalculationService progressCalculationService;
    private final ProjectService projectService;

    /**
     * GET /api/projects/{id}/ai/status — returns current AI field values
     */
    @GetMapping("/{id}/ai/status")
    public ResponseEntity<AiAnalysisResult> getAiStatus(@PathVariable String id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found: " + id));

        AiAnalysisResult result = AiAnalysisResult.builder()
                .validationStatus(project.getAiValidationStatus())
                .plagiarismStatus(project.getPlagiarismStatus())
                .plagiarismSimilarityScore(project.getPlagiarismSimilarityScore())
                .plagiarismDetails(project.getPlagiarismDetails())
                .maturityScore(project.getAiScore() != null ? (int) Math.round(project.getAiScore()) : null)
                .build();

        return ResponseEntity.ok(result);
    }

    /**
     * GET /api/projects/{id}/ai/score — returns full score breakdown
     */
    @GetMapping("/{id}/ai/score")
    public ResponseEntity<AiAnalysisResult> getAiScore(@PathVariable String id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found: " + id));

        MaturityScoringService.ScoreBreakdown breakdown = maturityScoringService.computeScore(project);

        AiAnalysisResult result = AiAnalysisResult.builder()
                .validationStatus(project.getAiValidationStatus())
                .plagiarismStatus(project.getPlagiarismStatus())
                .plagiarismSimilarityScore(project.getPlagiarismSimilarityScore())
                .plagiarismDetails(project.getPlagiarismDetails())
                .maturityScore(breakdown.total())
                .innovationScore(breakdown.innovation())
                .marketViabilityScore(breakdown.marketViability())
                .teamScore(breakdown.team())
                .tractionScore(breakdown.traction())
                .feasibilityScore(breakdown.feasibility())
                .build();

        return ResponseEntity.ok(result);
    }

    /**
     * POST /api/projects/{id}/ai/reanalyze — re-runs full AI pipeline and saves results
     */
    @PostMapping("/{id}/ai/reanalyze")
    public ResponseEntity<ProjectResponse> reanalyze(
            @PathVariable String id,
            @RequestHeader("X-User-Id") String userId) {

        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found: " + id));

        // Re-run validation
        AiValidationService.ValidationResult validation = aiValidationService.validate(project);
        project.setAiValidationStatus(validation.status());

        // Re-run plagiarism check
        PlagiarismService.PlagiarismResult plagiarism = plagiarismService.check(project);
        project.setPlagiarismStatus(plagiarism.status());
        project.setPlagiarismSimilarityScore(plagiarism.similarityScore());
        project.setPlagiarismDetails(plagiarism.details());

        // Re-score
        MaturityScoringService.ScoreBreakdown score = maturityScoringService.computeScore(project);
        project.setAiScore((double) score.total());

        // Recalculate progress
        double progress = progressCalculationService.calculate(project);
        project.setProgressPercentage(progress);

        projectRepository.save(project);

        return ResponseEntity.ok(projectService.getAllProjects().stream()
                .filter(r -> r.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Project not found after update")));
    }
}
