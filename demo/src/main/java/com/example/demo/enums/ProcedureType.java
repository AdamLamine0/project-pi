package com.example.demo.enums;

public enum ProcedureType {
    SARL,
    SUARL,
    LABEL_STARTUP,
    PI,
    FISCALITE,
    CONFORMITE,

    /**
     * Legacy value kept only to read old database rows.
     * It is not exposed in the UI and cannot be used to create new procedures.
     */
    @Deprecated
    AUTRE
}
