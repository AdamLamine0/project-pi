package org.example.partenariatpi.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.partenariatpi.dto.PartenaireRequest;
import org.example.partenariatpi.dto.PartenaireResponse;
import org.example.partenariatpi.feign.UserDto;
import org.example.partenariatpi.service.PartenaireService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/partners")
@RequiredArgsConstructor
public class PartenaireController {

    private final PartenaireService partenaireService;

    // ✅ anyone authenticated
    @GetMapping
    public ResponseEntity<List<PartenaireResponse>> getAll() {
        return ResponseEntity.ok(partenaireService.getAll());
    }

    // ✅ anyone authenticated
    @GetMapping("/{id}")
    public ResponseEntity<PartenaireResponse> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(partenaireService.getById(id));
    }

    // ✅ anyone authenticated
    @GetMapping("/by-user/{userId}")
    public ResponseEntity<List<PartenaireResponse>> getByUser(
            @PathVariable Integer userId) {
        return ResponseEntity.ok(partenaireService.getByUserId(userId));
    }

    // ✅ anyone authenticated
    @GetMapping("/{id}/users")
    public ResponseEntity<List<UserDto>> getUsers(@PathVariable Integer id) {
        return ResponseEntity.ok(partenaireService.getUsersOfPartenaire(id));
    }

    // 🔒 ADMIN only
    @PostMapping
    public ResponseEntity<PartenaireResponse> create(
            @Valid @RequestBody PartenaireRequest request,
            @RequestHeader("X-User-Role") String role) {
        checkAdmin(role);
        return ResponseEntity.ok(partenaireService.create(request));
    }

    // 🔒 ADMIN only
    @PutMapping("/{id}")
    public ResponseEntity<PartenaireResponse> update(
            @PathVariable Integer id,
            @Valid @RequestBody PartenaireRequest request,
            @RequestHeader("X-User-Role") String role) {
        checkAdmin(role);
        return ResponseEntity.ok(partenaireService.update(id, request));
    }

    // 🔒 ADMIN only
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Integer id,
            @RequestHeader("X-User-Role") String role) {
        checkAdmin(role);
        partenaireService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // 🔒 ADMIN only
    @PostMapping("/{id}/users/{userId}")
    public ResponseEntity<PartenaireResponse> addUser(
            @PathVariable Integer id,
            @PathVariable Integer userId,
            @RequestHeader("X-User-Role") String role) {
        checkAdmin(role);
        return ResponseEntity.ok(partenaireService.addUser(id, userId));
    }

    // 🔒 user can only remove THEMSELVES
    @DeleteMapping("/{id}/users/{userId}")
    public ResponseEntity<PartenaireResponse> removeUser(
            @PathVariable Integer id,
            @PathVariable Integer userId,
            @RequestHeader("X-User-Id") String requestingUserId,
            @RequestHeader("X-User-Role") String role) {
        partenaireService.removeUser(id, userId,
                Integer.parseInt(requestingUserId), role);
        return ResponseEntity.ok(partenaireService.getById(id));
    }

    // private helper
    private void checkAdmin(String role) {
        if (!"ROLE_ADMIN".equals(role)) {
            throw new RuntimeException("Access denied: ADMIN role required");
        }
    }
}