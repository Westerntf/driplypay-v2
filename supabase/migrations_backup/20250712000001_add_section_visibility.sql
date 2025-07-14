-- Add section visibility controls to profiles table
-- This allows users to show/hide sections on their public profile

ALTER TABLE profiles 
ADD COLUMN show_social_links BOOLEAN DEFAULT true,
ADD COLUMN show_payment_methods BOOLEAN DEFAULT true, 
ADD COLUMN show_goals BOOLEAN DEFAULT true;

-- Update existing profiles to show all sections by default
UPDATE profiles 
SET 
  show_social_links = true,
  show_payment_methods = true,
  show_goals = true
WHERE 
  show_social_links IS NULL 
  OR show_payment_methods IS NULL 
  OR show_goals IS NULL;
