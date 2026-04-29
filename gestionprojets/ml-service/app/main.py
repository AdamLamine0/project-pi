from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.health import router as health_router
from .api.router import router as project_router, direct_router
from .document_generation.routes import router as document_router
from .core.config import get_settings
from .core.database import Base, engine

settings = get_settings()
Base.metadata.create_all(bind=engine)

app = FastAPI(title=settings.app_name, version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200", "http://localhost:4300", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(direct_router)
app.include_router(project_router, prefix=settings.api_prefix)
app.include_router(document_router, prefix=settings.api_prefix)
