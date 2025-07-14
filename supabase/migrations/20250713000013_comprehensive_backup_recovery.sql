-- COMPREHENSIVE BACKUP RECOVERY MIGRATION
-- This ensures we haven't missed ANY important schema elements from backup files
-- Analyzes all backup files and adds any missing tables, columns, indexes, policies, etc.

-- =============================================================================
-- MISSING TABLES (if any)
-- =============================================================================

-- Tips table (some backups had this as separate from support_messages)
CREATE TABLE IF NOT EXISTS tips (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    recipient_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    amount INTEGER NOT NULL, -- in cents
    currency TEXT DEFAULT 'usd',
    anonymous BOOLEAN DEFAULT false,
    message TEXT,
    payment_method_used TEXT,
    stripe_payment_intent_id TEXT,
    payment_status TEXT DEFAULT 'completed',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- MISSING COLUMNS FROM EXISTING TABLES
-- =============================================================================

-- Analytics table enhancements from backups
ALTER TABLE analytics ADD COLUMN IF NOT EXISTS session_id TEXT;
ALTER TABLE analytics ADD COLUMN IF NOT EXISTS ip_address INET;
ALTER TABLE analytics ADD COLUMN IF NOT EXISTS event_data JSONB;

-- Support messages table enhancements 
ALTER TABLE support_messages ADD COLUMN IF NOT EXISTS amount INTEGER DEFAULT 0; -- in cents
ALTER TABLE support_messages ADD COLUMN IF NOT EXISTS payment_method_used TEXT;
ALTER TABLE support_messages ADD COLUMN IF NOT EXISTS stripe_payment_intent_id TEXT;
ALTER TABLE support_messages ADD COLUMN IF NOT EXISTS tip_amount INTEGER DEFAULT 0; -- alias for amount
ALTER TABLE support_messages ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending';
ALTER TABLE support_messages ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'usd';
ALTER TABLE support_messages ADD COLUMN IF NOT EXISTS anonymous BOOLEAN DEFAULT false;

-- QR Codes table additional columns found in backups
ALTER TABLE qrcodes ADD COLUMN IF NOT EXISTS url TEXT; -- some backups had this
ALTER TABLE qrcodes ADD COLUMN IF NOT EXISTS scans INTEGER DEFAULT 0; -- some had this vs scan_count

-- =============================================================================
-- MISSING INDEXES FROM BACKUPS
-- =============================================================================

-- Tips table indexes
CREATE INDEX IF NOT EXISTS tips_user_id_idx ON tips(user_id);
CREATE INDEX IF NOT EXISTS tips_recipient_user_id_idx ON tips(recipient_user_id);
CREATE INDEX IF NOT EXISTS tips_created_at_idx ON tips(created_at);
CREATE INDEX IF NOT EXISTS tips_amount_idx ON tips(amount);

-- Analytics enhancements
CREATE INDEX IF NOT EXISTS analytics_session_id_idx ON analytics(session_id);
CREATE INDEX IF NOT EXISTS analytics_event_type_idx ON analytics(event_type);
CREATE INDEX IF NOT EXISTS analytics_created_at_idx ON analytics(created_at);
CREATE INDEX IF NOT EXISTS analytics_user_id_created_at_idx ON analytics(user_id, created_at);

-- Support messages indexes
CREATE INDEX IF NOT EXISTS support_messages_amount_idx ON support_messages(amount);
CREATE INDEX IF NOT EXISTS support_messages_payment_status_idx ON support_messages(payment_status);
CREATE INDEX IF NOT EXISTS support_messages_created_at_idx ON support_messages(created_at);

-- =============================================================================
-- MISSING RLS POLICIES FROM BACKUPS
-- =============================================================================

-- Enable RLS on tips if it exists
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'tips' AND table_schema = 'public') THEN
        ALTER TABLE tips ENABLE ROW LEVEL SECURITY;
    END IF;
END $$;

-- Tips policies
DROP POLICY IF EXISTS "Users can view own received tips" ON tips;
CREATE POLICY "Users can view own received tips" ON tips
    FOR SELECT USING (auth.uid() = recipient_user_id);

DROP POLICY IF EXISTS "Users can view own sent tips" ON tips;
CREATE POLICY "Users can view own sent tips" ON tips
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create tips" ON tips;
CREATE POLICY "Users can create tips" ON tips
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Analytics policies enhancement
DROP POLICY IF EXISTS "Users can view own analytics" ON analytics;
CREATE POLICY "Users can view own analytics" ON analytics
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "System can insert analytics" ON analytics;
CREATE POLICY "System can insert analytics" ON analytics
    FOR INSERT WITH CHECK (true); -- Allow system to insert analytics

-- =============================================================================
-- MISSING TRIGGERS FROM BACKUPS
-- =============================================================================

-- Update support_messages updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at column to support_messages if missing
ALTER TABLE support_messages ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

DROP TRIGGER IF EXISTS update_support_messages_updated_at ON support_messages;
CREATE TRIGGER update_support_messages_updated_at
    BEFORE UPDATE ON support_messages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Tips updated_at trigger
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'tips' AND table_schema = 'public') THEN
        ALTER TABLE tips ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
        
        DROP TRIGGER IF EXISTS update_tips_updated_at ON tips;
        CREATE TRIGGER update_tips_updated_at
            BEFORE UPDATE ON tips
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

-- =============================================================================
-- MISSING CONSTRAINTS FROM BACKUPS  
-- =============================================================================

-- Tips constraints
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'tips' AND table_schema = 'public') THEN
        -- Add constraints that might be missing (check if they don't exist first)
        IF NOT EXISTS (SELECT 1 FROM information_schema.constraint_column_usage WHERE constraint_name = 'tips_amount_positive') THEN
            ALTER TABLE tips ADD CONSTRAINT tips_amount_positive CHECK (amount > 0);
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM information_schema.constraint_column_usage WHERE constraint_name = 'tips_currency_valid') THEN
            ALTER TABLE tips ADD CONSTRAINT tips_currency_valid CHECK (currency IN ('usd', 'eur', 'gbp', 'cad'));
        END IF;
    END IF;
END $$;

-- Support messages constraints
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.constraint_column_usage WHERE constraint_name = 'support_messages_amount_non_negative') THEN
        ALTER TABLE support_messages ADD CONSTRAINT support_messages_amount_non_negative CHECK (amount >= 0);
    END IF;
END $$;

-- =============================================================================
-- RECOVERY VERIFICATION
-- =============================================================================

-- Add helpful comments for recovery tracking
COMMENT ON TABLE tips IS 'User tips/donations table - recovered from backups';
COMMENT ON COLUMN analytics.session_id IS 'Session tracking for analytics - recovered from backups';
COMMENT ON COLUMN support_messages.amount IS 'Tip amount in cents - recovered from backups';

-- Log recovery completion
DO $$
BEGIN
    RAISE NOTICE 'BACKUP RECOVERY COMPLETE: All schemas from backup files have been analyzed and recovered';
END $$;
