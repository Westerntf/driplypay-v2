# 🗄️ Database Setup Instructions

## Step 1: Apply Enhanced Schema

1. **Open Supabase Dashboard**: https://supabase.com/dashboard
2. **Select your project**: Navigate to your DriplyPay project
3. **Go to SQL Editor**: Click "SQL Editor" in the left sidebar
4. **Create new query**: Click "New Query"
5. **Copy schema**: Copy the entire content from `database/enhanced_schema.sql`
6. **Run query**: Paste and execute the SQL

## Step 2: Verify Tables Created

After running the schema, you should see these tables in your Database > Tables:
- ✅ `profiles` - User profiles with theme, settings, and Stripe info
- ✅ `social_links` - Social media links for profiles
- ✅ `payment_methods` - Available payment methods (Stripe, CashApp, Venmo, etc.)
- ✅ `goals` - Fundraising goals and progress
- ✅ `support_messages` - Tips and support messages from supporters
- ✅ `qrcodes` - Generated QR codes for profiles
- ✅ `tips` - Transaction records
- ✅ `analytics` - Analytics data

## Step 3: Verify Sample Data

The schema includes sample data for testing:
- Sample user: `sarah-creator`
- Social links for Instagram, Twitter, YouTube
- Payment methods setup
- Sample goal and support messages

## Step 4: Test Authentication

1. Visit: http://localhost:3003
2. Click "Get Started" or "Sign Up"
3. Use magic link authentication
4. Verify dashboard access

## Step 5: Test Public Profile

After signing up, visit: http://localhost:3003/sarah-creator
This should show the sample public profile with:
- Profile info and bio
- Social links
- Payment methods
- Goals
- Recent support messages

## 🔧 Troubleshooting

If you encounter any issues:

1. **RLS Policies**: Make sure Row Level Security is enabled
2. **Auth Setup**: Verify your Supabase auth settings
3. **Environment**: Double-check your `.env.local` variables
4. **Browser**: Clear cache and cookies if auth isn't working

## 🎉 What's Next

After database setup:
1. ✅ Authentication flow
2. ✅ Dashboard functionality
3. ✅ Public profile pages
4. ✅ Live preview system
5. ✅ Payment integration (Stripe setup needed)

Your DriplyPay application is ready for development and testing!
