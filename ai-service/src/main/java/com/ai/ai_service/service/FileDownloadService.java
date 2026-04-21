package com.ai.ai_service.service;

import com.ai.ai_service.config.AiProperties;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Duration;

@Service
public class FileDownloadService {

    private final AiProperties properties;
    private final WebClient.Builder webClientBuilder;

    public FileDownloadService(AiProperties properties, WebClient.Builder webClientBuilder) {
        this.properties = properties;
        this.webClientBuilder = webClientBuilder;
    }

    public Path downloadToTempFile(String fileUrl) {
        try {
            byte[] bytes = webClientBuilder
                    .exchangeStrategies(downloadExchangeStrategies())
                    .build()
                    .get()
                    .uri(fileUrl)
                    .retrieve()
                    .bodyToMono(byte[].class)
                    .timeout(Duration.ofSeconds(properties.getDownload().getTimeoutSeconds()))
                    .block();

            if (bytes == null || bytes.length == 0) {
                throw new IllegalArgumentException("Downloaded file is empty: " + fileUrl);
            }

            Path temp = Files.createTempFile("ai-document-", extension(fileUrl));
            Files.write(temp, bytes);
            return temp;
        } catch (RuntimeException | IOException e) {
            throw new IllegalArgumentException("Unable to download document: " + fileUrl, e);
        }
    }

    private ExchangeStrategies downloadExchangeStrategies() {
        int maxBytes = Math.max(1, properties.getDownload().getMaxInMemoryMb()) * 1024 * 1024;
        return ExchangeStrategies.builder()
                .codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(maxBytes))
                .build();
    }

    private String extension(String fileUrl) {
        try {
            String path = URI.create(fileUrl).getPath();
            int index = path.lastIndexOf('.');
            if (index >= 0 && index < path.length() - 1) {
                return path.substring(index);
            }
        } catch (RuntimeException ignored) {
            // Fall through to the default extension.
        }
        return ".bin";
    }
}
