-- Simple migration to create social_stories table only
-- This should work without conflicts

-- Create social stories table
CREATE TABLE IF NOT EXISTS social_stories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    social_link_id UUID REFERENCES social_links(id) ON DELETE CASCADE NOT NULL,
    
    -- Story Content
    image_url TEXT NOT NULL,
    caption TEXT,
    
    -- Payment Integration
    enable_payment_button BOOLEAN DEFAULT false,
    payment_cta_text TEXT DEFAULT 'Support Me',
    linked_payment_method_id UUID REFERENCES payment_methods(id) ON DELETE SET NULL,
    
    -- Story Metadata
    views_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '24 hours'),
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT check_caption_length CHECK (LENGTH(caption) <= 500),
    CONSTRAINT check_cta_text_length CHECK (LENGTH(payment_cta_text) <= 50)
);

-- Create story views tracking table
CREATE TABLE IF NOT EXISTS social_story_views (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    story_id UUID REFERENCES social_stories(id) ON DELETE CASCADE NOT NULL,
    viewer_ip INET,
    user_agent TEXT,
    viewed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE social_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_story_views ENABLE ROW LEVEL SECURITY;

-- Social Stories RLS Policies
DROP POLICY IF EXISTS "Users can manage their own stories" ON social_stories;
CREATE POLICY "Users can manage their own stories" ON social_stories
    FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Active stories are publicly readable" ON social_stories;
CREATE POLICY "Active stories are publicly readable" ON social_stories
    FOR SELECT USING (
        is_active AND expires_at > NOW() AND 
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.user_id = social_stories.user_id 
            AND NOT profiles.private_profile
        )
    );

-- Story Views RLS Policies
DROP POLICY IF EXISTS "Users can view own story analytics" ON social_story_views;
CREATE POLICY "Users can view own story analytics" ON social_story_views
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM social_stories 
            WHERE social_stories.id = social_story_views.story_id 
            AND social_stories.user_id = auth.uid()
        )
    );

DROP POLICY IF EXISTS "Anyone can create story views" ON social_story_views;
CREATE POLICY "Anyone can create story views" ON social_story_views
    FOR INSERT WITH CHECK (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS social_stories_user_id_idx ON social_stories(user_id);
CREATE INDEX IF NOT EXISTS social_stories_social_link_id_idx ON social_stories(social_link_id);
CREATE INDEX IF NOT EXISTS social_stories_active_idx ON social_stories(user_id, is_active, expires_at);
CREATE INDEX IF NOT EXISTS social_stories_expires_at_idx ON social_stories(expires_at);

CREATE INDEX IF NOT EXISTS social_story_views_story_id_idx ON social_story_views(story_id);
CREATE INDEX IF NOT EXISTS social_story_views_viewed_at_idx ON social_story_views(viewed_at);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to social_stories
DROP TRIGGER IF EXISTS update_social_stories_updated_at ON social_stories;
CREATE TRIGGER update_social_stories_updated_at
    BEFORE UPDATE ON social_stories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
