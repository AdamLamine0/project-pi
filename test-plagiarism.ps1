# Test Plagiarism Detection for Full Project
# This script tests the plagiarism detection endpoint with sample project data

$API_BASE = "http://localhost:8091"
$PROJECT_ID = 1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Testing Plagiarism Detection" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Test 1: Check if ML service is running
Write-Host "Test 1: Checking ML Service Health..." -ForegroundColor Yellow
try {
    $healthResponse = Invoke-RestMethod -Uri "http://localhost:5000/health" -Method Get
    Write-Host "✓ ML Service is running: $($healthResponse.status)" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "✗ ML Service is not running!" -ForegroundColor Red
    Write-Host "Please start the ML service first:" -ForegroundColor Yellow
    Write-Host "  cd pic/project-pi/gestionprojets/ml-service" -ForegroundColor Yellow
    Write-Host "  python app.py" -ForegroundColor Yellow
    exit 1
}

# Test 2: Test plagiarism detection with sample documents
Write-Host "Test 2: Testing Plagiarism Detection with Sample Documents..." -ForegroundColor Yellow

$plagiarismPayload = @{
    documentTexts = @(
        "FinTrack AI is an innovative financial management platform designed to help small and medium enterprises (SMEs) automate their invoicing, cash flow forecasting, and compliance reporting. Our solution leverages artificial intelligence to provide real-time insights and predictive analytics.",
        "The platform integrates seamlessly with existing accounting software and provides a user-friendly dashboard for financial monitoring. We use machine learning algorithms to detect anomalies and predict future cash flow trends.",
        "Our target market includes SMEs in the technology, retail, and service sectors. We aim to reduce manual accounting work by 70% and improve financial decision-making through data-driven insights."
    )
    webSources = @(
        "https://example.com/fintech-solutions",
        "https://example.com/ai-accounting"
    )
} | ConvertTo-Json -Depth 10

try {
    $plagiarismResponse = Invoke-RestMethod -Uri "$API_BASE/api/ml/projects/$PROJECT_ID/plagiarism" `
        -Method Post `
        -ContentType "application/json" `
        -Body $plagiarismPayload
    
    Write-Host "✓ Plagiarism check completed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Results:" -ForegroundColor Cyan
    Write-Host "  Project ID: $($plagiarismResponse.projectId)" -ForegroundColor White
    Write-Host "  Plagiarism Score: $($plagiarismResponse.plagiarismScore)%" -ForegroundColor White
    Write-Host "  Is Plagiarized: $($plagiarismResponse.isPlagiarized)" -ForegroundColor White
    Write-Host "  Documents Checked: $($plagiarismResponse.checkedDocuments)" -ForegroundColor White
    Write-Host "  Web Sources Checked: $($plagiarismResponse.checkedWebSources)" -ForegroundColor White
    Write-Host "  Message: $($plagiarismResponse.message)" -ForegroundColor White
    Write-Host ""
    Write-Host "Details:" -ForegroundColor Cyan
    Write-Host "  Original Content: $($plagiarismResponse.details.originalContent)%" -ForegroundColor Green
    Write-Host "  Similar Content: $($plagiarismResponse.details.similarContent)%" -ForegroundColor Yellow
    Write-Host "  Matched Sources: $($plagiarismResponse.details.matchedSources)" -ForegroundColor White
    Write-Host ""
} catch {
    Write-Host "✗ Plagiarism check failed!" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
}

# Test 3: Test with highly similar content (simulated plagiarism)
Write-Host "Test 3: Testing with Highly Similar Content..." -ForegroundColor Yellow

$similarPayload = @{
    documentTexts = @(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    )
    webSources = @()
} | ConvertTo-Json -Depth 10

try {
    $similarResponse = Invoke-RestMethod -Uri "$API_BASE/api/ml/projects/$PROJECT_ID/plagiarism" `
        -Method Post `
        -ContentType "application/json" `
        -Body $similarPayload
    
    Write-Host "✓ Similar content check completed!" -ForegroundColor Green
    Write-Host "  Plagiarism Score: $($similarResponse.plagiarismScore)%" -ForegroundColor White
    Write-Host "  Message: $($similarResponse.message)" -ForegroundColor White
    Write-Host ""
} catch {
    Write-Host "✗ Similar content check failed!" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
}

# Test 4: Test with empty documents
Write-Host "Test 4: Testing with Empty Documents..." -ForegroundColor Yellow

$emptyPayload = @{
    documentTexts = @()
    webSources = @()
} | ConvertTo-Json -Depth 10

try {
    $emptyResponse = Invoke-RestMethod -Uri "$API_BASE/api/ml/projects/$PROJECT_ID/plagiarism" `
        -Method Post `
        -ContentType "application/json" `
        -Body $emptyPayload
    
    Write-Host "✓ Empty documents check completed!" -ForegroundColor Green
    Write-Host "  Plagiarism Score: $($emptyResponse.plagiarismScore)%" -ForegroundColor White
    Write-Host "  Documents Checked: $($emptyResponse.checkedDocuments)" -ForegroundColor White
    Write-Host ""
} catch {
    Write-Host "✗ Empty documents check failed!" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
}

# Test 5: Test with large document
Write-Host "Test 5: Testing with Large Document..." -ForegroundColor Yellow

$largeText = "This is a comprehensive business plan for FinTrack AI. " * 100

$largePayload = @{
    documentTexts = @($largeText)
    webSources = @()
} | ConvertTo-Json -Depth 10

try {
    $largeResponse = Invoke-RestMethod -Uri "$API_BASE/api/ml/projects/$PROJECT_ID/plagiarism" `
        -Method Post `
        -ContentType "application/json" `
        -Body $largePayload
    
    Write-Host "✓ Large document check completed!" -ForegroundColor Green
    Write-Host "  Plagiarism Score: $($largeResponse.plagiarismScore)%" -ForegroundColor White
    Write-Host "  Message: $($largeResponse.message)" -ForegroundColor White
    Write-Host ""
} catch {
    Write-Host "✗ Large document check failed!" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
}

# Test 6: Test direct ML service endpoint (bypass API Gateway)
Write-Host "Test 6: Testing Direct ML Service Endpoint..." -ForegroundColor Yellow

$directPayload = @{
    projectId = $PROJECT_ID
    text = "This is a test document for plagiarism detection. It contains original content about financial technology and AI-powered solutions."
} | ConvertTo-Json -Depth 10

try {
    $directResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/ml/plagiarism" `
        -Method Post `
        -ContentType "application/json" `
        -Body $directPayload
    
    Write-Host "✓ Direct ML service check completed!" -ForegroundColor Green
    Write-Host "  Plagiarism Score: $($directResponse.plagiarismScore)%" -ForegroundColor White
    Write-Host "  Is Plagiarized: $($directResponse.isPlagiarized)" -ForegroundColor White
    Write-Host ""
} catch {
    Write-Host "✗ Direct ML service check failed!" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "All Tests Completed!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Summary:" -ForegroundColor Yellow
Write-Host "- The plagiarism detection service is currently returning mock data" -ForegroundColor White
Write-Host "- To implement real plagiarism detection, you would need to:" -ForegroundColor White
Write-Host "  1. Integrate with a plagiarism detection API (e.g., Copyscape, Turnitin)" -ForegroundColor White
Write-Host "  2. Implement text similarity algorithms (e.g., cosine similarity, Jaccard index)" -ForegroundColor White
Write-Host "  3. Use NLP libraries (e.g., spaCy, NLTK) for text analysis" -ForegroundColor White
Write-Host "  4. Compare against a database of known sources" -ForegroundColor White
Write-Host ""
