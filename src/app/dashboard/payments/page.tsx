/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Payment System Features
 * Page: Payment management dashboard with earnings overview and Stripe integration
 * Features: Earnings stats, transaction history, payout management, Stripe Connect
 */
'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { GlassCard, PrimaryButton } from '@/components/design-system'
import { LivePreviewToggle, LivePreviewModal } from '@/components/live-preview'
import { useLivePreview } from '@/lib/live-preview'
import { useAuth } from '@/lib/auth'
import { Eye, DollarSign, TrendingUp, Users, Calendar, ExternalLink, CreditCard, Settings, Download, Smartphone, Monitor } from 'lucide-react'
import Link from 'next/link'

export default function PaymentsPage() {
  const { setPreviewMode } = useLivePreview()
  const [previewViewMode, setPreviewViewMode] = useState<'mobile' | 'desktop'>('mobile')
  const { profile } = useAuth()
  
  // Mock data for payments overview
  const stats = {
    totalEarnings: 2847.50,
    thisMonth: 425.30,
    totalTips: 156,
    avgTip: 18.25
  }

  const recentTips = [
    { id: 1, amount: 25.00, supporter: 'Anonymous', message: 'Love your content!', date: '2 hours ago' },
    { id: 2, amount: 10.00, supporter: 'Sarah M.', message: 'Keep up the great work! 🎉', date: '5 hours ago' },
    { id: 3, amount: 50.00, supporter: 'Mike_Creator', message: 'Thanks for the inspiration', date: '1 day ago' },
    { id: 4, amount: 15.00, supporter: 'Anonymous', message: '', date: '2 days ago' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Payments & Earnings</h1>
          <p className="text-gray-400">Track your tips, manage payouts, and view analytics</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Total Earnings</p>
                <p className="text-2xl font-bold text-white">${stats.totalEarnings.toFixed(2)}</p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">This Month</p>
                <p className="text-2xl font-bold text-white">${stats.thisMonth.toFixed(2)}</p>
              </div>
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Total Tips</p>
                <p className="text-2xl font-bold text-white">{stats.totalTips}</p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Avg. Tip</p>
                <p className="text-2xl font-bold text-white">${stats.avgTip.toFixed(2)}</p>
              </div>
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <Calendar className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Payment Methods</h3>
            <p className="text-gray-400 mb-4">Manage how you receive payouts</p>
            <PrimaryButton className="w-full">
              <CreditCard className="w-4 h-4 mr-2" />
              Manage Payment Methods
            </PrimaryButton>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Payout Settings</h3>
            <p className="text-gray-400 mb-4">Configure automatic payouts</p>
            <Button variant="secondary" className="w-full">
              <Settings className="w-4 h-4 mr-2" />
              Payout Settings
            </Button>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Tax Documents</h3>
            <p className="text-gray-400 mb-4">Download your earnings reports</p>
            <Button variant="secondary" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Download Reports
            </Button>
          </GlassCard>
        </div>

        {/* Recent Tips */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Recent Tips</h3>
            <Button variant="secondary">View All</Button>
          </div>

          <div className="space-y-4">
            {recentTips.map((tip) => (
              <div key={tip.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-medium text-white">${tip.amount.toFixed(2)}</span>
                    <span className="text-gray-400">from {tip.supporter}</span>
                    <span className="text-sm text-gray-500">{tip.date}</span>
                  </div>
                  {tip.message && (
                    <p className="text-sm text-gray-300 italic">&ldquo;{tip.message}&rdquo;</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Profile Preview */}
        <div className="mt-8">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">Live Profile Preview</h3>
                <p className="text-gray-400">Real-time preview of how your profile looks to supporters</p>
              </div>
              <div className="flex items-center gap-2">
                {/* Mobile/Desktop Toggle */}
                <div className="flex items-center gap-1 bg-gray-800 rounded-lg p-1">
                  <button
                    onClick={() => setPreviewViewMode('mobile')}
                    className={`p-2 rounded-md transition-colors ${
                      previewViewMode === 'mobile' 
                        ? 'bg-purple-500 text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                    title="Mobile View"
                  >
                    <Smartphone className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setPreviewViewMode('desktop')}
                    className={`p-2 rounded-md transition-colors ${
                      previewViewMode === 'desktop' 
                        ? 'bg-purple-500 text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                    title="Desktop View"
                  >
                    <Monitor className="w-4 h-4" />
                  </button>
                </div>
                <Link href={profile?.username ? `/${profile.username}` : '/profile-editor'} target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open Full Profile
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Embedded Live Preview */}
            <div className="bg-gray-800/30 rounded-lg border border-gray-700 overflow-hidden">
              <div className="bg-gray-700 px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-sm text-gray-400">
                  {process.env.NODE_ENV === 'development' ? 'localhost:3001' : 'driplyplay.com'}/{profile?.username || 'your-username'}
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs text-gray-500 capitalize">{previewViewMode} View</div>
                  <div className="text-xs text-gray-500">Live Preview</div>
                </div>
              </div>
              <div className="relative bg-gray-600 p-4">
                <div className={`mx-auto bg-white rounded-lg overflow-hidden shadow-2xl transition-all duration-300 ${
                  previewViewMode === 'mobile' ? 'max-w-sm' : 'max-w-full'
                }`}>
                  <iframe
                    src="/preview-profile?embed=true"
                    className="w-full h-96 border-0"
                    title="Live Profile Preview"
                    sandbox="allow-scripts allow-same-origin"
                  />
                </div>
                <div className="absolute top-6 right-6 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  LIVE
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Live Preview Components */}
      <LivePreviewToggle />
      <LivePreviewModal />
    </div>
  )
}
