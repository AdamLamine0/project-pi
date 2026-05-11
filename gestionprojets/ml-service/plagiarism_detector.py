"""
Plagiarism Detection Module with Web Scraping
Implements text similarity algorithms and web source comparison
"""
import re
import logging
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse
from typing import List, Dict, Tuple
import time

logger = logging.getLogger(__name__)

class PlagiarismDetector:
    """
    Plagiarism detector with web scraping capabilities
    """
    
    def __init__(self, similarity_threshold=50.0, timeout=10):
        """
        Initialize plagiarism detector
        
        Args:
            similarity_threshold: Minimum similarity percentage to flag as plagiarism
            timeout: Request timeout in seconds
        """
        self.similarity_threshold = similarity_threshold
        self.timeout = timeout
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
    
    def calculate_similarity(self, text1: str, text2: str) -> float:
        """
        Calculate similarity between two texts using Jaccard similarity
        
        Args:
            text1: First text
            text2: Second text
            
        Returns:
            Similarity score as percentage (0-100)
        """
        # Normalize texts
        text1 = self._normalize_text(text1)
        text2 = self._normalize_text(text2)
        
        # Tokenize into words
        words1 = set(text1.split())
        words2 = set(text2.split())
        
        # Calculate Jaccard similarity
        if not words1 or not words2:
            return 0.0
        
        intersection = words1.intersection(words2)
        union = words1.union(words2)
        
        similarity = (len(intersection) / len(union)) * 100
        return round(similarity, 2)
    
    def calculate_ngram_similarity(self, text1: str, text2: str, n=3) -> float:
        """
        Calculate similarity using n-gram comparison
        
        Args:
            text1: First text
            text2: Second text
            n: N-gram size (default 3)
            
        Returns:
            Similarity score as percentage (0-100)
        """
        # Normalize texts
        text1 = self._normalize_text(text1)
        text2 = self._normalize_text(text2)
        
        # Generate n-grams
        ngrams1 = self._generate_ngrams(text1, n)
        ngrams2 = self._generate_ngrams(text2, n)
        
        if not ngrams1 or not ngrams2:
            return 0.0
        
        # Calculate Jaccard similarity on n-grams
        intersection = ngrams1.intersection(ngrams2)
        union = ngrams1.union(ngrams2)
        
        similarity = (len(intersection) / len(union)) * 100
        return round(similarity, 2)
    
    def _normalize_text(self, text: str) -> str:
        """
        Normalize text for comparison
        
        Args:
            text: Input text
            
        Returns:
            Normalized text
        """
        # Convert to lowercase
        text = text.lower()
        
        # Remove special characters and extra whitespace
        text = re.sub(r'[^\w\s]', ' ', text)
        text = re.sub(r'\s+', ' ', text)
        
        return text.strip()
    
    def _generate_ngrams(self, text: str, n: int) -> set:
        """
        Generate n-grams from text
        
        Args:
            text: Input text
            n: N-gram size
            
        Returns:
            Set of n-grams
        """
        words = text.split()
        ngrams = set()
        
        for i in range(len(words) - n + 1):
            ngram = ' '.join(words[i:i+n])
            ngrams.add(ngram)
        
        return ngrams
    
    def scrape_web_content(self, url: str) -> Tuple[str, bool]:
        """
        Scrape text content from a web URL
        
        Args:
            url: Web URL to scrape
            
        Returns:
            Tuple of (text content, success status)
        """
        try:
            # Validate URL
            parsed = urlparse(url)
            if not parsed.scheme or not parsed.netloc:
                logger.warning(f"Invalid URL: {url}")
                return "", False
            
            # Make request with timeout
            response = requests.get(
                url, 
                headers=self.headers, 
                timeout=self.timeout,
                allow_redirects=True
            )
            response.raise_for_status()
            
            # Parse HTML
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Remove script and style elements
            for script in soup(["script", "style", "nav", "footer", "header"]):
                script.decompose()
            
            # Get text content
            text = soup.get_text(separator=' ', strip=True)
            
            # Clean up whitespace
            text = re.sub(r'\s+', ' ', text).strip()
            
            logger.info(f"Successfully scraped {len(text)} characters from {url}")
            return text, True
            
        except requests.exceptions.Timeout:
            logger.warning(f"Timeout scraping {url}")
            return "", False
        except requests.exceptions.RequestException as e:
            logger.warning(f"Error scraping {url}: {str(e)}")
            return "", False
        except Exception as e:
            logger.error(f"Unexpected error scraping {url}: {str(e)}")
            return "", False
    
    def check_against_web_sources(
        self, 
        document_text: str, 
        web_sources: List[str],
        delay_between_requests: float = 1.0
    ) -> List[Dict]:
        """
        Check document against multiple web sources
        
        Args:
            document_text: Text to check for plagiarism
            web_sources: List of URLs to check against
            delay_between_requests: Delay between requests in seconds
            
        Returns:
            List of matched sources with similarity scores
        """
        matched_sources = []
        
        for url in web_sources:
            # Add delay to be respectful to servers
            if matched_sources:  # Skip delay for first request
                time.sleep(delay_between_requests)
            
            # Scrape web content
            web_text, success = self.scrape_web_content(url)
            
            if not success or not web_text:
                continue
            
            # Calculate similarity using both methods
            jaccard_similarity = self.calculate_similarity(document_text, web_text)
            ngram_similarity = self.calculate_ngram_similarity(document_text, web_text, n=3)
            
            # Use average of both methods
            avg_similarity = (jaccard_similarity + ngram_similarity) / 2
            
            # If similarity exceeds threshold, add to matches
            if avg_similarity >= self.similarity_threshold:
                matched_sources.append({
                    'url': url,
                    'similarity': round(avg_similarity, 2),
                    'jaccardSimilarity': jaccard_similarity,
                    'ngramSimilarity': ngram_similarity,
                    'matchType': 'high' if avg_similarity >= 75 else 'medium'
                })
                logger.warning(f"High similarity ({avg_similarity}%) detected with {url}")
        
        # Sort by similarity (highest first)
        matched_sources.sort(key=lambda x: x['similarity'], reverse=True)
        
        return matched_sources
    
    def analyze_documents(
        self, 
        document_texts: List[str], 
        web_sources: List[str] = None
    ) -> Dict:
        """
        Analyze multiple documents for plagiarism
        
        Args:
            document_texts: List of document texts to analyze
            web_sources: Optional list of web URLs to check against
            
        Returns:
            Plagiarism analysis results
        """
        if not document_texts:
            return {
                'plagiarismScore': 0.0,
                'isPlagiarized': False,
                'sources': [],
                'checkedDocuments': 0,
                'checkedWebSources': 0,
                'message': 'No documents provided',
                'details': {
                    'originalContent': 100.0,
                    'similarContent': 0.0,
                    'matchedSources': 0
                }
            }
        
        # Combine all document texts
        combined_text = ' '.join(document_texts)
        
        # Check against web sources if provided
        matched_sources = []
        if web_sources:
            matched_sources = self.check_against_web_sources(
                combined_text, 
                web_sources
            )
        
        # Calculate overall plagiarism score
        if matched_sources:
            # Use highest similarity as plagiarism score
            plagiarism_score = matched_sources[0]['similarity']
        else:
            # Check for self-plagiarism (duplicate content within documents)
            if len(document_texts) > 1:
                max_self_similarity = 0.0
                for i in range(len(document_texts)):
                    for j in range(i + 1, len(document_texts)):
                        similarity = self.calculate_similarity(
                            document_texts[i], 
                            document_texts[j]
                        )
                        max_self_similarity = max(max_self_similarity, similarity)
                plagiarism_score = max_self_similarity
            else:
                plagiarism_score = 0.0
        
        # Determine if plagiarized
        is_plagiarized = plagiarism_score >= self.similarity_threshold
        
        # Calculate content percentages
        original_content = max(0.0, 100.0 - plagiarism_score)
        similar_content = plagiarism_score
        
        # Generate message
        if is_plagiarized:
            if matched_sources:
                message = f"Significant plagiarism detected ({plagiarism_score}% similarity with external sources)"
            else:
                message = f"Significant self-plagiarism detected ({plagiarism_score}% duplicate content)"
        else:
            message = "No significant plagiarism detected"
        
        return {
            'plagiarismScore': round(plagiarism_score, 2),
            'isPlagiarized': is_plagiarized,
            'sources': matched_sources,
            'checkedDocuments': len(document_texts),
            'checkedWebSources': len(web_sources) if web_sources else 0,
            'message': message,
            'details': {
                'originalContent': round(original_content, 2),
                'similarContent': round(similar_content, 2),
                'matchedSources': len(matched_sources),
                'selfPlagiarismChecked': len(document_texts) > 1
            }
        }
    
    def find_matching_segments(
        self, 
        document_text: str, 
        source_text: str, 
        min_segment_length: int = 50
    ) -> List[Dict]:
        """
        Find matching text segments between document and source
        
        Args:
            document_text: Document text
            source_text: Source text to compare against
            min_segment_length: Minimum length of matching segment
            
        Returns:
            List of matching segments with positions
        """
        # Normalize texts
        doc_normalized = self._normalize_text(document_text)
        source_normalized = self._normalize_text(source_text)
        
        # Split into sentences
        doc_sentences = re.split(r'[.!?]+', doc_normalized)
        source_sentences = re.split(r'[.!?]+', source_normalized)
        
        matching_segments = []
        
        for doc_sent in doc_sentences:
            doc_sent = doc_sent.strip()
            if len(doc_sent) < min_segment_length:
                continue
            
            for source_sent in source_sentences:
                source_sent = source_sent.strip()
                if len(source_sent) < min_segment_length:
                    continue
                
                # Calculate similarity
                similarity = self.calculate_similarity(doc_sent, source_sent)
                
                if similarity >= 70:  # High similarity threshold for segments
                    matching_segments.append({
                        'documentSegment': doc_sent[:100] + '...' if len(doc_sent) > 100 else doc_sent,
                        'sourceSegment': source_sent[:100] + '...' if len(source_sent) > 100 else source_sent,
                        'similarity': similarity
                    })
        
        return matching_segments
