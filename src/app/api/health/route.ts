/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Database & Schema
 * API: Health check endpoint for system monitoring
 * Features: Database connectivity, system status, environment validation
 */
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'

export async function GET() {
  try {
    const supabase = createClient()
    
    // Test database connection
    let dbStatus = 'healthy'
    let dbError = null
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('count')
        .limit(1)
      
      if (error) {
        dbStatus = 'unhealthy'
        dbError = error.message
      }
    } catch (err) {
      dbStatus = 'unhealthy'
      dbError = 'Connection failed'
    }

    // Test environment variables
    const envStatus = {
      supabase_url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabase_anon_key: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      stripe_publishable: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      stripe_secret: !!process.env.STRIPE_SECRET_KEY,
    }

    return NextResponse.json({
      status: dbStatus === 'healthy' ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      version: '0.1.0',
      services: {
        database: dbStatus,
        environment: envStatus,
      },
      ...(dbError && { error: dbError })
    })
  } catch (error) {
    console.error('Health check failed:', error)
    return NextResponse.json(
      { 
        status: 'unhealthy', 
        error: 'Internal server error' 
      },
      { status: 500 }
    )
  }
}
