/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Public Profile Features
 * Page: Public creator profile page - clean layout without site navigation
 * Features: Profile display, payment methods, social links, goals, theming
 */
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { ProfileDatabase } from '@/lib/profile/database'
import { PublicProfileHeader } from '@/components/profile/public/PublicProfileHeader'
import { PublicSocialLinks } from '@/components/profile/public/PublicSocialLinks'
import { PublicWallet } from '@/components/profile/public/PublicWallet'
import { PublicPaymentMethods } from '@/components/profile/public/PublicPaymentMethods'
import { PublicGoals } from '@/components/profile/public/PublicGoals'
import { PublicShareProfile } from '@/components/profile/public/PublicShareProfile'
import { PublicRecentTips } from '@/components/profile/public/PublicRecentTips'
import { SuccessMessage } from '@/components/profile/public/SuccessMessage'
import { getThemeStyles } from '@/components/profile/public/theme-utils'

// Force dynamic rendering and disable caching
export const dynamic = 'force-dynamic'
export const revalidate = 0

// Get profile data by username
async function getProfileData(username: string) {
  try {
    console.log(`🔄 Fetching fresh profile data for ${username} at ${new Date().toISOString()}`)
    const profileData = await ProfileDatabase.getProfileByUsername(username)
    console.log('Profile data for debugging:', {
      username,
      avatar_url: profileData?.avatar_url,
      banner_url: profileData?.banner_url,
      location: profileData?.location,
      hasPaymentMethods: profileData?.payment_methods?.length || 0,
      paymentMethods: profileData?.payment_methods?.map((pm: any) => ({
        id: pm.id,
        name: pm.name,
        enabled: pm.enabled,
        type: pm.type
      })) || [],
      fullProfile: profileData
    })
    return profileData
  } catch (error) {
    console.error('Error fetching profile:', error)
    return null
  }
}

// Generate metadata for SEO
export async function generateMetadata(
  { params }: { params: { username: string } }
): Promise<Metadata> {
  const profile = await getProfileData(params.username)
  
  if (!profile) {
    return {
      title: 'Profile Not Found - DriplyPay',
      description: 'The profile you are looking for could not be found.',
    }
  }

  const displayName = profile.display_name || profile.username
  
  return {
    title: `${displayName} (@${profile.username}) - DriplyPay`,
    description: profile.bio || `Support ${displayName} on DriplyPay`,
    openGraph: {
      title: `Support ${displayName}`,
      description: profile.bio || `Support ${displayName} on DriplyPay`,
      type: 'profile',
      images: profile.avatar_url ? [profile.avatar_url] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Support ${displayName}`,
      description: profile.bio || `Support ${displayName} on DriplyPay`,
    }
  }
}

// Main page component
export default async function PublicProfilePage({ params }: { params: { username: string } }) {
  const profile = await getProfileData(params.username)
  
  if (!profile) {
    notFound()
  }

  // Ensure all fields have default values to prevent serialization issues
  const serializedProfile = {
    ...profile,
    avatar_url: profile.avatar_url || null,
    banner_url: profile.banner_url || null,
    location: profile.location || null,
    display_name: profile.display_name || null,
    bio: profile.bio || null,
    payment_methods: profile.payment_methods || [],
    social_links: profile.social_links || [],
    goals: profile.goals || [],
    recent_tips: profile.recent_tips || [],
    // Section visibility controls (default to true if not set)
    show_social_links: profile.show_social_links ?? true,
    show_payment_methods: profile.show_payment_methods ?? true,
    show_goals: profile.show_goals ?? true
  }

  console.log('Serialized profile before passing to components:', {
    avatar_url: serializedProfile.avatar_url,
    banner_url: serializedProfile.banner_url,
    location: serializedProfile.location,
    display_name: serializedProfile.display_name
  })

  // Get theme styles
  const themeStyles = getThemeStyles(serializedProfile.theme)

  return (
    <div className="min-h-screen">
      <Suspense fallback={null}>
        <SuccessMessage username={serializedProfile.username} />
      </Suspense>
      
      {/* Profile Header */}
      <PublicProfileHeader profile={serializedProfile} themeStyles={themeStyles} />
      
      {/* Main Content */}
      <div className="relative z-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-16 pb-12 sm:pb-16 lg:pb-20">
          
          {/* Mobile Layout - Single Column */}
          <div className="lg:hidden space-y-6">
            {/* Social Links - Mobile (moved up) */}
            {(serializedProfile.show_social_links ?? true) && (
              <PublicSocialLinks 
                socialLinks={serializedProfile.social_links} 
                walletMethods={serializedProfile.wallet_methods || []}
                profileUsername={serializedProfile.username}
                themeStyles={themeStyles}
              />
            )}
            
            {/* Digital Wallet - Mobile */}
            {(serializedProfile.show_payment_methods ?? true) && (
              <div id="wallet">
                <PublicWallet 
                  walletMethods={serializedProfile.wallet_methods || []}
                  profileUsername={serializedProfile.username}
                  themeStyles={themeStyles}
                />
              </div>
            )}
            
            {/* Goals - Mobile */}
            {(serializedProfile.show_goals ?? true) && (
              <PublicGoals 
                goals={serializedProfile.goals}
                paymentMethods={serializedProfile.payment_methods}
                themeStyles={themeStyles}
              />
            )}
            
            {/* Recent Support - Mobile */}
            <PublicRecentTips 
              tips={serializedProfile.recent_tips}
              themeStyles={themeStyles}
            />
            
            {/* Share Profile - Mobile */}
            <PublicShareProfile 
              username={serializedProfile.username}
              displayName={serializedProfile.display_name || serializedProfile.username}
              themeStyles={themeStyles}
            />
          </div>

          {/* Desktop Layout - Custom Grid */}
          <div className="hidden lg:block space-y-8">
            
            {/* Social Links Banner - Full Width */}
            {(serializedProfile.show_social_links ?? true) && (
              <div className="w-full">
                <PublicSocialLinks 
                  socialLinks={serializedProfile.social_links} 
                  walletMethods={serializedProfile.wallet_methods || []}
                  profileUsername={serializedProfile.username}
                  themeStyles={themeStyles}
                />
              </div>
            )}
            
            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 lg:gap-8 w-full">
              {/* Left Column - Desktop */}
              <div className="space-y-8 w-full">
                {/* Digital Wallet - Desktop Left */}
                {(serializedProfile.show_payment_methods ?? true) && (
                  <div id="wallet" className="w-full">
                    <PublicWallet 
                      walletMethods={serializedProfile.wallet_methods || []}
                      profileUsername={serializedProfile.username}
                      themeStyles={themeStyles}
                    />
                  </div>
                )}
              </div>

              {/* Right Column - Desktop */}
              <div className="space-y-8 w-full">
                {/* Goals - Desktop Right */}
                {(serializedProfile.show_goals ?? true) && (
                  <div className="w-full">
                    <PublicGoals 
                      goals={serializedProfile.goals}
                      paymentMethods={serializedProfile.payment_methods}
                      themeStyles={themeStyles}
                    />
                  </div>
                )}
                
                {/* Recent Support - Under Goals - Force full width */}
                <div className="w-full">
                  <div className="w-full min-w-full max-w-none">
                    <PublicRecentTips 
                      tips={serializedProfile.recent_tips}
                      themeStyles={themeStyles}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bottom Section - Share Profile Only */}
            <div className="w-full">
              <PublicShareProfile 
                username={serializedProfile.username}
                displayName={serializedProfile.display_name || serializedProfile.username}
                themeStyles={themeStyles}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* DriplyPay Branding */}
      <div className="border-t border-gray-800/50 bg-black backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <div className="flex flex-col items-center gap-2 sm:items-start">
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
                DRIPLYPAY
              </div>
              <p className="text-gray-400 text-sm text-center sm:text-left">
                All in one payment platform for creators
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 sm:items-end">
              <a 
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-sm font-medium rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Get Started
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message - Client Component */}
      <SuccessMessage username={serializedProfile.username} />
    </div>
  )
}
