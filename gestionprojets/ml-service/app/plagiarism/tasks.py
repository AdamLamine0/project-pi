from ..core.celery_app import celery_app
from .plagiarism_service import PlagiarismService
from .schemas import PlagiarismRequest

service = PlagiarismService()


@celery_app.task(name="app.plagiarism.tasks.run_plagiarism_analysis")
def run_plagiarism_analysis(payload: dict):
    request = PlagiarismRequest.model_validate(payload)
    return service.run_sync(request).model_dump()
