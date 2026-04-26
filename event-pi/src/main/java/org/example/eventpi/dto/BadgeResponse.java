package org.example.eventpi.dto;

import lombok.Builder;
import lombok.Data;
import org.example.eventpi.model.BadgeType;

import java.time.LocalDateTime;

@Data
@Builder
public class BadgeResponse {
    private Long id;
    private Integer userId;
    private Long eventId;
    private String eventTitle;
    private BadgeType type;
    private String label;
    private LocalDateTime earnedAt;
    private String seriesTag;
    /** Whether a PNG is available at GET /api/badges/{id}/image. */
    private boolean hasImage;
}