/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Authentication Features
 * Page: Username selection during onboarding
 * Features: Custom username selection, availability checking, profile setup
 */
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import { Check, X, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '@/lib/supabase'
import { GlassCard, GradientText } from '@/components/design-system'

export default function SetupProfilePage() {
  const { user, profile, refreshProfile } = useAuth()
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push('/signup')
      return
    }

    // If user already has a complete profile, redirect to dashboard
    if (profile && profile.username && !profile.username.startsWith('user_')) {
      router.push('/dashboard')
      return
    }

    // Pre-fill with email username or metadata
    if (user.email && !username) {
      const emailUsername = user.email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '')
      setUsername(emailUsername)
    }

    if (user.user_metadata?.full_name && !displayName) {
      setDisplayName(user.user_metadata.full_name)
    }
  }, [user, profile, router, username, displayName])

  // Check username availability with debouncing
  useEffect(() => {
    if (!username || username.length < 3) {
      setUsernameAvailable(null)
      return
    }

    const timeoutId = setTimeout(async () => {
      setIsCheckingUsername(true)
      try {
        const response = await fetch(`/api/profile/username-check?username=${username}`)
        const data = await response.json()
        setUsernameAvailable(data.available)
      } catch (error) {
        console.error('Username check error:', error)
        setUsernameAvailable(null)
      } finally {
        setIsCheckingUsername(false)
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [username])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!username || username.length < 3) {
      toast.error('Username must be at least 3 characters long')
      return
    }

    if (!usernameAvailable) {
      toast.error('Please choose an available username')
      return
    }

    if (!displayName.trim()) {
      toast.error('Please enter a display name')
      return
    }

    setIsSubmitting(true)

    try {
      // Update existing profile or create new one
      const profileData = {
        username: username.toLowerCase(),
        display_name: displayName.trim(),
        bio: bio.trim() || null,
        user_id: user!.id
      }

      let response
      if (profile) {
        // Update existing profile
        response = await fetch('/api/profile', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profileData)
        })
      } else {
        // Create new profile
        response = await fetch('/api/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profileData)
        })
      }

      if (!response.ok) {
        throw new Error('Failed to save profile')
      }

      await refreshProfile()
      toast.success('Profile created successfully! Let\'s complete your setup 🎉')
      router.push('/profile-editor')
      
    } catch (error) {
      console.error('Profile setup error:', error)
      toast.error('Failed to create profile. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getUsernameStatus = () => {
    if (!username || username.length < 3) {
      return { icon: null, color: 'text-gray-400', message: 'Username must be at least 3 characters' }
    }
    if (isCheckingUsername) {
      return { icon: <Loader2 className="w-4 h-4 animate-spin" />, color: 'text-gray-400', message: 'Checking availability...' }
    }
    if (usernameAvailable === true) {
      return { icon: <Check className="w-4 h-4" />, color: 'text-green-400', message: 'Username available!' }
    }
    if (usernameAvailable === false) {
      return { icon: <X className="w-4 h-4" />, color: 'text-red-400', message: 'Username taken' }
    }
    return { icon: null, color: 'text-gray-400', message: '' }
  }

  const status = getUsernameStatus()

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 driplypay-font-primary">
      <div className="w-full max-w-md">
        <GlassCard variant="primary">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">
              <GradientText>Setup Your Profile</GradientText>
            </h1>
            <p className="text-gray-300">
              Choose your username and customize your profile
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Choose Your Username *
              </label>
              <div className="relative">
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-700 bg-gray-800 text-gray-400 text-sm">
                    driplypay.com/
                  </span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                    className="flex-1 px-3 py-3 bg-gray-800 border border-gray-700 rounded-r-lg text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
                    placeholder="your-username"
                    maxLength={30}
                    required
                  />
                </div>
                <div className={`flex items-center gap-2 mt-2 text-sm ${status.color}`}>
                  {status.icon}
                  {status.message}
                </div>
              </div>
            </div>

            {/* Display Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Display Name *
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
                placeholder="How you want to be known"
                maxLength={50}
                required
              />
            </div>

            {/* Bio Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Bio (Optional)
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none resize-none"
                placeholder="Tell supporters about yourself..."
                rows={3}
                maxLength={200}
              />
              <div className="text-xs text-gray-400 mt-1">
                {bio.length}/200 characters
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !usernameAvailable || !username || !displayName.trim()}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating Profile...' : 'Create My Profile'}
            </button>
          </form>

          {/* Preview */}
          {username && usernameAvailable && (
            <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
              <p className="text-xs text-gray-400 mb-2">Your profile will be available at:</p>
              <code className="text-blue-400 text-sm">
                driplypay.com/{username}
              </code>
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  )
}
