-- Debug and Create User Script
-- IMPORTANT: Make sure you select "user_db" database in phpMyAdmin before running this!

-- Step 1: Switch to user_db database
USE user_db;

-- Step 2: Check if user table exists
SHOW TABLES LIKE 'user';

-- Step 3: Show table structure (user is a reserved word, so we use backticks)
DESCRIBE `user`;

-- Step 4: Show all existing users (without passwords)
SELECT id, name, prenom, email, role, statut, date_inscription FROM `user`;

-- Step 5: Delete test user if exists (to start fresh)
DELETE FROM `user` WHERE email = 'test@example.com';

-- Step 6: Create test user with BCrypt password
-- Email: test@example.com
-- Password: test123
-- BCrypt hash: $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
INSERT INTO `user` (name, prenom, email, password, date_inscription, statut, role)
VALUES (
    'Test',
    'User',
    'test@example.com',
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
    CURDATE(),
    'ACTIVE',
    'USER'
);

-- Step 7: Verify the user was created
SELECT id, name, prenom, email, role, statut, date_inscription FROM `user` WHERE email = 'test@example.com';

-- Step 8: Count total users
SELECT COUNT(*) as total_users FROM `user`;
