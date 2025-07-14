-- Add photo story fields to social_links table
ALTER TABLE social_links 
ADD COLUMN photo_url TEXT;

ALTER TABLE social_links 
ADD COLUMN photo_caption TEXT;

ALTER TABLE social_links 
ADD COLUMN payment_method_id UUID;

-- Add foreign key constraint
ALTER TABLE social_links 
ADD CONSTRAINT fk_social_links_payment_method 
FOREIGN KEY (payment_method_id) REFERENCES payment_methods(id);

-- Create index for better performance
CREATE INDEX idx_social_links_payment_method ON social_links(payment_method_id);
