-- Add photo story columns to social_links table
-- This fixes the issue where social links aren't saving because of missing columns

-- Add photo story fields to social_links table
ALTER TABLE social_links 
ADD COLUMN IF NOT EXISTS photo_url TEXT;

ALTER TABLE social_links 
ADD COLUMN IF NOT EXISTS photo_caption TEXT;

ALTER TABLE social_links 
ADD COLUMN IF NOT EXISTS payment_method_id UUID;

-- Add foreign key constraint for payment method
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'fk_social_links_payment_method'
    ) THEN
        ALTER TABLE social_links 
        ADD CONSTRAINT fk_social_links_payment_method 
        FOREIGN KEY (payment_method_id) REFERENCES payment_methods(id) ON DELETE SET NULL;
    END IF;
END $$;

-- Create index for better performance if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE indexname = 'idx_social_links_payment_method'
    ) THEN
        CREATE INDEX idx_social_links_payment_method ON social_links(payment_method_id);
    END IF;
END $$;

-- Add helpful comment
COMMENT ON COLUMN social_links.photo_url IS 'URL to uploaded photo story image';
COMMENT ON COLUMN social_links.photo_caption IS 'Caption text for the photo story';
COMMENT ON COLUMN social_links.payment_method_id IS 'Optional linked payment method for photo story';
