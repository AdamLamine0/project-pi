package org.example.eventpi.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${app.upload.dir}")
    private String uploadDir;

    @Value("${app.upload.speakers-dir}")
    private String speakersUploadDir;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/uploads/events/**")
                .addResourceLocations("file:" + uploadDir + "/");

        registry.addResourceHandler("/uploads/speakers/**")
                .addResourceLocations("file:" + speakersUploadDir + "/");
    }
}