-- LOCAL SUPABASE STORAGE FIX
-- Copy and paste this into your LOCAL Supabase Studio at: http://127.0.0.1:54323

-- Step 1: Check current state
SELECT 'Current buckets:' as info, id, name, public FROM storage.buckets WHERE id = 'images';

-- Step 2: Drop any existing policies to start fresh
DROP POLICY IF EXISTS "images_public_access" ON storage.objects;
DROP POLICY IF EXISTS "allow_all_images" ON storage.objects;
DROP POLICY IF EXISTS "images_all_operations" ON storage.objects;
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access" ON storage.objects;

-- Step 3: Create/update the images bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('images', 'images', true, 52428800, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
ON CONFLICT (id) DO UPDATE SET 
  public = true, 
  file_size_limit = 52428800,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

-- Step 4: Create ONE comprehensive policy for all operations
CREATE POLICY "images_public_access" ON storage.objects
FOR ALL 
USING (bucket_id = 'images');

-- Step 5: Verify everything is set up correctly
SELECT 'Final check - Bucket:' as info, id, name, public, file_size_limit FROM storage.buckets WHERE id = 'images';
SELECT 'Final check - Policy:' as info, policyname, cmd FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage' AND policyname = 'images_public_access';

-- Step 6: Success message
SELECT 'SUCCESS: Local storage is ready!' as status;
