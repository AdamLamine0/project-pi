# Gestionprojets & ML Service Integration - Startup Guide

## Overview
This guide provides step-by-step instructions for starting all services in the correct order and verifying that the gestionprojets and ML service integration is working correctly.

## Prerequisites

### 1. MySQL Database
- **Required**: MySQL Server running on port 3306
- **Database**: `gestion_projets_db` (will be created automatically if it doesn't exist)
- **Credentials**: 
  - Username: `root`
  - Password: (empty)

**To start MySQL:**
```bash
# Windows (if MySQL is installed as a service)
net start MySQL80

# Or start MySQL manually
mysqld --console
```

**To verify MySQL is running:**
```bash
mysql -u root -p
# Press Enter when prompted for password (it's empty)
# If you can connect, MySQL is running correctly
```

### 2. Python Environment (for ML Service)
- **Required**: Python 3.8 or higher
- **Virtual Environment**: Recommended

**To set up ML service:**
```bash
cd c:\Users\fatma\OneDrive - ESPRIT\Bureau\pic\project-pi\gestionprojets\ml-service

# Create virtual environment (if not exists)
python -m venv venv

# Activate virtual environment
# Windows CMD:
venv\Scripts\activate.bat
# Windows PowerShell:
venv\Scripts\Activate.ps1
# Git Bash:
source venv/Scripts/activate

# Install dependencies
pip install -r requirements.txt
```

## Startup Sequence

### Step 1: Start Eureka Server (Service Discovery)
**Port**: 8761

```bash
cd c:\Users\fatma\OneDrive - ESPRIT\Bureau\pic\project-pi\eureka-server
mvn spring-boot:run
```

**Verification**:
- Open browser: http://localhost:8761
- You should see the Eureka Dashboard
- Wait until "Instances currently registered with Eureka" section appears (may take 30-60 seconds)

### Step 2: Start API Gateway
**Port**: 8091

```bash
cd c:\Users\fatma\OneDrive - ESPRIT\Bureau\pic\project-pi\api-gateway
mvn spring-boot:run
```

**Verification**:
- Check console logs for: "Started ApiGatewayApplication"
- Check Eureka dashboard: http://localhost:8761
- You should see "API-GATEWAY" registered

### Step 3: Start Gestionprojets Service
**Port**: 8099

```bash
cd c:\Users\fatma\OneDrive - ESPRIT\Bureau\pic\project-pi\gestionprojets
mvn spring-boot:run
```

**Verification**:
- Check console logs for:
  - "Started GestionProjetsApplication" or similar
  - "HikariPool" connection to MySQL (NOT H2!)
  - "Registering application GESTION-PROJETS-SERVICE with eureka"
- Check Eureka dashboard: http://localhost:8761
- You should see "GESTION-PROJETS-SERVICE" registered
- Check MySQL connection:
  ```sql
  mysql -u root -p
  USE gestion_projets_db;
  SHOW TABLES;
  ```
  You should see tables created by Hibernate (projects, tasks, team_members, documents, etc.)

### Step 4: Start ML Service
**Port**: 5000

```bash
cd c:\Users\fatma\OneDrive - ESPRIT\Bureau\pic\project-pi\gestionprojets\ml-service

# Activate virtual environment first (if not already activated)
venv\Scripts\activate.bat  # Windows CMD
# or
venv\Scripts\Activate.ps1  # Windows PowerShell
# or
source venv/Scripts/activate  # Git Bash

# Start the service
python app.py
```

**Verification**:
- Check console logs for:
  - "Successfully registered ml-service with Eureka"
  - "Running on http://0.0.0.0:5000"
- Check Eureka dashboard: http://localhost:8761
- You should see "ML-SERVICE" registered
- Test health endpoint:
  ```bash
  curl http://localhost:5000/health
  # Should return: {"status":"ok","service":"ml-service"}
  ```

### Step 5: Start Other Microservices (Optional)
If you need other services running:

**UserPI** (Port 8090):
```bash
cd c:\Users\fatma\OneDrive - ESPRIT\Bureau\pic\project-pi\userPI
mvn spring-boot:run
```

**Event-PI** (Port varies):
```bash
cd c:\Users\fatma\OneDrive - ESPRIT\Bureau\pic\project-pi\event-pi
mvn spring-boot:run
```

**Community Service** (Port varies):
```bash
cd c:\Users\fatma\OneDrive - ESPRIT\Bureau\pic\project-pi\community-service
mvn spring-boot:run
```

**Partenariat-PI** (Port varies):
```bash
cd c:\Users\fatma\OneDrive - ESPRIT\Bureau\pic\project-pi\partenariat-pi
mvn spring-boot:run
```

**Investment-PI** (Port varies):
```bash
cd c:\Users\fatma\OneDrive - ESPRIT\Bureau\pic\project-pi\investment-pi
mvn spring-boot:run
```

### Step 6: Start Frontend
**Port**: 4200

```bash
cd c:\Users\fatma\OneDrive - ESPRIT\Bureau\pic\project-pi\new-front
npm install  # Only needed first time or after package.json changes
npm start
```

**Verification**:
- Open browser: http://localhost:4200
- You should see the application UI
- Check browser console for any errors

## Verification Tests

### Test 1: API Gateway Routes for Gestionprojets

**Test Projects Endpoint:**
```bash
curl http://localhost:8091/api/projects
```
**Expected**: JSON array of projects (may be empty `[]` if no projects exist yet)
**NOT Expected**: 404 Not Found

**Test Tasks Endpoint:**
```bash
curl http://localhost:8091/api/tasks
```

**Test Team Members Endpoint:**
```bash
curl http://localhost:8091/api/team-members
```

**Test Documents Endpoint:**
```bash
curl http://localhost:8091/api/documents
```

### Test 2: ML Service Endpoints

**Test ML Scoring:**
```bash
curl -X POST http://localhost:8091/api/ml/score \
  -H "Content-Type: application/json" \
  -d '{"projectId":"test-123","metrics":{}}'
```
**Expected**: JSON response with score data

**Test ML Roadmap:**
```bash
curl -X POST http://localhost:8091/api/ml/roadmap \
  -H "Content-Type: application/json" \
  -d '{"projectId":"test-123","projectDetails":{}}'
```
**Expected**: JSON response with roadmap phases

**Test ML Plagiarism:**
```bash
curl -X POST http://localhost:8091/api/ml/plagiarism \
  -H "Content-Type: application/json" \
  -d '{"projectId":"test-123","text":"Sample text to check"}'
```
**Expected**: JSON response with plagiarism analysis

### Test 3: Database Connection

**Verify MySQL is being used (NOT H2):**
```bash
# Connect to MySQL
mysql -u root -p
# Press Enter for empty password

# Check database exists
SHOW DATABASES;
# Should see: gestion_projets_db

# Check tables
USE gestion_projets_db;
SHOW TABLES;
# Should see: projects, tasks, team_members, documents, etc.

# Check if data exists
SELECT * FROM projects;
```

### Test 4: Frontend Integration

1. **Open Frontend**: http://localhost:4200
2. **Navigate to Gestionprojets Section**:
   - Look for "Projects", "Playground", "Roadmap", or "Entrepreneur" menu items
3. **Check Network Tab**:
   - Open browser DevTools (F12)
   - Go to Network tab
   - Perform any action (view projects, create project, etc.)
   - Verify requests go to `http://localhost:8091/api/projects` (NOT `http://localhost:8090` or `http://localhost:8099`)
4. **Verify Real Data**:
   - If you create a project through the UI, verify it appears in MySQL:
     ```sql
     USE gestion_projets_db;
     SELECT * FROM projects;
     ```

### Test 5: Eureka Dashboard

**Open**: http://localhost:8761

**Verify all services are registered:**
- ✅ API-GATEWAY
- ✅ GESTION-PROJETS-SERVICE
- ✅ ML-SERVICE
- ✅ USER-PI (if started)
- ✅ EVENT-PI (if started)
- ✅ COMMUNITY-SERVICE (if started)
- ✅ PARTENARIAT-PI (if started)
- ✅ INVESTMENT-PI (if started)

## Troubleshooting

### Issue: Gestionprojets service shows H2 database in logs

**Symptom**: Logs show `jdbc:h2:mem:gestion_projets_db`

**Solution**:
1. Stop the gestionprojets service
2. Verify `application.properties` has MySQL configuration:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/gestion_projets_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
   spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
   spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
   ```
3. Verify `.env` file exists in gestionprojets directory with DB credentials
4. Restart the service

### Issue: API Gateway returns 404 for /api/projects

**Symptom**: `curl http://localhost:8091/api/projects` returns 404

**Solution**:
1. Check Eureka dashboard - is GESTION-PROJETS-SERVICE registered?
2. Check API Gateway logs for route registration
3. Verify `GatewayRoutes.java` has the route beans for projects, tasks, team-members, documents
4. Restart API Gateway

### Issue: ML Service not registering with Eureka

**Symptom**: ML-SERVICE not visible in Eureka dashboard

**Solution**:
1. Check ML service logs for errors
2. Verify `.env` file has correct EUREKA_SERVER URL
3. Verify py_eureka_client is installed: `pip list | grep py-eureka-client`
4. Check Eureka server is running and accessible
5. Restart ML service

### Issue: Frontend still calling localhost:8090

**Symptom**: Browser network tab shows requests to port 8090 instead of 8091

**Solution**:
1. Verify `gestion-projets.service.ts` has:
   ```typescript
   private apiUrl = 'http://localhost:8091/api/projects';
   private docsUrl = 'http://localhost:8091/api/documents';
   ```
2. Clear browser cache (Ctrl+Shift+Delete)
3. Restart frontend: `npm start`
4. Hard refresh browser (Ctrl+F5)

### Issue: MySQL connection refused

**Symptom**: Gestionprojets logs show "Connection refused" or "Unknown database"

**Solution**:
1. Verify MySQL is running: `mysql -u root -p`
2. Check MySQL port: `SHOW VARIABLES LIKE 'port';` (should be 3306)
3. Verify credentials in `.env` file match MySQL configuration
4. Create database manually if needed:
   ```sql
   CREATE DATABASE IF NOT EXISTS gestion_projets_db;
   ```

### Issue: Port already in use

**Symptom**: "Port 8099 is already in use" or similar

**Solution**:
1. Find process using the port:
   ```bash
   # Windows
   netstat -ano | findstr :8099
   # Note the PID (last column)
   taskkill /PID <PID> /F
   ```
2. Or change the port in `application.properties`:
   ```properties
   server.port=8100
   ```

## Quick Start Script (Windows)

Save this as `start-all-services.bat`:

```batch
@echo off
echo Starting all services...

echo.
echo [1/6] Starting Eureka Server...
start "Eureka Server" cmd /k "cd c:\Users\fatma\OneDrive - ESPRIT\Bureau\pic\project-pi\eureka-server && mvn spring-boot:run"
timeout /t 30

echo.
echo [2/6] Starting API Gateway...
start "API Gateway" cmd /k "cd c:\Users\fatma\OneDrive - ESPRIT\Bureau\pic\project-pi\api-gateway && mvn spring-boot:run"
timeout /t 20

echo.
echo [3/6] Starting Gestionprojets Service...
start "Gestionprojets" cmd /k "cd c:\Users\fatma\OneDrive - ESPRIT\Bureau\pic\project-pi\gestionprojets && mvn spring-boot:run"
timeout /t 20

echo.
echo [4/6] Starting ML Service...
start "ML Service" cmd /k "cd c:\Users\fatma\OneDrive - ESPRIT\Bureau\pic\project-pi\gestionprojets\ml-service && venv\Scripts\activate.bat && python app.py"
timeout /t 10

echo.
echo [5/6] Starting UserPI Service...
start "UserPI" cmd /k "cd c:\Users\fatma\OneDrive - ESPRIT\Bureau\pic\project-pi\userPI && mvn spring-boot:run"
timeout /t 20

echo.
echo [6/6] Starting Frontend...
start "Frontend" cmd /k "cd c:\Users\fatma\OneDrive - ESPRIT\Bureau\pic\project-pi\new-front && npm start"

echo.
echo All services started!
echo.
echo Open these URLs to verify:
echo - Eureka Dashboard: http://localhost:8761
echo - Frontend: http://localhost:4200
echo - API Gateway Health: http://localhost:8091/actuator/health
echo.
pause
```

## Summary of Changes Made

### 1. API Gateway (`GatewayRoutes.java`)
✅ Added 5 new route beans:
- `/api/projects/**` → gestion-projets-service
- `/api/tasks/**` → gestion-projets-service
- `/api/team-members/**` → gestion-projets-service
- `/api/documents/**` → gestion-projets-service
- `/api/ml/**` → ml-service

### 2. Gestionprojets Service (`application.properties`)
✅ Switched from H2 to MySQL:
- Database URL: `jdbc:mysql://localhost:3306/gestion_projets_db`
- Driver: `com.mysql.cj.jdbc.Driver`
- Dialect: `org.hibernate.dialect.MySQLDialect`
- Credentials loaded from `.env` file

### 3. Environment File
✅ Created `.env` file in gestionprojets directory with:
- DB_USERNAME=root
- DB_PASSWORD=(empty)
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- MAIL_USERNAME
- MAIL_PASSWORD

### 4. ML Service
✅ Created new ML service with:
- Flask application (`app.py`)
- Eureka registration via py_eureka_client
- Endpoints: `/api/ml/score`, `/api/ml/roadmap`, `/api/ml/plagiarism`
- Dependencies in `requirements.txt`
- Configuration in `.env`

### 5. Frontend (`gestion-projets.service.ts`)
✅ Updated API URLs:
- Changed from `http://localhost:8090` to `http://localhost:8091`
- All requests now go through API Gateway

## Next Steps

1. **Start all services** in the order specified above
2. **Verify each service** registers with Eureka
3. **Test API endpoints** through the gateway
4. **Access the frontend** and verify real data is displayed
5. **Create a test project** through the UI and verify it persists to MySQL
6. **Test ML features** (scoring, roadmap generation) through the UI

## Support

If you encounter any issues not covered in this guide:
1. Check service logs for error messages
2. Verify all prerequisites are met
3. Ensure ports are not blocked by firewall
4. Check Eureka dashboard for service registration status
