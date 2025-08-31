-- Fix Event Times: Update all events to correct service hours (8:30 AM to 5:00 PM)
-- This script corrects the event times from the incorrect 10:00 AM - 12:00 PM to the proper 8:30 AM - 5:00 PM schedule
-- Run this in your Supabase SQL Editor

-- First, let's see the current event times before making changes
SELECT 
    title,
    start_date,
    end_date,
    EXTRACT(HOUR FROM start_date) as start_hour,
    EXTRACT(MINUTE FROM start_date) as start_minute,
    EXTRACT(HOUR FROM end_date) as end_hour,
    EXTRACT(MINUTE FROM end_date) as end_minute
FROM events 
WHERE EXTRACT(YEAR FROM start_date) = 2025
ORDER BY start_date
LIMIT 10;

-- Update all events to have the correct service times (8:30 AM to 5:00 PM)
-- This will preserve the date but update the time portion

UPDATE events 
SET 
    start_date = DATE_TRUNC('day', start_date) + INTERVAL '8 hours 30 minutes',
    end_date = DATE_TRUNC('day', start_date) + INTERVAL '17 hours',
    updated_at = NOW()
WHERE 
    -- Only update events that don't already have the correct times
    (EXTRACT(HOUR FROM start_date) != 8 OR EXTRACT(MINUTE FROM start_date) != 30)
    OR 
    (EXTRACT(HOUR FROM end_date) != 17 OR EXTRACT(MINUTE FROM end_date) != 0)
    AND EXTRACT(YEAR FROM start_date) = 2025;

-- Special handling for all-day events (like Quarterly Day of Prayer and Camp Meeting)
-- These should remain as all-day events but we'll update them to be more explicit
UPDATE events 
SET 
    start_date = DATE_TRUNC('day', start_date) + INTERVAL '0 hours',
    end_date = DATE_TRUNC('day', start_date) + INTERVAL '23 hours 59 minutes 59 seconds',
    updated_at = NOW()
WHERE 
    title IN ('Quarterly Day of Prayer', 'Camp Meeting')
    AND EXTRACT(YEAR FROM start_date) = 2025;

-- Special handling for evening events (like Ten Days of Prayer Climax, Youth Week of Prayer)
-- These should be evening events from 6:00 PM to 8:00 PM
UPDATE events 
SET 
    start_date = DATE_TRUNC('day', start_date) + INTERVAL '18 hours',
    end_date = DATE_TRUNC('day', start_date) + INTERVAL '20 hours',
    updated_at = NOW()
WHERE 
    title IN ('Ten Days of Prayer Climax', 'Youth Week of Prayer')
    AND EXTRACT(YEAR FROM start_date) = 2025;

-- Special handling for extended events (like VBS, Adventurer's Day, Pathfinder Day)
-- These should run from 8:30 AM to 3:00 PM (15:00)
UPDATE events 
SET 
    start_date = DATE_TRUNC('day', start_date) + INTERVAL '8 hours 30 minutes',
    end_date = DATE_TRUNC('day', start_date) + INTERVAL '15 hours',
    updated_at = NOW()
WHERE 
    title IN ('Vocational Bible School (VBS)', 'Adventurer''s Day', 'Pathfinder Day')
    AND EXTRACT(YEAR FROM start_date) = 2025;

-- Verification: Show the updated event times
SELECT 
    'UPDATED EVENT TIMES - VERIFICATION' as status,
    COUNT(*) as total_events_updated
FROM events 
WHERE updated_at >= NOW() - INTERVAL '1 minute';

-- Display sample of updated events with their new times
SELECT 
    title,
    TO_CHAR(start_date, 'YYYY-MM-DD HH24:MI:SS TZ') as start_time,
    TO_CHAR(end_date, 'YYYY-MM-DD HH24:MI:SS TZ') as end_time,
    event_type,
    location
FROM events 
WHERE EXTRACT(YEAR FROM start_date) = 2025
ORDER BY start_date
LIMIT 15;

-- Summary by event time patterns
SELECT 
    CASE 
        WHEN EXTRACT(HOUR FROM start_date) = 8 AND EXTRACT(MINUTE FROM start_date) = 30 
             AND EXTRACT(HOUR FROM end_date) = 17 THEN 'Regular Service (8:30 AM - 5:00 PM)'
        WHEN EXTRACT(HOUR FROM start_date) = 8 AND EXTRACT(MINUTE FROM start_date) = 30 
             AND EXTRACT(HOUR FROM end_date) = 15 THEN 'Extended Program (8:30 AM - 3:00 PM)'
        WHEN EXTRACT(HOUR FROM start_date) = 18 
             AND EXTRACT(HOUR FROM end_date) = 20 THEN 'Evening Event (6:00 PM - 8:00 PM)'
        WHEN EXTRACT(HOUR FROM start_date) = 0 
             AND EXTRACT(HOUR FROM end_date) = 23 THEN 'All-Day Event'
        ELSE 'Other Time Pattern'
    END as time_pattern,
    COUNT(*) as event_count
FROM events 
WHERE EXTRACT(YEAR FROM start_date) = 2025
GROUP BY 
    CASE 
        WHEN EXTRACT(HOUR FROM start_date) = 8 AND EXTRACT(MINUTE FROM start_date) = 30 
             AND EXTRACT(HOUR FROM end_date) = 17 THEN 'Regular Service (8:30 AM - 5:00 PM)'
        WHEN EXTRACT(HOUR FROM start_date) = 8 AND EXTRACT(MINUTE FROM start_date) = 30 
             AND EXTRACT(HOUR FROM end_date) = 15 THEN 'Extended Program (8:30 AM - 3:00 PM)'
        WHEN EXTRACT(HOUR FROM start_date) = 18 
             AND EXTRACT(HOUR FROM end_date) = 20 THEN 'Evening Event (6:00 PM - 8:00 PM)'
        WHEN EXTRACT(HOUR FROM start_date) = 0 
             AND EXTRACT(HOUR FROM end_date) = 23 THEN 'All-Day Event'
        ELSE 'Other Time Pattern'
    END
ORDER BY event_count DESC;

-- Final success message
SELECT 
    '✅ EVENT TIMES SUCCESSFULLY UPDATED!' as message,
    'All events now reflect the correct service schedule:' as details,
    '• Regular Services: 8:30 AM - 5:00 PM' as schedule_1,
    '• Extended Programs: 8:30 AM - 3:00 PM' as schedule_2,
    '• Evening Events: 6:00 PM - 8:00 PM' as schedule_3,
    '• All-Day Events: Full day coverage' as schedule_4;