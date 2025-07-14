/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Authentication Features
 * Page: Find your profile URL if you're logged in
 * Features: Profile URL discovery, quick access
 */
'use client'

import { useAuth } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { ExternalLink, Copy } from 'lucide-react'
import toast from 'react-hot-toast'
import { GlassCard, GradientText } from '@/components/design-system'

export default function FindProfilePage() {
  const { user, profile, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signup')
    }
  }, [user, loading, router])

  const handleCopyUrl = () => {
    if (profile?.username) {
      navigator.clipboard.writeText(`http://localhost:3001/${profile.username}`)
      toast.success('Profile URL copied to clipboard!')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center driplypay-font-primary">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your profile...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to signup
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 driplypay-font-primary">
      <div className="w-full max-w-2xl">
        <GlassCard variant="primary">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">
              <GradientText>Your Profile is Ready!</GradientText>
            </h1>
            <p className="text-gray-300">
              Your DriplyPay profile has been created and is live.
            </p>
          </div>

          {profile ? (
            <div className="space-y-6">
              {/* Profile Info */}
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      {profile.display_name}
                    </h2>
                    <p className="text-gray-400">@{profile.username}</p>
                  </div>
                </div>

                {/* Profile URL */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-300">
                    Your Profile URL
                  </label>
                  <div className="flex items-center gap-2 p-3 bg-gray-900 rounded-lg">
                    <code className="flex-1 text-blue-400 text-sm">
                      http://localhost:3001/{profile.username}
                    </code>
                    <button
                      onClick={handleCopyUrl}
                      className="p-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                      title="Copy URL"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <Link
                      href={`/${profile.username}`}
                      target="_blank"
                      className="p-2 bg-purple-600 hover:bg-purple-700 rounded transition-colors"
                      title="View Profile"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/dashboard/profile"
                  className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-center hover:opacity-90 transition-opacity"
                >
                  <h3 className="font-semibold mb-1">Edit Profile</h3>
                  <p className="text-sm text-blue-100">
                    Add bio, social links, and payment methods
                  </p>
                </Link>
                
                <Link
                  href={`/${profile.username}`}
                  target="_blank"
                  className="p-4 border border-gray-600 rounded-lg text-center hover:border-gray-500 transition-colors"
                >
                  <h3 className="font-semibold mb-1">View Public Profile</h3>
                  <p className="text-sm text-gray-400">
                    See how others see your profile
                  </p>
                </Link>
              </div>

              {/* Status */}
              <div className="text-center py-4">
                <p className="text-sm text-gray-400">
                  Logged in as <strong className="text-white">{user.email}</strong>
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-4">
                Setting up your profile...
              </p>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto"></div>
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  )
}
