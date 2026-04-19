package org.example.partenariatpi.feign;

import lombok.Data;

@Data
public class UserDto {
    private int id;
    private String name;
    private String prenom;
    private String email;
}