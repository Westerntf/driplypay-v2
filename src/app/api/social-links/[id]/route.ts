/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Profile Editor Features
 * API: Individual social link operations
 * Features: Update and delete specific social links
 */

import { NextRequest, NextResponse } from 'next/server'
import { SocialLinksDatabase } from '@/lib/profile/database'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { platform, url, label, enabled } = body
    const id = params.id

    if (!platform || !url) {
      return NextResponse.json(
        { error: 'Platform and URL required' }, 
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

    const updates = {
      platform,
      url,
      label: label || platform,
      ...(enabled !== undefined && { enabled })
    }

    const updatedLink = await SocialLinksDatabase.updateSocialLink(id, updates)
    
    return NextResponse.json({ socialLink: updatedLink })

  } catch (error) {
    console.error('Social link update error:', error)
    return NextResponse.json(
      { error: 'Failed to update social link' }, 
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id

    await SocialLinksDatabase.deleteSocialLink(id)
    
    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Social link deletion error:', error)
    return NextResponse.json(
      { error: 'Failed to delete social link' }, 
      { status: 500 }
    )
  }
}
