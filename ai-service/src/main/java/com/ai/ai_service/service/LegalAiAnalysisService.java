package com.ai.ai_service.service;

import com.ai.ai_service.config.AiProperties;
import com.ai.ai_service.dto.AiDecision;
import com.ai.ai_service.dto.DocumentAiAnalysisResponse;
import com.ai.ai_service.dto.DocumentAnalysisRequest;
import com.ai.ai_service.dto.LegalAiAnalysisRequest;
import com.ai.ai_service.dto.LegalAiAnalysisResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class LegalAiAnalysisService {

    private static final Logger log = LoggerFactory.getLogger(LegalAiAnalysisService.class);

    private final FileDownloadService fileDownloadService;
    private final TesseractOcrService ocrService;
    private final OpenCvDocumentVisionService visionService;
    private final DocumentRuleAnalysisService ruleAnalysisService;
    private final GeminiLegalReasoningService geminiService;
    private final AiProperties properties;

    public LegalAiAnalysisService(
            FileDownloadService fileDownloadService,
            TesseractOcrService ocrService,
            OpenCvDocumentVisionService visionService,
            DocumentRuleAnalysisService ruleAnalysisService,
            GeminiLegalReasoningService geminiService,
            AiProperties properties
    ) {
        this.fileDownloadService = fileDownloadService;
        this.ocrService = ocrService;
        this.visionService = visionService;
        this.ruleAnalysisService = ruleAnalysisService;
        this.geminiService = geminiService;
        this.properties = properties;
    }

    public LegalAiAnalysisResponse analyze(LegalAiAnalysisRequest request) {
        if (request == null) {
            return reviewResponse(null, "AI analysis request is empty.");
        }
        if (request.documents() == null || request.documents().isEmpty()) {
            return reviewResponse(request, "No documents supplied for AI analysis.");
        }

        List<DocumentAiAnalysisResponse> documentResponses = new ArrayList<>();
        List<GeminiLegalReasoningService.LlmDocumentContext> llmContexts = new ArrayList<>();
        List<String> technicalFindings = new ArrayList<>();
        boolean hasExpiredDocument = false;
        boolean hasBlockingTechnicalIssue = false;

        for (DocumentAnalysisRequest document : request.documents()) {
            DocumentAnalysis analysis = analyzeDocument(document);
            documentResponses.add(analysis.response());
            llmContexts.add(analysis.llmContext());

            if (analysis.response().expired()) {
                hasExpiredDocument = true;
            }
            if (analysis.blockingTechnicalIssue()) {
                hasBlockingTechnicalIssue = true;
            }
            String requirementCode = analysis.response().requirementCode() == null
                    ? "UNKNOWN"
                    : analysis.response().requirementCode();
            analysis.response().findings().forEach(finding ->
                    technicalFindings.add(requirementCode + ": " + finding));
        }

        GeminiLegalReasoningService.LlmVerdict llmVerdict =
                geminiService.analyze(request, llmContexts, technicalFindings);
        AiDecision finalDecision = combineDecision(
                hasExpiredDocument,
                hasBlockingTechnicalIssue,
                llmVerdict.decision()
        );
        String remark = buildRemark(finalDecision, technicalFindings, llmVerdict, documentResponses);
        String appliedStatus = finalDecision == AiDecision.REJECTED ? "REFUSE" : "EN_ATTENTE_EXPERT";

        return new LegalAiAnalysisResponse(
                request.procedureId(),
                finalDecision,
                appliedStatus,
                llmVerdict.available(),
                remark,
                technicalFindings,
                llmVerdict.findings(),
                documentResponses
        );
    }

    public LegalAiAnalysisResponse reviewResponse(LegalAiAnalysisRequest request, String finding) {
        List<String> findings = List.of(finding);
        GeminiLegalReasoningService.LlmVerdict llmVerdict =
                GeminiLegalReasoningService.LlmVerdict.unavailable("LLM analysis skipped: " + finding);
        return new LegalAiAnalysisResponse(
                request == null ? null : request.procedureId(),
                AiDecision.REVIEW,
                "EN_ATTENTE_EXPERT",
                false,
                buildRemark(AiDecision.REVIEW, findings, llmVerdict, List.of()),
                findings,
                List.of(),
                List.of()
        );
    }

    private DocumentAnalysis analyzeDocument(DocumentAnalysisRequest document) {
        if (document == null) {
            return failedDocumentAnalysis(null, "Document request is empty.");
        }
        if (document.fileUrl() == null || document.fileUrl().isBlank()) {
            return failedDocumentAnalysis(document, "Document file URL is missing.");
        }

        Path tempFile = null;
        try {
            tempFile = fileDownloadService.downloadToTempFile(document.fileUrl());
            OpenCvDocumentVisionService.VisionResult vision = visionService.analyze(tempFile);
            TesseractOcrService.OcrResult ocr = ocrService.extractText(tempFile);

            List<String> findings = new ArrayList<>();
            if (!vision.available() && vision.error() != null) {
                findings.add(vision.error());
            }
            if (vision.findings() != null) {
                findings.addAll(vision.findings());
            }
            if (!ocr.available() && ocr.error() != null) {
                findings.add(ocr.error());
            }

            DocumentRuleAnalysisService.RuleResult rules =
                    ruleAnalysisService.analyze(document, ocr.text(), vision.blurred());
            findings.addAll(rules.findings());

            boolean requiresReview = rules.requiresReview()
                    || !ocr.available()
                    || (vision.findings() != null && !vision.findings().isEmpty());
            DocumentAiAnalysisResponse response = new DocumentAiAnalysisResponse(
                    document.documentId(),
                    document.requirementCode(),
                    document.fileUrl(),
                    ocr.available(),
                    ocr.text().length(),
                    preview(ocr.text()),
                    vision.available(),
                    vision.blurScore(),
                    vision.blurred(),
                    rules.expirationDate(),
                    rules.expired(),
                    findings
            );

            GeminiLegalReasoningService.LlmDocumentContext context =
                    new GeminiLegalReasoningService.LlmDocumentContext(
                            document.requirementCode(),
                            ocr.text(),
                            vision.blurred(),
                            rules.expirationDate(),
                            findings
                    );

            return new DocumentAnalysis(response, context, requiresReview);
        } catch (Throwable e) {
            String message = userSafeMessage("Document could not be processed", e);
            log.warn("AI document analysis failed for requirement {} and url {}: {}",
                    document.requirementCode(), document.fileUrl(), e.getMessage());
            return failedDocumentAnalysis(document, message);
        } finally {
            deleteQuietly(tempFile);
        }
    }

    private DocumentAnalysis failedDocumentAnalysis(DocumentAnalysisRequest document, String finding) {
        List<String> findings = List.of(finding);
        DocumentAiAnalysisResponse response = new DocumentAiAnalysisResponse(
                document == null ? null : document.documentId(),
                document == null ? null : document.requirementCode(),
                document == null ? null : document.fileUrl(),
                false,
                0,
                "",
                false,
                null,
                false,
                null,
                false,
                findings
        );
        GeminiLegalReasoningService.LlmDocumentContext context =
                new GeminiLegalReasoningService.LlmDocumentContext(
                        document == null ? "UNKNOWN" : document.requirementCode(),
                        "",
                        false,
                        null,
                        findings
                );
        return new DocumentAnalysis(response, context, true);
    }

    private String userSafeMessage(String prefix, Throwable e) {
        Throwable cursor = e;
        String message = null;
        while (cursor != null) {
            if (cursor.getMessage() != null && !cursor.getMessage().isBlank()) {
                message = cursor.getMessage();
            }
            cursor = cursor.getCause();
        }
        if (message == null || message.isBlank()) {
            return prefix + ".";
        }
        return prefix + ": " + message;
    }

    private AiDecision combineDecision(
            boolean hasExpiredDocument,
            boolean hasBlockingTechnicalIssue,
            AiDecision llmDecision
    ) {
        if (hasExpiredDocument || hasBlockingTechnicalIssue || llmDecision == AiDecision.REJECTED) {
            return AiDecision.REJECTED;
        }
        if (llmDecision == AiDecision.REVIEW) {
            return AiDecision.REVIEW;
        }
        return AiDecision.VALID;
    }

    private String buildRemark(
            AiDecision decision,
            List<String> technicalFindings,
            GeminiLegalReasoningService.LlmVerdict llmVerdict,
            List<DocumentAiAnalysisResponse> documents
    ) {
        StringBuilder remark = new StringBuilder();
        if (decision == AiDecision.REJECTED && !technicalFindings.isEmpty()) {
            Map<String, List<String>> groupedFindings = groupFindingsByDocument(technicalFindings);
            remark.append("AI analysis rejected the case. Fix the flagged documents, then resubmit the case.");
            remark.append("\n\nDocuments to fix:");
            groupedFindings.forEach((document, findings) -> {
                remark.append("\n- ").append(document).append(":");
                findings.forEach(finding -> remark.append("\n  - ").append(toUserFacingFinding(finding)));
            });
            return remark
                    .toString();
        }

        if (!llmVerdict.available()) {
            return buildLocalReviewRemark(technicalFindings, documents);
        }

        return llmVerdict.remark();
    }

    private String buildLocalReviewRemark(
            List<String> technicalFindings,
            List<DocumentAiAnalysisResponse> documents
    ) {
        long readableDocuments = documents.stream().filter(DocumentAiAnalysisResponse::ocrAvailable).count();
        long visuallyCheckedDocuments = documents.stream().filter(DocumentAiAnalysisResponse::visionAvailable).count();
        int documentCount = documents.size();

        StringBuilder remark = new StringBuilder();
        remark.append("Automated OCR/OpenCV review completed.");

        if (documentCount > 0) {
            remark.append(" ")
                    .append(readableDocuments)
                    .append("/")
                    .append(documentCount)
                    .append(" document(s) had readable OCR text, and ")
                    .append(visuallyCheckedDocuments)
                    .append("/")
                    .append(documentCount)
                    .append(" document(s) passed image inspection.");
        }

        if (technicalFindings == null || technicalFindings.isEmpty()) {
            remark.append(" No blocking technical issue was detected. The case is sent to the expert for final legal review.");
            return remark.toString();
        }

        remark.append(" The case needs expert review because some checks need confirmation.");
        remark.append("\n\nPoints to verify:");
        groupFindingsByDocument(technicalFindings).forEach((document, findings) -> {
            remark.append("\n- ").append(document).append(":");
            findings.forEach(finding -> remark.append("\n  - ").append(toUserFacingFinding(finding)));
        });
        return remark.toString();
    }

    private Map<String, List<String>> groupFindingsByDocument(List<String> technicalFindings) {
        Map<String, List<String>> grouped = new LinkedHashMap<>();
        for (String finding : technicalFindings) {
            int separator = finding == null ? -1 : finding.indexOf(":");
            String document = separator > 0 ? finding.substring(0, separator).trim() : "DOCUMENT";
            String message = separator > 0 ? finding.substring(separator + 1).trim() : finding;
            grouped.computeIfAbsent(document, ignored -> new ArrayList<>()).add(message);
        }
        return grouped;
    }

    private String toUserFacingFinding(String finding) {
        if (finding == null || finding.isBlank()) {
            return "Unspecified error.";
        }
        if (finding.startsWith("Document appears expired on ")) {
            return finding
                    .replace("Document appears expired on ", "Document appears expired on ")
                    .replace(".", ".");
        }
        return switch (finding) {
            case "Suspicious red or pink watermark overlay detected." ->
                    "Suspicious red or pink watermark overlay detected.";
            case "Suspicious masked or invalid verification code detected." ->
                    "Code de verification masque ou invalide.";
            case "Inconsistent company legal form detected: SARL and SA/Societe Anonyme appear together." ->
                    "Inconsistent company legal form detected: SARL and SA/Societe Anonyme appear together.";
            case "Document issue date appears to be in the future." ->
                    "Document issue date appears to be in the future.";
            case "Document image contains repeated horizontal scan lines; quality is degraded." ->
                    "Document image contains repeated horizontal scan lines; quality is degraded.";
            case "Document image appears blurred." ->
                    "Image floue ou qualite insuffisante.";
            case "Suspicious diagonal overlay line detected." ->
                    "Suspicious diagonal overlay line detected.";
            case "Suspicious fraud marker detected in OCR text (for example FALSIFIE/INVALIDE)." ->
                    "Suspicious fraud marker detected in OCR text (for example FALSIFIE/INVALIDE).";
            case "OCR text is too short for reliable automatic validation." ->
                    "OCR text is too short for reliable automatic validation.";
            case "No text extracted by OCR." ->
                    "No text extracted by OCR.";
            default -> finding;
        };
    }

    private String preview(String text) {
        if (text == null || text.isBlank()) {
            return "";
        }
        int max = properties.getOcr().getPreviewLength();
        return text.length() <= max ? text : text.substring(0, max) + "...";
    }

    private void deleteQuietly(Path file) {
        if (file == null) {
            return;
        }
        try {
            Files.deleteIfExists(file);
        } catch (IOException ignored) {
            // Temp file cleanup failure should not fail the analysis response.
        }
    }

    private record DocumentAnalysis(
            DocumentAiAnalysisResponse response,
            GeminiLegalReasoningService.LlmDocumentContext llmContext,
            boolean blockingTechnicalIssue
    ) {}
}
