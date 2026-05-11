# Gestionprojets Troubleshooting Guide

## Issue: "None of the real functions work"

### Symptoms
- Service starts successfully
- Registers with Eureka
- But endpoints return errors or don't work

### Diagnosis Steps

#### Step 1: Check Service Health
```powershell
# Test basic health endpoint (after restarting service with new HealthController)
curl http://localhost:8099/api/health

# Should return:
# {"status":"UP","service":"gestion-projets-service","message":"Service is running"}
```

#### Step 2: Check Database Connection
```powershell
mysql -u root -p
# Press Enter for empty password
```

```sql
-- Check if database exists
SHOW DATABASES;
-- Should see: gestion_projets_db

-- Check if tables exist
USE gestion_projets_db;
SHOW TABLES;
-- Should see: projects, tasks, team_members, documents, generated_documents

-- Check table structure
DESCRIBE projects;

-- Check if there's any data
SELECT COUNT(*) FROM projects;
```

#### Step 3: Test Direct Service Endpoint
```powershell
# Test getting all projects (should return empty array [] if no data)
curl http://localhost:8099/api/projects

# If you get 500 error, check the gestionprojets console for stack trace
```

#### Step 4: Create Test Data
```sql
USE gestion_projets_db;

-- Insert a test project
INSERT INTO projects (
    title, 
    sector, 
    stage, 
    short_description, 
    problem_solved, 
    revenue_model, 
    team_size, 
    has_pitch_deck, 
    has_business_plan, 
    description, 
    status, 
    priority, 
    start_date, 
    end_date, 
    budget, 
    leader_id, 
    progress, 
    created_at, 
    updated_at, 
    created_by
) VALUES (
    'Test Project',
    'Technology',
    'Idea',
    'A test project for verification',
    'Testing the system',
    'Subscription',
    '1-5',
    false,
    false,
    'This is a test project to verify the system is working',
    'BROUILLON',
    'NORMALE',
    NOW(),
    DATE_ADD(NOW(), INTERVAL 6 MONTH),
    10000.00,
    1,
    0.0,
    NOW(),
    NOW(),
    1
);

-- Verify it was inserted
SELECT * FROM projects;
```

#### Step 5: Test Again
```powershell
# Should now return the test project
curl http://localhost:8099/api/projects
```

### Common Issues & Solutions

#### Issue 1: 500 Internal Server Error on /api/projects

**Possible Causes**:
1. Database connection issue
2. Missing required fields in entity
3. Serialization error

**Solution**:
1. Check gestionprojets console logs for full stack trace
2. Verify MySQL is running and accessible
3. Verify tables were created correctly
4. Add test data (see Step 4 above)

#### Issue 2: Empty Response []

**Cause**: Database is empty (no projects exist)

**Solution**: This is actually correct behavior! Add projects through the UI or insert test data.

#### Issue 3: JWT Authentication Required

**Cause**: API Gateway requires authentication

**Solution**: 
- For testing, call service directly: `http://localhost:8099/api/projects`
- For production, use proper JWT token from UserPI authentication

#### Issue 4: CORS Errors in Frontend

**Cause**: Cross-origin requests blocked

**Solution**: Controllers already have `@CrossOrigin(origins = "*")` - should work

### Restart Service with New Health Controller

After adding the HealthController:

```powershell
# Stop the current gestionprojets service (Ctrl+C in its window)

# Restart it
cd "c:\Users\fatma\OneDrive - ESPRIT\Bureau\pic\project-pi\gestionprojets"
.\mvnw.cmd spring-boot:run

# Wait for startup, then test
curl http://localhost:8099/api/health
curl http://localhost:8099/api/test
```

### Testing Through API Gateway (with JWT)

To test through the API Gateway, you need a JWT token:

1. **Login through UserPI** to get a token
2. **Use the token** in requests:

```powershell
# Example (replace YOUR_JWT_TOKEN with actual token)
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" http://localhost:8091/api/projects
```

### Frontend Testing

1. **Open Frontend**: http://localhost:4200
2. **Login** with your credentials
3. **Navigate to Gestionprojets section**
4. **Check Browser Console** (F12) for errors
5. **Check Network Tab** to see API calls and responses

### Expected Behavior

**When Working Correctly**:
- ✅ `GET /api/projects` returns `[]` (empty array) if no projects
- ✅ `GET /api/projects` returns array of projects if data exists
- ✅ `POST /api/projects` creates new project
- ✅ `GET /api/projects/{id}` returns specific project
- ✅ `PUT /api/projects/{id}` updates project
- ✅ `DELETE /api/projects/{id}` deletes project

**When Not Working**:
- ❌ 500 Internal Server Error - Check logs for stack trace
- ❌ 404 Not Found - Service not registered or route missing
- ❌ 401 Unauthorized - JWT token missing or invalid
- ❌ Connection refused - Service not running

### Debug Checklist

- [ ] MySQL is running
- [ ] Database `gestion_projets_db` exists
- [ ] Tables are created (projects, tasks, etc.)
- [ ] Gestionprojets service is running on port 8099
- [ ] Service registered with Eureka
- [ ] API Gateway is running on port 8091
- [ ] API Gateway routes configured for gestionprojets
- [ ] Frontend is calling correct URL (port 8091, not 8099)
- [ ] JWT authentication working (if using gateway)

### Get Full Error Details

If you're getting errors, check the gestionprojets console output for the full stack trace. Look for:

```
java.lang.Exception: ...
    at com.pi.gestionprojets...
```

This will tell us exactly what's failing.

### Quick Verification Script

```powershell
# Run this to verify everything
echo "=== Checking Services ==="

echo "`n1. MySQL:"
mysql -u root -p -e "SHOW DATABASES LIKE 'gestion_projets_db';"

echo "`n2. Gestionprojets Service:"
curl http://localhost:8099/api/health

echo "`n3. Eureka Registration:"
curl http://localhost:8761/eureka/apps/GESTION-PROJETS-SERVICE

echo "`n4. Projects Endpoint:"
curl http://localhost:8099/api/projects

echo "`n=== Done ==="
```

### Next Steps

1. **Restart gestionprojets service** to load the new HealthController
2. **Test health endpoint**: `curl http://localhost:8099/api/health`
3. **Check database** has tables and optionally add test data
4. **Test projects endpoint**: `curl http://localhost:8099/api/projects`
5. **Share any error messages** from the console for further debugging

The service is running and registered correctly - we just need to identify the specific error causing the 500 response.
