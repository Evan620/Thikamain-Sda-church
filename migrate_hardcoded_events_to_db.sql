-- Migration: Populate Events Table with Hardcoded Events Data
-- This migration adds all the hardcoded events from the frontend to the database
-- Run this in your Supabase SQL Editor to enable dynamic events

-- Clear existing events (optional - remove this line if you want to keep existing events)
-- DELETE FROM events WHERE created_at >= NOW() - INTERVAL '1 day';

-- Insert all 2025 events from the hardcoded frontend data
INSERT INTO events (
    title,
    description,
    start_date,
    end_date,
    location,
    event_type,
    max_attendees,
    current_attendees,
    cost,
    requires_registration,
    is_published,
    created_at,
    updated_at
) VALUES

-- JANUARY 2025
('Quarterly Day of Prayer', 'A special day dedicated to prayer and seeking God''s guidance for the new quarter.', '2025-01-04 00:00:00+00', '2025-01-04 23:59:59+00', 'Main Sanctuary', 'Prayer Event', NULL, 0, 0.00, false, true, NOW(), NOW()),

('Health Sabbath', 'Focus on physical, mental, and spiritual health with health screenings and wellness education.', '2025-01-11 10:00:00+00', '2025-01-11 12:00:00+00', 'Main Sanctuary', 'Health Ministry', NULL, 0, 0.00, false, true, NOW(), NOW()),

('Ten Days of Prayer Climax', 'Culmination of the annual ten days of prayer with special worship and testimonies.', '2025-01-18 18:00:00+00', '2025-01-18 20:00:00+00', 'Main Sanctuary', 'Prayer Event', NULL, 0, 0.00, false, true, NOW(), NOW()),

('Development Sabbath', 'Focus on church development projects and community improvement initiatives.', '2025-01-25 10:00:00+00', '2025-01-25 12:00:00+00', 'Main Sanctuary', 'Development', NULL, 0, 0.00, false, true, NOW(), NOW()),

-- FEBRUARY 2025
('Worker''s Seminar', 'Training and development seminar for church workers and ministry leaders.', '2025-02-01 09:00:00+00', '2025-02-01 17:00:00+00', 'Fellowship Hall', 'Training', NULL, 0, 0.00, false, true, NOW(), NOW()),

('AMR (Adventist Muslim Relations)', 'Special program focusing on interfaith dialogue and understanding.', '2025-02-08 10:00:00+00', '2025-02-08 12:00:00+00', 'Main Sanctuary', 'Interfaith', NULL, 0, 0.00, false, true, NOW(), NOW()),

('Stewardship Sabbath', 'Focus on faithful stewardship of time, talents, and treasures.', '2025-02-15 10:00:00+00', '2025-02-15 12:00:00+00', 'Main Sanctuary', 'Stewardship', NULL, 0, 0.00, false, true, NOW(), NOW()),

('Deacon''s Day', 'Special recognition and appreciation for our dedicated deacons.', '2025-02-22 10:00:00+00', '2025-02-22 12:00:00+00', 'Main Sanctuary', 'Recognition', NULL, 0, 0.00, false, true, NOW(), NOW()),

-- MARCH 2025
('Induction Sabbath', 'Official induction ceremony for new youth ministry leaders and members.', '2025-03-01 10:00:00+00', '2025-03-01 12:00:00+00', 'Main Sanctuary', 'Induction', NULL, 0, 0.00, false, true, NOW(), NOW()),

('Communication Sabbath', 'Focus on effective church communication and media ministry.', '2025-03-08 10:00:00+00', '2025-03-08 12:00:00+00', 'Main Sanctuary', 'Communication', NULL, 0, 0.00, false, true, NOW(), NOW()),

('AWM (Adventist Women Ministry)', 'Special program celebrating and empowering women in ministry.', '2025-03-15 10:00:00+00', '2025-03-15 12:00:00+00', 'Main Sanctuary', 'Women''s Ministry', NULL, 0, 0.00, false, true, NOW(), NOW()),

('Education Sabbath', 'Emphasis on Christian education and academic excellence.', '2025-03-22 10:00:00+00', '2025-03-22 12:00:00+00', 'Main Sanctuary', 'Education', NULL, 0, 0.00, false, true, NOW(), NOW()),

('Holy Communion', 'Quarterly communion service with foot washing and Lord''s Supper.', '2025-03-29 10:00:00+00', '2025-03-29 12:00:00+00', 'Main Sanctuary', 'Communion', NULL, 0, 0.00, false, true, NOW(), NOW()),

-- APRIL 2025
('Family Life Sabbath', 'Focus on strengthening family relationships and Christian home life.', '2025-04-05 10:00:00+00', '2025-04-05 12:00:00+00', 'Main Sanctuary', 'Family Life', NULL, 0, 0.00, false, true, NOW(), NOW()),

('Choir Day', 'Special musical program featuring our church choirs and musical talents.', '2025-04-12 10:00:00+00', '2025-04-12 12:00:00+00', 'Main Sanctuary', 'Music Ministry', NULL, 0, 0.00, false, true, NOW(), NOW()),

('Vocational Bible School (VBS)', 'Special Bible school program for children with fun activities and learning.', '2025-04-19 10:00:00+00', '2025-04-19 15:00:00+00', 'Children''s Wing', 'VBS', NULL, 0, 0.00, false, true, NOW(), NOW()),

('Ambassador''s Day', 'Special program recognizing and celebrating our youth ambassadors.', '2025-04-26 10:00:00+00', '2025-04-26 12:00:00+00', 'Main Sanctuary', 'Youth Program', NULL, 0, 0.00, false, true, NOW(), NOW()),

-- MAY 2025
('Personal Ministry Sabbath', 'Focus on personal evangelism and witnessing in our daily lives.', '2025-05-03 10:00:00+00', '2025-05-03 12:00:00+00', 'Main Sanctuary', 'Personal Ministry', NULL, 0, 0.00, false, true, NOW(), NOW()),

('Chaplaincy Sabbath', 'Special program focusing on chaplaincy ministry and spiritual care.', '2025-05-10 10:00:00+00', '2025-05-10 12:00:00+00', 'Main Sanctuary', 'Chaplaincy', NULL, 0, 0.00, false, true, NOW(), NOW()),

('Adventurer''s Day', 'Special program for our young adventurers with activities and recognition.', '2025-05-17 10:00:00+00', '2025-05-17 15:00:00+00', 'Youth Hall', 'Adventurer Program', NULL, 0, 0.00, false, true, NOW(), NOW()),

('Welfare/Special Needs Sabbath', 'Focus on caring for those with special needs and welfare ministry.', '2025-05-24 10:00:00+00', '2025-05-24 12:00:00+00', 'Main Sanctuary', 'Welfare', NULL, 0, 0.00, false, true, NOW(), NOW()),

('AMM (Adventist Men Ministry)', 'Special program celebrating and empowering men in ministry.', '2025-05-31 10:00:00+00', '2025-05-31 12:00:00+00', 'Main Sanctuary', 'Men''s Ministry', NULL, 0, 0.00, false, true, NOW(), NOW()),

-- JUNE 2025
('Sabbath School Day', 'Special focus on Sabbath School ministry and Christian education.', '2025-06-07 10:00:00+00', '2025-06-07 12:00:00+00', 'Main Sanctuary', 'Sabbath School', NULL, 0, 0.00, false, true, NOW(), NOW()),

('AWM (Adventist Women Ministry)', 'Second AWM program of the year celebrating women in ministry.', '2025-06-14 10:00:00+00', '2025-06-14 12:00:00+00', 'Main Sanctuary', 'Women''s Ministry', NULL, 0, 0.00, false, true, NOW(), NOW()),

('Publishing Sabbath', 'Focus on literature ministry and sharing God''s word through publications.', '2025-06-21 10:00:00+00', '2025-06-21 12:00:00+00', 'Main Sanctuary', 'Publishing', NULL, 0, 0.00, false, true, NOW(), NOW()),

('Holy Communion', 'Quarterly communion service with foot washing and Lord''s Supper.', '2025-06-28 10:00:00+00', '2025-06-28 12:00:00+00', 'Main Sanctuary', 'Communion', NULL, 0, 0.00, false, true, NOW(), NOW()),

-- JULY 2025
('Youth Day', 'Special day celebrating our youth and their contributions to the church.', '2025-07-05 10:00:00+00', '2025-07-05 12:00:00+00', 'Main Sanctuary', 'Youth Program', NULL, 0, 0.00, false, true, NOW(), NOW()),

('Communication Sabbath', 'Second communication sabbath focusing on media and outreach.', '2025-07-12 10:00:00+00', '2025-07-12 12:00:00+00', 'Main Sanctuary', 'Communication', NULL, 0, 0.00, false, true, NOW(), NOW()),

('Music Sabbath', 'Special musical program celebrating our music ministry.', '2025-07-19 10:00:00+00', '2025-07-19 12:00:00+00', 'Main Sanctuary', 'Music Ministry', NULL, 0, 0.00, false, true, NOW(), NOW()),

('Children''s Sabbath', 'Special program celebrating our children and their ministry.', '2025-07-26 10:00:00+00', '2025-07-26 12:00:00+00', 'Main Sanctuary', 'Children''s Program', NULL, 0, 0.00, false, true, NOW(), NOW()),

-- AUGUST 2025
('Development Sabbath', 'Second development sabbath focusing on church growth and improvement.', '2025-08-02 10:00:00+00', '2025-08-02 12:00:00+00', 'Main Sanctuary', 'Development', NULL, 0, 0.00, false, true, NOW(), NOW()),

('Personal Ministry Sabbath', 'Second personal ministry sabbath focusing on evangelism and witnessing.', '2025-08-09 10:00:00+00', '2025-08-09 12:00:00+00', 'Main Sanctuary', 'Personal Ministry', NULL, 0, 0.00, false, true, NOW(), NOW()),

('Education Sabbath', 'Second education sabbath emphasizing Christian education.', '2025-08-16 10:00:00+00', '2025-08-16 12:00:00+00', 'Main Sanctuary', 'Education', NULL, 0, 0.00, false, true, NOW(), NOW()),

('Camp Meeting', 'Annual camp meeting with special speakers and spiritual renewal.', '2025-08-23 00:00:00+00', '2025-08-23 23:59:59+00', 'Camp Grounds', 'Camp Meeting', NULL, 0, 0.00, false, true, NOW(), NOW()),

('Elders Sabbath', 'Special recognition and appreciation for our church elders.', '2025-08-30 10:00:00+00', '2025-08-30 12:00:00+00', 'Main Sanctuary', 'Leadership', NULL, 0, 0.00, false, true, NOW(), NOW()),

-- SEPTEMBER 2025
('Choir Day', 'Second choir day celebrating our musical ministry.', '2025-09-06 10:00:00+00', '2025-09-06 12:00:00+00', 'Main Sanctuary', 'Music Ministry', NULL, 0, 0.00, false, true, NOW(), NOW()),

('Family Life Sabbath', 'Second family life sabbath strengthening family relationships.', '2025-09-13 10:00:00+00', '2025-09-13 12:00:00+00', 'Main Sanctuary', 'Family Life', NULL, 0, 0.00, false, true, NOW(), NOW()),

('Pathfinder Day', 'Special program celebrating our pathfinder ministry.', '2025-09-20 10:00:00+00', '2025-09-20 15:00:00+00', 'Youth Hall', 'Pathfinder Program', NULL, 0, 0.00, false, true, NOW(), NOW()),

('Holy Communion', 'Quarterly communion service with foot washing and Lord''s Supper.', '2025-09-27 10:00:00+00', '2025-09-27 12:00:00+00', 'Main Sanctuary', 'Communion', NULL, 0, 0.00, false, true, NOW(), NOW()),

-- OCTOBER 2025
('Publishing Sabbath', 'Second publishing sabbath focusing on literature ministry.', '2025-10-04 10:00:00+00', '2025-10-04 12:00:00+00', 'Main Sanctuary', 'Publishing', NULL, 0, 0.00, false, true, NOW(), NOW()),

('Pastor''s Day', 'Special day honoring and appreciating our pastoral leadership.', '2025-10-11 10:00:00+00', '2025-10-11 12:00:00+00', 'Main Sanctuary', 'Recognition', NULL, 0, 0.00, false, true, NOW(), NOW()),

('School Sabbath', 'Special program focusing on our school ministry and education.', '2025-10-18 10:00:00+00', '2025-10-18 12:00:00+00', 'Main Sanctuary', 'Education', NULL, 0, 0.00, false, true, NOW(), NOW()),

('Creation Sabbath', 'Celebrating God''s creation and our role as stewards of the earth.', '2025-10-25 10:00:00+00', '2025-10-25 12:00:00+00', 'Main Sanctuary', 'Creation', NULL, 0, 0.00, false, true, NOW(), NOW()),

-- NOVEMBER 2025
('Single''s Sabbath', 'Special program celebrating and supporting our single members.', '2025-11-01 10:00:00+00', '2025-11-01 12:00:00+00', 'Main Sanctuary', 'Singles Ministry', NULL, 0, 0.00, false, true, NOW(), NOW()),

('Special Needs Sabbath', 'Focus on ministry to those with special needs and disabilities.', '2025-11-08 10:00:00+00', '2025-11-08 12:00:00+00', 'Main Sanctuary', 'Welfare', NULL, 0, 0.00, false, true, NOW(), NOW()),

('Youth Week of Prayer', 'Special week of prayer led by and for our youth ministry.', '2025-11-15 18:00:00+00', '2025-11-15 20:00:00+00', 'Youth Hall', 'Prayer Week', NULL, 0, 0.00, false, true, NOW(), NOW()),

('Master Guide''s Sabbath', 'Recognition and celebration of our master guide ministry.', '2025-11-22 10:00:00+00', '2025-11-22 12:00:00+00', 'Main Sanctuary', 'Master Guide', NULL, 0, 0.00, false, true, NOW(), NOW()),

('Health Sabbath', 'Second health sabbath focusing on total wellness.', '2025-11-29 10:00:00+00', '2025-11-29 12:00:00+00', 'Main Sanctuary', 'Health Ministry', NULL, 0, 0.00, false, true, NOW(), NOW()),

-- DECEMBER 2025
('Stewardship Sabbath', 'Second stewardship sabbath focusing on faithful giving.', '2025-12-06 10:00:00+00', '2025-12-06 12:00:00+00', 'Main Sanctuary', 'Stewardship', NULL, 0, 0.00, false, true, NOW(), NOW()),

('Ambassador''s Day', 'Second ambassador''s day celebrating our youth ambassadors.', '2025-12-13 10:00:00+00', '2025-12-13 12:00:00+00', 'Main Sanctuary', 'Youth Program', NULL, 0, 0.00, false, true, NOW(), NOW()),

('Deacon''s Day', 'Second deacon''s day appreciating our dedicated deacons.', '2025-12-20 10:00:00+00', '2025-12-20 12:00:00+00', 'Main Sanctuary', 'Recognition', NULL, 0, 0.00, false, true, NOW(), NOW()),

('Holy Communion', 'Year-end communion service with foot washing and Lord''s Supper.', '2025-12-27 10:00:00+00', '2025-12-27 12:00:00+00', 'Main Sanctuary', 'Communion', NULL, 0, 0.00, false, true, NOW(), NOW());

-- Note: The events table doesn't have tags or series columns like the sermons table
-- The event_type column already provides categorization for the events
-- If you need tags/series functionality, you would need to add these columns first:
-- ALTER TABLE events ADD COLUMN tags TEXT[];
-- ALTER TABLE events ADD COLUMN series VARCHAR(255);

-- Success message
SELECT 
    COUNT(*) as total_events_inserted,
    'Events migration completed successfully! All hardcoded events have been added to the database.' as message
FROM events 
WHERE created_at >= NOW() - INTERVAL '1 minute';

-- Display summary of inserted events by quarter
SELECT 
    CASE 
        WHEN EXTRACT(MONTH FROM start_date) <= 3 THEN 'Q1 2025'
        WHEN EXTRACT(MONTH FROM start_date) <= 6 THEN 'Q2 2025'
        WHEN EXTRACT(MONTH FROM start_date) <= 9 THEN 'Q3 2025'
        ELSE 'Q4 2025'
    END as quarter,
    COUNT(*) as event_count
FROM events 
WHERE EXTRACT(YEAR FROM start_date) = 2025
    AND created_at >= NOW() - INTERVAL '1 minute'
GROUP BY 
    CASE 
        WHEN EXTRACT(MONTH FROM start_date) <= 3 THEN 'Q1 2025'
        WHEN EXTRACT(MONTH FROM start_date) <= 6 THEN 'Q2 2025'
        WHEN EXTRACT(MONTH FROM start_date) <= 9 THEN 'Q3 2025'
        ELSE 'Q4 2025'
    END
ORDER BY quarter;

-- Display events by type
SELECT 
    event_type,
    COUNT(*) as count
FROM events 
WHERE created_at >= NOW() - INTERVAL '1 minute'
GROUP BY event_type
ORDER BY count DESC;