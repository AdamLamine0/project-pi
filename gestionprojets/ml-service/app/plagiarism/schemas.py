from pydantic import BaseModel, ConfigDict, Field
from pydantic.alias_generators import to_camel


class PlagiarismSource(BaseModel):
    title: str
    url: str
    snippet: str
    score: float


class PlagiarismRequest(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

    project_id: int
    title: str
    description: str | None = None
    document_texts: list[str] = Field(default_factory=list)
    web_sources: list[str] = Field(default_factory=list)


class PlagiarismResponse(BaseModel):
    project_id: int
    job_id: str | None = None
    score: float
    status: str
    message: str
    sources: list[PlagiarismSource] = Field(default_factory=list)
    report: dict[str, object] = Field(default_factory=dict)
