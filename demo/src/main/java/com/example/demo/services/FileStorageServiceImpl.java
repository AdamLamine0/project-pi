package com.example.demo.services;



import com.example.demo.config.UploadProperties;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.Locale;
import java.util.UUID;

@Service
public class FileStorageServiceImpl implements FileStorageService {

    private final Path uploadPath;
    private final UploadProperties uploadProperties;

    public FileStorageServiceImpl(UploadProperties uploadProperties) throws IOException {
        this.uploadProperties = uploadProperties;

        String dir = uploadProperties.getUpload() != null ? uploadProperties.getUpload().getDir() : null;
        if (dir == null || dir.isBlank()) {
            throw new IllegalStateException("La propriété app.upload.dir est absente ou vide.");
        }

        this.uploadPath = Paths.get(dir).toAbsolutePath().normalize();
        Files.createDirectories(this.uploadPath);
    }

    @Override
    public String store(MultipartFile file) {
        try {
            if (file == null || file.isEmpty()) {
                throw new IllegalArgumentException("Le fichier est vide.");
            }

            String originalName = StringUtils.cleanPath(file.getOriginalFilename());
            String extension = "";

            int index = originalName.lastIndexOf('.');
            if (index >= 0) {
                extension = originalName.substring(index);
            }

            String generatedName = UUID.randomUUID() + extension;
            Path targetLocation = this.uploadPath.resolve(generatedName);

            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            String baseUrl = uploadProperties.getBaseUrl();
            if (baseUrl == null || baseUrl.isBlank()) {
                baseUrl = "http://localhost:8087";
            }

            return baseUrl + "/api/files/" + generatedName;

        } catch (IOException e) {
            throw new RuntimeException("Erreur lors du stockage du fichier.", e);
        }
    }

    @Override
    public String storeGenerated(String baseName, String extension, byte[] content) {
        try {
            if (content == null || content.length == 0) {
                throw new IllegalArgumentException("Le contenu genere est vide.");
            }

            String safeBaseName = sanitizeBaseName(baseName);
            String safeExtension = sanitizeExtension(extension);
            String generatedName = safeBaseName + "-" + UUID.randomUUID() + safeExtension;
            Path targetLocation = this.uploadPath.resolve(generatedName).normalize();

            if (!targetLocation.startsWith(this.uploadPath)) {
                throw new IllegalArgumentException("Nom de fichier genere invalide.");
            }

            Files.write(targetLocation, content, StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);
            return fileUrl(generatedName);
        } catch (IOException e) {
            throw new RuntimeException("Erreur lors du stockage du fichier genere.", e);
        }
    }

    private String sanitizeBaseName(String baseName) {
        String value = baseName == null ? "generated-file" : baseName;
        value = StringUtils.cleanPath(value)
                .toLowerCase(Locale.ROOT)
                .replaceAll("[^a-z0-9._-]+", "-")
                .replaceAll("^-+|-+$", "");
        return value.isBlank() ? "generated-file" : value;
    }

    private String sanitizeExtension(String extension) {
        if (extension == null || extension.isBlank()) {
            return "";
        }
        String value = extension.trim().toLowerCase(Locale.ROOT);
        if (!value.startsWith(".")) {
            value = "." + value;
        }
        return value.replaceAll("[^a-z0-9.]+", "");
    }

    private String fileUrl(String filename) {
        String baseUrl = uploadProperties.getBaseUrl();
        if (baseUrl == null || baseUrl.isBlank()) {
            baseUrl = "http://localhost:8087";
        }
        return baseUrl + "/api/files/" + filename;
    }
}
