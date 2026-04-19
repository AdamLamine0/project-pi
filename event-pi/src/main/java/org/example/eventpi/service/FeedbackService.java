package org.example.eventpi.service;

import lombok.RequiredArgsConstructor;
import org.example.eventpi.dto.FeedbackRequest;
import org.example.eventpi.dto.FeedbackResponse;
import org.example.eventpi.dto.FeedbackStatsResponse;
import org.example.eventpi.exception.EventNotFoundException;
import org.example.eventpi.exception.ForbiddenException;
import org.example.eventpi.model.Event;
import org.example.eventpi.model.EventStatus;
import org.example.eventpi.model.Feedback;
import org.example.eventpi.model.RegistrationStatus;
import org.example.eventpi.repository.EventRegistrationRepository;
import org.example.eventpi.repository.EventRepository;
import org.example.eventpi.repository.FeedbackRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final EventRepository eventRepository;
    private final EventRegistrationRepository registrationRepository;

    // ── Submit ─────────────────────────────────────────────────────────────

    @Transactional
    public FeedbackResponse submit(Long eventId, Integer userId, String userName,
                                   FeedbackRequest request) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new EventNotFoundException(eventId));

        if (event.getStatus() != EventStatus.TERMINE && event.getStatus() != EventStatus.PUBLIE) {
            throw new ForbiddenException("Feedback can only be submitted for published or terminated events.");
        }

        boolean hasRegistration = registrationRepository
                .existsByEventIdAndUserIdAndStatusNot(eventId, userId, RegistrationStatus.ANNULE);
        if (!hasRegistration) {
            throw new ForbiddenException("You must be registered for this event to leave feedback.");
        }

        if (feedbackRepository.existsByEventIdAndUserId(eventId, userId)) {
            throw new ForbiddenException("You have already submitted feedback for this event.");
        }

        Feedback saved = feedbackRepository.save(Feedback.builder()
                .event(event)
                .userId(userId)
                .userName(userName)
                .rating(request.getRating())
                .comment(request.getComment())
                .build());

        return toResponse(saved, userId);
    }

    // ── Read ───────────────────────────────────────────────────────────────

    public List<FeedbackResponse> getByEvent(Long eventId, Integer requestingUserId) {
        if (!eventRepository.existsById(eventId)) {
            throw new EventNotFoundException(eventId);
        }
        return feedbackRepository.findByEventIdOrderByCreatedAtDesc(eventId).stream()
                .map(f -> toResponse(f, requestingUserId))
                .collect(Collectors.toList());
    }

    public FeedbackStatsResponse getStats(Long eventId) {
        if (!eventRepository.existsById(eventId)) {
            throw new EventNotFoundException(eventId);
        }

        long total = feedbackRepository.countByEventId(eventId);
        Double avg = feedbackRepository.findAverageRatingByEventId(eventId);

        Map<Integer, Long> dist = new LinkedHashMap<>();
        for (int i = 1; i <= 5; i++) dist.put(i, 0L);

        feedbackRepository.findRatingDistributionByEventId(eventId)
                .forEach(row -> dist.put(((Number) row[0]).intValue(), (Long) row[1]));

        return FeedbackStatsResponse.builder()
                .totalCount(total)
                .averageRating(avg != null ? Math.round(avg * 10.0) / 10.0 : 0.0)
                .distribution(dist)
                .build();
    }

    // ── Eligibility check (for the current user) ───────────────────────────

    public boolean canSubmit(Long eventId, Integer userId) {
        Event event = eventRepository.findById(eventId).orElse(null);
        if (event == null) return false;
        if (event.getStatus() != EventStatus.TERMINE && event.getStatus() != EventStatus.PUBLIE) return false;
        if (feedbackRepository.existsByEventIdAndUserId(eventId, userId)) return false;
        return registrationRepository.existsByEventIdAndUserIdAndStatusNot(
                eventId, userId, RegistrationStatus.ANNULE);
    }

    public boolean hasSubmitted(Long eventId, Integer userId) {
        return feedbackRepository.existsByEventIdAndUserId(eventId, userId);
    }

    // ── Mapper ─────────────────────────────────────────────────────────────

    private FeedbackResponse toResponse(Feedback f, Integer requestingUserId) {
        return FeedbackResponse.builder()
                .id(f.getId())
                .eventId(f.getEvent().getId())
                .userId(f.getUserId())
                .userName(f.getUserName() != null ? f.getUserName() : "Anonymous")
                .rating(f.getRating())
                .comment(f.getComment())
                .createdAt(f.getCreatedAt())
                .own(requestingUserId != null && requestingUserId.equals(f.getUserId()))
                .build();
    }
}
