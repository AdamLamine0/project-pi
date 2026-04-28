package org.example.partenariatpi.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.partenariatpi.dto.*;
import org.example.partenariatpi.service.MeetingInvitationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/meeting-invitations")
@RequiredArgsConstructor
public class MeetingInvitationController {

    private final MeetingInvitationService meetingInvitationService;

    // ──────────────────────────────────────────────────────────────────────────
    // READ
    // ──────────────────────────────────────────────────────────────────────────

    @GetMapping("/my-meetings")
    public ResponseEntity<List<MeetingInvitationResponse>> getMyMeetings(
            @RequestHeader("X-User-Role") String role,
            @RequestHeader(value = "X-User-Id", required = false) String userIdRaw
    ) {
        String cleanRole = cleanRole(role);
        checkAllowedForMyMeetings(cleanRole);
        Integer userId = parseUserId(userIdRaw);
        return ResponseEntity.ok(meetingInvitationService.getMyMeetings(cleanRole, userId));
    }

    /** Returns meetings that are pending a partner response (for the partner's dashboard). */
    @GetMapping("/pending")
    public ResponseEntity<List<MeetingInvitationResponse>> getPendingMeetings(
            @RequestHeader("X-User-Role") String role,
            @RequestHeader(value = "X-User-Id", required = false) String userIdRaw
    ) {
        String cleanRole = cleanRole(role);
        checkRole(cleanRole, "ROLE_PARTNER");
        Integer userId = parseUserId(userIdRaw);
        return ResponseEntity.ok(meetingInvitationService.getPendingMeetingsForPartner(userId));
    }

    // ──────────────────────────────────────────────────────────────────────────
    // CREATE  (request only — no Zoom created yet)
    // ──────────────────────────────────────────────────────────────────────────

    @PostMapping("/partenaire/{partenaireId}")
    public ResponseEntity<MeetingInvitationResponse> sendToPartenaire(
            @PathVariable Integer partenaireId,
            @Valid @RequestBody MeetingInvitationRequest request,
            @RequestHeader("X-User-Role") String role,
            @RequestHeader(value = "X-User-Id", required = false) String userIdRaw
    ) {
        String cleanRole = cleanRole(role);
        checkAllowedForPartenaireTarget(cleanRole);
        Integer userId = parseUserId(userIdRaw);
        return ResponseEntity.ok(
                meetingInvitationService.sendMeetingInvitation(partenaireId, request, cleanRole, userId)
        );
    }

    @PostMapping("/user/{targetUserId}")
    public ResponseEntity<MeetingInvitationResponse> sendToUser(
            @PathVariable Integer targetUserId,
            @Valid @RequestBody MeetingInvitationRequest request,
            @RequestHeader("X-User-Role") String role,
            @RequestHeader(value = "X-User-Id", required = false) String userIdRaw
    ) {
        String cleanRole = cleanRole(role);
        checkRole(cleanRole, "ROLE_PARTNER");
        Integer userId = parseUserId(userIdRaw);
        return ResponseEntity.ok(
                meetingInvitationService.sendMeetingInvitationToUser(targetUserId, request, cleanRole, userId)
        );
    }

    @PostMapping("/emergency/partenaire/{partenaireId}")
    public ResponseEntity<MeetingInvitationResponse> sendEmergencyToPartenaire(
            @PathVariable Integer partenaireId,
            @Valid @RequestBody MeetingInvitationRequest request,
            @RequestHeader("X-User-Role") String role,
            @RequestHeader(value = "X-User-Id", required = false) String userIdRaw
    ) {
        String cleanRole = cleanRole(role);
        checkAllowedForPartenaireTarget(cleanRole);
        Integer userId = parseUserId(userIdRaw);
        return ResponseEntity.ok(
                meetingInvitationService.sendEmergencyMeetingToPartenaire(partenaireId, request, cleanRole, userId)
        );
    }

    @PostMapping("/emergency/user/{targetUserId}")
    public ResponseEntity<MeetingInvitationResponse> sendEmergencyToUser(
            @PathVariable Integer targetUserId,
            @Valid @RequestBody MeetingInvitationRequest request,
            @RequestHeader("X-User-Role") String role,
            @RequestHeader(value = "X-User-Id", required = false) String userIdRaw
    ) {
        String cleanRole = cleanRole(role);
        checkRole(cleanRole, "ROLE_PARTNER");
        Integer userId = parseUserId(userIdRaw);
        return ResponseEntity.ok(
                meetingInvitationService.sendEmergencyMeetingToUser(targetUserId, request, cleanRole, userId)
        );
    }

    // ──────────────────────────────────────────────────────────────────────────
    // PARTNER RESPONSE  (accept / reject / suggest time)
    // ──────────────────────────────────────────────────────────────────────────

    /**
     * Partner responds to a meeting request.
     * - ACCEPT      → Zoom meeting is created, status becomes ACCEPTED
     * - REJECT      → status becomes REJECTED (comment required)
     * - SUGGEST_TIME → status becomes TIME_SUGGESTED, requester is notified
     */
    @PostMapping("/{id}/respond")
    public ResponseEntity<MeetingInvitationResponse> respondToMeeting(
            @PathVariable Long id,
            @Valid @RequestBody PartnerResponseRequest request,
            @RequestHeader("X-User-Role") String role,
            @RequestHeader(value = "X-User-Id", required = false) String userIdRaw
    ) {
        String cleanRole = cleanRole(role);
        checkRole(cleanRole, "ROLE_PARTNER");
        Integer userId = parseUserId(userIdRaw);
        return ResponseEntity.ok(
                meetingInvitationService.respondToMeeting(id, request, userId)
        );
    }

    // ──────────────────────────────────────────────────────────────────────────
    // USER UPDATE TIME  (after partner suggested an alternative)
    // ──────────────────────────────────────────────────────────────────────────

    /**
     * Original requester updates the suggested date/time after the partner
     * proposed an alternative. Status goes back to PENDING.
     */
    @PostMapping("/{id}/update-time")
    public ResponseEntity<MeetingInvitationResponse> updateMeetingTime(
            @PathVariable Long id,
            @Valid @RequestBody UpdateMeetingTimeRequest request,
            @RequestHeader("X-User-Role") String role,
            @RequestHeader(value = "X-User-Id", required = false) String userIdRaw
    ) {
        String cleanRole = cleanRole(role);
        checkAllowedForMyMeetings(cleanRole);
        Integer userId = parseUserId(userIdRaw);
        return ResponseEntity.ok(
                meetingInvitationService.updateMeetingTime(id, request, userId)
        );
    }

    // ──────────────────────────────────────────────────────────────────────────
    // Helpers
    // ──────────────────────────────────────────────────────────────────────────

    private String cleanRole(String role) {
        if (role == null) return "";
        return role.split(",")[0].trim();
    }

    private void checkAllowedForPartenaireTarget(String role) {
        if (!"ROLE_ADMIN".equals(role) && !"ROLE_USER".equals(role)) {
            throw new RuntimeException("Access denied: ADMIN or USER role required");
        }
    }

    private void checkAllowedForMyMeetings(String role) {
        if (!"ROLE_ADMIN".equals(role) && !"ROLE_USER".equals(role) && !"ROLE_PARTNER".equals(role)) {
            throw new RuntimeException("Access denied: ADMIN, USER or PARTNER role required");
        }
    }

    private void checkRole(String role, String expectedRole) {
        if (!expectedRole.equals(role)) {
            throw new RuntimeException("Access denied: " + expectedRole + " role required");
        }
    }

    private Integer parseUserId(String userIdRaw) {
        if (userIdRaw == null || userIdRaw.isBlank()) return null;
        return Integer.parseInt(userIdRaw.split(",")[0].trim());
    }
}