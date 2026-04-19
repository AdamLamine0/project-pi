from typing import List, Optional
from pydantic import BaseModel, Field


class PredictionInput(BaseModel):
    event_type: int = Field(..., ge=0, le=4)
    location_type: int = Field(..., ge=0, le=1)
    capacity_max: int = Field(..., ge=1)
    ticket_price: float = Field(..., ge=0)
    speaker_count: int = Field(..., ge=0)
    program_slots_count: int = Field(..., ge=0)
    sector_count: int = Field(..., ge=0)
    stage_count: int = Field(..., ge=0)
    day_of_week: int = Field(..., ge=0, le=6)
    month: int = Field(..., ge=1, le=12)
    hour_of_day: int = Field(..., ge=0, le=23)
    days_published_before_event: int = Field(..., ge=0)


class RegistrationPrediction(BaseModel):
    predicted_registrations: int


class SuccessPrediction(BaseModel):
    success_score: float
    label: str


class HealthResponse(BaseModel):
    status: str


# ── Full analysis schemas ────────────────────────────────────────────────────

class RegistrationEstimate(BaseModel):
    min: int
    max: int
    point_estimate: int
    confidence: int          # 0–100


class OptimalSlot(BaseModel):
    day_name: str
    time_window: str
    boost_vs_average: int    # percentage improvement over average slot


class FullAnalysisResponse(BaseModel):
    registration_estimate: RegistrationEstimate
    optimal_slot: OptimalSlot
    suggested_capacity: int
    success_score: float
    label: str
