-- Add permissions column to users table if it doesn't exist
ALTER TABLE users ADD COLUMN IF NOT EXISTS permissions JSONB DEFAULT '[]'::jsonb;

-- Update existing users to have default permissions based on their role
UPDATE users 
SET permissions = CASE 
  WHEN role = 'SUPER_ADMIN' THEN '["manage_users", "manage_admins", "view_audit_logs", "system_settings", "manage_content", "manage_sermons", "manage_events", "manage_announcements", "manage_members", "view_member_details", "manage_attendance", "manage_finances", "view_financial_reports", "manage_donations", "manage_budget", "manage_prayer_requests", "send_communications"]'::jsonb
  WHEN role = 'ADMIN' THEN '["manage_content", "manage_sermons", "manage_events", "manage_announcements", "manage_members", "view_member_details", "manage_attendance", "manage_finances", "view_financial_reports", "manage_donations", "manage_budget", "manage_prayer_requests", "send_communications"]'::jsonb
  WHEN role = 'FINANCE_ADMIN' THEN '["manage_finances", "view_financial_reports", "manage_donations", "manage_budget", "view_member_details"]'::jsonb
  WHEN role = 'CONTENT_ADMIN' THEN '["manage_content", "manage_sermons", "manage_events", "manage_announcements", "view_member_details"]'::jsonb
  WHEN role = 'MEMBER_ADMIN' THEN '["manage_members", "view_member_details", "manage_attendance", "send_communications"]'::jsonb
  ELSE '[]'::jsonb
END
WHERE permissions IS NULL OR permissions = '[]'::jsonb;

-- Verify the column was added
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'users' AND column_name = 'permissions';
