package org.example.eventpi.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.eventpi.dto.UserResponse;
import org.example.eventpi.feign.UserClient;
import org.example.eventpi.model.Event;
import org.example.eventpi.model.EventRegistration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    private final JavaMailSender mailSender;
    private final UserClient userClient;

    @Value("${app.name}")
    private String appName;

    @Value("${app.frontend-url}")
    private String frontendUrl;

    // ── REGISTRATION CONFIRMED ────────────────────────────────────────────
    @Async
    public void sendRegistrationConfirmed(String toEmail,
                                          String userName,
                                          EventRegistration registration) {
        Event event = registration.getEvent();
        String subject = "✅ Inscription confirmée — " + event.getTitle();
        String body = buildRegistrationConfirmedHtml(
                userName, event, registration);
        sendHtml(toEmail, subject, body);
    }

    // ── WAITLIST NOTIFICATION ─────────────────────────────────────────────
    @Async
    public void sendWaitlistNotification(String toEmail,
                                         String userName,
                                         EventRegistration registration) {
        Event event = registration.getEvent();
        String subject = "⏳ Liste d'attente — " + event.getTitle();
        String body = buildWaitlistHtml(userName, event);
        sendHtml(toEmail, subject, body);
    }

    // ── PROMOTED FROM WAITLIST ────────────────────────────────────────────
    @Async
    public void sendWaitlistPromotion(String toEmail,
                                      String userName,
                                      EventRegistration registration) {
        Event event = registration.getEvent();
        String subject = "🎉 Vous êtes inscrit(e) — " + event.getTitle();
        String body = buildPromotionHtml(userName, event, registration);
        sendHtml(toEmail, subject, body);
    }

    // ── CANCELLATION CONFIRMED ────────────────────────────────────────────
    @Async
    public void sendCancellationConfirmed(String toEmail,
                                          String userName,
                                          Event event) {
        String subject = "❌ Inscription annulée — " + event.getTitle();
        String body = buildCancellationHtml(userName, event);
        sendHtml(toEmail, subject, body);
    }

    // ── HTML BUILDERS ─────────────────────────────────────────────────────
    private String buildRegistrationConfirmedHtml(String userName,
                                                  Event event,
                                                  EventRegistration reg) {
        return baseTemplate(
                "Inscription confirmée !",
                "Bonjour " + userName + ",",
                "Votre inscription à l'événement <strong>" + event.getTitle() +
                        "</strong> est confirmée.",
                buildEventDetails(event),
                "Voir l'événement",
                frontendUrl + "/events/" + event.getId()
        );
    }

    private String buildWaitlistHtml(String userName, Event event) {
        return baseTemplate(
                "Liste d'attente",
                "Bonjour " + userName + ",",
                "L'événement <strong>" + event.getTitle() +
                        "</strong> est complet. Vous êtes sur la liste d'attente et " +
                        "serez automatiquement inscrit(e) si une place se libère.",
                buildEventDetails(event),
                "Voir l'événement",
                frontendUrl + "/events/" + event.getId()
        );
    }

    private String buildPromotionHtml(String userName,
                                      Event event,
                                      EventRegistration reg) {
        return baseTemplate(
                "🎉 Une place s'est libérée !",
                "Bonjour " + userName + ",",
                "Bonne nouvelle ! Une place s'est libérée pour <strong>" +
                        event.getTitle() + "</strong>. Vous êtes maintenant inscrit(e).",
                buildEventDetails(event),
                "Voir mon inscription",
                frontendUrl + "/events/" + event.getId()
        );
    }

    private String buildCancellationHtml(String userName, Event event) {
        return baseTemplate(
                "Inscription annulée",
                "Bonjour " + userName + ",",
                "Votre inscription à <strong>" + event.getTitle() +
                        "</strong> a été annulée avec succès.",
                "",
                "Voir d'autres événements",
                frontendUrl + "/events"
        );
    }

    private String buildEventDetails(Event event) {
        StringBuilder sb = new StringBuilder();
        sb.append("<div style='background:#f0f6ff;border-radius:8px;" +
                "padding:16px;margin:16px 0;'>");
        sb.append("<p style='margin:0 0 8px;font-size:13px;color:#4b6890'>");
        sb.append("<strong>Type:</strong> ").append(event.getType());
        sb.append("</p>");
        if (event.getStartDate() != null) {
            sb.append("<p style='margin:0 0 8px;font-size:13px;color:#4b6890'>");
            sb.append("<strong>Date:</strong> ")
                    .append(event.getStartDate().toString().replace("T", " à "));
            sb.append("</p>");
        }
        if (event.getLocationType() != null) {
            sb.append("<p style='margin:0;font-size:13px;color:#4b6890'>");
            sb.append("<strong>Format:</strong> ").append(event.getLocationType());
            sb.append("</p>");
        }
        sb.append("</div>");
        return sb.toString();
    }

    private String baseTemplate(String heading, String greeting,
                                String message, String details,
                                String btnText, String btnUrl) {
        return """
            <div style="font-family:'Inter',sans-serif;max-width:560px;
                        margin:0 auto;padding:32px 24px;color:#1e3a6e;">
              <div style="margin-bottom:24px;">
                <span style="font-size:20px;font-weight:700;">%s</span>
              </div>
              <p style="font-size:15px;margin:0 0 8px;">%s</p>
              <p style="font-size:14px;color:#5a7396;line-height:1.7;margin:0 0 16px;">%s</p>
              %s
              <a href="%s"
                 style="display:inline-block;background:#1e3a6e;color:#fff;
                        padding:12px 24px;border-radius:8px;text-decoration:none;
                        font-size:14px;font-weight:500;margin-top:8px;">%s</a>
              <p style="font-size:12px;color:#8aaace;margin-top:32px;">
                L'équipe %s
              </p>
            </div>
            """.formatted(heading, greeting, message, details,
                btnUrl, btnText, appName);
    }

    private void sendHtml(String to, String subject, String htmlBody) {
        try {
            MimeMessage msg = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(msg, true, "UTF-8");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlBody, true);
            mailSender.send(msg);
            log.info("Email sent to {} — {}", to, subject);
        } catch (Exception e) {
            log.error("Failed to send email to {}: {}", to, e.getMessage());
        }
    }
    @Async
    public void sendEventApproved(Integer organizerId, Event event) {
        try {
            UserResponse user = userClient.getUserById(organizerId);
            String subject = "✅ Événement approuvé — " + event.getTitle();
            String body = baseTemplate(
                    "Votre événement est approuvé !",
                    "Bonjour " + user.getName() + ",",
                    "Votre événement <strong>" + event.getTitle() +
                            "</strong> a été approuvé par notre équipe. " +
                            "Vous pouvez maintenant le publier.",
                    "",
                    "Publier l'événement",
                    frontendUrl + "/events/" + event.getId()
            );
            sendHtml(user.getEmail(), subject, body);
        } catch (Exception e) {
            log.error("Could not send approval email: {}", e.getMessage());
        }
    }

    // ── EVENT REJECTED ────────────────────────────────────────────────────
    @Async
    public void sendEventRejected(Integer organizerId, Event event,
                                  String reason) {
        try {
            UserResponse user = userClient.getUserById(organizerId);
            String subject = "❌ Événement rejeté — " + event.getTitle();
            String details = "<div style='background:#fef2f2;border-radius:8px;" +
                    "padding:16px;margin:16px 0;border-left:4px solid #dc2626;'>" +
                    "<p style='margin:0;font-size:13px;color:#b91c1c'>" +
                    "<strong>Motif:</strong> " + reason + "</p></div>";
            String body = baseTemplate(
                    "Votre événement a été rejeté",
                    "Bonjour " + user.getName() + ",",
                    "Votre événement <strong>" + event.getTitle() +
                            "</strong> n'a pas été approuvé. " +
                            "Vous pouvez le modifier et le soumettre à nouveau.",
                    details,
                    "Modifier l'événement",
                    frontendUrl + "/events/" + event.getId() + "/edit"
            );
            sendHtml(user.getEmail(), subject, body);
        } catch (Exception e) {
            log.error("Could not send rejection email: {}", e.getMessage());
        }
    }
}