package org.example.userpi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ServiceInstanceResponse {
    private String serviceName;
    private String instanceId;
    private String host;
    private int port;
    private String uri;
    private boolean secure;
    private String status;
    private Map<String, String> metadata;
}
