/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Social Stories
 * API: Update social links with photo story data
 * Features: Add/update/remove photos from social links
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'

export async function PATCH(request: NextRequest) {
  try {
    const { linkId, photo_url, photo_caption, wallet_method_id } = await request.json()

    if (!linkId) {
      return NextResponse.json(
        { error: 'Link ID is required' },
        { status: 400 }
      )
    }

    const supabase = createClient()

    // Update the social link with photo data
    const { data, error } = await supabase
      .from('social_links')
      .update({
        photo_url: photo_url || null,
        photo_caption: photo_caption || null,
        wallet_method_id: wallet_method_id || null,
        updated_at: new Date().toISOString()
      })
      .eq('id', linkId)
      .select('*')
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: `Failed to update social link: ${error.message}` },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: data
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const linkId = searchParams.get('linkId')

    if (!linkId) {
      return NextResponse.json(
        { error: 'Link ID is required' },
        { status: 400 }
      )
    }

    const supabase = createClient()

    // Get social link with photo data
    const { data, error } = await supabase
      .from('social_links')
      .select(`
        *,
        payment_methods (
          id,
          name,
          type
        )
      `)
      .eq('id', linkId)
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: `Failed to fetch social link: ${error.message}` },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: data
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
