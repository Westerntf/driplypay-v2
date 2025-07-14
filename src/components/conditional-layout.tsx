/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Design System
 * Component: Conditional layout wrapper that shows/hides navigation based on route
 * Features: Route-based navigation visibility, clean profile layouts
 */
'use client'
import { usePathname } from 'next/navigation'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()
  
  // Check if we're on a public profile page (username route)
  // Profile pages should not have navigation or footer
  const isProfilePage = pathname !== '/' && 
                       !pathname.startsWith('/dashboard') &&
                       !pathname.startsWith('/auth') &&
                       !pathname.startsWith('/api') &&
                       !pathname.startsWith('/about') &&
                       !pathname.startsWith('/pricing') &&
                       !pathname.startsWith('/contact') &&
                       !pathname.startsWith('/help') &&
                       !pathname.startsWith('/features') &&
                       !pathname.startsWith('/resources') &&
                       !pathname.startsWith('/community') &&
                       !pathname.startsWith('/blog') &&
                       !pathname.startsWith('/creators') &&
                       !pathname.startsWith('/terms') &&
                       !pathname.startsWith('/privacy') &&
                       !pathname.startsWith('/cookies') &&
                       !pathname.startsWith('/security') &&
                       !pathname.startsWith('/updates') &&
                       !pathname.startsWith('/status') &&
                       !pathname.startsWith('/signup') &&
                       !pathname.startsWith('/my-profile') &&
                       !pathname.startsWith('/setup-profile') &&
                       !pathname.startsWith('/preview-profile') &&
                       !pathname.startsWith('/profile-editor') &&
                       !pathname.startsWith('/profile')

  if (isProfilePage) {
    // For public profile pages, render children without navigation/footer
    return <>{children}</>
  }

  // For all other pages, render with navigation and footer
  return (
    <>
      <Navigation />
      <main className="pt-16">
        {children}
      </main>
      <Footer />
    </>
  )
}
