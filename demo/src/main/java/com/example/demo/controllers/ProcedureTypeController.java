package com.example.demo.controllers;

import com.example.demo.services.ProcedureTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/procedure-types")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ProcedureTypeController {

    private final ProcedureTypeService service;

    @GetMapping("/overview")
    public List<?> getOverview() {
        return service.getOverview();
    }

    @GetMapping("/{type}/requirements")
    public List<?> getRequirements(@PathVariable String type) {
        return service.getRequirements(type);
    }
}