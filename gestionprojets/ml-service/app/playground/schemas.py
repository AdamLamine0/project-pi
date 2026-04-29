from pydantic import BaseModel, ConfigDict, Field
from pydantic.alias_generators import to_camel


class PlaygroundDocument(BaseModel):
    name: str
    content: str
    kind: str | None = None


class PlaygroundChatMessage(BaseModel):
    role: str
    content: str


class PlaygroundSuggestedEdit(BaseModel):
    label: str
    content: str


class PlaygroundRequest(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

    project_id: int
    title: str
    description: str | None = None
    sector: str | None = None
    stage: str | None = None
    budget: float | None = None
    revenue_model: str | None = None
    team_size: str | None = None
    bmc: str | None = None
    swot: str | None = None
    budget_notes: str | None = None
    goals: list[str] = Field(default_factory=list)
    documents: list[PlaygroundDocument] = Field(default_factory=list)
    user_message: str | None = None
    document_title: str | None = None
    document_draft: str | None = None
    tone: str | None = None
    conversation: list[PlaygroundChatMessage] = Field(default_factory=list)


class PlaygroundDimension(BaseModel):
    name: str
    score: float
    advice: str


class PlaygroundResponse(BaseModel):
    project_id: int
    overall_score: float
    strengths: list[str] = Field(default_factory=list)
    gaps: list[str] = Field(default_factory=list)
    improvements: list[str] = Field(default_factory=list)
    dimensions: list[PlaygroundDimension] = Field(default_factory=list)
    assistant_message: str = ""
    document_title: str = ""
    document_draft: str = ""
    suggested_edits: list[PlaygroundSuggestedEdit] = Field(default_factory=list)
    conversation: list[PlaygroundChatMessage] = Field(default_factory=list)
    mode: str = "heuristic"
