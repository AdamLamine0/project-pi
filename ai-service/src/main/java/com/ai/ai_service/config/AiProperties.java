package com.ai.ai_service.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@ConfigurationProperties(prefix = "app.ai")
public class AiProperties {

    private Ocr ocr = new Ocr();
    private Vision vision = new Vision();
    private Gemini gemini = new Gemini();
    private Download download = new Download();

    public Ocr getOcr() {
        return ocr;
    }

    public void setOcr(Ocr ocr) {
        this.ocr = ocr;
    }

    public Vision getVision() {
        return vision;
    }

    public void setVision(Vision vision) {
        this.vision = vision;
    }

    public Gemini getGemini() {
        return gemini;
    }

    public void setGemini(Gemini gemini) {
        this.gemini = gemini;
    }

    public Download getDownload() {
        return download;
    }

    public void setDownload(Download download) {
        this.download = download;
    }

    public static class Ocr {
        private boolean enabled = true;
        private String language = "fra+eng";
        private String dataPath;
        private int previewLength = 900;
        private int minTextLength = 40;

        public boolean isEnabled() {
            return enabled;
        }

        public void setEnabled(boolean enabled) {
            this.enabled = enabled;
        }

        public String getLanguage() {
            return language;
        }

        public void setLanguage(String language) {
            this.language = language;
        }

        public String getDataPath() {
            return dataPath;
        }

        public void setDataPath(String dataPath) {
            this.dataPath = dataPath;
        }

        public int getPreviewLength() {
            return previewLength;
        }

        public void setPreviewLength(int previewLength) {
            this.previewLength = previewLength;
        }

        public int getMinTextLength() {
            return minTextLength;
        }

        public void setMinTextLength(int minTextLength) {
            this.minTextLength = minTextLength;
        }
    }

    public static class Vision {
        private boolean enabled = true;
        private double blurThreshold = 100.0;

        public boolean isEnabled() {
            return enabled;
        }

        public void setEnabled(boolean enabled) {
            this.enabled = enabled;
        }

        public double getBlurThreshold() {
            return blurThreshold;
        }

        public void setBlurThreshold(double blurThreshold) {
            this.blurThreshold = blurThreshold;
        }
    }

    public static class Gemini {
        private boolean enabled = true;
        private String baseUrl = "https://generativelanguage.googleapis.com";
        private String model = "gemini-2.5-flash";
        private List<String> fallbackModels = new ArrayList<>(List.of("gemini-2.0-flash", "gemini-1.5-flash"));
        private String apiKey;
        private int timeoutSeconds = 45;

        public boolean isEnabled() {
            return enabled;
        }

        public void setEnabled(boolean enabled) {
            this.enabled = enabled;
        }

        public String getBaseUrl() {
            return baseUrl;
        }

        public void setBaseUrl(String baseUrl) {
            this.baseUrl = baseUrl;
        }

        public String getModel() {
            return model;
        }

        public void setModel(String model) {
            this.model = model;
        }

        public List<String> getFallbackModels() {
            return fallbackModels;
        }

        public void setFallbackModels(List<String> fallbackModels) {
            this.fallbackModels = fallbackModels;
        }

        public String getApiKey() {
            return apiKey;
        }

        public void setApiKey(String apiKey) {
            this.apiKey = apiKey;
        }

        public int getTimeoutSeconds() {
            return timeoutSeconds;
        }

        public void setTimeoutSeconds(int timeoutSeconds) {
            this.timeoutSeconds = timeoutSeconds;
        }
    }

    public static class Download {
        private int timeoutSeconds = 30;
        private int maxInMemoryMb = 25;

        public int getTimeoutSeconds() {
            return timeoutSeconds;
        }

        public void setTimeoutSeconds(int timeoutSeconds) {
            this.timeoutSeconds = timeoutSeconds;
        }

        public int getMaxInMemoryMb() {
            return maxInMemoryMb;
        }

        public void setMaxInMemoryMb(int maxInMemoryMb) {
            this.maxInMemoryMb = maxInMemoryMb;
        }
    }
}
