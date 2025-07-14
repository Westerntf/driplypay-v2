/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Social Stories Features
 * Utility: Social media story management and expiration logic
 * Features: Story CRUD, image optimization, expiration handling
 */

export interface SocialStory {
  id: string
  user_id: string
  social_link_id: string
  image_url: string
  caption?: string
  enable_payment: boolean
  payment_button_text: string
  expires_at: string
  created_at: string
  updated_at: string
}

export interface CreateStoryData {
  social_link_id: string
  image_file: File
  caption?: string
  enable_payment?: boolean
  payment_button_text?: string
}

export interface UpdateStoryData {
  caption?: string
  enable_payment?: boolean
  payment_button_text?: string
}

/**
 * Check if a story is still active (not expired)
 */
export function isStoryActive(story: SocialStory): boolean {
  const now = new Date()
  const expiresAt = new Date(story.expires_at)
  return expiresAt > now
}

/**
 * Get time remaining until story expires
 */
export function getTimeRemaining(story: SocialStory): {
  hours: number
  minutes: number
  expired: boolean
} {
  const now = new Date()
  const expiresAt = new Date(story.expires_at)
  const diffMs = expiresAt.getTime() - now.getTime()
  
  if (diffMs <= 0) {
    return { hours: 0, minutes: 0, expired: true }
  }
  
  const hours = Math.floor(diffMs / (1000 * 60 * 60))
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
  
  return { hours, minutes, expired: false }
}

/**
 * Format time remaining as human readable string
 */
export function formatTimeRemaining(story: SocialStory): string {
  const { hours, minutes, expired } = getTimeRemaining(story)
  
  if (expired) return 'Expired'
  
  if (hours > 0) {
    return `${hours}h ${minutes}m left`
  }
  
  return `${minutes}m left`
}

/**
 * Create a new social story
 */
export async function createStory(data: CreateStoryData): Promise<SocialStory> {
  try {
    const formData = new FormData()
    formData.append('image', data.image_file)
    formData.append('social_link_id', data.social_link_id)
    
    if (data.caption) {
      formData.append('caption', data.caption)
    }
    
    formData.append('enable_payment', String(data.enable_payment || false))
    formData.append('payment_button_text', data.payment_button_text || 'Support Me')
    
    const response = await fetch('/api/social-stories', {
      method: 'POST',
      body: formData
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to create story')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error creating story:', error)
    throw error
  }
}

/**
 * Update an existing story
 */
export async function updateStory(
  storyId: string, 
  data: UpdateStoryData
): Promise<SocialStory> {
  try {
    const response = await fetch(`/api/social-stories/${storyId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to update story')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error updating story:', error)
    throw error
  }
}

/**
 * Delete a story
 */
export async function deleteStory(storyId: string): Promise<void> {
  try {
    const response = await fetch(`/api/social-stories/${storyId}`, {
      method: 'DELETE'
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to delete story')
    }
  } catch (error) {
    console.error('Error deleting story:', error)
    throw error
  }
}

/**
 * Get stories for a specific social link
 */
export async function getStoriesForSocialLink(socialLinkId: string): Promise<SocialStory[]> {
  try {
    const response = await fetch(`/api/social-stories?social_link_id=${socialLinkId}`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch stories')
    }
    
    const stories = await response.json()
    return stories.filter(isStoryActive)
  } catch (error) {
    console.error('Error fetching stories:', error)
    return []
  }
}

/**
 * Get all active stories for a user
 */
export async function getUserStories(userId?: string): Promise<SocialStory[]> {
  try {
    const url = userId 
      ? `/api/social-stories?user_id=${userId}`
      : '/api/social-stories'
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error('Failed to fetch stories')
    }
    
    const stories = await response.json()
    return stories.filter(isStoryActive)
  } catch (error) {
    console.error('Error fetching user stories:', error)
    return []
  }
}

/**
 * Check if a social link has active stories
 */
export async function hasActiveStories(socialLinkId: string): Promise<boolean> {
  try {
    const stories = await getStoriesForSocialLink(socialLinkId)
    return stories.length > 0
  } catch (error) {
    return false
  }
}

/**
 * Validate story image file
 */
export function validateStoryImage(file: File): {
  valid: boolean
  error?: string
} {
  // Check file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Please select a JPEG, PNG, or WebP image'
    }
  }
  
  // Check file size (max 10MB)
  const maxSize = 10 * 1024 * 1024 // 10MB
  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'Image must be smaller than 10MB'
    }
  }
  
  return { valid: true }
}

/**
 * Validate story caption
 */
export function validateStoryCaption(caption: string): {
  valid: boolean
  error?: string
} {
  if (caption.length > 200) {
    return {
      valid: false,
      error: 'Caption must be 200 characters or less'
    }
  }
  
  return { valid: true }
}

/**
 * Compress image for story upload
 */
export function compressImage(file: File, maxWidth: number = 1080): Promise<File> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.onload = () => {
      // Calculate new dimensions
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height)
      canvas.width = img.width * ratio
      canvas.height = img.height * ratio
      
      // Draw and compress
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now()
            })
            resolve(compressedFile)
          } else {
            reject(new Error('Failed to compress image'))
          }
        },
        file.type,
        0.8 // 80% quality
      )
    }
    
    img.onerror = () => reject(new Error('Failed to load image'))
    img.src = URL.createObjectURL(file)
  })
}

/**
 * Auto-delete expired stories (called by cleanup job)
 */
export async function cleanupExpiredStories(): Promise<number> {
  try {
    const response = await fetch('/api/social-stories/cleanup', {
      method: 'POST'
    })
    
    if (!response.ok) {
      throw new Error('Failed to cleanup expired stories')
    }
    
    const result = await response.json()
    return result.deletedCount || 0
  } catch (error) {
    console.error('Error cleaning up expired stories:', error)
    return 0
  }
}

/**
 * Get story analytics (views, interactions)
 */
export async function getStoryAnalytics(storyId: string): Promise<{
  views: number
  clicks: number
  payments: number
}> {
  try {
    const response = await fetch(`/api/social-stories/${storyId}/analytics`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch story analytics')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching story analytics:', error)
    return { views: 0, clicks: 0, payments: 0 }
  }
}

/**
 * Track story view
 */
export async function trackStoryView(storyId: string): Promise<void> {
  try {
    await fetch(`/api/social-stories/${storyId}/view`, {
      method: 'POST'
    })
  } catch (error) {
    // Fail silently for analytics
    console.warn('Failed to track story view:', error)
  }
}

/**
 * Track story click (when user clicks on story to open)
 */
export async function trackStoryClick(storyId: string): Promise<void> {
  try {
    await fetch(`/api/social-stories/${storyId}/click`, {
      method: 'POST'
    })
  } catch (error) {
    // Fail silently for analytics
    console.warn('Failed to track story click:', error)
  }
}

/**
 * Share story URL
 */
export function getStoryShareUrl(username: string, storyId: string): string {
  return `${window.location.origin}/${username}/story/${storyId}`
}

/**
 * Generate story preview for social sharing
 */
export function generateStoryPreview(story: SocialStory): {
  title: string
  description: string
  image: string
} {
  return {
    title: story.caption || 'Check out this story!',
    description: `${formatTimeRemaining(story)} - View this story before it expires`,
    image: story.image_url
  }
}
