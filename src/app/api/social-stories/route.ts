/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Social Stories API
 * API: Social Stories Management
 * Features: Upload, manage, and view Instagram/Snapchat-style photo stories
 */

import { createClientWithRequest } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const supabase = createClientWithRequest(request)
    const { searchParams } = request.nextUrl
    const userId = searchParams.get('userId')

    if (userId) {
      // Get stories for a specific user (public view)
      const { data: stories, error } = await supabase
        .from('social_stories')
        .select(`
          *,
          social_links!inner(platform, label),
          payment_methods(name, type)
        `)
        .eq('user_id', userId)
        .eq('is_active', true)
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Database error:', error)
        return NextResponse.json({ error: 'Failed to fetch stories' }, { status: 500 })
      }

      return NextResponse.json({ stories })
    } else {
      // Get authenticated user's stories
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError || !user) {
        return NextResponse.json({ stories: [] })
      }

      const { data: stories, error } = await supabase
        .from('social_stories')
        .select(`
          *,
          social_links!inner(platform, label),
          payment_methods(name, type)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Database error:', error)
        return NextResponse.json({ error: 'Failed to fetch stories' }, { status: 500 })
      }

      return NextResponse.json({ stories })
    }
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClientWithRequest(request)
    const requestBody = await request.json()
    
    // In development mode, skip auth completely
    const isDevelopment = process.env.NODE_ENV === 'development'
    let authenticatedUser = null
    
    if (isDevelopment) {
      // Development mode - use provided user ID or fallback
      const devUserId = requestBody?.dev_user_id || 'dev-test-user'
      authenticatedUser = { id: devUserId, email: 'dev@example.com' } as any
      console.log('🚧 DEVELOPMENT MODE - Using user ID:', devUserId)
    } else {
      // Production mode - require auth
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError || !user) {
        return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
      }
      authenticatedUser = user
    }

    const { 
      social_link_id,
      image_url,
      caption,
      enable_payment_button,
      payment_cta_text,
      linked_payment_method_id
    } = requestBody

    // Validate required fields
    if (!social_link_id || !image_url) {
      console.log('❌ Social Stories API - Missing required fields:', { social_link_id, image_url })
      return NextResponse.json({ 
        error: 'Social link ID and image URL are required' 
      }, { status: 400 })
    }

    // Verify the social link belongs to the user (skip in development)
    if (!isDevelopment) {
      const { data: socialLink, error: linkError } = await supabase
        .from('social_links')
        .select('id')
        .eq('id', social_link_id)
        .eq('user_id', authenticatedUser.id)
        .single()

      if (linkError || !socialLink) {
        return NextResponse.json({ error: 'Invalid social link' }, { status: 400 })
      }
    }

    // Create new story
    const storyData = {
      user_id: authenticatedUser.id,
      social_link_id,
      image_url,
      caption: caption || null,
      enable_payment_button: enable_payment_button || false,
      payment_cta_text: payment_cta_text || 'Support Me',
      linked_payment_method_id: linked_payment_method_id || null,
      views_count: 0,
      is_active: true,
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours from now
    }

    const { data: story, error } = await supabase
      .from('social_stories')
      .insert(storyData)
      .select(`
        *,
        social_links!inner(platform, label),
        payment_methods(name, type)
      `)
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Failed to create story' }, { status: 500 })
    }

    return NextResponse.json({ story }, { status: 201 })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = createClientWithRequest(request)
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const { searchParams } = request.nextUrl
    const storyId = searchParams.get('id')

    if (!storyId) {
      return NextResponse.json({ error: 'Story ID required' }, { status: 400 })
    }

    // Delete story (only if it belongs to the user)
    const { error } = await supabase
      .from('social_stories')
      .delete()
      .eq('id', storyId)
      .eq('user_id', user.id)

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Failed to delete story' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
