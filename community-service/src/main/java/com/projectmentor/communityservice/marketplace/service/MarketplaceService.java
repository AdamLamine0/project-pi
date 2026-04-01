package com.projectmentor.communityservice.marketplace.service;

import com.projectmentor.communityservice.marketplace.dto.ApplyDTO;
import com.projectmentor.communityservice.marketplace.dto.CreateOpportunityDTO;
import com.projectmentor.communityservice.marketplace.model.*;
import com.projectmentor.communityservice.marketplace.repository.ApplicationRepository;
import com.projectmentor.communityservice.marketplace.repository.OpportunityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MarketplaceService {

    private final OpportunityRepository opportunityRepository;
    private final ApplicationRepository applicationRepository;

    // ── Opportunities ──────────────────────────────

    public Opportunity createOpportunity(CreateOpportunityDTO dto) {
        Opportunity opp = Opportunity.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .publisherId(dto.getPublisherId())
                .type(OpportunityType.valueOf(dto.getType()))
                .skillsRequired(dto.getSkillsRequired())
                .sector(dto.getSector())
                .location(dto.getLocation())
                .status(OpportunityStatus.OPEN)
                .viewsCount(0)
                .applicationsCount(0)
                .expiresAt(dto.getExpiresAt())
                .createdAt(LocalDateTime.now())
                .deleted(false)
                .build();
        return opportunityRepository.save(opp);
    }

    public Page<Opportunity> getAllOpportunities(Pageable pageable) {
        return opportunityRepository.findByDeletedFalse(pageable);
    }

    public List<Opportunity> getOpportunitiesBySector(String sector) {
        return opportunityRepository.findBySectorAndDeletedFalse(sector);
    }

    public List<Opportunity> getOpportunitiesByType(String type) {
        return opportunityRepository.findByTypeAndDeletedFalse(OpportunityType.valueOf(type));
    }

    public List<Opportunity> getMyOpportunities(String publisherId) {
        return opportunityRepository.findByPublisherIdAndDeletedFalse(publisherId);
    }

    // soft delete
    public void deleteOpportunity(String id) {
        Opportunity opp = opportunityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Opportunity not found"));
        opp.setDeleted(true);
        opportunityRepository.save(opp);
    }

    // update status
    public Opportunity updateStatus(String id, String status) {
        Opportunity opp = opportunityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Opportunity not found"));
        opp.setStatus(OpportunityStatus.valueOf(status));
        return opportunityRepository.save(opp);
    }

    // ── Applications ───────────────────────────────

    public OpportunityApplication apply(String opportunityId, ApplyDTO dto) {
        Opportunity opp = opportunityRepository.findById(opportunityId)
                .orElseThrow(() -> new RuntimeException("Opportunity not found"));

        OpportunityApplication application = OpportunityApplication.builder()
                .opportunityId(opportunityId)
                .candidateId(dto.getCandidateId())
                .cvUrl(dto.getCvUrl())
                .coverLetter(dto.getCoverLetter())
                .status(ApplicationStatus.SENT)
                .appliedAt(LocalDateTime.now())
                .build();

        // incrémenter le compteur
        opp.setApplicationsCount(opp.getApplicationsCount() + 1);
        opportunityRepository.save(opp);

        return applicationRepository.save(application);
    }

    // dashboard candidat
    public List<OpportunityApplication> getMyApplications(String candidateId) {
        return applicationRepository.findByCandidateId(candidateId);
    }

    // dashboard publieur
    public List<OpportunityApplication> getApplicationsForOpportunity(String opportunityId) {
        return applicationRepository.findByOpportunityId(opportunityId);
    }

    // update statut candidature
    public OpportunityApplication updateApplicationStatus(String applicationId, String status) {
        OpportunityApplication app = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        app.setStatus(ApplicationStatus.valueOf(status));
        return applicationRepository.save(app);
    }

    // retirer candidature
    public void withdrawApplication(String applicationId) {
        OpportunityApplication app = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        app.setStatus(ApplicationStatus.WITHDRAWN);
        applicationRepository.save(app);
    }
}