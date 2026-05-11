# Fix Gestionprojets - Step by Step

## Problem
The database schema doesn't match the Java entity, causing errors.

## Solution - Follow These Steps Exactly

### Step 1: Fix Database Schema in phpMyAdmin

1. **Open phpMyAdmin** in your browser: http://localhost/phpmyadmin

2. **Click on `gestion_projets_db`** database in the left sidebar

3. **Click on "SQL" tab** at the top

4. **Copy and paste this entire SQL script**:

```sql
USE gestion_projets_db;

-- Drop and recreate projects table with correct schema
DROP TABLE IF EXISTS generated_documents;
DROP TABLE IF EXISTS team_members;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS projects;

CREATE TABLE projects (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    sector VARCHAR(255),
    stage VARCHAR(255),
    short_description TEXT,
    problem_solved TEXT,
    revenue_model VARCHAR(255),
    team_size VARCHAR(50),
    has_pitch_deck BOOLEAN,
    has_business_plan BOOLEAN,
    description TEXT,
    status VARCHAR(50) NOT NULL,
    priority VARCHAR(50) NOT NULL,
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    budget DOUBLE,
    leader_id BIGINT NOT NULL,
    progress DOUBLE DEFAULT 0.0,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    created_by BIGINT NOT NULL
);

CREATE TABLE tasks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    project_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL,
    priority VARCHAR(50) NOT NULL,
    assigned_to BIGINT,
    due_date DATETIME,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE team_members (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    project_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    role VARCHAR(100),
    joined_at DATETIME NOT NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE generated_documents (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    project_id BIGINT NOT NULL,
    document_type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    generated_at DATETIME NOT NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Insert test project
INSERT INTO projects (
    title, sector, stage, short_description, problem_solved, 
    revenue_model, team_size, has_pitch_deck, has_business_plan, 
    description, status, priority, start_date, end_date, budget, 
    leader_id, progress, created_at, updated_at, created_by
) VALUES (
    'Test Project',
    'Technology',
    'Idea',
    'A test project for verification',
    'Testing the system',
    'Subscription',
    '1-5',
    0,
    0,
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

-- Verify
SELECT * FROM projects;
```

5. **Click "Go" button** at the bottom

6. **You should see**: "1 row inserted" message

---

### Step 2: Restart Gestionprojets Service

1. **Go to the PowerShell window** where gestionprojets is running

2. **Press Ctrl+C** to stop it

3. **Restart it**:
```powershell
cd "c:\Users\fatma\OneDrive - ESPRIT\Bureau\pic\project-pi\gestionprojets"
.\mvnw.cmd spring-boot:run
```

4. **Wait for**: "Started GestionProjetsApplication"

---

### Step 3: Test the Service

**Open a new PowerShell window** and run:

```powershell
# Test getting projects (should return the test project)
curl http://localhost:8099/api/projects
```

**Expected Result**:
```json
[
  {
    "id": 1,
    "title": "Test Project",
    "sector": "Technology",
    "stage": "Idea",
    "status": "BROUILLON",
    ...
  }
]
```

---

### Step 4: Test Through API Gateway

```powershell
# This will require JWT authentication
curl http://localhost:8091/api/projects
```

**Expected**: "Missing or invalid Authorization header" (this is correct - it means the route is working)

---

### Step 5: Test in Frontend

1. **Open**: http://localhost:4200

2. **Login** with your credentials

3. **Navigate to Gestionprojets section**

4. **You should see**: The test project displayed

5. **Try creating a new project** through the UI

---

## Verification Checklist

After completing all steps:

- [ ] Database schema recreated successfully
- [ ] Test project inserted
- [ ] Gestionprojets service restarted
- [ ] `curl http://localhost:8099/api/projects` returns test project
- [ ] Frontend shows gestionprojets data
- [ ] Can create new projects through UI

---

## If Still Not Working

### Check Service Logs

Look at the gestionprojets console output for errors. Common issues:

**Error: "Table 'projects' doesn't exist"**
- Solution: Run the SQL script again in phpMyAdmin

**Error: "Column 'start_date' unknown"**
- Solution: The old table structure is still there. Drop it first:
  ```sql
  DROP TABLE IF EXISTS projects;
  ```
  Then run the CREATE TABLE script again.

**Error: 500 Internal Server Error**
- Solution: Check the full stack trace in gestionprojets console
- Share the error message for further help

---

## Quick Test Commands

```powershell
# Test service directly
curl http://localhost:8099/api/projects

# Test through gateway (will need JWT)
curl http://localhost:8091/api/projects

# Check Eureka
start http://localhost:8761

# Check Frontend
start http://localhost:4200
```

---

## Summary

The issue was that Hibernate tried to create the database schema automatically, but it didn't match the entity definition. By manually creating the correct schema, the service will now work properly.

**After these steps, all gestionprojets functions should work!**
