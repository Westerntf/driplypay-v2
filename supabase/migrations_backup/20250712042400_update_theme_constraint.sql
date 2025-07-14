-- Update theme constraint to support new theme values
-- Remove old constraint and add new one with updated theme options

-- Drop the old constraint
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_theme_check;

-- Add new constraint with both old and new theme values for backward compatibility
ALTER TABLE profiles ADD CONSTRAINT profiles_theme_check 
  CHECK (theme IN ('clean', 'neon', 'luxe', 'default', 'theme1', 'theme2', 'theme3'));

-- Update existing 'luxe' themes to 'theme3' (Fire theme) as they're similar
UPDATE profiles SET theme = 'theme3' WHERE theme = 'luxe';

-- Update existing 'neon' themes to 'theme2' (Cosmic theme) as they're similar  
UPDATE profiles SET theme = 'theme2' WHERE theme = 'neon';

-- Update existing 'clean' themes to 'theme1' (Ocean theme) as they're similar
UPDATE profiles SET theme = 'theme1' WHERE theme = 'clean';
