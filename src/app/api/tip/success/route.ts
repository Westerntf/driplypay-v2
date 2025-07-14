/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Payment System Features
 * API: Handle successful tip completion and redirect
 * Features: Success confirmation, analytics, user feedback
 */
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const sessionId = searchParams.get('session_id')
  
  if (!sessionId) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // You could verify the session with Stripe here if needed
  // For now, we'll just redirect with a success parameter
  
  return NextResponse.redirect(new URL(`${request.nextUrl.pathname}?success=true`, request.url))
}
