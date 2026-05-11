-- Create Test User for Login
-- This script creates a test user account that you can use to log in

USE user_db;

-- Insert test user
-- Email: test@example.com
-- Password: test123 (BCrypt encoded: $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy)
INSERT INTO user (name, prenom, email, password, date_inscription, statut, role)
VALUES (
    'Test',
    'User',
    'test@example.com',
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
    CURDATE(),
    'ACTIVE',
    'USER'
)
ON DUPLICATE KEY UPDATE
    password = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
    statut = 'ACTIVE';

-- Verify the user was created
SELECT id, name, prenom, email, role, statut, date_inscription FROM user WHERE email = 'test@example.com';

