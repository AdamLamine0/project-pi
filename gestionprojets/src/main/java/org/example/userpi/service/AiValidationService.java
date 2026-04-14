package org.example.userpi.service;

import org.example.userpi.model.Project;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

/**
 * AI Validation Service — validates project field consistency and logical correctness.
 * Returns a structured result with status and human-readable reasons.
 */
@Service
public class AiValidationService {

    public record ValidationResult(String status, List<String> reasons) {}

    /**
     * Validates a project's fields for logical consistency.
     * @return ValidationResult with status VALID or INVALID and list of issues
     */
    public ValidationResult validate(Project project) {
        List<String> issues = new ArrayList<>();

        // Title checks
        if (project.getTitre() == null || project.getTitre().trim().length() < 5) {
            issues.add("Project title must be at least 5 characters long.");
        }
        if (project.getTitre() != null && project.getTitre().trim().length() > 200) {
            issues.add("Project title must not exceed 200 characters.");
        }

        // Description checks
        if (project.getDescription() == null || project.getDescription().trim().length() < 20) {
            issues.add("Project description must be at least 20 characters long to be meaningful.");
        }

        // Date checks
        if (project.getDateDebut() == null) {
            issues.add("Start date is required.");
        }
        if (project.getDateFin() == null) {
            issues.add("End date is required.");
        }
        if (project.getDateDebut() != null && project.getDateFin() != null) {
            if (!project.getDateFin().isAfter(project.getDateDebut())) {
                issues.add("End date must be after start date.");
            }
            long days = ChronoUnit.DAYS.between(project.getDateDebut(), project.getDateFin());
            if (days < 7) {
                issues.add("Project duration must be at least 7 days.");
            }
            if (days > 3650) {
                issues.add("Project duration cannot exceed 10 years — please verify the dates.");
            }
        }

        // Budget checks
        if (project.getBudget() == null || project.getBudget() <= 0) {
            issues.add("Budget must be a positive value.");
        }
        if (project.getBudget() != null && project.getBudget() > 100_000_000) {
            issues.add("Budget exceeds the maximum allowed value (100,000,000). Please verify.");
        }

        // Manager
        if (project.getManagerId() == null || project.getManagerId().isBlank()) {
            issues.add("A manager ID is required.");
        }

        // Priority
        List<String> validPriorities = List.of("LOW", "MEDIUM", "HIGH", "CRITICAL");
        if (project.getPriorite() == null || !validPriorities.contains(project.getPriorite().toUpperCase())) {
            issues.add("Priority must be one of: LOW, MEDIUM, HIGH, CRITICAL.");
        }

        // Category
        if (project.getCategorie() == null || project.getCategorie().isBlank()) {
            issues.add("Project category is required.");
        }

        // Cross-field: budget vs duration sanity
        if (project.getBudget() != null && project.getDateDebut() != null && project.getDateFin() != null) {
            long months = ChronoUnit.MONTHS.between(project.getDateDebut(), project.getDateFin());
            if (months > 0 && (project.getBudget() / months) < 10) {
                issues.add("Budget per month is extremely low — please verify the budget and project duration make sense together.");
            }
        }

        String status = issues.isEmpty() ? "VALID" : "INVALID";
        return new ValidationResult(status, issues);
    }
}
