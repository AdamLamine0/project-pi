package com.example.demo.repository;

import com.example.demo.entity.LegalProcedure;
import com.example.demo.enums.ProcedureStatus;
import com.example.demo.enums.ProcedureType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface LegalProcedureRepository extends JpaRepository<LegalProcedure, UUID> {

    List<LegalProcedure> findByEntrepreneurId(UUID entrepreneurId);

    List<LegalProcedure> findByStatus(ProcedureStatus status);

    List<LegalProcedure> findByProcedureType(ProcedureType procedureType);

    List<LegalProcedure> findByEntrepreneurIdAndStatus(UUID entrepreneurId, ProcedureStatus status);

    long countByProcedureType(ProcedureType procedureType);
}

