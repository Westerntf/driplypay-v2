#!/bin/bash

# DriplyPay Database Setup Script
# This script sets up the complete database schema for your new Supabase project

echo "🚀 Setting up DriplyPay database..."
echo "Project URL: https://jsaxdaldroxtzgqpjebn.supabase.co"
echo ""

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI not found. Installing..."
    npm install -g supabase
fi

# Initialize Supabase (if not already done)
if [ ! -f "supabase/config.toml" ]; then
    echo "📋 Initializing Supabase project..."
    supabase init
fi

# Link to your remote project
echo "🔗 Linking to your Supabase project..."
supabase link --project-ref jsaxdaldroxtzgqpjebn

# Apply the enhanced schema
echo "📊 Applying enhanced database schema..."
supabase db push

echo ""
echo "✅ Database setup complete!"
echo ""
echo "Next steps:"
echo "1. Visit your Supabase dashboard: https://supabase.com/dashboard/project/jsaxdaldroxtzgqpjebn"
echo "2. Go to Authentication > Settings and configure your auth settings"
echo "3. Test the application at http://localhost:3003"
echo ""
echo "🎉 Your DriplyPay database is ready!"
