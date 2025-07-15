/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Authentication Features
 * API: Profile CRUD operations endpoint
 * Features: Get, create, update profile data with database integration
 */

import { NextRequest, NextResponse } from 'next/server'
import { ProfileDatabase } from '@/lib/profile/database'
import { supabase, createAdminClient } from '@/lib/supabase'
import { createClientWithRequest } from '@/lib/supabase/server'

// Service role client for admin operations (bypasses RLS)
const supabaseAdmin = createAdminClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const username = searchParams.get('username')
    const userId = searchParams.get('userId')

    if (username) {
      // Get public profile by username
      const profile = await ProfileDatabase.getProfileByUsername(username)
      
      if (!profile) {
        return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
      }

      return NextResponse.json({ profile })
    }

    if (userId) {
      // Get profile by user ID (for dashboard)
      const profile = await ProfileDatabase.getProfileByUserId(userId)
      
      if (!profile) {
        return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
      }

      return NextResponse.json({ profile })
    }

    return NextResponse.json({ error: 'Username or userId required' }, { status: 400 })

  } catch (error) {
    console.error('Profile API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    console.log('PUT /api/profile called')
    
    // Get the authenticated user
    const supabaseClient = createClientWithRequest(request)
    const { data: { session }, error: authError } = await supabaseClient.auth.getSession()

    if (authError || !session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user_id = session.user.id
    const body = await request.json()
    const { username, display_name, bio, theme, support_message, location, avatar_url, banner_url } = body

    console.log('Profile update data received:', { username, display_name, bio, theme, support_message, location, avatar_url, banner_url })
    console.log('Authenticated user ID:', user_id)

    // For theme-only updates, we don't need username validation
    if (theme && !username && !display_name && !bio) {
      const updates = {
        theme,
        updated_at: new Date().toISOString()
      }

      const { data, error } = await supabaseAdmin
        .from('profiles')
        .update(updates)
        .eq('user_id', user_id)
        .select()
        .single()

      if (error) {
        console.error('Error updating theme:', error)
        throw error
      }
      
      console.log('Theme updated successfully:', data)
      return NextResponse.json({ profile: data })
    }

    // For username updates, validate the username
    if (username && username.length < 3) {
      return NextResponse.json({ error: 'Username must be at least 3 characters long' }, { status: 400 })
    }

    // Check if username is already taken by another user (only if username is being updated)
    if (username) {
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('user_id')
        .eq('username', username.toLowerCase())
        .neq('user_id', user_id)
        .single()

      if (existingProfile) {
        return NextResponse.json({ error: 'Username is already taken' }, { status: 409 })
      }
    }

    // Update profile using admin client
    const updates: any = {
      updated_at: new Date().toISOString()
    }
    
    // Only update fields that are provided
    if (username) updates.username = username.toLowerCase()
    if (display_name !== undefined) updates.display_name = display_name?.trim() || null
    if (bio !== undefined) updates.bio = bio?.trim() || null
    if (theme) updates.theme = theme
    if (support_message !== undefined) updates.support_message = support_message?.trim() || null
    if (location !== undefined) updates.location = location?.trim() || null
    if (avatar_url !== undefined) updates.avatar_url = avatar_url?.trim() || null
    if (banner_url !== undefined) updates.banner_url = banner_url?.trim() || null
    
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .update(updates)
      .eq('user_id', user_id)
      .select()
      .single()

    if (error) {
      console.error('Error updating profile:', error)
      throw error
    }
    
    console.log('Profile updated successfully:', data)
    return NextResponse.json({ profile: data })

  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json(
      { error: 'Failed to update profile' }, 
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('POST /api/profile called')
    
    // Get the authenticated user
    const supabaseClient = createClientWithRequest(request)
    const { data: { session }, error: authError } = await supabaseClient.auth.getSession()

    if (authError || !session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const profileData = body

    console.log('Profile data received:', profileData)

    if (!profileData.username) {
      return NextResponse.json(
        { error: 'Username required' }, 
        { status: 400 }
      )
    }

    // Use the authenticated user's ID
    profileData.user_id = session.user.id

    // Check if username is available
    const isAvailable = await ProfileDatabase.isUsernameAvailable(profileData.username)
    
    if (!isAvailable) {
      return NextResponse.json(
        { error: 'Username already taken' }, 
        { status: 409 }
      )
    }

    // Create profile using admin client (bypasses RLS for testing)
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .insert([profileData])
      .select()
      .single()

    if (error) {
      console.error('Error creating profile:', error)
      throw error
    }
    
    console.log('Profile created successfully:', data)
    return NextResponse.json({ profile: data }, { status: 201 })

  } catch (error) {
    console.error('Profile creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create profile' }, 
      { status: 500 }
    )
  }
}
