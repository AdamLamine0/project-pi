package com.example.demo.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "app.users-service")
public class UserServiceProperties {
    private String baseUrl = "http://localhost:8090/api/users";
    private String fallbackBaseUrl = "http://localhost:8081/api/users";
    private int timeoutSeconds = 10;
}
