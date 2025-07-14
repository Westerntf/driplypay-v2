/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Public Profile Features
 * Component: Success message for completed tips
 * Features: URL parameter detection, auto-hide, success feedback
 */
'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

interface SuccessMessageProps {
  username: string
}

export function SuccessMessage({ username }: SuccessMessageProps) {
  const searchParams = useSearchParams()
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      setShowSuccess(true)
      // Auto hide after 5 seconds
      const timer = setTimeout(() => setShowSuccess(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [searchParams])

  if (!showSuccess) return null

  return (
    <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
      <div className="flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        Thank you for supporting @{username}!
      </div>
    </div>
  )
}
