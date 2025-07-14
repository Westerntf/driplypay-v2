-- Test profile creation directly in database
-- Run this in Supabase Studio SQL Editor to test

-- Check if profiles table exists
SELECT * FROM information_schema.tables WHERE table_name = 'profiles';

-- Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'profiles';

-- Test inserting a profile (replace with a real user_id from auth.users)
-- First check if there are any users
SELECT id, email FROM auth.users LIMIT 5;
