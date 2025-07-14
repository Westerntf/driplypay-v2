/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Public Profile Features
 * Layout: Clean layout for public profile pages without site navigation
 * Features: Clean profile layout, no header/footer, optimized for profile viewing
 */
import { Providers } from '@/components/providers'

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}
