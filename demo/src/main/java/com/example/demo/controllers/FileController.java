package com.example.demo.controllers;

import com.example.demo.config.UploadProperties;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/files")
public class FileController {

    private final Path uploadPath;

    public FileController(UploadProperties uploadProperties) {
        String dir = uploadProperties.getUpload() != null ? uploadProperties.getUpload().getDir() : null;

        if (dir == null || dir.isBlank()) {
            throw new IllegalStateException("La propriété app.upload.dir est absente ou vide.");
        }

        this.uploadPath = Paths.get(dir).toAbsolutePath().normalize();
    }
    // In any controller method:
    @GetMapping
    public ResponseEntity<?> example(
            @RequestHeader("X-User-Id") String userId,
            @RequestHeader("X-User-Role") String role) {
        // userId and role come from the gateway — no JWT parsing needed
        return null;
    }

    @GetMapping("/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        try {
            Path filePath = uploadPath.resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists() || !Files.exists(filePath)) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filename + "\"")
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(resource);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}