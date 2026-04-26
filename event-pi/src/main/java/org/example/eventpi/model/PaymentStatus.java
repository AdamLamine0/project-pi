package org.example.eventpi.model;

public enum PaymentStatus {
    FREE,    // free event, no payment needed
    PENDING, // paid event, awaiting payment
    PAID,    // payment confirmed
    FAILED   // payment attempt failed
}
