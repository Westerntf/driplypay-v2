-- Apply the enhanced schema updates
-- This migration adds missing columns and features to bring database up to date

-- Update profiles table with missing columns
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS banner_url TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS location TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS tip_amounts INTEGER[] DEFAULT ARRAY[500, 1000, 2500, 5000, 10000];
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS custom_tip_enabled BOOLEAN DEFAULT true;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS followers_count INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS total_earnings INTEGER DEFAULT 0;

-- Update payment_methods table
ALTER TABLE payment_methods ADD COLUMN IF NOT EXISTS handle TEXT;
ALTER TABLE payment_methods ADD COLUMN IF NOT EXISTS total_earnings INTEGER DEFAULT 0;
ALTER TABLE payment_methods ADD COLUMN IF NOT EXISTS total_clicks INTEGER DEFAULT 0;

-- Create support_messages table (evolution of tips table)
CREATE TABLE IF NOT EXISTS support_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  amount INTEGER NOT NULL, -- in cents
  currency TEXT DEFAULT 'usd',
  anonymous BOOLEAN DEFAULT false,
  message TEXT,
  stripe_payment_intent_id TEXT,
  supporter_name TEXT,
  supporter_email TEXT,
  is_public BOOLEAN DEFAULT true,
  payment_method_id UUID REFERENCES payment_methods(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
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

-- Add goals table if it doesn't exist
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

-- Add analytics table if it doesn't exist
CREATE TABLE IF NOT EXISTS analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('profile_view', 'payment_click', 'qr_scan', 'tip_received', 'social_click', 'goal_view')),
  payment_method_id UUID REFERENCES payment_methods(id) ON DELETE SET NULL,
  qr_code_id UUID REFERENCES qrcodes(id) ON DELETE SET NULL,
  goal_id UUID REFERENCES goals(id) ON DELETE SET NULL,
  amount INTEGER,
  visitor_ip TEXT,
  user_agent TEXT,
  referrer TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Update indexes
CREATE INDEX IF NOT EXISTS goals_user_id_idx ON goals(user_id);
CREATE INDEX IF NOT EXISTS goals_active_idx ON goals(is_active);
CREATE INDEX IF NOT EXISTS analytics_user_id_idx ON analytics(user_id);
CREATE INDEX IF NOT EXISTS analytics_event_type_idx ON analytics(event_type);

-- Update RLS policies for new tables
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

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

-- Analytics policies
DROP POLICY IF EXISTS "Users can view own analytics" ON analytics;
CREATE POLICY "Users can view own analytics" ON analytics
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Anyone can insert analytics" ON analytics;
CREATE POLICY "Anyone can insert analytics" ON analytics
  FOR INSERT WITH CHECK (true);

-- Add updated_at triggers for new tables
DROP TRIGGER IF EXISTS update_goals_updated_at ON goals;
CREATE TRIGGER update_goals_updated_at BEFORE UPDATE ON goals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Update public_profiles view
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
        'id', sl.id,
        'platform', sl.platform,
        'url', sl.url,
        'label', sl.label,
        'enabled', sl.enabled
      ) ORDER BY sl.order_index
    ) 
    FROM social_links sl 
    WHERE sl.user_id = p.user_id AND sl.enabled = true), 
    '[]'::json
  ) as social_links,
  COALESCE(
    (SELECT json_agg(
      json_build_object(
        'id', pm.id,
        'type', pm.type,
        'label', pm.label,
        'url', pm.url,
        'handle', pm.handle,
        'preferred', pm.preferred,
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
