package org.example.userpi.service;

import lombok.RequiredArgsConstructor;
import org.example.userpi.dto.ChangePasswordRequest;
import org.example.userpi.dto.UserDirectoryDto;
import org.example.userpi.model.User;
import org.example.userpi.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public List<UserDirectoryDto> getDirectoryUsers() {
        return userRepository.findAll().stream()
                .map(this::toDirectoryDto)
                .toList();
    }

    private UserDirectoryDto toDirectoryDto(User u) {
        return UserDirectoryDto.builder()
                .id(u.getId())
                .name(u.getName())
                .prenom(u.getPrenom())
                .email(u.getEmail())
                .role(u.getRole() != null ? u.getRole().name() : null)
                .build();
    }

    @Override
    public User getUserById(int id) {
        return userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User not found with id: " + id));
    }

    @Override
    public User updateUser(User user, int requestingUserId) {
        User existing = userRepository.findById(user.getId())
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        // own data check using ID
        if (existing.getId() != requestingUserId) {
            throw new RuntimeException(
                    "You can only update your own data"
            );
        }

        existing.setName(user.getName());
        existing.setPrenom(user.getPrenom());
        existing.setStatut(user.getStatut());

        // email change — check not taken
        if (!existing.getEmail().equals(user.getEmail())) {
            if (userRepository.existsByEmail(user.getEmail())) {
                throw new RuntimeException("Email already in use");
            }
            existing.setEmail(user.getEmail());
        }

        return userRepository.save(existing);
    }

    @Override
    public User addUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }

    @Override
    public void setPassword(int id, String password, int requestingUserId) {
        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        // own data check
        if (user.getId() != requestingUserId) {
            throw new RuntimeException(
                    "You can only set your own password"
            );
        }

        if (user.getPassword() != null) {
            throw new RuntimeException(
                    "Password already set. Use change-password instead."
            );
        }

        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
    }

    @Override
    public void changePassword(int id, ChangePasswordRequest request,
                               int requestingUserId) {
        User existing = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User not found with id: " + id));

        // own data check
        if (existing.getId() != requestingUserId) {
            throw new RuntimeException(
                    "You can only change your own password"
            );
        }

        if (!passwordEncoder.matches(request.getOldPassword(),
                existing.getPassword())) {
            throw new RuntimeException("Old password is incorrect");
        }

        existing.setPassword(passwordEncoder.encode(
                request.getNewPassword()
        ));
        userRepository.save(existing);
    }
}