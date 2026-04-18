package org.example.userpi.service;

import org.example.userpi.dto.ChangePasswordRequest;
import org.example.userpi.dto.UserDirectoryDto;
import org.example.userpi.model.User;
import java.util.List;

public interface UserService {
    List<User> getAllUsers();

    List<UserDirectoryDto> getDirectoryUsers();
    User getUserById(int id);
    User updateUser(User user, int requestingUserId);
    User addUser(User user);
    void deleteUser(int id);
    void setPassword(int id, String password, int requestingUserId);
    void changePassword(int id, ChangePasswordRequest request, int requestingUserId);
}