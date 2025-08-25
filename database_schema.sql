-- Thika Main SDA Church Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(50) DEFAULT 'MEMBER' CHECK (role IN ('SUPER_ADMIN', 'ADMIN', 'MINISTRY_LEADER', 'DEPARTMENT_HEAD', 'ELDER', 'MEMBER', 'VISITOR')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Church Members
CREATE TABLE IF NOT EXISTS members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    membership_number VARCHAR(50) UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE,
    address TEXT,
    phone VARCHAR(20),
    email VARCHAR(255),
    marital_status VARCHAR(20) CHECK (marital_status IN ('single', 'married', 'divorced', 'widowed')),
    baptism_date DATE,
    membership_date DATE,
    is_active BOOLEAN DEFAULT true,
    emergency_contact JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sermons
CREATE TABLE IF NOT EXISTS sermons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    speaker VARCHAR(255),
    sermon_date DATE NOT NULL,
    audio_url VARCHAR(500),
    video_url VARCHAR(500),
    notes_url VARCHAR(500),
    series VARCHAR(255),
    tags TEXT[],
    is_published BOOLEAN DEFAULT false,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE,
    location VARCHAR(255),
    event_type VARCHAR(100),
    max_attendees INTEGER,
    current_attendees INTEGER DEFAULT 0,
    cost DECIMAL(10,2) DEFAULT 0,
    requires_registration BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT false,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ministries
CREATE TABLE IF NOT EXISTS ministries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    leader_id UUID REFERENCES users(id) ON DELETE SET NULL,
    meeting_schedule VARCHAR(255),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(20),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Departments
CREATE TABLE IF NOT EXISTS departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    head_id UUID REFERENCES users(id) ON DELETE SET NULL,
    budget_allocation DECIMAL(12,2),
    contact_info JSONB,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Giving Records
CREATE TABLE IF NOT EXISTS giving_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_id UUID REFERENCES members(id) ON DELETE SET NULL,
    amount DECIMAL(10,2) NOT NULL,
    giving_type VARCHAR(100) NOT NULL CHECK (giving_type IN ('tithe', 'offering', 'special_project', 'building_fund', 'missions')),
    payment_method VARCHAR(50) CHECK (payment_method IN ('mpesa', 'cash', 'bank_transfer', 'check')),
    transaction_id VARCHAR(255),
    giving_date DATE NOT NULL,
    notes TEXT,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- M-PESA Payment Logs
CREATE TABLE IF NOT EXISTS payment_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    checkout_request_id VARCHAR(255),
    merchant_request_id VARCHAR(255),
    conversation_id VARCHAR(255),
    originator_conversation_id VARCHAR(255),
    transaction_id VARCHAR(255),
    result_type INTEGER,
    result_code INTEGER,
    result_desc TEXT,
    result_parameters JSONB DEFAULT '[]'::jsonb,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed', 'timeout', 'cancelled')),
    amount DECIMAL(10,2),
    phone_number VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Prayer Requests
CREATE TABLE IF NOT EXISTS prayer_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    requester_id UUID REFERENCES users(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    urgency VARCHAR(20) DEFAULT 'normal' CHECK (urgency IN ('low', 'normal', 'high', 'urgent')),
    privacy_level VARCHAR(20) DEFAULT 'private' CHECK (privacy_level IN ('public', 'private', 'leadership_only')),
    status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'answered', 'closed')),
    assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
    -- Public submission fields (for non-authenticated users)
    submitter_name VARCHAR(255),
    submitter_email VARCHAR(255),
    submitter_phone VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Announcements
CREATE TABLE IF NOT EXISTS announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    start_date DATE NOT NULL,
    end_date DATE,
    target_audience VARCHAR(100) DEFAULT 'all' CHECK (target_audience IN ('all', 'members', 'visitors', 'ministry_leaders', 'elders')),
    is_published BOOLEAN DEFAULT false,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Attendance Tracking
CREATE TABLE IF NOT EXISTS attendance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    member_id UUID REFERENCES members(id) ON DELETE CASCADE,
    attendance_date DATE NOT NULL,
    service_type VARCHAR(100) CHECK (service_type IN ('sabbath_school', 'divine_service', 'prayer_meeting', 'youth_meeting', 'special_event')),
    present BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(event_id, member_id, attendance_date)
);

-- Budget Management
CREATE TABLE IF NOT EXISTS budgets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category VARCHAR(255) NOT NULL,
    allocated_amount DECIMAL(10,2) NOT NULL,
    year INTEGER NOT NULL,
    description TEXT,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(category, year)
);

-- Expense Tracking
CREATE TABLE IF NOT EXISTS expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    budget_id UUID REFERENCES budgets(id) ON DELETE SET NULL,
    category VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    description TEXT NOT NULL,
    expense_date DATE NOT NULL DEFAULT CURRENT_DATE,
    receipt_url VARCHAR(500),
    approved_by UUID REFERENCES users(id) ON DELETE SET NULL,
    is_approved BOOLEAN DEFAULT false,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Church Leaders Management
CREATE TABLE IF NOT EXISTS church_leaders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL CHECK (category IN ('pastoral', 'elder', 'officer', 'ministry', 'department')),
    email VARCHAR(255),
    phone VARCHAR(20),
    bio TEXT,
    years_of_service INTEGER,
    specialties TEXT[],
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    photo_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_members_user_id ON members(user_id);
CREATE INDEX IF NOT EXISTS idx_members_active ON members(is_active);
CREATE INDEX IF NOT EXISTS idx_sermons_date ON sermons(sermon_date DESC);
CREATE INDEX IF NOT EXISTS idx_sermons_published ON sermons(is_published);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(start_date);
CREATE INDEX IF NOT EXISTS idx_events_published ON events(is_published);
CREATE INDEX IF NOT EXISTS idx_giving_date ON giving_records(giving_date DESC);
CREATE INDEX IF NOT EXISTS idx_giving_member ON giving_records(member_id);
CREATE INDEX IF NOT EXISTS idx_prayer_requests_status ON prayer_requests(status);
CREATE INDEX IF NOT EXISTS idx_announcements_published ON announcements(is_published);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance(attendance_date DESC);
-- Messages table indexes
CREATE INDEX IF NOT EXISTS idx_messages_status ON messages(status);
CREATE INDEX IF NOT EXISTS idx_messages_recipient ON messages(recipient_name, recipient_role);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_department ON messages(department);
CREATE INDEX IF NOT EXISTS idx_messages_sender_email ON messages(sender_email);
CREATE INDEX IF NOT EXISTS idx_church_leaders_category ON church_leaders(category);
CREATE INDEX IF NOT EXISTS idx_church_leaders_active ON church_leaders(is_active);
CREATE INDEX IF NOT EXISTS idx_church_leaders_order ON church_leaders(display_order);
-- Budget and expense indexes
CREATE INDEX IF NOT EXISTS idx_budgets_year ON budgets(year);
CREATE INDEX IF NOT EXISTS idx_budgets_category ON budgets(category);
CREATE INDEX IF NOT EXISTS idx_expenses_date ON expenses(expense_date DESC);
CREATE INDEX IF NOT EXISTS idx_expenses_category ON expenses(category);
CREATE INDEX IF NOT EXISTS idx_expenses_budget_id ON expenses(budget_id);
CREATE INDEX IF NOT EXISTS idx_expenses_approved ON expenses(is_approved);

-- Admin Activity Logs Table
CREATE TABLE admin_activity_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    admin_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    details JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System Settings Table
CREATE TABLE system_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    key VARCHAR(100) UNIQUE NOT NULL,
    value TEXT,
    description TEXT,
    updated_by UUID REFERENCES users(id) ON DELETE SET NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages table for centralized messaging system
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Sender Information
    sender_name VARCHAR(255) NOT NULL,
    sender_email VARCHAR(255) NOT NULL,
    sender_phone VARCHAR(50),

    -- Message Content
    subject VARCHAR(500) NOT NULL,
    message TEXT NOT NULL,

    -- Recipient Information
    recipient_name VARCHAR(255) NOT NULL,
    recipient_role VARCHAR(255) NOT NULL,
    recipient_email VARCHAR(255),
    department VARCHAR(255),

    -- Status Tracking
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed', 'read')),
    email_sent_at TIMESTAMP WITH TIME ZONE,
    email_error TEXT,
    read_at TIMESTAMP WITH TIME ZONE,

    -- Metadata
    source VARCHAR(100) DEFAULT 'website' CHECK (source IN ('website', 'admin', 'api')),
    priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    submission_type VARCHAR(100), -- Type of submission (Department Reports, Visitation Requests, etc.)

    -- File Attachments
    attachments JSONB DEFAULT '[]'::jsonb, -- Array of file objects with name, url, size, type

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add permissions column to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS permissions JSONB DEFAULT '[]'::jsonb;

-- Insert default system settings
INSERT INTO system_settings (key, value, description) VALUES
('church_name', 'Seventh-day Adventist Church - Thika Main', 'Official church name'),
('church_address', '', 'Church physical address'),
('church_phone', '', 'Church contact phone number'),
('church_email', '', 'Church contact email address'),
('church_website', '', 'Church website URL'),
('pastor_name', '', 'Lead pastor name'),
('established_year', '', 'Year the church was established'),
('denomination', 'Seventh-day Adventist', 'Church denomination'),
('sabbath_service_time', '09:00', 'Sabbath service start time'),
('prayer_meeting_time', '18:00', 'Prayer meeting start time'),
('youth_meeting_time', '15:00', 'Youth meeting start time'),
('bible_study_time', '18:30', 'Bible study start time'),
('service_duration', '120', 'Average service duration in minutes'),
('currency', 'KES', 'Default currency for financial transactions'),
('enable_online_giving', 'false', 'Enable online giving functionality'),
('financial_year_start', 'January', 'Financial year start month'),
('session_timeout', '480', 'Session timeout in minutes'),
('password_min_length', '6', 'Minimum password length'),
('require_2fa', 'false', 'Require two-factor authentication'),
('login_attempts_limit', '5', 'Maximum login attempts before lockout'),
('lockout_duration', '30', 'Account lockout duration in minutes'),
('enable_audit_logs', 'true', 'Enable audit logging'),
('backup_frequency', 'daily', 'Backup frequency'),
('email_notifications', 'true', 'Enable email notifications'),
('sms_notifications', 'false', 'Enable SMS notifications'),
('birthday_reminders', 'true', 'Send birthday reminders'),
('event_reminders', 'true', 'Send event reminders'),
('payment_confirmations', 'true', 'Send payment confirmations'),
('attendance_followups', 'false', 'Send attendance follow-ups'),
('reminder_hours_before', '24', 'Event reminder hours before event')
ON CONFLICT (key) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_admin_activity_logs_admin_id ON admin_activity_logs(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_activity_logs_action ON admin_activity_logs(action);
CREATE INDEX IF NOT EXISTS idx_admin_activity_logs_created_at ON admin_activity_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_system_settings_key ON system_settings(key);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE sermons ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE ministries ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE giving_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE prayer_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users policies
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- Members policies
CREATE POLICY "Members can view own profile" ON members FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Admins can manage all members" ON members FOR ALL USING (
    EXISTS (
        SELECT 1 FROM users 
        WHERE users.id = auth.uid() 
        AND users.role IN ('SUPER_ADMIN', 'ADMIN')
    )
);

-- Sermons policies
CREATE POLICY "Public can view published sermons" ON sermons FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can manage all sermons" ON sermons FOR ALL USING (
    EXISTS (
        SELECT 1 FROM users 
        WHERE users.id = auth.uid() 
        AND users.role IN ('SUPER_ADMIN', 'ADMIN')
    )
);

-- Events policies
CREATE POLICY "Public can view published events" ON events FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can manage all events" ON events FOR ALL USING (
    EXISTS (
        SELECT 1 FROM users 
        WHERE users.id = auth.uid() 
        AND users.role IN ('SUPER_ADMIN', 'ADMIN')
    )
);

-- Giving records policies
CREATE POLICY "Members can view own giving" ON giving_records FOR SELECT USING (
    member_id IN (
        SELECT id FROM members WHERE user_id = auth.uid()
    )
);
CREATE POLICY "Admins can view all giving" ON giving_records FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM users 
        WHERE users.id = auth.uid() 
        AND users.role IN ('SUPER_ADMIN', 'ADMIN')
    )
);

-- Prayer requests policies
CREATE POLICY "Users can view own prayer requests" ON prayer_requests FOR SELECT USING (requester_id = auth.uid());
CREATE POLICY "Public prayer requests visible to all" ON prayer_requests FOR SELECT USING (privacy_level = 'public');
CREATE POLICY "Leadership can view leadership-only requests" ON prayer_requests FOR SELECT USING (
    privacy_level = 'leadership_only' AND
    EXISTS (
        SELECT 1 FROM users 
        WHERE users.id = auth.uid() 
        AND users.role IN ('SUPER_ADMIN', 'ADMIN', 'ELDER')
    )
);

-- Announcements policies
CREATE POLICY "Public can view published announcements" ON announcements FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can manage announcements" ON announcements FOR ALL USING (
    EXISTS (
        SELECT 1 FROM users
        WHERE users.id = auth.uid()
        AND users.role IN ('SUPER_ADMIN', 'ADMIN')
    )
);

-- Messages policies
CREATE POLICY "Admin can view all messages" ON messages FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM users
        WHERE users.id = auth.uid()
        AND users.role IN ('SUPER_ADMIN', 'ADMIN', 'ELDER')
    )
);

CREATE POLICY "Admin can update message status" ON messages FOR UPDATE USING (
    EXISTS (
        SELECT 1 FROM users
        WHERE users.id = auth.uid()
        AND users.role IN ('SUPER_ADMIN', 'ADMIN', 'ELDER')
    )
);

-- Allow public insert for contact forms
CREATE POLICY "Allow public message creation" ON messages FOR INSERT WITH CHECK (true);

-- Budget policies
CREATE POLICY "Admins can manage budgets" ON budgets FOR ALL USING (
    EXISTS (
        SELECT 1 FROM users
        WHERE users.id = auth.uid()
        AND users.role IN ('SUPER_ADMIN', 'ADMIN')
    )
);

-- Expense policies
CREATE POLICY "Admins can manage expenses" ON expenses FOR ALL USING (
    EXISTS (
        SELECT 1 FROM users
        WHERE users.id = auth.uid()
        AND users.role IN ('SUPER_ADMIN', 'ADMIN')
    )
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_members_updated_at BEFORE UPDATE ON members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sermons_updated_at BEFORE UPDATE ON sermons FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_ministries_updated_at BEFORE UPDATE ON ministries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_departments_updated_at BEFORE UPDATE ON departments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_prayer_requests_updated_at BEFORE UPDATE ON prayer_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON announcements FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_messages_updated_at BEFORE UPDATE ON messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_budgets_updated_at BEFORE UPDATE ON budgets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_expenses_updated_at BEFORE UPDATE ON expenses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample admin user (you'll need to create this user in Supabase Auth first)
-- This is just a placeholder - you'll need to replace with actual user ID after creating in Supabase Auth
-- INSERT INTO users (id, email, full_name, role) VALUES 
-- ('your-user-id-here', 'admin@thikamainsdachurch.org', 'Church Administrator', 'SUPER_ADMIN');

-- Insert initial church leaders data
INSERT INTO church_leaders (name, position, category, email, phone, bio, display_order, specialties) VALUES
-- Pastoral Team
('Pst. Charles Muritu', 'Senior Pastor', 'pastoral', 'muritunganga77@gmail.com', '+254 729 071 755', 'Leading our congregation with wisdom and dedication, Pastor Charles guides our church family in spiritual growth and community service.', 1, ARRAY['Pastoral Care', 'Biblical Teaching', 'Church Leadership']),

-- Church Elders
('Elder Methucellah Mokua', 'First Elder', 'elder', 'mokuamariera@gmail.com', '+254 726 028 004', 'Serving as our First Elder, Elder Methucellah provides spiritual guidance and oversight to our church board and congregation.', 2, ARRAY['Church Governance', 'Spiritual Guidance', 'Leadership']),
('Elder Abraham Sayah', 'Church Elder', 'elder', 'sayahabraham22@gmail.com', '+254 705 476 095', 'Dedicated elder serving the church with wisdom and commitment.', 3, ARRAY['Spiritual Guidance', 'Church Administration']),
('Elder Reuben Lusasi', 'Church Elder & Family Life Ministry', 'elder', 'rlusasi@yahoo.com', '+254 721 885 849', 'Elder focused on family life ministry and spiritual guidance.', 4, ARRAY['Family Life Ministry', 'Counseling', 'Spiritual Guidance']),
('Elder James Mauti', 'Church Elder', 'elder', 'jamesmogere530@gmail.com', '+254 711 617 542', 'Committed elder serving the church community.', 5, ARRAY['Spiritual Guidance', 'Church Administration']),
('Elder David Juma', 'Church Elder', 'elder', 'davyjumah@gmail.com', '+254 724 322 889', 'Faithful elder dedicated to church service.', 6, ARRAY['Spiritual Guidance', 'Church Administration']),

-- Church Officers
('Kefa Nyakundi', 'Head Deacon', 'officer', NULL, '+254 724 357 783', 'Coordinating our deacon board and ensuring smooth church operations, Deacon Kefa serves with dedication and commitment.', 7, ARRAY['Church Administration', 'Facilities Management', 'Stewardship']),
('Edwina Odongo', 'Head Deaconess', 'officer', NULL, '+254 723 506 923', 'Leading the deaconess ministry with grace and dedication.', 8, ARRAY['Deaconess Ministry', 'Church Service', 'Community Care']),
('Effie Muthoni', 'Church Clerk', 'officer', 'effiemuthoni3@gmail.com', '+254 723 379 186', 'Managing church records and administrative duties with precision and care.', 9, ARRAY['Church Administration', 'Record Keeping', 'Communication']),
('Joseph Kimilu', 'Church Treasurer', 'officer', 'jkimilu963@gmail.com', '+254 720 930 703', 'Overseeing church finances with integrity and transparency.', 10, ARRAY['Financial Management', 'Stewardship', 'Church Administration']),

-- Ministry Leaders
('Duncan Mageto', 'Youth Ministry Leader', 'ministry', 'duncanmageto76@gmail.com', '+254 704 385 185', 'Empowering young people to grow in faith and serve their community.', 11, ARRAY['Youth Ministry', 'Community Service', 'Leadership Development']),
('Erick Yonni', 'Children''s Ministry Leader', 'ministry', 'erickyonni@gmail.com', '+254 723 522 933', 'Nurturing children in their relationship with Jesus Christ.', 12, ARRAY['Children''s Ministry', 'Education', 'Child Development']),
('Joan Ouma', 'Women''s Ministry (AWM) Leader', 'ministry', NULL, '+254 726 385 813', 'Supporting and encouraging women in their spiritual journey.', 13, ARRAY['Women''s Ministry', 'AWM Programs', 'Community Service']),
('Benard Mogere', 'Men''s Ministry (AMM) Leader', 'ministry', NULL, '+254 721 785 862', 'Building strong Christian men and fathers through fellowship and service.', 14, ARRAY['Men''s Ministry', 'Mentorship', 'Community Projects']),
('Paul Odongo', 'Music Coordinator', 'ministry', 'paulodongo43@gmail.com', '+254 720 051 277', 'Coordinating music ministry and worship services.', 15, ARRAY['Music Ministry', 'Worship Leading', 'Music Training']),
('Justus Arita', 'Choir Director', 'ministry', 'justusarita@gmail.com', '+254 721 880 818', 'Leading our choir ministry with beautiful harmonies and spiritual songs.', 16, ARRAY['Choir Ministry', 'Music Training', 'Worship Leading']),

-- Department Leaders
('Paul Odhiambo', 'Strategic Planning Department Head', 'department', 'odhiambop57@gmail.com', '+254 721 153 152', 'Leading strategic planning and church development initiatives.', 17, ARRAY['Strategic Planning', 'Church Development', 'Leadership']),
('Charles Kyalo', 'Communication Department Head', 'department', 'charleskyalo77@gmail.com', '+254 722 937 200', 'Managing church communication and outreach efforts.', 18, ARRAY['Communication', 'Media', 'Outreach']),
('Margaret Nyambati', 'Development Department Head', 'department', 'margymoraa@gmail.com', '+254 717 688 343', 'Overseeing church development and infrastructure projects.', 19, ARRAY['Development', 'Project Management', 'Infrastructure']),
('Elizabeth Sapato', 'Health Ministry Leader', 'ministry', NULL, '+254 724 590 844', 'Promoting health and wellness in our church community.', 20, ARRAY['Health Ministry', 'Community Health', 'Wellness Programs']),
('Rael Karimi', 'Prayer Ministry Leader', 'ministry', NULL, '+254 720 671 289', 'Coordinating prayer ministry and spiritual intercession.', 21, ARRAY['Prayer Ministry', 'Spiritual Intercession', 'Prayer Coordination'])

;

-- Success message
SELECT 'Database schema created successfully! All tables, indexes, policies, and initial leader data are in place. 🎉' as message;
