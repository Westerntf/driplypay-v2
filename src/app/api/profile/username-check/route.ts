/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Profile Editor Features
 * API: Username availability checking
 * Features: Real-time username validation for profile editor
 */

import { NextRequest, NextResponse } from 'next/server'
import { ProfileDatabase } from '@/lib/profile/database'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const username = searchParams.get('username')
    const excludeUserId = searchParams.get('excludeUserId')

    if (!username) {
      return NextResponse.json({ error: 'Username required' }, { status: 400 })
    }

    // Basic username validation
    const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/
    if (!usernameRegex.test(username)) {
      return NextResponse.json({
        available: false,
        reason: 'Username must be 3-20 characters long and contain only letters, numbers, underscores, and hyphens'
      })
    }

    // Check availability in database
    const isAvailable = await ProfileDatabase.isUsernameAvailable(
      username.toLowerCase(),
      excludeUserId || undefined
    )

    return NextResponse.json({
      available: isAvailable,
      username: username.toLowerCase(),
      reason: isAvailable ? null : 'Username is already taken'
    })

  } catch (error) {
    console.error('Username check error:', error)
    return NextResponse.json(
      { error: 'Failed to check username availability' }, 
      { status: 500 }
    )
  }
}
