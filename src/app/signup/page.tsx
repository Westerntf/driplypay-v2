/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Authentication Features
 * Page: User registration and profile creation
 * Features: Email/password signup, email validation, profile setup flow
 */
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Eye, EyeOff, Sparkles, User, Check, X, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '@/lib/supabase'
import { GlassCard, GradientText, PrimaryButton } from '@/components/design-system'

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [username, setUsername] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [step, setStep] = useState(1) // 1: account details, 2: profile details
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null)

  // Check username availability with debouncing
  useEffect(() => {
    if (!username || username.length < 3) {
      setUsernameAvailable(null)
      return
    }

    const timeoutId = setTimeout(async () => {
      setIsCheckingUsername(true)
      try {
        const response = await fetch(`/api/profile/username-check?username=${username}`)
        const data = await response.json()
        setUsernameAvailable(data.available)
      } catch (error) {
        console.error('Username check error:', error)
        setUsernameAvailable(null)
      } finally {
        setIsCheckingUsername(false)
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [username])

  const validatePassword = (password: string) => {
    if (password.length < 6) {
      return 'Password must be at least 6 characters long'
    }
    return null
  }

  const handleAccountSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast.error('Please enter your email address')
      return
    }

    const passwordError = validatePassword(password)
    if (passwordError) {
      toast.error(passwordError)
      return
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setStep(2) // Move to profile details step
    toast.success('Now let\'s set up your profile!')
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!username || username.length < 3) {
      toast.error('Username must be at least 3 characters long')
      return
    }

    if (!usernameAvailable) {
      toast.error('Please choose an available username')
      return
    }

    if (!displayName.trim()) {
      toast.error('Please enter your display name')
      return
    }

    setLoading(true)
    
    try {
      console.log('🔍 Creating account for:', email)
      
      // Create the user account with email/password
      // TODO: Enable email confirmation in production (disabled for local dev testing)
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username.toLowerCase(),
            display_name: displayName.trim()
          }
        }
      })

      if (error) {
        console.error('❌ Signup error:', error)
        throw error
      }

      console.log('✅ Account created successfully:', data)
      
      // Create profile with chosen username and display name
      if (data.user) {
        console.log('📝 Creating profile with chosen username:', username)
        
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert({
            user_id: data.user.id,
            username: username.toLowerCase(),
            display_name: displayName.trim()
          })
          .select()
          .single()

        if (createError) {
          console.error('❌ Profile creation error:', createError)
          console.error('❌ Full error details:', JSON.stringify(createError, null, 2))
          toast.error(`Profile creation failed: ${createError.message}`)
          return
        }
        
        console.log('✅ Profile created successfully:', newProfile)
      }
      
      console.log('🔄 Waiting for session to be established...')
      
      // Wait for the session to be properly established
      let attempts = 0
      const maxAttempts = 10
      const checkSession = async (): Promise<boolean> => {
        const { data: session } = await supabase.auth.getSession()
        return !!session.session
      }
      
      while (attempts < maxAttempts) {
        const hasSession = await checkSession()
        if (hasSession) {
          console.log('✅ Session established, redirecting to profile editor')
          break
        }
        attempts++
        await new Promise(resolve => setTimeout(resolve, 500))
      }
      
      toast.success('Welcome to DriplyPay! 🎉')
      router.push('/profile-editor')
    } catch (error: any) {
      console.error('❌ Signup error:', error)
      if (error.message?.includes('already registered')) {
        toast.error('An account with this email already exists. Please sign in instead.')
      } else {
        toast.error(error.message || 'Failed to create account. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const getUsernameStatus = () => {
    if (!username || username.length < 3) {
      return { icon: null, color: 'text-gray-400', message: 'Username must be at least 3 characters' }
    }
    if (isCheckingUsername) {
      return { icon: <Loader2 className="w-4 h-4 animate-spin" />, color: 'text-gray-400', message: 'Checking availability...' }
    }
    if (usernameAvailable === true) {
      return { icon: <Check className="w-4 h-4" />, color: 'text-green-400', message: 'Username available!' }
    }
    if (usernameAvailable === false) {
      return { icon: <X className="w-4 h-4" />, color: 'text-red-400', message: 'Username taken' }
    }
    return { icon: null, color: 'text-gray-400', message: '' }
  }

  const usernameStatus = getUsernameStatus()

  if (step === 2) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 driplypay-font-primary">
        <div className="w-full max-w-md space-y-6">
          {/* Back button */}
          <button 
            onClick={() => setStep(1)}
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {/* Profile setup card */}
          <GlassCard variant="primary">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mb-6">
                <User className="w-8 h-8 text-white" />
              </div>
              
              <h1 className="text-2xl font-bold mb-4">
                <GradientText>Set Up Your Profile</GradientText>
              </h1>
              
              <p className="text-gray-200 mb-8">
                Choose your username and display name
              </p>
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="your-username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ''))}
                    required
                    disabled={loading}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-colors pr-10"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <span className={usernameStatus.color}>
                      {usernameStatus.icon}
                    </span>
                  </div>
                </div>
                <p className={`text-xs mt-2 ${usernameStatus.color}`}>
                  {usernameStatus.message}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  placeholder="Your Full Name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-colors"
                />
                <p className="text-xs text-gray-400 mt-2">
                  This is how your name will appear on your profile
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || !usernameAvailable || !displayName.trim()}
                className="btn-primary w-full"
              >
                {loading ? 'Creating Account...' : 'Create My DriplyPay'}
              </button>
            </form>
          </GlassCard>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 driplypay-font-primary">
      <div className="w-full max-w-md space-y-6">
        {/* Back button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Signup card */}
        <GlassCard variant="primary">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="text-3xl font-bold mb-4">
              Create Your <GradientText>DriplyPay</GradientText>
            </h1>
            
            <p className="text-gray-200 mb-8">
              Start accepting payments in under 10 minutes
            </p>
          </div>

          <form onSubmit={handleAccountSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-colors pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Must be at least 6 characters long
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-colors pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? 'Creating Account...' : 'Continue'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <Link href="/signin" className="text-blue-400 hover:text-blue-300 transition-colors">
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-700">
            <div className="text-center space-y-4">
              <p className="text-sm font-semibold text-white">What you&apos;ll get:</p>
              <div className="grid grid-cols-1 gap-3 text-sm text-gray-300">
                <div className="flex items-center justify-center gap-3">
                  <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></span>
                  Your own payment profile page
                </div>
                <div className="flex items-center justify-center gap-3">
                  <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></span>
                  Add unlimited payment methods
                </div>
                <div className="flex items-center justify-center gap-3">
                  <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></span>
                  QR codes for in-person tips
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
