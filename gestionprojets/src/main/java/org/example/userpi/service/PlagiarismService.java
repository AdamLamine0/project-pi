package org.example.userpi.service;

import lombok.RequiredArgsConstructor;
import org.example.userpi.model.Project;
import org.example.userpi.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Plagiarism Detection Service.
 * Compares a new project's title + description against all existing projects
 * using Jaccard similarity on tokenized text.
 * Threshold: similarity > 0.55 → FLAGGED; > 0.75 → REJECTED.
 */
@Service
@RequiredArgsConstructor
public class PlagiarismService {

    private final ProjectRepository projectRepository;

    public record PlagiarismResult(
            String status,           // CLEAR, FLAGGED, REJECTED
            double similarityScore,  // 0.0 – 1.0
            String details           // human-readable explanation
    ) {}

    public PlagiarismResult check(Project incoming) {
        String incomingText = buildText(incoming.getTitre(), incoming.getDescription());
        Set<String> incomingTokens = tokenize(incomingText);

        List<Project> existingProjects = projectRepository.findAll().stream()
                .filter(p -> !p.getId().equals(incoming.getId()))
                .collect(Collectors.toList());

        double maxSimilarity = 0.0;
        String mostSimilarTitle = null;

        for (Project existing : existingProjects) {
            String existingText = buildText(existing.getTitre(), existing.getDescription());
            Set<String> existingTokens = tokenize(existingText);
            double similarity = jaccard(incomingTokens, existingTokens);
            if (similarity > maxSimilarity) {
                maxSimilarity = similarity;
                mostSimilarTitle = existing.getTitre();
            }
        }

        double score = Math.round(maxSimilarity * 100.0) / 100.0;

        if (maxSimilarity >= 0.75) {
            return new PlagiarismResult(
                    "REJECTED",
                    score,
                    String.format("Project is %.0f%% similar to an existing project: \"%s\". Submission rejected due to high similarity.", maxSimilarity * 100, mostSimilarTitle)
            );
        } else if (maxSimilarity >= 0.55) {
            return new PlagiarismResult(
                    "FLAGGED",
                    score,
                    String.format("Project shows %.0f%% similarity with: \"%s\". Please ensure your project is sufficiently differentiated.", maxSimilarity * 100, mostSimilarTitle)
            );
        } else {
            return new PlagiarismResult(
                    "CLEAR",
                    score,
                    "No significant similarity detected with existing projects."
            );
        }
    }

    private String buildText(String titre, String description) {
        return ((titre == null ? "" : titre) + " " + (description == null ? "" : description)).toLowerCase();
    }

    private Set<String> tokenize(String text) {
        if (text == null || text.isBlank()) return Collections.emptySet();
        // Remove punctuation and split on whitespace; filter stopwords and short tokens
        Set<String> stopwords = Set.of("the", "a", "an", "is", "in", "of", "to", "for", "and", "or",
                "with", "that", "this", "it", "on", "at", "by", "be", "as", "from", "de", "la", "le",
                "les", "du", "un", "une", "des", "et", "en", "pour", "avec", "sur", "dans", "par", "qui");
        return Arrays.stream(text.replaceAll("[^a-z0-9\\s]", " ").split("\\s+"))
                .filter(t -> t.length() >= 3)
                .filter(t -> !stopwords.contains(t))
                .collect(Collectors.toSet());
    }

    private double jaccard(Set<String> a, Set<String> b) {
        if (a.isEmpty() && b.isEmpty()) return 0.0;
        Set<String> intersection = new HashSet<>(a);
        intersection.retainAll(b);
        Set<String> union = new HashSet<>(a);
        union.addAll(b);
        return union.isEmpty() ? 0.0 : (double) intersection.size() / union.size();
    }
}
