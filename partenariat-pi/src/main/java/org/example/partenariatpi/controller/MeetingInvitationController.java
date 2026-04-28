package org.example.partenariatpi.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.partenariatpi.dto.MeetingInvitationRequest;
import org.example.partenariatpi.dto.MeetingInvitationResponse;
import org.example.partenariatpi.service.MeetingInvitationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/meeting-invitations")
@RequiredArgsConstructor
public class MeetingInvitationController {

    private final MeetingInvitationService meetingInvitationService;

    @PostMapping("/partenaire/{partenaireId}")
    public ResponseEntity<MeetingInvitationResponse> sendToPartenaire(
            @PathVariable Integer partenaireId,
            @Valid @RequestBody MeetingInvitationRequest request,
            @RequestHeader("X-User-Role") String role,
            @RequestHeader(value = "X-User-Id", required = false) String userIdRaw
    ) {
        String cleanRole = cleanRole(role);
        checkAllowed(cleanRole);
        Integer userId = parseUserId(userIdRaw);
        return ResponseEntity.ok(
                meetingInvitationService.sendMeetingInvitation(partenaireId, request, cleanRole, userId)
        );
    }

    private String cleanRole(String role) {
        if (role == null) {
            return "";
        }
        return role.split(",")[0].trim();
    }

    private void checkAllowed(String role) {
        if (!"ROLE_ADMIN".equals(role) && !"ROLE_USER".equals(role) && !"ROLE_ENTREPRENEUR".equals(role)) {
            throw new RuntimeException("Access denied: ADMIN or ENTREPRENEUR role required");
        }
    }

    private Integer parseUserId(String userIdRaw) {
        if (userIdRaw == null || userIdRaw.isBlank()) {
            return null;
        }
        return Integer.parseInt(userIdRaw.split(",")[0].trim());
    }
}


