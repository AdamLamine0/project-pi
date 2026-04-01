package com.projectmentor.communityservice.marketplace.repository;

import com.projectmentor.communityservice.marketplace.model.OpportunityApplication;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ApplicationRepository extends MongoRepository<OpportunityApplication, String> {

    List<OpportunityApplication> findByOpportunityId(String opportunityId);

    List<OpportunityApplication> findByCandidateId(String candidateId);
}