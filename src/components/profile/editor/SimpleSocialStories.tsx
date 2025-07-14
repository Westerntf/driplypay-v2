/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Social Stories
 * Component: Simple Social Stories Implementation (No Reload Issues)
 * Features: Basic upload and display functionality
 */

'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/hooks/use-toast'
import { Upload, X, Trash2, Eye } from 'lucide-react'

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
  socialLinks: SocialLink[]
  paymentMethods: PaymentMethod[]
  userId: string
}

export function SimpleSocialStories({ socialLinks, paymentMethods, userId }: Props) {
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [stories, setStories] = useState<Story[]>([])
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState('')
  
  // Form data
  const [socialLinkId, setSocialLinkId] = useState('')
  const [caption, setCaption] = useState('')
  const [enablePaymentButton, setEnablePaymentButton] = useState(false)
  const [paymentCtaText, setPaymentCtaText] = useState('Support Me')
  const [linkedPaymentMethodId, setLinkedPaymentMethodId] = useState('')
  
  const { toast } = useToast()

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

  // Upload image to Supabase (simplified)
  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('userId', userId)
    
    const response = await fetch('/api/upload-image', {
      method: 'POST',
      body: formData
    })
    
    if (!response.ok) {
      throw new Error('Upload failed')
    }
    
    const data = await response.json()
    return data.url
  }

  // Load stories (simplified)
  const loadStories = async () => {
    if (loading) return
    
    setLoading(true)
    try {
      const response = await fetch(`/api/social-stories/simple?userId=${userId}`)
      const data = await response.json()
      
      if (response.ok) {
        setStories(data.stories || [])
      }
    } catch (error) {
      console.error('Error loading stories:', error)
    } finally {
      setLoading(false)
    }
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Social Stories</h3>
        <div className="flex items-center gap-2">
          {stories.length > 0 && (
            <Button 
              onClick={loadStories}
              variant="ghost"
              size="sm"
              disabled={loading}
              className="text-gray-400 hover:text-white"
            >
              <Eye className="h-4 w-4 mr-1" />
              {loading ? 'Loading...' : `${stories.length} stories`}
            </Button>
          )}
          <Button 
            onClick={() => setShowUploadForm(!showUploadForm)}
            variant="outline"
            size="sm"
            className="text-gray-300 hover:text-white"
          >
            {showUploadForm ? 'Cancel' : 'Add Story'}
          </Button>
          <Button 
            onClick={loadStories}
            variant="ghost"
            size="sm"
            disabled={loading}
            className="text-gray-400 hover:text-white"
          >
            {loading ? 'Loading...' : 'Load Stories'}
          </Button>
        </div>
      </div>

      {showUploadForm && (
        <div className="space-y-4 p-4 bg-black/20 rounded-lg border border-gray-700">
          {/* File Upload */}
          <div className="space-y-2">
            <Label className="text-white">Upload Image</Label>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-gray-500 transition-colors">
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
                    className="absolute top-2 right-2 bg-black/60 hover:bg-black/80"
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
                      <span className="text-blue-400 hover:text-blue-300">Click to upload</span>
                      <span className="text-gray-400"> or drag and drop</span>
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
            <Label className="text-white">Social Link</Label>
            <Select value={socialLinkId} onValueChange={setSocialLinkId}>
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
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
            <Label className="text-white">Caption (optional)</Label>
            <Textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Add a caption to your story..."
              rows={3}
              className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
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
              <Label htmlFor="payment-button" className="text-white">Enable payment button</Label>
            </div>

            {enablePaymentButton && (
              <>
                <div className="space-y-2">
                  <Label className="text-white">Button Text</Label>
                  <Input
                    value={paymentCtaText}
                    onChange={(e) => setPaymentCtaText(e.target.value)}
                    placeholder="Support Me"
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Payment Method</Label>
                  <Select value={linkedPaymentMethodId} onValueChange={setLinkedPaymentMethodId}>
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
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
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {uploading ? 'Creating Story...' : 'Create Story'}
          </Button>
        </div>
      )}

      {/* Stories Display */}
      {stories.length > 0 ? (
        <div className="space-y-4">
          <h4 className="text-white font-medium">Your Stories</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stories.map((story) => (
              <div key={story.id} className="relative group bg-gray-800/50 rounded-lg overflow-hidden">
                <Image
                  src={story.image_url}
                  alt={story.caption || 'Story'}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center">
                  <Button
                    variant="destructive"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleDeleteStory(story.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
                <div className="p-3">
                  {story.caption && (
                    <p className="text-gray-300 text-sm mb-2 line-clamp-2">{story.caption}</p>
                  )}
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{story.social_links.platform}</span>
                    <span>{new Date(story.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : !showUploadForm ? (
        <div className="text-center py-8 text-gray-400">
          <Upload className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No stories yet. Click &ldquo;Add Story&rdquo; to get started!</p>
        </div>
      ) : null}
    </div>
  )
}
