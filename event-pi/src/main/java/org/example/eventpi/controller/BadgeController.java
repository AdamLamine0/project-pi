package org.example.eventpi.controller;

import lombok.RequiredArgsConstructor;
import org.example.eventpi.dto.BadgeResponse;
import org.example.eventpi.service.BadgeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/badges")
@RequiredArgsConstructor
public class BadgeController {

    private final BadgeService badgeService;

    @GetMapping("/me")
    public ResponseEntity<List<BadgeResponse>> getMyBadges(
            @RequestHeader("X-User-Id") String userId) {
        return ResponseEntity.ok(
                badgeService.getByUser(Integer.parseInt(userId)));
    }

    // Admin can check any user's badges
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BadgeResponse>> getUserBadges(
            @PathVariable Integer userId,
            @RequestHeader("X-User-Role") String role) {
        return ResponseEntity.ok(badgeService.getByUser(userId));
    }
}