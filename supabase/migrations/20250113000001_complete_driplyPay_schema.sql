-- DriplyPay Complete Database Schema
-- Consolidated migration with all features
-- Created: January 13, 2025

-- Drop existing tables if they exist (for fresh setup)
DROP TABLE IF EXISTS qr_code_scans CASCADE;
DROP TABLE IF EXISTS qr_codes CASCADE;
DROP TABLE IF EXISTS analytics CASCADE;
DROP TABLE IF EXISTS support_messages CASCADE;
DROP TABLE IF EXISTS payment_methods CASCADE;
DROP TABLE IF EXISTS social_links CASCADE;
DROP TABLE IF EXISTS goals CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- Create enhanced profiles table
CREATE TABLE profiles (
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
  is_verified BOOLEAN DEFAULT false,
  redirect_url TEXT,
  redirect_message TEXT,
  min_tip_amount INTEGER DEFAULT 500, -- in cents, $5.00
  tip_amounts INTEGER[] DEFAULT ARRAY[500, 1000, 2500, 5000, 10000], -- preset tip amounts in cents
  custom_tip_enabled BOOLEAN DEFAULT true,
  email_notifications BOOLEAN DEFAULT true,
  stripe_account_id TEXT,
  stripe_customer_id TEXT,
  is_pro BOOLEAN DEFAULT false,
  followers_count INTEGER DEFAULT 0,
  total_earnings INTEGER DEFAULT 0, -- in cents
  
  -- Section visibility controls
  show_social_links BOOLEAN DEFAULT true,
  show_payment_methods BOOLEAN DEFAULT true,
  show_goals BOOLEAN DEFAULT true,
  show_recent_supporters BOOLEAN DEFAULT true,
  show_qr_codes BOOLEAN DEFAULT true,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create social_links table with display_order
CREATE TABLE social_links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('instagram', 'twitter', 'youtube', 'tiktok', 'onlyfans', 'twitch', 'discord', 'linkedin', 'website', 'custom')),
  url TEXT NOT NULL,
  label TEXT, -- for custom platform
  enabled BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create enhanced payment_methods table with display_order
CREATE TABLE payment_methods (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('stripe', 'cashapp', 'paypal', 'venmo', 'zelle', 'crypto', 'custom')),
  name TEXT NOT NULL, -- Display name like "Credit Cards", "CashApp", etc.
  handle TEXT, -- For platforms like CashApp ($handle) or Venmo (@handle)
  url TEXT,
  enabled BOOLEAN DEFAULT true,
  preferred BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  total_earnings INTEGER DEFAULT 0, -- in cents
  total_clicks INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create goals table
CREATE TABLE goals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  target_amount INTEGER NOT NULL, -- in cents
  current_amount INTEGER DEFAULT 0, -- in cents
  is_active BOOLEAN DEFAULT true,
  payment_method_id UUID REFERENCES payment_methods(id) ON DELETE SET NULL, -- Link to payment methods
  achieved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create enhanced tips/support_messages table
CREATE TABLE support_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  supporter_name TEXT,
  supporter_email TEXT,
  amount INTEGER NOT NULL, -- in cents
  currency TEXT DEFAULT 'usd',
  message TEXT,
  is_anonymous BOOLEAN DEFAULT false,
  is_public BOOLEAN DEFAULT true, -- whether to show in recent support
  payment_method_id UUID REFERENCES payment_methods(id) ON DELETE SET NULL,
  stripe_payment_intent_id TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create comprehensive QR codes table
CREATE TABLE qr_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- QR Code Info
  name VARCHAR(100) NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('profile', 'payment', 'social', 'goal', 'fixed_tip')),
  url TEXT NOT NULL,
  
  -- Linking to other entities
  linked_payment_method_id UUID REFERENCES payment_methods(id) ON DELETE SET NULL,
  linked_social_link_id UUID REFERENCES social_links(id) ON DELETE SET NULL,
  linked_goal_id UUID REFERENCES goals(id) ON DELETE SET NULL,
  fixed_amount INTEGER, -- for fixed_tip type, in cents
  
  -- Visual Customization
  style VARCHAR(20) DEFAULT 'classic' CHECK (style IN ('classic', 'rounded', 'minimal', 'branded')),
  color VARCHAR(7) DEFAULT '#4F46E5',
  size VARCHAR(20) DEFAULT 'medium' CHECK (size IN ('small', 'medium', 'large', 'xlarge')),
  logo_type VARCHAR(20) CHECK (logo_type IN ('payment', 'social', 'profile', 'custom')),
  logo_identifier VARCHAR(50), -- e.g., 'venmo', 'instagram', 'profile'
  
  -- QR Code Data
  qr_data_url TEXT, -- Generated QR code as data URL
  
  -- Organization
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  
  -- Analytics
  scans INTEGER DEFAULT 0,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT check_name_length CHECK (LENGTH(name) <= 100),
  CONSTRAINT check_color_format CHECK (color ~ '^#[0-9A-Fa-f]{6}$')
);

-- Create QR code scans table for analytics
CREATE TABLE qr_code_scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  qr_code_id UUID REFERENCES qr_codes(id) ON DELETE CASCADE NOT NULL,
  scanned_at TIMESTAMPTZ DEFAULT NOW(),
  user_agent TEXT,
  ip_address INET,
  country VARCHAR(2),
  city VARCHAR(100),
  referrer TEXT
);

-- Create analytics table
CREATE TABLE analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('profile_view', 'payment_click', 'qr_scan', 'tip_received', 'social_click', 'goal_view')),
  payment_method_id UUID REFERENCES payment_methods(id) ON DELETE SET NULL,
  qr_code_id UUID REFERENCES qr_codes(id) ON DELETE SET NULL,
  goal_id UUID REFERENCES goals(id) ON DELETE SET NULL,
  amount INTEGER, -- for tip_received events, in cents
  visitor_ip TEXT,
  user_agent TEXT,
  referrer TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX profiles_username_idx ON profiles(username);
CREATE INDEX profiles_user_id_idx ON profiles(user_id);
CREATE INDEX profiles_private_profile_idx ON profiles(private_profile);

CREATE INDEX social_links_user_id_idx ON social_links(user_id);
CREATE INDEX social_links_enabled_idx ON social_links(enabled);
CREATE INDEX social_links_display_order_idx ON social_links(user_id, display_order);

CREATE INDEX payment_methods_user_id_idx ON payment_methods(user_id);
CREATE INDEX payment_methods_enabled_idx ON payment_methods(enabled);
CREATE INDEX payment_methods_preferred_idx ON payment_methods(preferred);
CREATE INDEX payment_methods_display_order_idx ON payment_methods(user_id, display_order);

CREATE INDEX goals_user_id_idx ON goals(user_id);
CREATE INDEX goals_active_idx ON goals(is_active);

CREATE INDEX support_messages_user_id_idx ON support_messages(user_id);
CREATE INDEX support_messages_public_idx ON support_messages(is_public);
CREATE INDEX support_messages_status_idx ON support_messages(status);

CREATE INDEX qr_codes_user_id_idx ON qr_codes(user_id);
CREATE INDEX qr_codes_type_idx ON qr_codes(type);
CREATE INDEX qr_codes_active_idx ON qr_codes(user_id, is_active, display_order);
CREATE INDEX qr_codes_linked_payment_idx ON qr_codes(linked_payment_method_id);
CREATE INDEX qr_codes_linked_social_idx ON qr_codes(linked_social_link_id);
CREATE INDEX qr_codes_linked_goal_idx ON qr_codes(linked_goal_id);

CREATE INDEX qr_code_scans_qr_code_id_idx ON qr_code_scans(qr_code_id);
CREATE INDEX qr_code_scans_scanned_at_idx ON qr_code_scans(scanned_at);

CREATE INDEX analytics_user_id_idx ON analytics(user_id);
CREATE INDEX analytics_event_type_idx ON analytics(event_type);
CREATE INDEX analytics_created_at_idx ON analytics(created_at);

-- Create updated_at trigger for QR codes
CREATE OR REPLACE FUNCTION update_qr_codes_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_qr_codes_updated_at
  BEFORE UPDATE ON qr_codes
  FOR EACH ROW
  EXECUTE FUNCTION update_qr_codes_updated_at();

-- Row Level Security Policies

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Public profiles viewable by all" ON profiles
  FOR SELECT USING (NOT private_profile OR auth.uid() = user_id);

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

-- Goals policies
CREATE POLICY "Users can manage own goals" ON goals
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Public goals viewable by all" ON goals
  FOR SELECT USING (
    is_active AND EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.user_id = goals.user_id 
      AND (NOT private_profile OR auth.uid() = goals.user_id)
    )
  );

-- Support messages policies
CREATE POLICY "Users can view own support messages" ON support_messages
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert support messages for others" ON support_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public support messages viewable by all" ON support_messages
  FOR SELECT USING (
    is_public AND status = 'completed' AND EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.user_id = support_messages.user_id 
      AND (NOT private_profile OR auth.uid() = support_messages.user_id)
    )
  );

-- QR codes policies
CREATE POLICY "Users can manage their own QR codes" ON qr_codes
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "QR codes are publicly readable" ON qr_codes
  FOR SELECT USING (is_active = true);

-- QR scan policies
CREATE POLICY "Users can view their QR scan analytics" ON qr_code_scans
  FOR SELECT USING (
    qr_code_id IN (
      SELECT id FROM qr_codes WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can record QR code scans" ON qr_code_scans
  FOR INSERT WITH CHECK (true);

-- Analytics policies
CREATE POLICY "Users can view own analytics" ON analytics
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Anyone can insert analytics" ON analytics
  FOR INSERT WITH CHECK (true);

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE qr_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE qr_code_scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'profile-images',
  'profile-images',
  true,
  52428800, -- 50MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
) ON CONFLICT (id) DO NOTHING;

-- Storage policies for profile images
CREATE POLICY "Public read access for profile images" ON storage.objects
  FOR SELECT USING (bucket_id = 'profile-images');

CREATE POLICY "Users can upload their own profile images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'profile-images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own profile images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'profile-images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own profile images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'profile-images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
