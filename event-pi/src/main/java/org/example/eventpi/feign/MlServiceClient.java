package org.example.eventpi.feign;

import org.example.eventpi.dto.MlFullAnalysisResponse;
import org.example.eventpi.dto.PredictionInputRequest;
import org.example.eventpi.dto.RegistrationPredictionResponse;
import org.example.eventpi.dto.SuccessPredictionResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "ml-service", url = "${ml-service.url:http://localhost:8085}")
public interface MlServiceClient {

    @PostMapping("/predict/registrations")
    RegistrationPredictionResponse predictRegistrations(@RequestBody PredictionInputRequest request);

    @PostMapping("/predict/success-score")
    SuccessPredictionResponse predictSuccessScore(@RequestBody PredictionInputRequest request);

    @PostMapping("/predict/full-analysis")
    MlFullAnalysisResponse predictFullAnalysis(@RequestBody PredictionInputRequest request);
}
