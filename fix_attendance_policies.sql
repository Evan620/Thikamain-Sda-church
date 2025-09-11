-- Fix attendance RLS policies so admins can record attendance
-- Run this script in your Supabase SQL Editor

ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;

-- Drop old policy if present to avoid conflicts
DROP POLICY IF EXISTS "Admins can manage attendance" ON attendance;
DROP POLICY IF EXISTS "Members can view own attendance" ON attendance;

-- Allow admins to SELECT/INSERT/UPDATE/DELETE attendance
CREATE POLICY "Admins can manage attendance" ON attendance
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
        AND users.role IN ('SUPER_ADMIN', 'ADMIN')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
        AND users.role IN ('SUPER_ADMIN', 'ADMIN')
    )
  );

-- Optional: allow members to view their own attendance
CREATE POLICY "Members can view own attendance" ON attendance
  FOR SELECT
  USING (
    member_id IN (
      SELECT id FROM members WHERE user_id = auth.uid()
    )
  );

-- If you plan to record attendance without events, consider adjusting uniqueness
-- Example: enforce uniqueness by member/date/service instead of event_id
-- ALTER TABLE attendance DROP CONSTRAINT IF EXISTS attendance_event_member_date_key;
-- ALTER TABLE attendance ADD CONSTRAINT attendance_member_date_service_key UNIQUE (member_id, attendance_date, service_type);

SELECT 'Attendance policies updated successfully.' AS message;
