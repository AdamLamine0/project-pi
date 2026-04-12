package com.example.demo.repository;

import com.example.demo.entity.ProcedureDocumentRequirement;
import com.example.demo.enums.ProcedureType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;


import com.example.demo.entity.ProcedureDocumentRequirement;
import com.example.demo.enums.ProcedureType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ProcedureDocumentRequirementRepository
        extends JpaRepository<ProcedureDocumentRequirement, UUID> {

    List<ProcedureDocumentRequirement> findByProcedureType(ProcedureType type);
    boolean existsByProcedureTypeAndCode(ProcedureType procedureType, String code);
}
