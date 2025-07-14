/**
 * Quick diagnostic API to check Supabase storage connection
 */
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'

export async function GET() {
  try {
    const supabase = createClient()
    
    // Check which Supabase we're connecting to
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    
    // Try to list buckets
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()
    
    // Try to check if images bucket exists
    const { data: imagesData, error: imagesError } = await supabase.storage
      .from('images')
      .list('', { limit: 1 })
    
    return NextResponse.json({
      supabaseUrl,
      buckets: buckets || [],
      bucketsError: bucketsError?.message || null,
      imagesCheck: {
        success: !imagesError,
        error: imagesError?.message || null,
        data: imagesData || null
      }
    })
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      stack: error.stack
    }, { status: 500 })
  }
}
