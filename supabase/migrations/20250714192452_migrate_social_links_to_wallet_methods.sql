-- Migrate social_links to use wallet_methods instead of payment_methods
-- This updates the social stories feature to work with the new digital wallet system

-- First, drop the old foreign key constraint
ALTER TABLE social_links DROP CONSTRAINT IF EXISTS fk_social_links_payment_method;

-- Add new foreign key to wallet_methods
ALTER TABLE social_links 
ADD CONSTRAINT fk_social_links_wallet_method 
FOREIGN KEY (payment_method_id) REFERENCES wallet_methods(id) ON DELETE SET NULL;

-- Update the index name to reflect the new relationship
DROP INDEX IF EXISTS idx_social_links_payment_method;
CREATE INDEX idx_social_links_wallet_method ON social_links(payment_method_id);

-- Note: We're keeping the column name as payment_method_id for backward compatibility
-- but it now references wallet_methods.id instead of payment_methods.id
