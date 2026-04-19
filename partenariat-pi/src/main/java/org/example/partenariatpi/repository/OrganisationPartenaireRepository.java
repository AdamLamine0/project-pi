package org.example.partenariatpi.repository;

import org.example.partenariatpi.model.OrganisationPartenaire;
import org.example.partenariatpi.enums.StatutPartenaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrganisationPartenaireRepository
        extends JpaRepository<OrganisationPartenaire, Integer> {

    // PARTNER dashboard: find their institution by their userId from JWT
    Optional<OrganisationPartenaire> findByUserId(Integer userId);

    // ADMIN: filter by status
    List<OrganisationPartenaire> findByStatut(StatutPartenaire statut);
}