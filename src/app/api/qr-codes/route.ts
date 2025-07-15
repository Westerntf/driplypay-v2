/**
 * 🚀 Developer Reference: /BLUEPRINT.md → QR Code Management API
 * API: Enhanced QR Code Generation and Management
 * Features: Generate, customize, and manage QR codes with analytics and linking
 */

import { createClientWithRequest } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic'
import QRCode from 'qrcode'

export async function GET(request: NextRequest) {
  try {
    const supabase = createClientWithRequest(request)
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    // Get all QR codes for authenticated user
    const { data: qrCodes, error } = await supabase
      .from('qrcodes')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Failed to fetch QR codes' }, { status: 500 })
    }

    return NextResponse.json({ qrCodes })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClientWithRequest(request)
    const { 
      type, 
      data_content, 
      name, 
      description,
      style_preset,
      foreground_color,
      background_color,
      logo_url,
      corner_style,
      linked_social_link_id,
      linked_payment_method_id,
      include_payment_amount,
      payment_amount
    } = await request.json()

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Validate required fields
    if (!type || !data_content || !name) {
      return NextResponse.json({ 
        error: 'Type, data content, and name are required' 
      }, { status: 400 })
    }

    // Generate QR code URL from content (simplified for current schema)
    let qrContent = data_content
    
    // If it's a profile type, ensure it has the right URL
    if (type === 'profile') {
      // Get user's profile to construct proper URL
      const { data: profile } = await supabase
        .from('profiles')
        .select('username')
        .eq('user_id', user.id)
        .single()
      
      if (profile?.username) {
        qrContent = `https://driplyPay.com/${profile.username}` // Use a default domain for now
      }
    }

    // Generate QR code image
    const qrOptions = {
      width: 512,
      margin: 2,
      color: {
        dark: foreground_color || '#000000',
        light: background_color || '#FFFFFF'
      },
      errorCorrectionLevel: 'M' as const
    }

    const qrCodeDataURL = await QRCode.toDataURL(qrContent, qrOptions)

    // Create QR code record using enhanced qrcodes table structure
    const insertData: any = {
      user_id: user.id,
      type: type,
      name: name,
      data_content: qrContent,
      description: description || null,
      qr_image_url: qrCodeDataURL,
      style_preset: style_preset || 'default',
      foreground_color: foreground_color || '#000000',
      background_color: background_color || '#FFFFFF',
      logo_url: logo_url || null,
      corner_style: corner_style || 'square',
      linked_social_link_id: linked_social_link_id || null,
      linked_payment_method_id: linked_payment_method_id || null,
      include_payment_amount: include_payment_amount || false,
      payment_amount: payment_amount || null,
      scan_count: 0,
      is_active: true
    }

    // Create new QR code record
    const { data: qrCode, error } = await supabase
      .from('qrcodes')
      .insert(insertData)
      .select('*')
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Failed to create QR code' }, { status: 500 })
    }

    return NextResponse.json({ qrCode }, { status: 201 })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = createClientWithRequest(request)
    const { 
      id,
      name, 
      description,
      style_preset,
      foreground_color,
      background_color,
      logo_url,
      corner_style,
      linked_social_link_id,
      linked_payment_method_id,
      include_payment_amount,
      payment_amount
    } = await request.json()

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!id) {
      return NextResponse.json({ error: 'QR code ID required' }, { status: 400 })
    }

    // Currently not supported - would need to add columns to qrcodes table
    return NextResponse.json({ error: 'Update not supported with current schema. Please delete and recreate.' }, { status: 501 })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = createClientWithRequest(request)
    const { searchParams } = request.nextUrl
    const qrId = searchParams.get('id')

    if (!qrId) {
      return NextResponse.json({ error: 'QR code ID required' }, { status: 400 })
    }

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Delete QR code from qrcodes table
    const { error } = await supabase
      .from('qrcodes')
      .delete()
      .eq('id', qrId)
      .eq('user_id', user.id)

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Failed to delete QR code' }, { status: 500 })
    }

    return NextResponse.json({ message: 'QR code deleted successfully' })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
