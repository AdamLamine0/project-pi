package com.example.demo.controllers;

import com.example.demo.services.ProcedureTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/procedure-types")
@RequiredArgsConstructor
public class ProcedureTypeController {

    private final ProcedureTypeService service;

    @GetMapping("/overview")
    public List<?> getOverview() {
        return service.getOverview();
    }

    @GetMapping
    public ResponseEntity<?> example(
            @RequestHeader("X-User-Id") String userId,
            @RequestHeader("X-User-Role") String role) {

        return null;
    }
    @GetMapping("/{type}/requirements")
    public List<?> getRequirements(@PathVariable String type) {
        return service.getRequirements(type);
    }
}