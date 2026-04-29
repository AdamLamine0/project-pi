"""PDF analysis and extraction service"""
import json
import logging
from typing import Dict, Optional
from pathlib import Path

logger = logging.getLogger(__name__)


class PDFAnalysisService:
    def __init__(self, generation_service=None):
        """Initialize PDF analysis with generation service for AI analysis"""
        self.generation_service = generation_service
        self._check_dependencies()

    @staticmethod
    def _check_dependencies():
        """Check if required PDF libraries are installed"""
        try:
            import fitz
            logger.info("✓ PyMuPDF available")
        except ImportError:
            logger.warning("PyMuPDF not installed. Install: pip install pymupdf")

    def extract_text_from_pdf(self, file_path: str) -> Dict:
        """Extract text from PDF using PyMuPDF"""
        try:
            import fitz
        except ImportError:
            return {
                "success": False,
                "error": "PyMuPDF not installed. Run: pip install pymupdf"
            }

        try:
            doc = fitz.open(file_path)
            text = ""
            metadata = {
                "pages": doc.page_count,
                "title": doc.metadata.get("title", ""),
                "author": doc.metadata.get("author", ""),
            }

            for page_num, page in enumerate(doc, 1):
                text += f"\n--- Page {page_num} ---\n"
                text += page.get_text()

            doc.close()

            return {
                "success": True,
                "text": text,
                "metadata": metadata,
                "page_count": metadata["pages"]
            }
        except Exception as e:
            logger.error(f"PDF extraction error: {e}")
            return {"success": False, "error": str(e)}

    def analyze_document(self, text: str, document_type: str = "startup") -> Dict:
        """Analyze extracted document using AI"""
        if not self.generation_service or not self.generation_service.pipe:
            return self._analyze_fallback(text, document_type)

        prompt = f"""You are a startup document analyst. Analyze this document:

{text[:2000]}...

Provide analysis in JSON format with:
1. summary (main points in 2-3 sentences)
2. strengths (list of positive aspects)
3. weaknesses (list of areas needing improvement)
4. missing_elements (what should be added)
5. improvement_suggestions (actionable recommendations)

Return ONLY valid JSON (no markdown)."""

        try:
            result = self.generation_service.pipe(
                prompt,
                max_new_tokens=800,
                temperature=0.7,
                do_sample=True,
                top_p=0.9
            )
            
            text_result = result[0]["generated_text"]
            
            # Parse JSON from response
            import re
            json_match = re.search(r'\{.*\}', text_result, re.DOTALL)
            if json_match:
                analysis = json.loads(json_match.group(0))
            else:
                analysis = self._analyze_fallback(text, document_type)["analysis"]

            return {
                "success": True,
                "analysis": analysis,
                "raw_response": text_result
            }
        except Exception as e:
            logger.error(f"Analysis error: {e}")
            return self._analyze_fallback(text, document_type)

    def validate_pdf_as_business_doc(self, file_path: str) -> Dict:
        """Extract and validate PDF as business document"""
        # Extract text
        extract_result = self.extract_text_from_pdf(file_path)
        if not extract_result["success"]:
            return extract_result

        # Analyze content
        analysis_result = self.analyze_document(
            extract_result["text"],
            "startup"
        )

        return {
            "success": True,
            "extraction": extract_result,
            "analysis": analysis_result,
            "file_info": {
                "name": Path(file_path).name,
                "size": Path(file_path).stat().st_size,
                "pages": extract_result.get("page_count", 0)
            }
        }

    @staticmethod
    def _analyze_fallback(text: str, doc_type: str) -> Dict:
        """Fallback analysis when AI not available"""
        word_count = len(text.split())
        has_numbers = any(char.isdigit() for char in text)
        
        return {
            "success": True,
            "analysis": {
                "summary": f"Document with approximately {word_count} words covering {doc_type} topics",
                "strengths": ["Well-structured content", "Contains data"],
                "weaknesses": ["Needs professional editing", "May need more detail"],
                "missing_elements": ["Financial projections", "Market analysis", "Team section"],
                "improvement_suggestions": [
                    "Add executive summary",
                    "Include specific metrics",
                    "Improve visual formatting",
                    "Add team bios"
                ]
            },
            "raw_response": "Fallback analysis"
        }
