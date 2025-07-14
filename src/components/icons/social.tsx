/**
 * 🚀 Developer Reference: /BLUEPRINT.md → UI Components
 * Component: Social platform icons
 * Features: Instagram, Twitter, TikTok, YouTube, etc. icons using public folder assets
 */

import Image from 'next/image'
import { IconProps } from './types'

// Main Social Icon component that maps platforms to actual icons
export const SocialIcon = ({ platform, className = "w-6 h-6", size = 24 }: { platform: string } & IconProps) => {
  const platformLower = platform.toLowerCase()
  
  // Map platform names to icon file names
  const iconMap: Record<string, string> = {
    instagram: 'instagram.svg',
    twitter: 'twitter.svg',
    x: 'x.svg',
    tiktok: 'tiktok.svg',
    youtube: 'youtube.svg',
    onlyfans: 'onlyfans.svg',
    twitch: 'twitch.svg',
    discord: 'discord.svg',
    website: 'website.svg',
    custom: 'website.svg'
  }
  
  const iconFile = iconMap[platformLower] || 'website.svg'
  
  // Add white filter if text-white class is present
  const shouldBeWhite = className?.includes('text-white')
  const filterStyle = shouldBeWhite ? { filter: 'brightness(0) saturate(100%) invert(1)' } : {}
  
  return (
    <Image
      src={`/${iconFile}`}
      alt={`${platform} icon`}
      width={typeof size === 'number' ? size : 24}
      height={typeof size === 'number' ? size : 24}
      className={className}
      style={filterStyle}
    />
  )
}

// Legacy function for backward compatibility
export const getSocialIcon = (platform: string, props: IconProps = {}) => {
  return <SocialIcon platform={platform} {...props} />
}
