-- Setup Script: Create First Admin User for Thika Main SDA Church
-- Run this after setting up the database schema
-- 
-- INSTRUCTIONS:
-- 1. First, create a user in Supabase Auth Dashboard with email: thikamainsdachurchclerk@gmail.com
-- 2. Copy the user ID from Supabase Auth Dashboard
-- 3. Replace 'YOUR_USER_ID_HERE' below with the actual user ID
-- 4. Run this script in Supabase SQL Editor

-- Insert the admin user into the users table
-- Replace 'YOUR_USER_ID_HERE' with the actual user ID from Supabase Auth
INSERT INTO users (
    id,
    email,
    full_name,
    phone,
    role,
    is_active,
    permissions,
    created_at,
    updated_at
) VALUES (
    'YOUR_USER_ID_HERE', -- Replace with actual user ID from Supabase Auth
    'thikamainsdachurchclerk@gmail.com',
    'Church Administrator',
    '+254 700 000 000', -- Update with actual phone number
    'SUPER_ADMIN',
    true,
    '["*"]'::jsonb, -- Super admin has all permissions
    NOW(),
    NOW()
) ON CONFLICT (id) DO UPDATE SET
    role = 'SUPER_ADMIN',
    permissions = '["*"]'::jsonb,
    is_active = true,
    updated_at = NOW();

-- Verify the user was created
SELECT 
    id,
    email,
    full_name,
    role,
    permissions,
    is_active,
    created_at
FROM users 
WHERE email = 'thikamainsdachurchclerk@gmail.com';

-- Success message
SELECT 'Admin user setup complete! You can now log in to the admin dashboard.' as message;