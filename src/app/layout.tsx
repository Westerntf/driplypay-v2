/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Design System
 * Layout: Root application layout with providers and global components
 * Features: Global styles, auth providers, navigation and footer for main site
 */
import './globals.css'
import type { Metadata } from 'next'
import { cn } from '@/lib/utils'
import { Providers } from '@/components/providers'
import { ConditionalLayout } from '@/components/conditional-layout'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3002'),
  title: 'DriplyPay - The Adult Creator Payment Platform',
  description: 'Accept tips and payments from fans with your own secure, customizable storefront. Built for creators, not platforms.',
  keywords: 'payment, profile, creators, tips, stripe, adult content, creators platform',
  authors: [{ name: 'DriplyPay' }],
  openGraph: {
    title: 'DriplyPay - The Adult Creator Payment Platform',
    description: 'Accept tips and payments from fans with your own secure, customizable storefront.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DriplyPay - The Adult Creator Payment Platform',
    description: 'Accept tips and payments from fans with your own secure, customizable storefront.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-black text-white antialiased driplypay-font-primary')}>
        <Providers>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </Providers>
      </body>
    </html>
  )
}
