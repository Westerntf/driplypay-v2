/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Profile Features
 * API: Handles bulk reordering of social links and payment methods
 * Features: Drag & drop reordering, optimistic updates, validation
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'

interface ReorderRequest {
  type: 'social_links' | 'payment_methods' | 'qr_codes'
  items: Array<{ id: string; display_order: number }>
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    
    // Get user from session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    
    if (sessionError || !session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const user = session.user
    const body: ReorderRequest = await request.json()
    const { type, items } = body

    // Validate request
    if (!type || !items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      )
    }

    // Validate type
    const allowedTypes = ['social_links', 'payment_methods', 'qr_codes']
    if (!allowedTypes.includes(type)) {
      return NextResponse.json(
        { error: 'Invalid type' },
        { status: 400 }
      )
    }

    // Validate items
    if (items.some(item => !item.id || typeof item.display_order !== 'number')) {
      return NextResponse.json(
        { error: 'Invalid item data' },
        { status: 400 }
      )
    }

    // Update display orders in batch
    const updates = items.map(item => ({
      id: item.id,
      display_order: item.display_order,
      updated_at: new Date().toISOString()
    }))

    // Verify user owns all items before updating
    const { data: existingItems, error: fetchError } = await supabase
      .from(type)
      .select('id, user_id')
      .in('id', items.map(item => item.id))

    if (fetchError) {
      console.error('Error fetching items:', fetchError)
      return NextResponse.json(
        { error: 'Failed to verify items' },
        { status: 500 }
      )
    }

    // Check ownership
    const unauthorized = existingItems?.some(item => item.user_id !== user.id)
    if (unauthorized) {
      return NextResponse.json(
        { error: 'Unauthorized to modify these items' },
        { status: 403 }
      )
    }

    // Perform bulk update using upsert
    const { error: updateError } = await supabase
      .from(type)
      .upsert(updates, { 
        onConflict: 'id',
        ignoreDuplicates: false 
      })

    if (updateError) {
      console.error('Error updating display orders:', updateError)
      return NextResponse.json(
        { error: 'Failed to update order' },
        { status: 500 }
      )
    }

    // For QR codes, also update any linked QR codes
    if (type === 'social_links' || type === 'payment_methods') {
      const linkField = type === 'social_links' ? 'linked_social_link_id' : 'linked_payment_method_id'
      
      // Get corresponding QR codes
      const { data: qrCodes } = await supabase
        .from('qr_codes')
        .select(`id, ${linkField}`)
        .in(linkField, items.map(item => item.id))
        .eq('user_id', user.id)

      if (qrCodes && qrCodes.length > 0) {
        // Update QR code display orders to match their linked items
        const qrUpdates = qrCodes.map((qr: any) => {
          const linkedItem = items.find(item => item.id === qr[linkField])
          return {
            id: qr.id,
            display_order: linkedItem?.display_order || 0,
            updated_at: new Date().toISOString()
          }
        })

        await supabase
          .from('qr_codes')
          .upsert(qrUpdates, { 
            onConflict: 'id',
            ignoreDuplicates: false 
          })
      }
    }

    return NextResponse.json({ 
      success: true,
      message: 'Display order updated successfully',
      updated_count: items.length
    })

  } catch (error) {
    console.error('Error in reorder API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
