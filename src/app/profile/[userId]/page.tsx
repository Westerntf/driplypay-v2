/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Public Profile Features
 * Page: Permanent profile URL using user ID (never breaks)
 * Features: Stable URLs, redirects to friendly username URL
 */
import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { ProfileDatabase } from '@/lib/profile/database'

// Get profile data by user ID
async function getProfileByUserId(userId: string) {
  try {
    const profileData = await ProfileDatabase.getProfileByUserId(userId)
    return profileData
  } catch (error) {
    console.error('Error fetching profile by user ID:', error)
    return null
  }
}

// Generate metadata for the profile
export async function generateMetadata({ params }: { params: { userId: string } }): Promise<Metadata> {
  const profile = await getProfileByUserId(params.userId)
  
  if (!profile) {
    return {
      title: 'Profile Not Found - DriplyPay',
      description: 'The requested creator profile could not be found.'
    }
  }

  const displayName = profile.display_name || profile.username

  return {
    title: `${displayName} (@${profile.username}) - DriplyPay`,
    description: profile.bio || `Support ${displayName} on DriplyPay`,
    openGraph: {
      title: `Support ${displayName}`,
      description: profile.bio || `Support ${displayName} on DriplyPay`,
      images: profile.avatar_url ? [profile.avatar_url] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Support ${displayName}`,
      description: profile.bio || `Support ${displayName} on DriplyPay`,
    }
  }
}

// Main page component - redirects to friendly username URL
export default async function PermanentProfilePage({ params }: { params: { userId: string } }) {
  const profile = await getProfileByUserId(params.userId)
  
  if (!profile) {
    notFound()
  }

  // Redirect to the friendly username URL
  redirect(`/${profile.username}`)
}
