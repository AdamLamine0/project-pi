import random
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor

FEATURE_COLS = [
    "event_type",
    "location_type",
    "capacity_max",
    "ticket_price",
    "speaker_count",
    "program_slots_count",
    "sector_count",
    "stage_count",
    "day_of_week",
    "month",
    "hour_of_day",
    "days_published_before_event",
]

EVENT_TYPE_BASE = {
    0: 0.60,  # WEBINAIRE
    1: 0.55,  # WORKSHOP
    2: 0.50,  # CONFERENCE
    3: 0.45,  # PITCH
    4: 0.40,  # BOOTCAMP
}


def _fill_rate_for(row, rng) -> float:
    """Realistic fill-rate heuristic used to generate synthetic targets."""
    base = EVENT_TYPE_BASE.get(row["event_type"], 0.5)

    if row["ticket_price"] == 0:
        base += 0.15
    elif row["ticket_price"] >= 100:
        base -= 0.10
    elif row["ticket_price"] >= 50:
        base -= 0.05

    if row["location_type"] == 1:
        base += 0.10

    if row["speaker_count"] >= 3:
        base += 0.10
    elif row["speaker_count"] == 0:
        base -= 0.10

    if row["program_slots_count"] >= 4:
        base += 0.08
    elif row["program_slots_count"] == 0:
        base -= 0.08

    base += 0.03 * min(row["sector_count"], 4)
    base += 0.02 * min(row["stage_count"], 4)

    lead = row["days_published_before_event"]
    if lead < 3:
        base -= 0.30
    elif lead < 7:
        base -= 0.15
    elif lead < 14:
        base -= 0.05
    elif lead >= 30:
        base += 0.05

    dow = row["day_of_week"]
    if dow in (1, 2, 3):
        base += 0.04
    elif dow in (5, 6):
        base -= 0.05

    hod = row["hour_of_day"]
    if 10 <= hod <= 18:
        base += 0.03
    else:
        base -= 0.05

    capacity = row["capacity_max"]
    if capacity >= 300:
        base -= 0.10
    elif capacity <= 40:
        base += 0.05

    base += rng.uniform(-0.05, 0.05)
    return max(0.05, min(1.0, base))


def _attendance_rate_for(row, fill_rate, rng) -> float:
    base = 0.70
    if row["ticket_price"] > 0:
        base += 0.10
    if row["location_type"] == 0:
        base += 0.05
    if row["speaker_count"] >= 3:
        base += 0.05
    if fill_rate < 0.3:
        base -= 0.10
    base += rng.uniform(-0.08, 0.08)
    return max(0.2, min(1.0, base))


def generate_synthetic_data(n: int = 500, seed: int = 42) -> pd.DataFrame:
    rng = random.Random(seed)
    rows = []

    for _ in range(n):
        row = {
            "event_type": rng.randint(0, 4),
            "location_type": rng.randint(0, 1),
            "capacity_max": rng.choice([20, 30, 50, 75, 100, 150, 200, 300, 500]),
            "ticket_price": rng.choice([0, 0, 0, 0, 10, 20, 50, 100, 150]),
            "speaker_count": rng.choices(
                [0, 1, 2, 3, 4, 5, 6], weights=[1, 2, 3, 3, 2, 1, 1]
            )[0],
            "program_slots_count": rng.choices(
                [0, 1, 2, 3, 4, 5, 6, 8], weights=[1, 1, 2, 3, 3, 2, 1, 1]
            )[0],
            "sector_count": rng.choices(
                [0, 1, 2, 3, 4, 5], weights=[1, 2, 3, 3, 2, 1]
            )[0],
            "stage_count": rng.choices(
                [0, 1, 2, 3, 4], weights=[1, 2, 3, 2, 1]
            )[0],
            "day_of_week": rng.randint(0, 6),
            "month": rng.randint(1, 12),
            "hour_of_day": rng.choices(
                list(range(8, 22)),
                weights=[1, 2, 3, 3, 2, 2, 3, 3, 3, 2, 2, 1, 1, 1],
            )[0],
            "days_published_before_event": rng.choices(
                [1, 3, 7, 14, 21, 30, 45, 60, 90],
                weights=[1, 1, 2, 3, 3, 3, 2, 1, 1],
            )[0],
        }

        fill_rate = _fill_rate_for(row, rng)
        registration_count = int(round(row["capacity_max"] * fill_rate))
        registration_count = min(registration_count, row["capacity_max"])

        attendance_rate = _attendance_rate_for(row, fill_rate, rng)
        attended_count = int(round(registration_count * attendance_rate))

        success_score = (fill_rate * 50) + (attendance_rate * 50)

        row.update({
            "registration_count": registration_count,
            "attended_count": attended_count,
            "fill_rate": fill_rate,
            "attendance_rate": attendance_rate,
            "success_score": max(0.0, min(100.0, success_score)),
        })
        rows.append(row)

    return pd.DataFrame(rows)


def build_training_frame(real_df: pd.DataFrame, synthetic_df: pd.DataFrame) -> pd.DataFrame:
    cols = FEATURE_COLS + ["registration_count", "success_score"]
    if real_df is not None and not real_df.empty:
        real_subset = real_df[cols].copy()
        # Upweight real rows by duplication so they have more influence.
        real_weighted = pd.concat([real_subset] * 5, ignore_index=True)
        combined = pd.concat([synthetic_df[cols], real_weighted], ignore_index=True)
    else:
        combined = synthetic_df[cols].copy()
    return combined


def train_models(training_df: pd.DataFrame):
    X = training_df[FEATURE_COLS]

    reg_model = RandomForestRegressor(
        n_estimators=300,
        max_depth=None,
        min_samples_leaf=2,
        min_samples_split=4,
        random_state=42,
        n_jobs=-1,
    )
    reg_model.fit(X, training_df["registration_count"])

    score_model = RandomForestRegressor(
        n_estimators=300,
        max_depth=None,
        min_samples_leaf=2,
        min_samples_split=4,
        random_state=42,
        n_jobs=-1,
    )
    score_model.fit(X, training_df["success_score"])

    return reg_model, score_model


def input_to_frame(payload: dict) -> pd.DataFrame:
    return pd.DataFrame([{col: payload[col] for col in FEATURE_COLS}])


def score_label(score: float) -> str:
    if score < 40:
        return "Low"
    if score <= 70:
        return "Moderate"
    return "High Potential"


# ── Full analysis ────────────────────────────────────────────────────────────

_DAY_NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
# Business-hours candidates (avoid very early / very late)
_CANDIDATE_HOURS = [9, 10, 11, 14, 15, 16, 17, 18, 19, 20]


def predict_registration_range(reg_model, X: pd.DataFrame, capacity_max: int):
    """
    Uses the individual trees of the RandomForest to derive a prediction
    interval (P15–P85) and a confidence score based on spread.
    """
    from schemas import RegistrationEstimate

    tree_preds = np.array([t.predict(X)[0] for t in reg_model.estimators_])
    tree_preds = np.clip(tree_preds, 0, capacity_max)

    point = int(round(float(np.mean(tree_preds))))
    lo    = int(round(float(np.percentile(tree_preds, 15))))
    hi    = int(round(float(np.percentile(tree_preds, 85))))

    # Narrower inter-percentile range → higher confidence
    spread = (hi - lo) / (capacity_max + 1)
    confidence = int(round(max(20, min(98, (1.0 - spread) * 100))))

    return RegistrationEstimate(min=lo, max=hi, point_estimate=point, confidence=confidence)


def find_optimal_slot(reg_model, payload_dict: dict, capacity_max: int):
    """
    Exhaustively scores all (day, hour) combinations for the given event
    profile and returns the best slot together with the relative boost
    compared to the simple average across all slots.
    """
    from schemas import OptimalSlot

    base = {col: payload_dict[col] for col in FEATURE_COLS}
    best_day, best_hour, best_score = 0, 10, -1.0
    scores = []

    for dow in range(7):
        for hour in _CANDIDATE_HOURS:
            candidate = {**base, "day_of_week": dow, "hour_of_day": hour}
            df = pd.DataFrame([candidate])
            pred = float(reg_model.predict(df)[0])
            pred = min(pred, capacity_max)
            scores.append(pred)
            if pred > best_score:
                best_score, best_day, best_hour = pred, dow, hour

    avg = float(np.mean(scores)) if scores else 1.0
    boost = int(round((best_score - avg) / (avg + 1e-9) * 100))
    boost = max(0, boost)

    time_window = f"{best_hour:02d}h00\u2013{best_hour + 2:02d}h00"
    return OptimalSlot(day_name=_DAY_NAMES[best_day], time_window=time_window, boost_vs_average=boost)


def full_analysis(reg_model, score_model, payload_dict: dict):
    """
    Combines registration range, optimal slot, suggested capacity, and
    success score into a single structured result.
    """
    from schemas import FullAnalysisResponse

    capacity_max = max(1, int(payload_dict.get("capacity_max", 100)))
    X = input_to_frame(payload_dict)

    reg_estimate = predict_registration_range(reg_model, X, capacity_max)
    optimal = find_optimal_slot(reg_model, payload_dict, capacity_max)

    # Suggested capacity = upper-bound estimate + 15 % buffer, rounded up to next 10
    raw_cap = reg_estimate.max * 1.15
    suggested = int(np.ceil(raw_cap / 10.0) * 10)

    # Success score
    raw_score = float(score_model.predict(X)[0])
    score = round(max(0.0, min(100.0, raw_score)), 2)

    return FullAnalysisResponse(
        registration_estimate=reg_estimate,
        optimal_slot=optimal,
        suggested_capacity=suggested,
        success_score=score,
        label=score_label(score),
    )
