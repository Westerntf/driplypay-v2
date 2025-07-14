-- Add missing columns to qrcodes table for API compatibility
-- Table has already been renamed from qr_codes to qrcodes

BEGIN;

-- Add missing columns that our QRCodeManager component needs
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
ALTER TABLE qrcodes ADD COLUMN IF NOT EXISTS payment_amount INTEGER;

-- Analytics columns
ALTER TABLE qrcodes ADD COLUMN IF NOT EXISTS scan_count INTEGER DEFAULT 0;
ALTER TABLE qrcodes ADD COLUMN IF NOT EXISTS last_scanned_at TIMESTAMPTZ;

-- Update existing data to populate new columns from existing ones
UPDATE qrcodes SET 
    scan_count = COALESCE(scan_count, scans, 0),
    qr_image_url = COALESCE(qr_image_url, qr_data_url, url),
    data_content = COALESCE(data_content, url),
    style_preset = COALESCE(style_preset, 'default'),
    foreground_color = COALESCE(foreground_color, '#000000'),
    background_color = COALESCE(background_color, '#FFFFFF'),
    corner_style = COALESCE(corner_style, 'square'),
    include_payment_amount = COALESCE(include_payment_amount, false);

COMMIT;
