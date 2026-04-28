package org.example.partenariatpi.enums;

public enum MeetingStatus {
    /** Request sent, awaiting partner response */
    PENDING,

    /** Partner accepted — Zoom meeting has been created */
    ACCEPTED,

    /** Partner rejected — see rejectionReason on the invitation */
    REJECTED,

    /** Partner suggested a different date/time — user must confirm or modify */
    TIME_SUGGESTED
}