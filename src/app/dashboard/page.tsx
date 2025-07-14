'use client'

import { User, CreditCard, QrCode, BarChart3, LogOut } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { GlassCard, GradientText, PrimaryButton, Section } from '@/components/design-system'

export default function DashboardPage() {
  const { user, profile, loading, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin')
    }
    
    // Redirect to profile setup if user doesn't have a complete profile
    if (!loading && user && (!profile || !profile.username || profile.username.startsWith('user_'))) {
      router.push('/setup-profile')
    }
  }, [user, profile, loading, router])

  const handleSignOut = async () => {
    try {
      await signOut()
      toast.success('Signed out successfully')
      router.push('/')
    } catch (error) {
      toast.error('Error signing out')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center driplypay-font-primary">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-black text-white driplypay-font-primary">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome back{profile?.username ? `, ${profile.username}` : ''}! 👋
            </h1>
            <p className="text-gray-300">
              Manage your payment profile and track your earnings
            </p>
          </div>
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:text-white hover:border-gray-500 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        {/* User Info & Profile URL */}
        {user && profile && (
          <div className="mb-6 p-6 glass-secondary rounded-lg">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="text-sm text-gray-300 mb-2">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="text-sm text-gray-300 mb-2">
                  <strong>User ID:</strong> <code className="text-xs bg-gray-800 px-1 rounded">{user.id}</code>
                </p>
                <p className="text-sm text-gray-300 mb-2">
                  <strong>Profile ID:</strong> <code className="text-xs bg-gray-800 px-1 rounded">{profile.id}</code>
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-300">
                    <strong>Your Profile URL:</strong>
                  </span>
                  <code className="px-3 py-1 bg-gray-800 rounded text-blue-400 text-sm">
                    localhost:3001/{profile.username}
                  </code>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`http://localhost:3001/${profile.username}`)
                      toast.success('Profile URL copied!')
                    }}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white text-xs transition-colors"
                  >
                    Copy
                  </button>
                  <Link
                    href={`/${profile.username}`}
                    target="_blank"
                    className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-white text-xs transition-colors"
                    onClick={(e) => {
                      // Debug info
                      console.log('Profile data:', profile)
                      console.log('Navigating to:', `/${profile.username}`)
                    }}
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <GlassCard variant="secondary">
            <div className="flex flex-row items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-300">Profile Views</h3>
              <BarChart3 className="h-4 w-4 text-gray-400" />
            </div>
            <div className="text-2xl font-bold gradient-text-primary">0</div>
            <p className="text-xs text-gray-400">No views yet</p>
          </GlassCard>

          <GlassCard variant="secondary">
            <div className="flex flex-row items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-300">Tips Received</h3>
              <CreditCard className="h-4 w-4 text-gray-400" />
            </div>
            <div className="text-2xl font-bold gradient-text-primary">$0</div>
            <p className="text-xs text-gray-400">Connect Stripe to start</p>
          </GlassCard>

          <GlassCard variant="secondary">
            <div className="flex flex-row items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-300">QR Scans</h3>
              <QrCode className="h-4 w-4 text-gray-400" />
            </div>
            <div className="text-2xl font-bold gradient-text-primary">0</div>
            <p className="text-xs text-gray-400">Generate QR codes</p>
          </GlassCard>

          <GlassCard variant="secondary">
            <div className="flex flex-row items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-300">Payment Methods</h3>
              <User className="h-4 w-4 text-gray-400" />
            </div>
            <div className="text-2xl font-bold gradient-text-primary">0</div>
            <p className="text-xs text-gray-400">Add your first link</p>
          </GlassCard>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <GlassCard variant="primary">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <User className="h-5 w-5" />
                Profile Setup
              </h3>
              <p className="text-gray-300">
                Complete your profile to start accepting payments
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Username</span>
                <span className={`text-sm ${profile?.username ? 'text-green-400' : 'text-red-400'}`}>
                  {profile?.username ? 'Complete' : 'Required'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Bio</span>
                <span className={`text-sm ${profile?.bio ? 'text-green-400' : 'text-yellow-400'}`}>
                  {profile?.bio ? 'Complete' : 'Optional'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Avatar</span>
                <span className={`text-sm ${profile?.avatar_url ? 'text-green-400' : 'text-yellow-400'}`}>
                  {profile?.avatar_url ? 'Complete' : 'Optional'}
                </span>
              </div>
            </div>

            <Link 
              href="/dashboard/profile"
              className="btn-primary w-full inline-block text-center"
            >
              {profile?.username ? 'Edit Profile' : 'Complete Profile'}
            </Link>
          </GlassCard>

          <GlassCard variant="primary">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <CreditCard className="h-5 w-5" />
                Payment Methods
              </h3>
              <p className="text-gray-300">
                Add your payment links (CashApp, PayPal, etc.)
              </p>
            </div>

            <p className="text-sm text-gray-400 mb-6">
              Add payment methods to start receiving money from supporters
            </p>

            <Link 
              href="/dashboard/payments"
              className="btn-primary w-full inline-block text-center"
            >
              Add Payment Method
            </Link>
          </GlassCard>

          <GlassCard variant="primary">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <QrCode className="h-5 w-5" />
                QR Codes
              </h3>
              <p className="text-gray-300">
                Generate QR codes for in-person tips
              </p>
            </div>

            <p className="text-sm text-gray-400 mb-6">
              Create QR codes to accept tips in real life
            </p>

            <Link 
              href="/dashboard/qr"
              className="w-full inline-block text-center px-6 py-3 border border-gray-600 rounded-lg text-gray-300 hover:text-white hover:border-gray-500 transition-colors"
            >
              Generate QR
            </Link>
          </GlassCard>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <GlassCard variant="primary">
            <h3 className="text-xl font-bold text-white mb-2">Recent Activity</h3>
            <p className="text-gray-300 mb-6">Your latest profile activity</p>

            <div className="text-center py-8 text-gray-400">
              <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="mb-2">No activity yet</p>
              <p className="text-sm">Complete your profile setup to start tracking activity</p>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
