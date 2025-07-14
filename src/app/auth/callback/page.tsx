/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Authentication Features
 * Page: Auth callback handling for various auth flows
 * Features: Session handling, profile creation, redirect logic, password reset
 */
'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

export default function AuthCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log('🔍 Starting auth callback...')
        
        // Check if this is a password reset callback
        const type = searchParams.get('type')
        if (type === 'recovery') {
          console.log('🔄 Password reset callback detected')
          // For password reset, redirect with the tokens in the URL
          const accessToken = searchParams.get('access_token')
          const refreshToken = searchParams.get('refresh_token')
          
          if (accessToken && refreshToken) {
            const params = new URLSearchParams({
              access_token: accessToken,
              refresh_token: refreshToken
            })
            router.push(`/reset-password?${params.toString()}`)
            return
          }
        }
        
        const { data, error } = await supabase.auth.getSession()
        
        console.log('📊 Session data:', data)
        console.log('❌ Session error:', error)
        
        if (error) {
          console.error('❌ Auth session error:', error)
          toast.error(`Authentication failed: ${error.message}`)
          router.push('/signin')
          return
        }

        if (data.session) {
          console.log('✅ User session found:', data.session.user.id)
          console.log('📧 User email:', data.session.user.email)
          
          // Check if profile exists and create if needed
          console.log('🔍 Checking for existing profile...')
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', data.session.user.id)
            .maybeSingle() // Use maybeSingle instead of single to avoid error when no rows

          console.log('📋 Profile query result:', { profile, profileError })

          if (!profile && !profileError) {
            console.log('📝 Profile not found, creating new profile...')
            // Profile doesn't exist, create it with a unique username
            const timestamp = Date.now().toString().slice(-6)
            const username = `user_${data.session.user.id.substring(0, 8)}_${timestamp}`
            
            console.log('🆔 Generated username:', username)
            
            const { data: newProfile, error: createError } = await supabase
              .from('profiles')
              .insert({
                user_id: data.session.user.id,
                username: username,
                display_name: data.session.user.user_metadata?.full_name || 'New Creator'
              })
              .select()
              .single()

            console.log('📊 Profile creation result:', { newProfile, createError })

            if (createError) {
              console.error('❌ Profile creation error:', createError)
              console.error('❌ Full error details:', JSON.stringify(createError, null, 2))
              toast.error(`Database error: ${createError.message}`)
              router.push('/signin')
              return
            }
            
            console.log('✅ Profile created successfully:', newProfile)
            console.log('🎯 REDIRECTING TO /setup-profile')
            // New profile created with temporary username - redirect to setup
            toast.success('Welcome to DriplyPay! Let\'s set up your profile 🎉')
            router.push('/setup-profile')
            return
          } else if (profileError) {
            console.error('❌ Profile fetch error:', profileError)
            console.error('❌ Full error details:', JSON.stringify(profileError, null, 2))
            toast.error(`Database error: ${profileError.message}`)
            router.push('/signin')
            return
          } else {
            console.log('✅ Existing profile found:', profile)
            
            // Check if existing profile needs setup (has temporary username)
            if (profile.username.startsWith('user_')) {
              console.log('🔄 Existing profile has temporary username, redirecting to setup')
              console.log('🎯 REDIRECTING TO /setup-profile')
              toast.success('Welcome back! Let\'s finish setting up your profile 🎉')
              router.push('/setup-profile')
              return
            }
          }

          console.log('🎯 REDIRECTING TO /dashboard')
          toast.success('Welcome to DriplyPay! 🎉')
          router.push('/dashboard')
        } else {
          console.log('❌ No session found, redirecting to signin')
          router.push('/signin')
        }
      } catch (error) {
        console.error('❌ Auth callback unexpected error:', error)
        console.error('❌ Full error details:', JSON.stringify(error, null, 2))
        toast.error('Something went wrong. Please try again.')
        router.push('/signin')
      }
    }

    handleAuthCallback()
  }, [router, searchParams])

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-500 via-purple-600 to-pink-600 flex items-center justify-center">
      <div className="text-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold">Completing your signup...</h2>
        <p className="text-white/80 mt-2">You&apos;ll be redirected shortly</p>
      </div>
    </div>
  )
}
