-- COPY THIS ENTIRE SCRIPT TO YOUR SUPABASE SQL EDITOR
-- This will fix the "new row violates row-level security policy" error

-- Step 1: Create the images bucket with proper configuration
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'images', 
  'images', 
  true, 
  52428800, -- 50MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Step 2: Drop any existing policies to start fresh
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access" ON storage.objects;
DROP POLICY IF EXISTS "Allow public deletes" ON storage.objects;
DROP POLICY IF EXISTS "Allow public updates" ON storage.objects;

-- Step 3: Create comprehensive policies for all operations
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

-- Step 4: Verify the setup worked
SELECT 'Bucket created:' as status, id, name, public, file_size_limit 
FROM storage.buckets 
WHERE id = 'images';

-- Step 5: Verify policies were created
SELECT 'Policies created:' as status, policyname, cmd 
FROM pg_policies 
WHERE tablename = 'objects' 
  AND schemaname = 'storage' 
  AND policyname LIKE '%public%';
