package com.projectmentor.communityservice.marketplace.repository;

import com.projectmentor.communityservice.marketplace.model.Opportunity;
import com.projectmentor.communityservice.marketplace.model.OpportunityStatus;
import com.projectmentor.communityservice.marketplace.model.OpportunityType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface OpportunityRepository extends MongoRepository<Opportunity, String> {

    Page<Opportunity> findByDeletedFalse(Pageable pageable);

    List<Opportunity> findBySectorAndDeletedFalse(String sector);

    List<Opportunity> findByTypeAndDeletedFalse(OpportunityType type);

    List<Opportunity> findByPublisherIdAndDeletedFalse(String publisherId);

    List<Opportunity> findByStatusAndDeletedFalse(OpportunityStatus status);
}