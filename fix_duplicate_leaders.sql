-- Fix Duplicate Church Leaders
-- Remove the placeholder entries and keep only the real leaders

-- Remove the placeholder Sabbath School Superintendent entry
DELETE FROM church_leaders 
WHERE name = '[SABBATH SCHOOL SUPERINTENDENT NAME]' 
AND position = 'Sabbath School Superintendent';

-- Remove the placeholder Personal Ministry Leader entry (if it exists)
DELETE FROM church_leaders 
WHERE name = '[PERSONAL MINISTRY LEADER NAME]' 
AND position = 'Personal Ministry Leader';

-- Fix Charles Owiti's position spelling (if needed)
UPDATE church_leaders 
SET position = 'Sabbath School Superintendent'
WHERE name = 'Charles Owiti' 
AND position = 'Sabbath School Superitendent';

-- Reset display orders to be sequential
WITH ordered_leaders AS (
    SELECT id, ROW_NUMBER() OVER (ORDER BY 
        CASE category 
            WHEN 'pastoral' THEN 1
            WHEN 'elder' THEN 2  
            WHEN 'officer' THEN 3
            WHEN 'ministry' THEN 4
            WHEN 'department' THEN 5
        END,
        name
    ) as new_order
    FROM church_leaders
    WHERE is_active = true
)
UPDATE church_leaders 
SET display_order = ordered_leaders.new_order
FROM ordered_leaders 
WHERE church_leaders.id = ordered_leaders.id;

-- Success message
SELECT 
    COUNT(*) as total_active_leaders,
    'Church leaders data has been cleaned up successfully!' as message
FROM church_leaders 
WHERE is_active = true;

-- Display all current leaders
SELECT 
    display_order,
    name,
    position,
    category,
    email,
    phone
FROM church_leaders 
WHERE is_active = true
ORDER BY display_order;