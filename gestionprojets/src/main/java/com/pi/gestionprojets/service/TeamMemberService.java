package com.pi.gestionprojets.service;

import com.pi.gestionprojets.model.TeamMember;
import com.pi.gestionprojets.repository.TeamMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TeamMemberService {
    
    @Autowired
    private TeamMemberRepository teamMemberRepository;
    
    public List<TeamMember> getTeamMembersByProjectId(Long projectId) {
        return teamMemberRepository.findByProjectId(projectId);
    }
    
    public Optional<TeamMember> getTeamMemberById(Long id) {
        return teamMemberRepository.findById(id);
    }
    
    public TeamMember addTeamMember(TeamMember teamMember) {
        return teamMemberRepository.save(teamMember);
    }
    
    public TeamMember updateTeamMember(Long id, TeamMember memberDetails) {
        Optional<TeamMember> member = teamMemberRepository.findById(id);
        if (member.isPresent()) {
            TeamMember existingMember = member.get();
            existingMember.setUserName(memberDetails.getUserName());
            existingMember.setEmail(memberDetails.getEmail());
            existingMember.setRole(memberDetails.getRole());
            return teamMemberRepository.save(existingMember);
        }
        return null;
    }
    
    public void removeTeamMember(Long id) {
        teamMemberRepository.deleteById(id);
    }
    
    public List<TeamMember> getTeamMembersByUserId(Long userId) {
        return teamMemberRepository.findByUserId(userId);
    }
}
