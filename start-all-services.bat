@echo off
echo ========================================
echo Starting All Microservices
echo ========================================
echo.

REM Check if MySQL is running
echo [0/6] Checking MySQL...
netstat -an | findstr ":3306" >nul
if errorlevel 1 (
    echo WARNING: MySQL does not appear to be running on port 3306
    echo Please start MySQL first: net start MySQL80
    echo.
    pause
    exit /b 1
)
echo MySQL is running on port 3306
echo.

REM Start Eureka Server
echo [1/6] Starting Eureka Server (port 8761)...
start "Eureka Server" cmd /k "cd /d "%~dp0eureka-server" && mvnw.cmd spring-boot:run"
echo Waiting 30 seconds for Eureka to start...
timeout /t 30 /nobreak
echo.

REM Start API Gateway
echo [2/6] Starting API Gateway (port 8091)...
start "API Gateway" cmd /k "cd /d "%~dp0api-gateway" && mvnw.cmd spring-boot:run"
echo Waiting 20 seconds for API Gateway to start...
timeout /t 20 /nobreak
echo.

REM Start Gestionprojets Service
echo [3/6] Starting Gestionprojets Service (port 8099)...
start "Gestionprojets" cmd /k "cd /d "%~dp0gestionprojets" && mvnw.cmd spring-boot:run"
echo Waiting 20 seconds for Gestionprojets to start...
timeout /t 20 /nobreak
echo.

REM Start ML Service
echo [4/6] Starting ML Service (port 5000)...
start "ML Service" cmd /k "cd /d "%~dp0gestionprojets\ml-service" && (if not exist venv python -m venv venv) && venv\Scripts\activate.bat && pip install -q -r requirements.txt && python app.py"
echo Waiting 10 seconds for ML Service to start...
timeout /t 10 /nobreak
echo.

REM Start UserPI Service (optional)
echo [5/6] Starting UserPI Service (port 8090)...
start "UserPI" cmd /k "cd /d "%~dp0userPI" && mvnw.cmd spring-boot:run"
echo Waiting 20 seconds for UserPI to start...
timeout /t 20 /nobreak
echo.

REM Start Frontend
echo [6/6] Starting Frontend (port 4200)...
start "Frontend" cmd /k "cd /d "%~dp0new-front" && npm start"
echo.

echo ========================================
echo All services are starting!
echo ========================================
echo.
echo Please verify the following:
echo.
echo 1. Eureka Dashboard: http://localhost:8761
echo    - Check that all services are registered
echo.
echo 2. API Gateway Health: http://localhost:8091/actuator/health
echo.
echo 3. ML Service Health: http://localhost:5000/health
echo.
echo 4. Frontend: http://localhost:4200
echo.
echo 5. Test API Gateway routes:
echo    curl http://localhost:8091/api/projects
echo.
echo Press any key to open Eureka Dashboard...
pause >nul
start http://localhost:8761
echo.
echo Press any key to exit (services will continue running)...
pause
