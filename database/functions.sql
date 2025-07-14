-- Database function to increment profile earnings
-- This function safely increments the total_earnings field for a profile

CREATE OR REPLACE FUNCTION increment_profile_earnings(profile_user_id UUID, amount INTEGER)
RETURNS void AS $$
BEGIN
  UPDATE profiles 
  SET 
    total_earnings = COALESCE(total_earnings, 0) + amount,
    updated_at = NOW()
  WHERE user_id = profile_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
