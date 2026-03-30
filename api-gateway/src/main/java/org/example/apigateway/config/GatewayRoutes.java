package org.example.apigateway.config;

import org.example.apigateway.filter.AuthFilter;
import org.springframework.cloud.gateway.server.mvc.handler.HandlerFunctions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.RouterFunctions;
import org.springframework.web.servlet.function.ServerResponse;

import static org.springframework.cloud.gateway.server.mvc.filter.LoadBalancerFilterFunctions.lb;
import static org.springframework.web.servlet.function.RequestPredicates.path;

@Configuration
public class GatewayRoutes {

    private final AuthFilter authFilter;

    public GatewayRoutes(AuthFilter authFilter) {
        this.authFilter = authFilter;
    }

    @Bean
    public RouterFunction<ServerResponse> userAuthRoute() {
        return RouterFunctions
                .route(path("/api/auth/**"), HandlerFunctions.http())
                .filter(lb("user-pi"))
                .filter(authFilter.jwtFilter());
    }

    @Bean
    public RouterFunction<ServerResponse> userServiceRoute() {
        return RouterFunctions
                .route(path("/api/users/**"), HandlerFunctions.http())
                .filter(lb("user-pi"))
                .filter(authFilter.jwtFilter());
    }

    @Bean
    public RouterFunction<ServerResponse> oauth2Route() {
        return RouterFunctions
                .route(path("/login/oauth2/**").or(path("/oauth2/**")),
                        HandlerFunctions.http())
                .filter(lb("user-pi"));
    }

    @Bean
    public RouterFunction<ServerResponse> conventionServiceRoute() {
        return RouterFunctions
                .route(path("/api/conventions/**"), HandlerFunctions.http())
                .filter(lb("partenariat-pi"))
                .filter(authFilter.jwtFilter());
    }

    @Bean
    public RouterFunction<ServerResponse> organisationServiceRoute() {
        return RouterFunctions
                .route(path("/api/organisations/**"), HandlerFunctions.http())
                .filter(lb("partenariat-pi"))
                .filter(authFilter.jwtFilter());
    }

    @Bean
    public RouterFunction<ServerResponse> objectifServiceRoute() {
        return RouterFunctions
                .route(path("/api/objectifs/**"), HandlerFunctions.http())
                .filter(lb("partenariat-pi"))
                .filter(authFilter.jwtFilter());
    }

    @Bean
    public RouterFunction<ServerResponse> eventServiceRoute() {
        return RouterFunctions
                .route(path("/api/events/**"), HandlerFunctions.http())
                .filter(lb("event-pi"))
                .filter(authFilter.jwtFilter());
    }

    // ← ADD THIS
    @Bean
    public RouterFunction<ServerResponse> speakerServiceRoute() {
        return RouterFunctions
                .route(path("/api/speakers/**"), HandlerFunctions.http())
                .filter(lb("event-pi"))
                .filter(authFilter.jwtFilter());
    }
}