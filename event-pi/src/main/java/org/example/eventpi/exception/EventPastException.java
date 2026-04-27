package org.example.eventpi.exception;

public class EventPastException extends RuntimeException {
    public EventPastException() {
        super("La date de l'événement ne peut pas être dans le passé.");
    }
}