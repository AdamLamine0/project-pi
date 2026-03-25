package org.example.partenariatpi.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Partenaire {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nom;
    private String type;
    private String contact;
    private String siteWeb;

    @ElementCollection
    @CollectionTable(
            name = "partenaire_users",
            joinColumns = @JoinColumn(name = "partenaire_id")
    )
    @Column(name = "user_id")
    private Set<Integer> userIds = new HashSet<>();
}