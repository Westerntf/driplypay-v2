-- Simple migration to add visibility columns to profiles table
-- Add section visibility controls

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS show_social_links BOOLEAN DEFAULT true;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS show_payment_methods BOOLEAN DEFAULT true;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS show_goals BOOLEAN DEFAULT true;
