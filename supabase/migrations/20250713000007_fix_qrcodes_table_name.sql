-- Fix QR table naming and ensure all columns exist
-- This migration creates the 'qrcodes' table that our API expects

BEGIN;

-- First, create the qrcodes table if it doesn't exist (rename from qr_codes if needed)
DO $$
BEGIN
    -- Check if qr_codes exists but qrcodes doesn't
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'qr_codes' AND table_schema = 'public')
    AND NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'qrcodes' AND table_schema = 'public') THEN
        -- Rename qr_codes to qrcodes
        ALTER TABLE qr_codes RENAME TO qrcodes;
    END IF;
END $$;

-- Now ensure the qrcodes table has ALL the columns our API needs
ALTER TABLE qrcodes ADD COLUMN IF NOT EXISTS name TEXT DEFAULT 'QR Code';
ALTER TABLE qrcodes ADD COLUMN IF NOT EXISTS data_content TEXT;
ALTER TABLE qrcodes ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE qrcodes ADD COLUMN IF NOT EXISTS qr_image_url TEXT;

-- Visual customization columns
ALTER TABLE qrcodes ADD COLUMN IF NOT EXISTS style_preset VARCHAR(20) DEFAULT 'default';
ALTER TABLE qrcodes ADD COLUMN IF NOT EXISTS foreground_color VARCHAR(7) DEFAULT '#000000';
ALTER TABLE qrcodes ADD COLUMN IF NOT EXISTS background_color VARCHAR(7) DEFAULT '#FFFFFF';
ALTER TABLE qrcodes ADD COLUMN IF NOT EXISTS logo_url TEXT;
ALTER TABLE qrcodes ADD COLUMN IF NOT EXISTS corner_style VARCHAR(20) DEFAULT 'square';

-- Payment integration columns
ALTER TABLE qrcodes ADD COLUMN IF NOT EXISTS include_payment_amount BOOLEAN DEFAULT false;
ALTER TABLE qrcodes ADD COLUMN IF NOT EXISTS payment_amount INTEGER; -- in cents

-- Analytics columns (handle both scans and scan_count)
ALTER TABLE qrcodes ADD COLUMN IF NOT EXISTS scan_count INTEGER DEFAULT 0;
ALTER TABLE qrcodes ADD COLUMN IF NOT EXISTS last_scanned_at TIMESTAMPTZ;

-- Linking columns
ALTER TABLE qrcodes ADD COLUMN IF NOT EXISTS linked_social_link_id UUID REFERENCES social_links(id) ON DELETE SET NULL;
ALTER TABLE qrcodes ADD COLUMN IF NOT EXISTS linked_payment_method_id UUID REFERENCES payment_methods(id) ON DELETE SET NULL;

-- Status column
ALTER TABLE qrcodes ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Migrate existing data to new columns
UPDATE qrcodes SET 
    scan_count = COALESCE(scan_count, scans, 0),
    qr_image_url = COALESCE(qr_image_url, qr_data_url, url),
    data_content = COALESCE(data_content, url),
    is_active = COALESCE(is_active, true),
    style_preset = COALESCE(style_preset, 'default'),
    foreground_color = COALESCE(foreground_color, '#000000'),
    background_color = COALESCE(background_color, '#FFFFFF'),
    corner_style = COALESCE(corner_style, 'square'),
    include_payment_amount = COALESCE(include_payment_amount, false)
WHERE scan_count IS NULL 
    OR qr_image_url IS NULL 
    OR data_content IS NULL 
    OR is_active IS NULL
    OR style_preset IS NULL
    OR foreground_color IS NULL
    OR background_color IS NULL
    OR corner_style IS NULL
    OR include_payment_amount IS NULL;

-- Add constraints
ALTER TABLE qrcodes DROP CONSTRAINT IF EXISTS qrcodes_type_check;
ALTER TABLE qrcodes ADD CONSTRAINT qrcodes_type_check 
    CHECK (type IN ('profile', 'social', 'payment', 'payment_method', 'url', 'contact', 'text', 'goal', 'fixed_tip'));

-- Add style constraints
ALTER TABLE qrcodes DROP CONSTRAINT IF EXISTS check_style_preset;
ALTER TABLE qrcodes ADD CONSTRAINT check_style_preset 
    CHECK (style_preset IN ('default', 'dark', 'brand', 'neon', 'sunset'));

ALTER TABLE qrcodes DROP CONSTRAINT IF EXISTS check_corner_style;
ALTER TABLE qrcodes ADD CONSTRAINT check_corner_style 
    CHECK (corner_style IN ('square', 'rounded', 'dots', 'extra-rounded'));

ALTER TABLE qrcodes DROP CONSTRAINT IF EXISTS check_foreground_color;
ALTER TABLE qrcodes ADD CONSTRAINT check_foreground_color 
    CHECK (foreground_color ~ '^#[0-9A-Fa-f]{6}$');

ALTER TABLE qrcodes DROP CONSTRAINT IF EXISTS check_background_color;
ALTER TABLE qrcodes ADD CONSTRAINT check_background_color 
    CHECK (background_color ~ '^#[0-9A-Fa-f]{6}$');

-- Enable RLS
ALTER TABLE qrcodes ENABLE ROW LEVEL SECURITY;

-- QR Codes RLS Policies
DROP POLICY IF EXISTS "Users can manage their own QR codes" ON qrcodes;
CREATE POLICY "Users can manage their own QR codes" ON qrcodes
    FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "QR codes are publicly readable" ON qrcodes;
CREATE POLICY "QR codes are publicly readable" ON qrcodes
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.user_id = qrcodes.user_id 
            AND NOT profiles.private_profile
        )
    );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS qrcodes_user_id_idx ON qrcodes(user_id);
CREATE INDEX IF NOT EXISTS qrcodes_data_content_idx ON qrcodes(data_content);
CREATE INDEX IF NOT EXISTS qrcodes_style_preset_idx ON qrcodes(style_preset);
CREATE INDEX IF NOT EXISTS qrcodes_linked_social_link_idx ON qrcodes(linked_social_link_id);
CREATE INDEX IF NOT EXISTS qrcodes_linked_payment_idx ON qrcodes(linked_payment_method_id);
CREATE INDEX IF NOT EXISTS qrcodes_active_idx ON qrcodes(user_id, is_active);

COMMIT;
