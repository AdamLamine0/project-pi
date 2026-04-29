"""Document generation service using Entrepreneurship_Chatbot model"""
import json
import re
from typing import Dict
import logging

logger = logging.getLogger(__name__)


class DocumentGenerationService:
    def __init__(self):
        """Initialize with Entrepreneurship_Chatbot model"""
        self.pipe = None
        try:
            # Import lazily so the service can still start in fallback mode
            # when transformers is not installed in the current environment.
            from transformers import pipeline
            self.pipe = pipeline(
                "text-generation",
                model="CanOfWorms/Entrepreneurship_Chatbot",
                device=0 if self._cuda_available() else -1
            )
            logger.info("✓ Entrepreneurship_Chatbot model loaded successfully")
        except Exception as e:
            logger.error(f"Failed to load model: {e}")

    @staticmethod
    def _cuda_available() -> bool:
        """Check if CUDA is available"""
        try:
            import torch
            return torch.cuda.is_available()
        except:
            return False

    def generate_bmc(self, startup_name: str, description: str, sector: str, stage: str) -> Dict:
        """Generate Business Model Canvas in JSON format"""
        if not self.pipe:
            return self._bmc_fallback(startup_name, description)

        prompt = f"""You are a startup consultant. Generate a detailed Business Model Canvas.

Return ONLY valid JSON (no markdown, no extra text):

{{
  "key_partners": ["list", "of", "partners"],
  "value_propositions": ["list", "of", "propositions"],
  "customer_segments": ["list", "of", "segments"],
  "channels": ["list", "of", "channels"],
  "revenue_streams": ["list", "of", "streams"],
  "cost_structure": ["list", "of", "costs"]
}}

Startup: {startup_name}
Description: {description}
Sector: {sector}
Stage: {stage}"""

        try:
            result = self.pipe(
                prompt,
                max_new_tokens=800,
                temperature=0.5,
                do_sample=True,
                top_p=0.9
            )
            
            text = result[0]["generated_text"]
            json_text = self._extract_json(text)
            bmc_json = json.loads(json_text)
            
            return {
                "success": True,
                "data": bmc_json,
                "raw_text": text
            }
        except Exception as e:
            logger.error(f"BMC generation error: {e}")
            return self._bmc_fallback(startup_name, description)

    def generate_swot(self, startup_name: str, description: str, market_context: str = None) -> Dict:
        """Generate SWOT analysis in JSON format"""
        if not self.pipe:
            return self._swot_fallback(startup_name, description)

        market_info = f"Market context: {market_context}" if market_context else ""

        prompt = f"""You are a business analyst. Generate a comprehensive SWOT analysis.

Return ONLY valid JSON (no markdown, no extra text):

{{
  "strengths": ["list", "of", "strengths"],
  "weaknesses": ["list", "of", "weaknesses"],
  "opportunities": ["list", "of", "opportunities"],
  "threats": ["list", "of", "threats"]
}}

Startup: {startup_name}
Description: {description}
{market_info}"""

        try:
            result = self.pipe(
                prompt,
                max_new_tokens=800,
                temperature=0.5,
                do_sample=True,
                top_p=0.9
            )
            
            text = result[0]["generated_text"]
            json_text = self._extract_json(text)
            swot_json = json.loads(json_text)
            
            return {
                "success": True,
                "data": swot_json,
                "raw_text": text
            }
        except Exception as e:
            logger.error(f"SWOT generation error: {e}")
            return self._swot_fallback(startup_name, description)

    def generate_pitch_deck(self, startup_name: str, description: str, sector: str, 
                           team_size: int, target_market: str = None) -> Dict:
        """Generate pitch deck slides in JSON format"""
        if not self.pipe:
            return self._pitch_fallback(startup_name, description)

        market_info = f"Target market: {target_market}" if target_market else ""

        prompt = f"""You are a startup pitch expert. Generate a 7-slide pitch deck.

Return ONLY valid JSON (no markdown, no extra text):

{{
  "slides": [
    {{"slide_number": 1, "title": "Problem", "content": ["point1", "point2"]}},
    {{"slide_number": 2, "title": "Solution", "content": ["point1", "point2"]}},
    {{"slide_number": 3, "title": "Market Opportunity", "content": ["point1", "point2"]}},
    {{"slide_number": 4, "title": "Business Model", "content": ["point1", "point2"]}},
    {{"slide_number": 5, "title": "Traction", "content": ["point1", "point2"]}},
    {{"slide_number": 6, "title": "Team", "content": ["point1", "point2"]}},
    {{"slide_number": 7, "title": "Ask", "content": ["point1", "point2"]}}
  ]
}}

Startup: {startup_name}
Description: {description}
Sector: {sector}
Team size: {team_size}
{market_info}"""

        try:
            result = self.pipe(
                prompt,
                max_new_tokens=1200,
                temperature=0.5,
                do_sample=True,
                top_p=0.9
            )
            
            text = result[0]["generated_text"]
            json_text = self._extract_json(text)
            pitch_json = json.loads(json_text)
            
            return {
                "success": True,
                "data": pitch_json,
                "raw_text": text
            }
        except Exception as e:
            logger.error(f"Pitch generation error: {e}")
            return self._pitch_fallback(startup_name, description)

    def edit_document(self, document_type: str, current_document: Dict, 
                     user_message: str) -> Dict:
        """Dynamically edit document based on user request"""
        if not self.pipe:
            return {"success": False, "error": "Model not available"}

        doc_str = json.dumps(current_document)
        
        prompt = f"""You are editing a startup {document_type.upper()} document.

Current document:
{doc_str}

User request: {user_message}

Update the document JSON accordingly. Return ONLY the updated JSON (no markdown, no extra text)."""

        try:
            result = self.pipe(
                prompt,
                max_new_tokens=1000,
                temperature=0.6,
                do_sample=True,
                top_p=0.9
            )
            
            text = result[0]["generated_text"]
            json_text = self._extract_json(text)
            updated_doc = json.loads(json_text)
            
            return {
                "success": True,
                "updated_document": updated_doc,
                "raw_response": text
            }
        except Exception as e:
            logger.error(f"Document edit error: {e}")
            return {"success": False, "error": str(e)}

    @staticmethod
    def _extract_json(text: str) -> str:
        """Extract JSON from text (handles markdown code blocks)"""
        # Try to find JSON code block
        json_match = re.search(r'```(?:json)?\s*(.*?)```', text, re.DOTALL)
        if json_match:
            return json_match.group(1).strip()
        
        # Try to find JSON object directly
        json_match = re.search(r'\{.*\}', text, re.DOTALL)
        if json_match:
            return json_match.group(0).strip()
        
        return text

    @staticmethod
    def _bmc_fallback(startup_name: str, description: str) -> Dict:
        """Fallback BMC generation"""
        return {
            "success": True,
            "data": {
                "key_partners": ["Partners in " + description[:20]],
                "value_propositions": ["Solution for startup"],
                "customer_segments": ["Early adopters"],
                "channels": ["Direct sales", "Online"],
                "revenue_streams": ["Subscription", "License"],
                "cost_structure": ["Development", "Operations"]
            },
            "raw_text": "Fallback BMC generated"
        }

    @staticmethod
    def _swot_fallback(startup_name: str, description: str) -> Dict:
        """Fallback SWOT generation"""
        return {
            "success": True,
            "data": {
                "strengths": ["Innovative team", "Clear vision"],
                "weaknesses": ["Limited resources", "Early stage"],
                "opportunities": ["Market growth", "Partnerships"],
                "threats": ["Competition", "Market changes"]
            },
            "raw_text": "Fallback SWOT generated"
        }

    @staticmethod
    def _pitch_fallback(startup_name: str, description: str) -> Dict:
        """Fallback Pitch deck generation"""
        return {
            "success": True,
            "data": {
                "slides": [
                    {"slide_number": 1, "title": "Problem", "content": ["Problem statement"]},
                    {"slide_number": 2, "title": "Solution", "content": ["Our solution"]},
                    {"slide_number": 3, "title": "Market", "content": ["Market size"]},
                    {"slide_number": 4, "title": "Model", "content": ["Business model"]},
                    {"slide_number": 5, "title": "Traction", "content": ["Metrics"]},
                    {"slide_number": 6, "title": "Team", "content": ["Team expertise"]},
                    {"slide_number": 7, "title": "Ask", "content": ["Funding amount"]}
                ]
            },
            "raw_text": "Fallback pitch generated"
        }
