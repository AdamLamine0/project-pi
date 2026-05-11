# Test login on both userPI and API Gateway

$body = @{
    email = "test@example.com"
    password = "test123"
} | ConvertTo-Json

Write-Host "=== Testing Direct Login (userPI:8081) ===" -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri 'http://localhost:8081/api/auth/login' -Method POST -Body $body -ContentType 'application/json' -UseBasicParsing
    Write-Host "SUCCESS!" -ForegroundColor Green
    Write-Host $response.Content
} catch {
    Write-Host "FAILED!" -ForegroundColor Red
    Write-Host "Status: $($_.Exception.Response.StatusCode.value__)"
    Write-Host "Message: $($_.Exception.Message)"
}

Write-Host "`n=== Testing via API Gateway (8091) ===" -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri 'http://localhost:8091/api/auth/login' -Method POST -Body $body -ContentType 'application/json' -UseBasicParsing
    Write-Host "SUCCESS!" -ForegroundColor Green
    Write-Host $response.Content
} catch {
    Write-Host "FAILED!" -ForegroundColor Red
    Write-Host "Status: $($_.Exception.Response.StatusCode.value__)"
    Write-Host "Message: $($_.Exception.Message)"
}
