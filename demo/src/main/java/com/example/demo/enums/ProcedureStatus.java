package com.example.demo.enums;

public enum ProcedureStatus {
    BROUILLON,        // À la création
    EN_COURS,         // Après Submit (automatique)
    EN_ATTENTE_EXPERT, // Après validation IA (automatique)
    COMPLETE,         // Après validation expert (automatique)
    REFUSE            // Refus IA ou expert (automatique)
}

