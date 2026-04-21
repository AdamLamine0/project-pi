package com.ai.ai_service.service;

import com.ai.ai_service.config.AiProperties;
import com.ai.ai_service.dto.AiDecision;
import com.ai.ai_service.dto.DocumentAnalysisRequest;
import com.ai.ai_service.dto.LegalAiAnalysisRequest;
import com.ai.ai_service.dto.LegalAiAnalysisResponse;
import org.junit.jupiter.api.Test;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class LegalAiAnalysisServiceTest {

    @Test
    void analyzeRejectsWhenDocumentCannotBeDownloaded() {
        FileDownloadService fileDownloadService = mock(FileDownloadService.class);
        TesseractOcrService ocrService = mock(TesseractOcrService.class);
        OpenCvDocumentVisionService visionService = mock(OpenCvDocumentVisionService.class);
        GeminiLegalReasoningService geminiService = mock(GeminiLegalReasoningService.class);
        AiProperties properties = new AiProperties();

        when(fileDownloadService.downloadToTempFile(any()))
                .thenThrow(new IllegalArgumentException("404 Not Found"));
        when(geminiService.analyze(any(), anyList(), anyList()))
                .thenReturn(new GeminiLegalReasoningService.LlmVerdict(
                        false,
                        AiDecision.REVIEW,
                        "Gemini indisponible: test",
                        List.of(),
                        "test"
                ));

        LegalAiAnalysisService service = new LegalAiAnalysisService(
                fileDownloadService,
                ocrService,
                visionService,
                new DocumentRuleAnalysisService(properties),
                geminiService,
                properties
        );

        LegalAiAnalysisResponse response = service.analyze(new LegalAiAnalysisRequest(
                UUID.randomUUID(),
                "LABEL_STARTUP",
                "Demo",
                List.of(new DocumentAnalysisRequest(
                        UUID.randomUUID(),
                        "PITCH_DECK",
                        "Pitch deck",
                        "http://localhost:8087/api/files/missing.pdf",
                        null
                ))
        ));

        assertThat(response.decision()).isEqualTo(AiDecision.REJECTED);
        assertThat(response.appliedStatus()).isEqualTo("REFUSE");
        assertThat(response.remark()).contains("Corrigez les documents signales");
        assertThat(response.technicalFindings())
                .anyMatch(finding -> finding.contains("Document could not be processed"));
        assertThat(response.documents()).hasSize(1);
        assertThat(response.documents().get(0).ocrAvailable()).isFalse();
    }

    @Test
    void analyzeRejectsWhenDocumentIsBlurredEvenIfGeminiAccepts() throws Exception {
        FileDownloadService fileDownloadService = mock(FileDownloadService.class);
        TesseractOcrService ocrService = mock(TesseractOcrService.class);
        OpenCvDocumentVisionService visionService = mock(OpenCvDocumentVisionService.class);
        GeminiLegalReasoningService geminiService = mock(GeminiLegalReasoningService.class);
        AiProperties properties = new AiProperties();
        Path tempFile = Files.createTempFile("ai-test-", ".png");

        when(fileDownloadService.downloadToTempFile(any())).thenReturn(tempFile);
        when(visionService.analyze(any()))
                .thenReturn(new OpenCvDocumentVisionService.VisionResult(true, 12.0, true, null));
        when(ocrService.extractText(any()))
                .thenReturn(new TesseractOcrService.OcrResult(true, "Texte OCR suffisamment long pour valider le seuil technique.", null));
        when(geminiService.analyze(any(), anyList(), anyList()))
                .thenReturn(new GeminiLegalReasoningService.LlmVerdict(
                        true,
                        AiDecision.VALID,
                        "Dossier coherent.",
                        List.of(),
                        null
                ));

        LegalAiAnalysisService service = new LegalAiAnalysisService(
                fileDownloadService,
                ocrService,
                visionService,
                new DocumentRuleAnalysisService(properties),
                geminiService,
                properties
        );

        LegalAiAnalysisResponse response = service.analyze(new LegalAiAnalysisRequest(
                UUID.randomUUID(),
                "SARL",
                "Demo",
                List.of(new DocumentAnalysisRequest(
                        UUID.randomUUID(),
                        "CIN",
                        "CIN",
                        "http://localhost:8087/api/files/cin.png",
                        null
                ))
        ));

        assertThat(response.decision()).isEqualTo(AiDecision.REJECTED);
        assertThat(response.appliedStatus()).isEqualTo("REFUSE");
        assertThat(response.remark()).contains("Image floue");
    }

    @Test
    void analyzeRejectsWhenOcrDetectsFraudMarkersEvenIfGeminiAccepts() throws Exception {
        FileDownloadService fileDownloadService = mock(FileDownloadService.class);
        TesseractOcrService ocrService = mock(TesseractOcrService.class);
        OpenCvDocumentVisionService visionService = mock(OpenCvDocumentVisionService.class);
        GeminiLegalReasoningService geminiService = mock(GeminiLegalReasoningService.class);
        AiProperties properties = new AiProperties();
        Path tempFile = Files.createTempFile("ai-test-fraud-", ".png");

        when(fileDownloadService.downloadToTempFile(any())).thenReturn(tempFile);
        when(visionService.analyze(any()))
                .thenReturn(new OpenCvDocumentVisionService.VisionResult(true, 250.0, false, null));
        when(ocrService.extractText(any()))
                .thenReturn(new TesseractOcrService.OcrResult(
                        true,
                        "EXTRAIT RNE GREENLOOP SARL Forme juridique Societe Anonyme (SA) " +
                                "Délivré le 03 Novembre 2099 Code de vérification RNE-XXX000-???? INVALIDE",
                        null
                ));
        when(geminiService.analyze(any(), anyList(), anyList()))
                .thenReturn(new GeminiLegalReasoningService.LlmVerdict(
                        true,
                        AiDecision.VALID,
                        "Dossier coherent.",
                        List.of(),
                        null
                ));

        LegalAiAnalysisService service = new LegalAiAnalysisService(
                fileDownloadService,
                ocrService,
                visionService,
                new DocumentRuleAnalysisService(properties),
                geminiService,
                properties
        );

        LegalAiAnalysisResponse response = service.analyze(new LegalAiAnalysisRequest(
                UUID.randomUUID(),
                "CONFORMITE",
                "GreenLoop",
                List.of(new DocumentAnalysisRequest(
                        UUID.randomUUID(),
                        "RNE",
                        "Extrait RNE",
                        "http://localhost:8087/api/files/rne.png",
                        null
                ))
        ));

        assertThat(response.decision()).isEqualTo(AiDecision.REJECTED);
        assertThat(response.appliedStatus()).isEqualTo("REFUSE");
        assertThat(response.technicalFindings())
                .anyMatch(finding -> finding.contains("fraud marker"))
                .anyMatch(finding -> finding.contains("future"))
                .anyMatch(finding -> finding.contains("SARL and SA"));
    }

    @Test
    void analyzeUsesValidityDateInsteadOfBirthDateForExpiration() throws Exception {
        FileDownloadService fileDownloadService = mock(FileDownloadService.class);
        TesseractOcrService ocrService = mock(TesseractOcrService.class);
        OpenCvDocumentVisionService visionService = mock(OpenCvDocumentVisionService.class);
        GeminiLegalReasoningService geminiService = mock(GeminiLegalReasoningService.class);
        AiProperties properties = new AiProperties();
        Path tempFile = Files.createTempFile("ai-test-expiration-", ".png");

        when(fileDownloadService.downloadToTempFile(any())).thenReturn(tempFile);
        when(visionService.analyze(any()))
                .thenReturn(new OpenCvDocumentVisionService.VisionResult(true, 250.0, false, null));
        when(ocrService.extractText(any()))
                .thenReturn(new TesseractOcrService.OcrResult(
                        true,
                        "Carte d'identite nationale. Nom: Demo. Date de naissance: 14/03/1988. " +
                                "Date de delivrance: 10/01/2014. Valable jusqu'au: 12/01/2024.",
                        null
                ));
        when(geminiService.analyze(any(), anyList(), anyList()))
                .thenReturn(new GeminiLegalReasoningService.LlmVerdict(
                        true,
                        AiDecision.VALID,
                        "Dossier coherent.",
                        List.of(),
                        null
                ));

        LegalAiAnalysisService service = new LegalAiAnalysisService(
                fileDownloadService,
                ocrService,
                visionService,
                new DocumentRuleAnalysisService(properties),
                geminiService,
                properties
        );

        LegalAiAnalysisResponse response = service.analyze(new LegalAiAnalysisRequest(
                UUID.randomUUID(),
                "CONFORMITE",
                "Demo",
                List.of(new DocumentAnalysisRequest(
                        UUID.randomUUID(),
                        "CIN",
                        "CIN",
                        "http://localhost:8087/api/files/cin.png",
                        null
                ))
        ));

        assertThat(response.decision()).isEqualTo(AiDecision.REJECTED);
        assertThat(response.documents().get(0).detectedExpirationDate()).hasToString("2024-01-12");
        assertThat(response.technicalFindings())
                .anyMatch(finding -> finding.contains("2024-01-12"))
                .noneMatch(finding -> finding.contains("1988-03-14"));
    }

    @Test
    void analyzeDoesNotTreatBirthDateAsExpirationWhenNoValidityDateExists() throws Exception {
        FileDownloadService fileDownloadService = mock(FileDownloadService.class);
        TesseractOcrService ocrService = mock(TesseractOcrService.class);
        OpenCvDocumentVisionService visionService = mock(OpenCvDocumentVisionService.class);
        GeminiLegalReasoningService geminiService = mock(GeminiLegalReasoningService.class);
        AiProperties properties = new AiProperties();
        Path tempFile = Files.createTempFile("ai-test-birthdate-", ".png");

        when(fileDownloadService.downloadToTempFile(any())).thenReturn(tempFile);
        when(visionService.analyze(any()))
                .thenReturn(new OpenCvDocumentVisionService.VisionResult(true, 250.0, false, null));
        when(ocrService.extractText(any()))
                .thenReturn(new TesseractOcrService.OcrResult(
                        true,
                        "Carte d'identite nationale. Nom: Demo. Date de naissance: 14/03/1988. " +
                                "Numero CIN 12345678. Adresse Tunis.",
                        null
                ));
        when(geminiService.analyze(any(), anyList(), anyList()))
                .thenReturn(new GeminiLegalReasoningService.LlmVerdict(
                        true,
                        AiDecision.VALID,
                        "Dossier coherent.",
                        List.of(),
                        null
                ));

        LegalAiAnalysisService service = new LegalAiAnalysisService(
                fileDownloadService,
                ocrService,
                visionService,
                new DocumentRuleAnalysisService(properties),
                geminiService,
                properties
        );

        LegalAiAnalysisResponse response = service.analyze(new LegalAiAnalysisRequest(
                UUID.randomUUID(),
                "CONFORMITE",
                "Demo",
                List.of(new DocumentAnalysisRequest(
                        UUID.randomUUID(),
                        "CIN",
                        "CIN",
                        "http://localhost:8087/api/files/cin.png",
                        null
                ))
        ));

        assertThat(response.documents().get(0).detectedExpirationDate()).isNull();
        assertThat(response.technicalFindings())
                .noneMatch(finding -> finding.contains("expired"))
                .noneMatch(finding -> finding.contains("1988-03-14"));
    }

    @Test
    void analyzeDetectsDirectValidityDateWrittenBeforeNumericDate() throws Exception {
        FileDownloadService fileDownloadService = mock(FileDownloadService.class);
        TesseractOcrService ocrService = mock(TesseractOcrService.class);
        OpenCvDocumentVisionService visionService = mock(OpenCvDocumentVisionService.class);
        GeminiLegalReasoningService geminiService = mock(GeminiLegalReasoningService.class);
        AiProperties properties = new AiProperties();
        Path tempFile = Files.createTempFile("ai-test-validite-", ".png");

        when(fileDownloadService.downloadToTempFile(any())).thenReturn(tempFile);
        when(visionService.analyze(any()))
                .thenReturn(new OpenCvDocumentVisionService.VisionResult(true, 250.0, false, null));
        when(ocrService.extractText(any()))
                .thenReturn(new TesseractOcrService.OcrResult(
                        true,
                        "Carte nationale. Date de naissance: 14/03/1988. Validité 20/03/2020. CIN 12345678.",
                        null
                ));
        when(geminiService.analyze(any(), anyList(), anyList()))
                .thenReturn(new GeminiLegalReasoningService.LlmVerdict(
                        true,
                        AiDecision.VALID,
                        "Dossier coherent.",
                        List.of(),
                        null
                ));

        LegalAiAnalysisService service = new LegalAiAnalysisService(
                fileDownloadService,
                ocrService,
                visionService,
                new DocumentRuleAnalysisService(properties),
                geminiService,
                properties
        );

        LegalAiAnalysisResponse response = service.analyze(new LegalAiAnalysisRequest(
                UUID.randomUUID(),
                "CONFORMITE",
                "Demo",
                List.of(new DocumentAnalysisRequest(
                        UUID.randomUUID(),
                        "CIN",
                        "CIN",
                        "http://localhost:8087/api/files/cin.png",
                        null
                ))
        ));

        assertThat(response.decision()).isEqualTo(AiDecision.REJECTED);
        assertThat(response.documents().get(0).detectedExpirationDate()).hasToString("2020-03-20");
        assertThat(response.remark()).contains("Document expire depuis le 2020-03-20");
        assertThat(response.technicalFindings())
                .anyMatch(finding -> finding.contains("2020-03-20"))
                .noneMatch(finding -> finding.contains("1988-03-14"));
    }

    @Test
    void analyzeDetectsValidityDateWithSpacesFromOcr() throws Exception {
        FileDownloadService fileDownloadService = mock(FileDownloadService.class);
        TesseractOcrService ocrService = mock(TesseractOcrService.class);
        OpenCvDocumentVisionService visionService = mock(OpenCvDocumentVisionService.class);
        GeminiLegalReasoningService geminiService = mock(GeminiLegalReasoningService.class);
        AiProperties properties = new AiProperties();
        Path tempFile = Files.createTempFile("ai-test-validite-spaces-", ".png");

        when(fileDownloadService.downloadToTempFile(any())).thenReturn(tempFile);
        when(visionService.analyze(any()))
                .thenReturn(new OpenCvDocumentVisionService.VisionResult(true, 250.0, false, null));
        when(ocrService.extractText(any()))
                .thenReturn(new TesseractOcrService.OcrResult(
                        true,
                        "Carte nationale. Date de naissance: 14 03 1988. Fin de validite : 20 03 2020. CIN 12345678.",
                        null
                ));
        when(geminiService.analyze(any(), anyList(), anyList()))
                .thenReturn(new GeminiLegalReasoningService.LlmVerdict(
                        true,
                        AiDecision.VALID,
                        "Dossier coherent.",
                        List.of(),
                        null
                ));

        LegalAiAnalysisService service = new LegalAiAnalysisService(
                fileDownloadService,
                ocrService,
                visionService,
                new DocumentRuleAnalysisService(properties),
                geminiService,
                properties
        );

        LegalAiAnalysisResponse response = service.analyze(new LegalAiAnalysisRequest(
                UUID.randomUUID(),
                "CONFORMITE",
                "Demo",
                List.of(new DocumentAnalysisRequest(
                        UUID.randomUUID(),
                        "CIN",
                        "CIN",
                        "http://localhost:8087/api/files/cin.png",
                        null
                ))
        ));

        assertThat(response.decision()).isEqualTo(AiDecision.REJECTED);
        assertThat(response.documents().get(0).detectedExpirationDate()).hasToString("2020-03-20");
        assertThat(response.technicalFindings())
                .anyMatch(finding -> finding.contains("2020-03-20"))
                .noneMatch(finding -> finding.contains("1988-03-14"));
    }

    @Test
    void analyzeRejectsWhenOpenCvDetectsSuspiciousDiagonalOverlayEvenIfGeminiAccepts() throws Exception {
        FileDownloadService fileDownloadService = mock(FileDownloadService.class);
        TesseractOcrService ocrService = mock(TesseractOcrService.class);
        OpenCvDocumentVisionService visionService = mock(OpenCvDocumentVisionService.class);
        GeminiLegalReasoningService geminiService = mock(GeminiLegalReasoningService.class);
        AiProperties properties = new AiProperties();
        Path tempFile = Files.createTempFile("ai-test-overlay-", ".png");

        when(fileDownloadService.downloadToTempFile(any())).thenReturn(tempFile);
        when(visionService.analyze(any()))
                .thenReturn(new OpenCvDocumentVisionService.VisionResult(
                        true,
                        180.0,
                        false,
                        null,
                        List.of("Suspicious diagonal overlay line detected.")
                ));
        when(ocrService.extractText(any()))
                .thenReturn(new TesseractOcrService.OcrResult(true, "Document OCR suffisamment lisible et complet.", null));
        when(geminiService.analyze(any(), anyList(), anyList()))
                .thenReturn(new GeminiLegalReasoningService.LlmVerdict(
                        true,
                        AiDecision.VALID,
                        "Dossier coherent.",
                        List.of(),
                        null
                ));

        LegalAiAnalysisService service = new LegalAiAnalysisService(
                fileDownloadService,
                ocrService,
                visionService,
                new DocumentRuleAnalysisService(properties),
                geminiService,
                properties
        );

        LegalAiAnalysisResponse response = service.analyze(new LegalAiAnalysisRequest(
                UUID.randomUUID(),
                "CONFORMITE",
                "GreenLoop",
                List.of(new DocumentAnalysisRequest(
                        UUID.randomUUID(),
                        "AUDIT",
                        "Rapport audit",
                        "http://localhost:8087/api/files/audit.png",
                        null
                ))
        ));

        assertThat(response.decision()).isEqualTo(AiDecision.REJECTED);
        assertThat(response.appliedStatus()).isEqualTo("REFUSE");
        assertThat(response.technicalFindings())
                .anyMatch(finding -> finding.contains("diagonal overlay"));
    }
}
