/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Social Story Views API
 * API: Track story views and analytics
 * Features: Record story views and get view analytics
 */

import { createClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    
    const { story_id, viewer_ip, user_agent } = await request.json()

    if (!story_id) {
      return NextResponse.json({ error: 'Story ID required' }, { status: 400 })
    }

    // Record the view
    const { error: insertError } = await supabase
      .from('social_story_views')
      .insert({
        story_id,
        viewer_ip: viewer_ip || null,
        user_agent: user_agent || null
      })

    if (insertError) {
      console.error('Database error:', insertError)
      return NextResponse.json({ error: 'Failed to record view' }, { status: 500 })
    }

    // Increment the story view count using our database function
    const { error: functionError } = await supabase
      .rpc('increment_story_views', { story_uuid: story_id })

    if (functionError) {
      console.error('Function error:', functionError)
      // Don't fail the request if the function fails, just log it
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const { searchParams } = request.nextUrl
    const storyId = searchParams.get('storyId')

    if (!storyId) {
      return NextResponse.json({ error: 'Story ID required' }, { status: 400 })
    }

    // Verify the story belongs to the user and get view analytics
    const { data: storyViews, error } = await supabase
      .from('social_story_views')
      .select(`
        *,
        social_stories!inner(user_id)
      `)
      .eq('story_id', storyId)
      .eq('social_stories.user_id', user.id)
      .order('viewed_at', { ascending: false })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Failed to fetch view analytics' }, { status: 500 })
    }

    return NextResponse.json({ views: storyViews })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
