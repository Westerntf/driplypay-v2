-- Add section visibility controls to profiles table
-- Migration: Add section visibility toggles for user control over what appears on public profile

-- Try to add the columns (will fail silently if they already exist)
ALTER TABLE profiles ADD COLUMN show_social_links BOOLEAN DEFAULT true;
ALTER TABLE profiles ADD COLUMN show_payment_methods BOOLEAN DEFAULT true;
ALTER TABLE profiles ADD COLUMN show_goals BOOLEAN DEFAULT true;

-- Add comments
COMMENT ON COLUMN profiles.show_social_links IS 'Whether to display social links section on public profile';
COMMENT ON COLUMN profiles.show_payment_methods IS 'Whether to display payment methods section on public profile';
COMMENT ON COLUMN profiles.show_goals IS 'Whether to display goals section on public profile';
