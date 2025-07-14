/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Profile Editor Features
 * Component: Live profile editor that looks exactly like the public profile but with inline editing
 * Features: Real-time editing, same styling as public profile, WYSIWYG experience
 * 
 * NOTE: This component now automatically displays all your existing profile data from the database
 * including display name, bio, social links, payment methods, goals, etc.
 */
'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { uploadProfileImage } from '@/lib/image-upload'
import { getThemeStyles } from '@/components/profile/public/theme-utils'
import { SocialIcon, PaymentIcon, ExternalLinkIcon } from '@/components/icons'
import {
  EditableSocialLinks,
  EditablePaymentMethods,
  EditableGoals,
  EditableThemeSelector,
  EmptyProfileTutorial,
  HelpfulTip,
  SectionVisibilityControls,
  ImageUploadModal
} from './components'
import './editable-profile.css'

const CHARACTER_LIMITS = {
  display_name: 50,
  bio: 160,
  location: 100
}

// Helper function to get character count color
const getCharCountColor = (current: number, limit: number) => {
  const percentage = (current / limit) * 100
  if (percentage >= 90) return 'text-red-400'
  if (percentage >= 80) return 'text-yellow-400'
  return 'text-gray-400'
}

interface Profile {
  id?: string
  username: string
  display_name?: string
  bio?: string
  avatar_url?: string
  banner_url?: string
  location?: string
  theme: string
  is_verified?: boolean
  payment_methods?: any[]
  social_links?: any[]
  goals?: any[]
  // Section visibility controls
  show_social_links?: boolean
  show_payment_methods?: boolean
  show_goals?: boolean
}

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

interface EditablePublicProfileProps {
  profile: Profile
  userId: string
  onProfileUpdate: (updates: Partial<Profile>) => void
}

// Main EditablePublicProfile Component
export default function EditablePublicProfile({ profile, userId, onProfileUpdate }: EditablePublicProfileProps) {
  const [showImageModal, setShowImageModal] = useState<'avatar' | 'banner' | null>(null)
  const [showTutorial, setShowTutorial] = useState(false)
  const [showSocialLinks, setShowSocialLinks] = useState(profile.show_social_links ?? true)
  const [showPaymentMethods, setShowPaymentMethods] = useState(profile.show_payment_methods ?? true)
  const [showGoals, setShowGoals] = useState(profile.show_goals ?? true)
  const themeStyles = getThemeStyles(profile.theme)

  // Sync local state with profile changes
  useEffect(() => {
    setShowSocialLinks(profile.show_social_links ?? true)
    setShowPaymentMethods(profile.show_payment_methods ?? true)
    setShowGoals(profile.show_goals ?? true)
  }, [profile.show_social_links, profile.show_payment_methods, profile.show_goals])

  // Check if profile is empty to show tutorial
  const isEmptyProfile = !profile.display_name && 
                        !profile.bio && 
                        !profile.avatar_url && 
                        (!profile.social_links || profile.social_links.length === 0) &&
                        (!profile.payment_methods || profile.payment_methods.length === 0) &&
                        (!profile.goals || profile.goals.length === 0)

  useEffect(() => {
    if (isEmptyProfile) {
      setShowTutorial(true)
    }
  }, [isEmptyProfile])

  // Handle section visibility toggles
  const handleToggleVisibility = async (section: 'social_links' | 'payment_methods' | 'goals', newValue: boolean) => {
    // Update local state immediately for responsive UI
    if (section === 'social_links') {
      setShowSocialLinks(newValue)
    } else if (section === 'payment_methods') {
      setShowPaymentMethods(newValue)
    } else if (section === 'goals') {
      setShowGoals(newValue)
    }

    // Try to update the database - handle gracefully if columns don't exist yet
    try {
      const updateKey = `show_${section}` as keyof Profile
      await onProfileUpdate({ [updateKey]: newValue })
    } catch (error) {
      console.warn(`Visibility toggle not yet supported for ${section}:`, error)
      // For now, just keep the local state updated until DB migration is applied
    }
  }

  const handleImageUpload = (url: string) => {
    if (showImageModal === 'avatar') {
      onProfileUpdate({ avatar_url: url })
    } else if (showImageModal === 'banner') {
      onProfileUpdate({ banner_url: url })
    }
    setShowImageModal(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header Section - Enhanced Design */}
      <div className="relative overflow-hidden min-h-[500px] sm:min-h-[600px] lg:min-h-[700px]">
        
        {/* Edit Banner Button - Top Right */}
        <motion.div 
          className="absolute top-6 right-6 z-30"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.button 
            onClick={() => setShowImageModal('banner')}
            className="bg-black/60 backdrop-blur-sm border border-white/20 text-white px-5 py-3 rounded-2xl flex items-center gap-3 text-sm font-medium hover:bg-black/70 hover:border-white/30 transition-all duration-300 shadow-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{profile.banner_url ? 'Edit Banner' : 'Add Banner'}</span>
          </motion.button>
        </motion.div>

        {/* Banner Image - Absolute background layer */}
        {profile.banner_url && (
          <div className="absolute inset-0 z-0">
            <Image
              src={profile.banner_url}
              alt="Profile banner"
              fill
              className="object-cover"
              priority
            />
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40" />
            {/* Edit overlay for banner */}
            <div 
              className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100 cursor-pointer z-10"
              onClick={() => setShowImageModal('banner')}
            >
              <div className="text-white text-center">
                <div className="bg-black/60 backdrop-blur-sm border border-white/20 px-4 py-3 rounded-lg flex items-center gap-2 text-sm font-medium">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 616 0z" />
                  </svg>
                  Change Banner
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Animated Background (only if no banner) */}
        {!profile.banner_url && (
          <>
            <motion.div 
              className="absolute inset-0 bg-black z-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            />
            
            {/* Floating Elements */}
            <div className="absolute inset-0 overflow-hidden z-0">
              <motion.div
                className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-3xl"
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-3xl"
                animate={{
                  y: [0, 20, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
            
            {/* Banner upload area overlay */}
            <div 
              className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100 cursor-pointer z-10"
              onClick={() => setShowImageModal('banner')}
            >
              <div className="text-white text-center">
                <div className="bg-black/60 backdrop-blur-sm border border-white/20 px-4 py-3 rounded-lg flex items-center gap-2 text-sm font-medium">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Add Banner Image
                </div>
              </div>
            </div>
          </>
        )}

        {/* Header Content - Absolutely centered */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Avatar - Perfectly centered */}
              <motion.div
                className="relative mx-auto mb-4 z-30"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div 
                  className="relative w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 mx-auto cursor-pointer group"
                  onClick={() => setShowImageModal('avatar')}
                >
                  {/* Glowing Ring */}
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${themeStyles.accent} p-1 sm:p-1.5`}>
                    <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                      {profile.avatar_url ? (
                        <Image
                          src={profile.avatar_url}
                          alt="Profile avatar"
                          width={176}
                          height={176}
                          className="w-full h-full rounded-full object-cover"
                          priority
                        />
                      ) : (
                        <div className={`w-full h-full rounded-full bg-gradient-to-br ${themeStyles.accent} flex items-center justify-center text-white text-2xl sm:text-3xl lg:text-4xl font-bold`}>
                          {(profile.display_name || profile.username).charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Pulse Animation */}
                  <motion.div
                    className={`absolute inset-0 rounded-full bg-gradient-to-r ${themeStyles.accent} opacity-20`}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0, 0.2],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Edit overlay with better indicator */}
                  <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="text-white text-center">
                      <div className="bg-black/60 backdrop-blur-sm border border-white/20 px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-medium">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 616 0z" />
                        </svg>
                        Edit Photo
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Name and Username - Editable */}
              <motion.div
                className="mb-4 sm:mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="relative group">
                    <input
                      type="text"
                      value={profile.display_name || ''}
                      onChange={(e) => onProfileUpdate({ display_name: e.target.value })}
                      placeholder="Click to edit your display name"
                      className="bg-transparent hover:bg-black/20 focus:bg-black/30 text-white text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold border-none outline-none placeholder-gray-500 text-center rounded px-4 py-2 transition-all duration-300 border-2 border-transparent hover:border-white/20 focus:border-blue-500/50"
                      maxLength={CHARACTER_LIMITS.display_name}
                    />
                    {/* Edit indicator */}
                    <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-black/60 backdrop-blur-sm border border-white/20 text-white text-xs px-2 py-1 rounded-lg flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        Edit
                      </div>
                    </div>
                  </div>
                  {profile.is_verified && (
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <p className={`text-sm sm:text-base lg:text-lg ${themeStyles.accent_text} font-medium mb-2`}>
                  @{profile.username}
                </p>
              </motion.div>

              {/* Bio - Editable with tile background */}
              <motion.div
                className="max-w-2xl mx-auto mb-6 sm:mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="relative group">
                  {/* Tile background like public profile */}
                  <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-black/40 hover:border-white/20 transition-all duration-300">
                    <textarea
                      value={profile.bio || ''}
                      onChange={(e) => onProfileUpdate({ bio: e.target.value })}
                      placeholder="Click to edit your bio - tell supporters about yourself..."
                      className="bg-transparent border-none outline-none resize-none w-full placeholder-gray-400 text-center text-gray-300 text-base sm:text-lg leading-relaxed"
                      rows={3}
                      maxLength={CHARACTER_LIMITS.bio}
                    />
                    {/* Edit indicator */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-black/60 backdrop-blur-sm border border-white/20 text-white text-xs px-2 py-1 rounded-lg flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        Edit Bio
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Location */}
              {profile.location && (
                <motion.div
                  className="text-gray-400 text-sm mt-3 flex items-center justify-center gap-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <input
                    type="text"
                    value={profile.location || ''}
                    onChange={(e) => onProfileUpdate({ location: e.target.value })}
                    placeholder="Add your location"
                    className="bg-transparent border-none outline-none placeholder-gray-500"
                    maxLength={CHARACTER_LIMITS.location}
                  />
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-12">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[size:20px_20px]" />
        </div>
        
        <motion.div 
          className="relative grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* Social Links - Connect First */}
          <EditableSocialLinks
            userId={userId}
            socialLinks={profile.social_links || []}
            themeStyles={themeStyles}
            onUpdate={(links) => onProfileUpdate({ social_links: links })}
            isVisible={showSocialLinks}
            onToggleVisibility={() => handleToggleVisibility('social_links', !showSocialLinks)}
          />

          {/* Payment Methods - Support Me Second */}
          <EditablePaymentMethods
            paymentMethods={profile.payment_methods || []}
            themeStyles={themeStyles}
            onUpdate={(methods) => onProfileUpdate({ payment_methods: methods })}
            isVisible={showPaymentMethods}
            onToggleVisibility={() => handleToggleVisibility('payment_methods', !showPaymentMethods)}
          />

          {/* Goals - Third */}
          <EditableGoals
            goals={profile.goals || []}
            themeStyles={themeStyles}
            onUpdate={(goals) => onProfileUpdate({ goals })}
            isVisible={showGoals}
            onToggleVisibility={() => handleToggleVisibility('goals', !showGoals)}
          />

          {/* Theme Selector - Fourth */}
          <EditableThemeSelector 
            selectedTheme={profile.theme}
            themeStyles={themeStyles}
            onThemeChange={(theme) => onProfileUpdate({ theme })}
            isVisible={true}
            onToggleVisibility={() => {}}
          />
        </motion.div>
      </div>

      {/* Image Upload Modal */}
      <AnimatePresence>
        {showImageModal && (
          <ImageUploadModal
            isOpen={!!showImageModal}
            uploadType={showImageModal === 'avatar' ? 'profile' : 'cover'}
            currentImage={showImageModal === 'avatar' ? profile.avatar_url : profile.banner_url}
            onClose={() => setShowImageModal(null)}
            onUpload={(file: File) => {
              // Handle file upload logic here
              console.log('File upload:', file)
            }}
            isUploading={false}
          />
        )}
      </AnimatePresence>

      {/* Tutorial Overlay */}
      <AnimatePresence>
        {showTutorial && (
          <EmptyProfileTutorial 
            onAddSocialLink={() => setShowTutorial(false)}
            onAddPaymentMethod={() => setShowTutorial(false)}
            onAddGoal={() => setShowTutorial(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// Named export for backward compatibility
export { EditablePublicProfile }
