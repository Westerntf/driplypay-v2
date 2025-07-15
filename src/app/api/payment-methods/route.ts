/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Payment System Features
 * API: Payment methods CRUD operations
 * Features: Create, read, update, delete payment methods
 */

import { NextRequest, NextResponse } from 'next/server'

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic'
import { createPaymentMethod, getPaymentMethods, updatePaymentMethod, deletePaymentMethod } from '@/lib/profile/database'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      )
    }

    const data = await getPaymentMethods(userId)
    
    // Map database schema to frontend format
    const mappedData = data.map((method: any) => ({
      ...method,
      name: method.name, // Use actual name field from database
      label: method.name, // Map name to label for component compatibility
      enabled: method.enabled, // Use actual enabled field
    }))
    
    return NextResponse.json({
      success: true,
      paymentMethods: mappedData
    })

  } catch (error) {
    console.error('GET /api/payment-methods error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch payment methods' 
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      userId, 
      type, 
      name, 
      handle,
      url,
      enabled = true,
      preferred = false 
    } = body

    // Validate required fields
    if (!userId || !type || !name) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'User ID, type, and name are required' 
        },
        { status: 400 }
      )
    }

    // Map to old schema format
    const data = await createPaymentMethod({
      user_id: userId,
      type,
      name, // Use name field for new schema
      handle,
      url: url || handle || `${type}:${handle || name}`, // Ensure URL is provided
      preferred,
      display_order: 0
    } as any)

    return NextResponse.json({
      success: true,
      data
    })

  } catch (error) {
    console.error('POST /api/payment-methods error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create payment method',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      id,
      type, 
      name, 
      handle,
      url,
      enabled,
      preferred 
    } = body

    // Validate required fields
    if (!id) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Payment method ID is required' 
        },
        { status: 400 }
      )
    }

    const data = await updatePaymentMethod(id, {
      type,
      label: name, // Map name to label for database schema
      handle,
      url,
      enabled,
      preferred
    } as any)

    return NextResponse.json({
      success: true,
      data
    })

  } catch (error) {
    console.error('PUT /api/payment-methods error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update payment method' 
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Payment method ID is required' 
        },
        { status: 400 }
      )
    }

    await deletePaymentMethod(id)

    return NextResponse.json({
      success: true,
      message: 'Payment method deleted successfully'
    })

  } catch (error) {
    console.error('DELETE /api/payment-methods error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to delete payment method' 
      },
      { status: 500 }
    )
  }
}
