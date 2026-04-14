package org.example.userpi.service;

import org.example.userpi.model.Project;
import org.springframework.stereotype.Service;

/**
 * Progress Calculation Service.
 * Computes project progress as a weighted combination of:
 *   - Roadmap step completion (70%)
 *   - Documents uploaded (30%, capped at 5 docs = 100%)
 */
@Service
public class ProgressCalculationService {

    private static final int MAX_DOCS_FOR_FULL_SCORE = 5;
    private static final double ROADMAP_WEIGHT = 0.70;
    private static final double DOCS_WEIGHT = 0.30;

    public double calculate(Project project) {
        double roadmapProgress = calculateRoadmapProgress(project);
        double docsProgress = calculateDocsProgress(project);

        double weighted = (roadmapProgress * ROADMAP_WEIGHT) + (docsProgress * DOCS_WEIGHT);
        return Math.round(weighted * 100.0) / 100.0;
    }

    private double calculateRoadmapProgress(Project project) {
        if (project.getRoadmapSteps() == null || project.getRoadmapSteps().isEmpty()) {
            return 0.0;
        }
        long done = project.getRoadmapSteps().stream()
                .filter(s -> "DONE".equalsIgnoreCase(s.getStatut()))
                .count();
        return (done * 100.0) / project.getRoadmapSteps().size();
    }

    private double calculateDocsProgress(Project project) {
        if (project.getDocuments() == null || project.getDocuments().isEmpty()) {
            return 0.0;
        }
        int docCount = Math.min(project.getDocuments().size(), MAX_DOCS_FOR_FULL_SCORE);
        return (docCount * 100.0) / MAX_DOCS_FOR_FULL_SCORE;
    }
}
