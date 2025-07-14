/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Public Profile Features
 * Component: Modern animated header for public profiles
 * Features: Responsive design, theme support, animated background, mobile-first, avatar lightbox
 */
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

interface Profile {
  username: string
  display_name?: string
  bio?: string
  avatar_url?: string
  banner_url?: string
  location?: string
  theme: string
  is_verified?: boolean
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

interface PublicProfileHeaderProps {
  profile: Profile
  themeStyles: ThemeStyles
}

export function PublicProfileHeader({ profile, themeStyles }: PublicProfileHeaderProps) {
  const displayName = profile.display_name || profile.username
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false)

  // Debug logging
  console.log('PublicProfileHeader - Profile data:', {
    username: profile.username,
    location: profile.location,
    avatar_url: profile.avatar_url,
    banner_url: profile.banner_url
  })

  return (
    <div className="relative overflow-hidden min-h-[500px] sm:min-h-[600px] lg:min-h-[700px]">
      {/* Banner Image - Absolute background layer */}
      {profile.banner_url && (
        <div className="absolute inset-0 z-0">
          <Image
            src={profile.banner_url}
            alt={`${displayName}'s banner`}
            fill
            className="object-cover"
            priority
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40" />
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
                className="relative w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 mx-auto cursor-pointer"
                onClick={() => profile.avatar_url && setIsAvatarModalOpen(true)}
              >
                {/* Glowing Ring */}
                <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${themeStyles.accent} p-1 sm:p-1.5`}>
                  <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                    {profile.avatar_url ? (
                      <Image
                        src={profile.avatar_url}
                        alt={displayName}
                        width={176}
                        height={176}
                        className="w-full h-full rounded-full object-cover"
                        priority
                      />
                    ) : (
                      <div className={`w-full h-full rounded-full bg-gradient-to-br ${themeStyles.accent} flex items-center justify-center text-white text-2xl sm:text-3xl lg:text-4xl font-bold`}>
                        {displayName.charAt(0).toUpperCase()}
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
              </div>
            </motion.div>

            {/* Name and Username */}
            <motion.div
              className="mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white">
                  {displayName}
                </h1>
                {profile.is_verified && (
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              <p className={`text-sm sm:text-base lg:text-lg ${themeStyles.accent_text} font-medium`}>
                @{profile.username}
              </p>
              {profile.location && (
                <p className="text-gray-400 text-sm mt-1 flex items-center justify-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {profile.location}
                </p>
              )}
            </motion.div>

            {/* Bio */}
            {profile.bio && (
              <motion.div
                className="max-w-2xl mx-auto mb-6 sm:mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="bg-black/50 backdrop-blur-sm rounded-xl px-6 py-4 mx-4">
                  <p className="text-gray-200 text-sm sm:text-base lg:text-lg leading-relaxed">
                    {profile.bio}
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Fade - Extended for seamless transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />

      {/* Avatar Modal */}
      <AnimatePresence>
        {isAvatarModalOpen && profile.avatar_url && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsAvatarModalOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
            
            {/* Modal Content */}
            <motion.div
              className="relative max-w-2xl max-h-[90vh] w-full"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsAvatarModalOpen(false)}
                aria-label="Close profile picture"
                className="absolute -top-12 right-0 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Large Avatar with Glow Effect */}
              <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-r ${themeStyles.accent} p-2`}>
                <div className="relative rounded-xl overflow-hidden bg-gray-900">
                  <Image
                    src={profile.avatar_url}
                    alt={`${displayName}'s profile picture`}
                    width={800}
                    height={800}
                    className="w-full h-auto object-cover"
                    quality={95}
                  />
                  
                  {/* Profile Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                    <h3 className="text-white text-xl font-bold mb-1">{displayName}</h3>
                    <p className={`${themeStyles.accent_text} text-sm font-medium`}>@{profile.username}</p>
                    {profile.location && (
                      <p className="text-gray-300 text-sm mt-1 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {profile.location}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
