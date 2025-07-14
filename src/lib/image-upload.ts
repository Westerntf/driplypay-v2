/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Profile Editor Features
 * Utility: Image upload helpers for Supabase Storage
 * Features: Upload, delete, get public URLs for profile images
 */

import { createClient } from '@/lib/supabase'

const supabase = createClient()

export interface ImageUploadResult {
  url: string
  path: string
  error?: string
}

/**
 * Upload an image to Supabase Storage via API route
 */
export async function uploadProfileImage(
  file: File,
  userId: string,
  type: 'avatar' | 'banner'
): Promise<ImageUploadResult> {
  try {
    // Client-side validation
    if (!file.type.startsWith('image/')) {
      return { url: '', path: '', error: 'File must be an image' }
    }

    // Max 5MB
    if (file.size > 5 * 1024 * 1024) {
      return { url: '', path: '', error: 'Image must be less than 5MB' }
    }

    // Create FormData for API request
    const formData = new FormData()
    formData.append('file', file)
    formData.append('userId', userId)
    formData.append('type', type)

    // Upload via API route
    const response = await fetch('/api/upload/image', {
      method: 'POST',
      body: formData
    })

    const result = await response.json()

    if (!response.ok) {
      return { url: '', path: '', error: result.error || 'Upload failed' }
    }

    return {
      url: result.url,
      path: result.path,
      error: undefined
    }

  } catch (error) {
    console.error('Image upload error:', error)
    return { 
      url: '', 
      path: '', 
      error: error instanceof Error ? error.message : 'Upload failed' 
    }
  }
}

/**
 * Delete an image from Supabase Storage via API route (for future implementation)
 * For now, we'll use the regular client
 */
export async function deleteProfileImage(path: string): Promise<boolean> {
  try {
    const { error } = await supabase.storage
      .from('images')
      .remove([path])

    if (error) {
      console.error('Delete error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Image delete error:', error)
    return false
  }
}

/**
 * Get public URL for an image
 */
export function getImagePublicUrl(path: string): string {
  const { data } = supabase.storage
    .from('images')
    .getPublicUrl(path)
  
  return data.publicUrl
}

/**
 * Validate image file before upload
 */
export function validateImageFile(file: File): string | null {
  // Check file type
  if (!file.type.startsWith('image/')) {
    return 'File must be an image'
  }

  // Check file size (5MB max)
  if (file.size > 5 * 1024 * 1024) {
    return 'Image must be less than 5MB'
  }

  // Check dimensions would require reading the file, so we'll skip for now
  
  return null // No error
}
