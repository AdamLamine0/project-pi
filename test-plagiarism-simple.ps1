# Simple Plagiarism Test
$API_BASE = "http://localhost:8091"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Simple Plagiarism Detection Test" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Test 1: Check ML Service Health
Write-Host "Test 1: Checking ML Service..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "http://localhost:5000/health" -Method Get
    Write-Host "ML Service Status: $($health.status)" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "ML Service is not running!" -ForegroundColor Red
    exit 1
}

# Test 2: Direct ML Service Plagiarism Check
Write-Host "Test 2: Testing Direct ML Service Endpoint..." -ForegroundColor Yellow

$body = @{
    projectId = 1
    text = "This is a test document for plagiarism detection."
} | ConvertTo-Json

try {
    $result = Invoke-RestMethod -Uri "http://localhost:5000/api/ml/plagiarism" `
        -Method Post `
        -ContentType "application/json" `
        -Body $body
    
    Write-Host "Plagiarism Score: $($result.plagiarismScore)%" -ForegroundColor Green
    Write-Host "Is Plagiarized: $($result.isPlagiarized)" -ForegroundColor Green
    Write-Host "Message: $($result.message)" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 3: Test via API Gateway (requires authentication)
Write-Host "Test 3: Testing via API Gateway..." -ForegroundColor Yellow
Write-Host "Note: This requires authentication" -ForegroundColor Yellow

# Login first
$loginBody = @{
    email = "test@example.com"
    password = "test123"
} | ConvertTo-Json

try {
    $loginResult = Invoke-RestMethod -Uri "$API_BASE/api/auth/login" `
        -Method Post `
        -ContentType "application/json" `
        -Body $loginBody
    
    $token = $loginResult.token
    Write-Host "Logged in successfully!" -ForegroundColor Green
    
    # Now test plagiarism via API Gateway
    $headers = @{
        "Authorization" = "Bearer $token"
    }
    
    $plagiarismBody = @{
        documentTexts = @("Test document 1", "Test document 2")
        webSources = @()
    } | ConvertTo-Json
    
    $plagiarismResult = Invoke-RestMethod -Uri "$API_BASE/api/ml/projects/1/plagiarism" `
        -Method Post `
        -Headers $headers `
        -ContentType "application/json" `
        -Body $plagiarismBody
    
    Write-Host "Plagiarism Score: $($plagiarismResult.plagiarismScore)%" -ForegroundColor Green
    Write-Host "Documents Checked: $($plagiarismResult.checkedDocuments)" -ForegroundColor Green
    Write-Host "Original Content: $($plagiarismResult.details.originalContent)%" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Test Complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
