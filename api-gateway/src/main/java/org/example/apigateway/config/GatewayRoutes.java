package org.example.apigateway.config;

import org.example.apigateway.filter.AuthFilter;
import org.springframework.cloud.gateway.server.mvc.handler.HandlerFunctions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.RouterFunctions;
import org.springframework.web.servlet.function.ServerRequest;
import org.springframework.web.servlet.function.ServerResponse;

import java.util.List;

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
    public RouterFunction<ServerResponse> communityServiceRoute() {
        return RouterFunctions
                .route(path("/api/community/**"), HandlerFunctions.http())
                .filter(lb("community-service"))
                .filter(authFilter.jwtFilter());
    }

    @Bean
    public RouterFunction<ServerResponse> meetingServiceRoute() {
        return RouterFunctions
                .route(path("/api/meeting-invitations/**"), HandlerFunctions.http())
                .filter(lb("partenariat-pi"))
                .filter(authFilter.jwtFilter());
    }

    @Bean
    public RouterFunction<ServerResponse> zoomSignatureRoute() {
        return RouterFunctions
                .route(path("/api/zoom/**"), HandlerFunctions.http())
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
                .filter(authFilter.jwtFilter())
                .filter((request, next) -> {
                    ServerRequest modified = ServerRequest.from(request)
                            .uri(java.net.URI.create(
                                    request.uri().toString()
                                            .replaceFirst("/api/events", "/api/events")))
                            .build();
                    return next.handle(modified);
                });
    }

    @Bean
    public RouterFunction<ServerResponse> transcriptionServiceRoute() {
        return RouterFunctions
                .route(path("/api/transcripts/**"), HandlerFunctions.http())
                .filter(lb("partenariat-pi"))           // ← Vers votre backend Spring Boot
                .filter(authFilter.jwtFilter());         // ← Auth JWT requise
    }

    @Bean
    public RouterFunction<ServerResponse> speakerServiceRoute() {
        return RouterFunctions
                .route(path("/api/speakers/**"), HandlerFunctions.http())
                .filter(lb("event-pi"))
                .filter(authFilter.jwtFilter());
    }

    @Bean
    public RouterFunction<ServerResponse> badgeServiceRoute() {
        return RouterFunctions
                .route(path("/api/badges/**"), HandlerFunctions.http())
                .filter(lb("event-pi"))
                .filter(authFilter.jwtFilter());
    }

    @Bean
    public RouterFunction<ServerResponse> certificateServiceRoute() {
        return RouterFunctions
                .route(path("/api/certificates/**"), HandlerFunctions.http())
                .filter(lb("event-pi"))
                .filter(authFilter.jwtFilter());
    }

    @Bean
    public RouterFunction<ServerResponse> ticketServiceRoute() {
        return RouterFunctions
                .route(path("/api/tickets/**"), HandlerFunctions.http())
                .filter(lb("event-pi"))
                .filter(authFilter.jwtFilter());
    }

    @Bean
    public RouterFunction<ServerResponse> verifyRoute() {
        return RouterFunctions
                .route(path("/api/verify/**"), HandlerFunctions.http())
                .filter(lb("event-pi"));
        // no authFilter — public endpoint for QR code scanning
    }




    @Bean
    public RouterFunction<ServerResponse> legalServiceRoute() {
        return RouterFunctions
                .route(path("/api/legal-procedures/**")
                        .or(path("/api/legal-procedures"))
                        .or(path("/api/procedure-types/**"))
                        .or(path("/api/procedure-types"))
                        .or(path("/api/files/**")), HandlerFunctions.http())
                .filter(lb("legal-pi"))
                .filter(authFilter.jwtFilter());
    }

    @Bean
    public RouterFunction<ServerResponse> gestionProjetsServiceRoute() {
        return RouterFunctions
                .route(path("/api/projects/**")
                        .or(path("/api/documents/**"))
                        .or(path("/api/tasks/**"))
                        .or(path("/api/team-members/**")), HandlerFunctions.http())
                .filter(lb("gestion-projets-service"))
                .filter(authFilter.jwtFilter());
    }

    @Bean
    public RouterFunction<ServerResponse> gestionProjetsMlServiceRoute() {
        return RouterFunctions
                .route(path("/api/ml/**"), HandlerFunctions.http())
                .filter(lb("gestionprojets-ai-service"))
                .filter(authFilter.jwtFilter());
    }

    @Bean
    public RouterFunction<ServerResponse> investmentServiceRoute() {
        return RouterFunctions
                .route(path("/api/invest-request/**")
                        .or(path("/api/invest-criteria/**"))
                        .or(path("/api/investments/**"))
                        .or(path("/api/admin/investments/**"))
                        .or(path("/api/deals/**"))
                        .or(path("/api/data-room/**"))
                        .or(path("/api/dataroom/**"))
                        .or(path("/api/nda/**"))
                        .or(path("/api/log/**")), HandlerFunctions.http())
                .filter(lb("investment-pi"))
                .filter(authFilter.jwtFilter());
    }
}
