"""Document generation API routes"""
import json
import logging
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from pathlib import Path
import tempfile

from .schemas import (
    BMCRequest,
    SWOTRequest,
    PitchDeckRequest,
)
from .generation_service import DocumentGenerationService
from .pdf_service import PDFAnalysisService
from .chat_service import DocumentChatService

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/documents", tags=["documents"])

# Service instances
gen_service = DocumentGenerationService()
pdf_service = PDFAnalysisService(generation_service=gen_service)
chat_service = DocumentChatService(generation_service=gen_service)

UPLOAD_DIR = Path(tempfile.gettempdir()) / "project-pi-uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


@router.post("/bmc/generate", response_model=dict)
async def generate_bmc(request: BMCRequest):
    """Generate Business Model Canvas"""
    try:
        logger.info(f"Generating BMC for {request.startup_name}")
        result = gen_service.generate_bmc(
            request.startup_name,
            request.description,
            request.sector,
            request.stage
        )
        
        if result["success"]:
            return {
                "success": True,
                "startup_name": request.startup_name,
                "bmc": result["data"],
                "raw_response": result["raw_text"]
            }
        else:
            raise HTTPException(status_code=500, detail="BMC generation failed")
    except Exception as e:
        logger.error(f"BMC generation error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/swot/generate", response_model=dict)
async def generate_swot(request: SWOTRequest):
    """Generate SWOT Analysis"""
    try:
        logger.info(f"Generating SWOT for {request.startup_name}")
        result = gen_service.generate_swot(
            request.startup_name,
            request.description,
            request.market_context
        )
        
        if result["success"]:
            return {
                "success": True,
                "startup_name": request.startup_name,
                "swot": result["data"],
                "raw_response": result["raw_text"]
            }
        else:
            raise HTTPException(status_code=500, detail="SWOT generation failed")
    except Exception as e:
        logger.error(f"SWOT generation error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/pitch/generate", response_model=dict)
async def generate_pitch(request: PitchDeckRequest):
    """Generate Pitch Deck"""
    try:
        logger.info(f"Generating Pitch for {request.startup_name}")
        result = gen_service.generate_pitch_deck(
            request.startup_name,
            request.description,
            request.sector,
            request.team_size,
            request.target_market
        )
        
        if result["success"]:
            return {
                "success": True,
                "startup_name": request.startup_name,
                "pitch": result["data"],
                "raw_response": result["raw_text"]
            }
        else:
            raise HTTPException(status_code=500, detail="Pitch generation failed")
    except Exception as e:
        logger.error(f"Pitch generation error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/pdf/extract")
async def extract_pdf(file: UploadFile = File(...)):
    """Extract text from uploaded PDF"""
    file_path = None
    try:
        # Save uploaded file
        safe_name = Path(file.filename or "uploaded.pdf").name
        file_path = UPLOAD_DIR / safe_name
        with open(file_path, "wb") as f:
            contents = await file.read()
            f.write(contents)

        logger.info(f"Extracting PDF: {file.filename}")
        result = pdf_service.extract_text_from_pdf(str(file_path))
        
        if result["success"]:
            return {
                "success": True,
                "filename": file.filename,
                "text": result["text"][:2000],  # First 2000 chars
                "page_count": result.get("page_count", 0),
                "metadata": result.get("metadata", {})
            }
        else:
            raise HTTPException(status_code=400, detail=result["error"])
    except Exception as e:
        logger.error(f"PDF extraction error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if file_path and file_path.exists():
            file_path.unlink(missing_ok=True)


@router.post("/pdf/analyze")
async def analyze_pdf(file: UploadFile = File(...)):
    """Upload and analyze PDF document"""
    file_path = None
    try:
        safe_name = Path(file.filename or "uploaded.pdf").name
        file_path = UPLOAD_DIR / safe_name
        with open(file_path, "wb") as f:
            contents = await file.read()
            f.write(contents)

        logger.info(f"Analyzing PDF: {file.filename}")
        result = pdf_service.validate_pdf_as_business_doc(str(file_path))
        
        if result["success"]:
            return {
                "success": True,
                "filename": file.filename,
                "analysis": result.get("analysis", {}),
                "file_info": result.get("file_info", {})
            }
        else:
            raise HTTPException(status_code=400, detail="Analysis failed")
    except Exception as e:
        logger.error(f"PDF analysis error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if file_path and file_path.exists():
            file_path.unlink(missing_ok=True)


@router.post("/chat/init/{doc_id}")
async def init_document_chat(
    doc_id: int,
    doc_type: str = Form(...),
    document: str = Form(...)
):
    """Initialize document for chat editing"""
    try:
        document_payload = json.loads(document)
        if not isinstance(document_payload, dict):
            raise HTTPException(status_code=400, detail="document must be a JSON object")
        logger.info(f"Initializing chat for doc {doc_id}")
        result = chat_service.initialize_document(doc_id, document_payload, doc_type)
        return result
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON format in document field")
    except Exception as e:
        logger.error(f"Chat init error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/chat/message/{doc_id}")
async def send_chat_message(doc_id: int, user_message: str = Form(...)):
    """Send message to edit document"""
    try:
        logger.info(f"Chat message for doc {doc_id}: {user_message[:50]}")
        result = chat_service.chat_with_document(doc_id, user_message)
        
        if result["success"]:
            return result
        else:
            raise HTTPException(status_code=400, detail=result.get("error", "Chat failed"))
    except Exception as e:
        logger.error(f"Chat message error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/chat/history/{doc_id}")
async def get_chat_history(doc_id: int):
    """Get chat history for document"""
    try:
        result = chat_service.get_chat_history(doc_id)
        if result["success"]:
            return result
        else:
            raise HTTPException(status_code=404, detail=result.get("error", "Not found"))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/document/{doc_id}")
async def get_document(doc_id: int):
    """Get current document state"""
    try:
        result = chat_service.get_current_document(doc_id)
        if result["success"]:
            return result
        else:
            raise HTTPException(status_code=404, detail="Document not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/document/{doc_id}/history")
async def get_version_history(doc_id: int):
    """Get version history for document"""
    try:
        result = chat_service.get_document_history(doc_id)
        if result["success"]:
            return result
        else:
            raise HTTPException(status_code=404, detail="Document not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/document/{doc_id}/revert")
async def revert_version(doc_id: int, version: int = Form(...)):
    """Revert document to specific version"""
    try:
        result = chat_service.revert_to_version(doc_id, version)
        if result["success"]:
            return result
        else:
            raise HTTPException(status_code=400, detail=result.get("error", "Revert failed"))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/status")
async def service_status():
    """Check document generation service status"""
    return {
        "status": "operational",
        "services": {
            "generation": "active" if gen_service.pipe else "limited (fallback)",
            "pdf_analysis": "active",
            "chat_memory": "active",
            "model": "CanOfWorms/Entrepreneurship_Chatbot"
        }
    }
