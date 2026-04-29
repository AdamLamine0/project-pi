from datetime import datetime

from sqlalchemy import JSON, Boolean, Column, DateTime, Float, Integer, String, Text

from .database import Base


class MLScore(Base):
    __tablename__ = "ml_scores"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, index=True, nullable=False)
    sector = Column(String(120), index=True, nullable=True)
    stage = Column(String(120), index=True, nullable=True)
    score = Column(Float, nullable=False)
    confidence = Column(Float, nullable=False)
    explanation = Column(Text, nullable=False)
    features = Column(JSON, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)


class RoadmapTemplate(Base):
    __tablename__ = "roadmap_templates"

    id = Column(Integer, primary_key=True, index=True)
    sector = Column(String(120), index=True, nullable=True)
    stage = Column(String(120), index=True, nullable=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    score = Column(Float, default=0.0, nullable=False)
    metadata_json = Column("metadata", JSON, nullable=True)
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)


class RoadmapStep(Base):
    __tablename__ = "roadmap_steps"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, index=True, nullable=False)
    template_id = Column(Integer, index=True, nullable=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    phase = Column(String(80), nullable=False)
    order_index = Column(Integer, nullable=False)
    status = Column(String(40), default="A_FAIRE", nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)


class PlagiarismResult(Base):
    __tablename__ = "plagiarism_results"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, index=True, nullable=False)
    job_id = Column(String(120), index=True, nullable=True)
    score = Column(Float, nullable=False)
    status = Column(String(40), nullable=False)
    sources = Column(JSON, nullable=False)
    report = Column(JSON, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)


class Recommendation(Base):
    __tablename__ = "recommendations"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, index=True, nullable=False)
    category = Column(String(120), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    score = Column(Float, nullable=False)
    payload = Column(JSON, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
