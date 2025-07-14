# Database Setup Guide

## Quick Setup Instructions

1. **Go to your Supabase Dashboard**: https://supabase.com/dashboard
2. **Open SQL Editor**: Click on "SQL Editor" in the left sidebar
3. **Run the Schema**: Copy and paste the entire content of `schema.sql` into the SQL Editor and click "Run"

## What this creates:

- **Tables**: profiles, payment_methods, tips, qrcodes, analytics
- **Row Level Security**: Enabled on all tables with proper policies
- **Indexes**: For optimal query performance  
- **Triggers**: Auto-updating timestamps and profile creation
- **Functions**: Automatic profile creation on user signup

## Verification

After running the schema, you should see these tables in your Supabase Dashboard under "Table Editor":
- `profiles`
- `payment_methods` 
- `tips`
- `qrcodes`
- `analytics`

## Test the Setup

1. Start your development server: `npm run dev`
2. Go to `/signup` and create an account with your email
3. Check the `profiles` table - a new profile should be automatically created
4. Go to `/dashboard` to see your profile information

## Next Steps

Once the database is set up:
1. Test user registration and authentication
2. Implement profile management features
3. Add payment method management
4. Set up Stripe Connect integration
