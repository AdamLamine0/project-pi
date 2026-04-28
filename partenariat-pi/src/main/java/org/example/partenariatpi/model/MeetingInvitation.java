package org.example.partenariatpi.model;

import jakarta.persistence.*;
import lombok.*;
import org.example.partenariatpi.enums.MeetingPriority;
import org.example.partenariatpi.enums.MeetingStatus;

import java.time.LocalDateTime;

@Entity
@Table(name = "meeting_invitation")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class MeetingInvitation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String requesterName;
    private String subject;
    private LocalDateTime suggestedDateTime;
    private Integer durationMinutes;

    @Column(length = 2000)
    private String note;

    // ROLE_USER, ROLE_PARTNER, ROLE_ADMIN
    private String senderRole;

    // User ID from JWT header for the sender.
    private Integer senderUserId;

    // Receiver user ID when a partner invites a user.
    private Integer targetUserId;

    // Partner organisation that is involved in this meeting.
    private Integer partenaireId;

    @Enumerated(EnumType.STRING)
    private MeetingPriority priority = MeetingPriority.NORMAL;

    @Enumerated(EnumType.STRING)
    private MeetingStatus meetingStatus = MeetingStatus.PENDING;

    // Reason given by the partner when rejecting or suggesting a new time
    @Column(length = 1000)
    private String partnerComment;

    // Alternative date/time suggested by the partner (only set when meetingStatus = TIME_SUGGESTED)
    private LocalDateTime suggestedDateTimeByPartner;

    private String recipientEmail;
    private String recipientName;

    // Only populated once the partner ACCEPTS (Zoom meeting created at that point)
    private String zoomMeetingId;

    @Column(columnDefinition = "TEXT")
    private String zoomJoinUrl;

    @Column(columnDefinition = "TEXT")
    private String zoomStartUrl;

    private String zoomPassword;

    private LocalDateTime createdAt;
    private LocalDateTime respondedAt;
}