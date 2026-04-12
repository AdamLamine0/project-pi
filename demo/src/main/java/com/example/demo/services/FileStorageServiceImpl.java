package com.example.demo.services;



import com.example.demo.config.UploadProperties;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
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
}