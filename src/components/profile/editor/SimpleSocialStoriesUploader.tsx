/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Social Stories
 * Component: Simple Social Stories Uploader
 * Features: Upload and manage Instagram/Snapchat-style photo stories - NO AUTH REQUIRED
 */

'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/hooks/use-toast'
import { Upload, X } from 'lucide-react'

interface SocialLink {
  id: string
  platform: string
  label: string
}

interface PaymentMethod {
  id: string
  name: string
  type: string
}

interface Story {
  id: string
  image_url: string
  caption: string
  created_at: string
  enable_payment_button: boolean
  payment_cta_text: string
  social_links: {
    platform: string
    label: string
  }
  payment_methods?: {
    name: string
    type: string
  }
}

interface Props {
  userId: string
  socialLinks: SocialLink[]
  paymentMethods: PaymentMethod[]
}

export function SimpleSocialStoriesUploader({ userId, socialLinks, paymentMethods }: Props) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [uploading, setUploading] = useState(false)
  const [stories, setStories] = useState<Story[]>([])
  const [showUploadForm, setShowUploadForm] = useState(false)
  
  // Form data
  const [socialLinkId, setSocialLinkId] = useState('')
  const [caption, setCaption] = useState('')
  const [enablePaymentButton, setEnablePaymentButton] = useState(false)
  const [paymentCtaText, setPaymentCtaText] = useState('Support Me')
  const [linkedPaymentMethodId, setLinkedPaymentMethodId] = useState('')
  
  const { toast } = useToast()
  const supabase = createClient()

  // Load stories
  const loadStories = useCallback(async () => {
    try {
      const response = await fetch(`/api/social-stories/simple?userId=${userId}`)
      const data = await response.json()
      
      if (response.ok) {
        setStories(data.stories || [])
      }
    } catch (error) {
      console.error('Error loading stories:', error)
    }
  }, [userId])

  // Handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Error",
        description: "Please select an image file",
        variant: "destructive"
      })
      return
    }

    setSelectedFile(file)
    setPreviewUrl(URL.createObjectURL(file))
  }

  // Upload image to Supabase
  const uploadImage = async (file: File): Promise<string> => {
    const sanitizedFileName = file.name
      .replace(/[^a-zA-Z0-9.-]/g, '_')
      .replace(/_{2,}/g, '_')
      .toLowerCase()
    
    const fileName = `${Date.now()}-${sanitizedFileName}`
    const filePath = `${userId}/social-stories/${fileName}`

    const { data, error } = await supabase.storage
      .from('images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      throw new Error(`Upload failed: ${error.message}`)
    }

    const { data: urlData } = supabase.storage
      .from('images')
      .getPublicUrl(data.path)

    return urlData.publicUrl
  }

  // Create story
  const handleCreateStory = async () => {
    if (!selectedFile || !socialLinkId) {
      toast({
        title: "Error",
        description: "Please select an image and social link",
        variant: "destructive"
      })
      return
    }

    setUploading(true)
    try {
      // Upload image
      const imageUrl = await uploadImage(selectedFile)

      // Create story via API
      const response = await fetch('/api/social-stories/simple', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: userId,
          social_link_id: socialLinkId,
          image_url: imageUrl,
          caption: caption || null,
          enable_payment_button: enablePaymentButton,
          payment_cta_text: paymentCtaText || 'Support Me',
          linked_payment_method_id: linkedPaymentMethodId || null
        })
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Success",
          description: "Story created successfully!"
        })
        
        // Reset form
        setSelectedFile(null)
        setPreviewUrl('')
        setSocialLinkId('')
        setCaption('')
        setEnablePaymentButton(false)
        setPaymentCtaText('Support Me')
        setLinkedPaymentMethodId('')
        setShowUploadForm(false)
        
        // Reload stories
        loadStories()
      } else {
        throw new Error(data.error || 'Failed to create story')
      }
    } catch (error) {
      console.error('Error creating story:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create story",
        variant: "destructive"
      })
    } finally {
      setUploading(false)
    }
  }

  // Delete story
  const handleDeleteStory = async (storyId: string) => {
    try {
      const response = await fetch(`/api/social-stories/simple?id=${storyId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Story deleted successfully!"
        })
        loadStories()
      } else {
        throw new Error('Failed to delete story')
      }
    } catch (error) {
      console.error('Error deleting story:', error)
      toast({
        title: "Error",
        description: "Failed to delete story",
        variant: "destructive"
      })
    }
  }

  // Load stories on mount - TEMPORARILY DISABLED TO PREVENT RELOAD LOOP
  useEffect(() => {
    // loadStories() // Commented out to fix reload loop
    console.log('SimpleSocialStoriesUploader mounted, but not loading stories yet')
  }, [loadStories])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Social Stories
            <Button 
              onClick={() => setShowUploadForm(!showUploadForm)}
              variant="outline"
              size="sm"
            >
              {showUploadForm ? 'Cancel' : 'Add Story'}
            </Button>
          </CardTitle>
        </CardHeader>
        
        {showUploadForm && (
          <CardContent className="space-y-4">
            {/* File Upload */}
            <div className="space-y-2">
              <Label>Upload Image</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {previewUrl ? (
                  <div className="relative">
                    <Image 
                      src={previewUrl} 
                      alt="Preview" 
                      width={200}
                      height={200}
                      className="max-h-48 mx-auto rounded object-cover"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setSelectedFile(null)
                        setPreviewUrl('')
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="h-8 w-8 mx-auto text-gray-400" />
                    <div>
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <span className="text-blue-600 hover:text-blue-500">Click to upload</span>
                        <span className="text-gray-500"> or drag and drop</span>
                      </label>
                      <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Social Link */}
            <div className="space-y-2">
              <Label>Social Link</Label>
              <Select value={socialLinkId} onValueChange={setSocialLinkId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a social link" />
                </SelectTrigger>
                <SelectContent>
                  {socialLinks.map((link) => (
                    <SelectItem key={link.id} value={link.id}>
                      {link.platform} - {link.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Caption */}
            <div className="space-y-2">
              <Label>Caption (optional)</Label>
              <Textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Add a caption to your story..."
                rows={3}
              />
            </div>

            {/* Payment Button */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="payment-button"
                  checked={enablePaymentButton}
                  onCheckedChange={setEnablePaymentButton}
                />
                <Label htmlFor="payment-button">Enable payment button</Label>
              </div>

              {enablePaymentButton && (
                <>
                  <div className="space-y-2">
                    <Label>Button Text</Label>
                    <Input
                      value={paymentCtaText}
                      onChange={(e) => setPaymentCtaText(e.target.value)}
                      placeholder="Support Me"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Payment Method</Label>
                    <Select value={linkedPaymentMethodId} onValueChange={setLinkedPaymentMethodId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        {paymentMethods.map((method) => (
                          <SelectItem key={method.id} value={method.id}>
                            {method.name} ({method.type})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </div>

            <Button 
              onClick={handleCreateStory} 
              disabled={uploading || !selectedFile || !socialLinkId}
              className="w-full"
            >
              {uploading ? 'Creating Story...' : 'Create Story'}
            </Button>
          </CardContent>
        )}
      </Card>

      {/* Stories List */}
      {stories.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Stories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stories.map((story) => (
                <div key={story.id} className="relative group">
                  <Image
                    src={story.image_url}
                    alt={story.caption || 'Story'}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity rounded-lg flex items-center justify-center">
                    <Button
                      variant="destructive"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleDeleteStory(story.id)}
                    >
                      Delete
                    </Button>
                  </div>
                  {story.caption && (
                    <p className="mt-2 text-sm text-gray-600 truncate">{story.caption}</p>
                  )}
                  <p className="text-xs text-gray-400">
                    {story.social_links.platform} • {new Date(story.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
