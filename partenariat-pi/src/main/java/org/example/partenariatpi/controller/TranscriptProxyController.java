package org.example.partenariatpi.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.partenariatpi.model.TranscriptLine;
import org.example.partenariatpi.repository.TranscriptRepository;
import org.example.partenariatpi.service.TranscriptEmailService;   // ← NEW
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/transcripts")
@RequiredArgsConstructor
public class TranscriptProxyController {

    private final TranscriptRepository   transcriptRepository;
    private final TranscriptEmailService transcriptEmailService;   // ← INJECT NEW SERVICE
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${transcription.python-server-url:http://localhost:5000}")
    private String pythonServerUrl;

    // ─────────────────────────────────────────────────────────────────────────
    // POST /api/transcripts/process
    // Receive audio from Angular, proxy to Python Flask, save, then email PDF
    // ─────────────────────────────────────────────────────────────────────────
    @PostMapping("/process")
    public ResponseEntity<?> processAudioForTranscription(
            @RequestParam("audio")     MultipartFile audioFile,
            @RequestParam("meetingId") String meetingId,
            @RequestParam(value = "numSpeakers", defaultValue = "2") int numSpeakers,
            @RequestHeader(value = "X-User-Id", required = false) String userId
    ) {
        long startTime = System.currentTimeMillis();

        log.info("📥 Transcription request — Meeting: {} | User: {} | Size: {} KB",
                meetingId, userId, audioFile.getSize() / 1024);

        try {
            if (audioFile.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("success", false, "error", "Empty audio file"));
            }
            if (audioFile.getSize() > 100 * 1024 * 1024) {
                return ResponseEntity.badRequest().body(Map.of("success", false, "error", "File too large (max 100 MB)"));
            }

            // ── Proxy to Python Flask ──────────────────────────────────────
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("audio", new ByteArrayResource(audioFile.getBytes()) {
                @Override public String getFilename() { return audioFile.getOriginalFilename(); }
            });
            body.add("meetingId",    meetingId);
            body.add("numSpeakers",  String.valueOf(numSpeakers));

            ResponseEntity<Map> pythonResponse = restTemplate.exchange(
                    pythonServerUrl + "/api/transcribe",
                    HttpMethod.POST,
                    new HttpEntity<>(body, headers),
                    Map.class
            );

            Map<String, Object> result   = pythonResponse.getBody();
            long               durationMs = System.currentTimeMillis() - startTime;

            if (result != null && Boolean.TRUE.equals(result.get("success"))) {

                @SuppressWarnings("unchecked")
                List<Map<String, Object>> segments =
                        (List<Map<String, Object>>) result.get("segments");

                // ── Save segments to DB ────────────────────────────────────
                saveSegmentsToDatabase(meetingId, segments, userId);

                log.info("✅ Transcription done in {} ms — {} segments", durationMs, segments.size());

                // ── Auto-send PDF transcript by email (non-blocking) ───────
                sendTranscriptEmailAsync(meetingId);

                return ResponseEntity.ok()
                        .header("X-Processing-Time", durationMs + "ms")
                        .body(result);

            } else {
                log.error("❌ Python error: {}", result);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                        "success", false,
                        "error", "AI processing error",
                        "details", result != null ? result.get("error") : "Unknown"
                ));
            }

        } catch (org.springframework.web.client.ResourceAccessException e) {
            log.error("❌ Python server unreachable: {}", pythonServerUrl);
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(Map.of(
                    "success", false,
                    "error", "Transcription server unavailable",
                    "tip", "Make sure the Python Flask server is running on " + pythonServerUrl
            ));
        } catch (Exception e) {
            log.error("❌ Proxy error:", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false, "error", "Internal error: " + e.getMessage()
            ));
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // POST /api/transcripts/{meetingId}/send-email
    // Manual trigger — useful if automatic send failed or for re-sending
    // ─────────────────────────────────────────────────────────────────────────
    @PostMapping("/{meetingId}/send-email")
    public ResponseEntity<?> sendTranscriptEmail(
            @PathVariable String meetingId,
            @RequestHeader("X-User-Role") String role
    ) {
        String cleanRole = role != null ? role.split(",")[0].trim() : "";
        if (!"ROLE_ADMIN".equals(cleanRole) && !"ROLE_USER".equals(cleanRole) && !"ROLE_PARTNER".equals(cleanRole)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Access denied"));
        }

        List<TranscriptLine> lines = transcriptRepository
                .findByMeetingIdOrderByStartTimestampAsc(meetingId);

        if (lines.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "No transcript found for meeting: " + meetingId));
        }

        try {
            transcriptEmailService.sendTranscriptToParticipants(meetingId);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Transcript email sent for meeting " + meetingId
            ));
        } catch (Exception e) {
            log.error("❌ Manual email send failed for {}: {}", meetingId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false, "error", e.getMessage()
            ));
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // GET /api/transcripts/{meetingId}
    // ─────────────────────────────────────────────────────────────────────────
    @GetMapping("/{meetingId}")
    public ResponseEntity<List<TranscriptLine>> getTranscript(@PathVariable String meetingId) {
        List<TranscriptLine> lines = transcriptRepository
                .findByMeetingIdOrderByStartTimestampAsc(meetingId);
        return lines.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(lines);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // GET /api/transcripts/{meetingId}/download  (plain-text fallback)
    // ─────────────────────────────────────────────────────────────────────────
    @GetMapping("/{meetingId}/download")
    public ResponseEntity<byte[]> downloadTranscript(@PathVariable String meetingId) {
        List<TranscriptLine> lines = transcriptRepository
                .findByMeetingIdOrderByStartTimestampAsc(meetingId);
        if (lines.isEmpty()) return ResponseEntity.notFound().build();

        String content = generateFormattedTranscript(lines, meetingId);
        HttpHeaders h  = new HttpHeaders();
        h.setContentType(MediaType.TEXT_PLAIN);
        h.setContentDispositionFormData("attachment", "transcript_" + meetingId + ".txt");
        return ResponseEntity.ok().headers(h).body(content.getBytes());
    }

    // ─────────────────────────────────────────────────────────────────────────
    // GET /api/transcripts/health/python
    // ─────────────────────────────────────────────────────────────────────────
    @GetMapping("/health/python")
    public ResponseEntity<?> checkPythonServerHealth() {
        try {
            ResponseEntity<Map> resp = restTemplate.getForEntity(pythonServerUrl + "/health", Map.class);
            return ResponseEntity.ok(Map.of(
                    "pythonServer", "reachable", "url", pythonServerUrl,
                    "status", resp.getBody(), "timestamp", LocalDateTime.now().toString()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(Map.of(
                    "pythonServer", "unreachable", "url", pythonServerUrl,
                    "error", e.getMessage(), "timestamp", LocalDateTime.now().toString()
            ));
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // DELETE /api/transcripts/{meetingId}
    // ─────────────────────────────────────────────────────────────────────────
    @DeleteMapping("/{meetingId}")
    public ResponseEntity<?> deleteTranscript(@PathVariable String meetingId) {
        List<TranscriptLine> lines = transcriptRepository
                .findByMeetingIdOrderByStartTimestampAsc(meetingId);
        if (lines.isEmpty()) return ResponseEntity.notFound().build();
        transcriptRepository.deleteAll(lines);
        return ResponseEntity.ok(Map.of("success", true,
                "message", lines.size() + " segments deleted", "meetingId", meetingId));
    }

    // ─────────────────────────────────────────────────────────────────────────
    // PRIVATE HELPERS
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Fire-and-forget email send — runs in the calling thread but catches all
     * exceptions so a mail failure never breaks the transcription response.
     * For true async, annotate with @Async and enable @EnableAsync on your app.
     */
    private void sendTranscriptEmailAsync(String meetingId) {
        try {
            transcriptEmailService.sendTranscriptToParticipants(meetingId);
        } catch (Exception e) {
            log.error("❌ Auto transcript email failed for {}: {}", meetingId, e.getMessage());
            // Non-blocking: transcript was saved successfully regardless
        }
    }

    private void saveSegmentsToDatabase(String meetingId,
                                        List<Map<String, Object>> segments, String userId) {
        int saved = 0;
        for (Map<String, Object> seg : segments) {
            try {
                TranscriptLine line = new TranscriptLine();
                line.setMeetingId(meetingId);
                line.setSpeaker((String) seg.getOrDefault("speaker", "Unknown"));
                line.setLanguage((String) seg.getOrDefault("language", "FR"));
                line.setText((String) seg.get("text"));
                line.setStartTimestamp(Double.valueOf(seg.get("start").toString()));
                line.setEndTimestamp(Double.valueOf(seg.get("end").toString()));
                line.setCreatedAt(LocalDateTime.now());
                transcriptRepository.save(line);
                saved++;
            } catch (Exception e) {
                log.warn("⚠️  Segment save error: {}", e.getMessage());
            }
        }
        log.info("💾 {} segments saved for meeting {}", saved, meetingId);
    }

    private String generateFormattedTranscript(List<TranscriptLine> lines, String meetingId) {
        StringBuilder sb = new StringBuilder();
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
        sb.append("=".repeat(60)).append("\n");
        sb.append("MEETING TRANSCRIPT\n");
        sb.append("ID: ").append(meetingId).append("\n");
        sb.append("Generated: ").append(LocalDateTime.now().format(dtf)).append("\n");
        sb.append("Segments: ").append(lines.size()).append("\n");
        sb.append("=".repeat(60)).append("\n\n");
        for (TranscriptLine line : lines) {
            sb.append(String.format("[%s-%s] [%s]\n%s\n\n",
                    formatTimestamp(line.getStartTimestamp()),
                    formatTimestamp(line.getEndTimestamp()),
                    line.getSpeaker(), line.getText()));
        }
        sb.append("=".repeat(60)).append("\nEND OF TRANSCRIPT\n");
        return sb.toString();
    }

    private String formatTimestamp(double seconds) {
        int m = (int) (seconds / 60), s = (int) (seconds % 60);
        return String.format("%02d:%02d", m, s);
    }
}