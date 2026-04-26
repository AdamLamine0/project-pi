package tn.esprit.backend.Services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.backend.Entities.InvestmentCriteria;
import tn.esprit.backend.Repositories.InvestmentCriteriaRepo;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InvestmentCriteriaServiceImp implements InvestmentCriteriaService{
    private final InvestmentCriteriaRepo investmentCriteriaRepo;

    @Override
    public InvestmentCriteria getInvestmentCriteria(String icId) {
        return investmentCriteriaRepo.findById(icId).orElseThrow(() -> new RuntimeException("InvestmentCriteria not found"));
    }

    @Override
    public List<InvestmentCriteria> getInvestmentCriteriaByInvestor(String investorId) {
        String normalizedInvestorId = normalizeInvestorId(investorId);
        return investmentCriteriaRepo.findByInvestorId(normalizedInvestorId)
                .map(criteria -> List.of(criteria))
                .orElseGet(List::of);
    }

    @Override
    public InvestmentCriteria addInvestmentCriteria(InvestmentCriteria ic) {
        String investorId = normalizeInvestorId(ic.getInvestorId());
        if (investmentCriteriaRepo.existsByInvestorId(investorId)) {
            throw new IllegalArgumentException("Each investor can only have one investment criteria.");
        }

        ic.setInvestorId(investorId);
        LocalDateTime now = LocalDateTime.now();
        ic.setCreatedAt(now);
        ic.setUpdatedAt(now);
        if (ic.getActive() == null) {
            ic.setActive(true);
        }
        return investmentCriteriaRepo.save(ic);
    }

    @Override
    public InvestmentCriteria updateInvestmentCriteria(InvestmentCriteria ic) {
        if (ic.getId() == null || ic.getId().isBlank()) {
            throw new IllegalArgumentException("Investment criteria id is required.");
        }

        InvestmentCriteria existing = getInvestmentCriteria(ic.getId());
        String investorId = normalizeInvestorId(ic.getInvestorId());
        investmentCriteriaRepo.findByInvestorId(investorId)
                .filter(criteria -> !criteria.getId().equals(ic.getId()))
                .ifPresent(criteria -> {
                    throw new IllegalArgumentException("Each investor can only have one investment criteria.");
                });

        ic.setInvestorId(investorId);
        ic.setCreatedAt(existing.getCreatedAt());
        ic.setUpdatedAt(LocalDateTime.now());
        if (ic.getActive() == null) {
            ic.setActive(existing.getActive() != null ? existing.getActive() : true);
        }
        return investmentCriteriaRepo.save(ic);
    }

    @Override
    public void deleteInvestmentCriteria(String icId) {
        investmentCriteriaRepo.deleteById(icId);

    }

    @Override
    public List<InvestmentCriteria> getAllInvestmentCriterias() {
        return investmentCriteriaRepo.findAll();
    }

    private String normalizeInvestorId(String investorId) {
        if (investorId == null || investorId.isBlank()) {
            throw new IllegalArgumentException("Investor id is required.");
        }
        return investorId.trim();
    }
}
