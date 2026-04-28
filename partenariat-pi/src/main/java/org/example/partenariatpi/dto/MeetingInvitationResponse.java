package org.example.partenariatpi.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MeetingInvitationResponse {
    private Long id;
    private Integer partenaireId;
    private Integer senderUserId;
    private Integer targetUserId;
    private String senderRole;
    private String priority;

    /** Current workflow status: PENDING | ACCEPTED | REJECTED | TIME_SUGGESTED */
    private String meetingStatus;

    private String partenaireEmail;
    private String partenaireContactName;
    private LocalDateTime suggestedDateTime;

    /** Alternative date/time proposed by the partner (set when meetingStatus = TIME_SUGGESTED) */
    private LocalDateTime suggestedDateTimeByPartner;

    /** Comment from partner (rejection reason or note on suggested time) */
    private String partnerComment;

    private LocalDateTime createdAt;
    private LocalDateTime respondedAt;

    // Zoom fields — only populated after ACCEPTED
    private String zoomMeetingId;
    private String zoomJoinUrl;
    private String zoomStartUrl;
    private String zoomPassword;

    private String message;
}