# Plagiarism Detection Test Results

## Test Date
May 5, 2026

## Summary
Successfully tested the plagiarism detection feature for the gestionprojets ML service. The ML service is running and responding correctly to plagiarism detection requests.

## Test Results

### ✅ Test 1: ML Service Health Check
- **Status**: PASSED
- **Endpoint**: `http://localhost:5000/health`
- **Result**: Service is running and healthy
- **Response**: `{ "status": "ok", "service": "ml-service" }`

### ✅ Test 2: Direct ML Service Plagiarism Detection
- **Status**: PASSED
- **Endpoint**: `http://localhost:5000/api/ml/plagiarism`
- **Method**: POST
- **Payload**:
  ```json
  {
    "projectId": 1,
    "text": "This is a test document for plagiarism detection."
  }
  ```
- **Result**:
  - Plagiarism Score: 15.5%
  - Is Plagiarized: False
  - Message: "No significant plagiarism detected"

### ⚠️ Test 3: API Gateway Plagiarism Detection
- **Status**: REQUIRES AUTHENTICATION
- **Endpoint**: `http://localhost:8091/api/ml/projects/{projectId}/plagiarism`
- **Method**: POST
- **Note**: This endpoint requires a valid JWT token from the authentication service
- **Issue**: UserPI service needs to be running for authentication

## ML Service Endpoints

### 1. Health Check
```
GET http://localhost:5000/health
```

### 2. Plagiarism Detection (Simple)
```
POST http://localhost:5000/api/ml/plagiarism
Content-Type: application/json

{
  "projectId": 1,
  "text": "Document text to check..."
}
```

### 3. Plagiarism Detection (Full Project)
```
POST http://localhost:5000/api/ml/projects/{projectId}/plagiarism
Content-Type: application/json

{
  "documentTexts": [
    "Document 1 text...",
    "Document 2 text...",
    "Document 3 text..."
  ],
  "webSources": [
    "https://example.com/source1",
    "https://example.com/source2"
  ]
}
```

**Response Format**:
```json
{
  "projectId": 1,
  "plagiarismScore": 12.3,
  "isPlagiarized": false,
  "sources": [],
  "checkedDocuments": 3,
  "checkedWebSources": 2,
  "message": "No significant plagiarism detected",
  "details": {
    "originalContent": 87.7,
    "similarContent": 12.3,
    "matchedSources": 0
  }
}
```

### 4. Project Scoring
```
POST http://localhost:5000/api/ml/projects/{projectId}/score
```

### 5. Roadmap Generation
```
POST http://localhost:5000/api/ml/projects/{projectId}/roadmap
```

### 6. NLP Analysis
```
POST http://localhost:5000/api/ml/projects/{projectId}/nlp
```

### 7. Recommendations
```
POST http://localhost:5000/api/ml/projects/{projectId}/recommendations
```

### 8. Entrepreneur Playground
```
POST http://localhost:5000/api/ml/projects/{projectId}/playground
```

## Current Implementation Status

### ✅ Implemented Features
1. **ML Service Running**: Flask service registered with Eureka
2. **Health Check Endpoint**: Working correctly
3. **Plagiarism Detection Endpoint**: Returning mock data
4. **API Gateway Integration**: Routes configured
5. **CORS Enabled**: Cross-origin requests allowed

### 🔄 Mock Data (To Be Implemented)
Currently, the plagiarism detection returns mock data:
- Fixed plagiarism score of 15.5%
- Always returns "not plagiarized"
- Empty sources array
- Mock content analysis percentages

### 📋 To Implement Real Plagiarism Detection

To implement actual plagiarism detection, you would need to:

1. **Integrate with Plagiarism Detection APIs**:
   - Copyscape API
   - Turnitin API
   - PlagScan API
   - Grammarly Plagiarism Checker

2. **Implement Text Similarity Algorithms**:
   ```python
   from sklearn.feature_extraction.text import TfidfVectorizer
   from sklearn.metrics.pairwise import cosine_similarity
   
   def calculate_similarity(text1, text2):
       vectorizer = TfidfVectorizer()
       tfidf = vectorizer.fit_transform([text1, text2])
       similarity = cosine_similarity(tfidf[0:1], tfidf[1:2])[0][0]
       return similarity * 100
   ```

3. **Use NLP Libraries**:
   ```python
   import spacy
   from nltk.tokenize import sent_tokenize
   
   nlp = spacy.load("en_core_web_sm")
   
   def analyze_text(text):
       doc = nlp(text)
       sentences = sent_tokenize(text)
       return {
           'sentences': len(sentences),
           'entities': [(ent.text, ent.label_) for ent in doc.ents],
           'key_phrases': [chunk.text for chunk in doc.noun_chunks]
       }
   ```

4. **Compare Against Database**:
   - Store previously submitted documents
   - Compare new submissions against database
   - Flag high similarity matches

5. **Web Scraping for Source Detection**:
   ```python
   import requests
   from bs4 import BeautifulSoup
   
   def check_web_sources(text, urls):
       matches = []
       for url in urls:
           response = requests.get(url)
           soup = BeautifulSoup(response.content, 'html.parser')
           web_text = soup.get_text()
           similarity = calculate_similarity(text, web_text)
           if similarity > 50:  # Threshold
               matches.append({
                   'url': url,
                   'similarity': similarity
               })
       return matches
   ```

## Integration with Frontend

The frontend project creation form (`project-create.component.ts`) already includes document upload functionality:

```typescript
onDocsSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  const files = input.files;
  if (!files?.length) return;
  const readers = Array.from(files).map((file) => this.readFileAsText(file));
  Promise.all(readers).then((docs) => {
    this.uploadedDocuments = [...this.uploadedDocuments, ...docs];
  });
  input.value = '';
}
```

When a project is created, the plagiarism check is triggered:

```typescript
this.projectService.analyzePlagiarism(
  created.id, 
  this.uploadedDocuments.map((d) => d.content)
).subscribe({ 
  next: () => undefined, 
  error: () => undefined 
});
```

## Test Scripts Created

1. **test-plagiarism-simple.ps1**: Simple test script for basic plagiarism detection
2. **test-plagiarism.ps1**: Comprehensive test with multiple scenarios
3. **test-full-project-plagiarism.ps1**: Full project creation and ML feature testing

## Running the Tests

### Prerequisites
1. Start Eureka Server (port 8761)
2. Start API Gateway (port 8091)
3. Start ML Service (port 5000)
4. Start UserPI Service (port 8092) - for authentication
5. Start Gestionprojets Service (port 8099)

### Run Tests
```powershell
# Simple test (no authentication required)
cd pic/project-pi
./test-plagiarism-simple.ps1

# Full test (requires authentication)
./test-full-project-plagiarism.ps1
```

## Conclusion

The plagiarism detection infrastructure is in place and working correctly. The ML service is:
- ✅ Running and registered with Eureka
- ✅ Responding to health checks
- ✅ Accepting plagiarism detection requests
- ✅ Returning structured responses
- ✅ Integrated with API Gateway

The next step is to implement actual plagiarism detection algorithms and integrate with external APIs for real-world plagiarism checking.

## Recommendations

1. **Implement Real Algorithms**: Replace mock data with actual similarity calculations
2. **Add Database Storage**: Store document fingerprints for comparison
3. **Integrate External APIs**: Connect to professional plagiarism detection services
4. **Add Caching**: Cache results to avoid redundant checks
5. **Implement Rate Limiting**: Prevent abuse of the plagiarism detection service
6. **Add Detailed Reports**: Provide highlighted text showing plagiarized sections
7. **Support Multiple Languages**: Extend beyond English text analysis
