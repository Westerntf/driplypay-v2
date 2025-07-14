/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Profile Editor Features  
 * Component: Image upload component for avatars and banners
 * Features: Drag & drop, file picker, preview, validation
 */

'use client'

import { useState, useCallback } from 'react'
import { Upload, X, Image as ImageIcon, Loader2, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import Image from 'next/image'

// Dynamic import to handle missing environment variables
let uploadProfileImage: any = null
let validateImageFile: any = null

// Check if Supabase is properly configured
const isSupabaseConfigured = 
  typeof window !== 'undefined' && 
  process.env.NEXT_PUBLIC_SUPABASE_URL && 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Only import upload functions if Supabase is configured
if (isSupabaseConfigured) {
  try {
    const imageUploadModule = require('@/lib/image-upload')
    uploadProfileImage = imageUploadModule.uploadProfileImage
    validateImageFile = imageUploadModule.validateImageFile
  } catch (error) {
    console.error('Failed to load image upload module:', error)
  }
}

interface ImageUploadProps {
  userId: string
  type: 'avatar' | 'banner'
  currentImageUrl?: string
  onImageUploaded: (url: string, path: string) => void
  className?: string
  disabled?: boolean
}

export function ImageUpload({
  userId,
  type,
  currentImageUrl,
  onImageUploaded,
  className = '',
  disabled = false
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null)

  // Check if Supabase is properly configured
  const isSupabaseConfigured = !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL && 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  const handleFile = useCallback(async (file: File) => {
    if (!isSupabaseConfigured) {
      toast.error('Image upload is not configured. Please use URL input instead.')
      return
    }

    // Validate file
    const validationError = validateImageFile(file)
    if (validationError) {
      toast.error(validationError)
      return
    }

    setIsUploading(true)
    
    try {
      // Create preview
      const preview = URL.createObjectURL(file)
      setPreviewUrl(preview)

      // Upload file
      const result = await uploadProfileImage(file, userId, type)
      
      if (result.error) {
        toast.error(result.error)
        setPreviewUrl(currentImageUrl || null)
      } else {
        toast.success(`${type === 'avatar' ? 'Avatar' : 'Banner'} uploaded successfully!`)
        onImageUploaded(result.url, result.path)
        
        // Clean up preview URL
        URL.revokeObjectURL(preview)
        setPreviewUrl(result.url)
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Failed to upload image')
      setPreviewUrl(currentImageUrl || null)
    } finally {
      setIsUploading(false)
    }
  }, [userId, type, currentImageUrl, onImageUploaded, isSupabaseConfigured])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    
    if (disabled || isUploading) return

    const files = Array.from(e.dataTransfer.files)
    const imageFile = files.find(file => file.type.startsWith('image/'))
    
    if (imageFile) {
      handleFile(imageFile)
    } else {
      toast.error('Please select an image file')
    }
  }, [disabled, isUploading, handleFile])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }, [handleFile])

  const clearImage = useCallback(() => {
    setPreviewUrl(null)
    onImageUploaded('', '')
  }, [onImageUploaded])

  const dimensions = type === 'avatar' 
    ? 'w-20 h-20 rounded-full' 
    : 'w-full h-32 rounded-lg'

  const aspectRatio = type === 'avatar' ? 'aspect-square' : 'aspect-[3/1]'

  // If Supabase isn't configured, show URL input instead
  if (!isSupabaseConfigured) {
    return (
      <div className={className}>
        <div className="space-y-3">
          <input
            type="url"
            value={currentImageUrl || ''}
            onChange={(e) => onImageUploaded(e.target.value, '')}
            placeholder={`https://example.com/${type}.jpg`}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
            disabled={disabled}
          />
          {currentImageUrl && (
            <div className={`relative border-2 border-gray-600 ${dimensions} ${aspectRatio} overflow-hidden`}>
              <Image
                src={currentImageUrl}
                alt={`${type} preview`}
                fill
                className="object-cover"
                sizes={type === 'avatar' ? '80px' : '100vw'}
                onError={() => {
                  toast.error('Failed to load image from URL')
                }}
              />
            </div>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {type === 'avatar' 
            ? 'Square image URL (JPG, PNG, WebP)'
            : 'Banner image URL 3:1 ratio (JPG, PNG, WebP)'
          }
        </p>
      </div>
    )
  }

  return (
    <div className={className}>
      <div
        className={`relative border-2 border-dashed transition-colors ${
          dragOver 
            ? 'border-blue-400 bg-blue-400/10' 
            : 'border-gray-600 hover:border-gray-500'
        } ${dimensions} ${aspectRatio} overflow-hidden`}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
      >
        {/* Preview Image */}
        {previewUrl ? (
          <div className="relative w-full h-full">
            <Image
              src={previewUrl}
              alt={`${type} preview`}
              fill
              className="object-cover"
              sizes={type === 'avatar' ? '80px' : '100vw'}
            />
            
            {/* Remove Button */}
            {!disabled && !isUploading && (
              <button
                onClick={clearImage}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
                title="Remove image"
              >
                <X className="w-3 h-3" />
              </button>
            )}
            
            {/* Upload Overlay */}
            {isUploading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Loader2 className="w-6 h-6 text-white animate-spin" />
              </div>
            )}
          </div>
        ) : (
          /* Upload Area */
          <label 
            className={`w-full h-full flex flex-col items-center justify-center cursor-pointer text-gray-400 hover:text-gray-300 transition-colors ${
              disabled ? 'cursor-not-allowed opacity-50' : ''
            }`}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              disabled={disabled || isUploading}
              className="hidden"
            />
            
            {isUploading ? (
              <Loader2 className="w-6 h-6 animate-spin mb-2" />
            ) : (
              <>
                <ImageIcon className="w-6 h-6 mb-2" />
                <span className="text-xs text-center px-2">
                  {type === 'avatar' ? 'Upload Avatar' : 'Upload Banner'}
                </span>
                <span className="text-xs text-gray-500 text-center px-2 mt-1">
                  Drag & drop or click
                </span>
              </>
            )}
          </label>
        )}
      </div>
      
      {/* Help Text */}
      <p className="text-xs text-gray-500 mt-2">
        {type === 'avatar' 
          ? 'Square image, max 5MB (JPG, PNG, WebP)'
          : 'Banner image 3:1 ratio, max 5MB (JPG, PNG, WebP)'
        }
      </p>
    </div>
  )
}
