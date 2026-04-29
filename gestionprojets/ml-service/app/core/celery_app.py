from celery import Celery

from .config import get_settings

settings = get_settings()
celery_app = Celery(
    "pi_ml_service",
    broker=settings.redis_url,
    backend=settings.redis_url,
)
celery_app.conf.update(task_track_started=True)
