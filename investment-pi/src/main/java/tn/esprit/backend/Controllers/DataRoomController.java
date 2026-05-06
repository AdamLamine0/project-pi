package tn.esprit.backend.Controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.backend.DTO.DataRoomResponse;
import tn.esprit.backend.Entities.DataRoom;
import tn.esprit.backend.Entities.DocumentFile;
import tn.esprit.backend.Services.DataRoomService;
import tn.esprit.backend.Services.GridFsStorageService;
import tn.esprit.backend.Services.RequestActor;
import tn.esprit.backend.Services.UserRole;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/data-room")
@RequiredArgsConstructor
public class DataRoomController {
    private final DataRoomService dataRoomService;
    private final GridFsStorageService gridFsStorageService;

    @GetMapping("/{id}")
    public DataRoomResponse get(
            @PathVariable String id,
            @RequestHeader(value = "X-User-Id", required = false) String userId,
            @RequestHeader(value = "X-User-Role", required = false) String role
    ) {
        return dataRoomService.getDataRoomById(id, actor(userId, role));
    }

    @PostMapping("/add")
    public DataRoom createDR(@RequestBody DataRoom dR) {
        return dataRoomService.createDataRoom(dR.getStartupId(), dR.getInvestorId(), dR.getDealId());
    }

    @PostMapping("/deal/{dealId}/ensure")
    public DataRoom ensureForDeal(@PathVariable String dealId) {
        return dataRoomService.ensureDataRoomForDeal(dealId);
    }

    @PostMapping("/upload")
    public void upload(
            @RequestParam String roomId,
            @RequestParam String folder,
            @RequestParam MultipartFile file,
            @RequestHeader(value = "X-User-Id", required = false) String userId,
            @RequestHeader(value = "X-User-Role", required = false) String role
    ) {
        dataRoomService.upload(roomId, folder, file, actor(userId, role));
    }

    @GetMapping("/{roomId}/documents/{documentId}/view")
    public ResponseEntity<Resource> viewDocument(
            @PathVariable String roomId,
            @PathVariable String documentId,
            @RequestHeader(value = "X-User-Id", required = false) String userId,
            @RequestHeader(value = "X-User-Role", required = false) String role
    ) throws IOException {
        return serveDocument(roomId, documentId, true, actor(userId, role));
    }

    @GetMapping("/{roomId}/documents/{documentId}/download")
    public ResponseEntity<Resource> downloadDocument(
            @PathVariable String roomId,
            @PathVariable String documentId,
            @RequestHeader(value = "X-User-Id", required = false) String userId,
            @RequestHeader(value = "X-User-Role", required = false) String role
    ) throws IOException {
        return serveDocument(roomId, documentId, false, actor(userId, role));
    }

    private ResponseEntity<Resource> serveDocument(
            String roomId,
            String documentId,
            boolean inline,
            RequestActor actor
    ) throws IOException {
        DocumentFile document = dataRoomService.getDocument(roomId, documentId, actor);
        if (document.getStorageId() == null || document.getStorageId().isBlank()) {
            return ResponseEntity.notFound().build();
        }

        GridFsResource resource = gridFsStorageService.load(document.getStorageId());
        if (resource == null || !resource.exists()) {
            return ResponseEntity.notFound().build();
        }

        MediaType mediaType = MediaType.APPLICATION_OCTET_STREAM;
        if (document.getContentType() != null && !document.getContentType().isBlank()) {
            mediaType = MediaType.parseMediaType(document.getContentType());
        }

        String disposition = inline ? "inline" : "attachment";

        return ResponseEntity.ok()
                .contentType(mediaType)
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        disposition + "; filename=\"" + document.getFileName() + "\""
                )
                .body(resource);
    }

    private RequestActor actor(String userId, String role) {
        String resolvedRole = normalizeRole(role);
        String resolvedUser = userId == null || userId.isBlank() ? "dev-investor" : userId.trim();
        return new RequestActor(resolvedUser, UserRole.valueOf(resolvedRole));
    }

    private String normalizeRole(String role) {
        if (role == null || role.isBlank()) {
            return "INVESTOR";
        }

        for (String candidate : role.split(",")) {
            String normalized = candidate.trim().toUpperCase();
            if (normalized.startsWith("ROLE_")) {
                normalized = normalized.substring("ROLE_".length());
            }
            if ("ENTREPRENEUR".equals(normalized)) {
                return "STARTUP";
            }
            if ("INVESTOR".equals(normalized) || "STARTUP".equals(normalized) || "ADMIN".equals(normalized)) {
                return normalized;
            }
        }

        return "ADMIN";
    }

    @ExceptionHandler(SecurityException.class)
    public ResponseEntity<Map<String, String>> handleSecurity(SecurityException ex) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", ex.getMessage()));
    }
}
