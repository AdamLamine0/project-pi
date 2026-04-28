package com.pi.gestionprojets.repository;

import com.pi.gestionprojets.model.TeamMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TeamMemberRepository extends JpaRepository<TeamMember, Long> {
    List<TeamMember> findByProjectId(Long projectId);
    List<TeamMember> findByUserId(Long userId);
}
