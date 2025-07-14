-- Add missing columns for order_index and other required fields
-- Created: July 13, 2025

-- Add order_index to social_links if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'social_links' 
        AND column_name = 'order_index'
    ) THEN
        ALTER TABLE social_links ADD COLUMN order_index INTEGER DEFAULT 0;
    END IF;
END $$;

-- Add order_index to payment_methods if it doesn't exist  
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'payment_methods' 
        AND column_name = 'order_index'
    ) THEN
        ALTER TABLE payment_methods ADD COLUMN order_index INTEGER DEFAULT 0;
    END IF;
END $$;

-- Add username column to social_links if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'social_links' 
        AND column_name = 'username'
    ) THEN
        ALTER TABLE social_links ADD COLUMN username TEXT;
    END IF;
END $$;

-- Add label column to payment_methods if it doesn't exist (should already exist but double check)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'payment_methods' 
        AND column_name = 'label'
    ) THEN
        ALTER TABLE payment_methods ADD COLUMN label TEXT;
    END IF;
END $$;

-- Update existing records to have proper order_index values
UPDATE social_links SET order_index = 0 WHERE order_index IS NULL;
UPDATE payment_methods SET order_index = 0 WHERE order_index IS NULL;
