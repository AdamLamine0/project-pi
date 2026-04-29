from fastapi import APIRouter

from ..nlp.nlp_pipeline import NLPPipeline
from ..nlp.schemas import NLPRequest
from ..plagiarism.plagiarism_service import PlagiarismService
from ..plagiarism.schemas import PlagiarismRequest
from ..playground.playground_service import PlaygroundService
from ..playground.schemas import PlaygroundRequest
from ..recommendations.recommendation_service import RecommendationService
from ..recommendations.schemas import RecommendationRequest
from ..roadmap.roadmap_service import RoadmapService
from ..roadmap.schemas import RoadmapRequest
from ..scoring.scoring_service import ScoringService
from ..scoring.schemas import ProjectScoringRequest

# Direct endpoints router (at root level)
direct_router = APIRouter(tags=["ml-direct"])
scoring_service = ScoringService()
roadmap_service = RoadmapService()
plagiarism_service = PlagiarismService()
nlp_pipeline = NLPPipeline()
recommendation_service = RecommendationService()
playground_service = PlaygroundService()

# Direct endpoints for testing (project_id in payload)
@direct_router.post("/score")
def score_direct(payload: ProjectScoringRequest):
    return scoring_service.score(payload)

@direct_router.post("/plagiarism/sync")
def analyze_plagiarism_sync(payload: PlagiarismRequest):
    return plagiarism_service.run_sync(payload)

# Project-based endpoints router
router = APIRouter(prefix="/projects", tags=["ml-projects"])

@router.post("/{project_id}/score")
def score_project(project_id: int, payload: ProjectScoringRequest):
    request = payload.model_copy(update={"project_id": project_id})
    return scoring_service.score(request)


@router.post("/{project_id}/roadmap")
def generate_roadmap(project_id: int, payload: RoadmapRequest):
    request = payload.model_copy(update={"project_id": project_id})
    return roadmap_service.build(request)


@router.post("/{project_id}/plagiarism")
def analyze_plagiarism(project_id: int, payload: PlagiarismRequest):
    request = payload.model_copy(update={"project_id": project_id})
    return plagiarism_service.run_sync(request)


@router.post("/{project_id}/nlp")
def analyze_text(project_id: int, payload: NLPRequest):
    request = payload.model_copy(update={"project_id": project_id})
    return nlp_pipeline.analyze(request)


@router.post("/{project_id}/recommendations")
def recommend(project_id: int, payload: RecommendationRequest):
    request = payload.model_copy(update={"project_id": project_id})
    return recommendation_service.recommend(request)


@router.post("/{project_id}/playground")
def entrepreneur_playground(project_id: int, payload: PlaygroundRequest):
    request = payload.model_copy(update={"project_id": project_id})
    return playground_service.analyze(request)

