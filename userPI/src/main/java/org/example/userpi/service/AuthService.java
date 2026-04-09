package org.example.userpi.service;

import lombok.RequiredArgsConstructor;
import org.example.userpi.config.JwtService;
import org.example.userpi.dto.AuthRequest;
import org.example.userpi.dto.AuthResponse;
import org.example.userpi.dto.RegisterRequest;
import org.example.userpi.model.User;
import org.example.userpi.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import org.example.userpi.Enum.Role;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {
        User user = new User();
        user.setName(request.getName());
        user.setPrenom(request.getPrenom());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setDateInscription(LocalDate.now());
        user.setStatut("active");

        // Use provided role or default to USER
        user.setRole(request.getRole() != null ? request.getRole() : Role.USER);

        userRepository.save(user);
        return new AuthResponse(jwtService.generateToken(user));
    }

    public AuthResponse login(AuthRequest request) {
        // check email exists
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("No account found with this email"));

        // check if Google user with no password
        if (user.getPassword() == null) {
            throw new RuntimeException(
                    "This account uses Google login. Please login with Google."
            );
        }

        // check password not empty or null
        if (request.getPassword() == null
                || request.getPassword().trim().isEmpty()) {
            throw new RuntimeException("Password cannot be empty");
        }

        // authenticate
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(), request.getPassword()
                    )
            );
        } catch (BadCredentialsException e) {
            throw new RuntimeException("Incorrect password");
        }

        return new AuthResponse(jwtService.generateToken(user));
    }
}