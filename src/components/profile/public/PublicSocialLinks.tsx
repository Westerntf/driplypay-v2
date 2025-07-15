/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Public Profile Features
 * Component: Enhanced social links for public profile with story photo support
 * Features: Modern social card design, platform branding, interactive animations, photo stories with payment integration
 */
'use client'

import { useState } from 'react'
import { ExternalLink, Users, Share2, X, DollarSign, ArrowRight, Camera } from 'lucide-react'
import { SocialIcon } from '@/components/icons'
import { PaymentIcon } from '@/components/icons'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import './animations.css'

interface WalletMethod {
  id: string
  type: 'external' | 'payid' | 'bank'
  platform: string
  name: string
  handle?: string
  url?: string
  details?: {
    email?: string
    phone?: string
    bsb?: string
    account?: string
  }
  enabled: boolean
}

// Keep PaymentMethod for backward compatibility
interface PaymentMethod extends WalletMethod {}

interface SocialLink {
  id: string
  platform: string
  url: string
  label?: string
  enabled?: boolean
  order_index?: number
  photo_url?: string
  photo_caption?: string
  wallet_method_id?: string
  [key: string]: any
}

interface PublicSocialLinksProps {
  socialLinks: SocialLink[]
  walletMethods: WalletMethod[]
  profileUsername: string
  themeStyles: {
    background: string
    accent: string
    accentBackground: string
    card: string
    button: string
    iconBackground: string
    text: string
    accent_text: string
  }
}

export function PublicSocialLinks({ 
  socialLinks, 
  walletMethods, 
  profileUsername, 
  themeStyles 
}: PublicSocialLinksProps) {
  const [selectedStoryLink, setSelectedStoryLink] = useState<SocialLink | null>(null)

  // Use walletMethods directly since we've removed payment methods
  const activeMethods = walletMethods

  // Extract theme identifier for CSS classes based on your 4 actual themes
  const getThemeClass = () => {
    // DriplyPay theme (default purple gradient)
    if (themeStyles.accent.includes('purple') || themeStyles.accent.includes('fuchsia')) return 'theme-driply'
    // Ocean theme (blue gradient)
    if (themeStyles.accent.includes('blue') || themeStyles.accent.includes('cyan')) return 'theme-ocean'
    // Neon theme (green gradient)
    if (themeStyles.accent.includes('green') || themeStyles.accent.includes('emerald')) return 'theme-neon'
    // Luxe theme (red gradient)
    if (themeStyles.accent.includes('red') || themeStyles.accent.includes('rose')) return 'theme-luxe'
    return 'theme-driply' // default to DriplyPay theme
  }

  const themeClass = getThemeClass()

  if (!socialLinks || socialLinks.length === 0) {
    return null
  }

  // Filter enabled links and sort by order_index if available
  const enabledLinks = socialLinks
    .filter(link => link.enabled !== false)
    .sort((a, b) => (a.order_index || 0) - (b.order_index || 0))

  if (enabledLinks.length === 0) {
    return null
  }

  // Handle click - open story modal if photo exists, otherwise go to social
  const handleLinkClick = (e: React.MouseEvent, link: SocialLink) => {
    e.preventDefault()
    
    if (link.photo_url) {
      // Open story modal
      setSelectedStoryLink(link)
    } else {
      // Go to social platform
      window.open(link.url, '_blank', 'noopener,noreferrer')
    }
  }

  // Handle payment method click
  const handlePaymentClick = (link: SocialLink) => {
    const paymentMethod = activeMethods.find((pm: WalletMethod) => pm.id === link.wallet_method_id)
    if (paymentMethod) {
      if (paymentMethod.type === 'external' && paymentMethod.url) {
        // Handle external payment redirect
        window.open(paymentMethod.url, '_blank', 'noopener,noreferrer')
      } else if (paymentMethod.type === 'payid' || paymentMethod.type === 'bank') {
        // Handle internal payment modal (PayID or Bank Transfer)
        // This would trigger the same modal as in PublicWallet
        console.log('Internal payment method clicked:', paymentMethod)
        // TODO: Implement modal logic here similar to PublicWallet
      }
    }
  }

  // Close story modal
  const closeStoryModal = () => {
    setSelectedStoryLink(null)
  }

  // Calculate dynamic single-row layout based on number of links
  const getLayoutConfig = () => {
    const count = enabledLinks.length
    
    // All layouts use single row with dynamic sizing
    switch (count) {
      case 1:
        return { 
          layout: 'single-row',
          gridClass: 'grid-cols-1',
          tileSize: 'extra-large'
        }
      case 2:
        return { 
          layout: 'single-row',
          gridClass: 'grid-cols-2',
          tileSize: 'large'
        }
      case 3:
        return { 
          layout: 'single-row',
          gridClass: 'grid-cols-3',
          tileSize: 'large'
        }
      case 4:
        return { 
          layout: 'single-row',
          gridClass: 'grid-cols-4',
          tileSize: 'medium'
        }
      case 5:
        return { 
          layout: 'single-row',
          gridClass: 'grid-cols-5',
          tileSize: 'small'
        }
      case 6:
        return { 
          layout: 'single-row',
          gridClass: 'grid-cols-6',
          tileSize: 'small'
        }
      default:
        // For 7+ items, use 6 columns and small tiles
        return { 
          layout: 'single-row',
          gridClass: 'grid-cols-6',
          tileSize: 'extra-small'
        }
    }
  }

  const layoutConfig = getLayoutConfig()

  // Render individual social tile with size variants for single row
  const renderSocialTile = (link: SocialLink, index: number, size: 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large') => {
    const sizeClasses = {
      'extra-small': {
        container: 'p-2 sm:p-3 lg:p-4 aspect-square',
        icon: 'w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12',
        iconInner: 'w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6',
        button: 'px-2 py-1 lg:px-3 lg:py-1.5 text-xs lg:text-sm'
      },
      small: {
        container: 'p-3 sm:p-4 lg:p-5 aspect-square',
        icon: 'w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14',
        iconInner: 'w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7',
        button: 'px-2 py-1 lg:px-3 lg:py-1.5 text-xs lg:text-sm'
      },
      medium: {
        container: 'p-3 sm:p-4 lg:p-6 aspect-square',
        icon: 'w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16',
        iconInner: 'w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8',
        button: 'px-2.5 py-1 lg:px-4 lg:py-2 text-xs lg:text-sm'
      },
      large: {
        container: 'p-4 sm:p-5 lg:p-7 aspect-square',
        icon: 'w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20',
        iconInner: 'w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10',
        button: 'px-3 py-1.5 lg:px-5 lg:py-2.5 text-sm lg:text-base'
      },
      'extra-large': {
        container: 'p-6 sm:p-8 lg:p-10 aspect-square',
        icon: 'w-18 h-18 sm:w-22 sm:h-22 lg:w-24 lg:h-24',
        iconInner: 'w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12',
        button: 'px-4 py-2 lg:px-6 lg:py-3 text-sm lg:text-lg'
      }
    }

    const styles = sizeClasses[size]
    const hasStory = !!link.photo_url

    return (
      <button
        key={index}
        onClick={(e) => handleLinkClick(e, link)}
        className={`social-link-item group relative overflow-hidden rounded-lg sm:rounded-xl border-2 transition-all duration-300 text-center bg-gradient-to-r from-white/5 to-transparent backdrop-blur-sm hover:scale-[1.02] hover:shadow-2xl ${themeStyles.card} block animate-fadeInUp cursor-pointer ${
          hasStory 
            ? `border-white/30 hover:border-white/50 animate-pulse shadow-lg story-active ${themeClass}`
            : 'border-white/10 hover:border-white/20'
        }`}
        title={hasStory ? `View ${link.label || link.platform} story` : `Follow on ${link.label || link.platform}`}
      >
        {/* Gradient overlay on hover - Uses themeStyles like payment methods */}
        <div className={`absolute inset-0 bg-gradient-to-r ${themeStyles.accent} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
        
        {/* Story indicator for active stories */}
        {hasStory && (
          <>
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-black flex items-center justify-center animate-bounce z-10 story-indicator">
              <Camera className="w-2.5 h-2.5 text-white" />
            </div>
            <div className="absolute inset-0 rounded-lg sm:rounded-xl story-overlay" />
          </>
        )}
        
        <div className={`relative ${styles.container} flex flex-col items-center justify-center gap-2 lg:gap-3`}>
          {/* Enhanced Social Icon - Uses themeStyles like payment methods */}
          <div className={`relative ${styles.icon} rounded-lg lg:rounded-xl bg-gradient-to-r ${themeStyles.accent} p-0.5 group-hover:scale-110 transition-transform duration-300`}>
            <div className="w-full h-full rounded-lg lg:rounded-xl bg-black/80 flex items-center justify-center backdrop-blur-sm">
              <SocialIcon 
                platform={link.platform} 
                className={`${styles.iconInner} text-white`}
              />
            </div>
          </div>
          
          {/* Button Text - Uses themeStyles like payment methods */}
          <div className={`${styles.button} rounded-md lg:rounded-lg bg-gradient-to-r ${themeStyles.accent} opacity-80 group-hover:opacity-100 transition-opacity`}>
            <span className="text-white font-medium">
              {hasStory ? 'View Story' : 'Follow'}
            </span>
          </div>
        </div>

        {/* Shine effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-out" />
      </button>
    )
  }

  return (
    <div className={`relative ${themeClass}`}>
      {/* Enhanced Social Links Container - Compact Banner Style on All Devices */}
      <div className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-xl ${themeStyles.card} p-3 sm:p-4 lg:p-6`}>
        {/* Gradient Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
        <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${themeStyles.accent} opacity-10 rounded-full blur-3xl`} />
        <div className={`absolute -bottom-20 -left-20 w-32 h-32 bg-gradient-to-tr ${themeStyles.accent} opacity-5 rounded-full blur-2xl`} />
        
        <div className="relative z-10">
          {/* Header Section - Compact for Mobile */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between lg:flex-row lg:items-center lg:justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-0">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-r ${themeStyles.accent} p-0.5`}>
                <div className="w-full h-full rounded-xl sm:rounded-2xl bg-black/80 flex items-center justify-center backdrop-blur-sm">
                  <Share2 className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-base sm:text-lg lg:text-xl font-bold text-white">Connect</h2>
                <p className="text-xs sm:text-xs lg:text-sm text-gray-400">Follow and stay connected</p>
              </div>
            </div>
            
            {/* Social Stats - Compact for Mobile */}
            <div className="flex items-center gap-1 sm:gap-2 text-gray-400 text-left sm:text-right">
              <Users className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm">
                {enabledLinks.length} platform{enabledLinks.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Social Links - Single Row Dynamic Layout */}
          <div className={`grid ${layoutConfig.gridClass} gap-1.5 sm:gap-2 lg:gap-3`}>
            {enabledLinks.map((link, index) => 
              renderSocialTile(link, index, layoutConfig.tileSize as 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large')
            )}
          </div>
        </div>
      </div>
      
      {/* Floating Social Elements */}
      <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl" />
      <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-gradient-to-r from-pink-500/10 to-orange-500/10 blur-xl" />

      {/* Story Modal */}
      {selectedStoryLink && typeof window !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 bg-black z-[999999] flex flex-col"
          onClick={closeStoryModal}
        >
          {/* Story Progress Bar */}
          <div className="absolute top-4 left-4 right-4 z-30">
            <div className="flex gap-1">
              <div className={`flex-1 h-1 rounded-full bg-gradient-to-r ${themeStyles.accent} opacity-80 shadow-lg`} />
            </div>
          </div>

          {/* Profile Header Overlay */}
          <div className="absolute top-8 left-4 right-4 z-30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r ${themeStyles.accent} p-0.5`}>
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                  <SocialIcon platform={selectedStoryLink.platform} className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm sm:text-base drop-shadow-lg">{selectedStoryLink.label || selectedStoryLink.platform}</h3>
                <p className="text-white/80 text-xs sm:text-sm drop-shadow-lg">@{profileUsername}</p>
              </div>
            </div>
            <button
              onClick={closeStoryModal}
              className="text-white/80 hover:text-white transition-colors p-2 hover:bg-black/20 rounded-full backdrop-blur-sm"
              title="Close story"
            >
              <X className="h-6 w-6 sm:h-7 sm:w-7 drop-shadow-lg" />
            </button>
          </div>

          {/* Full Screen Story Content */}
          <div 
            className="flex-1 relative overflow-hidden flex items-center justify-center pt-20 pb-32"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Story Image and Caption Container */}
            {selectedStoryLink.photo_url && (
              <div className="relative w-full h-full flex flex-col items-center justify-center px-4 sm:px-6">
                {/* Clean background - no blur effects */}
                <div className="absolute inset-0 bg-black" />
                
                {/* Centered content container with proper spacing */}
                <div className="relative z-10 flex flex-col items-center justify-center max-h-full space-y-4">
                  
                  {/* Main image - adaptive sizing based on aspect ratio */}
                  <div className="relative flex items-center justify-center">
                    <Image
                      src={selectedStoryLink.photo_url}
                      alt="Story photo"
                      width={800}
                      height={600}
                      className="max-w-[90vw] max-h-[60vh] sm:max-w-[80vw] sm:max-h-[65vh] md:max-w-[70vw] md:max-h-[70vh] w-auto h-auto object-contain rounded-2xl shadow-2xl"
                      quality={95}
                      priority
                      style={{ 
                        maxWidth: '90vw',
                        maxHeight: '60vh',
                        width: 'auto',
                        height: 'auto'
                      }}
                    />
                  </div>
                  
                  {/* Story Caption - Positioned below photo with proper spacing */}
                  {selectedStoryLink.photo_caption && (
                    <div className="w-full max-w-sm sm:max-w-md px-2">
                      <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                        <p className="text-white text-sm leading-relaxed text-center">
                          {selectedStoryLink.photo_caption}
                        </p>
                      </div>
                    </div>
                  )}
                  
                </div>
                
                {/* Subtle gradient for UI readability only at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent z-20 pointer-events-none" />
              </div>
            )}
          </div>

          {/* Enhanced Bottom Actions - Proportional to Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-30">
            <div className="max-w-lg mx-auto">
              {/* Enhanced Action Bar - Bigger and More Prominent */}
              <div className="bg-black/50 backdrop-blur-xl rounded-2xl border border-white/20 p-4 shadow-2xl">
                
                {/* Side by Side Buttons - Adjusted Proportions */}
                <div className={`flex gap-3 ${selectedStoryLink.wallet_method_id && activeMethods.find((pm: WalletMethod) => pm.id === selectedStoryLink.wallet_method_id) ? '' : 'justify-center'}`}>
                  
                  {/* Payment Button - Theme-based colors, shorter width */}
                  {selectedStoryLink.wallet_method_id && activeMethods.find((pm: WalletMethod) => pm.id === selectedStoryLink.wallet_method_id) && (
                    <button
                      onClick={() => handlePaymentClick(selectedStoryLink)}
                      className={`w-32 group relative overflow-hidden rounded-xl bg-gradient-to-r ${themeStyles.accent} p-0.5 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]`}
                    >
                      <div className="relative bg-black/20 backdrop-blur-sm rounded-xl px-4 py-4 flex items-center justify-center gap-2 group-hover:bg-black/10 transition-all duration-300">
                        <PaymentIcon 
                          type={activeMethods.find((pm: WalletMethod) => pm.id === selectedStoryLink.wallet_method_id)?.platform || 'default'} 
                          className="w-4 h-4 sm:w-5 sm:h-5 text-white" 
                        />
                        <span className="text-white font-semibold text-xs sm:text-sm">Support</span>
                      </div>
                      {/* Enhanced shimmer effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000" />
                    </button>
                  )}
                  
                  {/* Follow Button - Longer width, emphasized for social focus */}
                  <button
                    onClick={() => window.open(selectedStoryLink.url, '_blank', 'noopener,noreferrer')}
                    className="flex-1 group relative overflow-hidden bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/40 rounded-xl px-6 py-4 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="flex items-center justify-center gap-2.5">
                      <SocialIcon platform={selectedStoryLink.platform} className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      <span className="text-white font-semibold text-sm sm:text-base">Follow</span>
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-r ${themeStyles.accent} opacity-0 group-hover:opacity-15 transition-opacity rounded-xl`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

// Helper function to get platform descriptions
function getPlatformDescription(platform: string): string {
  const descriptions: Record<string, string> = {
    twitter: 'Latest updates and thoughts',
    x: 'Latest updates and thoughts',
    instagram: 'Photos and stories',
    tiktok: 'Short videos and content',
    youtube: 'Videos and tutorials',
    twitch: 'Live streams',
    discord: 'Community chat',
    onlyfans: 'Exclusive content',
    website: 'Official website',
    custom: 'Social platform'
  }
  
  return descriptions[platform.toLowerCase()] || 'Connect and follow'
}
