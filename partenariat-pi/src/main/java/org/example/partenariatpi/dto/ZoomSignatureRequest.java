package org.example.partenariatpi.dto;

import lombok.Data;

@Data
public class ZoomSignatureRequest {
    private String meetingNumber;
    private int role; // 0 for participant, 1 for host
}

