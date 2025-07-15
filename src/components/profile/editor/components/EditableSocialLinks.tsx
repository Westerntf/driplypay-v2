/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Profile Editor Features
 * Component: Editable Social Links - Connect Sect    const updatedLinks = localSocialLinks.map(link => 
      link.id === editingLink ? { ...link, ...editingValues } : link
    )
    setLocalSocialLinks(updatedLinks)
    onUpdate(updatedLinks) * Features: Add, edit, delete social media links with modern design
 */
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { createPortal } from 'react-dom'
import { SocialIcon, PaymentIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/hooks/use-toast'
import { Upload, X, Check, Camera } from 'lucide-react'

interface ThemeStyles {
  background: string
  accent: string
  accentBackground: string
  card: string
  button: string
  iconBackground: string
  text: string
  accent_text: string
}

interface PaymentMethod {
  id: string
  name: string
  type: string
}

interface WalletMethod {
  id: string
  type: 'external' | 'payid' | 'bank'
  platform: string
  name: string
  handle?: string
  url?: string
  details?: any
  enabled: boolean
}

interface SocialLink {
  id: string
  platform: string
  username: string
  url: string
  photo_url?: string | null
  photo_caption?: string | null
  wallet_method_id?: string | null
}

interface EditableSocialLinksProps {
  socialLinks: SocialLink[]
  themeStyles: ThemeStyles
  onUpdate: (links: SocialLink[]) => void
  isVisible: boolean
  onToggleVisibility: () => void
  walletMethods?: WalletMethod[]
  userId: string
}

export function EditableSocialLinks({ 
  socialLinks, 
  themeStyles, 
  onUpdate, 
  isVisible, 
  onToggleVisibility,
  walletMethods = [],
  userId
}: EditableSocialLinksProps) {
  console.log('🔍 EditableSocialLinks rendered with socialLinks:', socialLinks)
  console.log('📸 Links with photos:', socialLinks.filter(link => link.photo_url))
  
  // Local state to manage social links for immediate UI updates
  const [localSocialLinks, setLocalSocialLinks] = useState(socialLinks)
  
  // Sync local state with props
  useEffect(() => {
    setLocalSocialLinks(socialLinks)
  }, [socialLinks])
  
  const [isAddingLink, setIsAddingLink] = useState(false)
  const [editingLink, setEditingLink] = useState<string | null>(null)
  const [newLink, setNewLink] = useState({ platform: '', username: '', url: '' })
  const [editingValues, setEditingValues] = useState<any>({})
  
  // Photo modal state
  const [photoModalLink, setPhotoModalLink] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [photoCaption, setPhotoCaption] = useState('')
  const [enablePaymentButton, setEnablePaymentButton] = useState(false)
  const [paymentCtaText, setPaymentCtaText] = useState('Support Me')
  const [linkedPaymentMethodId, setLinkedPaymentMethodId] = useState('')
  const [uploading, setUploading] = useState(false)
  
  const { toast } = useToast()

  const handleAddLink = () => {
    if (newLink.platform && newLink.url) {
      const updatedLinks = [...localSocialLinks, { ...newLink, id: Date.now().toString() }]
      setLocalSocialLinks(updatedLinks)
      onUpdate(updatedLinks)
      setNewLink({ platform: '', username: '', url: '' })
      setIsAddingLink(false)
    }
  }

  const handleDeleteLink = (id: string) => {
    const updatedLinks = localSocialLinks.filter(link => link.id !== id)
    setLocalSocialLinks(updatedLinks)
    onUpdate(updatedLinks)
  }

  const handleEditLink = (link: SocialLink) => {
    setEditingLink(link.id)
    setEditingValues({
      platform: link.platform || '',
      username: link.username || '',
      url: link.url || ''
    })
  }

  const handleSaveEdit = (id: string) => {
    const updatedLinks = localSocialLinks.map(link => 
      link.id === id ? { ...link, ...editingValues } : link
    )
    setLocalSocialLinks(updatedLinks)
    onUpdate(updatedLinks)
    setEditingLink(null)
    setEditingValues({})
  }

  const handleCancelEdit = () => {
    setEditingLink(null)
    setEditingValues({})
  }

  // Photo handling functions
  const handleOpenPhotoModal = (link: SocialLink) => {
    setPhotoModalLink(link.id)
    setPhotoCaption(link.photo_caption || '')
    setEnablePaymentButton(!!link.wallet_method_id)
    setLinkedPaymentMethodId(link.wallet_method_id || '')
    setPaymentCtaText('Support Me')
    if (link.photo_url) {
      setPreviewUrl(link.photo_url)
    }
  }

  const handleClosePhotoModal = () => {
    setPhotoModalLink(null)
    setSelectedFile(null)
    setPreviewUrl('')
    setPhotoCaption('')
    setEnablePaymentButton(false)
    setLinkedPaymentMethodId('')
    setPaymentCtaText('Support Me')
  }

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

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('userId', userId)
    
    console.log('📤 Uploading to API...')
    const response = await fetch('/api/upload-image', {
      method: 'POST',
      body: formData
    })
    
    const data = await response.json()
    console.log('📋 Upload API response:', data)
    
    // Check if we got a valid URL (either real upload or dev placeholder)
    if (data.url) {
      console.log('✅ Got URL:', data.url)
      if (data.dev_mode) {
        console.log('🔧 Using development placeholder mode')
      }
      return data.url
    }
    
    // If no URL, something went wrong
    console.error('❌ No URL in response:', data)
    throw new Error(data.error || 'Upload failed')
  }

  const handleSavePhoto = async () => {
    if (!photoModalLink) return

    console.log('🚀 Starting photo save for link:', photoModalLink)
    setUploading(true)
    try {
      let imageUrl = previewUrl

      // Upload new image if selected
      if (selectedFile) {
        console.log('📤 Uploading file:', selectedFile.name)
        imageUrl = await uploadImage(selectedFile)
        console.log('✅ Upload result:', imageUrl)
      }

      // Update the social link with photo data
      const updatedLinks = localSocialLinks.map(link => 
        link.id === photoModalLink ? {
          ...link,
          photo_url: imageUrl,
          photo_caption: photoCaption || null,
          wallet_method_id: enablePaymentButton ? linkedPaymentMethodId : null
        } : link
      )
      
      console.log('🔄 Updated links:', updatedLinks)
      console.log('📋 Updated link with photo:', updatedLinks.find(l => l.id === photoModalLink))
      
      // Update both local and parent state immediately
      console.log('💾 Updating local and parent state...')
      setLocalSocialLinks(updatedLinks)
      onUpdate(updatedLinks)
      
      toast({
        title: "Success",
        description: "Photo story updated successfully!"
      })
      
      // Wait a moment before closing modal to ensure UI updates
      setTimeout(() => {
        handleClosePhotoModal()
      }, 500)
    } catch (error) {
      console.error('❌ Error saving photo:', error)
      toast({
        title: "Error",
        description: "Failed to save photo story",
        variant: "destructive"
      })
    } finally {
      setUploading(false)
    }
  }

  const handleRemovePhoto = () => {
    if (!photoModalLink) return

    const updatedLinks = localSocialLinks.map(link => 
      link.id === photoModalLink ? {
        ...link,
        photo_url: null,
        photo_caption: null,
        wallet_method_id: null
      } : link
    )
    
    setLocalSocialLinks(updatedLinks)
    onUpdate(updatedLinks)
    
    toast({
      title: "Success",
      description: "Photo story removed"
    })
    
    handleClosePhotoModal()
  }

  return (
    <motion.div 
      className={`relative bg-black/40 backdrop-blur-sm rounded-3xl p-6 lg:p-8 border border-white/10 transition-all duration-300 hover:border-white/20 min-h-[400px] ${!isVisible ? 'opacity-50' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Gradient accent overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-3xl pointer-events-none" />
      
      {/* Floating accent elements */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse" />
      <div className="absolute bottom-6 left-6 w-1 h-1 bg-purple-400/40 rounded-full animate-pulse delay-75" />

      {/* Header */}
      <div className="relative flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="relative">
            <h2 className="text-lg font-bold text-white tracking-tight whitespace-nowrap">Connect</h2>
            <div className="absolute -bottom-1 left-0 w-10 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
          </div>
          <motion.button
            onClick={onToggleVisibility}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ${
              isVisible ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/25' : 'bg-gray-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={`${isVisible ? 'Hide' : 'Show'} Connect section`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
              isVisible ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </motion.button>
        </div>
        {isVisible && (
          <motion.button
            onClick={() => setIsAddingLink(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-white transition-all duration-300 hover:scale-105"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="text-xs font-medium">Add Link</span>
          </motion.button>
        )}
      </div>
      
      {isVisible && (
        <div className="space-y-4">
          {localSocialLinks.map((link, index) => (
            <motion.div 
              key={`${link.id}-${link.photo_url ? 'has-photo' : 'no-photo'}`} 
              className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:border-white/20 transition-all duration-300"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              {editingLink === link.id ? (
                // Edit form
                <div className="space-y-4">
                  <select
                    value={editingValues.platform}
                    onChange={(e) => setEditingValues({ ...editingValues, platform: e.target.value })}
                    className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300 [&>option]:bg-gray-900 [&>option]:text-white"
                    aria-label="Select social media platform"
                  >
                    <option value="" className="bg-gray-900 text-white">Select Platform</option>
                    <option value="Instagram" className="bg-gray-900 text-white">Instagram</option>
                    <option value="Twitter" className="bg-gray-900 text-white">Twitter/X</option>
                    <option value="TikTok" className="bg-gray-900 text-white">TikTok</option>
                    <option value="YouTube" className="bg-gray-900 text-white">YouTube</option>
                    <option value="OnlyFans" className="bg-gray-900 text-white">OnlyFans</option>
                    <option value="Twitch" className="bg-gray-900 text-white">Twitch</option>
                    <option value="Discord" className="bg-gray-900 text-white">Discord</option>
                    <option value="Website" className="bg-gray-900 text-white">Website</option>
                    <option value="Other" className="bg-gray-900 text-white">Other</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Username"
                    value={editingValues.username}
                    onChange={(e) => setEditingValues({ ...editingValues, username: e.target.value })}
                    className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300"
                  />
                  <input
                    type="text"
                    placeholder="Full URL"
                    value={editingValues.url}
                    onChange={(e) => setEditingValues({ ...editingValues, url: e.target.value })}
                    className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300"
                  />
                  <div className="flex gap-3">
                    <motion.button
                      onClick={() => handleSaveEdit(link.id)}
                      className="flex-1 bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white px-4 py-2.5 rounded-xl font-medium transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Save
                    </motion.button>
                    <motion.button
                      onClick={handleCancelEdit}
                      className="flex-1 bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl font-medium transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Cancel
                    </motion.button>
                  </div>
                </div>
              ) : (
                // Display view
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="relative">
                      <div className={`w-12 h-12 bg-gradient-to-br rounded-2xl flex items-center justify-center border transition-all duration-300 ${
                        link.photo_url 
                          ? 'from-blue-500/30 to-purple-500/30 border-blue-400/50 shadow-lg shadow-blue-500/25' 
                          : 'from-blue-500/10 to-purple-500/10 border-blue-400/20'
                      }`}>
                        <SocialIcon platform={link.platform} className="w-6 h-6 text-white" size={24} />
                      </div>
                      {/* Visual indicator for photo story using DriplyPay colors */}
                      {link.photo_url ? (
                        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full border-2 border-black bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center animate-bounce shadow-lg shadow-blue-500/50">
                          <Check className="w-3 h-3 text-white" strokeWidth={3} />
                        </div>
                      ) : (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gray-500/60 rounded-full border-2 border-black" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="text-white font-semibold text-lg">{link.platform}</div>
                      </div>
                      <div className="text-gray-400 text-sm truncate">@{link.username}</div>
                      {link.photo_url && link.photo_caption && (
                        <div className="text-white/80 text-sm mt-1 truncate italic font-medium">&ldquo;{link.photo_caption}&rdquo;</div>
                      )}
                      {link.photo_url && (
                        <div className="text-white/90 text-xs mt-1 font-bold flex items-center gap-1">
                          <Camera className="w-3 h-3" />
                          Photo story active
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <motion.button
                      onClick={() => handleOpenPhotoModal(link)}
                      className={`p-2 rounded-lg transition-all duration-300 relative ${
                        link.photo_url 
                          ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 shadow-md shadow-blue-500/25' 
                          : 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 hover:from-blue-500/20 hover:to-purple-500/20'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title={link.photo_url ? "Story uploaded - Click to view/edit" : "Add story photo"}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {link.photo_url && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      )}
                    </motion.button>
                    <motion.button
                      onClick={() => handleEditLink(link)}
                      className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Edit link"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </motion.button>
                    <motion.button
                      onClick={() => handleDeleteLink(link.id)}
                      className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Delete link"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        
          {isAddingLink && (
            <motion.div 
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full" />
                Add New Link
              </h3>
              <div className="space-y-4">
                <select
                  value={newLink.platform}
                  onChange={(e) => setNewLink({ ...newLink, platform: e.target.value })}
                  className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300 [&>option]:bg-gray-900 [&>option]:text-white"
                  aria-label="Select social media platform"
                >
                  <option value="" className="bg-gray-900 text-white">Select Platform</option>
                  <option value="Instagram" className="bg-gray-900 text-white">Instagram</option>
                  <option value="Twitter" className="bg-gray-900 text-white">Twitter/X</option>
                  <option value="TikTok" className="bg-gray-900 text-white">TikTok</option>
                  <option value="YouTube" className="bg-gray-900 text-white">YouTube</option>
                  <option value="OnlyFans" className="bg-gray-900 text-white">OnlyFans</option>
                  <option value="Twitch" className="bg-gray-900 text-white">Twitch</option>
                  <option value="Discord" className="bg-gray-900 text-white">Discord</option>
                  <option value="Website" className="bg-gray-900 text-white">Website</option>
                  <option value="Other" className="bg-gray-900 text-white">Other</option>
                </select>
                <input
                  type="text"
                  placeholder="Username"
                  value={newLink.username}
                  onChange={(e) => setNewLink({ ...newLink, username: e.target.value })}
                  className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300"
                />
                <input
                  type="text"
                  placeholder="Full URL"
                  value={newLink.url}
                  onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                  className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300"
                />
                <div className="flex gap-3">
                  <motion.button
                    onClick={handleAddLink}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Add Link
                  </motion.button>
                  <motion.button
                    onClick={() => setIsAddingLink(false)}
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        
          {localSocialLinks.length === 0 && !isAddingLink && (
            <motion.div 
              className="text-center py-16 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex flex-col items-center gap-6 text-gray-400 max-w-sm">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl flex items-center justify-center border border-white/10">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-xl text-white mb-2">Connect your socials</div>
                  <div className="text-gray-400 text-sm leading-relaxed">Let supporters find you on other platforms and grow your community across all channels.</div>
                </div>
                <motion.button
                  onClick={() => setIsAddingLink(true)}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add your first link
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      )}
      
      {!isVisible && (
        <motion.div 
          className="text-center py-16 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center gap-6 text-gray-500">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-600/20 to-gray-700/20 rounded-3xl flex items-center justify-center border border-white/5">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <div className="text-center">
              <div className="font-semibold text-lg text-gray-300 mb-2">Connect Section Hidden</div>
              <div className="text-gray-500 text-sm">Toggle the switch above to show this section</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Photo Story Modal */}
      {photoModalLink && typeof window !== 'undefined' && createPortal(
        <div className="fixed inset-0 bg-black/60 backdrop-blur-lg flex items-center justify-center p-4 z-[999999]" onClick={handleClosePhotoModal}>
          <div className="bg-black/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden relative z-[999999]" onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="sticky top-0 bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Story Photo
                </h3>
                <button
                  onClick={handleClosePhotoModal}
                  className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-white/80 hover:text-white transition-all duration-200"
                  aria-label="Close modal"
                  title="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 max-h-[calc(90vh-140px)] overflow-y-auto">
              {/* File Upload */}
              <div className="space-y-3">
                <Label className="text-white font-medium">Upload Image</Label>
                <div className="border-2 border-dashed border-white/20 hover:border-blue-400/50 rounded-xl transition-all duration-300">
                  {previewUrl ? (
                    <div className="relative p-4">
                      <Image 
                        src={previewUrl} 
                        alt="Preview" 
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover rounded-lg border border-white/20"
                      />
                      <button
                        className="absolute top-6 right-6 w-8 h-8 bg-black/80 hover:bg-black/90 rounded-lg flex items-center justify-center text-white transition-all duration-200"
                        onClick={() => {
                          setSelectedFile(null)
                          setPreviewUrl('')
                        }}
                        aria-label="Remove image"
                        title="Remove image"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <label htmlFor="photo-upload" className="block p-8 cursor-pointer hover:bg-white/5 transition-all duration-300 rounded-xl">
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl mx-auto flex items-center justify-center">
                          <Upload className="h-8 w-8 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-white font-medium mb-1">Click to upload or drag and drop</p>
                          <p className="text-gray-400 text-sm">PNG, JPG, JPEG (max 10MB)</p>
                        </div>
                      </div>
                      <input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Caption */}
              <div className="space-y-3">
                <Label className="text-white font-medium">Caption (optional)</Label>
                <Textarea
                  value={photoCaption}
                  onChange={(e) => setPhotoCaption(e.target.value)}
                  placeholder="Add a caption to your story..."
                  rows={3}
                  className="bg-black/50 border-white/20 text-white placeholder-gray-400 focus:border-blue-400/50 focus:ring-blue-400/25 resize-none rounded-xl transition-all duration-300"
                />
              </div>

              {/* Payment Button Toggle */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                  <Label htmlFor="payment-button-modal" className="text-white font-medium">Enable payment button</Label>
                  <motion.button
                    onClick={() => setEnablePaymentButton(!enablePaymentButton)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ${
                      enablePaymentButton ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/25' : 'bg-gray-600'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title={`${enablePaymentButton ? 'Disable' : 'Enable'} payment button`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
                      enablePaymentButton ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </motion.button>
                </div>

                {enablePaymentButton && (
                  <div className="space-y-4 p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
                    <Label className="text-white font-medium text-sm">Choose Payment Method</Label>
                    <div className="grid grid-cols-1 gap-3 max-h-[240px] overflow-y-auto">
                      {walletMethods.map((method) => {
                        const isSelected = linkedPaymentMethodId === method.id
                        
                        return (
                          <motion.button
                            key={method.id}
                            onClick={() => setLinkedPaymentMethodId(method.id)}
                            className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 text-left w-full ${
                              isSelected 
                                ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30 border-blue-400/50 shadow-lg shadow-blue-500/25' 
                                : 'bg-black/40 border-white/20 hover:bg-black/60 hover:border-white/30'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                              isSelected 
                                ? 'bg-gradient-to-br from-blue-500/40 to-purple-500/40 border border-blue-400/50' 
                                : 'bg-white/10 border border-white/20'
                            }`}>
                              <PaymentIcon 
                                type={method.platform} 
                                className="w-6 h-6 text-white" 
                                size={24} 
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-white font-medium text-sm capitalize">{method.platform}</div>
                              <div className="text-gray-400 text-xs truncate">
                                {method.handle ? `@${method.handle}` : method.name}
                              </div>
                            </div>
                            {isSelected && (
                              <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                <Check className="w-3 h-3 text-white" strokeWidth={3} />
                              </div>
                            )}
                          </motion.button>
                        )
                      })}
                      {walletMethods.length === 0 && (
                        <div className="text-center py-6 text-gray-400">
                          <div className="text-sm">No payment methods available</div>
                          <div className="text-xs mt-1">Add payment methods in your wallet settings</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-black/95 backdrop-blur-xl border-t border-white/10 p-6 rounded-b-2xl">
              <div className="flex gap-3">
                <Button
                  onClick={handleClosePhotoModal}
                  variant="outline"
                  className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSavePhoto}
                  disabled={uploading}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {uploading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Saving...
                    </div>
                  ) : (
                    'Save Story'
                  )}
                </Button>
                {previewUrl && (
                  <Button
                    onClick={handleRemovePhoto}
                    variant="destructive"
                    className="px-4 bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30 hover:text-red-300"
                  >
                    Remove
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </motion.div>
  )
}
