-- Create storage bucket for profile images
DO $$
BEGIN
    -- Create the images bucket if it doesn't exist
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('images', 'images', true)
    ON CONFLICT (id) DO NOTHING;
END $$;

-- Set up RLS policies for the images bucket

-- Policy 1: Allow authenticated users to upload images to their own folder
CREATE POLICY "Users can upload own images" ON storage.objects
    FOR INSERT 
    WITH CHECK (
        auth.uid()::text = (storage.foldername(name))[1] AND
        bucket_id = 'images'
    );

-- Policy 2: Allow users to update their own images
CREATE POLICY "Users can update own images" ON storage.objects
    FOR UPDATE 
    USING (
        auth.uid()::text = (storage.foldername(name))[1] AND
        bucket_id = 'images'
    );

-- Policy 3: Allow users to delete their own images
CREATE POLICY "Users can delete own images" ON storage.objects
    FOR DELETE 
    USING (
        auth.uid()::text = (storage.foldername(name))[1] AND
        bucket_id = 'images'
    );

-- Policy 4: Allow public read access to all images
CREATE POLICY "Public can view images" ON storage.objects
    FOR SELECT 
    USING (bucket_id = 'images');

-- RLS is already enabled on storage.objects by default
-- ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
