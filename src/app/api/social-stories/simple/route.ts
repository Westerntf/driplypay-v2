/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Social Stories API
 * API: Simple Social Stories (No Auth Required)
 * Features: Create, read, delete stories without authentication
 */

import { createClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const { searchParams } = request.nextUrl
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    // Get stories for the user
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
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const requestBody = await request.json()

    const { 
      user_id,
      social_link_id,
      image_url,
      caption,
      enable_payment_button,
      payment_cta_text,
      linked_payment_method_id
    } = requestBody

    // Validate required fields
    if (!user_id || !social_link_id || !image_url) {
      return NextResponse.json({ 
        error: 'User ID, social link ID, and image URL are required' 
      }, { status: 400 })
    }

    // Create new story
    const storyData = {
      user_id,
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
    const supabase = createClient()
    const { searchParams } = request.nextUrl
    const storyId = searchParams.get('id')

    if (!storyId) {
      return NextResponse.json({ error: 'Story ID required' }, { status: 400 })
    }

    // Delete story
    const { error } = await supabase
      .from('social_stories')
      .delete()
      .eq('id', storyId)

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
