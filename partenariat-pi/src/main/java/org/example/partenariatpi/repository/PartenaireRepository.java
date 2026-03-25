package org.example.partenariatpi.repository;

import org.example.partenariatpi.model.Partenaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PartenaireRepository extends JpaRepository<Partenaire, Integer> {
    List<Partenaire> findByUserIdsContaining(int userId);
}