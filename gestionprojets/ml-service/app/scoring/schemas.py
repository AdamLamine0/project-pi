from typing import Any

from pydantic import BaseModel, ConfigDict, Field
from pydantic.alias_generators import to_camel


class ProjectScoringRequest(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

    project_id: int
    title: str
    description: str | None = None
    sector: str | None = None
    stage: str | None = None
    budget: float | None = None
    team_size: str | None = None
    revenue_model: str | None = None
    has_pitch_deck: bool = False
    has_business_plan: bool = False
    extra_features: dict[str, Any] = Field(default_factory=dict)


class ProjectScoringResponse(BaseModel):
    project_id: int
    score: float
    confidence: float
    label: str
    explanation: str
    feature_breakdown: dict[str, float]
    model_version: str
