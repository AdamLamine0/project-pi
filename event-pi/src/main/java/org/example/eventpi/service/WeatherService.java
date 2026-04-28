package org.example.eventpi.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.example.eventpi.dto.WeatherResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;

@Service
@Slf4j
public class WeatherService {

    private static final String BASE = "https://api.openweathermap.org/data/2.5";
    private static final ObjectMapper MAPPER = new ObjectMapper();

    @Value("${weather.api.key:}")
    private String apiKey;

    private final RestTemplate restTemplate;

    public WeatherService() {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(4000);
        factory.setReadTimeout(6000);
        this.restTemplate = new RestTemplate(factory);
    }

    public WeatherResponse getWeather(double lat, double lon, LocalDateTime targetDate) {
        if (apiKey == null || apiKey.isBlank()) {
            return unavailable("Weather service not configured — add WEATHER_API_KEY to .env");
        }

        LocalDateTime now = LocalDateTime.now();
        long hoursAhead = ChronoUnit.HOURS.between(now, targetDate);

        if (hoursAhead < -1) {
            return unavailable("This event has already passed");
        }
        if (hoursAhead > 120) {
            return unavailable("Forecast available up to 5 days before the event");
        }

        try {
            if (hoursAhead <= 3) {
                return fetchCurrent(lat, lon);
            }
            return fetchForecast(lat, lon, targetDate);
        } catch (Exception e) {
            log.warn("Weather API error for lat={} lon={}: {}", lat, lon, e.getMessage());
            return unavailable("Weather data temporarily unavailable");
        }
    }

    private WeatherResponse fetchCurrent(double lat, double lon) throws Exception {
        String url = BASE + "/weather?lat=" + lat + "&lon=" + lon
                + "&appid=" + apiKey + "&units=metric&lang=en";
        String json = restTemplate.getForObject(url, String.class);
        JsonNode root = MAPPER.readTree(json);
        String city = root.path("name").asText("");
        return parseSlot(root, -1, city);
    }

    private WeatherResponse fetchForecast(double lat, double lon,
                                          LocalDateTime target) throws Exception {
        String url = BASE + "/forecast?lat=" + lat + "&lon=" + lon
                + "&appid=" + apiKey + "&units=metric&lang=en";
        String json = restTemplate.getForObject(url, String.class);
        JsonNode root = MAPPER.readTree(json);

        String city = root.path("city").path("name").asText("");
        JsonNode list = root.path("list");

        // Find the 3-hour slot closest to the target time
        long targetEpoch = target.toEpochSecond(ZoneOffset.UTC);
        JsonNode best = null;
        long minDiff = Long.MAX_VALUE;
        for (JsonNode slot : list) {
            long dt = slot.path("dt").asLong();
            long diff = Math.abs(dt - targetEpoch);
            if (diff < minDiff) {
                minDiff = diff;
                best = slot;
            }
        }

        if (best == null) return unavailable("No forecast data found for this date");

        int pop = (int) Math.round(best.path("pop").asDouble(0) * 100);
        return parseSlot(best, pop, city);
    }

    private WeatherResponse parseSlot(JsonNode slot, int explicitPop, String city) {
        JsonNode main = slot.path("main");
        JsonNode weatherArr = slot.path("weather");
        JsonNode wind = slot.path("wind");

        double temp      = main.path("temp").asDouble(20);
        double feelsLike = main.path("feels_like").asDouble(temp);
        int    humidity  = main.path("humidity").asInt(50);
        double windMs    = wind.path("speed").asDouble(0);
        double windKmh   = Math.round(windMs * 3.6 * 10.0) / 10.0;

        String desc = "Unknown";
        String icon = "01d";
        if (weatherArr.isArray() && !weatherArr.isEmpty()) {
            JsonNode w = weatherArr.get(0);
            desc = capitalize(w.path("description").asText("unknown"));
            icon = w.path("icon").asText("01d");
        }

        int rainPop = explicitPop >= 0
                ? explicitPop
                : estimateRainProbability(icon);

        String condition = classify(temp, rainPop, windKmh);

        return WeatherResponse.builder()
                .available(true)
                .temperature(Math.round(temp * 10.0) / 10.0)
                .feelsLike(Math.round(feelsLike * 10.0) / 10.0)
                .description(desc)
                .icon(icon)
                .iconUrl("https://openweathermap.org/img/wn/" + icon + "@2x.png")
                .humidity(humidity)
                .windSpeedKmh(windKmh)
                .rainProbability(rainPop)
                .condition(condition)
                .conditionLabel(conditionLabel(condition, temp, rainPop, windKmh))
                .location(city)
                .build();
    }

    private int estimateRainProbability(String icon) {
        if (icon == null || icon.length() < 2) return 0;
        return switch (icon.substring(0, 2)) {
            case "01" -> 2;
            case "02" -> 8;
            case "03" -> 15;
            case "04" -> 20;
            case "09" -> 90;
            case "10" -> 70;
            case "11" -> 95;
            case "13" -> 75;
            case "50" -> 20;
            default   -> 10;
        };
    }

    private String classify(double temp, int pop, double windKmh) {
        if (pop >= 65 || windKmh >= 55 || temp < 5 || temp > 38) return "POOR";
        if (pop >= 40 || windKmh >= 35 || temp < 10 || temp > 34) return "FAIR";
        if (pop >= 20 || windKmh >= 20 || temp < 14 || temp > 31) return "GOOD";
        return "EXCELLENT";
    }

    private String conditionLabel(String condition, double temp,
                                  int pop, double windKmh) {
        return switch (condition) {
            case "EXCELLENT" -> "Ideal conditions for your event";
            case "GOOD"      -> "Good conditions — minor discomfort possible";
            case "FAIR"      -> pop >= 40
                    ? "Rain likely — consider an indoor backup plan"
                    : windKmh >= 35
                    ? "High winds — secure outdoor installations"
                    : "Moderate conditions";
            case "POOR"      -> pop >= 65
                    ? "Heavy rain expected — plan an indoor alternative"
                    : temp < 5 ? "Very cold — ensure adequate shelter for attendees"
                    : temp > 38 ? "Extreme heat — ensure shade and hydration"
                    : "Difficult outdoor conditions";
            default -> "";
        };
    }

    private static String capitalize(String s) {
        if (s == null || s.isEmpty()) return s;
        return Character.toUpperCase(s.charAt(0)) + s.substring(1);
    }

    private static WeatherResponse unavailable(String reason) {
        return WeatherResponse.builder().available(false).reason(reason).build();
    }
}
