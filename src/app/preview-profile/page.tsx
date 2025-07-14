/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Profile Editor Features
 * Page: Live preview system for profile changes
 * Features: Real-time profile preview, theme switching, section reordering
 */
'use client'

import { useSearchParams } from 'next/navigation'
import { useProfileData } from '@/lib/live-preview'
import { 
  GradientText, 
  GlassCard, 
  PrimaryButton 
} from '@/components/design-system'
import { 
  Heart, 
  DollarSign, 
  Share2, 
  QrCode, 
  ExternalLink,
  MapPin,
  Calendar,
  Users,
  Verified
} from 'lucide-react'

export default function PreviewProfilePage() {
  const searchParams = useSearchParams()
  const isEmbedded = searchParams.get('embed') === 'true'
  const { profileData, sectionOrder } = useProfileData()

  // Use preview data or fallback to defaults
  const profile = {
    username: profileData.username || 'preview-user',
    displayName: profileData.displayName || 'Your Name',
    bio: profileData.bio || 'Add your bio here to tell supporters about yourself and what you create.',
    avatar_url: profileData.avatar_url,
    bannerImage: profileData.bannerImage,
    isVerified: profileData.isVerified || false,
    theme: profileData.theme || 'clean',
    location: profileData.location || '',
    joinedDate: new Date().toISOString(),
    followersCount: 0,
    paymentMethods: profileData.paymentMethods || [],
    tipAmounts: profileData.tipAmounts || [5, 10, 25, 50, 100],
    customTipEnabled: profileData.customTipEnabled ?? true,
    socialLinks: profileData.socialLinks || [],
    goals: profileData.goals || [],
    recentSupports: []
  }

  // Theme-based styling
  const getThemeStyles = (theme: string) => {
    switch (theme) {
      case 'neon':
        return {
          background: 'from-pink-900 via-purple-900 to-indigo-900',
          accent: 'from-pink-400 to-purple-400',
          card: 'bg-purple-900/20 border-purple-500/30'
        }
      case 'luxe':
        return {
          background: 'from-yellow-900 via-orange-900 to-red-900',
          accent: 'from-yellow-400 to-orange-400',
          card: 'bg-orange-900/20 border-orange-500/30'
        }
      default: // clean
        return {
          background: 'from-gray-900 via-gray-800 to-gray-900',
          accent: 'from-blue-400 to-purple-400',
          card: 'bg-gray-900/50 border-gray-700'
        }
    }
  }

  const themeStyles = getThemeStyles(profile.theme)

  // Render section content based on type
  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'social-links':
        return profile.socialLinks.filter(link => link.enabled).length > 0 && (
          <GlassCard key="social-links" className={themeStyles.card}>
            <h2 className="text-lg font-semibold text-white mb-3">Connect</h2>
            <div className="space-y-2">
              {profile.socialLinks.filter(link => link.enabled).map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2 rounded-lg bg-gray-800/30 hover:bg-gray-700/50 transition-colors text-gray-300"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="capitalize">{link.platform}</span>
                </a>
              ))}
            </div>
          </GlassCard>
        )
        
      case 'payment-methods':
        return profile.paymentMethods.filter(method => method.enabled).length > 0 && (
          <GlassCard key="payment-methods" className={themeStyles.card}>
            <h2 className="text-lg font-semibold text-white mb-3">Payment Methods</h2>
            <div className="space-y-2">
              {profile.paymentMethods.filter(method => method.enabled).map((method) => (
                <div
                  key={method.type}
                  className="flex items-center gap-3 p-2 rounded-lg bg-gray-800/30 text-gray-300"
                >
                  <DollarSign className="w-4 h-4" />
                  <span>{method.name}</span>
                  {method.handle && <span className="text-gray-500">({method.handle})</span>}
                </div>
              ))}
            </div>
          </GlassCard>
        )
        
      case 'goals':
        return profile.goals.filter(goal => goal.is_active).map((goal) => (
          <GlassCard key={goal.id} className={themeStyles.card}>
            <h2 className="text-lg font-semibold text-white mb-3">Current Goal</h2>
            <h3 className="font-medium text-white mb-2">{goal.title}</h3>
            <p className="text-gray-400 text-sm mb-4">{goal.description}</p>
            
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Progress</span>
                <span className="text-white">${goal.current_amount / 100} / ${goal.target_amount / 100}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full bg-gradient-to-r ${themeStyles.accent}`}
                  style={{ width: `${(goal.current_amount / goal.target_amount) * 100}%` }}
                />
              </div>
            </div>
            
            <p className="text-xs text-gray-500">
              {Math.round((goal.current_amount / goal.target_amount) * 100)}% complete
            </p>
          </GlassCard>
        ))
        
      default:
        return null
    }
  }

  // If embedded, render without the normal page wrapper to avoid header/footer
  if (isEmbedded) {
    return (
      <div className="fixed inset-0 overflow-auto">
        <style jsx global>{`
          body { margin: 0 !important; padding: 0 !important; }
          #__next { margin: 0 !important; padding: 0 !important; }
          nav, footer { display: none !important; }
          main { padding: 0 !important; margin: 0 !important; }
        `}</style>
        <div className={`min-h-screen bg-gradient-to-br ${themeStyles.background}`}>
          {/* Banner Section */}
          <div className="relative h-48 md:h-64 bg-gradient-to-r from-gray-800 to-gray-700 overflow-hidden">
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="max-w-4xl mx-auto flex items-end gap-6">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 p-1">
                    <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                      {profile.avatar_url ? (
                        <div className="w-full h-full bg-gray-600 rounded-full flex items-center justify-center text-gray-400 text-lg font-semibold">
                          {profile.displayName.charAt(0).toUpperCase()}
                        </div>
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${themeStyles.accent} rounded-full flex items-center justify-center text-white text-lg font-bold`}>
                          {profile.displayName.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                  </div>
                  {profile.isVerified && (
                    <div className={`absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-r ${themeStyles.accent} rounded-full flex items-center justify-center border-2 border-gray-800`}>
                      <Verified className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
                
                {/* Profile Info */}
                <div className="flex-1 text-white">
                  <h1 className="text-2xl md:text-3xl font-bold mb-1">{profile.displayName}</h1>
                  <p className="text-gray-300 mb-2">@{profile.username}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    {profile.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {profile.location}
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Joined {new Date(profile.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      0 followers
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto p-6 -mt-16 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Bio & Social */}
              <div className="space-y-6">
                {/* Bio */}
                <GlassCard className={themeStyles.card}>
                  <h2 className="text-lg font-semibold text-white mb-3">About</h2>
                  <p className="text-gray-300 leading-relaxed">{profile.bio}</p>
                </GlassCard>

                {/* Social Links */}
                {profile.socialLinks && profile.socialLinks.some(link => link.enabled) && (
                  <GlassCard className={themeStyles.card}>
                    <h2 className="text-lg font-semibold text-white mb-4">Connect</h2>
                    <div className="space-y-3">
                      {profile.socialLinks.filter(link => link.enabled).map((link) => (
                        <a
                          key={link.platform}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/30 hover:bg-gray-700/50 transition-colors"
                        >
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${themeStyles.accent} flex items-center justify-center`}>
                            <ExternalLink className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="text-white font-medium capitalize">{link.platform}</div>
                            <div className="text-gray-400 text-sm">Follow me</div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </GlassCard>
                )}
              </div>

              {/* Right Column - Support */}
              <div className="lg:col-span-2 space-y-6">
                {/* Support Card */}
                <GlassCard className={themeStyles.card}>
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      <GradientText>Support {profile.displayName}</GradientText>
                    </h2>
                    <p className="text-gray-300">Show your appreciation with a tip</p>
                  </div>

                  {/* Tip Amounts */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-400 mb-3">Choose an Amount</h3>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {profile.tipAmounts.map((amount) => (
                        <button
                          key={amount}
                          className={`p-4 rounded-lg border-2 border-gray-700 hover:border-purple-400 bg-gray-800/30 text-white font-semibold transition-colors hover:bg-gray-700/50`}
                        >
                          ${amount}
                        </button>
                      ))}
                    </div>
                    {profile.customTipEnabled && (
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                        <input
                          type="number"
                          placeholder="Custom amount"
                          className="w-full pl-8 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none"
                        />
                      </div>
                    )}
                  </div>

                  {/* Payment Methods */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-400 mb-3">Payment Method</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {profile.paymentMethods.filter(method => method.enabled).map((method) => (
                        <button
                          key={method.type}
                          className="flex items-center gap-3 p-4 rounded-lg border-2 border-gray-700 hover:border-purple-400 bg-gray-800/30 text-left transition-colors hover:bg-gray-700/50"
                        >
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${themeStyles.accent} flex items-center justify-center`}>
                            <DollarSign className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="text-white font-medium">{method.name}</div>
                            {method.handle && (
                              <div className="text-gray-400 text-sm">{method.handle}</div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-400 mb-3">Add a Message (Optional)</h3>
                    <textarea
                      placeholder="Say something nice..."
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none resize-none"
                      rows={3}
                    />
                  </div>

                  {/* Support Button */}
                  <PrimaryButton className="w-full text-lg py-4">
                    <Heart className="w-5 h-5 mr-2" />
                    Send Support
                  </PrimaryButton>
                </GlassCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${themeStyles.background}`}>
      {/* Preview Banner */}
      <div className="bg-purple-600 text-white p-3 text-center text-sm font-medium">
        🔮 Live Preview Mode - Changes update in real-time
      </div>

      {/* Banner Section */}
      <div className="relative h-48 md:h-64 bg-gradient-to-r from-gray-800 to-gray-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="max-w-4xl mx-auto flex items-end gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 p-1">
                <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                  {profile.avatar_url ? (
                    <div className="w-full h-full bg-gray-600 rounded-full flex items-center justify-center text-gray-400 text-lg font-semibold">
                      {profile.displayName.charAt(0).toUpperCase()}
                    </div>
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${themeStyles.accent} rounded-full flex items-center justify-center text-white text-lg font-bold`}>
                      {profile.displayName.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              </div>
              {profile.isVerified && (
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Verified className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
            
            {/* Profile Info */}
            <div className="flex-1 text-white">
              <h1 className="text-2xl md:text-3xl font-bold mb-1">{profile.displayName}</h1>
              <p className="text-gray-300 mb-2">@{profile.username}</p>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                {profile.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {profile.location}
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Joined {new Date(profile.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {profile.followersCount.toLocaleString()} followers
                </div>
              </div>
            </div>

            {/* Share Button */}
            <div className="flex gap-2">
              <button className="glass-secondary p-3 rounded-lg text-white hover:bg-gray-700 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="glass-secondary p-3 rounded-lg text-white hover:bg-gray-700 transition-colors">
                <QrCode className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6 -mt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Bio & Dynamic Sections */}
          <div className="space-y-6">
            {/* Bio */}
            <GlassCard className={themeStyles.card}>
              <h2 className="text-lg font-semibold text-white mb-3">About</h2>
              <p className="text-gray-300 leading-relaxed">{profile.bio}</p>
            </GlassCard>

            {/* Dynamic Sections based on section order */}
            {sectionOrder.map((sectionId) => renderSection(sectionId)).filter(Boolean)}
          </div>

          {/* Right Column - Payment Options */}
          <div className="lg:col-span-2 space-y-6">
            {/* Support Options */}
            <GlassCard className={themeStyles.card}>
              <h2 className="text-xl font-semibold text-white mb-6">
                Support <GradientText>{profile.displayName}</GradientText>
              </h2>

              {/* Quick Tip Amounts */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-400 mb-3">Quick Support</h3>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                  {profile.tipAmounts.map((amount) => (
                    <button
                      key={amount}
                      className={`p-3 rounded-lg border ${themeStyles.card} hover:border-purple-400 transition-colors text-white font-medium cursor-not-allowed opacity-75`}
                      disabled
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
              {profile.customTipEnabled && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-400 mb-3">Custom Amount</h3>
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="number"
                        placeholder="Enter amount"
                        className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 cursor-not-allowed opacity-75"
                        disabled
                      />
                    </div>
                    <button 
                      className="px-6 py-3 bg-gray-600 text-gray-300 rounded-lg cursor-not-allowed opacity-75"
                      disabled
                    >
                      Support
                    </button>
                  </div>
                </div>
              )}

              {/* Payment Methods */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-400 mb-3">Payment Methods</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {profile.paymentMethods.filter(method => method.enabled).length > 0 ? (
                    profile.paymentMethods.filter(method => method.enabled).map((method) => (
                      <div
                        key={method.type}
                        className={`p-4 rounded-lg border ${themeStyles.card} opacity-75`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${themeStyles.accent} flex items-center justify-center`}>
                            <DollarSign className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="text-white font-medium">{method.name}</div>
                            {method.handle && (
                              <div className="text-gray-400 text-sm">{method.handle}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-8 text-gray-500">
                      No payment methods configured yet
                    </div>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-400 mb-3">Add a Message (Optional)</h3>
                <textarea
                  placeholder="Say something nice..."
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 resize-none cursor-not-allowed opacity-75"
                  rows={3}
                  disabled
                />
              </div>

              <div className="text-center text-sm text-gray-500 bg-gray-800/30 p-4 rounded-lg">
                This is a preview - payments are disabled
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  )
}
