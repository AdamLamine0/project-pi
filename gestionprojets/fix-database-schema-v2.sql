-- Fix Database Schema for Gestionprojets
-- This script properly handles foreign key constraints

USE gestion_projets_db;

-- Disable foreign key checks temporarily
SET FOREIGN_KEY_CHECKS = 0;

-- Drop all tables in correct order
DROP TABLE IF EXISTS generated_documents;
DROP TABLE IF EXISTS team_members;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS projects;

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- Create projects table with correct schema
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

-- Create tasks table
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

-- Create team_members table
CREATE TABLE team_members (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    project_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    role VARCHAR(100),
    joined_at DATETIME NOT NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Create generated_documents table
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

-- Verify the data
SELECT * FROM projects;
