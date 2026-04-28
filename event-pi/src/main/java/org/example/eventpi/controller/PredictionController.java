package org.example.eventpi.controller;

import lombok.RequiredArgsConstructor;
import org.example.eventpi.dto.FullAnalysisRequest;
import org.example.eventpi.dto.FullAnalysisResponse;
import org.example.eventpi.dto.MlFullAnalysisResponse;
import org.example.eventpi.dto.PredictionInputRequest;
import org.example.eventpi.dto.RegistrationPredictionResponse;
import org.example.eventpi.dto.SuccessPredictionResponse;
import org.example.eventpi.feign.MlServiceClient;
import org.example.eventpi.model.Event;
import org.example.eventpi.model.EventType;
import org.example.eventpi.repository.EventRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.time.temporal.WeekFields;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@RestController
@RequestMapping("/api/events/predict")
@RequiredArgsConstructor
public class PredictionController {

    private final MlServiceClient mlServiceClient;
    private final EventRepository eventRepository;

    //predict count registration
    @PostMapping("/registrations")
    public ResponseEntity<RegistrationPredictionResponse> predictRegistrations(
            @RequestBody PredictionInputRequest request) {
        return ResponseEntity.ok(mlServiceClient.predictRegistrations(request));
    }

    //predict success score (0-100)
    @PostMapping("/success-score")
    public ResponseEntity<SuccessPredictionResponse> predictSuccessScore(
            @RequestBody PredictionInputRequest request) {
        return ResponseEntity.ok(mlServiceClient.predictSuccessScore(request));
    }

    // ── Full analysis: registration range + optimal slot + conflicts + capacity ──
    @PostMapping("/full-analysis")
    public ResponseEntity<FullAnalysisResponse> fullAnalysis(
            @RequestBody FullAnalysisRequest request) {

        // Build ML-only payload (strip conflict-detection fields)
        PredictionInputRequest mlPayload = PredictionInputRequest.builder()
                .eventType(request.getEventType())
                .locationType(request.getLocationType())
                .capacityMax(request.getCapacityMax())
                .ticketPrice(request.getTicketPrice())
                .speakerCount(request.getSpeakerCount())
                .programSlotsCount(request.getProgramSlotsCount())
                .sectorCount(request.getSectorCount())
                .stageCount(request.getStageCount())
                .descriptionLength(request.getDescriptionLength() != null ? request.getDescriptionLength() : 0)
                .dayOfWeek(request.getDayOfWeek())
                .month(request.getMonth())
                .hourOfDay(request.getHourOfDay())
                .daysPublishedBeforeEvent(request.getDaysPublishedBeforeEvent())
                .build();

        MlFullAnalysisResponse ml = mlServiceClient.predictFullAnalysis(mlPayload);
        List<FullAnalysisResponse.ConflictWarning> conflicts = detectConflicts(request);

        MlFullAnalysisResponse.RegistrationEstimate mlEst = ml.getRegistrationEstimate();
        MlFullAnalysisResponse.OptimalSlot mlSlot = ml.getOptimalSlot();

        return ResponseEntity.ok(FullAnalysisResponse.builder()
                .registrationEstimate(FullAnalysisResponse.RegistrationEstimate.builder()
                        .min(mlEst.getMin())
                        .max(mlEst.getMax())
                        .pointEstimate(mlEst.getPointEstimate())
                        .confidence(mlEst.getConfidence())
                        .build())
                .optimalSlot(FullAnalysisResponse.OptimalSlot.builder()
                        .dayName(mlSlot.getDayName())
                        .timeWindow(mlSlot.getTimeWindow())
                        .boostVsAverage(mlSlot.getBoostVsAverage())
                        .build())
                .conflicts(conflicts)
                .suggestedCapacity(ml.getSuggestedCapacity())
                .successScore(ml.getSuccessScore())
                .label(ml.getLabel())
                .build());
    }

    // ── Conflict detection ────────────────────────────────────────────────

    private List<FullAnalysisResponse.ConflictWarning> detectConflicts(FullAnalysisRequest req) {
        List<FullAnalysisResponse.ConflictWarning> warnings = new ArrayList<>();
        if (req.getProposedDate() == null || req.getProposedDate().isBlank()) return warnings;

        LocalDateTime proposed;
        try {
            proposed = LocalDateTime.parse(req.getProposedDate(), DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        } catch (DateTimeParseException e) {
            return warnings;
        }

        // ISO week bounds (Monday 00:00 → Sunday 23:59)
        LocalDateTime weekStart = proposed
                .with(WeekFields.of(Locale.FRANCE).dayOfWeek(), 1)
                .withHour(0).withMinute(0).withSecond(0).withNano(0);
        LocalDateTime weekEnd = weekStart.plusDays(6)
                .withHour(23).withMinute(59).withSecond(59);

        EventType requestedType = parseType(req.getEventTypeCode());
        DateTimeFormatter display = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");

        for (Event e : eventRepository.findEventsInWeek(weekStart, weekEnd)) {
            boolean sameType = requestedType != null && requestedType == e.getType();
            warnings.add(FullAnalysisResponse.ConflictWarning.builder()
                    .eventTitle(e.getTitle())
                    .eventDate(e.getStartDate() != null ? e.getStartDate().format(display) : "?")
                    .eventType(e.getType() != null ? e.getType().name() : "")
                    .severity(sameType ? "HIGH" : "MEDIUM")
                    .build());
        }
        return warnings;
    }

    private EventType parseType(String code) {
        if (code == null) return null;
        try { return EventType.valueOf(code.toUpperCase()); }
        catch (IllegalArgumentException e) { return null; }
    }
}
