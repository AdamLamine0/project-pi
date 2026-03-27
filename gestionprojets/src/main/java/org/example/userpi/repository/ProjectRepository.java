package org.example.userpi.repository;

import org.example.userpi.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, String> {
    
    List<Project> findByManagerId(String managerId);
    
    @org.springframework.data.jpa.repository.Query("select p from Project p join p.memberIds m where m = :userId")
    List<Project> findByMemberIdsContaining(@Param("userId") String userId);
    
    List<Project> findByStatut(String statut);
    
    List<Project> findByPriorite(String priorite);
    
    @org.springframework.data.jpa.repository.Query("select p from Project p where p.dateDebut >= :startDate and p.dateFin <= :endDate")
    List<Project> findProjectsInDateRange(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    
    List<Project> findByCategorie(String categorie);
    
    @org.springframework.data.jpa.repository.Query("select p from Project p where lower(p.titre) like lower(concat('%', :titre, '%'))")
    List<Project> searchByTitle(@Param("titre") String titre);
}
