package com.pi.gestionprojets.ml.service;

import com.pi.gestionprojets.ml.config.MlClientProperties;
import com.pi.gestionprojets.ml.dto.MlProjectRequest;
import com.pi.gestionprojets.ml.dto.MlScoreResponse;
import com.pi.gestionprojets.model.Project;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.Duration;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
public class MlClientService {

    private final WebClient mlWebClient;
    private final MlClientProperties properties;

    public MlClientService(WebClient mlWebClient, MlClientProperties properties) {
        this.mlWebClient = mlWebClient;
        this.properties = properties;
    }

    @Cacheable(cacheNames = "projectScores", key = "#projectId")
    public MlScoreResponse scoreProject(Long projectId, Project project) {
        MlProjectRequest request = buildRequest(projectId, project, null, null, null, null, null);
        return postForScore("/api/ml/projects/" + projectId + "/score", request);
    }

    @Cacheable(cacheNames = "projectRoadmaps", key = "#projectId + ':' + #feedback")
    public Map<String, Object> generateRoadmap(Long projectId, Project project, String feedback) {
        MlProjectRequest request = buildRequest(projectId, project, Collections.emptyList(), feedback, null, null, null);
        return postForMap("/api/ml/projects/" + projectId + "/roadmap", request);
    }

    @Cacheable(cacheNames = "projectPlagiarism", key = "#projectId + ':' + #descriptionHash")
    public Map<String, Object> analyzePlagiarism(Long projectId, Project project, List<String> documentTexts, List<String> webSources, String descriptionHash) {
        MlProjectRequest request = buildRequest(projectId, project, null, null, null, documentTexts, webSources);
        return postForMap("/api/ml/projects/" + projectId + "/plagiarism", request);
    }

    @Cacheable(cacheNames = "projectAnalysis", key = "#projectId")
    public Map<String, Object> analyzeDescription(Long projectId, Project project) {
        MlProjectRequest request = buildRequest(projectId, project, null, null, null, null, null);
        return postForMap("/api/ml/projects/" + projectId + "/nlp", request);
    }

    @Cacheable(cacheNames = "projectRecommendations", key = "#projectId")
    public Map<String, Object> recommendations(Long projectId, Project project) {
        MlProjectRequest request = buildRequest(projectId, project, null, null, null, null, null);
        return postForMap("/api/ml/projects/" + projectId + "/recommendations", request);
    }

    public Map<String, Object> generateBmc(Long projectId, Project project) {
        Map<String, Object> request = Map.of(
            "startup_name", project.getTitle(),
            "description", project.getDescription(),
            "sector", project.getSector(),
            "stage", project.getStage()
        );
        return postForMap("/api/ml/documents/bmc/generate", request);
    }

    public Map<String, Object> generateSwot(Long projectId, Project project, String marketContext) {
        Map<String, Object> request = Map.of(
            "startup_name", project.getTitle(),
            "description", project.getDescription(),
            "market_context", marketContext != null ? marketContext : ""
        );
        return postForMap("/api/ml/documents/swot/generate", request);
    }

    public Map<String, Object> generatePitchDeck(Long projectId, Project project, String targetMarket) {
        Map<String, Object> request = Map.of(
            "startup_name", project.getTitle(),
            "description", project.getDescription(),
            "sector", project.getSector(),
            "team_size", project.getTeamSize() != null ? project.getTeamSize() : "1",
            "target_market", targetMarket != null ? targetMarket : ""
        );
        return postForMap("/api/ml/documents/pitch/generate", request);
    }

    public Map<String, Object> entrepreneurPlayground(Long projectId, Project project, Map<String, Object> payload) {
        List<Map<String, Object>> docs = extractMapList(payload.get("documents"));
        List<Map<String, Object>> conversation = extractMapList(payload.get("conversation"));
        Map<String, Object> request = new java.util.HashMap<>();
        request.put("projectId", projectId);
        request.put("title", project.getTitle() == null ? "" : project.getTitle());
        request.put("description", project.getDescription() == null ? "" : project.getDescription());
        request.put("sector", project.getSector() == null ? "" : project.getSector());
        request.put("stage", project.getStage() == null ? "" : project.getStage());
        request.put("budget", project.getBudget() == null ? 0.0 : project.getBudget());
        request.put("revenueModel", project.getRevenueModel() == null ? "" : project.getRevenueModel());
        request.put("teamSize", project.getTeamSize() == null ? "" : project.getTeamSize());
        request.put("userMessage", String.valueOf(payload.getOrDefault("userMessage", "")));
        request.put("documentTitle", String.valueOf(payload.getOrDefault("documentTitle", project.getTitle() == null ? "" : project.getTitle())));
        request.put("documentDraft", String.valueOf(payload.getOrDefault("documentDraft", project.getDescription() == null ? "" : project.getDescription())));
        request.put("tone", String.valueOf(payload.getOrDefault("tone", "concret")));
        request.put("conversation", conversation);
        request.put("bmc", String.valueOf(payload.getOrDefault("bmc", "")));
        request.put("swot", String.valueOf(payload.getOrDefault("swot", "")));
        request.put("budgetNotes", String.valueOf(payload.getOrDefault("budgetNotes", "")));
        request.put("goals", extractStringList(payload.get("goals")));
        request.put("documents", docs);
        return postForMap("/api/ml/projects/" + projectId + "/playground", request);
    }

    private MlScoreResponse postForScore(String path, MlProjectRequest request) {
        return mlWebClient.post()
                .uri(path)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(request)
                .retrieve()
                .bodyToMono(MlScoreResponse.class)
                .block(Duration.ofSeconds(properties.getTimeoutSeconds()));
    }

    private Map<String, Object> postForMap(String path, Object request) {
        Map<String, Object> response = mlWebClient.post()
                .uri(path)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(request)
                .retrieve()
                .bodyToMono(Map.class)
                .block(Duration.ofSeconds(properties.getTimeoutSeconds()));
        return response == null ? Map.of("status", "unavailable") : response;
    }

    private MlProjectRequest buildRequest(Long projectId, Project project, List<String> objectives, String feedback, String documentSummary, List<String> documentTexts, List<String> webSources) {
        return new MlProjectRequest(
                projectId,
                project.getTitle(),
                project.getDescription(),
                project.getSector(),
                project.getStage(),
                project.getBudget(),
                project.getTeamSize(),
                project.getRevenueModel(),
                Boolean.TRUE.equals(project.getHasPitchDeck()),
                Boolean.TRUE.equals(project.getHasBusinessPlan()),
                objectives == null ? List.of() : objectives,
                feedback,
                documentSummary,
                documentTexts == null ? List.of() : documentTexts,
                webSources == null ? List.of() : webSources,
                Map.of(
                        "shortDescription", project.getShortDescription() == null ? "" : project.getShortDescription(),
                        "problemSolved", project.getProblemSolved() == null ? "" : project.getProblemSolved(),
                        "progress", project.getProgress() == null ? 0.0 : project.getProgress()
                )
        );
    }

    private List<String> extractStringList(Object value) {
        if (value instanceof List<?> list) {
            return list.stream().map(String::valueOf).toList();
        }
        return List.of();
    }

    private List<Map<String, Object>> extractMapList(Object value) {
        if (value instanceof List<?> list) {
            return list.stream()
                    .filter(Map.class::isInstance)
                    .map(item -> (Map<String, Object>) item)
                    .toList();
        }
        return List.of();
    }
}
