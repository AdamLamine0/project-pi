package org.example.userpi.service;

import org.example.userpi.model.Project;
import org.example.userpi.model.RoadmapStep;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Maturity Scoring Service — computes a weighted AI maturity score (0–100)
 * across 5 dimensions. Called automatically on project create/update.
 */
@Service
public class MaturityScoringService {

    public record ScoreBreakdown(
            int innovation,
            int marketViability,
            int team,
            int traction,
            int feasibility,
            int total
    ) {}

    public ScoreBreakdown computeScore(Project project) {
        List<RoadmapStep> steps = project.getRoadmapSteps() != null ? project.getRoadmapSteps() : List.of();
        int totalSteps = steps.size();
        long doneSteps = steps.stream().filter(s -> "DONE".equalsIgnoreCase(s.getStatut())).count();
        long inProgressSteps = steps.stream().filter(s -> "IN_PROGRESS".equalsIgnoreCase(s.getStatut())).count();
        double progressPct = totalSteps > 0 ? (doneSteps * 100.0 / totalSteps) : (project.getProgressPercentage() != null ? project.getProgressPercentage() : 0);

        String priority = project.getPriorite() != null ? project.getPriorite().toUpperCase() : "MEDIUM";
        String desc = project.getDescription() != null ? project.getDescription() : "";
        String category = project.getCategorie() != null ? project.getCategorie() : "";
        double budget = project.getBudget() != null ? project.getBudget() : 0;
        int memberCount = project.getMemberIds() != null ? project.getMemberIds().size() : 0;
        int docCount = project.getDocuments() != null ? project.getDocuments().size() : 0;

        // Innovation: priority + description richness + doc diversity
        int innovation = clamp((int) (
                30
                + (priority.equals("HIGH") || priority.equals("CRITICAL") ? 20 : priority.equals("MEDIUM") ? 8 : 3)
                + Math.min(desc.length() / 10, 30)
                + Math.min(docCount * 5, 15)
        ), 0, 100);

        // Market Viability: category set + budget adequacy + progress
        int marketViability = clamp((int) (
                15
                + (category.isBlank() ? 0 : 15)
                + Math.min(budget / 2000, 25)
                + progressPct * 0.4
        ), 0, 100);

        // Team: member count + manager assigned
        int team = clamp(
                20
                + Math.min(memberCount * 15, 55)
                + (project.getManagerId() != null && !project.getManagerId().isBlank() ? 15 : 0),
                0, 100
        );

        // Traction: roadmap execution + in-progress momentum
        int traction = clamp((int) (progressPct * 0.85 + inProgressSteps * 5), 0, 100);

        // Feasibility: valid dates + budget ratio + roadmap exists
        boolean validDates = project.getDateDebut() != null && project.getDateFin() != null
                && project.getDateFin().isAfter(project.getDateDebut());
        int feasibility = clamp(
                (validDates ? 50 : 15)
                + (int) Math.min(budget / 5000, 30)
                + (totalSteps > 0 ? 15 : 0),
                0, 100
        );

        // Weighted total
        int total = (int) Math.round(
                innovation * 0.25
                + marketViability * 0.30
                + team * 0.20
                + traction * 0.15
                + feasibility * 0.10
        );

        return new ScoreBreakdown(innovation, marketViability, team, traction, feasibility, total);
    }

    private int clamp(int value, int min, int max) {
        return Math.max(min, Math.min(max, value));
    }
}
