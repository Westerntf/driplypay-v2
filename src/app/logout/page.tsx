'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    const signOut = async () => {
      await supabase.auth.signOut()
      // Clear any cached data
      localStorage.clear()
      sessionStorage.clear()
      
      // Redirect to signup
      router.push('/signup')
    }
    
    signOut()
  }, [router])

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
        <p>Signing out...</p>
      </div>
    </div>
  )
}
