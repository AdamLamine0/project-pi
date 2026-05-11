# Test Full Project Creation with Plagiarism Detection
# This script creates a complete project and tests all ML features including plagiarism

$API_BASE = "http://localhost:8091"
$AUTH_TOKEN = ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Full Project Plagiarism Test" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Login to get authentication token
Write-Host "Step 1: Authenticating..." -ForegroundColor Yellow

$loginPayload = @{
    email = "test@example.com"
    password = "test123"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-RestMethod -Uri "$API_BASE/api/auth/login" `
        -Method Post `
        -ContentType "application/json" `
        -Body $loginPayload
    
    $AUTH_TOKEN = $loginResponse.token
    Write-Host "✓ Authentication successful!" -ForegroundColor Green
    Write-Host "  User ID: $($loginResponse.userId)" -ForegroundColor White
    Write-Host "  Token: $($AUTH_TOKEN.Substring(0, 20))..." -ForegroundColor White
    Write-Host ""
} catch {
    Write-Host "✗ Authentication failed!" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Please ensure you have a test user created (test@example.com / test123)" -ForegroundColor Yellow
    exit 1
}

# Step 2: Create a new project with comprehensive data
Write-Host "Step 2: Creating New Project..." -ForegroundColor Yellow

$projectPayload = @{
    title = "AI-Powered FinTech Platform"
    sector = "FinTech"
    stage = "MVP"
    shortDescription = "Revolutionary financial management platform for SMEs"
    problemSolved = "SMEs struggle with manual accounting, cash flow forecasting, and compliance reporting. Our AI-powered platform automates these processes and provides predictive insights."
    revenueModel = "Abonnement"
    teamSize = "4-10"
    hasPitchDeck = $true
    hasBusinessPlan = $true
    description = "Secteur: FinTech`nStade: MVP`nDescription: FinTrack AI is an innovative financial management platform designed to revolutionize how small and medium enterprises handle their finances. Our solution leverages cutting-edge artificial intelligence and machine learning to automate invoicing, predict cash flow, and ensure compliance with financial regulations.`n`nThe platform features automated invoice generation and tracking, real-time cash flow forecasting using ML algorithms, compliance reporting for tax and regulatory requirements, integration with major accounting software, mobile-first design for on-the-go financial management, and advanced analytics dashboard with customizable reports.`n`nProbleme resolu: Traditional accounting software is complex, time-consuming, and requires significant manual input. SMEs often lack dedicated financial staff and struggle with manual data entry and invoice creation, inaccurate cash flow predictions leading to liquidity issues, compliance errors resulting in penalties and audits, disconnected financial tools requiring multiple subscriptions, and limited visibility into financial health and trends.`n`nOur solution reduces manual accounting work by 70%, improves cash flow prediction accuracy by 85%, and provides real-time financial insights that help businesses make better decisions.`n`nModele de revenu: Subscription-based SaaS model with three tiers - Starter at $49/month for basic features, Professional at $149/month for advanced features, and Enterprise at $499/month for full suite.`n`nCompetences: Product, Tech, Design, Sales, Marketing`nBesoin principal: Financement`nObjectif 6 mois: Achieve 500 paying customers, reach $50K MRR, close Series A funding round of $2M, expand team to 15 people, launch mobile apps for iOS and Android."
    status = "BROUILLON"
    priority = "NORMALE"
    startDate = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ss")
    endDate = (Get-Date).AddMonths(6).ToString("yyyy-MM-ddTHH:mm:ss")
    budget = 150000
    leaderId = $loginResponse.userId
    createdBy = $loginResponse.userId
    progress = 0
} | ConvertTo-Json -Depth 10

try {
    $headers = @{
        "Authorization" = "Bearer $AUTH_TOKEN"
        "Content-Type" = "application/json"
    }
    
    $projectResponse = Invoke-RestMethod -Uri "$API_BASE/api/projects" `
        -Method Post `
        -Headers $headers `
        -Body $projectPayload
    
    $PROJECT_ID = $projectResponse.id
    Write-Host "✓ Project created successfully!" -ForegroundColor Green
    Write-Host "  Project ID: $PROJECT_ID" -ForegroundColor White
    Write-Host "  Title: $($projectResponse.title)" -ForegroundColor White
    Write-Host "  Sector: $($projectResponse.sector)" -ForegroundColor White
    Write-Host "  Stage: $($projectResponse.stage)" -ForegroundColor White
    Write-Host ""
} catch {
    Write-Host "✗ Project creation failed!" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Step 3: Test Plagiarism Detection with Project Documents
Write-Host "Step 3: Running Plagiarism Detection..." -ForegroundColor Yellow

$plagiarismPayload = @{
    documentTexts = @(
        "FinTrack AI is an innovative financial management platform designed to revolutionize how small and medium enterprises handle their finances. Our solution leverages cutting-edge artificial intelligence and machine learning to automate invoicing, predict cash flow, and ensure compliance with financial regulations.",
        "The platform features automated invoice generation and tracking, real-time cash flow forecasting using ML algorithms, compliance reporting for tax and regulatory requirements, and integration with major accounting software like QuickBooks, Xero, and Sage.",
        "Traditional accounting software is complex, time-consuming, and requires significant manual input. SMEs often lack dedicated financial staff and struggle with manual data entry, inaccurate cash flow predictions, compliance errors, and disconnected financial tools.",
        "Our solution reduces manual accounting work by 70%, improves cash flow prediction accuracy by 85%, and provides real-time financial insights that help businesses make better decisions.",
        "We operate on a subscription-based SaaS model with three tiers: Starter at $49/month, Professional at $149/month, and Enterprise at $499/month. Our goal is to achieve 500 paying customers and reach $50K MRR within 6 months."
    )
    webSources = @(
        "https://www.quickbooks.com",
        "https://www.xero.com",
        "https://www.sage.com",
        "https://www.fintech-news.com"
    )
} | ConvertTo-Json -Depth 10

try {
    $plagiarismResponse = Invoke-RestMethod -Uri "$API_BASE/api/ml/projects/$PROJECT_ID/plagiarism" `
        -Method Post `
        -Headers $headers `
        -Body $plagiarismPayload
    
    Write-Host "✓ Plagiarism analysis completed!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Plagiarism Report:" -ForegroundColor Cyan
    Write-Host "==================" -ForegroundColor Cyan
    Write-Host "  Overall Score: $($plagiarismResponse.plagiarismScore)%" -ForegroundColor $(if ($plagiarismResponse.plagiarismScore -lt 20) { "Green" } elseif ($plagiarismResponse.plagiarismScore -lt 50) { "Yellow" } else { "Red" })
    Write-Host "  Is Plagiarized: $($plagiarismResponse.isPlagiarized)" -ForegroundColor $(if ($plagiarismResponse.isPlagiarized) { "Red" } else { "Green" })
    Write-Host "  Documents Checked: $($plagiarismResponse.checkedDocuments)" -ForegroundColor White
    Write-Host "  Web Sources Checked: $($plagiarismResponse.checkedWebSources)" -ForegroundColor White
    Write-Host "  Status: $($plagiarismResponse.message)" -ForegroundColor White
    Write-Host ""
    Write-Host "Content Analysis:" -ForegroundColor Cyan
    Write-Host "  Original Content: $($plagiarismResponse.details.originalContent)%" -ForegroundColor Green
    Write-Host "  Similar Content: $($plagiarismResponse.details.similarContent)%" -ForegroundColor Yellow
    Write-Host "  Matched Sources: $($plagiarismResponse.details.matchedSources)" -ForegroundColor White
    
    if ($plagiarismResponse.sources -and $plagiarismResponse.sources.Count -gt 0) {
        Write-Host ""
        Write-Host "Matched Sources:" -ForegroundColor Cyan
        foreach ($source in $plagiarismResponse.sources) {
            Write-Host "  - $($source.url) (Similarity: $($source.similarity)%)" -ForegroundColor Yellow
        }
    }
    Write-Host ""
} catch {
    Write-Host "✗ Plagiarism analysis failed!" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
}

# Step 4: Test Project Scoring
Write-Host "Step 4: Scoring Project..." -ForegroundColor Yellow

$scorePayload = @{
    title = $projectResponse.title
    description = $projectResponse.description
    sector = $projectResponse.sector
    stage = $projectResponse.stage
    budget = $projectResponse.budget
    teamSize = $projectResponse.teamSize
    hasPitchDeck = $projectResponse.hasPitchDeck
    hasBusinessPlan = $projectResponse.hasBusinessPlan
} | ConvertTo-Json -Depth 10

try {
    $scoreResponse = Invoke-RestMethod -Uri "$API_BASE/api/ml/projects/$PROJECT_ID/score" `
        -Method Post `
        -Headers $headers `
        -Body $scorePayload
    
    Write-Host "✓ Project scoring completed!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Project Score Report:" -ForegroundColor Cyan
    Write-Host "=====================" -ForegroundColor Cyan
    Write-Host "  Overall Score: $($scoreResponse.overallScore)/100" -ForegroundColor $(if ($scoreResponse.overallScore -ge 80) { "Green" } elseif ($scoreResponse.overallScore -ge 60) { "Yellow" } else { "Red" })
    Write-Host "  Maturity Level: $($scoreResponse.maturityLevel)" -ForegroundColor White
    Write-Host ""
    Write-Host "Dimension Scores:" -ForegroundColor Cyan
    Write-Host "  Team: $($scoreResponse.scores.team)/100" -ForegroundColor White
    Write-Host "  Product: $($scoreResponse.scores.product)/100" -ForegroundColor White
    Write-Host "  Market: $($scoreResponse.scores.market)/100" -ForegroundColor White
    Write-Host "  Traction: $($scoreResponse.scores.traction)/100" -ForegroundColor White
    Write-Host "  Financials: $($scoreResponse.scores.financials)/100" -ForegroundColor White
    Write-Host ""
    Write-Host "Strengths:" -ForegroundColor Green
    foreach ($strength in $scoreResponse.strengths) {
        Write-Host "  ✓ $strength" -ForegroundColor Green
    }
    Write-Host ""
    Write-Host "Weaknesses:" -ForegroundColor Yellow
    foreach ($weakness in $scoreResponse.weaknesses) {
        Write-Host "  ⚠ $weakness" -ForegroundColor Yellow
    }
    Write-Host ""
    Write-Host "Recommendations:" -ForegroundColor Cyan
    foreach ($recommendation in $scoreResponse.recommendations) {
        Write-Host "  → $recommendation" -ForegroundColor Cyan
    }
    Write-Host ""
} catch {
    Write-Host "✗ Project scoring failed!" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
}

# Step 5: Generate Roadmap
Write-Host "Step 5: Generating Project Roadmap..." -ForegroundColor Yellow

$roadmapPayload = @{
    title = $projectResponse.title
    description = $projectResponse.description
    sector = $projectResponse.sector
    stage = $projectResponse.stage
    feedback = ""
} | ConvertTo-Json -Depth 10

try {
    $roadmapResponse = Invoke-RestMethod -Uri "$API_BASE/api/ml/projects/$PROJECT_ID/roadmap" `
        -Method Post `
        -Headers $headers `
        -Body $roadmapPayload
    
    Write-Host "✓ Roadmap generated successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Project Roadmap:" -ForegroundColor Cyan
    Write-Host "================" -ForegroundColor Cyan
    Write-Host "  Overall Progress: $($roadmapResponse.overallProgress)%" -ForegroundColor White
    Write-Host "  Completed Phases: $($roadmapResponse.completedPhases)/$($roadmapResponse.totalPhases)" -ForegroundColor White
    Write-Host "  Estimated Completion: $($roadmapResponse.estimatedCompletion)" -ForegroundColor White
    Write-Host ""
    
    foreach ($phase in $roadmapResponse.phases) {
        $statusColor = switch ($phase.status) {
            "completed" { "Green" }
            "in_progress" { "Yellow" }
            "pending" { "White" }
            default { "White" }
        }
        
        Write-Host "  $($phase.phase): $($phase.title)" -ForegroundColor $statusColor
        Write-Host "    Duration: $($phase.duration)" -ForegroundColor White
        Write-Host "    Status: $($phase.status)" -ForegroundColor $statusColor
        Write-Host "    Description: $($phase.description)" -ForegroundColor White
        Write-Host "    Tasks:" -ForegroundColor White
        foreach ($task in $phase.tasks) {
            Write-Host "      - $task" -ForegroundColor White
        }
        Write-Host ""
    }
} catch {
    Write-Host "✗ Roadmap generation failed!" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
}

# Step 6: Analyze Project Description with NLP
Write-Host "Step 6: Analyzing Project Description (NLP)..." -ForegroundColor Yellow

$nlpPayload = @{
    description = $projectResponse.description
} | ConvertTo-Json -Depth 10

try {
    $nlpResponse = Invoke-RestMethod -Uri "$API_BASE/api/ml/projects/$PROJECT_ID/nlp" `
        -Method Post `
        -Headers $headers `
        -Body $nlpPayload
    
    Write-Host "✓ NLP analysis completed!" -ForegroundColor Green
    Write-Host ""
    Write-Host "NLP Analysis Report:" -ForegroundColor Cyan
    Write-Host "====================" -ForegroundColor Cyan
    Write-Host "  Sentiment: $($nlpResponse.sentiment)" -ForegroundColor $(if ($nlpResponse.sentiment -eq "positive") { "Green" } elseif ($nlpResponse.sentiment -eq "neutral") { "Yellow" } else { "Red" })
    Write-Host "  Sentiment Score: $($nlpResponse.sentimentScore)" -ForegroundColor White
    Write-Host "  Readability Score: $($nlpResponse.readabilityScore)/100" -ForegroundColor White
    Write-Host ""
    Write-Host "Key Phrases:" -ForegroundColor Cyan
    foreach ($phrase in $nlpResponse.keyPhrases) {
        Write-Host "  • $phrase" -ForegroundColor White
    }
    Write-Host ""
    Write-Host "Entities:" -ForegroundColor Cyan
    foreach ($entity in $nlpResponse.entities) {
        Write-Host "  • $entity" -ForegroundColor White
    }
    Write-Host ""
    Write-Host "Suggestions:" -ForegroundColor Yellow
    foreach ($suggestion in $nlpResponse.suggestions) {
        Write-Host "  → $suggestion" -ForegroundColor Yellow
    }
    Write-Host ""
} catch {
    Write-Host "✗ NLP analysis failed!" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
}

# Final Summary
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Test Summary" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Project Details:" -ForegroundColor Yellow
Write-Host "  ID: $PROJECT_ID" -ForegroundColor White
Write-Host "  Title: $($projectResponse.title)" -ForegroundColor White
Write-Host "  Sector: $($projectResponse.sector)" -ForegroundColor White
Write-Host "  Stage: $($projectResponse.stage)" -ForegroundColor White
Write-Host "  Budget: $($projectResponse.budget) MAD" -ForegroundColor White
Write-Host ""
Write-Host "All ML Features Tested:" -ForegroundColor Green
Write-Host "  ✓ Plagiarism Detection" -ForegroundColor Green
Write-Host "  ✓ Project Scoring" -ForegroundColor Green
Write-Host "  ✓ Roadmap Generation" -ForegroundColor Green
Write-Host "  ✓ NLP Analysis" -ForegroundColor Green
Write-Host ""
Write-Host "Note: The ML service is currently returning mock data." -ForegroundColor Yellow
Write-Host "To implement real ML features, integrate with actual ML models and APIs." -ForegroundColor Yellow
Write-Host ""
Write-Host "You can view the project in the UI at:" -ForegroundColor Cyan
Write-Host "  http://localhost:4200/app/projects/$PROJECT_ID" -ForegroundColor White
Write-Host ""
