-- SIMPLE BUT COMPLETE STORAGE FIX
-- Copy and paste this ENTIRE script into your Supabase SQL Editor

-- First, let's check what's currently there
SELECT 'Current bucket:' as info, id, name, public FROM storage.buckets WHERE id = 'images';
SELECT 'Current policies:' as info, policyname FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage';

-- Drop everything and start fresh
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access" ON storage.objects;
DROP POLICY IF EXISTS "Allow public deletes" ON storage.objects;
DROP POLICY IF EXISTS "Allow public updates" ON storage.objects;
DROP POLICY IF EXISTS "images_bucket_all_access" ON storage.objects;
DROP POLICY IF EXISTS "images_bucket_insert" ON storage.objects;
DROP POLICY IF EXISTS "images_bucket_select" ON storage.objects;
DROP POLICY IF EXISTS "images_bucket_update" ON storage.objects;
DROP POLICY IF EXISTS "images_bucket_delete" ON storage.objects;

-- Create/update the bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('images', 'images', true, 52428800, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
ON CONFLICT (id) DO UPDATE SET public = true, file_size_limit = 52428800;

-- Create ONE comprehensive policy that allows everything
CREATE POLICY "images_all_operations" ON storage.objects
FOR ALL USING (bucket_id = 'images');

-- Verify the setup
SELECT 'Final bucket:' as info, id, name, public, file_size_limit FROM storage.buckets WHERE id = 'images';
SELECT 'Final policies:' as info, policyname, cmd FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage' AND policyname = 'images_all_operations';
