package org.example.eventpi.dto;

import lombok.Data;

@Data
public class UserResponse {
    private Integer id;
    private String name;
    private String prenom;
    private String email;
    private String role;
    private String statut;
}