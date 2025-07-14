# 🚨 URGENT: Fix Storage RLS Policy Errors

## You're getting this error because Supabase storage policies aren't set up correctly.

## EXACT STEPS TO FIX:

### 1. Open Supabase Dashboard
- Go to https://supabase.com
- Sign in and select your DriplyPay project
- Click "SQL Editor" in the left sidebar

### 2. Copy and Paste This SQL
Copy the entire SQL from the file: `database/setup_storage.sql`

OR copy this complete script:

```sql
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

-- Drop existing policies
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access" ON storage.objects;
DROP POLICY IF EXISTS "Allow public deletes" ON storage.objects;
DROP POLICY IF EXISTS "Allow public updates" ON storage.objects;

-- Create new policies
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
```

### 3. Run the SQL
- Click "Run" in the Supabase SQL Editor
- You should see success messages

### 4. Test Upload
- Go back to your app
- Try uploading a photo in social stories
- The 403 errors should be gone!

## What This Fixes:
- ✅ "new row violates row-level security policy" 
- ✅ "403 Unauthorized" errors
- ✅ "Invalid response from upstream server"

## Expected Result:
- Real image uploads instead of placeholder images
- No more storage errors in your terminal console
