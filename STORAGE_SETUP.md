# Supabase Storage Setup for Social Stories

## Quick Setup Instructions

### 1. Create Storage Bucket
1. Go to your Supabase dashboard
2. Navigate to "Storage" in the sidebar
3. Click "Create a new bucket"
4. Name: `images`
5. Set as **Public bucket** ✅
6. Click "Create bucket"

### 2. Set Bucket Policies (REQUIRED)

**You're getting RLS errors because policies aren't set up correctly.** Run this complete SQL in your Supabase SQL Editor:

```sql
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

-- Step 4: Verify the setup
SELECT id, name, public, file_size_limit, allowed_mime_types 
FROM storage.buckets 
WHERE id = 'images';

-- Check policies are created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies 
WHERE tablename = 'objects' AND schemaname = 'storage';
```

### 3. Alternative: Use Development Mode

The upload API now includes a fallback mode that uses placeholder images when storage isn't configured. You can develop and test the complete social stories feature without setting up storage.

### Current Status

- ✅ Upload API handles storage errors gracefully
- ✅ Falls back to placeholder images for development
- ✅ Photo modal functionality works end-to-end
- ⚠️ Storage bucket needs setup for real image uploads

## Testing

You can now test the photo upload functionality. If storage isn't configured, you'll see placeholder images but the complete flow will work including:

- Photo selection
- Caption adding
- Payment button configuration
- Story creation and saving

The system will show a development message when using placeholders.
