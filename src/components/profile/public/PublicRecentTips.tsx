/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Public Profile Features
 * Component: Enhanced recent tips and support messages display
 * Features: Community support, supporter recognition, animated tip cards
 */
'use client'

import { Heart, MessageCircle, Clock, Users } from 'lucide-react'
import './animations.css'

interface Tip {
  id: string
  amount: number
  message?: string
  supporter_name?: string
  created_at: string
  is_anonymous: boolean
}

interface PublicRecentTipsProps {
  tips: Tip[]
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

function formatCurrency(cents: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(cents / 100)
}

function formatTimeAgo(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
  
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`
  } else if (diffInMinutes < 1440) {
    return `${Math.floor(diffInMinutes / 60)}h ago`
  } else {
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }
}

export function PublicRecentTips({ tips, themeStyles }: PublicRecentTipsProps) {
  const displayTips = tips?.slice(0, 5) || []
  const totalSupporters = tips?.length || 0

  if (totalSupporters === 0) {
    return (
      <div className="relative w-full min-w-full" style={{ width: '100%' }}>
        {/* Enhanced Empty State Container - Redesigned for full width */}
        <div className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-xl ${themeStyles.card} p-6 sm:p-8`} style={{ width: '100%', minWidth: '100%', maxWidth: 'none' }}>
          {/* Gradient Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
          <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${themeStyles.accent} opacity-10 rounded-full blur-3xl`} />
          <div className={`absolute -bottom-20 -left-20 w-32 h-32 bg-gradient-to-tr ${themeStyles.accent} opacity-5 rounded-full blur-2xl`} />
          
          <div className="relative z-10" style={{ width: '100%' }}>
            {/* Header Section - Left aligned like other components */}
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${themeStyles.accent} p-0.5`}>
                <div className="w-full h-full rounded-2xl bg-black/80 flex items-center justify-center backdrop-blur-sm">
                  <Heart className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white">Recent Support</h2>
                <p className="text-gray-400 text-sm">Community appreciation and messages</p>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Users className="w-4 h-4" />
                <span className="text-sm">0 supporters</span>
              </div>
            </div>
            
            {/* Empty State Content - Expanded layout */}
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8" style={{ width: '100%' }}>
              {/* Left side - Call to action */}
              <div className="space-y-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${themeStyles.accent} opacity-20 flex items-center justify-center mb-4`}>
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Be the First!</h3>
                  <p className="text-gray-400 leading-relaxed">
                    No support messages yet. Be the first to show your appreciation and leave an encouraging message!
                  </p>
                </div>
              </div>
              
              {/* Right side - Support benefits */}
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${themeStyles.accent} opacity-30 flex items-center justify-center`}>
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-300 text-sm">Leave personal messages</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${themeStyles.accent} opacity-30 flex items-center justify-center`}>
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-300 text-sm">Show your support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${themeStyles.accent} opacity-30 flex items-center justify-center`}>
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-300 text-sm">Join the community</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bottom encouragement */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-center text-gray-400 text-sm">
                💝 Your support means everything • Every contribution makes a difference
              </p>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-gradient-to-r from-pink-500/10 to-red-500/10 blur-xl" />
        <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-xl" />
      </div>
    )
  }

  return (
    <div className="relative w-full min-w-full">
      {/* Enhanced Recent Tips Container */}
      <div className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-xl ${themeStyles.card} p-6 sm:p-8 w-full min-w-full flex-1`}>
        {/* Gradient Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
        <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${themeStyles.accent} opacity-10 rounded-full blur-3xl`} />
        <div className={`absolute -bottom-20 -left-20 w-32 h-32 bg-gradient-to-tr ${themeStyles.accent} opacity-5 rounded-full blur-2xl`} />
        
        <div className="relative z-10 w-full min-w-full">
          {/* Header Section */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${themeStyles.accent} p-0.5`}>
                <div className="w-full h-full rounded-2xl bg-black/80 flex items-center justify-center backdrop-blur-sm">
                  <Heart className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white">Recent Support</h2>
                <p className="text-sm text-gray-400">Community appreciation and messages</p>
              </div>
            </div>
          </div>

          {/* Tips List */}
          <div className="space-y-3">
            {displayTips.map((tip, index) => (
              <div
                key={tip.id}
                className={`tip-item group relative overflow-hidden rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 bg-gradient-to-r from-white/5 to-transparent backdrop-blur-sm hover:scale-[1.01] hover:shadow-2xl ${themeStyles.card} animate-fadeInUp`}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-r ${themeStyles.accent} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <div className="relative p-4">
                  <div className="flex items-start gap-4">
                    {/* Supporter Avatar */}
                    <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-r ${themeStyles.accent} p-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <div className="w-full h-full rounded-xl bg-black/80 flex items-center justify-center backdrop-blur-sm">
                        <span className="text-white text-sm font-bold">
                          {tip.is_anonymous ? '?' : (tip.supporter_name ? tip.supporter_name[0].toUpperCase() : 'A')}
                        </span>
                      </div>
                      {/* Support indicator */}
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center">
                        <Heart className="w-2 h-2 text-white" />
                      </div>
                    </div>
                    
                    {/* Tip Content */}
                    <div className="flex-1 min-w-0">
                      {/* Supporter Info & Amount */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`text-white font-semibold group-hover:${themeStyles.accent_text} transition-colors`}>
                            {tip.is_anonymous ? 'Anonymous' : (tip.supporter_name || 'Anonymous')}
                          </span>
                          {!tip.is_anonymous && (
                            <div className={`px-2 py-0.5 rounded-full bg-gradient-to-r ${themeStyles.accent} opacity-80 text-xs text-white font-medium`}>
                              Supporter
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-bold bg-gradient-to-r ${themeStyles.accent} bg-clip-text text-transparent`}>
                            {formatCurrency(tip.amount)}
                          </span>
                          <div className="flex items-center gap-1 text-gray-400">
                            <Clock className="w-3 h-3" />
                            <span className="text-xs">
                              {formatTimeAgo(tip.created_at)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Message */}
                      {tip.message && (
                        <div className="mt-2">
                          <div className="flex items-start gap-2">
                            <MessageCircle className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-gray-300 leading-relaxed line-clamp-2">
                              &ldquo;{tip.message}&rdquo;
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-out" />
              </div>
            ))}
          </div>

          {/* More Supporters Indicator */}
          {totalSupporters > 5 && (
            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="flex items-center justify-center gap-2 text-gray-400">
                <Users className="w-4 h-4" />
                <span className="text-sm">
                  and {totalSupporters - 5} more amazing supporters
                </span>
              </div>
            </div>
          )}

          {/* Community Stats */}
          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="flex items-center justify-center gap-2 text-gray-400">
              <Heart className="w-4 h-4" />
              <span className="text-sm">
                {totalSupporters} supporter{totalSupporters !== 1 ? 's' : ''} showing love
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Support Elements */}
      <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-gradient-to-r from-pink-500/10 to-red-500/10 blur-xl" />
      <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-xl" />
    </div>
  )
}
