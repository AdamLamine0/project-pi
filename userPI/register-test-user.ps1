# PowerShell script to register a test user via the API

$body = @{
    name = "Test"
    prenom = "User"
    email = "test@example.com"
    password = "test123"
    role = "USER"
} | ConvertTo-Json

Write-Host "Registering test user..." -ForegroundColor Yellow
Write-Host "Email: test@example.com" -ForegroundColor Cyan
Write-Host "Password: test123" -ForegroundColor Cyan

try {
    $response = Invoke-WebRequest -Uri 'http://localhost:8081/api/auth/register' -Method POST -Body $body -ContentType 'application/json'
    Write-Host "`nSuccess! User registered." -ForegroundColor Green
    Write-Host "Response:" -ForegroundColor Green
    $response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 10
} catch {
    Write-Host "`nError registering user:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $reader.BaseStream.Position = 0
        $reader.DiscardBufferedData()
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response body: $responseBody" -ForegroundColor Red
    }
}
