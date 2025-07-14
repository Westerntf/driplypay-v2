-- Fix theme constraint to match application themes
-- Run this in your Supabase SQL Editor

-- First, update any existing theme values to match the new schema
UPDATE profiles 
SET theme = CASE 
  WHEN theme = 'clean' THEN 'default'
  WHEN theme = 'neon' THEN 'theme2'
  WHEN theme = 'luxe' THEN 'theme3'
  ELSE 'default'
END
WHERE theme IN ('clean', 'neon', 'luxe');

-- Drop the old constraint
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_theme_check;

-- Add the new constraint with correct theme values
ALTER TABLE profiles ADD CONSTRAINT profiles_theme_check 
CHECK (theme IN ('default', 'theme1', 'theme2', 'theme3'));

-- Update the default value (PostgreSQL syntax)
ALTER TABLE profiles ALTER COLUMN theme SET DEFAULT 'default';

-- Verify the changes
SELECT DISTINCT theme FROM profiles;
