-- Social Stories System Migration
-- Creates Instagram/Snapchat-style photo stories for social links
-- Created: July 13, 2025

-- Create social_stories table
CREATE TABLE social_stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  social_link_id UUID REFERENCES social_links(id) ON DELETE CASCADE NOT NULL,
  
  -- Story Content
  image_url TEXT NOT NULL, -- Stored in Supabase Storage
  caption TEXT, -- Optional caption overlay
  
  -- Payment Integration
  enable_payment_button BOOLEAN DEFAULT false,
  payment_cta_text TEXT DEFAULT 'Support Me', -- Call-to-action text
  linked_payment_method_id UUID REFERENCES payment_methods(id) ON DELETE SET NULL,
  
  -- Story Metadata
  views_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '24 hours'), -- Stories expire after 24 hours
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT check_caption_length CHECK (LENGTH(caption) <= 500),
  CONSTRAINT check_cta_text_length CHECK (LENGTH(payment_cta_text) <= 50)
);

-- Create story views tracking table
CREATE TABLE social_story_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  story_id UUID REFERENCES social_stories(id) ON DELETE CASCADE NOT NULL,
  viewer_ip INET,
  user_agent TEXT,
  viewed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX social_stories_user_id_idx ON social_stories(user_id);
CREATE INDEX social_stories_social_link_id_idx ON social_stories(social_link_id);
CREATE INDEX social_stories_active_idx ON social_stories(user_id, is_active, expires_at);
CREATE INDEX social_stories_expires_at_idx ON social_stories(expires_at);

CREATE INDEX social_story_views_story_id_idx ON social_story_views(story_id);
CREATE INDEX social_story_views_viewed_at_idx ON social_story_views(viewed_at);

-- Create updated_at trigger for stories
CREATE OR REPLACE FUNCTION update_social_stories_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_social_stories_updated_at
  BEFORE UPDATE ON social_stories
  FOR EACH ROW
  EXECUTE FUNCTION update_social_stories_updated_at();

-- Create function to increment story views
CREATE OR REPLACE FUNCTION increment_story_views(story_uuid UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE social_stories 
  SET views_count = views_count + 1 
  WHERE id = story_uuid AND is_active = true AND expires_at > NOW();
END;
$$ LANGUAGE plpgsql;

-- Create function to cleanup expired stories
CREATE OR REPLACE FUNCTION cleanup_expired_stories()
RETURNS VOID AS $$
BEGIN
  -- Mark expired stories as inactive
  UPDATE social_stories 
  SET is_active = false 
  WHERE expires_at <= NOW() AND is_active = true;
  
  -- Delete story views older than 30 days
  DELETE FROM social_story_views 
  WHERE viewed_at < NOW() - INTERVAL '30 days';
END;
$$ LANGUAGE plpgsql;

-- Create function to increment QR code scan count
CREATE OR REPLACE FUNCTION increment_qr_scan_count(qr_code_uuid UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE qr_codes 
  SET scan_count = scan_count + 1,
      last_scanned_at = NOW()
  WHERE id = qr_code_uuid AND is_active = true;
END;
$$ LANGUAGE plpgsql;

-- Row Level Security Policies

-- Stories policies
CREATE POLICY "Users can manage their own stories" ON social_stories
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Active stories are publicly readable" ON social_stories
  FOR SELECT USING (is_active = true AND expires_at > NOW());

-- Story views policies
CREATE POLICY "Users can view their story analytics" ON social_story_views
  FOR SELECT USING (
    story_id IN (
      SELECT id FROM social_stories WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can record story views" ON social_story_views
  FOR INSERT WITH CHECK (true);

-- Enable RLS on new tables
ALTER TABLE social_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_story_views ENABLE ROW LEVEL SECURITY;

-- Create storage bucket for story images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'social-stories',
  'social-stories',
  true,
  10485760, -- 10MB max per story image
  ARRAY['image/jpeg', 'image/png', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- Storage policies for story images
CREATE POLICY "Public read access for story images" ON storage.objects
  FOR SELECT USING (bucket_id = 'social-stories');

CREATE POLICY "Users can upload their own story images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'social-stories' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own story images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'social-stories' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own story images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'social-stories' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
