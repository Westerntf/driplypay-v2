/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Authentication Features
 * Purpose: Authentication context and user session management
 * Features: User auth state, profile loading, session handling
 */
'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { Profile } from '@/types'

interface AuthContextType {
  user: User | null
  profile: Profile | null
  loading: boolean
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshProfile = useCallback(async () => {
    if (!user) return
    
    try {
      console.log('🔍 Fetching profile for user:', user.id)
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()
      
      if (error && error.code === 'PGRST116') {
        console.log('📝 Profile not found in auth provider, will redirect to setup')
        // Profile doesn't exist - don't auto-create, let user choose username
        setProfile(null)
        return
      } else if (error) {
        console.error('❌ Error fetching profile in auth provider:', error)
        console.error('❌ Full error details:', JSON.stringify(error, null, 2))
      } else {
        console.log('✅ Profile found in auth provider:', data)
        setProfile(data)
      }
    } catch (error) {
      console.error('❌ Unexpected error in auth provider:', error)
      console.error('❌ Full error details:', JSON.stringify(error, null, 2))
    }
  }, [user])

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
  }

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (user) {
      refreshProfile()
    } else {
      setProfile(null)
    }
  }, [user, refreshProfile])

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      loading,
      signOut,
      refreshProfile,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
