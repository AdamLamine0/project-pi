package com.pi.gestionprojets.repository;

import com.pi.gestionprojets.model.Project;
import com.pi.gestionprojets.model.ProjectStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByStatus(ProjectStatus status);
    List<Project> findByLeaderId(Long leaderId);
    List<Project> findByTitleContainingIgnoreCase(String title);
}
