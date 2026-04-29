"""Document generation schemas for BMC, SWOT, Pitch deck"""
from pydantic import BaseModel
from typing import List, Dict, Optional


class BMCRequest(BaseModel):
    startup_name: str
    description: str
    sector: str
    stage: str


class BMCResponse(BaseModel):
    startup_name: str
    key_partners: List[str]
    value_propositions: List[str]
    customer_segments: List[str]
    channels: List[str]
    revenue_streams: List[str]
    cost_structure: List[str]
    raw_text: str


class SWOTRequest(BaseModel):
    startup_name: str
    description: str
    market_context: Optional[str] = None


class SWOTResponse(BaseModel):
    startup_name: str
    strengths: List[str]
    weaknesses: List[str]
    opportunities: List[str]
    threats: List[str]
    raw_text: str


class PitchDeckRequest(BaseModel):
    startup_name: str
    description: str
    sector: str
    team_size: int
    target_market: Optional[str] = None


class PitchSlide(BaseModel):
    slide_number: int
    title: str
    content: List[str]


class PitchDeckResponse(BaseModel):
    startup_name: str
    slides: List[PitchSlide]
    executive_summary: str
    raw_text: str


class DocumentChatRequest(BaseModel):
    document_id: int
    document_type: str  # bmc, swot, pitch
    user_message: str
    current_document: Dict


class DocumentChatResponse(BaseModel):
    document_id: int
    user_message: str
    ai_response: str
    updated_document: Dict
    change_summary: str
