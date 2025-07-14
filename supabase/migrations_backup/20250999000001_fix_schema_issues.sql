-- Fix schema issues and add missing columns
-- This migration addresses missing columns and table structure issues

-- Update payment_methods table to match enhanced schema
-- First drop and recreate with correct columns
DROP TABLE IF EXISTS payment_methods CASCADE;

CREATE TABLE payment_methods (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('stripe', 'cashapp', 'paypal', 'venmo', 'zelle', 'crypto', 'custom')),
  name TEXT NOT NULL, -- Display name like "Credit Cards", "CashApp", etc.
  handle TEXT, -- For platforms like CashApp ($handle) or Venmo (@handle)
  url TEXT,
  enabled BOOLEAN DEFAULT true,
  preferred BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  total_earnings INTEGER DEFAULT 0, -- in cents
  total_clicks INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create social_links table if it doesn't exist
CREATE TABLE IF NOT EXISTS social_links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('twitter', 'instagram', 'tiktok', 'onlyfans', 'custom')),
  url TEXT NOT NULL,
  label TEXT,
  enabled BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on social_links
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;

-- Social links policies
CREATE POLICY "Users can manage own social links" ON social_links
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Public social links viewable by all" ON social_links
  FOR SELECT USING (
    enabled AND EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.user_id = social_links.user_id 
      AND (NOT private_profile OR auth.uid() = social_links.user_id)
    )
  );

-- Add indexes for social_links
CREATE INDEX IF NOT EXISTS social_links_user_id_idx ON social_links(user_id);
CREATE INDEX IF NOT EXISTS social_links_enabled_idx ON social_links(enabled);

-- Update updated_at trigger for social_links
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_social_links_updated_at BEFORE UPDATE ON social_links
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create tips table if it doesn't exist (needed for the rename operation)
CREATE TABLE IF NOT EXISTS tips (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  amount INTEGER NOT NULL, -- in cents
  currency TEXT DEFAULT 'usd',
  anonymous BOOLEAN DEFAULT false,
  message TEXT,
  stripe_payment_intent_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for tips
CREATE INDEX IF NOT EXISTS tips_user_id_idx ON tips(user_id);

-- Enable RLS on tips
ALTER TABLE tips ENABLE ROW LEVEL SECURITY;

-- Tips policies
CREATE POLICY "Users can view own tips" ON tips
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Anyone can insert tips" ON tips
  FOR INSERT WITH CHECK (true);
