/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Profile Editor Features
 * Purpose: Live preview system for real-time profile changes
 * Features: Preview context, real-time updates, section reordering
 */
'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { PublicProfile } from '@/types'

interface LivePreviewContextType {
  previewMode: boolean
  profileData: Partial<PublicProfile>
  sectionOrder: string[]
  setPreviewMode: (enabled: boolean) => void
  updateProfileData: (updates: Partial<PublicProfile>) => void
  updateSectionOrder: (order: string[]) => void
  resetPreview: () => void
}

const LivePreviewContext = createContext<LivePreviewContextType | undefined>(undefined)

// Mock default profile data
const defaultProfileData: Partial<PublicProfile> = {
  username: 'preview-user',
  displayName: 'Your Name',
  bio: 'Add your bio here to tell supporters about yourself and what you create.',
  avatar_url: undefined,
  bannerImage: undefined,
  theme: 'default',
  location: '',
  paymentMethods: [
    { type: 'stripe', enabled: true, name: 'Card Payments' },
    { type: 'cashapp', enabled: false, name: 'CashApp', handle: '' },
    { type: 'venmo', enabled: false, name: 'Venmo', handle: '' },
    { type: 'paypal', enabled: false, name: 'PayPal' }
  ],
  tipAmounts: [5, 10, 25, 50, 100],
  customTipEnabled: true,
  socialLinks: [
    { platform: 'instagram', url: '', enabled: false },
    { platform: 'twitter', url: '', enabled: false },
    { platform: 'youtube', url: '', enabled: false },
    { platform: 'tiktok', url: '', enabled: false }
  ],
  goals: [],
}

export function LivePreviewProvider({ children }: { children: React.ReactNode }) {
  const [previewMode, setPreviewMode] = useState(false)
  const [profileData, setProfileData] = useState<Partial<PublicProfile>>(defaultProfileData)
  const [sectionOrder, setSectionOrder] = useState(['social-links', 'payment-methods', 'goals'])

  const updateProfileData = (updates: Partial<PublicProfile>) => {
    setProfileData(prev => ({
      ...prev,
      ...updates,
      // Handle nested objects properly
      paymentMethods: updates.paymentMethods || prev.paymentMethods,
      socialLinks: updates.socialLinks || prev.socialLinks,
      goals: updates.goals || prev.goals,
    }))
  }

  const updateSectionOrder = (order: string[]) => {
    setSectionOrder(order)
  }

  const resetPreview = () => {
    setProfileData(defaultProfileData)
    setSectionOrder(['social-links', 'payment-methods', 'goals'])
  }

  // Sync with localStorage for persistence
  useEffect(() => {
    const saved = localStorage.getItem('driplypay-preview-data')
    const savedOrder = localStorage.getItem('driplypay-section-order')
    
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setProfileData(prev => ({ ...prev, ...parsed }))
      } catch (error) {
        console.warn('Failed to load preview data from localStorage')
      }
    }
    
    if (savedOrder) {
      try {
        const parsedOrder = JSON.parse(savedOrder)
        setSectionOrder(parsedOrder)
      } catch (error) {
        console.warn('Failed to load section order from localStorage')
      }
    }
  }, [])

  // Always save to localStorage when data changes (not just in preview mode)
  useEffect(() => {
    localStorage.setItem('driplypay-preview-data', JSON.stringify(profileData))
  }, [profileData])

  // Save section order to localStorage
  useEffect(() => {
    localStorage.setItem('driplypay-section-order', JSON.stringify(sectionOrder))
  }, [sectionOrder])

  return (
    <LivePreviewContext.Provider
      value={{
        previewMode,
        profileData,
        sectionOrder,
        setPreviewMode,
        updateProfileData,
        updateSectionOrder,
        resetPreview,
      }}
    >
      {children}
    </LivePreviewContext.Provider>
  )
}

export function useLivePreview() {
  const context = useContext(LivePreviewContext)
  if (context === undefined) {
    throw new Error('useLivePreview must be used within a LivePreviewProvider')
  }
  return context
}

// Hook for components that need to react to profile changes
export function useProfileData() {
  const { profileData, previewMode, sectionOrder } = useLivePreview()
  return { profileData, isPreview: previewMode, sectionOrder }
}
