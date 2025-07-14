-- DriplyPay Enhanced Database Schema
-- Updated for Dynamic Public Profiles and Live Preview System
-- Run this in your Supabase SQL Editor

-- Enable Row Level Security
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Drop existing tables if they exist (for fresh setup)
DROP TABLE IF EXISTS analytics CASCADE;
DROP TABLE IF EXISTS qrcodes CASCADE;
DROP TABLE IF EXISTS tips CASCADE;
DROP TABLE IF EXISTS payment_methods CASCADE;
DROP TABLE IF EXISTS social_links CASCADE;
DROP TABLE IF EXISTS goals CASCADE;
DROP TABLE IF EXISTS support_messages CASCADE;
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
  theme TEXT DEFAULT 'default' CHECK (theme IN ('default', 'theme1', 'theme2', 'theme3')),
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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create social_links table
CREATE TABLE social_links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('instagram', 'twitter', 'youtube', 'tiktok', 'onlyfans', 'twitch', 'discord', 'linkedin', 'custom')),
  url TEXT NOT NULL,
  label TEXT, -- for custom platform
  enabled BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create enhanced payment_methods table
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

-- Create goals table
CREATE TABLE goals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  target_amount INTEGER NOT NULL, -- in cents
  current_amount INTEGER DEFAULT 0, -- in cents
  is_active BOOLEAN DEFAULT true,
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

-- Create qrcodes table
CREATE TABLE qrcodes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('profile', 'payment_method', 'fixed_tip', 'goal')),
  target_id UUID, -- references payment_methods.id or goals.id
  amount INTEGER, -- for fixed_tip type, in cents
  url TEXT NOT NULL, -- the actual QR code URL
  scans INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create analytics table
CREATE TABLE analytics (
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
CREATE INDEX profiles_username_idx ON profiles(username);
CREATE INDEX profiles_user_id_idx ON profiles(user_id);
CREATE INDEX profiles_private_profile_idx ON profiles(private_profile);
CREATE INDEX social_links_user_id_idx ON social_links(user_id);
CREATE INDEX social_links_enabled_idx ON social_links(enabled);
CREATE INDEX payment_methods_user_id_idx ON payment_methods(user_id);
CREATE INDEX payment_methods_enabled_idx ON payment_methods(enabled);
CREATE INDEX payment_methods_preferred_idx ON payment_methods(preferred);
CREATE INDEX goals_user_id_idx ON goals(user_id);
CREATE INDEX goals_active_idx ON goals(is_active);
CREATE INDEX support_messages_user_id_idx ON support_messages(user_id);
CREATE INDEX support_messages_public_idx ON support_messages(is_public);
CREATE INDEX support_messages_status_idx ON support_messages(status);
CREATE INDEX qrcodes_user_id_idx ON qrcodes(user_id);
CREATE INDEX qrcodes_active_idx ON qrcodes(is_active);
CREATE INDEX analytics_user_id_idx ON analytics(user_id);
CREATE INDEX analytics_event_type_idx ON analytics(event_type);
CREATE INDEX analytics_created_at_idx ON analytics(created_at);

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

CREATE POLICY "Anyone can insert support messages" ON support_messages
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
CREATE POLICY "Users can manage own QR codes" ON qrcodes
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Active QR codes viewable by all" ON qrcodes
  FOR SELECT USING (
    is_active AND EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.user_id = qrcodes.user_id 
      AND (NOT private_profile OR auth.uid() = qrcodes.user_id)
    )
  );

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
ALTER TABLE qrcodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_social_links_updated_at BEFORE UPDATE ON social_links
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payment_methods_updated_at BEFORE UPDATE ON payment_methods
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_goals_updated_at BEFORE UPDATE ON goals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_qrcodes_updated_at BEFORE UPDATE ON qrcodes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to handle user profile creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Create a profile for new users
  INSERT INTO profiles (user_id, username, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substr(NEW.id::text, 1, 8)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'New Creator')
  );
  
  -- Create default payment method (Stripe)
  INSERT INTO payment_methods (user_id, type, name, enabled)
  VALUES (NEW.id, 'stripe', 'Credit Cards & Bank Transfers', true);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to update profile earnings when a tip is received
CREATE OR REPLACE FUNCTION update_profile_earnings()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' THEN
    -- Update profile total earnings
    UPDATE profiles 
    SET total_earnings = total_earnings + NEW.amount,
        updated_at = NOW()
    WHERE user_id = NEW.user_id;
    
    -- Update payment method earnings if specified
    IF NEW.payment_method_id IS NOT NULL THEN
      UPDATE payment_methods 
      SET total_earnings = total_earnings + NEW.amount,
          updated_at = NOW()
      WHERE id = NEW.payment_method_id;
    END IF;
    
    -- Update goal progress if there's an active goal
    UPDATE goals 
    SET current_amount = current_amount + NEW.amount,
        updated_at = NOW(),
        achieved_at = CASE 
          WHEN current_amount + NEW.amount >= target_amount AND achieved_at IS NULL 
          THEN NOW() 
          ELSE achieved_at 
        END
    WHERE user_id = NEW.user_id AND is_active = true;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update earnings when support messages change
CREATE TRIGGER update_earnings_on_support
  AFTER INSERT OR UPDATE ON support_messages
  FOR EACH ROW EXECUTE FUNCTION update_profile_earnings();

-- Function to track analytics
CREATE OR REPLACE FUNCTION track_payment_click()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE payment_methods 
  SET total_clicks = total_clicks + 1,
      updated_at = NOW()
  WHERE id = NEW.payment_method_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to track payment method clicks
CREATE TRIGGER track_payment_clicks
  AFTER INSERT ON analytics
  FOR EACH ROW 
  WHEN (NEW.event_type = 'payment_click' AND NEW.payment_method_id IS NOT NULL)
  EXECUTE FUNCTION track_payment_click();

-- Function to track QR code scans
CREATE OR REPLACE FUNCTION track_qr_scan()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE qrcodes 
  SET scans = scans + 1,
      updated_at = NOW()
  WHERE id = NEW.qr_code_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to track QR code scans
CREATE TRIGGER track_qr_scans
  AFTER INSERT ON analytics
  FOR EACH ROW 
  WHEN (NEW.event_type = 'qr_scan' AND NEW.qr_code_id IS NOT NULL)
  EXECUTE FUNCTION track_qr_scan();

-- Create view for public profile data (what visitors see)
CREATE OR REPLACE VIEW public_profiles AS
SELECT 
  p.id,
  p.username,
  p.display_name,
  p.avatar_url,
  p.banner_url,
  p.bio,
  p.location,
  p.theme,
  p.is_verified,
  p.tip_amounts,
  p.custom_tip_enabled,
  p.followers_count,
  p.created_at,
  -- Aggregate data
  COALESCE(
    (SELECT json_agg(
      json_build_object(
        'platform', sl.platform,
        'url', sl.url,
        'label', sl.label
      ) ORDER BY sl.order_index
    ) 
    FROM social_links sl 
    WHERE sl.user_id = p.user_id AND sl.enabled = true), 
    '[]'::json
  ) as social_links,
  COALESCE(
    (SELECT json_agg(
      json_build_object(
        'type', pm.type,
        'name', pm.name,
        'handle', pm.handle,
        'enabled', pm.enabled
      ) ORDER BY pm.order_index, pm.preferred DESC
    ) 
    FROM payment_methods pm 
    WHERE pm.user_id = p.user_id AND pm.enabled = true), 
    '[]'::json
  ) as payment_methods,
  COALESCE(
    (SELECT json_agg(
      json_build_object(
        'id', g.id,
        'title', g.title,
        'description', g.description,
        'target_amount', g.target_amount,
        'current_amount', g.current_amount,
        'is_active', g.is_active
      )
    ) 
    FROM goals g 
    WHERE g.user_id = p.user_id AND g.is_active = true), 
    '[]'::json
  ) as goals,
  COALESCE(
    (SELECT json_agg(
      json_build_object(
        'id', sm.id,
        'supporter_name', CASE WHEN sm.is_anonymous THEN null ELSE sm.supporter_name END,
        'amount', sm.amount,
        'message', sm.message,
        'created_at', sm.created_at
      ) ORDER BY sm.created_at DESC
    ) 
    FROM support_messages sm 
    WHERE sm.user_id = p.user_id 
      AND sm.is_public = true 
      AND sm.status = 'completed'
    LIMIT 10), 
    '[]'::json
  ) as recent_support
FROM profiles p
WHERE p.private_profile = false;

-- Insert sample data for testing
INSERT INTO profiles (user_id, username, display_name, bio, theme, location, is_verified) VALUES
('00000000-0000-0000-0000-000000000001', 'sarah-creator', 'Sarah Chen', 'Digital artist & content creator sharing my journey through life and art. Coffee enthusiast ☕️', 'clean', 'San Francisco, CA', true)
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO social_links (user_id, platform, url, enabled, order_index) VALUES
('00000000-0000-0000-0000-000000000001', 'instagram', 'https://instagram.com/sarahcreates', true, 1),
('00000000-0000-0000-0000-000000000001', 'twitter', 'https://twitter.com/sarahcreates', true, 2),
('00000000-0000-0000-0000-000000000001', 'youtube', 'https://youtube.com/@sarahcreates', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO payment_methods (user_id, type, name, handle, enabled, preferred, order_index) VALUES
('00000000-0000-0000-0000-000000000001', 'stripe', 'Credit Cards & Bank Transfers', null, true, true, 1),
('00000000-0000-0000-0000-000000000001', 'cashapp', 'CashApp', '$sarahcreates', true, false, 2),
('00000000-0000-0000-0000-000000000001', 'venmo', 'Venmo', '@sarah-creates', true, false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO goals (user_id, title, description, target_amount, current_amount, is_active) VALUES
('00000000-0000-0000-0000-000000000001', 'New Art Supplies', 'Help me get professional art supplies for my next series', 50000, 32000, true)
ON CONFLICT DO NOTHING;

INSERT INTO support_messages (user_id, supporter_name, amount, message, is_anonymous, is_public, status) VALUES
('00000000-0000-0000-0000-000000000001', 'Alex', 2500, 'Love your art!', false, true, 'completed'),
('00000000-0000-0000-0000-000000000001', null, 1000, 'Keep creating!', true, true, 'completed'),
('00000000-0000-0000-0000-000000000001', 'Jordan', 5000, 'Amazing work as always', false, true, 'completed')
ON CONFLICT DO NOTHING;

-- =====================================================
-- NEW FEATURES: QR Wallet, Social Stories & Drag/Drop
-- =====================================================

-- 1. ADD DISPLAY ORDER COLUMNS FOR DRAG & DROP REORDERING
-- Add display_order column to social_links table
ALTER TABLE social_links 
ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- Add display_order column to payment_methods table  
ALTER TABLE payment_methods 
ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- Update existing records with sequential order
UPDATE social_links 
SET display_order = COALESCE(order_index, 0) 
WHERE display_order = 0;

UPDATE payment_methods 
SET display_order = COALESCE(order_index, 0) 
WHERE display_order = 0;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_social_links_display_order ON social_links(user_id, display_order);
CREATE INDEX IF NOT EXISTS idx_payment_methods_display_order ON payment_methods(user_id, display_order);

-- 2. CREATE SOCIAL STORIES SYSTEM
-- Table for storing social media story photos and content
CREATE TABLE IF NOT EXISTS social_stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  social_link_id UUID REFERENCES social_links(id) ON DELETE CASCADE NOT NULL,
  
  -- Story Content
  image_url TEXT NOT NULL,
  caption TEXT,
  
  -- Payment Integration
  enable_payment BOOLEAN DEFAULT false,
  payment_button_text VARCHAR(50) DEFAULT 'Support Me',
  
  -- Story Expiration (24 hours like Instagram/Snapchat)
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '24 hours'),
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT check_caption_length CHECK (LENGTH(caption) <= 200),
  CONSTRAINT check_payment_button_text_length CHECK (LENGTH(payment_button_text) <= 50)
);

-- Indexes for social stories
CREATE INDEX IF NOT EXISTS idx_social_stories_user_id ON social_stories(user_id);
CREATE INDEX IF NOT EXISTS idx_social_stories_social_link_id ON social_stories(social_link_id);
CREATE INDEX IF NOT EXISTS idx_social_stories_expires_at ON social_stories(expires_at);
CREATE INDEX IF NOT EXISTS idx_social_stories_active ON social_stories(user_id, expires_at) WHERE expires_at > NOW();

-- 3. CREATE QR CODE WALLET SYSTEM
-- Table for storing generated QR codes
CREATE TABLE IF NOT EXISTS qr_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- QR Code Info
  name VARCHAR(100) NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('profile', 'payment', 'social')),
  url TEXT NOT NULL,
  
  -- Reference to linked items
  linked_payment_method_id UUID REFERENCES payment_methods(id) ON DELETE SET NULL,
  linked_social_link_id UUID REFERENCES social_links(id) ON DELETE SET NULL,
  
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
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT check_name_length CHECK (LENGTH(name) <= 100),
  CONSTRAINT check_color_format CHECK (color ~ '^#[0-9A-Fa-f]{6}$')
);

-- Indexes for QR codes
CREATE INDEX IF NOT EXISTS idx_qr_codes_user_id ON qr_codes(user_id);
CREATE INDEX IF NOT EXISTS idx_qr_codes_type ON qr_codes(type);
CREATE INDEX IF NOT EXISTS idx_qr_codes_active ON qr_codes(user_id, is_active, display_order);
CREATE INDEX IF NOT EXISTS idx_qr_codes_linked_payment ON qr_codes(linked_payment_method_id);
CREATE INDEX IF NOT EXISTS idx_qr_codes_linked_social ON qr_codes(linked_social_link_id);

-- 4. DATABASE FUNCTIONS FOR NEW FEATURES

-- Function to handle drag & drop reordering
CREATE OR REPLACE FUNCTION update_display_order(
  table_name TEXT,
  item_id UUID,
  new_order INTEGER,
  owner_user_id UUID
) RETURNS VOID AS $$
DECLARE
  old_order INTEGER;
BEGIN
  -- Validate table name
  IF table_name NOT IN ('social_links', 'payment_methods', 'qr_codes') THEN
    RAISE EXCEPTION 'Invalid table name: %', table_name;
  END IF;
  
  -- Get current order
  EXECUTE format('SELECT display_order FROM %I WHERE id = $1', table_name) 
  USING item_id INTO old_order;
  
  IF old_order IS NULL THEN
    RAISE EXCEPTION 'Item not found';
  END IF;
  
  -- Update orders for items in between
  IF new_order > old_order THEN
    -- Moving down: shift items up
    EXECUTE format('
      UPDATE %I 
      SET display_order = display_order - 1 
      WHERE user_id = $1 AND display_order > $2 AND display_order <= $3',
      table_name
    ) USING owner_user_id, old_order, new_order;
  ELSIF new_order < old_order THEN
    -- Moving up: shift items down
    EXECUTE format('
      UPDATE %I 
      SET display_order = display_order + 1 
      WHERE user_id = $1 AND display_order >= $2 AND display_order < $3',
      table_name
    ) USING owner_user_id, new_order, old_order;
  END IF;
  
  -- Update the moved item
  EXECUTE format('UPDATE %I SET display_order = $1, updated_at = NOW() WHERE id = $2', table_name)
  USING new_order, item_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to clean up expired stories
CREATE OR REPLACE FUNCTION cleanup_expired_stories() RETURNS VOID AS $$
BEGIN
  DELETE FROM social_stories 
  WHERE expires_at <= NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically clean up expired stories
DROP TRIGGER IF EXISTS trigger_cleanup_expired_stories ON social_stories;
CREATE TRIGGER trigger_cleanup_expired_stories
  AFTER INSERT OR UPDATE ON social_stories
  FOR EACH STATEMENT
  EXECUTE FUNCTION cleanup_expired_stories();

-- Function to automatically generate QR codes for new social links and payment methods
CREATE OR REPLACE FUNCTION auto_generate_qr_codes() RETURNS TRIGGER AS $$
BEGIN
  -- Generate QR code for new social link
  IF TG_TABLE_NAME = 'social_links' AND TG_OP = 'INSERT' THEN
    INSERT INTO qr_codes (
      user_id, name, type, url, linked_social_link_id, 
      logo_type, logo_identifier, display_order
    ) VALUES (
      NEW.user_id,
      NEW.platform || ' QR Code',
      'social',
      NEW.url,
      NEW.id,
      'social',
      NEW.platform,
      COALESCE(NEW.display_order, 0)
    );
  END IF;
  
  -- Generate QR code for new payment method
  IF TG_TABLE_NAME = 'payment_methods' AND TG_OP = 'INSERT' THEN
    INSERT INTO qr_codes (
      user_id, name, type, url, linked_payment_method_id,
      logo_type, logo_identifier, display_order
    ) VALUES (
      NEW.user_id,
      NEW.type || ' Payment QR',
      'payment',
      CASE 
        WHEN NEW.handle IS NOT NULL THEN 
          CASE NEW.type
            WHEN 'venmo' THEN 'https://venmo.com/' || LTRIM(NEW.handle, '@')
            WHEN 'cashapp' THEN 'https://cash.app/' || LTRIM(NEW.handle, '$')
            WHEN 'paypal' THEN 'https://paypal.me/' || NEW.handle
            ELSE '/profile/' || (SELECT username FROM profiles WHERE user_id = NEW.user_id LIMIT 1)
          END
        ELSE '/profile/' || (SELECT username FROM profiles WHERE user_id = NEW.user_id LIMIT 1)
      END,
      NEW.id,
      'payment',
      NEW.type,
      COALESCE(NEW.display_order, 0)
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Triggers to auto-generate QR codes
DROP TRIGGER IF EXISTS trigger_auto_qr_social_links ON social_links;
CREATE TRIGGER trigger_auto_qr_social_links
  AFTER INSERT ON social_links
  FOR EACH ROW
  EXECUTE FUNCTION auto_generate_qr_codes();

DROP TRIGGER IF EXISTS trigger_auto_qr_payment_methods ON payment_methods;
CREATE TRIGGER trigger_auto_qr_payment_methods
  AFTER INSERT ON payment_methods
  FOR EACH ROW
  EXECUTE FUNCTION auto_generate_qr_codes();

-- 5. UPDATED VIEWS TO INCLUDE NEW FEATURES

-- Drop and recreate public_profiles view with new features
DROP VIEW IF EXISTS public_profiles;
CREATE VIEW public_profiles AS
SELECT 
  p.id,
  p.username,
  p.display_name,
  p.bio,
  p.avatar_url,
  p.banner_url,
  p.location,
  p.theme,
  p.is_verified,
  p.support_message,
  p.redirect_url,
  p.redirect_message,
  p.min_tip_amount,
  p.tip_amounts,
  p.custom_tip_enabled,
  p.followers_count,
  p.created_at,
  
  -- Social links with display order and story indicators
  COALESCE((
    SELECT json_agg(
      json_build_object(
        'id', sl.id,
        'platform', sl.platform,
        'url', sl.url,
        'display_order', sl.display_order,
        'has_story', (
          SELECT COUNT(*) > 0 
          FROM social_stories ss 
          WHERE ss.social_link_id = sl.id 
            AND ss.expires_at > NOW()
        )
      ) ORDER BY sl.display_order, sl.created_at
    ) 
    FROM social_links sl 
    WHERE sl.user_id = p.user_id AND sl.enabled = true
  ), '[]'::json) as social_links,
  
  -- Payment methods with display order
  COALESCE((
    SELECT json_agg(
      json_build_object(
        'id', pm.id,
        'type', pm.type,
        'name', pm.name,
        'handle', pm.handle,
        'preferred', pm.preferred,
        'display_order', pm.display_order
      ) ORDER BY pm.display_order, pm.created_at
    ) 
    FROM payment_methods pm 
    WHERE pm.user_id = p.user_id AND pm.enabled = true
  ), '[]'::json) as payment_methods,
  
  -- Active goals
  COALESCE((
    SELECT json_agg(
      json_build_object(
        'id', g.id,
        'title', g.title,
        'description', g.description,
        'target_amount', g.target_amount,
        'current_amount', g.current_amount,
        'progress_percentage', ROUND((g.current_amount::decimal / g.target_amount * 100), 1)
      ) ORDER BY g.created_at DESC
    ) 
    FROM goals g 
    WHERE g.user_id = p.user_id AND g.is_active = true
  ), '[]'::json) as goals,
  
  -- Active QR codes for public wallet
  COALESCE((
    SELECT json_agg(
      json_build_object(
        'id', qr.id,
        'name', qr.name,
        'type', qr.type,
        'logo_type', qr.logo_type,
        'logo_identifier', qr.logo_identifier,
        'qr_data_url', qr.qr_data_url,
        'display_order', qr.display_order
      ) ORDER BY qr.display_order, qr.created_at
    )
    FROM qr_codes qr
    WHERE qr.user_id = p.user_id AND qr.is_active = true
  ), '[]'::json) as qr_codes,
  
  -- Recent support messages
  COALESCE((
    SELECT json_agg(
      json_build_object(
        'id', sm.id,
        'supporter_name', CASE WHEN sm.is_anonymous THEN null ELSE sm.supporter_name END,
        'amount', sm.amount,
        'message', sm.message,
        'created_at', sm.created_at
      ) ORDER BY sm.created_at DESC
    ) 
    FROM support_messages sm 
    WHERE sm.user_id = p.user_id 
      AND sm.is_public = true 
      AND sm.status = 'completed'
    LIMIT 10
  ), '[]'::json) as recent_support
FROM profiles p
WHERE p.private_profile = false;

-- 6. ROW LEVEL SECURITY POLICIES FOR NEW TABLES

-- Social stories policies
ALTER TABLE social_stories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own stories" ON social_stories
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own stories" ON social_stories
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own stories" ON social_stories
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own stories" ON social_stories
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Public can view non-expired stories" ON social_stories
  FOR SELECT USING (expires_at > NOW());

-- QR codes policies
ALTER TABLE qr_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own QR codes" ON qr_codes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own QR codes" ON qr_codes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own QR codes" ON qr_codes
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own QR codes" ON qr_codes
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Public can view active QR codes" ON qr_codes
  FOR SELECT USING (is_active = true);

-- =====================================================
-- END NEW FEATURES
-- =====================================================
