package org.example.partenariatpi.service;

import lombok.RequiredArgsConstructor;
import org.example.partenariatpi.dto.*;
import org.example.partenariatpi.enums.MeetingPriority;
import org.example.partenariatpi.enums.MeetingStatus;
import org.example.partenariatpi.feign.UserClient;
import org.example.partenariatpi.feign.UserDto;
import org.example.partenariatpi.model.MeetingInvitation;
import org.example.partenariatpi.model.OrganisationPartenaire;
import org.example.partenariatpi.repository.MeetingInvitationRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MeetingInvitationService {

    private static final DateTimeFormatter DATE_FMT = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

    private final JavaMailSender mailSender;
    private final OrganisationPartenaireService organisationPartenaireService;
    private final ZoomMeetingService zoomMeetingService;
    private final UserClient userClient;
    private final MeetingInvitationRepository meetingInvitationRepository;

    @Value("${spring.mail.username}")
    private String senderEmail;

    // ──────────────────────────────────────────────────────────────────────────
    // CREATE  — sends a request; Zoom is NOT created yet
    // ──────────────────────────────────────────────────────────────────────────

    public MeetingInvitationResponse sendMeetingInvitation(
            Integer partenaireId, MeetingInvitationRequest request,
            String senderRole, Integer senderUserId) {
        return createPartenaireRequest(partenaireId, request, senderRole, senderUserId, MeetingPriority.NORMAL);
    }

    public MeetingInvitationResponse sendEmergencyMeetingToPartenaire(
            Integer partenaireId, MeetingInvitationRequest request,
            String senderRole, Integer senderUserId) {
        return createPartenaireRequest(partenaireId, request, senderRole, senderUserId, MeetingPriority.EMERGENCY);
    }

    public MeetingInvitationResponse sendMeetingInvitationToUser(
            Integer targetUserId, MeetingInvitationRequest request,
            String senderRole, Integer senderUserId) {
        return createUserRequest(targetUserId, request, senderRole, senderUserId, MeetingPriority.NORMAL);
    }

    public MeetingInvitationResponse sendEmergencyMeetingToUser(
            Integer targetUserId, MeetingInvitationRequest request,
            String senderRole, Integer senderUserId) {
        return createUserRequest(targetUserId, request, senderRole, senderUserId, MeetingPriority.EMERGENCY);
    }

    // ──────────────────────────────────────────────────────────────────────────
    // READ
    // ──────────────────────────────────────────────────────────────────────────

    public List<MeetingInvitationResponse> getMyMeetings(String senderRole, Integer senderUserId) {
        if ("ROLE_ADMIN".equals(senderRole)) {
            return meetingInvitationRepository.findAllByOrderBySuggestedDateTimeDesc()
                    .stream().map(this::mapToResponse).toList();
        }

        if (senderUserId == null) throw new RuntimeException("X-User-Id header is required");

        if ("ROLE_PARTNER".equals(senderRole)) {
            OrganisationPartenaire myOrg = organisationPartenaireService.findByUserId(senderUserId);
            return meetingInvitationRepository
                    .findByPartenaireIdOrderBySuggestedDateTimeDesc(myOrg.getId())
                    .stream().map(this::mapToResponse).toList();
        }

        return meetingInvitationRepository
                .findBySenderUserIdOrTargetUserIdOrderBySuggestedDateTimeDesc(senderUserId, senderUserId)
                .stream().map(this::mapToResponse).toList();
    }

    public List<MeetingInvitationResponse> getPendingMeetingsForPartner(Integer partnerUserId) {
        if (partnerUserId == null) throw new RuntimeException("X-User-Id header is required");
        OrganisationPartenaire myOrg = organisationPartenaireService.findByUserId(partnerUserId);
        return meetingInvitationRepository
                .findByPartenaireIdAndMeetingStatusOrderBySuggestedDateTimeDesc(
                        myOrg.getId(), MeetingStatus.PENDING)
                .stream().map(this::mapToResponse).toList();
    }

    // ──────────────────────────────────────────────────────────────────────────
    // PARTNER RESPONSE
    // ──────────────────────────────────────────────────────────────────────────

    public MeetingInvitationResponse respondToMeeting(
            Long invitationId, PartnerResponseRequest request, Integer partnerUserId) {

        MeetingInvitation inv = meetingInvitationRepository.findById(invitationId)
                .orElseThrow(() -> new RuntimeException("Meeting invitation not found: " + invitationId));

        if (inv.getMeetingStatus() != MeetingStatus.PENDING
                && inv.getMeetingStatus() != MeetingStatus.TIME_SUGGESTED) {
            throw new RuntimeException(
                    "Cannot respond to a meeting that is already " + inv.getMeetingStatus());
        }

        String action = request.getAction().toUpperCase();
        inv.setRespondedAt(LocalDateTime.now());

        switch (action) {
            case "ACCEPT" -> {
                // Create the Zoom meeting NOW
                ZoomMeetingService.ZoomMeetingData zoom = zoomMeetingService.createMeeting(
                        inv.getSubject(),
                        inv.getSuggestedDateTime(),
                        inv.getDurationMinutes(),
                        inv.getNote()
                );
                inv.setZoomMeetingId(zoom.meetingId());
                inv.setZoomJoinUrl(zoom.joinUrl());
                inv.setZoomStartUrl(zoom.startUrl());
                inv.setZoomPassword(zoom.password());
                inv.setMeetingStatus(MeetingStatus.ACCEPTED);
                inv.setPartnerComment(request.getComment());

                // Notify the original requester
                notifyRequesterAccepted(inv, zoom);
            }

            case "REJECT" -> {
                if (!StringUtils.hasText(request.getComment())) {
                    throw new RuntimeException("A reason is required when rejecting a meeting request");
                }
                inv.setMeetingStatus(MeetingStatus.REJECTED);
                inv.setPartnerComment(request.getComment());

                // Notify the original requester
                notifyRequesterRejected(inv);
            }

            case "SUGGEST_TIME" -> {
                if (request.getSuggestedDateTime() == null) {
                    throw new RuntimeException("suggestedDateTime is required when suggesting a new time");
                }
                if (request.getSuggestedDateTime().isBefore(LocalDateTime.now())) {
                    throw new RuntimeException("The suggested date/time must be in the future");
                }
                inv.setMeetingStatus(MeetingStatus.TIME_SUGGESTED);
                inv.setSuggestedDateTimeByPartner(request.getSuggestedDateTime());
                inv.setPartnerComment(request.getComment());

                // Notify the original requester
                notifyRequesterTimeSuggested(inv);
            }

            default -> throw new RuntimeException("Unknown action: " + action + ". Use ACCEPT, REJECT or SUGGEST_TIME");
        }

        MeetingInvitation saved = meetingInvitationRepository.save(inv);
        MeetingInvitationResponse response = mapToResponse(saved);
        response.setMessage(buildPartnerResponseMessage(action));
        return response;
    }

    // ──────────────────────────────────────────────────────────────────────────
    // USER UPDATES TIME  (after TIME_SUGGESTED)
    // ──────────────────────────────────────────────────────────────────────────

    public MeetingInvitationResponse updateMeetingTime(
            Long invitationId, UpdateMeetingTimeRequest request, Integer senderUserId) {

        MeetingInvitation inv = meetingInvitationRepository.findById(invitationId)
                .orElseThrow(() -> new RuntimeException("Meeting invitation not found: " + invitationId));

        if (inv.getMeetingStatus() != MeetingStatus.TIME_SUGGESTED
                && inv.getMeetingStatus() != MeetingStatus.REJECTED) {
            throw new RuntimeException(
                    "You can only update the time when the status is TIME_SUGGESTED or REJECTED");
        }

        // Verify the caller is the original sender
        if (!inv.getSenderUserId().equals(senderUserId)) {
            throw new RuntimeException("Only the original requester can update the meeting time");
        }

        inv.setSuggestedDateTime(request.getNewSuggestedDateTime());
        if (StringUtils.hasText(request.getNote())) {
            inv.setNote(request.getNote());
        }
        // Clear partner fields and put it back in PENDING
        inv.setMeetingStatus(MeetingStatus.PENDING);
        inv.setSuggestedDateTimeByPartner(null);
        inv.setPartnerComment(null);
        inv.setRespondedAt(null);

        // Re-notify the partner
        notifyPartnerNewRequest(inv);

        MeetingInvitation saved = meetingInvitationRepository.save(inv);
        MeetingInvitationResponse response = mapToResponse(saved);
        response.setMessage("Meeting request updated and sent back to the partner for review.");
        return response;
    }

    // ──────────────────────────────────────────────────────────────────────────
    // PRIVATE — CREATE helpers
    // ──────────────────────────────────────────────────────────────────────────

    private MeetingInvitationResponse createPartenaireRequest(
            Integer partenaireId, MeetingInvitationRequest request,
            String senderRole, Integer senderUserId, MeetingPriority priority) {

        OrganisationPartenaire partenaire = organisationPartenaireService.findById(partenaireId);
        if (!StringUtils.hasText(partenaire.getContactEmail())) {
            throw new RuntimeException("Partner contact email is missing");
        }

        String requesterName = resolveRequesterName(request.getRequesterName(), senderUserId);

        MeetingInvitation inv = buildInvitation(request, senderRole, senderUserId,
                null, partenaireId,
                partenaire.getContactEmail(), partenaire.getContactNom(), priority);

        MeetingInvitation saved = meetingInvitationRepository.save(inv);

        // Notify partner by email (no Zoom link yet — they need to accept first)
        sendRequestEmail(
                partenaire.getContactEmail(),
                partenaire.getContactNom(),
                request, senderRole, requesterName, priority,
                "You have received a new meeting request. Please log in to the platform to accept, reject, or suggest a new time."
        );

        MeetingInvitationResponse response = mapToResponse(saved);
        response.setMessage("Meeting request sent. Waiting for the partner's response.");
        return response;
    }

    private MeetingInvitationResponse createUserRequest(
            Integer targetUserId, MeetingInvitationRequest request,
            String senderRole, Integer senderUserId, MeetingPriority priority) {

        if (senderUserId == null) throw new RuntimeException("X-User-Id header is required");

        OrganisationPartenaire myOrg = organisationPartenaireService.findByUserId(senderUserId);
        UserDto targetUser = userClient.getUserById(targetUserId);
        String recipientEmail = targetUser.getEmail();
        if (!StringUtils.hasText(recipientEmail)) throw new RuntimeException("Target user email is missing");

        String requesterName = resolveRequesterName(request.getRequesterName(), senderUserId);

        MeetingInvitation inv = buildInvitation(request, senderRole, senderUserId,
                targetUserId, myOrg.getId(),
                recipientEmail, buildUserDisplayName(targetUser), priority);

        MeetingInvitation saved = meetingInvitationRepository.save(inv);

        sendRequestEmail(
                recipientEmail,
                buildUserDisplayName(targetUser),
                request, senderRole, requesterName, priority,
                "You have received a new meeting request from " + myOrg.getNom() + ". Please log in to the platform to respond."
        );

        MeetingInvitationResponse response = mapToResponse(saved);
        response.setMessage("Meeting request sent. Waiting for the recipient's response.");
        return response;
    }

    private MeetingInvitation buildInvitation(
            MeetingInvitationRequest request, String senderRole, Integer senderUserId,
            Integer targetUserId, Integer partenaireId,
            String recipientEmail, String recipientName, MeetingPriority priority) {

        MeetingInvitation inv = new MeetingInvitation();
        inv.setRequesterName(request.getRequesterName());
        inv.setSubject(request.getSubject());
        inv.setSuggestedDateTime(request.getSuggestedDateTime());
        inv.setDurationMinutes(request.getDurationMinutes() == null ? 30 : request.getDurationMinutes());
        inv.setNote(request.getNote());
        inv.setSenderRole(senderRole);
        inv.setSenderUserId(senderUserId);
        inv.setTargetUserId(targetUserId);
        inv.setPartenaireId(partenaireId);
        inv.setPriority(priority);
        inv.setMeetingStatus(MeetingStatus.PENDING);
        inv.setRecipientEmail(recipientEmail);
        inv.setRecipientName(recipientName);
        inv.setCreatedAt(LocalDateTime.now());
        return inv;
    }

    // ──────────────────────────────────────────────────────────────────────────
    // PRIVATE — Email helpers
    // ──────────────────────────────────────────────────────────────────────────

    private void sendRequestEmail(String to, String toName,
                                  MeetingInvitationRequest req, String senderRole, String requesterName,
                                  MeetingPriority priority, String platformNote) {

        String subject = priority == MeetingPriority.EMERGENCY
                ? "[URGENT] Meeting request: " + req.getSubject()
                : "Meeting request: " + req.getSubject();

        StringBuilder body = new StringBuilder();
        body.append("Hello ").append(toName).append(",\n\n")
                .append(requesterName).append(" (").append(senderRole)
                .append(") is requesting a meeting with you.\n\n")
                .append("Subject: ").append(req.getSubject()).append("\n")
                .append("Proposed date/time: ").append(req.getSuggestedDateTime().format(DATE_FMT)).append("\n")
                .append("Duration: ").append(req.getDurationMinutes() == null ? 30 : req.getDurationMinutes())
                .append(" minutes\n");

        if (StringUtils.hasText(req.getNote())) {
            body.append("\nNote:\n").append(req.getNote()).append("\n");
        }

        body.append("\n").append(platformNote).append("\n\nBest regards,\nPartenariat Team");

        sendEmail(to, subject, body.toString());
    }

    private void notifyRequesterAccepted(MeetingInvitation inv, ZoomMeetingService.ZoomMeetingData zoom) {
        if (inv.getSenderUserId() == null) return;
        try {
            UserDto sender = userClient.getUserById(inv.getSenderUserId());
            if (!StringUtils.hasText(sender.getEmail())) return;

            String body = "Hello " + buildUserDisplayName(sender) + ",\n\n"
                    + "Your meeting request \"" + inv.getSubject() + "\" has been ACCEPTED.\n\n"
                    + "Date: " + inv.getSuggestedDateTime().format(DATE_FMT) + "\n"
                    + "Zoom Meeting ID: " + zoom.meetingId() + "\n"
                    + "Join URL: " + zoom.joinUrl() + "\n\n"
                    + "You can also join directly from the platform.\n\nBest regards,\nPartenariat Team";

            sendEmail(sender.getEmail(), "Meeting accepted: " + inv.getSubject(), body);
        } catch (Exception e) {
            // Non-blocking: log and continue
            System.err.println("[MeetingInvitationService] Failed to notify requester of acceptance: " + e.getMessage());
        }
    }

    private void notifyRequesterRejected(MeetingInvitation inv) {
        if (inv.getSenderUserId() == null) return;
        try {
            UserDto sender = userClient.getUserById(inv.getSenderUserId());
            if (!StringUtils.hasText(sender.getEmail())) return;

            String body = "Hello " + buildUserDisplayName(sender) + ",\n\n"
                    + "Your meeting request \"" + inv.getSubject() + "\" has been REJECTED.\n\n"
                    + "Reason: " + inv.getPartnerComment() + "\n\n"
                    + "You may submit a new request from the platform.\n\nBest regards,\nPartenariat Team";

            sendEmail(sender.getEmail(), "Meeting rejected: " + inv.getSubject(), body);
        } catch (Exception e) {
            System.err.println("[MeetingInvitationService] Failed to notify requester of rejection: " + e.getMessage());
        }
    }

    private void notifyRequesterTimeSuggested(MeetingInvitation inv) {
        if (inv.getSenderUserId() == null) return;
        try {
            UserDto sender = userClient.getUserById(inv.getSenderUserId());
            if (!StringUtils.hasText(sender.getEmail())) return;

            String body = "Hello " + buildUserDisplayName(sender) + ",\n\n"
                    + "The partner has suggested a new time for your meeting \"" + inv.getSubject() + "\".\n\n"
                    + "Proposed alternative: " + inv.getSuggestedDateTimeByPartner().format(DATE_FMT) + "\n"
                    + (StringUtils.hasText(inv.getPartnerComment())
                    ? "Partner note: " + inv.getPartnerComment() + "\n" : "")
                    + "\nPlease log in to the platform to accept the new time or propose another one.\n\nBest regards,\nPartenariat Team";

            sendEmail(sender.getEmail(), "New time proposed for: " + inv.getSubject(), body);
        } catch (Exception e) {
            System.err.println("[MeetingInvitationService] Failed to notify requester of time suggestion: " + e.getMessage());
        }
    }

    private void notifyPartnerNewRequest(MeetingInvitation inv) {
        if (!StringUtils.hasText(inv.getRecipientEmail())) return;
        try {
            String body = "Hello " + inv.getRecipientName() + ",\n\n"
                    + "The requester has updated their meeting request \"" + inv.getSubject() + "\" with a new proposed time.\n\n"
                    + "New proposed date/time: " + inv.getSuggestedDateTime().format(DATE_FMT) + "\n"
                    + (StringUtils.hasText(inv.getNote()) ? "Note: " + inv.getNote() + "\n" : "")
                    + "\nPlease log in to the platform to respond.\n\nBest regards,\nPartenariat Team";

            sendEmail(inv.getRecipientEmail(), "Updated meeting request: " + inv.getSubject(), body);
        } catch (Exception e) {
            System.err.println("[MeetingInvitationService] Failed to notify partner of updated time: " + e.getMessage());
        }
    }

    private void sendEmail(String to, String subject, String body) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setFrom(senderEmail);
        mail.setTo(to);
        mail.setSubject(subject);
        mail.setText(body);
        mailSender.send(mail);
    }

    // ──────────────────────────────────────────────────────────────────────────
    // PRIVATE — Mapping
    // ──────────────────────────────────────────────────────────────────────────

    private MeetingInvitationResponse mapToResponse(MeetingInvitation inv) {
        MeetingInvitationResponse r = new MeetingInvitationResponse();
        r.setId(inv.getId());
        r.setPartenaireId(inv.getPartenaireId());
        r.setSenderUserId(inv.getSenderUserId());
        r.setTargetUserId(inv.getTargetUserId());
        r.setSenderRole(inv.getSenderRole());
        r.setPriority(inv.getPriority() == null ? null : inv.getPriority().name());
        r.setMeetingStatus(inv.getMeetingStatus() == null ? null : inv.getMeetingStatus().name());
        r.setPartenaireEmail(inv.getRecipientEmail());
        r.setPartenaireContactName(inv.getRecipientName());
        r.setSuggestedDateTime(inv.getSuggestedDateTime());
        r.setSuggestedDateTimeByPartner(inv.getSuggestedDateTimeByPartner());
        r.setPartnerComment(inv.getPartnerComment());
        r.setCreatedAt(inv.getCreatedAt());
        r.setRespondedAt(inv.getRespondedAt());
        r.setZoomMeetingId(inv.getZoomMeetingId());
        r.setZoomJoinUrl(inv.getZoomJoinUrl());
        r.setZoomStartUrl(inv.getZoomStartUrl());
        r.setZoomPassword(inv.getZoomPassword());
        // Legacy field kept for backward-compat
        r.setMessage(null);
        return r;
    }

    // ──────────────────────────────────────────────────────────────────────────
    // PRIVATE — Misc helpers
    // ──────────────────────────────────────────────────────────────────────────

    private String buildPartnerResponseMessage(String action) {
        return switch (action) {
            case "ACCEPT" -> "Meeting accepted. Zoom meeting has been created and the requester has been notified.";
            case "REJECT" -> "Meeting request rejected. The requester has been notified.";
            case "SUGGEST_TIME" -> "Alternative time suggested. The requester has been notified.";
            default -> "Response recorded.";
        };
    }

    private String buildUserDisplayName(UserDto user) {
        String full = (user.getPrenom() == null ? "" : user.getPrenom().trim())
                + " "
                + (user.getName() == null ? "" : user.getName().trim());
        String normalized = full.trim();
        return normalized.isBlank() ? ("User " + user.getId()) : normalized;
    }

    private String resolveRequesterName(String requesterName, Integer senderUserId) {
        if (StringUtils.hasText(requesterName)) return requesterName;
        if (senderUserId == null) return "Unknown user";
        try {
            UserDto user = userClient.getUserById(senderUserId);
            String full = (user.getPrenom() == null ? "" : user.getPrenom().trim())
                    + " "
                    + (user.getName() == null ? "" : user.getName().trim());
            return full.trim().isBlank() ? "User " + senderUserId : full.trim();
        } catch (Exception ex) {
            return "User " + senderUserId;
        }
    }
}