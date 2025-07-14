/**
 * 🚀 Developer Reference: /BLUEPRINT.md → QR Code Analytics API
 * API: QR Code Scan Tracking and Analytics
 * Features: Track QR code scans and provide analytics data
 */

import { createClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const { qrCodeId } = await request.json()

    if (!qrCodeId) {
      return NextResponse.json({ error: 'QR code ID required' }, { status: 400 })
    }

    // Get client IP and user agent
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Record the scan
    const { error: scanError } = await supabase
      .from('qr_code_scans')
      .insert({
        qr_code_id: qrCodeId,
        scanned_ip: clientIP,
        user_agent: userAgent
      })

    if (scanError) {
      console.error('Error recording scan:', scanError)
      // Don't fail the request if scan tracking fails
    }

    // Increment the QR code scan count using RPC
    const { error: incrementError } = await supabase
      .rpc('increment_qr_scan_count', { qr_code_uuid: qrCodeId })

    if (incrementError) {
      console.error('Error incrementing scan count:', incrementError)
      // Don't fail the request if increment fails
    }

    return NextResponse.json({ message: 'Scan recorded' })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const { searchParams } = new URL(request.url)
    const qrCodeId = searchParams.get('qrCodeId')

    if (!qrCodeId) {
      return NextResponse.json({ error: 'QR code ID required' }, { status: 400 })
    }

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify user owns this QR code
    const { data: qrCode, error: qrError } = await supabase
      .from('qr_codes')
      .select('user_id, scan_count, created_at, last_scanned_at')
      .eq('id', qrCodeId)
      .single()

    if (qrError || !qrCode || qrCode.user_id !== user.id) {
      return NextResponse.json({ error: 'QR code not found' }, { status: 404 })
    }

    // Get scan analytics for the last 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const { data: scans, error: scansError } = await supabase
      .from('qr_code_scans')
      .select('scanned_at, scanned_ip')
      .eq('qr_code_id', qrCodeId)
      .gte('scanned_at', thirtyDaysAgo.toISOString())
      .order('scanned_at', { ascending: false })

    if (scansError) {
      console.error('Error fetching scans:', scansError)
      return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
    }

    // Group scans by day for chart data
    const scansByDay: Record<string, number> = {}
    scans?.forEach(scan => {
      const day = new Date(scan.scanned_at).toISOString().split('T')[0]
      scansByDay[day] = (scansByDay[day] || 0) + 1
    })

    // Calculate unique IPs (approximate unique users)
    const uniqueIPs = new Set(scans?.map(scan => scan.scanned_ip)).size

    const analytics = {
      totalScans: qrCode.scan_count,
      uniqueUsers: uniqueIPs,
      scansLast30Days: scans?.length || 0,
      createdAt: qrCode.created_at,
      lastScannedAt: qrCode.last_scanned_at,
      scansByDay
    }

    return NextResponse.json({ analytics })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
