-- Migration script to add existing hardcoded sermons to the database
-- Run this script to populate the sermons table with existing content

INSERT INTO sermons (title, speaker, sermon_date, video_url, audio_url, series, is_published, description, created_at, updated_at) VALUES

-- Sermon 1: ARE YOUR FEET BLESSED
('ARE YOUR FEET BLESSED', 'Pastor Charles Muritu', '2025-06-21', 'https://www.youtube.com/live/WPIfcmn6RE0?si=MEw4iMufQZJpbSor', NULL, 'Blessings', true, 'A powerful message about walking in God''s blessings and being a blessing to others.', NOW(), NOW()),

-- Sermon 2: ELDERS SABBATH
('ELDERS SABBATH', 'Elder Methuselah', '2025-07-19', 'https://www.youtube.com/live/ay_NGMxuR0o?si=gfPeZvcegetrjiWH', NULL, 'Leadership', true, 'Special message honoring church elders and their role in spiritual leadership.', NOW(), NOW()),

-- Sermon 3: COMMUNICATION SABBATH
('COMMUNICATION SABBATH', 'Elder Kyalo', '2025-07-12', 'https://www.youtube.com/live/JtfzRIkqw2s?si=_ymC4T_wfdeFn5jH', NULL, 'Ministry Focus', true, 'Exploring the importance of effective communication in church ministry and daily life.', NOW(), NOW()),

-- Sermon 4: HOLY COMMUNION SABBATH
('HOLY COMMUNION SABBATH', 'Church Leadership', '2025-06-28', 'https://www.youtube.com/live/rrXGI9oYfbk?si=5YhBKe9vsKzVKt5A', NULL, 'Communion', true, 'Sacred service of Holy Communion, remembering Christ''s sacrifice and love.', NOW(), NOW()),

-- Sermon 5: HAPPY AMM SABBATH
('HAPPY AMM SABBATH', 'Men''s Ministry', '2025-05-31', 'https://www.youtube.com/live/-MnU-wFTxDo?si=JZehySBiUqUwknaR', NULL, 'Men''s Ministry', true, 'Celebrating Adventist Men''s Ministry and their role in church and community.', NOW(), NOW()),

-- Sermon 6: ADVENTURERS SABBATH
('ADVENTURERS SABBATH', 'Children''s Ministry', '2025-05-17', 'https://www.youtube.com/live/LTNkVd_pjcY?si=NetMdg08ihJOHxy_', NULL, 'Adventurers', true, 'Special service celebrating our Adventurer Club and children''s ministry programs.', NOW(), NOW()),

-- Sermon 7: CHAPLAINCY SABBATH
('CHAPLAINCY SABBATH', 'Elder Zachariah Orina', '2025-05-10', 'https://www.youtube.com/live/Idr9iL5pR2A?si=XuRss9ifrqgwARVa', NULL, 'Chaplaincy', true, 'Message focusing on chaplaincy ministry and spiritual care in our community.', NOW(), NOW()),

-- Sermon 8: PERSONAL MINISTRY SABBATH
('PERSONAL MINISTRY SABBATH', 'Personal Ministry Team', '2025-05-03', 'https://www.youtube.com/live/KaA33qnAmns?si=MeHbDyu5HeIzyxC_', NULL, 'Personal Ministry', true, 'Empowering members for personal evangelism and witnessing in daily life.', NOW(), NOW()),

-- Sermon 9: AMBASSADOR'S SABBATH
('AMBASSADOR''S SABBATH', 'Pastor Martin Kiogora', '2025-04-26', 'https://www.youtube.com/live/jWW5Mdwaz0I?si=eOJm5FKVJjCO_YPI', NULL, 'Ambassadors', true, 'Inspiring message for young ambassadors of Christ and their mission.', NOW(), NOW()),

-- Sermon 10: VBS SABBATH
('VBS SABBATH', 'Ratemo', '2025-04-19', 'https://www.youtube.com/live/s5nTrUOZD7A?si=1vDs-A3rADRgdVso', NULL, 'VBS', true, 'Vacation Bible School celebration with special programming for children and families.', NOW(), NOW()),

-- Sermon 11: CHOIR DAY SABBATH
('CHOIR DAY SABBATH', 'Pastor Emmanuel Marwa', '2025-04-12', 'https://www.youtube.com/live/7fWm2uA_QNM?si=VQ-i_KBxgc-UIK8W', NULL, 'Choir Ministry', true, 'Celebrating our choir ministry with special music and worship.', NOW(), NOW()),

-- Sermon 12: FAMILY LIFE SABBATH
('FAMILY LIFE SABBATH', 'Elder Geoffrey Mutinda', '2025-04-05', 'https://www.youtube.com/live/usHu73k9yFE?si=SYVzUFat_LLm4vWr', NULL, 'Family Life', true, 'Strengthening family relationships and building Christ-centered homes.', NOW(), NOW());

-- Verify the insertion
SELECT COUNT(*) as total_sermons FROM sermons;
SELECT title, speaker, sermon_date, is_published FROM sermons ORDER BY sermon_date DESC;
