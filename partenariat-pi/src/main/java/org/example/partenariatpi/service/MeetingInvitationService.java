package org.example.partenariatpi.service;

import lombok.RequiredArgsConstructor;
import org.example.partenariatpi.dto.MeetingInvitationRequest;
import org.example.partenariatpi.dto.MeetingInvitationResponse;
import org.example.partenariatpi.feign.UserClient;
import org.example.partenariatpi.feign.UserDto;
import org.example.partenariatpi.model.OrganisationPartenaire;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class MeetingInvitationService {

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

    private final JavaMailSender mailSender;
    private final OrganisationPartenaireService organisationPartenaireService;
    private final ZoomMeetingService zoomMeetingService;
    private final UserClient userClient;

    @Value("${spring.mail.username}")
    private String senderEmail;

    public MeetingInvitationResponse sendMeetingInvitation(
            Integer partenaireId,
            MeetingInvitationRequest request,
            String senderRole,
            Integer senderUserId
    ) {
        OrganisationPartenaire partenaire = organisationPartenaireService.findById(partenaireId);
        String requesterName = resolveRequesterName(request.getRequesterName(), senderUserId);

        ZoomMeetingService.ZoomMeetingData zoomMeeting = zoomMeetingService.createMeeting(
                request.getSubject(),
                request.getSuggestedDateTime(),
                request.getDurationMinutes(),
                request.getNote()
        );

        if (partenaire.getContactEmail() == null || partenaire.getContactEmail().isBlank()) {
            throw new RuntimeException("Partner contact email is missing");
        }

        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setFrom(senderEmail);
        mail.setTo(partenaire.getContactEmail());
        mail.setSubject(request.getSubject());
        mail.setText(buildMailBody(partenaire, request, senderRole, requesterName));

        mailSender.send(mail);

        MeetingInvitationResponse response = new MeetingInvitationResponse();
        response.setPartenaireId(partenaire.getId());
        response.setPartenaireEmail(partenaire.getContactEmail());
        response.setPartenaireContactName(partenaire.getContactNom());
        response.setSuggestedDateTime(request.getSuggestedDateTime());
        response.setZoomMeetingId(zoomMeeting.meetingId());
        response.setZoomJoinUrl(zoomMeeting.joinUrl());
        response.setZoomStartUrl(zoomMeeting.startUrl());
        response.setZoomPassword(zoomMeeting.password());
        response.setStatus("SENT");
        response.setMessage("Meeting invitation email was sent and Zoom meeting was created");
        return response;
    }

    private String buildMailBody(
            OrganisationPartenaire partenaire,
            MeetingInvitationRequest request,
            String senderRole,
            String requesterName
    ) {
        String partnerName = (partenaire.getContactNom() == null || partenaire.getContactNom().isBlank())
                ? "Partner"
                : partenaire.getContactNom();

        StringBuilder text = new StringBuilder();
        text.append("Hello ").append(partnerName).append(",\n\n")
                .append("User ").append(requesterName)
                .append(" wants to have an online Zoom meeting with you.\n")
                .append("Suggested date: ")
                .append(request.getSuggestedDateTime().format(DATE_FORMATTER))
                .append("\n")
                .append("The meeting is managed inside the platform (no link by email).\n");

        if (request.getNote() != null && !request.getNote().isBlank()) {
            text.append("\nMessage:\n").append(request.getNote()).append("\n");
        }

        text.append("\nSender role: ").append(senderRole)
                .append("\n\nBest regards,")
                .append("\nPartenariat Team");

        return text.toString();
    }

    private String resolveRequesterName(String requesterName, Integer senderUserId) {
        if (StringUtils.hasText(requesterName)) {
            return requesterName;
        }

        if (senderUserId == null) {
            return "Unknown user";
        }

        try {
            UserDto user = userClient.getUserById(senderUserId);
            String fullName = (user.getPrenom() == null ? "" : user.getPrenom().trim())
                    + " "
                    + (user.getName() == null ? "" : user.getName().trim());
            return fullName.trim().isBlank() ? "User " + senderUserId : fullName.trim();
        } catch (Exception ex) {
            return "User " + senderUserId;
        }
    }
}


