-- Add time fields to announcements table
-- This will allow announcements to have specific start and end times
-- Run this in your Supabase SQL Editor

-- Add start_time and end_time columns to announcements table
ALTER TABLE announcements 
ADD COLUMN IF NOT EXISTS start_time TIME,
ADD COLUMN IF NOT EXISTS end_time TIME;

-- Add a comment to document the new columns
COMMENT ON COLUMN announcements.start_time IS 'Start time for the announcement event (e.g., 08:30:00)';
COMMENT ON COLUMN announcements.end_time IS 'End time for the announcement event (e.g., 17:00:00)';

-- Update existing announcements to have default times if needed
-- You can customize these default times based on your typical service schedule
UPDATE announcements 
SET 
    start_time = '08:30:00',
    end_time = '17:00:00'
WHERE start_time IS NULL AND end_time IS NULL;

-- Verify the changes
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'announcements' 
    AND column_name IN ('start_time', 'end_time')
ORDER BY column_name;

-- Show sample data with new time fields
SELECT 
    id,
    title,
    start_date,
    start_time,
    end_date,
    end_time,
    target_audience,
    is_published
FROM announcements 
ORDER BY created_at DESC 
LIMIT 5;

SELECT '✅ Time fields successfully added to announcements table!' as message;