package org.example.partenariatpi.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.partenariatpi.model.MeetingInvitation;
import org.example.partenariatpi.repository.MeetingInvitationRepository;
import org.example.partenariatpi.feign.UserClient;
import org.example.partenariatpi.feign.UserDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

/**
 * Sends the meeting transcript PDF to both participants of a meeting.
 *
 * Call flow:
 *  1. TranscriptProxyController saves segments → calls sendTranscriptToParticipants()
 *  2. This service looks up the MeetingInvitation by zoomMeetingId to get both emails
 *  3. Generates the PDF via TranscriptPdfService
 *  4. Sends one email with the PDF attached to each participant
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class TranscriptEmailService {

    private static final DateTimeFormatter DATE_FMT =
            DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");

    private final JavaMailSender           mailSender;
    private final TranscriptPdfService     transcriptPdfService;
    private final MeetingInvitationRepository meetingInvitationRepository;
    private final UserClient              userClient;

    @Value("${spring.mail.username}")
    private String senderEmail;

    // ─────────────────────────────────────────────────────────────────────────
    // PUBLIC API
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Main entry-point called after transcript segments are saved.
     *
     * @param zoomMeetingId  The Zoom meeting ID stored in both TranscriptLine and MeetingInvitation
     */
    public void sendTranscriptToParticipants(String zoomMeetingId) {
        log.info("📧 Sending transcript email for meeting {}", zoomMeetingId);

        // 1. Find the MeetingInvitation that holds participant info
        MeetingInvitation inv = meetingInvitationRepository
                .findByZoomMeetingId(zoomMeetingId)
                .orElse(null);

        if (inv == null) {
            log.warn("⚠️  No MeetingInvitation found for zoomMeetingId={} — skipping email", zoomMeetingId);
            return;
        }

        // 2. Resolve participant names and emails
        ParticipantInfo p1 = resolveRequester(inv);
        ParticipantInfo p2 = resolvePartner(inv);

        // 3. Generate PDF
        byte[] pdfBytes;
        try {
            pdfBytes = transcriptPdfService.generateTranscriptPdf(
                    zoomMeetingId,
                    inv.getSubject(),
                    p1.name(),
                    p2.name()
            );
        } catch (Exception e) {
            log.error("❌ PDF generation failed for meeting {}: {}", zoomMeetingId, e.getMessage());
            return;
        }

        String filename = "transcript_" + zoomMeetingId + ".pdf";

        // 4. Send to each participant who has an email address
        List<ParticipantInfo> recipients = new ArrayList<>();
        if (StringUtils.hasText(p1.email())) recipients.add(p1);
        if (StringUtils.hasText(p2.email())) recipients.add(p2);

        if (recipients.isEmpty()) {
            log.warn("⚠️  No valid email addresses found for meeting {} — skipping", zoomMeetingId);
            return;
        }

        for (ParticipantInfo recipient : recipients) {
            try {
                sendPdfEmail(recipient.email(), recipient.name(),
                        inv.getSubject(), zoomMeetingId, pdfBytes, filename, inv);
                log.info("✅ Transcript email sent to {}", recipient.email());
            } catch (Exception e) {
                log.error("❌ Failed to send transcript email to {}: {}", recipient.email(), e.getMessage());
            }
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // PRIVATE HELPERS
    // ─────────────────────────────────────────────────────────────────────────

    private void sendPdfEmail(
            String to,
            String recipientName,
            String meetingSubject,
            String zoomMeetingId,
            byte[] pdfBytes,
            String filename,
            MeetingInvitation inv
    ) throws MessagingException {

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setFrom(senderEmail);
        helper.setTo(to);
        helper.setSubject("Meeting transcript: " + meetingSubject);

        String meetingDate = inv.getSuggestedDateTime() != null
                ? inv.getSuggestedDateTime().format(DATE_FMT)
                : "—";

        // HTML body
        String htmlBody = """
                <html><body style="font-family: Arial, sans-serif; color: #333; max-width: 600px;">
                  <h2 style="color: #2962FF;">Meeting Transcript</h2>
                  <p>Hello <strong>%s</strong>,</p>
                  <p>Please find attached the automated transcript for the following meeting:</p>
                  <table style="border-collapse: collapse; width: 100%%; margin: 16px 0;">
                    <tr>
                      <td style="padding: 8px; background: #f0f0fa; font-weight: bold; width: 40%%;">Subject</td>
                      <td style="padding: 8px;">%s</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px; background: #f0f0fa; font-weight: bold;">Date</td>
                      <td style="padding: 8px;">%s</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px; background: #f0f0fa; font-weight: bold;">Meeting ID</td>
                      <td style="padding: 8px;">%s</td>
                    </tr>
                  </table>
                  <p style="color: #666; font-size: 12px;">
                    This transcript was generated automatically using Whisper AI and Pyannote speaker
                    diarization. Speaker labels may not perfectly match participant names.
                  </p>
                  <hr style="border: none; border-top: 1px solid #eee;"/>
                  <p style="color: #999; font-size: 11px;">Partenariat Platform — automated message</p>
                </body></html>
                """.formatted(
                recipientName != null ? recipientName : "participant",
                meetingSubject != null ? meetingSubject : "—",
                meetingDate,
                zoomMeetingId
        );

        helper.setText(htmlBody, true);

        // Attach PDF
        helper.addAttachment(filename, new ByteArrayResource(pdfBytes), "application/pdf");

        mailSender.send(message);
    }

    /** Resolve the user who sent the meeting request */
    private ParticipantInfo resolveRequester(MeetingInvitation inv) {
        if (inv.getSenderUserId() != null) {
            try {
                UserDto user = userClient.getUserById(inv.getSenderUserId());
                String name = buildName(user);
                return new ParticipantInfo(name, user.getEmail());
            } catch (Exception e) {
                log.warn("Could not fetch requester user {}: {}", inv.getSenderUserId(), e.getMessage());
            }
        }
        return new ParticipantInfo(inv.getRequesterName(), null);
    }

    /** Resolve the partner (recipient) */
    private ParticipantInfo resolvePartner(MeetingInvitation inv) {
        return new ParticipantInfo(inv.getRecipientName(), inv.getRecipientEmail());
    }

    private String buildName(UserDto user) {
        String full = (user.getPrenom() == null ? "" : user.getPrenom().trim())
                + " "
                + (user.getName() == null ? "" : user.getName().trim());
        String normalized = full.trim();
        return normalized.isBlank() ? "User " + user.getId() : normalized;
    }

    // Simple value record
    private record ParticipantInfo(String name, String email) {}
}