from pydantic import BaseModel, ConfigDict, Field
from pydantic.alias_generators import to_camel


class RoadmapStep(BaseModel):
    id: str
    title: str
    description: str
    phase: str
    order: int
    duration_weeks: int = Field(ge=1, le=52)
    owner_hint: str | None = None
    dependencies: list[str] = Field(default_factory=list)
    confidence: float = 0.0


class RoadmapRequest(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

    project_id: int
    title: str
    description: str | None = None
    sector: str | None = None
    stage: str | None = None
    budget: float | None = None
    team_size: str | None = None
    objectives: list[str] = Field(default_factory=list)
    feedback: str | None = None
    document_summary: str | None = None


class RoadmapResponse(BaseModel):
    project_id: int
    generation_method: str
    summary: str
    steps: list[RoadmapStep]
