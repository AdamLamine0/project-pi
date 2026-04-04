package org.example.eventpi;

import org.springframework.aop.interceptor.AsyncUncaughtExceptionHandler;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
@EnableMethodSecurity
@EnableAsync
public class EventPiApplication {

    public static void main(String[] args) {
        SpringApplication.run(EventPiApplication.class, args);
    }
    @Bean
    public AsyncUncaughtExceptionHandler asyncExceptionHandler() {
        return (throwable, method, params) ->
                System.err.println("ASYNC ERROR in " + method.getName()
                        + ": " + throwable.getMessage());
    }
}
