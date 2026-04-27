import logging
import os

import pymysql
import pandas as pd
from dotenv import load_dotenv

logger = logging.getLogger("ml-service")

load_dotenv()

EVENT_TYPE_MAP = {
    "WEBINAIRE": 0,
    "WORKSHOP": 1,
    "CONFERENCE": 2,
    "PITCH": 3,
    "BOOTCAMP": 4,
}

LOCATION_TYPE_MAP = {
    "PRESENTIEL": 0,
    "DISTANCIEL": 1,
    "HYBRIDE": 0,   # treat as presentiel for the model
}


def get_connection():
    return pymysql.connect(
        host=os.getenv("DB_HOST", "localhost"),
        port=int(os.getenv("DB_PORT", "3306")),
        database=os.getenv("DB_NAME", "event_db"),
        user=os.getenv("DB_USER", "root"),
        password=os.getenv("DB_PASSWORD", ""),
        cursorclass=pymysql.cursors.DictCursor,
    )


# Registration count: only truly confirmed attendees (INSCRIT + PRESENT).
# LISTE_ATTENTE and PAIEMENT_EN_ATTENTE_VALIDATION are NOT confirmed registrations.
QUERY = """
SELECT
    e.id,
    e.type,
    e.location_type,
    e.status,
    e.capacity_max,
    e.ticket_price,
    e.description,
    e.start_date,
    e.created_at,
    (SELECT COUNT(*) FROM event_speakers s WHERE s.event_id = e.id)
        AS speaker_count,
    (SELECT COUNT(*) FROM event_programs p WHERE p.event_id = e.id)
        AS program_slots_count,
    (SELECT COUNT(DISTINCT sector) FROM event_target_sectors ts WHERE ts.event_id = e.id)
        AS sector_count,
    (SELECT COUNT(DISTINCT stage) FROM event_target_stages st WHERE st.event_id = e.id)
        AS stage_count,
    (SELECT COUNT(*) FROM event_registrations r
        WHERE r.event_id = e.id AND r.status IN ('INSCRIT', 'PRESENT'))
        AS registered_count,
    (SELECT COUNT(*) FROM event_registrations r
        WHERE r.event_id = e.id AND r.attended = 1)
        AS attended_count
FROM events e
WHERE e.start_date IS NOT NULL AND e.created_at IS NOT NULL
"""


def _success_score(row: dict) -> float:
    """
    Two formulas depending on whether the event is completed or still future.

    TERMINE events have real attendance signal — weight it heavily.
    All other statuses are future/in-progress events — predict quality from
    configuration signals only (no attendance data available).
    """
    cap = max(1, row["capacity_max"])
    reg = row["registered_count"]
    att = row["attended_count"]
    spk = row["speaker_count"]
    sec = row["sector_count"]
    dl  = row["description_length"]
    paid = row["is_paid"]

    fill_rate = min(reg / cap, 1.0)

    if row["status"] == "TERMINE":
        attendance_rate = (att / reg) if reg > 0 else 0.0
        score = (
            attendance_rate * 35
            + fill_rate      * 25
            + min(spk / 5, 1) * 15
            + min(sec / 5, 1) * 10
            + (1 if dl > 50 else 0) * 10
            + (1 - paid * 0.3) * 5
        )
    else:
        # Future / ongoing: no attendance data — use configuration quality
        score = (
            fill_rate         * 30
            + min(spk / 5, 1) * 25
            + min(sec / 5, 1) * 20
            + (1 if dl > 50 else 0) * 15
            + (1 - paid * 0.3) * 10
        )

    return float(min(score, 100.0))


def load_real_events() -> pd.DataFrame:
    """Load real events from DB with engineered features and targets."""
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(QUERY)
            rows = cur.fetchall()
    finally:
        conn.close()

    if not rows:
        logger.info("Real events loaded: 0")
        return pd.DataFrame()

    df = pd.DataFrame(rows)

    # ── Encode categoricals ────────────────────────────────────────────────
    df["event_type"]   = df["type"].map(EVENT_TYPE_MAP).fillna(0).astype(int)
    df["location_type"] = df["location_type"].map(LOCATION_TYPE_MAP).fillna(0).astype(int)

    # ── Dates ─────────────────────────────────────────────────────────────
    df["start_date"]  = pd.to_datetime(df["start_date"])
    df["created_at"]  = pd.to_datetime(df["created_at"])
    df["day_of_week"] = df["start_date"].dt.dayofweek
    df["month"]       = df["start_date"].dt.month
    df["hour_of_day"] = df["start_date"].dt.hour
    df["days_published_before_event"] = (
        (df["start_date"] - df["created_at"]).dt.days.clip(lower=0)
    )

    # ── Numerics ──────────────────────────────────────────────────────────
    df["capacity_max"]   = df["capacity_max"].fillna(1).astype(int).clip(lower=1)
    df["ticket_price"]   = df["ticket_price"].fillna(0).astype(float)
    df["registered_count"] = df["registered_count"].fillna(0).astype(int)
    df["attended_count"]   = df["attended_count"].fillna(0).astype(int)
    df["speaker_count"]    = df["speaker_count"].fillna(0).astype(int)
    df["program_slots_count"] = df["program_slots_count"].fillna(0).astype(int)
    df["sector_count"]     = df["sector_count"].fillna(0).astype(int)
    df["stage_count"]      = df["stage_count"].fillna(0).astype(int)

    # ── Derived scalars ───────────────────────────────────────────────────
    df["description_length"] = df["description"].fillna("").str.len().astype(int)
    df["is_paid"]            = (df["ticket_price"] > 0).astype(int)
    df["fill_rate"]          = (df["registered_count"] / df["capacity_max"]).clip(upper=1.0)
    df["registration_count"] = df["registered_count"]   # alias used by build_training_frame

    # ── Success score ─────────────────────────────────────────────────────
    df["success_score"] = df.apply(
        lambda r: _success_score(r.to_dict()), axis=1
    )

    n_total  = len(df)
    n_with_reg = int((df["registered_count"] > 0).sum())
    logger.info(
        "Real events loaded: %d total, %d with confirmed registrations",
        n_total, n_with_reg,
    )
    logger.info(
        "Real events — fill_rate mean=%.2f  score mean=%.1f  min=%.1f  max=%.1f",
        df["fill_rate"].mean(),
        df["success_score"].mean(),
        df["success_score"].min(),
        df["success_score"].max(),
    )
    return df, n_with_reg
