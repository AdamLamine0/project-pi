package org.example.eventpi.controller;

import lombok.RequiredArgsConstructor;
import org.example.eventpi.dto.WeatherResponse;
import org.example.eventpi.service.WeatherService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;

@RestController
@RequestMapping("/api/weather")
@RequiredArgsConstructor
public class WeatherController {

    private final WeatherService weatherService;

    @GetMapping
    public ResponseEntity<WeatherResponse> getWeather(
            @RequestParam double lat,
            @RequestParam double lon,
            @RequestParam String date) {

        LocalDateTime targetDate;
        try {
            targetDate = LocalDateTime.parse(date);
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest()
                    .body(WeatherResponse.builder()
                            .available(false)
                            .reason("Invalid date format — use ISO-8601 (e.g. 2025-05-15T14:00:00)")
                            .build());
        }

        return ResponseEntity.ok(weatherService.getWeather(lat, lon, targetDate));
    }
}
