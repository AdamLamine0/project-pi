package com.ai.ai_service.service;

import com.ai.ai_service.config.AiProperties;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.stereotype.Service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Locale;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class TesseractOcrService {

    private static final Set<String> OCR_EXTENSIONS = Set.of("png", "jpg", "jpeg", "bmp", "tif", "tiff", "pdf");

    private final AiProperties properties;

    public TesseractOcrService(AiProperties properties) {
        this.properties = properties;
    }

    public OcrResult extractText(Path file) {
        if (!properties.getOcr().isEnabled()) {
            return new OcrResult(false, "", "OCR disabled");
        }
        if (file == null || !Files.exists(file)) {
            return new OcrResult(false, "", "Uploaded file not found");
        }
        if (!isSupportedOcrFile(file)) {
            return new OcrResult(false, "", "OCR supports image and PDF files only");
        }

        Path dataPath = resolveDataPath();
        if (dataPath == null) {
            return new OcrResult(false, "", "Tesseract tessdata path is not configured. Set app.ai.ocr.data-path or TESSDATA_PREFIX.");
        }

        String missingLanguages = missingLanguages(dataPath);
        if (!missingLanguages.isBlank()) {
            return new OcrResult(false, "", "Missing Tesseract language data in " + dataPath + ": " + missingLanguages);
        }

        try {
            Tesseract tesseract = new Tesseract();
            tesseract.setLanguage(properties.getOcr().getLanguage());
            tesseract.setTessVariable("user_defined_dpi", "300");
            tesseract.setDatapath(dataPath.toString());

            String text = tesseract.doOCR(file.toFile());
            return new OcrResult(true, text == null ? "" : text.trim(), null);
        } catch (TesseractException | RuntimeException e) {
            return new OcrResult(false, "", e.getMessage());
        } catch (Throwable e) {
            return new OcrResult(false, "", "Tesseract native OCR failed: " + safeMessage(e));
        }
    }

    private boolean isSupportedOcrFile(Path file) {
        String name = file.getFileName().toString();
        int index = name.lastIndexOf('.');
        if (index < 0 || index == name.length() - 1) {
            return false;
        }
        return OCR_EXTENSIONS.contains(name.substring(index + 1).toLowerCase(Locale.ROOT));
    }

    private Path resolveDataPath() {
        String configured = properties.getOcr().getDataPath();
        if (configured != null && !configured.isBlank()) {
            return Paths.get(configured).toAbsolutePath().normalize();
        }

        String env = System.getenv("TESSDATA_PREFIX");
        if (env != null && !env.isBlank()) {
            return Paths.get(env).toAbsolutePath().normalize();
        }

        return null;
    }

    private String missingLanguages(Path dataPath) {
        if (!Files.isDirectory(dataPath)) {
            return "directory not found";
        }
        return Arrays.stream(properties.getOcr().getLanguage().split("\\+"))
                .map(String::trim)
                .filter(language -> !language.isBlank())
                .filter(language -> !Files.exists(dataPath.resolve(language + ".traineddata")))
                .collect(Collectors.joining(", "));
    }

    private String safeMessage(Throwable e) {
        String message = e.getMessage();
        return message == null || message.isBlank() ? e.getClass().getSimpleName() : message;
    }

    public record OcrResult(boolean available, String text, String error) {}
}
