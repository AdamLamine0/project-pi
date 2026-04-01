package com.projectmentor.communityservice.marketplace.controller;

import com.projectmentor.communityservice.marketplace.dto.ApplyDTO;
import com.projectmentor.communityservice.marketplace.dto.CreateOpportunityDTO;
import com.projectmentor.communityservice.marketplace.model.Opportunity;
import com.projectmentor.communityservice.marketplace.model.OpportunityApplication;
import com.projectmentor.communityservice.marketplace.service.MarketplaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/community/marketplace")
@RequiredArgsConstructor
public class MarketplaceController {

    private final MarketplaceService marketplaceService;

    // ── Opportunities ──────────────────────────────

    @PostMapping
    public Opportunity createOpportunity(@RequestBody CreateOpportunityDTO dto) {
        return marketplaceService.createOpportunity(dto);
    }

    @GetMapping
    public Page<Opportunity> getAllOpportunities(Pageable pageable) {
        return marketplaceService.getAllOpportunities(pageable);
    }

    @GetMapping("/sector/{sector}")
    public List<Opportunity> getBySector(@PathVariable String sector) {
        return marketplaceService.getOpportunitiesBySector(sector);
    }

    @GetMapping("/type/{type}")
    public List<Opportunity> getByType(@PathVariable String type) {
        return marketplaceService.getOpportunitiesByType(type);
    }

    @GetMapping("/my/{publisherId}")
    public List<Opportunity> getMyOpportunities(@PathVariable String publisherId) {
        return marketplaceService.getMyOpportunities(publisherId);
    }

    @PutMapping("/{id}/status")
    public Opportunity updateStatus(
            @PathVariable String id,
            @RequestParam String status) {
        return marketplaceService.updateStatus(id, status);
    }

    @DeleteMapping("/{id}")
    public void deleteOpportunity(@PathVariable String id) {
        marketplaceService.deleteOpportunity(id);
    }

    // ── Applications ───────────────────────────────

    @PostMapping("/{opportunityId}/apply")
    public OpportunityApplication apply(
            @PathVariable String opportunityId,
            @RequestBody ApplyDTO dto) {
        return marketplaceService.apply(opportunityId, dto);
    }

    @GetMapping("/applications/candidate/{candidateId}")
    public List<OpportunityApplication> getMyApplications(@PathVariable String candidateId) {
        return marketplaceService.getMyApplications(candidateId);
    }

    @GetMapping("/{opportunityId}/applications")
    public List<OpportunityApplication> getApplicationsForOpportunity(@PathVariable String opportunityId) {
        return marketplaceService.getApplicationsForOpportunity(opportunityId);
    }

    @PutMapping("/applications/{applicationId}/status")
    public OpportunityApplication updateApplicationStatus(
            @PathVariable String applicationId,
            @RequestParam String status) {
        return marketplaceService.updateApplicationStatus(applicationId, status);
    }

    @PutMapping("/applications/{applicationId}/withdraw")
    public void withdrawApplication(@PathVariable String applicationId) {
        marketplaceService.withdrawApplication(applicationId);
    }
}