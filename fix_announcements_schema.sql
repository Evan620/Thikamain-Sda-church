-- Fix Announcements Schema - Add Time Columns
-- Run this in your Supabase SQL Editor

-- First, let's check if the columns already exist
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'announcements' 
ORDER BY column_name;

-- Add the missing time columns
ALTER TABLE announcements 
ADD COLUMN IF NOT EXISTS start_time TIME DEFAULT '08:30:00',
ADD COLUMN IF NOT EXISTS end_time TIME DEFAULT '17:00:00';

-- Verify the columns were added
SELECT column_name, data_type, column_default
FROM information_schema.columns 
WHERE table_name = 'announcements' 
    AND column_name IN ('start_time', 'end_time')
ORDER BY column_name;

-- Update any existing announcements to have default times
UPDATE announcements 
SET 
    start_time = '08:30:00',
    end_time = '17:00:00'
WHERE start_time IS NULL OR end_time IS NULL;

-- Show sample data to confirm
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
LIMIT 3;

SELECT '✅ Time columns successfully added to announcements table!' as result;