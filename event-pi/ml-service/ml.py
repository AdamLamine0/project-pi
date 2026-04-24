import logging

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score
from sklearn.model_selection import train_test_split

logger = logging.getLogger("ml-service")

# ── Feature columns ───────────────────────────────────────────────────────────

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

# Derived features computed by engineer_features(); never sent in the API payload.
DERIVED_COLS = [
    "is_free",
    "is_virtual",
    "is_weekend",
    "is_business_hours",
    "log_capacity",
    "log_lead_time",
    "content_richness",
]

ALL_FEATURE_COLS = FEATURE_COLS + DERIVED_COLS

# ── Synthetic-data helpers ────────────────────────────────────────────────────

EVENT_TYPE_BASE = {
    0: 0.60,  # WEBINAIRE
    1: 0.55,  # WORKSHOP
    2: 0.50,  # CONFERENCE
    3: 0.45,  # PITCH
    4: 0.40,  # BOOTCAMP
}

# Seasonal boost for event fill-rate (Northern Hemisphere business calendar).
_MONTH_BOOST = {
    1: -0.05, 2: 0.02, 3: 0.08, 4: 0.10, 5: 0.08,
    6: -0.02, 7: -0.08, 8: -0.10,
    9: 0.10, 10: 0.12, 11: 0.06, 12: -0.04,
}


def engineer_features(df: pd.DataFrame) -> pd.DataFrame:
    """Add derived features to a raw-feature DataFrame (does not modify in place)."""
    df = df.copy()
    df["is_free"]           = (df["ticket_price"] == 0).astype(int)
    df["is_virtual"]        = (df["location_type"] == 1).astype(int)
    df["is_weekend"]        = (df["day_of_week"] >= 5).astype(int)
    df["is_business_hours"] = ((df["hour_of_day"] >= 9) & (df["hour_of_day"] <= 18)).astype(int)
    df["log_capacity"]      = np.log1p(df["capacity_max"])
    df["log_lead_time"]     = np.log1p(df["days_published_before_event"])
    df["content_richness"]  = df["speaker_count"] + df["program_slots_count"]
    return df


def _fill_rate_for(row: dict, rng: np.random.Generator) -> float:
    base = EVENT_TYPE_BASE.get(int(row["event_type"]), 0.5)

    price = float(row["ticket_price"])
    if price == 0:
        base += 0.15
    elif price >= 100:
        base -= 0.12
    elif price >= 50:
        base -= 0.06

    if int(row["location_type"]) == 1:
        base += 0.10

    # Interaction: free + virtual events fill faster.
    if price == 0 and int(row["location_type"]) == 1:
        base += 0.05

    n_speakers = int(row["speaker_count"])
    if n_speakers >= 3:
        base += 0.10
    elif n_speakers == 0:
        base -= 0.10
    elif n_speakers == 1:
        base -= 0.03

    n_slots = int(row["program_slots_count"])
    if n_slots >= 4:
        base += 0.08
    elif n_slots == 0:
        base -= 0.08

    base += 0.03 * min(int(row["sector_count"]), 4)
    base += 0.02 * min(int(row["stage_count"]), 4)

    lead = int(row["days_published_before_event"])
    if lead < 3:
        base -= 0.30
    elif lead < 7:
        base -= 0.15
    elif lead < 14:
        base -= 0.05
    elif lead >= 30:
        base += 0.05

    dow = int(row["day_of_week"])
    if dow in (1, 2, 3):
        base += 0.04
    elif dow in (5, 6):
        base -= 0.06

    hod = int(row["hour_of_day"])
    if 10 <= hod <= 17:
        base += 0.04
    elif hod < 9 or hod > 20:
        base -= 0.07

    capacity = int(row["capacity_max"])
    if capacity >= 300:
        base -= 0.12
    elif capacity >= 150:
        base -= 0.05
    elif capacity <= 40:
        base += 0.06

    base += _MONTH_BOOST.get(int(row["month"]), 0.0)

    # Gaussian noise is more realistic than uniform.
    base += float(rng.normal(0.0, 0.04))
    return float(np.clip(base, 0.05, 1.0))


def _attendance_rate_for(row: dict, fill_rate: float, rng: np.random.Generator) -> float:
    base = 0.70

    if float(row["ticket_price"]) > 0:
        base += 0.10
    if int(row["location_type"]) == 0:
        base += 0.06
    if int(row["speaker_count"]) >= 3:
        base += 0.06

    if fill_rate < 0.3:
        base -= 0.12
    elif fill_rate > 0.8:
        base += 0.05

    # Weekday events see higher show-up rates.
    if int(row["day_of_week"]) < 5:
        base += 0.03
    else:
        base -= 0.05

    base += _MONTH_BOOST.get(int(row["month"]), 0.0) * 0.5

    base += float(rng.normal(0.0, 0.06))
    return float(np.clip(base, 0.2, 1.0))


def generate_synthetic_data(n: int = 1000, seed: int = 42) -> pd.DataFrame:
    rng = np.random.default_rng(seed)

    capacity_opts = np.array([20, 30, 50, 75, 100, 150, 200, 300, 500])
    price_opts    = np.array([0, 0, 0, 0, 10, 20, 50, 100, 150], dtype=float)

    def _w(arr): return arr / arr.sum()

    speaker_w = _w(np.array([1, 2, 3, 3, 2, 1, 1], dtype=float))
    slot_w    = _w(np.array([1, 1, 2, 3, 3, 2, 1, 1], dtype=float))
    sector_w  = _w(np.array([1, 2, 3, 3, 2, 1], dtype=float))
    stage_w   = _w(np.array([1, 2, 3, 2, 1], dtype=float))
    hour_w    = _w(np.array([1, 2, 3, 3, 2, 2, 3, 3, 3, 2, 2, 1, 1, 1], dtype=float))
    lead_w    = _w(np.array([1, 1, 2, 3, 3, 3, 2, 1, 1], dtype=float))

    event_types  = rng.integers(0, 5,  size=n)
    loc_types    = rng.integers(0, 2,  size=n)
    capacities   = rng.choice(capacity_opts, size=n)
    prices       = rng.choice(price_opts, size=n)
    speakers     = rng.choice(np.arange(7), p=speaker_w, size=n)
    slots        = rng.choice(np.arange(8), p=slot_w,    size=n)
    sectors      = rng.choice(np.arange(6), p=sector_w,  size=n)
    stages       = rng.choice(np.arange(5), p=stage_w,   size=n)
    days_of_week = rng.integers(0, 7,  size=n)
    months       = rng.integers(1, 13, size=n)
    hours        = rng.choice(np.arange(8, 22), p=hour_w, size=n)
    leads        = rng.choice([1, 3, 7, 14, 21, 30, 45, 60, 90], p=lead_w, size=n)

    rows = []
    for i in range(n):
        row = {
            "event_type":                int(event_types[i]),
            "location_type":             int(loc_types[i]),
            "capacity_max":              int(capacities[i]),
            "ticket_price":              float(prices[i]),
            "speaker_count":             int(speakers[i]),
            "program_slots_count":       int(slots[i]),
            "sector_count":              int(sectors[i]),
            "stage_count":               int(stages[i]),
            "day_of_week":               int(days_of_week[i]),
            "month":                     int(months[i]),
            "hour_of_day":               int(hours[i]),
            "days_published_before_event": int(leads[i]),
        }

        fill_rate          = _fill_rate_for(row, rng)
        registration_count = min(int(round(row["capacity_max"] * fill_rate)), row["capacity_max"])
        attendance_rate    = _attendance_rate_for(row, fill_rate, rng)
        attended_count     = int(round(registration_count * attendance_rate))
        success_score      = fill_rate * 50 + attendance_rate * 50

        row.update({
            "registration_count": registration_count,
            "attended_count":     attended_count,
            "fill_rate":          fill_rate,
            "attendance_rate":    attendance_rate,
            "success_score":      float(np.clip(success_score, 0.0, 100.0)),
        })
        rows.append(row)

    return pd.DataFrame(rows)


def build_training_frame(real_df: pd.DataFrame, synthetic_df: pd.DataFrame) -> pd.DataFrame:
    cols = FEATURE_COLS + ["registration_count", "success_score"]
    if real_df is not None and not real_df.empty:
        real_subset   = real_df[cols].copy()
        # 3× upweight: real data guides calibration without overriding synthetic distribution.
        real_weighted = pd.concat([real_subset] * 3, ignore_index=True)
        combined = pd.concat([synthetic_df[cols], real_weighted], ignore_index=True)
        logger.info(
            "Training targets — score mean=%.1f  p25=%.1f  p75=%.1f",
            combined["success_score"].mean(),
            combined["success_score"].quantile(0.25),
            combined["success_score"].quantile(0.75),
        )
    else:
        combined = synthetic_df[cols].copy()
    return combined


def train_models(training_df: pd.DataFrame):
    X_base  = training_df[FEATURE_COLS]
    # Convert to numpy immediately so sklearn never stores feature_names_in_,
    # which prevents the DecisionTreeRegressor feature-name mismatch warnings.
    X       = engineer_features(X_base)[ALL_FEATURE_COLS].values
    y_reg   = training_df["registration_count"].values
    y_score = training_df["success_score"].values

    X_train, X_val, y_reg_tr, y_reg_val, y_sc_tr, y_sc_val = train_test_split(
        X, y_reg, y_score, test_size=0.20, random_state=42
    )

    rf_params = dict(
        n_estimators=200,
        max_depth=12,
        min_samples_leaf=5,
        min_samples_split=10,
        max_features="sqrt",
        random_state=42,
        n_jobs=-1,
    )

    reg_model = RandomForestRegressor(**rf_params)
    reg_model.fit(X_train, y_reg_tr)
    reg_mae = mean_absolute_error(y_reg_val, reg_model.predict(X_val))
    reg_r2  = r2_score(y_reg_val, reg_model.predict(X_val))
    logger.info("Registration model  — val MAE=%.1f  val R²=%.3f", reg_mae, reg_r2)

    score_model = RandomForestRegressor(**rf_params)
    score_model.fit(X_train, y_sc_tr)
    sc_mae = mean_absolute_error(y_sc_val, score_model.predict(X_val))
    sc_r2  = r2_score(y_sc_val, score_model.predict(X_val))
    logger.info("Success-score model — val MAE=%.1f  val R²=%.3f", sc_mae, sc_r2)

    # Retrain on the full dataset now that we know validation quality.
    reg_model.fit(X, y_reg)
    score_model.fit(X, y_score)

    metrics = {
        "reg_val_mae":   round(float(reg_mae), 2),
        "reg_val_r2":    round(float(reg_r2),  3),
        "score_val_mae": round(float(sc_mae),  2),
        "score_val_r2":  round(float(sc_r2),   3),
        "train_rows":    len(X),
    }
    return reg_model, score_model, metrics


def input_to_array(payload: dict) -> np.ndarray:
    """Convert API payload dict to a numpy array ready for model.predict()."""
    df = pd.DataFrame([{col: payload[col] for col in FEATURE_COLS}])
    return engineer_features(df)[ALL_FEATURE_COLS].values


# Backward-compatible alias used by the existing endpoint handlers.
def input_to_frame(payload: dict) -> np.ndarray:
    return input_to_array(payload)


def score_label(score: float) -> str:
    if score < 40:
        return "Low"
    if score <= 70:
        return "Moderate"
    return "High Potential"


# ── Full analysis ─────────────────────────────────────────────────────────────

_DAY_NAMES       = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
_CANDIDATE_HOURS = [9, 10, 11, 14, 15, 16, 17, 18, 19, 20]


def predict_registration_range(reg_model, X: np.ndarray, capacity_max: int):
    from schemas import RegistrationEstimate

    tree_preds = np.array([t.predict(X)[0] for t in reg_model.estimators_])
    tree_preds = np.clip(tree_preds, 0, capacity_max)

    point = int(round(float(np.mean(tree_preds))))
    lo    = int(round(float(np.percentile(tree_preds, 15))))
    hi    = int(round(float(np.percentile(tree_preds, 85))))

    spread     = (hi - lo) / (capacity_max + 1)
    confidence = int(round(max(20, min(98, (1.0 - spread) * 100))))

    return RegistrationEstimate(min=lo, max=hi, point_estimate=point, confidence=confidence)


def find_optimal_slot(reg_model, payload_dict: dict, capacity_max: int):
    from schemas import OptimalSlot

    base   = {col: payload_dict[col] for col in FEATURE_COLS}
    rows   = []
    combos = []
    for dow in range(7):
        for hour in _CANDIDATE_HOURS:
            rows.append({**base, "day_of_week": dow, "hour_of_day": hour})
            combos.append((dow, hour))

    # Batch-predict all 70 combinations in a single call (numpy array → no feature-name warnings).
    X_arr = engineer_features(pd.DataFrame(rows))[ALL_FEATURE_COLS].values
    preds = np.clip(reg_model.predict(X_arr).astype(float), 0, capacity_max)

    best_idx            = int(np.argmax(preds))
    best_day, best_hour = combos[best_idx]
    best_score          = float(preds[best_idx])
    avg                 = float(np.mean(preds))
    boost               = max(0, int(round((best_score - avg) / (avg + 1e-9) * 100)))

    time_window = f"{best_hour:02d}h00–{best_hour + 2:02d}h00"
    return OptimalSlot(day_name=_DAY_NAMES[best_day], time_window=time_window, boost_vs_average=boost)


def full_analysis(reg_model, score_model, payload_dict: dict):
    from schemas import FullAnalysisResponse

    capacity_max = max(1, int(payload_dict.get("capacity_max", 100)))
    X = input_to_frame(payload_dict)

    reg_estimate = predict_registration_range(reg_model, X, capacity_max)
    optimal      = find_optimal_slot(reg_model, payload_dict, capacity_max)

    suggested = int(np.ceil(reg_estimate.max * 1.15 / 10.0) * 10)

    raw_score = float(score_model.predict(X)[0])
    score     = round(max(0.0, min(100.0, raw_score)), 2)

    return FullAnalysisResponse(
        registration_estimate=reg_estimate,
        optimal_slot=optimal,
        suggested_capacity=suggested,
        success_score=score,
        label=score_label(score),
    )
