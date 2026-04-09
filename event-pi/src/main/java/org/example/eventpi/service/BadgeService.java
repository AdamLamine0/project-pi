package org.example.eventpi.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.eventpi.dto.BadgeResponse;
import org.example.eventpi.feign.UserClient;
import org.example.eventpi.dto.UserResponse;
import org.example.eventpi.model.*;
import org.example.eventpi.repository.BadgeRepository;
import org.example.eventpi.repository.CertificateRepository;
import org.example.eventpi.repository.EventRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class BadgeService {

    private final BadgeRepository badgeRepository;
    private final CertificateRepository certificateRepository;
    private final CertificateService certificateService;
    private final EventRepository eventRepository;
    private final UserClient userClient;
    private final NotificationService notificationService;

    private static final int SERIES_THRESHOLD = 4;

    @Value("${app.base-url}")
    private String baseUrl;

    // ── MAIN TRIGGER — called after checkIn ──────────────────────────────
    @Transactional
    public void onAttendanceConfirmed(Integer userId, Long eventId) {
        Event event = eventRepository.findById(eventId).orElse(null);
        if (event == null) {
            log.warn("BadgeService: event {} not found", eventId);
            return;
        }

        if (badgeRepository.existsByUserIdAndEventIdAndType(
                userId, eventId, BadgeType.PARTICIPATION)) {
            log.info("Badge already issued for userId={} eventId={}", userId, eventId);
            return;
        }

        // ── 1. Resolve user info via Feign ────────────────────────────────
        String recipientName = "Participant";
        String email = null;
        try {
            UserResponse user = userClient.getUserById(userId);
            recipientName = user.getName() + " " + user.getPrenom();
            email = user.getEmail();
        } catch (Exception e) {
            log.warn("Could not fetch user info for userId {}: {}", userId, e.getMessage());
        }

        // ── 2. Create PARTICIPATION badge ─────────────────────────────────
        Badge participationBadge = Badge.builder()
                .userId(userId)
                .eventId(eventId)
                .type(BadgeType.PARTICIPATION)
                .label("Participation — " + event.getTitle())
                .seriesTag(resolveSeriesTag(event))
                .build();
        badgeRepository.save(participationBadge);
        log.info("PARTICIPATION badge issued for userId={} eventId={}", userId, eventId);

        // ── 3. Generate certificate (PDF + QR) ────────────────────────────
        Certificate cert = null;
        try {
            cert = certificateService.generateCertificate(
                    userId, recipientName, event,
                    participationBadge.getId(),
                    participationBadge.getLabel());
            log.info("Certificate generated: token={}", cert.getVerificationToken());
        } catch (Exception e) {
            log.error("Certificate generation failed for userId={}: {}",
                    userId, e.getMessage(), e);
        }

        // ── 4. Email with PDF download link ───────────────────────────────
        if (email != null && cert != null) {
            try {
                String downloadUrl = baseUrl + "/api/certificates/"
                        + cert.getId() + "/download";
                String eventTitle = event.getTitle();
                LocalDateTime eventDate = event.getStartDate();
                notificationService.sendCertificateIssued(
                        email, recipientName, eventTitle, eventDate, downloadUrl);
            } catch (Exception e) {
                log.warn("Could not send certificate email to {}: {}", email, e.getMessage());
            }
        }

        // ── 5. Check thematic series completion ───────────────────────────
        checkSeriesCompletion(userId, event, recipientName, email);
    }

    // ── SERIES COMPLETION CHECK ───────────────────────────────────────────
    private void checkSeriesCompletion(Integer userId, Event event,
                                       String recipientName, String email) {
        String seriesTag = resolveSeriesTag(event);
        if (seriesTag == null) return;

        long count = badgeRepository.countByUserIdAndSeriesTag(userId, seriesTag);
        if (count >= SERIES_THRESHOLD) {
            boolean alreadyHas = badgeRepository
                    .findByUserId(userId).stream()
                    .anyMatch(b -> b.getType() == BadgeType.SERIE_COMPLETION
                            && seriesTag.equals(b.getSeriesTag()));

            if (!alreadyHas) {
                Badge seriesBadge = Badge.builder()
                        .userId(userId)
                        .type(BadgeType.SERIE_COMPLETION)
                        .label("Série complétée — " + seriesTag)
                        .seriesTag(seriesTag)
                        .build();
                badgeRepository.save(seriesBadge);
                log.info("SERIE_COMPLETION badge issued for userId={} series={}",
                        userId, seriesTag);

                if (email != null) {
                    try {
                        notificationService.sendSeriesBadgeEarned(
                                email, recipientName, seriesTag);
                    } catch (Exception e) {
                        log.warn("Could not send series badge email: {}", e.getMessage());
                    }
                }
            }
        }
    }

    // ── SERIES TAG RESOLUTION ─────────────────────────────────────────────
    private String resolveSeriesTag(Event event) {
        if (event.getType() == null) return null;
        return switch (event.getType()) {
            case WORKSHOP   -> "WORKSHOP";
            case CONFERENCE -> "CONFERENCE";
            case BOOTCAMP   -> "BOOTCAMP";
            case WEBINAIRE  -> "WEBINAIRE";
            case PITCH      -> null;
        };
    }

    // ── READ ──────────────────────────────────────────────────────────────
    public List<BadgeResponse> getByUser(Integer userId) {
        return badgeRepository.findByUserId(userId)
                .stream().map(this::toResponse).toList();
    }

    private BadgeResponse toResponse(Badge b) {
        return BadgeResponse.builder()
                .id(b.getId())
                .userId(b.getUserId())
                .eventId(b.getEventId())
                .type(b.getType())
                .label(b.getLabel())
                .earnedAt(b.getEarnedAt())
                .seriesTag(b.getSeriesTag())
                .build();
    }
}