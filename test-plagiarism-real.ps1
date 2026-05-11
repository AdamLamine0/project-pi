# Simple Real Plagiarism Test
Write-Host "Testing Real Plagiarism Detection with Web Scraping" -ForegroundColor Cyan
Write-Host ""

# Test 1: Original content
Write-Host "Test 1: Original Content" -ForegroundColor Yellow
$body1 = '{"projectId":1,"text":"This is completely original content about sustainable agriculture.","webSources":[]}'
$result1 = Invoke-RestMethod -Uri "http://localhost:5000/api/ml/plagiarism" -Method Post -ContentType "application/json" -Body $body1
Write-Host "Plagiarism Score: $($result1.plagiarismScore)%" -ForegroundColor Green
Write-Host "Is Plagiarized: $($result1.isPlagiarized)" -ForegroundColor Green
Write-Host ""

# Test 2: Check against Wikipedia
Write-Host "Test 2: Checking Against Wikipedia" -ForegroundColor Yellow
$body2 = '{"projectId":2,"text":"Artificial intelligence is intelligence demonstrated by machines, in contrast to the natural intelligence displayed by humans.","webSources":["https://en.wikipedia.org/wiki/Artificial_intelligence"]}'
$result2 = Invoke-RestMethod -Uri "http://localhost:5000/api/ml/plagiarism" -Method Post -ContentType "application/json" -Body $body2
Write-Host "Plagiarism Score: $($result2.plagiarismScore)%" -ForegroundColor $(if ($result2.plagiarismScore -gt 50) { "Red" } else { "Yellow" })
Write-Host "Is Plagiarized: $($result2.isPlagiarized)" -ForegroundColor $(if ($result2.isPlagiarized) { "Red" } else { "Green" })
Write-Host "Matched Sources: $($result2.details.matchedSources)" -ForegroundColor White
if ($result2.sources) {
    foreach ($source in $result2.sources) {
        Write-Host "  - $($source.url): $($source.similarity)%" -ForegroundColor Yellow
    }
}
Write-Host ""

# Test 3: Multiple documents
Write-Host "Test 3: Multiple Documents" -ForegroundColor Yellow
$body3 = '{"documentTexts":["FinTech solutions are revolutionizing financial services.","Financial technology is transforming traditional banking."],"webSources":[]}'
$result3 = Invoke-RestMethod -Uri "http://localhost:5000/api/ml/projects/3/plagiarism" -Method Post -ContentType "application/json" -Body $body3
Write-Host "Plagiarism Score: $($result3.plagiarismScore)%" -ForegroundColor Yellow
Write-Host "Documents Checked: $($result3.checkedDocuments)" -ForegroundColor White
Write-Host "Self-Plagiarism: $($result3.details.selfPlagiarismChecked)" -ForegroundColor White
Write-Host ""

Write-Host "All tests completed!" -ForegroundColor Green
