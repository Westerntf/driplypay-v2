-- Complete DriplyPay Database Schema
-- This migration creates all tables with proper relationships

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL UNIQUE,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  banner_url TEXT,
  bio TEXT,
  location TEXT,
  support_message TEXT,
  theme TEXT DEFAULT 'clean' CHECK (theme IN ('clean', 'neon', 'luxe')),
  blur_links BOOLEAN DEFAULT false,
  private_profile BOOLEAN DEFAULT false,
  redirect_url TEXT,
  redirect_message TEXT,
  min_tip_amount INTEGER DEFAULT 500, -- in cents, $5.00
  tip_amounts INTEGER[] DEFAULT ARRAY[500, 1000, 2500, 5000, 10000],
  custom_tip_enabled BOOLEAN DEFAULT true,
  email_notifications BOOLEAN DEFAULT true,
  stripe_account_id TEXT,
  stripe_customer_id TEXT,
  is_pro BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT false,
  followers_count INTEGER DEFAULT 0,
  total_earnings INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create social_links table
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

-- Create payment_methods table
CREATE TABLE IF NOT EXISTS payment_methods (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('cashapp', 'paypal', 'venmo', 'zelle', 'crypto', 'stripe', 'custom')),
  label TEXT NOT NULL,
  url TEXT NOT NULL,
  handle TEXT,
  preferred BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  total_earnings INTEGER DEFAULT 0,
  total_clicks INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create support_messages table (evolution of tips)
CREATE TABLE IF NOT EXISTS support_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  amount INTEGER NOT NULL, -- in cents
  currency TEXT DEFAULT 'usd',
  anonymous BOOLEAN DEFAULT false,
  message TEXT,
  supporter_name TEXT,
  supporter_email TEXT,
  is_public BOOLEAN DEFAULT true,
  payment_method_id UUID REFERENCES payment_methods(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  stripe_payment_intent_id TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create goals table
CREATE TABLE IF NOT EXISTS goals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  target_amount INTEGER NOT NULL,
  current_amount INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  achieved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create qrcodes table
CREATE TABLE IF NOT EXISTS qrcodes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('profile', 'payment_method', 'fixed_tip')),
  target_id UUID, -- references payment_methods.id for payment_method type
  amount INTEGER, -- for fixed_tip type, in cents
  scans INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create analytics table
CREATE TABLE IF NOT EXISTS analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('profile_view', 'payment_click', 'qr_scan', 'tip_received', 'social_click', 'goal_view')),
  payment_method_id UUID REFERENCES payment_methods(id) ON DELETE SET NULL,
  qr_code_id UUID REFERENCES qrcodes(id) ON DELETE SET NULL,
  goal_id UUID REFERENCES goals(id) ON DELETE SET NULL,
  amount INTEGER, -- for tip_received events, in cents
  visitor_ip TEXT,
  user_agent TEXT,
  referrer TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS profiles_username_idx ON profiles(username);
CREATE INDEX IF NOT EXISTS profiles_user_id_idx ON profiles(user_id);
CREATE INDEX IF NOT EXISTS social_links_user_id_idx ON social_links(user_id);
CREATE INDEX IF NOT EXISTS social_links_enabled_idx ON social_links(enabled);
CREATE INDEX IF NOT EXISTS payment_methods_user_id_idx ON payment_methods(user_id);
CREATE INDEX IF NOT EXISTS payment_methods_preferred_idx ON payment_methods(preferred);
CREATE INDEX IF NOT EXISTS support_messages_user_id_idx ON support_messages(user_id);
CREATE INDEX IF NOT EXISTS goals_user_id_idx ON goals(user_id);
CREATE INDEX IF NOT EXISTS goals_active_idx ON goals(is_active);
CREATE INDEX IF NOT EXISTS qrcodes_user_id_idx ON qrcodes(user_id);
CREATE INDEX IF NOT EXISTS analytics_user_id_idx ON analytics(user_id);
CREATE INDEX IF NOT EXISTS analytics_event_type_idx ON analytics(event_type);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_social_links_updated_at ON social_links;
CREATE TRIGGER update_social_links_updated_at BEFORE UPDATE ON social_links
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_payment_methods_updated_at ON payment_methods;
CREATE TRIGGER update_payment_methods_updated_at BEFORE UPDATE ON payment_methods
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_goals_updated_at ON goals;
CREATE TRIGGER update_goals_updated_at BEFORE UPDATE ON goals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_qrcodes_updated_at ON qrcodes;
CREATE TRIGGER update_qrcodes_updated_at BEFORE UPDATE ON qrcodes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE qrcodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Row Level Security Policies

-- Profiles policies
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Public profiles viewable by all" ON profiles;
CREATE POLICY "Public profiles viewable by all" ON profiles
  FOR SELECT USING (NOT private_profile);

-- Social links policies
DROP POLICY IF EXISTS "Users can manage own social links" ON social_links;
CREATE POLICY "Users can manage own social links" ON social_links
  FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Public social links viewable by all" ON social_links;
CREATE POLICY "Public social links viewable by all" ON social_links
  FOR SELECT USING (
    enabled AND EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.user_id = social_links.user_id 
      AND (NOT private_profile OR auth.uid() = social_links.user_id)
    )
  );

-- Payment methods policies
DROP POLICY IF EXISTS "Users can manage own payment methods" ON payment_methods;
CREATE POLICY "Users can manage own payment methods" ON payment_methods
  FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Public payment methods viewable by all" ON payment_methods;
CREATE POLICY "Public payment methods viewable by all" ON payment_methods
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.user_id = payment_methods.user_id 
      AND (NOT private_profile OR auth.uid() = payment_methods.user_id)
    )
  );

-- Support messages policies
DROP POLICY IF EXISTS "Users can view own support messages" ON support_messages;
CREATE POLICY "Users can view own support messages" ON support_messages
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Anyone can insert support messages" ON support_messages;
CREATE POLICY "Anyone can insert support messages" ON support_messages
  FOR INSERT WITH CHECK (true);

-- Goals policies
DROP POLICY IF EXISTS "Users can manage own goals" ON goals;
CREATE POLICY "Users can manage own goals" ON goals
  FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Public goals viewable by all" ON goals;
CREATE POLICY "Public goals viewable by all" ON goals
  FOR SELECT USING (
    is_active AND EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.user_id = goals.user_id 
      AND (NOT private_profile OR auth.uid() = goals.user_id)
    )
  );

-- QR codes policies
DROP POLICY IF EXISTS "Users can manage own qr codes" ON qrcodes;
CREATE POLICY "Users can manage own qr codes" ON qrcodes
  FOR ALL USING (auth.uid() = user_id);

-- Analytics policies
DROP POLICY IF EXISTS "Users can view own analytics" ON analytics;
CREATE POLICY "Users can view own analytics" ON analytics
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Anyone can insert analytics" ON analytics;
CREATE POLICY "Anyone can insert analytics" ON analytics
  FOR INSERT WITH CHECK (true);
