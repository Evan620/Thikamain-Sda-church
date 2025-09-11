-- Fix giving_records RLS policies so admins can record donations
-- Run this in your Supabase SQL Editor

-- Ensure RLS is enabled on giving_records (it already is in schema, but safe to repeat)
ALTER TABLE giving_records ENABLE ROW LEVEL SECURITY;

-- Drop existing admin management policies if they exist to avoid name conflicts
DROP POLICY IF EXISTS "Admins can manage giving records" ON giving_records;
DROP POLICY IF EXISTS "Members can insert own giving" ON giving_records;

-- Admins (SUPER_ADMIN, ADMIN, FINANCE_ADMIN) can insert, update, delete, and select all giving records
CREATE POLICY "Admins can manage giving records" ON giving_records
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid()
              AND users.role IN ('SUPER_ADMIN', 'ADMIN', 'FINANCE_ADMIN')
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid()
              AND users.role IN ('SUPER_ADMIN', 'ADMIN', 'FINANCE_ADMIN')
        )
    );

-- Optional: allow authenticated members to record their own giving if a member_id linked to them is provided
-- Comment out this block if you do NOT want members to self-record giving.
CREATE POLICY "Members can insert own giving" ON giving_records
    FOR INSERT
    WITH CHECK (
        member_id IN (
            SELECT id FROM members WHERE user_id = auth.uid()
        )
    );

-- Keep the existing SELECT policies from schema (view own / admins view all). This script only adds missing write permissions.

-- Verification queries (run manually in SQL editor):
-- 1) Verify policies
--    SELECT * FROM pg_policies WHERE tablename = 'giving_records';
-- 2) Verify your admin user exists in users table with correct role
--    SELECT id, email, role FROM users WHERE email = 'thikamainsdachurchclerk@gmail.com';
-- 3) After applying, test an insert as admin from the app or via SQL:
--    -- Example (replace member_id as needed):
--    -- INSERT INTO giving_records (member_id, amount, giving_type, payment_method, giving_date, is_verified)
--    -- VALUES (NULL, 100.00, 'tithe', 'cash', CURRENT_DATE, true);

-- Success message
SELECT 'giving_records policies updated: admins can now insert/update/delete donations (and members can insert their own if enabled).' AS message;