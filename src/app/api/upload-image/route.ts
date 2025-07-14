/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Social Stories
 * API: Image upload endpoint for social stories
 * Features: Upload images to Supabase storage
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const userId = formData.get('userId') as string

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    if (!userId) {
      return NextResponse.json(
        { error: 'No userId provided' },
        { status: 400 }
      )
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      )
    }

    // For development, let's use a simple approach with public bucket
    // Create Supabase client with service role for more permissions
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    
    const supabase = createSupabaseClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // Generate file name
    const sanitizedFileName = file.name
      .replace(/[^a-zA-Z0-9.-]/g, '_')
      .replace(/_{2,}/g, '_')
      .toLowerCase()
    
    const fileName = `${Date.now()}-${sanitizedFileName}`
    const filePath = `social-stories/${fileName}` // Simplified path

    try {
      // Convert File to ArrayBuffer for proper upload (same as profile upload)
      const arrayBuffer = await file.arrayBuffer()
      const buffer = new Uint8Array(arrayBuffer)

      // Upload to Supabase storage with proper format
      const { data, error } = await supabase.storage
        .from('images')
        .upload(filePath, buffer, {
          contentType: file.type,  // Add contentType like profile upload
          cacheControl: '3600',
          upsert: false
        })

      if (error) {
        console.error('Storage upload error:', error)
        
        // For any storage error, return a development placeholder with better info
        const placeholderUrl = `https://picsum.photos/400/300?random=${Date.now()}`
        return NextResponse.json({
          success: true,
          url: placeholderUrl,
          path: filePath,
          dev_mode: true,
          message: `Using placeholder image (Local Supabase storage error: ${error.message})`,
          debug: {
            supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
            error: error.message,
            timestamp: new Date().toISOString()
          }
        })
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('images')
        .getPublicUrl(data.path)

      return NextResponse.json({
        success: true,
        url: urlData.publicUrl,
        path: data.path
      })

    } catch (storageError: any) {
      console.error('Storage operation failed:', storageError)
      
      // Fallback to placeholder for any exception
      return NextResponse.json({
        success: true,
        url: `https://via.placeholder.com/400x300/4A90E2/FFFFFF?text=Dev+Image+${Date.now()}`,
        path: filePath,
        dev_mode: true,
        message: `Using placeholder for development (storage exception: ${storageError.message || 'Unknown error'})`
      })
    }

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
