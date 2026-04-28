package com.example.demo.repository;

import com.example.demo.entity.LegalProcedure;
import com.example.demo.enums.ProcedureStatus;
import com.example.demo.enums.ProcedureType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface LegalProcedureRepository extends JpaRepository<LegalProcedure, UUID> {

    List<LegalProcedure> findByEntrepreneurId(Integer entrepreneurId);

    List<LegalProcedure> findByExpertId(Integer expertId);

    List<LegalProcedure> findByExpertIdAndStatus(Integer expertId, ProcedureStatus status);
    long countByStatus(ProcedureStatus status);
    long countByProcedureType(ProcedureType procedureType);
}
