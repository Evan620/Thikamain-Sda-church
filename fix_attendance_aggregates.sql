-- Attendance Aggregates schema (counts, not per-person)
-- Run in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS attendance_aggregates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  attendance_date DATE UNIQUE NOT NULL,
  sabbath_school_count INTEGER NOT NULL DEFAULT 0,
  divine_children_count INTEGER NOT NULL DEFAULT 0,
  divine_youth_count INTEGER NOT NULL DEFAULT 0,
  divine_adults_count INTEGER NOT NULL DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE attendance_aggregates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins manage attendance aggregates" ON attendance_aggregates;
CREATE POLICY "Admins manage attendance aggregates" ON attendance_aggregates
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role IN ('SUPER_ADMIN','ADMIN')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role IN ('SUPER_ADMIN','ADMIN')
    )
  );

-- Indexes for analytics
CREATE INDEX IF NOT EXISTS idx_attendance_aggregates_date ON attendance_aggregates(attendance_date DESC);

SELECT 'attendance_aggregates created/updated.' AS message;
