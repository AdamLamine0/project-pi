import os
import pymysql
import pandas as pd
from dotenv import load_dotenv

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


QUERY = """
SELECT
    e.id,
    e.type,
    e.location_type,
    e.capacity_max,
    e.ticket_price,
    e.start_date,
    e.created_at,
    (SELECT COUNT(*) FROM event_speakers s WHERE s.event_id = e.id) AS speaker_count,
    (SELECT COUNT(*) FROM event_programs p WHERE p.event_id = e.id) AS program_slots_count,
    (SELECT COUNT(DISTINCT sector) FROM event_target_sectors ts WHERE ts.event_id = e.id) AS sector_count,
    (SELECT COUNT(DISTINCT stage) FROM event_target_stages st WHERE st.event_id = e.id) AS stage_count,
    (SELECT COUNT(*) FROM event_registrations r WHERE r.event_id = e.id AND r.status <> 'ANNULE') AS registration_count,
    (SELECT COUNT(*) FROM event_registrations r WHERE r.event_id = e.id AND r.attended = 1) AS attended_count
FROM events e
WHERE e.start_date IS NOT NULL AND e.created_at IS NOT NULL
"""


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
        return pd.DataFrame()

    df = pd.DataFrame(rows)

    df["event_type"] = df["type"].map(EVENT_TYPE_MAP).fillna(0).astype(int)
    df["location_type"] = df["location_type"].map(LOCATION_TYPE_MAP).fillna(0).astype(int)

    df["start_date"] = pd.to_datetime(df["start_date"])
    df["created_at"] = pd.to_datetime(df["created_at"])

    df["day_of_week"] = df["start_date"].dt.dayofweek
    df["month"] = df["start_date"].dt.month
    df["hour_of_day"] = df["start_date"].dt.hour
    df["days_published_before_event"] = (
        (df["start_date"] - df["created_at"]).dt.days.clip(lower=0)
    )

    df["capacity_max"] = df["capacity_max"].fillna(1).astype(int).clip(lower=1)
    df["ticket_price"] = df["ticket_price"].fillna(0).astype(float)

    df["fill_rate"] = (df["registration_count"] / df["capacity_max"]).clip(upper=1.0)
    df["attendance_rate"] = df.apply(
        lambda r: (r["attended_count"] / r["registration_count"]) if r["registration_count"] > 0 else 0.0,
        axis=1,
    )
    df["success_score"] = df["fill_rate"] * 50 + df["attendance_rate"] * 50

    return df
