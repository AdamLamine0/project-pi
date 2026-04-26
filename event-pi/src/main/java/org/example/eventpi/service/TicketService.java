package org.example.eventpi.service;

import com.lowagie.text.*;
import com.lowagie.text.pdf.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.eventpi.dto.TicketResponse;
import org.example.eventpi.exception.EventNotFoundException;
import org.example.eventpi.exception.ForbiddenException;
import org.example.eventpi.feign.UserClient;
import org.example.eventpi.dto.UserResponse;
import org.example.eventpi.model.*;
import org.example.eventpi.repository.EventRegistrationRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
@Slf4j
public class TicketService {

    private final EventRegistrationRepository registrationRepository;
    private final QrCodeService qrCodeService;
    private final UserClient userClient;
    private final BadgeService badgeService;

    @Value("${app.base-url}")
    private String baseUrl;

    private static final DateTimeFormatter DATE_FMT =
            DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");

    // ── GET TICKET INFO (authenticated user) ──────────────────────────────
    public TicketResponse getMyTicket(Long eventId, Integer userId) {
        EventRegistration reg = registrationRepository
                .findByEventIdAndUserId(eventId, userId)
                .orElseThrow(() -> new ForbiddenException("Aucune inscription trouvée."));
        if (reg.getStatus() == RegistrationStatus.ANNULE) {
            throw new ForbiddenException("Votre inscription a été annulée.");
        }
        return toTicketResponse(reg);
    }

    // ── VERIFY TICKET (public — for organizer QR scan) ────────────────────
    public TicketResponse verifyTicket(String ticketNumber) {
        return findByCode(ticketNumber)
                .map(this::toTicketResponse)
                .orElseThrow(() -> new ForbiddenException("Ticket invalide ou introuvable."));
    }

    // ── CHECK-IN BY TICKET NUMBER ─────────────────────────────────────────
    @Transactional
    public TicketResponse checkInByTicket(String ticketNumber) {
        EventRegistration reg = findByCode(ticketNumber)
                .orElseThrow(() -> new ForbiddenException("Ticket invalide ou introuvable."));

        if (reg.getStatus() == RegistrationStatus.PRESENT) {
            throw new ForbiddenException("Ce participant est déjà enregistré (check-in effectué).");
        }
        if (reg.getStatus() != RegistrationStatus.INSCRIT) {
            throw new ForbiddenException("Ce ticket n'est pas valide pour l'entrée (statut: " + reg.getStatus() + ").");
        }

        reg.setAttended(true);
        reg.setCheckInTime(LocalDateTime.now());
        reg.setStatus(RegistrationStatus.PRESENT);
        EventRegistration saved = registrationRepository.save(reg);

        try {
            badgeService.onAttendanceConfirmed(saved.getUserId(), saved.getEvent().getId());
        } catch (Exception e) {
            log.warn("Badge/certificate generation failed for userId={}: {}",
                    saved.getUserId(), e.getMessage());
        }

        return toTicketResponse(saved);
    }

    // ── PROCESS PAYMENT (mock — sets status to PAID) ──────────────────────
    @Transactional
    public TicketResponse processPayment(Long eventId, Integer userId) {
        EventRegistration reg = registrationRepository
                .findByEventIdAndUserId(eventId, userId)
                .orElseThrow(() -> new ForbiddenException("Aucune inscription trouvée."));

        if (reg.getPaymentStatus() == PaymentStatus.FREE) {
            throw new ForbiddenException("Cet événement est gratuit, aucun paiement nécessaire.");
        }
        if (reg.getPaymentStatus() == PaymentStatus.PAID) {
            throw new ForbiddenException("Le paiement a déjà été effectué.");
        }

        reg.setPaymentStatus(PaymentStatus.PAID);
        registrationRepository.save(reg);
        return toTicketResponse(reg);
    }

    // ── DOWNLOAD PDF TICKET ───────────────────────────────────────────────
    public byte[] downloadTicketPdf(Long eventId, Integer userId) {
        EventRegistration reg = registrationRepository
                .findByEventIdAndUserId(eventId, userId)
                .orElseThrow(() -> new ForbiddenException("Aucune inscription trouvée."));
        if (reg.getStatus() == RegistrationStatus.ANNULE) {
            throw new ForbiddenException("Votre inscription a été annulée.");
        }
        String attendeeName = resolveAttendeeName(userId);
        return buildTicketPdf(reg, attendeeName);
    }

    // ── BUILD PDF ─────────────────────────────────────────────────────────
    private byte[] buildTicketPdf(EventRegistration reg, String attendeeName) {
        Event event = reg.getEvent();
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {

            Rectangle pageSize = new Rectangle(595, 240);
            Document doc = new Document(pageSize, 0, 0, 0, 0);
            PdfWriter writer = PdfWriter.getInstance(doc, baos);
            doc.open();

            PdfContentByte cb = writer.getDirectContent();
            float W = pageSize.getWidth();
            float H = pageSize.getHeight();

            // ── Background ─────────────────────────────────────────────
            cb.setColorFill(new java.awt.Color(0x0D, 0x1B, 0x2A));
            cb.rectangle(0, 0, W, H);
            cb.fill();

            // ── Gold left strip ─────────────────────────────────────────
            cb.setColorFill(new java.awt.Color(0xC9, 0xA0, 0x2A));
            cb.rectangle(0, 0, 6, H);
            cb.fill();

            // ── Dashed separator ────────────────────────────────────────
            cb.setColorStroke(new java.awt.Color(0x33, 0x44, 0x55));
            cb.setLineWidth(0.8f);
            cb.setLineDash(4f, 4f, 0f);
            cb.moveTo(W - 155, 8);
            cb.lineTo(W - 155, H - 8);
            cb.stroke();
            cb.setLineDash(0f);

            // ── Gold outer border ───────────────────────────────────────
            cb.setColorStroke(new java.awt.Color(0xC9, 0xA0, 0x2A));
            cb.setLineWidth(1.5f);
            cb.rectangle(3, 3, W - 6, H - 6);
            cb.stroke();

            BaseFont bf     = BaseFont.createFont(BaseFont.HELVETICA,      BaseFont.WINANSI, false);
            BaseFont bfBold = BaseFont.createFont(BaseFont.HELVETICA_BOLD, BaseFont.WINANSI, false);

            float lx = 18f; // left content x

            // ── "FoundersLab" label ─────────────────────────────────────
            cb.beginText();
            cb.setFontAndSize(bfBold, 8);
            cb.setColorFill(new java.awt.Color(0xC9, 0xA0, 0x2A));
            cb.showTextAligned(PdfContentByte.ALIGN_LEFT, "FoundersLab", lx, H - 18, 0);
            cb.endText();

            // ── "EVENT TICKET" ──────────────────────────────────────────
            cb.beginText();
            cb.setFontAndSize(bfBold, 18);
            cb.setColorFill(java.awt.Color.WHITE);
            cb.showTextAligned(PdfContentByte.ALIGN_LEFT, "EVENT TICKET", lx, H - 42, 0);
            cb.endText();

            // ── Event title ─────────────────────────────────────────────
            cb.beginText();
            cb.setFontAndSize(bfBold, 12);
            cb.setColorFill(new java.awt.Color(0xC9, 0xA0, 0x2A));
            cb.showTextAligned(PdfContentByte.ALIGN_LEFT,
                    trunc(event.getTitle(), 42), lx, H - 62, 0);
            cb.endText();

            // ── Details rows ────────────────────────────────────────────
            float y = H - 85;
            if (event.getStartDate() != null) {
                labelValue(cb, bf, bfBold, "DATE", event.getStartDate().format(DATE_FMT), lx, y);
                y -= 22;
            }
            String loc = event.getLocation() != null ? event.getLocation()
                    : (event.getLocationType() != null ? event.getLocationType().name() : "En ligne");
            labelValue(cb, bf, bfBold, "LIEU", trunc(loc, 38), lx, y); y -= 22;
            labelValue(cb, bf, bfBold, "PARTICIPANT", trunc(attendeeName, 38), lx, y); y -= 22;
            labelValue(cb, bf, bfBold, "N° TICKET",
                    reg.getTicketNumber().substring(0, 8).toUpperCase(), lx, y); y -= 22;

            String price = (event.getTicketPrice() == null || event.getTicketPrice() == 0.0)
                    ? "Gratuit" : event.getTicketPrice() + " TND";
            labelValue(cb, bf, bfBold, "TARIF", price, lx, y); y -= 20;

            // ── Payment status badge ────────────────────────────────────
            if (reg.getPaymentStatus() != null) {
                switch (reg.getPaymentStatus()) {
                    case PAID    -> badge(cb, bfBold, "PAYÉ",                  new java.awt.Color(0x16, 0xA3, 0x4A), lx, y);
                    case FREE    -> badge(cb, bfBold, "GRATUIT",               new java.awt.Color(0x25, 0x63, 0xEB), lx, y);
                    case PENDING -> badge(cb, bfBold, "EN ATTENTE DE PAIEMENT", new java.awt.Color(0xD9, 0x77, 0x06), lx, y);
                    case FAILED  -> badge(cb, bfBold, "PAIEMENT ÉCHOUÉ",        new java.awt.Color(0xDC, 0x26, 0x26), lx, y);
                }
            }

            // ── QR Code ─────────────────────────────────────────────────
            String verifyUrl = baseUrl + "/api/tickets/" + reg.getTicketNumber() + "/verify";
            BufferedImage qrImg = qrCodeService.generateQrImage(verifyUrl);
            ByteArrayOutputStream qrOut = new ByteArrayOutputStream();
            ImageIO.write(qrImg, "PNG", qrOut);
            Image qrPdf = Image.getInstance(qrOut.toByteArray());
            float qrSize = 120f;
            qrPdf.setAbsolutePosition(W - 145, (H - qrSize) / 2f);
            qrPdf.scaleAbsolute(qrSize, qrSize);
            doc.add(qrPdf);

            // ── "Scan to verify" ────────────────────────────────────────
            cb.beginText();
            cb.setFontAndSize(bf, 6);
            cb.setColorFill(new java.awt.Color(0x77, 0x88, 0x99));
            cb.showTextAligned(PdfContentByte.ALIGN_CENTER, "Scan pour vérifier", W - 85, 10, 0);
            cb.endText();

            doc.close();
            return baos.toByteArray();

        } catch (Exception e) {
            log.error("Ticket PDF generation failed", e);
            throw new RuntimeException("Ticket generation failed: " + e.getMessage(), e);
        }
    }

    private void labelValue(PdfContentByte cb, BaseFont bf, BaseFont bfBold,
                            String label, String value, float x, float y) throws Exception {
        cb.beginText();
        cb.setFontAndSize(bf, 7);
        cb.setColorFill(new java.awt.Color(0x77, 0x88, 0x99));
        cb.showTextAligned(PdfContentByte.ALIGN_LEFT, label + " :", x, y + 7, 0);
        cb.endText();

        cb.beginText();
        cb.setFontAndSize(bfBold, 9);
        cb.setColorFill(java.awt.Color.WHITE);
        cb.showTextAligned(PdfContentByte.ALIGN_LEFT, value, x, y - 3, 0);
        cb.endText();
    }

    private void badge(PdfContentByte cb, BaseFont bfBold,
                       String text, java.awt.Color color,
                       float x, float y) throws Exception {
        float tw = bfBold.getWidthPoint(text, 7) + 10;
        cb.setColorFill(color);
        cb.roundRectangle(x, y, tw, 12, 3);
        cb.fill();
        cb.beginText();
        cb.setFontAndSize(bfBold, 7);
        cb.setColorFill(java.awt.Color.WHITE);
        cb.showTextAligned(PdfContentByte.ALIGN_LEFT, text, x + 5, y + 3, 0);
        cb.endText();
    }

    // ── HELPERS ───────────────────────────────────────────────────────────

    /**
     * Resolves a registration by ticket code.
     * Accepts either the full 36-char UUID or the 8-char short code shown on the ticket.
     */
    private java.util.Optional<EventRegistration> findByCode(String code) {
        if (code == null) return java.util.Optional.empty();
        String trimmed = code.trim();
        if (trimmed.length() == 36) {
            return registrationRepository.findByTicketNumber(trimmed.toLowerCase());
        }
        return registrationRepository.findByShortTicketCode(trimmed);
    }

    private String resolveAttendeeName(Integer userId) {
        try {
            UserResponse user = userClient.getUserById(userId);
            if (user != null) {
                String full = (user.getName() + " " + user.getPrenom()).trim();
                if (!full.isEmpty()) return full;
            }
        } catch (Exception e) {
            log.warn("Could not resolve name for userId {}: {}", userId, e.getMessage());
        }
        return "Participant #" + userId;
    }

    private String trunc(String s, int max) {
        if (s == null) return "—";
        return s.length() > max ? s.substring(0, max - 1) + "…" : s;
    }

    private TicketResponse toTicketResponse(EventRegistration reg) {
        Event event = reg.getEvent();
        return TicketResponse.builder()
                .ticketNumber(reg.getTicketNumber())
                .registrationId(reg.getId())
                .eventId(event.getId())
                .eventTitle(event.getTitle())
                .eventDate(event.getStartDate())
                .eventEndDate(event.getEndDate())
                .eventLocation(event.getLocation())
                .locationType(event.getLocationType())
                .userId(reg.getUserId())
                .ticketPrice(event.getTicketPrice())
                .paymentStatus(reg.getPaymentStatus())
                .registrationStatus(reg.getStatus())
                .registeredAt(reg.getRegisteredAt())
                .downloadUrl(baseUrl + "/api/tickets/" + reg.getTicketNumber() + "/download")
                .build();
    }
}
