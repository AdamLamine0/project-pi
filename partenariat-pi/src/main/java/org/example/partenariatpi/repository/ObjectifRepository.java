package org.example.partenariatpi.repository;

import org.example.partenariatpi.model.Objectif;
import org.example.partenariatpi.enums.StatutObjectif;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ObjectifRepository extends JpaRepository<Objectif, Integer> {

    // All objectifs for a convention
    List<Objectif> findByConventionId(Integer conventionId);

    // Filter by statut — used by front to show EN_RETARD, ATTEINT etc.
    List<Objectif> findByConventionIdAndStatut(Integer conventionId,
                                               StatutObjectif statut);

    // Filter by responsable — USER objectifs vs PARTENAIRE objectifs
    List<Objectif> findByConventionIdAndResponsable(
            Integer conventionId,
            org.example.partenariatpi.enums.ResponsableObjectif responsable);
}