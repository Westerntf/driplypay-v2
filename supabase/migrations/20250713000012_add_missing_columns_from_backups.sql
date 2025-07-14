-- Consolidated Missing Columns Migration
-- This migration adds all the missing columns that were in the backed-up schema files
-- Fixed version without the problematic function conflicts

-- =============================================================================
-- PROFILES TABLE - Add missing columns
-- =============================================================================

-- Section visibility controls
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS show_social_links BOOLEAN DEFAULT true;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS show_payment_methods BOOLEAN DEFAULT true;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS show_goals BOOLEAN DEFAULT true;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS show_qr_codes BOOLEAN DEFAULT true;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS show_recent_supporters BOOLEAN DEFAULT true;

-- Profile statistics and features
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS followers_count INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS total_earnings INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS tip_amounts INTEGER[] DEFAULT ARRAY[500, 1000, 2500, 5000, 10000];
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS custom_tip_enabled BOOLEAN DEFAULT true;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS min_tip_amount INTEGER DEFAULT 500;

-- Additional profile fields
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS display_name TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS email_notifications BOOLEAN DEFAULT true;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS stripe_account_id TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_pro BOOLEAN DEFAULT false;

-- =============================================================================
-- SOCIAL_LINKS TABLE - Add missing columns
-- =============================================================================

ALTER TABLE social_links ADD COLUMN IF NOT EXISTS username TEXT;
ALTER TABLE social_links ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;
ALTER TABLE social_links ADD COLUMN IF NOT EXISTS order_index INTEGER DEFAULT 0;
ALTER TABLE social_links ADD COLUMN IF NOT EXISTS enabled BOOLEAN DEFAULT true;

-- =============================================================================
-- PAYMENT_METHODS TABLE - Add missing columns
-- =============================================================================

ALTER TABLE payment_methods ADD COLUMN IF NOT EXISTS handle TEXT;
ALTER TABLE payment_methods ADD COLUMN IF NOT EXISTS total_earnings INTEGER DEFAULT 0;
ALTER TABLE payment_methods ADD COLUMN IF NOT EXISTS total_clicks INTEGER DEFAULT 0;
ALTER TABLE payment_methods ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;
ALTER TABLE payment_methods ADD COLUMN IF NOT EXISTS order_index INTEGER DEFAULT 0;
ALTER TABLE payment_methods ADD COLUMN IF NOT EXISTS enabled BOOLEAN DEFAULT true;
ALTER TABLE payment_methods ADD COLUMN IF NOT EXISTS preferred BOOLEAN DEFAULT false;

-- =============================================================================
-- GOALS TABLE - Add missing columns
-- =============================================================================

ALTER TABLE goals ADD COLUMN IF NOT EXISTS payment_method_id UUID REFERENCES payment_methods(id) ON DELETE SET NULL;
ALTER TABLE goals ADD COLUMN IF NOT EXISTS achieved_at TIMESTAMPTZ;
ALTER TABLE goals ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- =============================================================================
-- QRCODES TABLE - Add missing columns (if table exists)
-- =============================================================================

-- Check if qrcodes table exists and add columns
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'qrcodes' AND table_schema = 'public') THEN
        -- Add missing QR code customization columns
        ALTER TABLE qrcodes ADD COLUMN IF NOT EXISTS name TEXT DEFAULT 'QR Code';
        ALTER TABLE qrcodes ADD COLUMN IF NOT EXISTS data_content TEXT;
        ALTER TABLE qrcodes ADD COLUMN IF NOT EXISTS description TEXT;
        ALTER TABLE qrcodes ADD COLUMN IF NOT EXISTS qr_image_url TEXT;
        ALTER TABLE qrcodes ADD COLUMN IF NOT EXISTS style_preset TEXT DEFAULT 'modern';
        ALTER TABLE qrcodes ADD COLUMN IF NOT EXISTS foreground_color TEXT DEFAULT '#000000';
        ALTER TABLE qrcodes ADD COLUMN IF NOT EXISTS background_color TEXT DEFAULT '#FFFFFF';
        ALTER TABLE qrcodes ADD COLUMN IF NOT EXISTS logo_url TEXT;
        ALTER TABLE qrcodes ADD COLUMN IF NOT EXISTS corner_style TEXT DEFAULT 'rounded';
        ALTER TABLE qrcodes ADD COLUMN IF NOT EXISTS include_payment_amount BOOLEAN DEFAULT false;
        ALTER TABLE qrcodes ADD COLUMN IF NOT EXISTS payment_amount INTEGER;
        ALTER TABLE qrcodes ADD COLUMN IF NOT EXISTS scan_count INTEGER DEFAULT 0;
        ALTER TABLE qrcodes ADD COLUMN IF NOT EXISTS scans INTEGER DEFAULT 0;
        ALTER TABLE qrcodes ADD COLUMN IF NOT EXISTS last_scanned_at TIMESTAMPTZ;
        ALTER TABLE qrcodes ADD COLUMN IF NOT EXISTS linked_social_link_id UUID REFERENCES social_links(id) ON DELETE SET NULL;
        ALTER TABLE qrcodes ADD COLUMN IF NOT EXISTS linked_payment_method_id UUID REFERENCES payment_methods(id) ON DELETE SET NULL;
        ALTER TABLE qrcodes ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
    END IF;
END $$;

-- =============================================================================
-- CREATE HELPFUL INDEXES
-- =============================================================================

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_is_pro ON profiles(is_pro);
CREATE INDEX IF NOT EXISTS idx_profiles_total_earnings ON profiles(total_earnings);
CREATE INDEX IF NOT EXISTS idx_social_links_enabled ON social_links(enabled);
CREATE INDEX IF NOT EXISTS idx_social_links_order ON social_links(order_index);
CREATE INDEX IF NOT EXISTS idx_payment_methods_enabled ON payment_methods(enabled);
CREATE INDEX IF NOT EXISTS idx_payment_methods_preferred ON payment_methods(preferred);
CREATE INDEX IF NOT EXISTS idx_payment_methods_order ON payment_methods(order_index);
CREATE INDEX IF NOT EXISTS idx_goals_is_active ON goals(is_active);
CREATE INDEX IF NOT EXISTS idx_goals_payment_method ON goals(payment_method_id);

-- =============================================================================
-- ADD HELPFUL COMMENTS
-- =============================================================================

COMMENT ON COLUMN profiles.show_social_links IS 'Controls visibility of social links section';
COMMENT ON COLUMN profiles.show_payment_methods IS 'Controls visibility of payment methods section';
COMMENT ON COLUMN profiles.show_goals IS 'Controls visibility of goals section';
COMMENT ON COLUMN profiles.show_qr_codes IS 'Controls visibility of QR codes section';
COMMENT ON COLUMN profiles.is_pro IS 'Whether user has Pro subscription';
COMMENT ON COLUMN social_links.enabled IS 'Whether this social link is active';
COMMENT ON COLUMN payment_methods.preferred IS 'Whether this is the preferred payment method';
COMMENT ON COLUMN goals.is_active IS 'Whether this goal is currently active';
