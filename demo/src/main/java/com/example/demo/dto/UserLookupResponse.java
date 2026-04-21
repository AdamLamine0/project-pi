package com.example.demo.dto;

public record UserLookupResponse(
        Integer id,
        String name,
        String nom,
        String prenom,
        String firstName,
        String lastName,
        String fullName,
        String username,
        String email
) {
    public String fullName() {
        if (fullName != null && !fullName.isBlank()) {
            return fullName;
        }

        String first = firstNonBlank(name, nom, lastName);
        String second = firstNonBlank(prenom, firstName);
        String value = (first + " " + second).trim();
        return firstNonBlank(value, username, email);
    }

    private static String firstNonBlank(String... values) {
        for (String value : values) {
            if (value != null && !value.isBlank()) {
                return value.trim();
            }
        }
        return "";
    }
}
