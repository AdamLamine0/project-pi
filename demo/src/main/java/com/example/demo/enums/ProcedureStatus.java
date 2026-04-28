package com.example.demo.enums;

public enum ProcedureStatus {
    BROUILLON,         // At creation
    EN_COURS,         // After submit (automatic)
    EN_ATTENTE_EXPERT, // After AI validation (automatic)
    COMPLETE,         // After expert validation (automatic)
    REFUSE            // AI or expert rejection (automatic)
}
