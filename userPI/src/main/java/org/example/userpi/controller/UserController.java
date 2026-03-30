package org.example.userpi.controller;

import lombok.RequiredArgsConstructor;
import org.example.userpi.dto.ChangePasswordRequest;
import org.example.userpi.dto.SetPasswordRequest;
import org.example.userpi.model.User;
import org.example.userpi.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // ADMIN only
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    // any logged in user
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable int id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    // Google user sets password
    @PostMapping("/{id}/set-password")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> setPassword(
            @PathVariable int id,
            @RequestBody SetPasswordRequest request,
            @RequestHeader("X-User-Id") int requestingUserId) {
        userService.setPassword(id, request.getPassword(), requestingUserId);
        return ResponseEntity.ok("Password set successfully");
    }

    // own data only
    @PutMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<User> updateUser(
            @RequestBody User user,
            @RequestHeader("X-User-Id") int requestingUserId) {
        return ResponseEntity.ok(
                userService.updateUser(user, requestingUserId)
        );
    }

    // own data only
    @PutMapping("/{id}/change-password")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> changePassword(
            @PathVariable int id,
            @RequestBody ChangePasswordRequest request,
            @RequestHeader("X-User-Id") int requestingUserId) {
        userService.changePassword(id, request, requestingUserId);
        return ResponseEntity.noContent().build();
    }

    // ADMIN only
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteUser(@PathVariable int id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}