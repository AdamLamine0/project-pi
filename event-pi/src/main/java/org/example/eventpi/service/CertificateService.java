package org.example.eventpi.service;

import com.lowagie.text.*;
import com.lowagie.text.pdf.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.eventpi.dto.CertificateResponse;
import org.example.eventpi.dto.VerificationResponse;
import org.example.eventpi.model.Certificate;
import org.example.eventpi.model.Event;
import org.example.eventpi.repository.CertificateRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class CertificateService {

    private final CertificateRepository certificateRepository;
    private final QrCodeService qrCodeService;

    @Value("${app.base-url}")
    private String baseUrl;

    @Value("${app.frontend-url}")
    private String frontendUrl;

    private static final String CERT_DIR = "uploads/certificates";
    private static final DateTimeFormatter DATE_FMT =
            DateTimeFormatter.ofPattern("dd MMMM yyyy");

    // ── GENERATE & PERSIST ────────────────────────────────────────────────
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public Certificate generateCertificate(Integer userId, String recipientName,
                                           Event event, Long badgeId,
                                           String badgeLabel) {
        if (certificateRepository.existsByUserIdAndEventId(userId, event.getId())) {
            return certificateRepository.findByUserId(userId).stream()
                    .filter(c -> c.getEventId().equals(event.getId()))
                    .findFirst().orElseThrow();
        }

        String token = UUID.randomUUID().toString();
        String verificationUrl = frontendUrl + "/verify/" + token;

        // Generate PDF (no QR — clean formal document)
        byte[] pdfBytes = buildPdf(recipientName, event, token);
        String relativePath = savePdf(pdfBytes, token);

        // Generate badge PNG (with QR)
        generateAndSaveBadgePng(userId, recipientName, event.getTitle(),
                badgeLabel, verificationUrl, token);

        Certificate cert = Certificate.builder()
                .userId(userId)
                .eventId(event.getId())
                .badgeId(badgeId)
                .recipientName(recipientName)
                .eventTitle(event.getTitle())
                .eventDate(event.getStartDate())
                .verificationToken(token)
                .pdfPath(relativePath)
                .build();

        return certificateRepository.save(cert);
    }

    // ── BUILD PDF (no QR — clean formal document) ─────────────────────────
    private byte[] buildPdf(String recipientName, Event event, String token) {
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {

            Document doc = new Document(PageSize.A4.rotate(), 40, 40, 60, 60);
            PdfWriter writer = PdfWriter.getInstance(doc, baos);
            doc.open();

            // Background
            PdfContentByte canvas = writer.getDirectContentUnder();
            canvas.setColorFill(new java.awt.Color(0x0D, 0x1B, 0x2A));
            canvas.rectangle(0, 0, doc.getPageSize().getWidth(),
                    doc.getPageSize().getHeight());
            canvas.fill();

            // Gold border
            PdfContentByte border = writer.getDirectContent();
            border.setColorStroke(new java.awt.Color(0xC9, 0xA0, 0x2A));
            border.setLineWidth(3f);
            border.rectangle(20, 20,
                    doc.getPageSize().getWidth() - 40,
                    doc.getPageSize().getHeight() - 40);
            border.stroke();

            // Fonts
            BaseFont bfBold = BaseFont.createFont(
                    BaseFont.HELVETICA_BOLD, BaseFont.WINANSI, false);
            BaseFont bfBody = BaseFont.createFont(
                    BaseFont.HELVETICA, BaseFont.WINANSI, false);

            Font fontHeader = new Font(bfBold, 11, Font.NORMAL,
                    new java.awt.Color(0xC9, 0xA0, 0x2A));
            Font fontTitle  = new Font(bfBold, 36, Font.NORMAL,
                    java.awt.Color.WHITE);
            Font fontSub    = new Font(bfBody, 14, Font.ITALIC,
                    new java.awt.Color(0xCC, 0xCC, 0xCC));
            Font fontName   = new Font(bfBold, 28, Font.NORMAL,
                    new java.awt.Color(0xC9, 0xA0, 0x2A));
            Font fontBody   = new Font(bfBody, 13, Font.NORMAL,
                    new java.awt.Color(0xDD, 0xDD, 0xDD));
            Font fontEvent  = new Font(bfBold, 18, Font.NORMAL,
                    java.awt.Color.WHITE);
            Font fontFooter = new Font(bfBody, 8, Font.NORMAL,
                    new java.awt.Color(0x88, 0x88, 0x88));

            float pageWidth = doc.getPageSize().getWidth();

            addCenteredText(doc, "PIcloud — Startup Ecosystem Platform",
                    fontHeader, 20f);
            addCenteredText(doc, "CERTIFICATE OF PARTICIPATION",
                    fontTitle, 6f);
            addCenteredText(doc, "This is to certify that", fontSub, 18f);
            addCenteredText(doc, recipientName, fontName, 6f);

            // Gold divider
            PdfContentByte line = writer.getDirectContent();
            float lineY = writer.getVerticalPosition(false) - 10;
            line.setColorStroke(new java.awt.Color(0xC9, 0xA0, 0x2A));
            line.setLineWidth(0.8f);
            line.moveTo(pageWidth * 0.2f, lineY);
            line.lineTo(pageWidth * 0.8f, lineY);
            line.stroke();

            addCenteredText(doc, "has successfully attended", fontBody, 18f);
            addCenteredText(doc, event.getTitle(), fontEvent, 6f);

            String dateStr = event.getStartDate() != null
                    ? event.getStartDate().format(DATE_FMT) : "—";
            addCenteredText(doc, "held on " + dateStr, fontBody, 40f);

            // Verification URL as text (no QR)
            addCenteredText(doc,
                    "Verify at: " + frontendUrl + "/verify/" + token,
                    fontFooter, 4f);
            addCenteredText(doc,
                    "Certificate ID: " + token.substring(0, 8).toUpperCase(),
                    fontFooter, 0f);

            doc.close();
            return baos.toByteArray();

        } catch (Exception e) {
            log.error("PDF generation failed", e);
            throw new RuntimeException("Certificate PDF generation failed", e);
        }
    }

    // ── GENERATE BADGE PNG WITH QR ────────────────────────────────────────
    private void generateAndSaveBadgePng(Integer userId, String recipientName,
                                         String eventTitle, String badgeLabel,
                                         String verificationUrl, String token) {
        try {
            BufferedImage badgeImg = qrCodeService.generateBadgeImage(
                    recipientName, eventTitle, badgeLabel, verificationUrl);

            Path dir = Paths.get("uploads/badges");
            Files.createDirectories(dir);
            Path out = dir.resolve(token + ".png");
            ImageIO.write(badgeImg, "PNG", out.toFile());
            log.info("Badge PNG saved: {}", out);
        } catch (Exception e) {
            log.warn("Badge PNG generation failed: {}", e.getMessage());
        }
    }

    // ── HELPERS ───────────────────────────────────────────────────────────
    private void addCenteredText(Document doc, String text,
                                 Font font, float spacingAfter)
            throws DocumentException {
        Paragraph p = new Paragraph(text, font);
        p.setAlignment(Element.ALIGN_CENTER);
        p.setSpacingAfter(spacingAfter);
        doc.add(p);
    }

    private String savePdf(byte[] bytes, String token) {
        try {
            Path dir = Paths.get(CERT_DIR);
            Files.createDirectories(dir);
            String filename = token + ".pdf";
            Path out = dir.resolve(filename);
            try (FileOutputStream fos = new FileOutputStream(out.toFile())) {
                fos.write(bytes);
            }
            return CERT_DIR + "/" + filename;
        } catch (IOException e) {
            throw new RuntimeException("Failed to save certificate PDF", e);
        }
    }

    // ── READ ──────────────────────────────────────────────────────────────
    public List<CertificateResponse> getByUser(Integer userId, String baseUrl) {
        return certificateRepository.findByUserId(userId)
                .stream().map(c -> toResponse(c, baseUrl)).toList();
    }

    public byte[] downloadPdf(Long certId, Integer userId) {
        Certificate cert = certificateRepository.findById(certId)
                .orElseThrow(() -> new RuntimeException("Certificate not found"));
        if (!cert.getUserId().equals(userId)) {
            throw new RuntimeException("Access denied");
        }
        try {
            return Files.readAllBytes(Paths.get(cert.getPdfPath()));
        } catch (IOException e) {
            throw new RuntimeException("PDF file not found on disk", e);
        }
    }

    // ── PUBLIC VERIFICATION ───────────────────────────────────────────────
    public VerificationResponse verify(String token) {
        return certificateRepository.findByVerificationToken(token)
                .map(c -> VerificationResponse.builder()
                        .valid(true)
                        .recipientName(c.getRecipientName())
                        .eventTitle(c.getEventTitle())
                        .eventDate(c.getEventDate())
                        .generatedAt(c.getGeneratedAt())
                        .message("This certificate is authentic and was issued by PIcloud.")
                        .build())
                .orElse(VerificationResponse.builder()
                        .valid(false)
                        .message("Certificate not found or has been revoked.")
                        .build());
    }

    public Certificate getByBadgeId(Long badgeId) {
        return certificateRepository.findByBadgeId(badgeId)
                .orElseThrow(() -> new RuntimeException(
                        "Certificate not found for badge"));
    }

    public Certificate getCertificateById(Long id) {
        return certificateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Certificate not found"));
    }

    // ── MAPPER ────────────────────────────────────────────────────────────
    public CertificateResponse toResponse(Certificate c, String baseUrl) {
        return CertificateResponse.builder()
                .id(c.getId())
                .userId(c.getUserId())
                .eventId(c.getEventId())
                .recipientName(c.getRecipientName())
                .eventTitle(c.getEventTitle())
                .eventDate(c.getEventDate())
                .verificationToken(c.getVerificationToken())
                .downloadUrl(baseUrl + "/api/certificates/" + c.getId() + "/download")
                .generatedAt(c.getGeneratedAt())
                .build();
    }
}