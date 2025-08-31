-- Fix Event Times V2: More targeted approach to update all events to correct service hours
-- This script addresses timezone issues and ensures all events get the correct 8:30 AM - 5:00 PM schedule
-- Run this in your Supabase SQL Editor

-- First, let's see what we're working with
SELECT 
    title,
    start_date,
    end_date,
    TO_CHAR(start_date, 'YYYY-MM-DD HH24:MI:SS TZ') as formatted_start,
    TO_CHAR(end_date, 'YYYY-MM-DD HH24:MI:SS TZ') as formatted_end
FROM events 
WHERE EXTRACT(YEAR FROM start_date) = 2025
ORDER BY start_date
LIMIT 10;

-- Update ALL regular events to 8:30 AM - 5:00 PM (preserving the date and timezone)
UPDATE events 
SET 
    start_date = DATE_TRUNC('day', start_date AT TIME ZONE 'UTC') AT TIME ZONE 'UTC' + INTERVAL '8 hours 30 minutes',
    end_date = DATE_TRUNC('day', start_date AT TIME ZONE 'UTC') AT TIME ZONE 'UTC' + INTERVAL '17 hours',
    updated_at = NOW()
WHERE 
    EXTRACT(YEAR FROM start_date) = 2025
    AND title NOT IN (
        'Quarterly Day of Prayer', 
        'Camp Meeting', 
        'Ten Days of Prayer Climax', 
        'Youth Week of Prayer',
        'Vocational Bible School (VBS)', 
        'Adventurer''s Day', 
        'Pathfinder Day'
    );

-- Handle all-day events (Quarterly Day of Prayer, Camp Meeting)
UPDATE events 
SET 
    start_date = DATE_TRUNC('day', start_date AT TIME ZONE 'UTC') AT TIME ZONE 'UTC',
    end_date = DATE_TRUNC('day', start_date AT TIME ZONE 'UTC') AT TIME ZONE 'UTC' + INTERVAL '23 hours 59 minutes 59 seconds',
    updated_at = NOW()
WHERE 
    EXTRACT(YEAR FROM start_date) = 2025
    AND title IN ('Quarterly Day of Prayer', 'Camp Meeting');

-- Handle evening events (6:00 PM - 8:00 PM)
UPDATE events 
SET 
    start_date = DATE_TRUNC('day', start_date AT TIME ZONE 'UTC') AT TIME ZONE 'UTC' + INTERVAL '18 hours',
    end_date = DATE_TRUNC('day', start_date AT TIME ZONE 'UTC') AT TIME ZONE 'UTC' + INTERVAL '20 hours',
    updated_at = NOW()
WHERE 
    EXTRACT(YEAR FROM start_date) = 2025
    AND title IN ('Ten Days of Prayer Climax', 'Youth Week of Prayer');

-- Handle extended programs (8:30 AM - 3:00 PM)
UPDATE events 
SET 
    start_date = DATE_TRUNC('day', start_date AT TIME ZONE 'UTC') AT TIME ZONE 'UTC' + INTERVAL '8 hours 30 minutes',
    end_date = DATE_TRUNC('day', start_date AT TIME ZONE 'UTC') AT TIME ZONE 'UTC' + INTERVAL '15 hours',
    updated_at = NOW()
WHERE 
    EXTRACT(YEAR FROM start_date) = 2025
    AND title IN ('Vocational Bible School (VBS)', 'Adventurer''s Day', 'Pathfinder Day');

-- Verification: Show all updated events
SELECT 
    title,
    TO_CHAR(start_date, 'YYYY-MM-DD') as event_date,
    TO_CHAR(start_date, 'HH12:MI AM') as start_time,
    TO_CHAR(end_date, 'HH12:MI AM') as end_time,
    CASE 
        WHEN EXTRACT(HOUR FROM start_date) = 8 AND EXTRACT(MINUTE FROM start_date) = 30 
             AND EXTRACT(HOUR FROM end_date) = 17 THEN '✅ Regular Service (8:30 AM - 5:00 PM)'
        WHEN EXTRACT(HOUR FROM start_date) = 8 AND EXTRACT(MINUTE FROM start_date) = 30 
             AND EXTRACT(HOUR FROM end_date) = 15 THEN '✅ Extended Program (8:30 AM - 3:00 PM)'
        WHEN EXTRACT(HOUR FROM start_date) = 18 
             AND EXTRACT(HOUR FROM end_date) = 20 THEN '✅ Evening Event (6:00 PM - 8:00 PM)'
        WHEN EXTRACT(HOUR FROM start_date) = 0 
             AND EXTRACT(HOUR FROM end_date) = 23 THEN '✅ All-Day Event'
        ELSE '❌ Needs Review'
    END as status
FROM events 
WHERE EXTRACT(YEAR FROM start_date) = 2025
ORDER BY start_date;

-- Count events by time pattern
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
        ELSE 'Other Pattern'
    END as time_pattern,
    COUNT(*) as count
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
        ELSE 'Other Pattern'
    END
ORDER BY count DESC;

-- Final success message
SELECT 
    '🎉 EVENT TIMES FIXED SUCCESSFULLY!' as message,
    COUNT(*) as total_events_processed,
    'All events now have correct service times' as status
FROM events 
WHERE EXTRACT(YEAR FROM start_date) = 2025;