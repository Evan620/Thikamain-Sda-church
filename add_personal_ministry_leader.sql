-- Add Personal Ministry Leader
-- Add Erick Mogeni as the Personal Ministry Leader who was missing from the database

-- Insert Personal Ministry Leader
INSERT INTO church_leaders (name, position, category, email, phone, bio, display_order, specialties) VALUES
('Erick Mogeni', 'Personal Ministry Leader', 'ministry', NULL, '+254 713 567 192', 'Coordinating personal evangelism efforts and training members in witnessing and outreach activities throughout our community.', 22, ARRAY['Personal Ministry', 'Evangelism', 'Witnessing', 'Outreach Training', 'Community Evangelism']);

-- Success message
SELECT 
    COUNT(*) as leaders_added,
    'Personal Ministry Leader (Erick Mogeni) has been added successfully!' as message
FROM church_leaders 
WHERE name = 'Erick Mogeni' AND created_at >= NOW() - INTERVAL '1 minute';

-- Display all ministry leaders to confirm
SELECT 
    display_order,
    name,
    position,
    category,
    phone
FROM church_leaders 
WHERE category = 'ministry' AND is_active = true
ORDER BY display_order;