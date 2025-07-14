-- Fix payment_methods table schema to match enhanced schema
-- This migration updates the payment_methods table to have the correct columns

-- Drop existing payment_methods table if it exists (save data first if needed)
DROP TABLE IF EXISTS payment_methods CASCADE;

-- Create payment_methods table with enhanced schema
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

-- Create indexes for payment_methods
CREATE INDEX IF NOT EXISTS payment_methods_user_id_idx ON payment_methods(user_id);
CREATE INDEX IF NOT EXISTS payment_methods_enabled_idx ON payment_methods(enabled);
CREATE INDEX IF NOT EXISTS payment_methods_preferred_idx ON payment_methods(preferred);
CREATE INDEX IF NOT EXISTS payment_methods_order_idx ON payment_methods(order_index);

-- Enable RLS on payment_methods
ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;

-- Payment methods policies
CREATE POLICY "Users can manage own payment methods" ON payment_methods
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Public payment methods viewable by all" ON payment_methods
  FOR SELECT USING (
    enabled AND EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.user_id = payment_methods.user_id 
      AND (NOT private_profile OR auth.uid() = payment_methods.user_id)
    )
  );

-- Update updated_at trigger for payment_methods
CREATE TRIGGER update_payment_methods_updated_at BEFORE UPDATE ON payment_methods
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
