package org.example.userpi.service;

import lombok.RequiredArgsConstructor;
import org.example.userpi.model.Project;
import org.example.userpi.model.ProjectDocument;
import org.example.userpi.model.RoadmapStep;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

/**
 * Adaptive Roadmap Service — when a document is uploaded, re-evaluates the project roadmap
 * and may append new steps or update descriptions based on document type.
 */
@Service
@RequiredArgsConstructor
public class AdaptiveRoadmapService {

    public void adapt(Project project, ProjectDocument newDocument, String userId) {
        if (project.getRoadmapSteps() == null || project.getRoadmapSteps().isEmpty()) {
            return; // No roadmap to adapt yet
        }

        String docType = newDocument.getType() != null ? newDocument.getType().toUpperCase() : "OTHER";

        // Determine if an adaptation step should be added
        String stepTitle = null;
        String stepDescription = null;

        switch (docType) {
            case "BMC" -> {
                boolean hasBmcStep = project.getRoadmapSteps().stream()
                        .anyMatch(s -> s.getTitre().toLowerCase().contains("market") || s.getTitre().toLowerCase().contains("bmc"));
                if (!hasBmcStep) {
                    stepTitle = "Market Validation (BMC Review)";
                    stepDescription = "Review and validate the Business Model Canvas uploaded. Identify gaps in value proposition, customer segments, and revenue streams. Update the roadmap accordingly.";
                }
            }
            case "BUDGET" -> {
                boolean hasBudgetStep = project.getRoadmapSteps().stream()
                        .anyMatch(s -> s.getTitre().toLowerCase().contains("budget") || s.getTitre().toLowerCase().contains("financial"));
                if (!hasBudgetStep) {
                    stepTitle = "Financial Planning Review";
                    stepDescription = "Review uploaded budget document. Validate cost estimations against project milestones. Identify financial risks and adjust resource allocation plan.";
                }
            }
            case "UX_REPORT" -> {
                boolean hasUxStep = project.getRoadmapSteps().stream()
                        .anyMatch(s -> s.getTitre().toLowerCase().contains("ux") || s.getTitre().toLowerCase().contains("user test") || s.getTitre().toLowerCase().contains("design"));
                if (!hasUxStep) {
                    stepTitle = "UX Iteration Based on Report";
                    stepDescription = "Analyze the uploaded UX report. Prioritize usability issues, conduct a design review session, and produce an updated UI prototype addressing top findings.";
                }
            }
            case "SPEC" -> {
                boolean hasSpecStep = project.getRoadmapSteps().stream()
                        .anyMatch(s -> s.getTitre().toLowerCase().contains("spec") || s.getTitre().toLowerCase().contains("requirement"));
                if (!hasSpecStep) {
                    stepTitle = "Requirements Alignment & Spec Review";
                    stepDescription = "Review uploaded specification document with the team. Validate alignment with project scope. Update backlog and technical design to reflect any new requirements.";
                }
            }
            case "REPORT" -> {
                stepTitle = "Progress Review & Course Correction";
                stepDescription = "Review uploaded progress report with stakeholders. Identify deviations from plan. Update roadmap priorities and timelines accordingly.";
            }
            default -> {
                // For OTHER type — add a generic review step if not already present
                long otherDocs = project.getDocuments().stream()
                        .filter(d -> "OTHER".equalsIgnoreCase(d.getType()))
                        .count();
                if (otherDocs == 1) { // Only first "other" doc triggers a step
                    stepTitle = "Document Review & Integration";
                    stepDescription = "Review the newly uploaded document. Assess its impact on the project scope and roadmap. Update deliverables if necessary.";
                }
            }
        }

        if (stepTitle != null) {
            int nextOrdre = project.getRoadmapSteps().stream()
                    .mapToInt(RoadmapStep::getOrdre)
                    .max()
                    .orElse(0) + 1;

            RoadmapStep adaptedStep = new RoadmapStep();
            adaptedStep.setId(UUID.randomUUID().toString());
            adaptedStep.setTitre(stepTitle);
            adaptedStep.setDescription(stepDescription);
            adaptedStep.setStatut("PENDING");
            adaptedStep.setOrdre(nextOrdre);
            adaptedStep.setParent("AI-Adaptive");
            adaptedStep.setDateCreation(LocalDateTime.now());
            adaptedStep.setDateModification(LocalDateTime.now());
            adaptedStep.setCreePar(userId);

            project.getRoadmapSteps().add(adaptedStep);
        }
    }
}
