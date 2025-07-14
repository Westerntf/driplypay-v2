-- Copy and paste this into your Supabase SQL Editor
-- This creates the storage bucket and policies for social stories

-- Create the images bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'images', 
  'images', 
  true, 
  52428800,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Create policies for public access (development mode)
CREATE POLICY "Allow public uploads" ON storage.objects
FOR INSERT 
WITH CHECK (bucket_id = 'images');

CREATE POLICY "Allow public access" ON storage.objects
FOR SELECT 
USING (bucket_id = 'images');

CREATE POLICY "Allow public deletes" ON storage.objects
FOR DELETE 
USING (bucket_id = 'images');

-- Verify the bucket was created
SELECT id, name, public, file_size_limit 
FROM storage.buckets 
WHERE id = 'images';
