package com.pi.gestionprojets.ml.config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
@EnableConfigurationProperties(MlClientProperties.class)
public class WebClientConfig {

    @Bean
    public WebClient mlWebClient(WebClient.Builder builder, MlClientProperties properties) {
        return builder
                .baseUrl(properties.getBaseUrl())
                .exchangeStrategies(ExchangeStrategies.builder()
                        .codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(4 * 1024 * 1024))
                        .build())
                .build();
    }
}
