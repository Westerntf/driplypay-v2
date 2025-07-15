-- Migration: Update social_links to use wallet_methods instead of payment_methods
-- This migration updates the social_links table to reference wallet_methods

-- Step 1: Add new wallet_method_id column
ALTER TABLE social_links 
ADD COLUMN wallet_method_id UUID REFERENCES wallet_methods(id) ON DELETE SET NULL;

-- Step 2: Copy existing payment_method_id data to wallet_method_id (if needed)
-- Note: This assumes you want to preserve existing data, but since we changed the system,
-- this might not be applicable. Skip this step if starting fresh.

-- Step 3: Drop the old foreign key constraint
ALTER TABLE social_links 
DROP CONSTRAINT IF EXISTS fk_social_links_payment_method;

-- Step 4: Drop the old index
DROP INDEX IF EXISTS idx_social_links_payment_method;

-- Step 5: Remove the old payment_method_id column
ALTER TABLE social_links 
DROP COLUMN IF EXISTS payment_method_id;

-- Step 6: Create new index for wallet_method_id
CREATE INDEX idx_social_links_wallet_method ON social_links(wallet_method_id);

-- Step 7: Add comment for documentation
COMMENT ON COLUMN social_links.wallet_method_id IS 'References wallet_methods table for payment button functionality';
