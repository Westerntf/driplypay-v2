-- Storage Setup for DriplyPay Social Stories
-- Run this in your Supabase SQL Editor

-- Step 1: Create the images bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'images', 
  'images', 
  true, 
  52428800, -- 50MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Step 2: Set up RLS policies for public access (development mode)
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access" ON storage.objects;
DROP POLICY IF EXISTS "Allow public deletes" ON storage.objects;
DROP POLICY IF EXISTS "Allow public updates" ON storage.objects;

-- Create comprehensive public policy for development
CREATE POLICY "Allow public uploads" ON storage.objects
FOR INSERT 
WITH CHECK (bucket_id = 'images');

CREATE POLICY "Allow public access" ON storage.objects
FOR SELECT 
USING (bucket_id = 'images');

CREATE POLICY "Allow public deletes" ON storage.objects
FOR DELETE 
USING (bucket_id = 'images');

CREATE POLICY "Allow public updates" ON storage.objects
FOR UPDATE 
USING (bucket_id = 'images')
WITH CHECK (bucket_id = 'images');

-- Verify bucket creation
SELECT id, name, public, file_size_limit, allowed_mime_types 
FROM storage.buckets 
WHERE id = 'images';

-- Check policies are created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies 
WHERE tablename = 'objects' AND schemaname = 'storage';
