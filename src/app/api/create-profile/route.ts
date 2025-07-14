/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Authentication Features
 * API: Profile creation endpoint for new user onboarding
 * Features: Profile setup, username validation, database integration
 */
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    
    // Get the current user from the request headers
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json(
        { error: 'No authorization header' },
        { status: 401 }
      )
    }

    // Set the auth header for the request
    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    )
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    console.log('🔍 Creating profile for user:', user.id)

    // Check if profile already exists
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (existingProfile) {
      return NextResponse.json({
        message: 'Profile already exists',
        profile: existingProfile
      })
    }

    // Create a unique username
    const timestamp = Date.now().toString().slice(-6)
    const username = `user_${user.id.substring(0, 8)}_${timestamp}`

    console.log('🆔 Generated username:', username)

    // Create the profile
    const { data: newProfile, error: createError } = await supabase
      .from('profiles')
      .insert({
        user_id: user.id,
        username: username,
        display_name: user.user_metadata?.full_name || user.user_metadata?.name || 'New Creator',
        bio: 'Add your bio here to tell supporters about yourself and what you create.',
        theme: 'default'
      })
      .select()
      .single()

    if (createError) {
      console.error('❌ Error creating profile:', createError)
      return NextResponse.json(
        { error: 'Failed to create profile', details: createError },
        { status: 500 }
      )
    }

    // Also create default payment method
    const { error: paymentError } = await supabase
      .from('payment_methods')
      .insert({
        user_id: user.id,
        type: 'stripe',
        name: 'Credit Cards & Bank Transfers',
        url: '',
        preferred: true,
        display_order: 0
      })

    if (paymentError) {
      console.warn('⚠️ Warning: Failed to create default payment method:', paymentError)
    }

    console.log('✅ Profile created successfully:', newProfile)

    return NextResponse.json({
      message: 'Profile created successfully',
      profile: newProfile
    })

  } catch (error) {
    console.error('❌ Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error },
      { status: 500 }
    )
  }
}
