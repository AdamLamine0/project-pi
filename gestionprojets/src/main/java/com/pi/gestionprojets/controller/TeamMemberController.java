package com.pi.gestionprojets.controller;

import com.pi.gestionprojets.model.TeamMember;
import com.pi.gestionprojets.service.TeamMemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/projects/{projectId}/team-members")
@CrossOrigin(origins = "*", maxAge = 3600)
public class TeamMemberController {
    
    @Autowired
    private TeamMemberService teamMemberService;
    
    @GetMapping
    public ResponseEntity<List<TeamMember>> getTeamMembers(@PathVariable Long projectId) {
        return ResponseEntity.ok(teamMemberService.getTeamMembersByProjectId(projectId));
    }
    
    @GetMapping("/{memberId}")
    public ResponseEntity<TeamMember> getTeamMemberById(@PathVariable Long projectId, 
                                                        @PathVariable Long memberId) {
        Optional<TeamMember> member = teamMemberService.getTeamMemberById(memberId);
        return member.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<TeamMember> addTeamMember(@PathVariable Long projectId,
                                                    @RequestBody TeamMember teamMember) {
        teamMember.setProjectId(projectId);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(teamMemberService.addTeamMember(teamMember));
    }
    
    @PutMapping("/{memberId}")
    public ResponseEntity<TeamMember> updateTeamMember(@PathVariable Long projectId,
                                                       @PathVariable Long memberId,
                                                       @RequestBody TeamMember memberDetails) {
        TeamMember updatedMember = teamMemberService.updateTeamMember(memberId, memberDetails);
        if (updatedMember != null) {
            return ResponseEntity.ok(updatedMember);
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{memberId}")
    public ResponseEntity<Void> removeTeamMember(@PathVariable Long projectId, 
                                                 @PathVariable Long memberId) {
        teamMemberService.removeTeamMember(memberId);
        return ResponseEntity.noContent().build();
    }
}
