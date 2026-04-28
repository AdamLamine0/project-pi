package com.example.demo.services;

import com.example.demo.config.UserServiceProperties;
import com.example.demo.dto.UserLookupResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class UserDirectoryService {

    private final UserServiceProperties properties;
    private final WebClient.Builder webClientBuilder;

    public String fullName(Integer userId) {
        if (userId == null) {
            return "Utilisateur non renseigne";
        }

        String primaryName = findName(properties.getBaseUrl(), userId);
        if (!primaryName.isBlank()) {
            return primaryName;
        }

        String fallbackName = findName(properties.getFallbackBaseUrl(), userId);
        if (!fallbackName.isBlank()) {
            return fallbackName;
        }

        return "Utilisateur #" + userId;
    }

    private String findName(String baseUrl, Integer userId) {
        if (baseUrl == null || baseUrl.isBlank()) {
            return "";
        }

        try {
            UserLookupResponse user = webClientBuilder
                    .baseUrl(baseUrl)
                    .build()
                    .get()
                    .uri("/{id}", userId)
                    .retrieve()
                    .bodyToMono(UserLookupResponse.class)
                    .timeout(Duration.ofSeconds(properties.getTimeoutSeconds()))
                    .block();

            if (user == null || user.fullName() == null || user.fullName().isBlank()) {
                return "";
            }
            return user.fullName();
        } catch (RuntimeException e) {
            return "";
        }
    }
}
