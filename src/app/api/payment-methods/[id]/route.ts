/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Payment System Features
 * API: Individual payment method operations (delete)
 * Features: Delete specific payment method by ID
 */

import { NextRequest, NextResponse } from 'next/server'
import { deletePaymentMethod } from '@/lib/profile/database'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Payment method ID is required' },
        { status: 400 }
      )
    }

    await deletePaymentMethod(id)

    return NextResponse.json({
      success: true,
      message: 'Payment method deleted successfully'
    })

  } catch (error) {
    console.error('DELETE /api/payment-methods/[id] error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to delete payment method' 
      },
      { status: 500 }
    )
  }
}
