/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Profile Editor Features
 * API: Goals CRUD operations
 * Features: Create, read, update, delete profile goals
 */

import { NextRequest, NextResponse } from 'next/server'

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic'
import { createGoal, getGoals, updateGoal } from '@/lib/profile/database'

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

    const data = await getGoals(userId)
    
    return NextResponse.json({
      success: true,
      goals: data
    })

  } catch (error) {
    console.error('GET /api/goals error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch goals' 
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
      title, 
      description, 
      target_amount, 
      current_amount = 0,
      is_active = true,
      wallet_method_id
    } = body

    // Validate required fields
    if (!userId || !title || !target_amount) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'User ID, title, and target amount are required' 
        },
        { status: 400 }
      )
    }

    const data = await createGoal({
      user_id: userId,
      title,
      description,
      target_amount,
      current_amount,
      is_active,
      wallet_method_id: wallet_method_id || null
    } as any)

    return NextResponse.json({
      success: true,
      data
    })

  } catch (error) {
    console.error('POST /api/goals error:', error)
    
    // Check if error is related to missing wallet_method_id column
    if (error instanceof Error && error.message.includes('wallet_method_id')) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Database missing wallet_method_id column. Please run: ALTER TABLE goals ADD COLUMN wallet_method_id UUID REFERENCES wallet_methods(id) ON DELETE SET NULL;',
          fix: 'Run the SQL command in Supabase Dashboard to add the missing column'
        },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create goal' 
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
      title, 
      description, 
      target_amount, 
      current_amount,
      is_active,
      wallet_method_id
    } = body

    // Validate required fields
    if (!id) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Goal ID is required' 
        },
        { status: 400 }
      )
    }

    const data = await updateGoal(id, {
      title,
      description,
      target_amount,
      current_amount,
      is_active,
      wallet_method_id: wallet_method_id || null
    } as any)

    return NextResponse.json({
      success: true,
      data
    })

  } catch (error) {
    console.error('PUT /api/goals error:', error)
    
    // Check if error is related to missing wallet_method_id column
    if (error instanceof Error && error.message.includes('wallet_method_id')) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Database missing wallet_method_id column. Please run: ALTER TABLE goals ADD COLUMN wallet_method_id UUID REFERENCES wallet_methods(id) ON DELETE SET NULL;',
          fix: 'Run the SQL command in Supabase Dashboard to add the missing column'
        },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update goal' 
      },
      { status: 500 }
    )
  }
}
