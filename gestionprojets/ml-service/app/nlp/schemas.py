from pydantic import BaseModel, ConfigDict, Field
from pydantic.alias_generators import to_camel


class NLPRequest(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

    project_id: int
    text: str | None = None
    description: str | None = None
    language: str = "fr"


class NLPResponse(BaseModel):
    project_id: int
    language: str
    entities: list[dict[str, str]] = Field(default_factory=list)
    keywords: list[str] = Field(default_factory=list)
    summary: str
    sentiment: float
