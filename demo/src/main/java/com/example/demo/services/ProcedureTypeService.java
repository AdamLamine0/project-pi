package com.example.demo.services;
import java.util.List;

public interface ProcedureTypeService {

    List<?> getOverview();

    List<?> getRequirements(String type);
}