# Quick Start Guide - Fixed Commands

## Prerequisites Check

### 1. Check MySQL is Running
```powershell
# Test MySQL connection
mysql -u root -p
# Press Enter for empty password
# If it connects, MySQL is running. Type 'exit' to quit.
```

If MySQL is not running:
```powershell
net start MySQL80
```

### 2. Check Java is Installed
```powershell
java -version
# Should show Java 17 or higher
```

### 3. Check Node.js is Installed
```powershell
node -v
npm -v
```

### 4. Check Python is Installed
```powershell
python --version
# Should show Python 3.8 or higher
```

---

## Step-by-Step Startup (Use Maven Wrapper)

### Step 1: Start Eureka Server (Port 8761)

**Open PowerShell Window 1:**
```powershell
cd "c:\Users\fatma\OneDrive - ESPRIT\Bureau\pic\project-pi\eureka-server"

# Use Maven wrapper instead of mvn
.\mvnw.cmd spring-boot:run
```

**Wait for**: "Started EurekaServerApplication" in the logs

**Verify**: Open http://localhost:8761 in browser

---

### Step 2: Start API Gateway (Port 8091)

**Open PowerShell Window 2:**
```powershell
cd "c:\Users\fatma\OneDrive - ESPRIT\Bureau\pic\project-pi\api-gateway"

# Use Maven wrapper
.\mvnw.cmd spring-boot:run
```

**Wait for**: "Started ApiGatewayApplication" in the logs

**Verify**: Check Eureka dashboard shows "API-GATEWAY"

---

### Step 3: Start Gestionprojets Service (Port 8099)

**Open PowerShell Window 3:**
```powershell
cd "c:\Users\fatma\OneDrive - ESPRIT\Bureau\pic\project-pi\gestionprojets"

# Use Maven wrapper
.\mvnw.cmd spring-boot:run
```

**Wait for**: 
- "Started GestionProjetsApplication" 
- "HikariPool" with MySQL connection (NOT H2!)

**Verify**: 
- Check Eureka dashboard shows "GESTION-PROJETS-SERVICE"
- Check logs show: `jdbc:mysql://localhost:3306/gestion_projets_db`

---

### Step 4: Start ML Service (Port 5000)

**Open PowerShell Window 4:**
```powershell
cd "c:\Users\fatma\Downloads\gestionproj\project-pi\gestionprojets\ml-service"

# Activate virtual environment (if already created)
.\venv\Scripts\Activate.ps1

# If not created yet:
# python -m venv venv
# .\venv\Scripts\Activate.ps1

# Install dependencies (first time only)
pip install -r requirements.txt

# Start the service
python app.py
```

**Wait for**: 
- "Successfully registered ml-service with Eureka"
- "Running on http://0.0.0.0:5000"

**Verify**: 
- Check Eureka dashboard shows "ML-SERVICE"
- Test: `curl http://localhost:5000/health`

---

### Step 5: Start UserPI (Port 8090) - OPTIONAL

**⚠️ IMPORTANT**: UserPI has a database configuration issue. Skip this for now unless you need authentication.

If you need to start it, you'll need to fix its `application.properties` first (similar to what we did for gestionprojets).

---

### Step 6: Start Frontend (Port 4200)

**Open PowerShell Window 5:**
```powershell
cd "c:\Users\fatma\OneDrive - ESPRIT\Bureau\pic\project-pi\new-front"

# Install dependencies (first time only - this may take several minutes)
npm install

# Start the frontend
npm start
```

**Wait for**: "Compiled successfully" or "Application bundle generation complete"

**Verify**: Open http://localhost:4200 in browser

---

## Quick Verification Tests

### Test 1: Check All Services in Eureka
Open: http://localhost:8761

**Should see**:
- ✅ API-GATEWAY
- ✅ GESTION-PROJETS-SERVICE  
- ✅ ML-SERVICE

### Test 2: Test API Gateway Routes

**Open PowerShell:**
```powershell
# Test projects endpoint
curl http://localhost:8091/api/projects

# Should return: [] or project list (NOT 404)
```

### Test 3: Test ML Service

```powershell
# Test ML scoring
curl -X POST http://localhost:8091/api/ml/score -H "Content-Type: application/json" -d '{\"projectId\":\"test\",\"metrics\":{}}'

# Should return: JSON with score data
```

### Test 4: Check MySQL Database

```powershell
mysql -u root -p
# Press Enter for empty password
```

```sql
SHOW DATABASES;
-- Should see: gestion_projets_db

USE gestion_projets_db;
SHOW TABLES;
-- Should see: projects, tasks, team_members, documents, etc.

SELECT * FROM projects;
-- Check if any projects exist

exit
```

### Test 5: Frontend Network Requests

1. Open http://localhost:4200
2. Open Browser DevTools (F12)
3. Go to Network tab
4. Navigate to gestionprojets section
5. **Verify**: Requests go to `localhost:8091` (NOT 8090 or 8099)

---

## Common Issues & Solutions

### Issue: "mvn: command not found"
**Solution**: Use Maven wrapper instead:
```powershell
.\mvnw.cmd spring-boot:run
```

### Issue: Frontend "npm install" fails
**Solution**: 
```powershell
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# Reinstall
npm install
```

### Issue: Gestionprojets shows H2 database in logs
**Solution**: 
1. Verify `.env` file exists in gestionprojets directory
2. Check `application.properties` has MySQL configuration
3. Restart the service

### Issue: ML Service "py-eureka-client" error
**Solution**:
```powershell
# Make sure you're in the venv
.\venv\Scripts\Activate.ps1

# Reinstall dependencies
pip install --upgrade py-eureka-client
```

### Issue: MySQL connection refused
**Solution**:
```powershell
# Start MySQL
net start MySQL80

# Verify it's running
mysql -u root -p
```

### Issue: Port already in use
**Solution**:
```powershell
# Find process using the port (e.g., 8099)
netstat -ano | findstr :8099

# Kill the process (replace <PID> with the number from above)
taskkill /PID <PID> /F
```

---

## Minimal Startup (Just Gestionprojets + ML)

If you only want to test gestionprojets and ML service:

**Window 1 - Eureka:**
```powershell
cd "c:\Users\fatma\OneDrive - ESPRIT\Bureau\pic\project-pi\eureka-server"
.\mvnw.cmd spring-boot:run
```

**Window 2 - API Gateway:**
```powershell
cd "c:\Users\fatma\OneDrive - ESPRIT\Bureau\pic\project-pi\api-gateway"
.\mvnw.cmd spring-boot:run
```

**Window 3 - Gestionprojets:**
```powershell
cd "c:\Users\fatma\OneDrive - ESPRIT\Bureau\pic\project-pi\gestionprojets"
.\mvnw.cmd spring-boot:run
```

**Window 4 - ML Service:**
```powershell
cd "c:\Users\fatma\Downloads\gestionproj\project-pi\gestionprojets\ml-service"
.\venv\Scripts\Activate.ps1
python app.py
```

Then test:
```powershell
curl http://localhost:8091/api/projects
curl -X POST http://localhost:8091/api/ml/score -H "Content-Type: application/json" -d '{\"projectId\":\"test\",\"metrics\":{}}'
```

---

## Summary of What's Working

✅ **API Gateway** routes configured for gestionprojets and ML  
✅ **Gestionprojets** uses MySQL (real data persists)  
✅ **ML Service** registers with Eureka  
✅ **Frontend** calls through API Gateway (port 8091)  
✅ **Database** MySQL with gestion_projets_db  

---

## Next Steps

1. Start services in order (Eureka → Gateway → Gestionprojets → ML)
2. Verify each service in Eureka dashboard
3. Test API endpoints through gateway
4. Start frontend and verify data flow
5. Create test projects through UI
6. Verify data persists in MySQL

**Need help?** Check the logs in each PowerShell window for error messages.
