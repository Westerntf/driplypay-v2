-- Fix QR Codes schema to match component expectations
-- This migration aligns the database schema with the QRCodeManager component

-- Add missing columns using DO block to handle existing columns gracefully
DO $$ 
BEGIN
  -- Add data_content column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='qr_codes' AND column_name='data_content') THEN
    ALTER TABLE qr_codes ADD COLUMN data_content TEXT;
  END IF;
  
  -- Add description column if it doesn't exist  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='qr_codes' AND column_name='description') THEN
    ALTER TABLE qr_codes ADD COLUMN description TEXT;
  END IF;
  
  -- Add qr_image_url column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='qr_codes' AND column_name='qr_image_url') THEN
    ALTER TABLE qr_codes ADD COLUMN qr_image_url TEXT;
  END IF;
  
  -- Add style_preset column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='qr_codes' AND column_name='style_preset') THEN
    ALTER TABLE qr_codes ADD COLUMN style_preset VARCHAR(20) DEFAULT 'default';
  END IF;
  
  -- Add foreground_color column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='qr_codes' AND column_name='foreground_color') THEN
    ALTER TABLE qr_codes ADD COLUMN foreground_color VARCHAR(7) DEFAULT '#000000';
  END IF;
  
  -- Add background_color column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='qr_codes' AND column_name='background_color') THEN
    ALTER TABLE qr_codes ADD COLUMN background_color VARCHAR(7) DEFAULT '#FFFFFF';
  END IF;
  
  -- Add logo_url column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='qr_codes' AND column_name='logo_url') THEN
    ALTER TABLE qr_codes ADD COLUMN logo_url TEXT;
  END IF;
  
  -- Add corner_style column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='qr_codes' AND column_name='corner_style') THEN
    ALTER TABLE qr_codes ADD COLUMN corner_style VARCHAR(20) DEFAULT 'square';
  END IF;
  
  -- Add include_payment_amount column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='qr_codes' AND column_name='include_payment_amount') THEN
    ALTER TABLE qr_codes ADD COLUMN include_payment_amount BOOLEAN DEFAULT false;
  END IF;
  
  -- Add payment_amount column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='qr_codes' AND column_name='payment_amount') THEN
    ALTER TABLE qr_codes ADD COLUMN payment_amount INTEGER;
  END IF;
  
  -- Add scan_count column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='qr_codes' AND column_name='scan_count') THEN
    ALTER TABLE qr_codes ADD COLUMN scan_count INTEGER DEFAULT 0;
  END IF;
  
  -- Add last_scanned_at column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='qr_codes' AND column_name='last_scanned_at') THEN
    ALTER TABLE qr_codes ADD COLUMN last_scanned_at TIMESTAMPTZ;
  END IF;
END $$;

-- Update existing data to use new columns
UPDATE qr_codes SET 
  qr_image_url = qr_data_url,
  data_content = url,
  scan_count = scans
WHERE qr_image_url IS NULL OR data_content IS NULL OR scan_count IS NULL;

-- Add constraints for new columns
ALTER TABLE qr_codes 
  ADD CONSTRAINT check_style_preset CHECK (style_preset IN ('default', 'dark', 'brand', 'neon', 'sunset')),
  ADD CONSTRAINT check_corner_style CHECK (corner_style IN ('square', 'rounded', 'dots', 'extra-rounded')),
  ADD CONSTRAINT check_foreground_color CHECK (foreground_color ~ '^#[0-9A-Fa-f]{6}$'),
  ADD CONSTRAINT check_background_color CHECK (background_color ~ '^#[0-9A-Fa-f]{6}$');

-- Update the type constraint to match component expectations
ALTER TABLE qr_codes 
  DROP CONSTRAINT IF EXISTS qr_codes_type_check;

ALTER TABLE qr_codes 
  ADD CONSTRAINT qr_codes_type_check CHECK (type IN ('profile', 'social', 'payment', 'url', 'contact', 'text', 'goal', 'fixed_tip'));

-- Create a function to automatically update scan_count when qr_code_scans are added
CREATE OR REPLACE FUNCTION update_qr_scan_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE qr_codes 
    SET 
      scan_count = scan_count + 1,
      last_scanned_at = NEW.scanned_at
    WHERE id = NEW.qr_code_id;
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update scan count automatically
DROP TRIGGER IF EXISTS trigger_update_qr_scan_count ON qr_code_scans;
CREATE TRIGGER trigger_update_qr_scan_count
  AFTER INSERT ON qr_code_scans
  FOR EACH ROW
  EXECUTE FUNCTION update_qr_scan_count();

-- Add RLS policies for qr_codes table
ALTER TABLE qr_codes ENABLE ROW LEVEL SECURITY;

-- Allow users to see their own QR codes
CREATE POLICY "Users can view own QR codes" ON qr_codes
  FOR SELECT USING (auth.uid() = user_id);

-- Allow users to insert their own QR codes
CREATE POLICY "Users can insert own QR codes" ON qr_codes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own QR codes
CREATE POLICY "Users can update own QR codes" ON qr_codes
  FOR UPDATE USING (auth.uid() = user_id);

-- Allow users to delete their own QR codes
CREATE POLICY "Users can delete own QR codes" ON qr_codes
  FOR DELETE USING (auth.uid() = user_id);

-- Public read access for QR code scans (needed for tracking)
ALTER TABLE qr_code_scans ENABLE ROW LEVEL SECURITY;

-- Allow anyone to create scan records (for public QR codes)
CREATE POLICY "Anyone can create QR scan records" ON qr_code_scans
  FOR INSERT WITH CHECK (true);

-- Allow users to view scans of their own QR codes
CREATE POLICY "Users can view own QR code scans" ON qr_code_scans
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM qr_codes 
      WHERE qr_codes.id = qr_code_scans.qr_code_id 
      AND qr_codes.user_id = auth.uid()
    )
  );

-- Create additional indexes for performance
CREATE INDEX IF NOT EXISTS qr_codes_data_content_idx ON qr_codes(data_content);
CREATE INDEX IF NOT EXISTS qr_codes_style_preset_idx ON qr_codes(style_preset);
CREATE INDEX IF NOT EXISTS qr_code_scans_qr_code_id_idx ON qr_code_scans(qr_code_id);
CREATE INDEX IF NOT EXISTS qr_code_scans_scanned_at_idx ON qr_code_scans(scanned_at);

-- Add comments for documentation
COMMENT ON TABLE qr_codes IS 'Enhanced QR codes with customization and analytics';
COMMENT ON COLUMN qr_codes.data_content IS 'The actual content/URL that the QR code encodes';
COMMENT ON COLUMN qr_codes.qr_image_url IS 'Generated QR code image as data URL or file URL';
COMMENT ON COLUMN qr_codes.style_preset IS 'Predefined style: default, dark, brand, neon, sunset';
COMMENT ON COLUMN qr_codes.corner_style IS 'QR code corner style: square, rounded, dots, extra-rounded';
COMMENT ON COLUMN qr_codes.scan_count IS 'Total number of times this QR code has been scanned';
COMMENT ON COLUMN qr_codes.include_payment_amount IS 'Whether to include a preset payment amount';
COMMENT ON COLUMN qr_codes.payment_amount IS 'Preset payment amount in cents for payment QR codes';
