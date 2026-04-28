$ErrorActionPreference = 'Stop'

function Test-Command {
    param([string]$Name)
    return [bool](Get-Command $Name -ErrorAction SilentlyContinue)
}

function Resolve-PythonCommand {
    if (Test-Command 'py') {
        try {
            & py -3 --version | Out-Null
            if ($LASTEXITCODE -eq 0) {
                return @('py', '-3')
            }
        }
        catch {
            # Ignore and test python next.
        }
    }

    if (Test-Command 'python') {
        try {
            & python --version | Out-Null
            if ($LASTEXITCODE -eq 0) {
                return @('python')
            }
        }
        catch {
            # Ignore and return null.
        }
    }

    return $null
}

function Get-PythonPrefixArgs {
    param([string[]]$PythonCmd)
    if ($PythonCmd.Length -gt 1) {
        return $PythonCmd[1..($PythonCmd.Length - 1)]
    }
    return @()
}

Write-Host '=== Setup anti-plagiat (BeautifulSoup) ===' -ForegroundColor Cyan

$pythonCmd = @(Resolve-PythonCommand)
if (-not $pythonCmd) {
    Write-Host 'Python introuvable. Tentative installation via winget...' -ForegroundColor Yellow

    if (-not (Test-Command 'winget')) {
        throw 'winget introuvable. Installez Python manuellement puis relancez ce script.'
    }

    winget install --id Python.Python.3.12 -e --accept-source-agreements --accept-package-agreements --silent
    $pythonCmd = @(Resolve-PythonCommand)
}

if (-not $pythonCmd) {
    throw 'Python n est toujours pas detecte apres installation. Redemarrez le terminal puis relancez.'
}

$requirementsPath = Join-Path $PSScriptRoot 'requirements.txt'
if (-not (Test-Path $requirementsPath)) {
    throw "requirements.txt introuvable: $requirementsPath"
}

Write-Host 'Mise a jour de pip...' -ForegroundColor Cyan
$prefixArgs = Get-PythonPrefixArgs -PythonCmd $pythonCmd
& $pythonCmd[0] @($prefixArgs + @('-m', 'pip', 'install', '--upgrade', 'pip'))

Write-Host 'Installation des dependances BeautifulSoup/requests...' -ForegroundColor Cyan
& $pythonCmd[0] @($prefixArgs + @('-m', 'pip', 'install', '-r', $requirementsPath))

Write-Host 'Verification import bs4/requests...' -ForegroundColor Cyan
$checkCode = "import bs4, requests; print('OK')"
& $pythonCmd[0] @($prefixArgs + @('-c', $checkCode))

Write-Host ''
Write-Host 'Setup termine.' -ForegroundColor Green
Write-Host 'Vous pouvez maintenant lancer:' -ForegroundColor Green
Write-Host '  mvnw.cmd spring-boot:run' -ForegroundColor Green
