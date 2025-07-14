/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Public Profile Features
 * Component: Enhanced profile sharing with viral-focused design
 * Features: Copy link, social sharing, QR code access, viral growth features
 */
'use client'

import { useState } from 'react'
import { Share2, Copy, Check, QrCode, Users, Zap, ExternalLink } from 'lucide-react'
import './animations.css'

interface PublicShareProfileProps {
  username: string
  displayName: string
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

export function PublicShareProfile({ username, displayName, themeStyles }: PublicShareProfileProps) {
  const [copied, setCopied] = useState(false)
  const profileUrl = `${window.location.origin}/${username}`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy link:', error)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Support ${displayName}`,
          text: `Check out ${displayName}'s profile on DriplyPay`,
          url: profileUrl
        })
      } catch (error) {
        console.error('Failed to share:', error)
      }
    } else {
      handleCopyLink()
    }
  }

  const handleQRCode = () => {
    // TODO: Open QR code modal
    console.log('QR code functionality - TODO')
  }

  return (
    <div className="relative">
      {/* Enhanced Share Profile Container */}
      <div className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-xl ${themeStyles.card} p-6 sm:p-8`}>
        {/* Gradient Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
        <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${themeStyles.accent} opacity-10 rounded-full blur-3xl`} />
        <div className={`absolute -bottom-20 -left-20 w-32 h-32 bg-gradient-to-tr ${themeStyles.accent} opacity-5 rounded-full blur-2xl`} />
        
        <div className="relative z-10">
          {/* Header Section */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${themeStyles.accent} p-0.5`}>
                <div className="w-full h-full rounded-2xl bg-black/80 flex items-center justify-center backdrop-blur-sm">
                  <Share2 className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Share Profile</h2>
                <p className="text-sm text-gray-400">Help spread the word and grow your community</p>
              </div>
            </div>
          </div>

          {/* Share Actions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            {/* Copy Link Button */}
            <button
              onClick={handleCopyLink}
              className={`share-action-item share-action-1 group relative overflow-hidden rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 bg-gradient-to-r from-white/5 to-transparent backdrop-blur-sm hover:scale-105 hover:shadow-2xl p-4 animate-fadeInUp`}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-r ${themeStyles.accent} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <div className="relative text-center">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${themeStyles.accent} p-0.5 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="w-full h-full rounded-xl bg-black/80 flex items-center justify-center backdrop-blur-sm">
                    {copied ? (
                      <Check className="w-6 h-6 text-green-400" />
                    ) : (
                      <Copy className="w-6 h-6 text-white" />
                    )}
                  </div>
                </div>
                <h3 className={`text-white font-semibold mb-1 group-hover:${themeStyles.accent_text} transition-colors`}>
                  {copied ? 'Copied!' : 'Copy Link'}
                </h3>
                <p className="text-xs text-gray-400">
                  {copied ? 'Ready to share' : 'Share anywhere'}
                </p>
              </div>

              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-out" />
            </button>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className={`share-action-item share-action-2 group relative overflow-hidden rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 bg-gradient-to-r from-white/5 to-transparent backdrop-blur-sm hover:scale-105 hover:shadow-2xl p-4 animate-fadeInUp`}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-r ${themeStyles.accent} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <div className="relative text-center">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${themeStyles.accent} p-0.5 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="w-full h-full rounded-xl bg-black/80 flex items-center justify-center backdrop-blur-sm">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className={`text-white font-semibold mb-1 group-hover:${themeStyles.accent_text} transition-colors`}>
                  Quick Share
                </h3>
                <p className="text-xs text-gray-400">
                  Native sharing
                </p>
              </div>

              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-out" />
            </button>

            {/* QR Code Button */}
            <button
              onClick={handleQRCode}
              className={`share-action-item share-action-3 group relative overflow-hidden rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 bg-gradient-to-r from-white/5 to-transparent backdrop-blur-sm hover:scale-105 hover:shadow-2xl p-4 animate-fadeInUp`}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-r ${themeStyles.accent} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <div className="relative text-center">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${themeStyles.accent} p-0.5 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="w-full h-full rounded-xl bg-black/80 flex items-center justify-center backdrop-blur-sm">
                    <QrCode className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className={`text-white font-semibold mb-1 group-hover:${themeStyles.accent_text} transition-colors`}>
                  QR Code
                </h3>
                <p className="text-xs text-gray-400">
                  Scan to visit
                </p>
              </div>

              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-out" />
            </button>
          </div>

          {/* Profile URL Display */}
          <div className="mb-6">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-white/5 to-transparent backdrop-blur-sm p-4">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${themeStyles.accent} opacity-80 flex items-center justify-center flex-shrink-0`}>
                  <ExternalLink className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400 mb-1">Your profile URL</p>
                  <p className="text-sm text-white font-mono truncate">
                    {profileUrl}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Growth Encouragement */}
          <div className="text-center">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${themeStyles.accent} opacity-20 mb-2`}>
              <Users className="w-4 h-4 text-white" />
              <span className="text-sm text-white font-medium">
                Grow Your Community
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Share your profile to connect with more supporters<br />
              and build your community on DriplyPay
            </p>
          </div>
        </div>
      </div>
      
      {/* Floating Viral Elements */}
      <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl" />
      <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-gradient-to-r from-green-500/10 to-blue-500/10 blur-xl" />
    </div>
  )
}
