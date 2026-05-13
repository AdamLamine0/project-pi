package org.example.apigateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.List;

@Configuration
public class CorsConfig {

    private static final String DEFAULT_ALLOWED_ORIGIN_PATTERNS = String.join(",",
            "http://localhost",
            "http://localhost:[*]",
            "http://127.0.0.1",
            "http://127.0.0.1:[*]",
            "http://172.18.*.*",
            "http://172.18.*.*:[*]",
            "http://192.168.*.*",
            "http://192.168.*.*:[*]",
            "http://10.*.*.*",
            "http://10.*.*.*:[*]",
            "http://*.nip.io",
            "http://*.nip.io:[*]",
            "https://*.nip.io",
            "https://*.nip.io:[*]"
    );

    private final Environment environment;

    public CorsConfig(Environment environment) {
        this.environment = environment;
    }

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOriginPatterns(allowedOriginPatterns());
        config.addAllowedMethod("GET");
        config.addAllowedMethod("POST");
        config.addAllowedMethod("PUT");
        config.addAllowedMethod("PATCH");
        config.addAllowedMethod("DELETE");
        config.addAllowedMethod("OPTIONS");
        config.addAllowedHeader("*");
        config.setAllowCredentials(true);
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }

    private List<String> allowedOriginPatterns() {
        String configured = environment.getProperty(
                "app.cors.allowed-origin-patterns",
                DEFAULT_ALLOWED_ORIGIN_PATTERNS
        );

        return Arrays.stream(configured.split(","))
                .map(String::trim)
                .filter(pattern -> !pattern.isBlank())
                .toList();
    }
}
