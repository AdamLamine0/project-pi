package org.example.eventpi.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.File;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${app.upload.dir}")
    private String uploadDir;               // "uploads/events"

    @Value("${app.upload.speakers-dir}")
    private String speakersUploadDir;       // "uploads/speakers"

    @Value("${app.upload.certificates-dir}")
    private String certificatesUploadDir;   // "uploads/certificates"

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        // Convert every relative path to absolute so the file: URL is unambiguous
        // regardless of how/where the app is launched.
        String events       = toFileUrl(uploadDir);
        String speakers     = toFileUrl(speakersUploadDir);
        String certificates = toFileUrl(certificatesUploadDir);
        // Derive badges dir from the upload root (same level as events/)
        String badges       = toFileUrl(uploadDir.replace("events", "badges"));

        registry.addResourceHandler("/uploads/events/**")
                .addResourceLocations(events);

        registry.addResourceHandler("/uploads/speakers/**")
                .addResourceLocations(speakers);

        registry.addResourceHandler("/uploads/certificates/**")
                .addResourceLocations(certificates);

        registry.addResourceHandler("/uploads/badges/**")
                .addResourceLocations(badges);
    }

    /**
     * Converts a path (relative or absolute) to a "file:/absolute/path/" URL
     * that Spring's ResourceHttpRequestHandler accepts reliably.
     * Always ends with "/" as required by addResourceLocations().
     */
    private String toFileUrl(String path) {
        String absolute = new File(path).getAbsolutePath();
        // Ensure the directory exists so Spring doesn't silently skip the handler
        new File(absolute).mkdirs();
        return "file:" + absolute.replace("\\", "/") + "/";
    }
}