package org.example.eventpi.exception;

public class EventFullException extends RuntimeException {
    public EventFullException(Long eventId) {
        super("L'événement #" + eventId + " est complet. Les inscriptions sont fermées.");
    }
}