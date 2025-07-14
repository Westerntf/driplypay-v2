/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Profile Editor Features
 * Page: Redirect to the new live profile editor
 * Features: Seamless redirect to EditablePublicProfile
 */
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardProfilePage() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to the new profile editor
    router.replace('/profile-editor')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white">Redirecting to profile editor...</p>
      </div>
    </div>
  )
}
