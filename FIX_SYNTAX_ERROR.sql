-- CORRECTED COMPLETE STORAGE FIX
-- Run this to fix the syntax error from the previous script

-- Step 1: Drop the problematic bucket policy if it exists
DROP POLICY IF EXISTS "images_bucket_policy" ON storage.buckets;

-- Step 2: Create the bucket policy (without IF NOT EXISTS)
CREATE POLICY "images_bucket_policy" ON storage.buckets
FOR ALL 
USING (id = 'images');

-- Step 3: Verify everything is working
SELECT 'FINAL CHECK - Bucket:' as info, id, name, public, file_size_limit FROM storage.buckets WHERE id = 'images';
SELECT 'FINAL CHECK - Object Policies:' as info, policyname, cmd FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage';
SELECT 'FINAL CHECK - Bucket Policies:' as info, policyname, cmd FROM pg_policies WHERE tablename = 'buckets' AND schemaname = 'storage';
