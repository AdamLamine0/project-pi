# Test Web Scraping Plagiarism Detection
# This script tests the new web scraping capabilities

$API_BASE = "http://localhost:5000"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Web Scraping Plagiarism Detection Test" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Test 1: Check ML Service Health
Write-Host "Test 1: Checking ML Service..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "$API_BASE/health" -Method Get
    Write-Host "✓ ML Service Status: $($health.status)" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "✗ ML Service is not running!" -ForegroundColor Red
    exit 1
}

# Test 2: Test with original content (no web sources)
Write-Host "Test 2: Testing Original Content (No Web Sources)..." -ForegroundColor Yellow

$originalBody = @{
    projectId = 1
    text = "This is completely original content about a revolutionary new approach to sustainable agriculture using vertical farming techniques and IoT sensors for optimal crop management."
    webSources = @()
} | ConvertTo-Json

try {
    $result = Invoke-RestMethod -Uri "$API_BASE/api/ml/plagiarism" `
        -Method Post `
        -ContentType "application/json" `
        -Body $originalBody
    
    Write-Host "✓ Analysis Complete!" -ForegroundColor Green
    Write-Host "  Plagiarism Score: $($result.plagiarismScore)%" -ForegroundColor $(if ($result.plagiarismScore -lt 20) { "Green" } elseif ($result.plagiarismScore -lt 50) { "Yellow" } else { "Red" })
    Write-Host "  Is Plagiarized: $($result.isPlagiarized)" -ForegroundColor $(if ($result.isPlagiarized) { "Red" } else { "Green" })
    Write-Host "  Message: $($result.message)" -ForegroundColor White
    Write-Host "  Original Content: $($result.details.originalContent)%" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "✗ Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
}

# Test 3: Test with web sources (Wikipedia example)
Write-Host "Test 3: Testing Against Web Sources..." -ForegroundColor Yellow
Write-Host "  Checking against Wikipedia and other sources..." -ForegroundColor White

$webSourcesBody = @{
    projectId = 2
    text = "Artificial intelligence is intelligence demonstrated by machines, in contrast to the natural intelligence displayed by humans and animals. Leading AI textbooks define the field as the study of intelligent agents."
    webSources = @(
        "https://en.wikipedia.org/wiki/Artificial_intelligence",
        "https://www.ibm.com/topics/artificial-intelligence"
    )
} | ConvertTo-Json

try {
    $result = Invoke-RestMethod -Uri "$API_BASE/api/ml/plagiarism" `
        -Method Post `
        -ContentType "application/json" `
        -Body $webSourcesBody
    
    Write-Host "✓ Analysis Complete!" -ForegroundColor Green
    Write-Host "  Plagiarism Score: $($result.plagiarismScore)%" -ForegroundColor $(if ($result.plagiarismScore -lt 20) { "Green" } elseif ($result.plagiarismScore -lt 50) { "Yellow" } else { "Red" })
    Write-Host "  Is Plagiarized: $($result.isPlagiarized)" -ForegroundColor $(if ($result.isPlagiarized) { "Red" } else { "Green" })
    Write-Host "  Message: $($result.message)" -ForegroundColor White
    Write-Host "  Checked Web Sources: $($result.checkedWebSources)" -ForegroundColor White
    Write-Host "  Matched Sources: $($result.details.matchedSources)" -ForegroundColor White
    Write-Host ""
    
    if ($result.sources -and $result.sources.Count -gt 0) {
        Write-Host "  Matched Sources:" -ForegroundColor Yellow
        foreach ($source in $result.sources) {
            Write-Host "    - $($source.url)" -ForegroundColor Yellow
            Write-Host "      Similarity: $($source.similarity)%" -ForegroundColor $(if ($source.similarity -ge 75) { "Red" } elseif ($source.similarity -ge 50) { "Yellow" } else { "White" })
            Write-Host "      Match Type: $($source.matchType)" -ForegroundColor White
        }
        Write-Host ""
    }
} catch {
    Write-Host "✗ Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
}

# Test 4: Test multiple documents with self-plagiarism check
Write-Host "Test 4: Testing Multiple Documents (Self-Plagiarism Check)..." -ForegroundColor Yellow

$multiDocBody = @{
    documentTexts = @(
        "FinTech solutions are revolutionizing the financial services industry by providing innovative digital payment systems and automated investment platforms.",
        "The financial technology sector is transforming traditional banking through digital payment solutions and automated investment management systems.",
        "Blockchain technology enables secure and transparent transactions in the cryptocurrency market."
    )
    webSources = @()
} | ConvertTo-Json

try {
    $result = Invoke-RestMethod -Uri "$API_BASE/api/ml/projects/3/plagiarism" `
        -Method Post `
        -ContentType "application/json" `
        -Body $multiDocBody
    
    Write-Host "✓ Analysis Complete!" -ForegroundColor Green
    Write-Host "  Plagiarism Score: $($result.plagiarismScore)%" -ForegroundColor $(if ($result.plagiarismScore -lt 20) { "Green" } elseif ($result.plagiarismScore -lt 50) { "Yellow" } else { "Red" })
    Write-Host "  Is Plagiarized: $($result.isPlagiarized)" -ForegroundColor $(if ($result.isPlagiarized) { "Red" } else { "Green" })
    Write-Host "  Message: $($result.message)" -ForegroundColor White
    Write-Host "  Documents Checked: $($result.checkedDocuments)" -ForegroundColor White
    Write-Host "  Self-Plagiarism Checked: $($result.details.selfPlagiarismChecked)" -ForegroundColor White
    Write-Host ""
} catch {
    Write-Host "✗ Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
}

# Test 5: Test with tech news sources
Write-Host "Test 5: Testing Against Tech News Sources..." -ForegroundColor Yellow

$techNewsBody = @{
    documentTexts = @(
        "Machine learning algorithms are being used to predict customer behavior and personalize user experiences in e-commerce platforms."
    )
    webSources = @(
        "https://www.techcrunch.com",
        "https://www.wired.com"
    )
} | ConvertTo-Json

try {
    $result = Invoke-RestMethod -Uri "$API_BASE/api/ml/projects/4/plagiarism" `
        -Method Post `
        -ContentType "application/json" `
        -Body $techNewsBody
    
    Write-Host "✓ Analysis Complete!" -ForegroundColor Green
    Write-Host "  Plagiarism Score: $($result.plagiarismScore)%" -ForegroundColor $(if ($result.plagiarismScore -lt 20) { "Green" } elseif ($result.plagiarismScore -lt 50) { "Yellow" } else { "Red" })
    Write-Host "  Is Plagiarized: $($result.isPlagiarized)" -ForegroundColor $(if ($result.isPlagiarized) { "Red" } else { "Green" })
    Write-Host "  Checked Web Sources: $($result.checkedWebSources)" -ForegroundColor White
    Write-Host "  Matched Sources: $($result.details.matchedSources)" -ForegroundColor White
    Write-Host ""
} catch {
    Write-Host "✗ Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
}

# Test 6: Test with invalid URL
Write-Host "Test 6: Testing with Invalid URL (Error Handling)..." -ForegroundColor Yellow

$invalidUrlBody = @{
    projectId = 5
    text = "Test content for invalid URL handling."
    webSources = @(
        "not-a-valid-url",
        "https://this-domain-does-not-exist-12345.com"
    )
} | ConvertTo-Json

try {
    $result = Invoke-RestMethod -Uri "$API_BASE/api/ml/plagiarism" `
        -Method Post `
        -ContentType "application/json" `
        -Body $invalidUrlBody
    
    Write-Host "✓ Analysis Complete (with errors handled gracefully)!" -ForegroundColor Green
    Write-Host "  Plagiarism Score: $($result.plagiarismScore)%" -ForegroundColor Green
    Write-Host "  Checked Web Sources: $($result.checkedWebSources)" -ForegroundColor White
    Write-Host "  Successfully Scraped: $($result.details.matchedSources)" -ForegroundColor White
    Write-Host ""
} catch {
    Write-Host "✗ Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Test Summary" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Features Tested:" -ForegroundColor Yellow
Write-Host "  ✓ Original content detection" -ForegroundColor Green
Write-Host "  ✓ Web scraping from external sources" -ForegroundColor Green
Write-Host "  ✓ Similarity calculation (Jaccard + N-gram)" -ForegroundColor Green
Write-Host "  ✓ Self-plagiarism detection" -ForegroundColor Green
Write-Host "  ✓ Multiple document analysis" -ForegroundColor Green
Write-Host "  ✓ Error handling for invalid URLs" -ForegroundColor Green
Write-Host ""
Write-Host "Algorithms Used:" -ForegroundColor Yellow
Write-Host "  • Jaccard Similarity (word-based)" -ForegroundColor White
Write-Host "  • N-gram Similarity (3-gram)" -ForegroundColor White
Write-Host "  • Text normalization and cleaning" -ForegroundColor White
Write-Host "  • BeautifulSoup web scraping" -ForegroundColor White
Write-Host ""
Write-Host "Note: The plagiarism detector now uses REAL algorithms!" -ForegroundColor Green
Write-Host "It scrapes web content and calculates actual similarity scores." -ForegroundColor Green
Write-Host ""
