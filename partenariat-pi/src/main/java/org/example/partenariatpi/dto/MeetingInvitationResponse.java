package org.example.partenariatpi.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MeetingInvitationResponse {
    private Integer partenaireId;
    private String partenaireEmail;
    private String partenaireContactName;
    private LocalDateTime suggestedDateTime;
    private String zoomMeetingId;
    private String zoomJoinUrl;
    private String zoomStartUrl;
    private String zoomPassword;
    private String status;
    private String message;
}


