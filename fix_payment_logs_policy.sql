-- Fix payment_logs table RLS policy for M-PESA integration
-- Run this in your Supabase SQL Editor

-- Add policy to allow public inserts for M-PESA callbacks and demo payments
CREATE POLICY "Allow public payment log inserts" ON payment_logs
    FOR INSERT WITH CHECK (true);

-- Add policy to allow public updates for M-PESA callbacks
CREATE POLICY "Allow public payment log updates" ON payment_logs
    FOR UPDATE USING (true);

-- Add policy to allow admins to view all payment logs
CREATE POLICY "Admins can view all payment logs" ON payment_logs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.role IN ('SUPER_ADMIN', 'ADMIN', 'FINANCE_ADMIN')
        )
    );

-- Success message
SELECT 'Payment logs policies updated successfully! M-PESA integration can now save payment records.' as message;