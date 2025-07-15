-- DriplyPay Digital Wallet Migration
-- Create wallet_methods table for new digital wallet system
-- This replaces/complements the existing payment_methods table

-- Drop existing wallet_methods table if it exists
DROP TABLE IF EXISTS wallet_methods CASCADE;

-- Create wallet_methods table
CREATE TABLE wallet_methods (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('external', 'payid', 'bank')), -- external = redirect links, payid/bank = modal forms
  platform TEXT NOT NULL, -- venmo, cashapp, paypal, payid, bank, etc.
  name TEXT NOT NULL, -- Display name like "Venmo", "PayID", "Bank Transfer"
  handle TEXT, -- For external platforms like @username or $handle
  url TEXT, -- For external redirect links
  details JSONB DEFAULT '{}', -- For internal payment details like email, phone, bsb, account
  enabled BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  total_clicks INTEGER DEFAULT 0, -- Analytics tracking
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS wallet_methods_user_id_idx ON wallet_methods(user_id);
CREATE INDEX IF NOT EXISTS wallet_methods_enabled_idx ON wallet_methods(enabled);
CREATE INDEX IF NOT EXISTS wallet_methods_type_idx ON wallet_methods(type);
CREATE INDEX IF NOT EXISTS wallet_methods_platform_idx ON wallet_methods(platform);

-- Enable Row Level Security
ALTER TABLE wallet_methods ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can manage own wallet methods" ON wallet_methods
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Public wallet methods viewable by all" ON wallet_methods
  FOR SELECT USING (
    enabled = true AND 
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.user_id = wallet_methods.user_id 
      AND (NOT private_profile OR auth.uid() = wallet_methods.user_id)
    )
  );

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_wallet_methods_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_wallet_methods_updated_at
  BEFORE UPDATE ON wallet_methods
  FOR EACH ROW EXECUTE FUNCTION update_wallet_methods_updated_at();

-- Add sample data for testing (optional - remove in production)
-- This is just for development/testing purposes
/*
INSERT INTO wallet_methods (user_id, type, platform, name, handle, url, enabled) VALUES
-- External payment methods (redirect links)
((SELECT id FROM auth.users LIMIT 1), 'external', 'venmo', 'Venmo', '@username', 'https://venmo.com/u/username', true),
((SELECT id FROM auth.users LIMIT 1), 'external', 'cashapp', 'CashApp', '$username', 'https://cash.app/$username', true),
((SELECT id FROM auth.users LIMIT 1), 'external', 'paypal', 'PayPal', 'username', 'https://paypal.me/username', true);

-- Internal payment methods (modal forms)
INSERT INTO wallet_methods (user_id, type, platform, name, details, enabled) VALUES
((SELECT id FROM auth.users LIMIT 1), 'payid', 'payid', 'PayID', '{"email": "user@example.com", "phone": "+1234567890"}', true),
((SELECT id FROM auth.users LIMIT 1), 'bank', 'bank', 'Bank Transfer', '{"bsb": "123456", "account": "987654321"}', true);
*/
