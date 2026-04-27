package org.example.eventpi.controller;

import lombok.RequiredArgsConstructor;
import org.example.eventpi.dto.TicketResponse;
import org.example.eventpi.service.TicketService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class TicketController {

    private final TicketService ticketService;

    // ── MY TICKET (info) ─────────────────────────────────────────────────
    @GetMapping("/api/events/{eventId}/my-ticket")
    public ResponseEntity<TicketResponse> getMyTicket(
            @PathVariable Long eventId,
            @RequestHeader("X-User-Id") String userId) {
        return ResponseEntity.ok(
                ticketService.getMyTicket(eventId, Integer.parseInt(userId)));
    }

    // ── MY TICKET (PDF download) ──────────────────────────────────────────
    @GetMapping("/api/events/{eventId}/my-ticket/download")
    public ResponseEntity<byte[]> downloadMyTicket(
            @PathVariable Long eventId,
            @RequestHeader("X-User-Id") String userId) {
        byte[] pdf = ticketService.downloadTicketPdf(eventId, Integer.parseInt(userId));
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"ticket-" + eventId + ".pdf\"")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }

    // ── VERIFY TICKET (public — QR scan lands here) ───────────────────────
    @GetMapping("/api/tickets/{ticketNumber}/verify")
    public ResponseEntity<TicketResponse> verifyTicket(
            @PathVariable String ticketNumber) {
        return ResponseEntity.ok(ticketService.verifyTicket(ticketNumber));
    }

    // ── CHECK-IN BY TICKET (organizer) ────────────────────────────────────
    @PatchMapping("/api/tickets/{ticketNumber}/checkin")
    public ResponseEntity<TicketResponse> checkInByTicket(
            @PathVariable String ticketNumber,
            @RequestHeader("X-User-Role") String role) {
        return ResponseEntity.ok(ticketService.checkInByTicket(ticketNumber));
    }

    // ── PAY FOR TICKET ────────────────────────────────────────────────────
    @PostMapping("/api/events/{eventId}/pay")
    public ResponseEntity<TicketResponse> payForTicket(
            @PathVariable Long eventId,
            @RequestHeader("X-User-Id") String userId) {
        return ResponseEntity.ok(
                ticketService.processPayment(eventId, Integer.parseInt(userId)));
    }
}
