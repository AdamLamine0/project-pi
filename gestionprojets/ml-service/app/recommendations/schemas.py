from pydantic import BaseModel, ConfigDict, Field
from pydantic.alias_generators import to_camel


class RecommendationRequest(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

    project_id: int
    title: str
    description: str | None = None
    sector: str | None = None
    stage: str | None = None
    text: str | None = None


class RecommendationItem(BaseModel):
    category: str
    title: str
    description: str
    score: float
    payload: dict[str, object] = Field(default_factory=dict)


class RecommendationResponse(BaseModel):
    project_id: int
    items: list[RecommendationItem] = Field(default_factory=list)
