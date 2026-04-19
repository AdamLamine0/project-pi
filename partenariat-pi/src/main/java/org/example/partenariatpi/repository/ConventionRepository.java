package org.example.partenariatpi.repository;

import org.example.partenariatpi.model.Convention;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConventionRepository extends JpaRepository<Convention, Integer> {

    List<Convention> findByUserId(Integer userId);

    List<Convention> findByOrganisationPartenaireId(Integer orgId);

    List<Convention> findByUserIdAndOrganisationPartenaireId(Integer userId, Integer orgId);

    // All conventions where a renewal is pending (field not null)
    List<Convention> findByRenouvellementDemandeParRoleIsNotNull();
}