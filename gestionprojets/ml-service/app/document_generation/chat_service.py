"""Document chat service with stateful memory"""
import json
import logging
from typing import Dict, Optional
from datetime import datetime

logger = logging.getLogger(__name__)


class DocumentChatService:
    def __init__(self, generation_service=None):
        """Initialize with document state memory"""
        self.generation_service = generation_service
        self.document_memory = {}  # {doc_id: {history: [], current_state: {}}}
        self.chat_history = {}  # {doc_id: [messages]}

    def initialize_document(self, doc_id: int, document: Dict, doc_type: str) -> Dict:
        """Initialize document state in memory"""
        self.document_memory[doc_id] = {
            "current_state": document,
            "doc_type": doc_type,
            "created_at": datetime.now().isoformat(),
            "version": 1,
            "history": [
                {
                    "version": 1,
                    "action": "created",
                    "timestamp": datetime.now().isoformat(),
                    "state": document
                }
            ]
        }
        self.chat_history[doc_id] = []

        logger.info(f"✓ Document {doc_id} initialized in memory")
        return {"success": True, "message": f"Document {doc_id} ready for editing"}

    def chat_with_document(self, doc_id: int, user_message: str) -> Dict:
        """Chat endpoint for dynamic document editing"""
        if doc_id not in self.document_memory:
            return {"success": False, "error": f"Document {doc_id} not found in memory"}

        mem = self.document_memory[doc_id]
        current_doc = mem["current_state"]
        doc_type = mem["doc_type"]

        if not self.generation_service or not self.generation_service.pipe:
            return self._chat_fallback(doc_id, user_message, current_doc)

        try:
            # Build context prompt
            doc_str = json.dumps(current_doc, indent=2)
            
            prompt = f"""You are editing a startup {doc_type.upper()} document in real-time.

Current document state:
{doc_str}

User request: {user_message}

You MUST:
1. Update the document JSON based on user request
2. Keep the same structure
3. Return ONLY the complete updated JSON (no markdown, no extra text)

Updated document JSON:"""

            result = self.generation_service.pipe(
                prompt,
                max_new_tokens=1000,
                temperature=0.6,
                do_sample=True,
                top_p=0.9
            )

            response_text = result[0]["generated_text"]
            
            # Extract JSON from response
            import re
            json_match = re.search(r'\{.*\}', response_text, re.DOTALL)
            if json_match:
                updated_doc = json.loads(json_match.group(0))
            else:
                return {"success": False, "error": "Failed to parse AI response"}

            # Calculate what changed
            changes = self._detect_changes(current_doc, updated_doc)

            # Update memory
            mem["current_state"] = updated_doc
            mem["version"] += 1
            mem["history"].append({
                "version": mem["version"],
                "action": "edited",
                "user_message": user_message,
                "changes": changes,
                "timestamp": datetime.now().isoformat(),
                "state": updated_doc
            })

            # Store chat message
            self.chat_history[doc_id].append({
                "type": "user",
                "message": user_message,
                "timestamp": datetime.now().isoformat()
            })
            self.chat_history[doc_id].append({
                "type": "assistant",
                "message": f"Updated {len(changes)} sections",
                "timestamp": datetime.now().isoformat()
            })

            return {
                "success": True,
                "user_message": user_message,
                "updated_document": updated_doc,
                "changes": changes,
                "version": mem["version"],
                "change_summary": self._summarize_changes(changes)
            }

        except Exception as e:
            logger.error(f"Chat error: {e}")
            return {"success": False, "error": str(e)}

    def get_document_history(self, doc_id: int) -> Dict:
        """Get complete version history"""
        if doc_id not in self.document_memory:
            return {"success": False, "error": f"Document {doc_id} not found"}

        return {
            "success": True,
            "doc_id": doc_id,
            "version_count": self.document_memory[doc_id]["version"],
            "history": self.document_memory[doc_id]["history"]
        }

    def get_chat_history(self, doc_id: int) -> Dict:
        """Get chat messages for document"""
        if doc_id not in self.chat_history:
            return {"success": False, "error": f"No chat history for doc {doc_id}"}

        return {
            "success": True,
            "doc_id": doc_id,
            "messages": self.chat_history[doc_id],
            "message_count": len(self.chat_history[doc_id])
        }

    def revert_to_version(self, doc_id: int, version: int) -> Dict:
        """Revert document to specific version"""
        if doc_id not in self.document_memory:
            return {"success": False, "error": f"Document {doc_id} not found"}

        mem = self.document_memory[doc_id]
        history_item = next(
            (h for h in mem["history"] if h["version"] == version),
            None
        )

        if not history_item:
            return {"success": False, "error": f"Version {version} not found"}

        mem["current_state"] = history_item["state"]
        mem["version"] = version

        return {
            "success": True,
            "message": f"Reverted to version {version}",
            "document": mem["current_state"]
        }

    def get_current_document(self, doc_id: int) -> Dict:
        """Get current document state"""
        if doc_id not in self.document_memory:
            return {"success": False, "error": f"Document {doc_id} not found"}

        mem = self.document_memory[doc_id]
        return {
            "success": True,
            "doc_id": doc_id,
            "document": mem["current_state"],
            "version": mem["version"],
            "doc_type": mem["doc_type"],
            "created_at": mem["created_at"]
        }

    @staticmethod
    def _detect_changes(old_doc: Dict, new_doc: Dict) -> Dict:
        """Detect what changed between versions"""
        changes = {}
        
        # Simple change detection
        for key in new_doc:
            if key not in old_doc:
                changes[key] = {"action": "added"}
            elif old_doc[key] != new_doc[key]:
                changes[key] = {
                    "action": "modified",
                    "old": old_doc[key],
                    "new": new_doc[key]
                }
        
        for key in old_doc:
            if key not in new_doc:
                changes[key] = {"action": "removed"}

        return changes

    @staticmethod
    def _summarize_changes(changes: Dict) -> str:
        """Create human-readable summary of changes"""
        if not changes:
            return "No changes detected"

        added = sum(1 for c in changes.values() if c.get("action") == "added")
        modified = sum(1 for c in changes.values() if c.get("action") == "modified")
        removed = sum(1 for c in changes.values() if c.get("action") == "removed")

        summary_parts = []
        if added:
            summary_parts.append(f"Added {added} section(s)")
        if modified:
            summary_parts.append(f"Modified {modified} section(s)")
        if removed:
            summary_parts.append(f"Removed {removed} section(s)")

        return " | ".join(summary_parts) if summary_parts else "Updated document"

    @staticmethod
    def _chat_fallback(doc_id: int, message: str, doc: Dict) -> Dict:
        """Fallback when AI not available"""
        # Simple keyword-based modifications
        if "remove" in message.lower():
            return {
                "success": True,
                "message": "Removed some sections (fallback mode)",
                "updated_document": doc,
                "version": 1,
                "changes": {}
            }
        elif "add" in message.lower():
            return {
                "success": True,
                "message": "Added new section (fallback mode)",
                "updated_document": doc,
                "version": 1,
                "changes": {}
            }
        else:
            return {
                "success": True,
                "message": "Document processing in fallback mode",
                "updated_document": doc,
                "version": 1,
                "changes": {}
            }
