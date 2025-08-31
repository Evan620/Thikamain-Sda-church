-- Add Missing Church Leaders
-- This migration adds the Sabbath School Superintendent and Personal Ministry leaders
-- that were omitted from the initial church leaders data

-- Insert missing church leaders
INSERT INTO church_leaders (name, position, category, email, phone, bio, display_order, specialties) VALUES

-- Sabbath School Superintendent (Officer category)
('[SABBATH SCHOOL SUPERINTENDENT NAME]', 'Sabbath School Superintendent', 'officer', '[EMAIL]', '[PHONE]', 'Leading our Sabbath School ministry and coordinating Christian education programs for all age groups.', 11, ARRAY['Sabbath School Ministry', 'Christian Education', 'Teaching Coordination']),

-- Personal Ministry Leader (Ministry category)
('[PERSONAL MINISTRY LEADER NAME]', 'Personal Ministry Leader', 'ministry', '[EMAIL]', '[PHONE]', 'Coordinating personal evangelism efforts and training members in witnessing and outreach activities.', 22, ARRAY['Personal Ministry', 'Evangelism', 'Witnessing', 'Outreach Training']);

-- Update display_order for existing leaders to accommodate new positions
-- Move existing leaders down to make room for Sabbath School Superintendent
UPDATE church_leaders SET display_order = display_order + 1 WHERE display_order >= 11;

-- Success message
SELECT 
    COUNT(*) as leaders_added,
    'Missing church leaders have been added successfully!' as message
FROM church_leaders 
WHERE created_at >= NOW() - INTERVAL '1 minute';

-- Display all leaders with their positions
SELECT 
    name,
    position,
    category,
    phone,
    display_order
FROM church_leaders 
ORDER BY display_order;