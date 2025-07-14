'use client'

import { useState, useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import toast, { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/lib/auth'
import { LivePreviewProvider } from '@/lib/live-preview'

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        <LivePreviewProvider>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: 'hsl(var(--background))',
                color: 'hsl(var(--foreground))',
                border: '1px solid hsl(var(--border))',
              },
            }}
          />
        </LivePreviewProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
