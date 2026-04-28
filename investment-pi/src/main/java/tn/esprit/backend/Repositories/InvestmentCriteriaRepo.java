package tn.esprit.backend.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import tn.esprit.backend.Entities.InvestmentCriteria;

import java.util.Optional;

public interface InvestmentCriteriaRepo extends MongoRepository<InvestmentCriteria, String> {
    Optional<InvestmentCriteria> findByInvestorId(String investorId);
    boolean existsByInvestorId(String investorId);
}
