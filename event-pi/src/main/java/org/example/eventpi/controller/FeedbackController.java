package org.example.eventpi.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.eventpi.dto.FeedbackRequest;
import org.example.eventpi.dto.FeedbackResponse;
import org.example.eventpi.dto.FeedbackStatsResponse;
import org.example.eventpi.service.FeedbackService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/events/{eventId}/feedback")
@RequiredArgsConstructor
public class FeedbackController {

    private final FeedbackService feedbackService;

    // POST /api/events/{eventId}/feedback
    @PostMapping
    public ResponseEntity<FeedbackResponse> submit(
            @PathVariable Long eventId,
            @RequestBody @Valid FeedbackRequest request,
            @RequestHeader("X-User-Id") String userId,
            @RequestHeader(value = "X-User-Name", defaultValue = "Anonymous") String userName) {

        FeedbackResponse response = feedbackService.submit(
                eventId, Integer.parseInt(userId), userName, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // GET /api/events/{eventId}/feedback
    @GetMapping
    public ResponseEntity<List<FeedbackResponse>> list(
            @PathVariable Long eventId,
            @RequestHeader(value = "X-User-Id", required = false) String userId) {

        Integer uid = userId != null ? Integer.parseInt(userId) : null;
        return ResponseEntity.ok(feedbackService.getByEvent(eventId, uid));
    }

    // GET /api/events/{eventId}/feedback/stats
    @GetMapping("/stats")
    public ResponseEntity<FeedbackStatsResponse> stats(@PathVariable Long eventId) {
        return ResponseEntity.ok(feedbackService.getStats(eventId));
    }

    // GET /api/events/{eventId}/feedback/eligibility
    @GetMapping("/eligibility")
    public ResponseEntity<Map<String, Boolean>> eligibility(
            @PathVariable Long eventId,
            @RequestHeader("X-User-Id") String userId) {

        int uid = Integer.parseInt(userId);
        return ResponseEntity.ok(Map.of(
                "canSubmit", feedbackService.canSubmit(eventId, uid),
                "hasSubmitted", feedbackService.hasSubmitted(eventId, uid)
        ));
    }
}
