-- Fix theme constraint to match application theme names
-- Run this in your Supabase SQL Editor

-- Step 1: Drop the existing check constraint
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_theme_check;

-- Step 2: Add new check constraint with correct theme names
ALTER TABLE profiles ADD CONSTRAINT profiles_theme_check 
CHECK (theme IN ('clean', 'ocean', 'neon', 'luxe'));

-- Step 3: Update default value to use 'clean' instead of 'default'  
ALTER TABLE profiles ALTER COLUMN theme SET DEFAULT 'clean';

-- Step 4: Update any existing profiles with old theme names to new names
UPDATE profiles SET theme = 'clean' WHERE theme IN ('default', 'theme0');
UPDATE profiles SET theme = 'ocean' WHERE theme = 'theme1';
UPDATE profiles SET theme = 'neon' WHERE theme = 'theme2';
UPDATE profiles SET theme = 'luxe' WHERE theme = 'theme3';

-- Step 5: Verify the changes
SELECT DISTINCT theme FROM profiles;
