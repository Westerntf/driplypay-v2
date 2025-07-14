/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Profile Editor Features
 * API: Individual goal operations (delete)
 * Features: Delete specific goal by ID
 */

import { NextRequest, NextResponse } from 'next/server'
import { deleteGoal } from '@/lib/profile/database'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Goal ID is required' },
        { status: 400 }
      )
    }

    await deleteGoal(id)

    return NextResponse.json({
      success: true,
      message: 'Goal deleted successfully'
    })

  } catch (error) {
    console.error('DELETE /api/goals/[id] error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to delete goal' 
      },
      { status: 500 }
    )
  }
}
