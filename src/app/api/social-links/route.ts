/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Profile Editor Features
 * API: Social links CRUD operations
 * Features: Add, update, delete, reorder social links
 */

import { NextRequest, NextResponse } from 'next/server'

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic'
import { SocialLinksDatabase } from '@/lib/profile/database'
import { createAdminClient } from '@/lib/supabase'

// Service role client for admin operations (bypasses RLS)
const supabaseAdmin = createAdminClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    const socialLinks = await SocialLinksDatabase.getSocialLinks(userId)
    
    return NextResponse.json({ socialLinks })

  } catch (error) {
    console.error('Social links fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch social links' }, 
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, platform, url, label, enabled = true, orderIndex } = body

    if (!userId || !platform || !url) {
      return NextResponse.json(
        { error: 'User ID, platform, and URL required' }, 
        { status: 400 }
      )
    }

    // Basic URL validation
    try {
      new URL(url)
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' }, 
        { status: 400 }
      )
    }

    const linkData = {
      user_id: userId,
      platform,
      url,
      label: label || platform,
      enabled,
      display_order: orderIndex || 0
    }

    const newLink = await SocialLinksDatabase.addSocialLink(linkData)
    
    return NextResponse.json({ socialLink: newLink }, { status: 201 })

  } catch (error) {
    console.error('Social link creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create social link' }, 
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { links } = body

    if (!Array.isArray(links)) {
      return NextResponse.json(
        { error: 'Links array required for reordering' }, 
        { status: 400 }
      )
    }

    // Update order for multiple links
    await SocialLinksDatabase.updateSocialLinksOrder(links)
    
    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Social links reorder error:', error)
    return NextResponse.json(
      { error: 'Failed to reorder social links' }, 
      { status: 500 }
    )
  }
}
