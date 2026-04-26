package org.example.eventpi.dto;

import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Data
@Builder
public class FeedbackStatsResponse {
    private double averageRating;
    private long totalCount;
    private Map<Integer, Long> distribution; // star → count  (keys 1–5)
}
