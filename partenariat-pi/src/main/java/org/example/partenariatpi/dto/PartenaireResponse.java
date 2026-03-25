package org.example.partenariatpi.dto;

import lombok.Data;
import java.util.Set;

@Data
public class PartenaireResponse {
    private Integer id;
    private String nom;
    private String type;
    private String contact;
    private String siteWeb;
    private Set<Integer> userIds;
}