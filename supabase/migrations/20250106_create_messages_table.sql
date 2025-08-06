-- Create messages table for centralized messaging system
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
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
  email_sent_at TIMESTAMPTZ,
  email_error TEXT,
  read_at TIMESTAMPTZ,
  
  -- Metadata
  source VARCHAR(100) DEFAULT 'website' CHECK (source IN ('website', 'admin', 'api')),
  priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_messages_status ON messages(status);
CREATE INDEX IF NOT EXISTS idx_messages_recipient ON messages(recipient_name, recipient_role);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_department ON messages(department);
CREATE INDEX IF NOT EXISTS idx_messages_sender_email ON messages(sender_email);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_messages_updated_at 
    BEFORE UPDATE ON messages 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
CREATE POLICY "Admin can view all messages" ON messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid()
            AND users.role IN ('SUPER_ADMIN', 'ADMIN')
        )
    );

CREATE POLICY "Admin can update message status" ON messages
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid()
            AND users.role IN ('SUPER_ADMIN', 'ADMIN')
        )
    );

-- Allow public insert for contact forms (will be handled by service)
CREATE POLICY "Allow public message creation" ON messages
    FOR INSERT WITH CHECK (true);

-- Create a view for message statistics
CREATE OR REPLACE VIEW message_stats AS
SELECT 
    COUNT(*) as total_messages,
    COUNT(*) FILTER (WHERE status = 'pending') as pending_messages,
    COUNT(*) FILTER (WHERE status = 'sent') as sent_messages,
    COUNT(*) FILTER (WHERE status = 'failed') as failed_messages,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as messages_this_month,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '7 days') as messages_this_week,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE) as messages_today,
    AVG(EXTRACT(EPOCH FROM (email_sent_at - created_at))/60) FILTER (WHERE email_sent_at IS NOT NULL) as avg_response_time_minutes
FROM messages;

-- Grant access to the view
GRANT SELECT ON message_stats TO authenticated, anon;

COMMENT ON TABLE messages IS 'Centralized storage for all website contact form messages';
COMMENT ON COLUMN messages.status IS 'Message processing status: pending (new), sent (email forwarded), failed (email error), read (admin viewed)';
COMMENT ON COLUMN messages.source IS 'Where the message originated from';
COMMENT ON COLUMN messages.priority IS 'Message priority level for admin sorting';
