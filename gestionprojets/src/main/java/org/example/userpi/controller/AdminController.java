package org.example.userpi.controller;

import lombok.RequiredArgsConstructor;
import org.example.userpi.dto.ServiceInstanceResponse;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final DiscoveryClient discoveryClient;

    @GetMapping("/services")
    public ResponseEntity<List<ServiceInstanceResponse>> getDiscoveredServices() {
        List<ServiceInstanceResponse> services = new ArrayList<>();

        for (String serviceName : discoveryClient.getServices()) {
            List<ServiceInstance> instances = discoveryClient.getInstances(serviceName);
            for (ServiceInstance instance : instances) {
                Map<String, String> metadata = instance.getMetadata() == null ? Map.of() : instance.getMetadata();
                String status = metadata.getOrDefault("status", "UP");

                services.add(new ServiceInstanceResponse(
                        serviceName,
                        instance.getInstanceId(),
                        instance.getHost(),
                        instance.getPort(),
                        instance.getUri().toString(),
                        instance.isSecure(),
                        status,
                        metadata
                ));
            }
        }

        services.sort(Comparator
                .comparing(ServiceInstanceResponse::getServiceName)
                .thenComparing(ServiceInstanceResponse::getInstanceId, Comparator.nullsLast(String::compareTo)));

        return ResponseEntity.ok(services);
    }
}
