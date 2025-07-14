/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Authentication Features
 * Page: Password reset functionality
 * Features: Email-based password reset, secure token handling
 */
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Mail, Check } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '@/lib/supabase'
import { GlassCard, GradientText } from '@/components/design-system'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast.error('Please enter your email address')
      return
    }

    setLoading(true)
    
    try {
      console.log('🔍 Sending password reset email to:', email)
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })

      if (error) {
        console.error('❌ Password reset error:', error)
        throw error
      }

      console.log('✅ Password reset email sent successfully')
      setSent(true)
      toast.success('Password reset email sent!')
    } catch (error: any) {
      console.error('❌ Password reset error:', error)
      toast.error(error.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 driplypay-font-primary">
        <div className="w-full max-w-md space-y-6">
          {/* Back button */}
          <Link 
            href="/signin" 
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sign In
          </Link>

          <GlassCard variant="primary">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-6">
                <Check className="w-8 h-8 text-white" />
              </div>
              
              <h1 className="text-2xl font-bold mb-4">
                <GradientText>Check Your Email</GradientText>
              </h1>
              
              <p className="text-gray-200 mb-6">
                We&apos;ve sent a password reset link to <strong className="text-white">{email}</strong>
              </p>
              
              <p className="text-sm text-gray-400 mb-8">
                Click the link in your email to reset your password. The link will expire in 1 hour.
              </p>

              <div className="space-y-4">
                <p className="text-xs text-gray-500">Didn&apos;t receive it?</p>
                <button
                  onClick={() => {
                    setSent(false)
                    setEmail('')
                  }}
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
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
          href="/signin" 
          className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Sign In
        </Link>

        {/* Forgot password card */}
        <GlassCard variant="primary">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mb-6">
              <Mail className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="text-3xl font-bold mb-4">
              Reset Your <GradientText>Password</GradientText>
            </h1>
            
            <p className="text-gray-200 mb-8">
              Enter your email address and we&apos;ll send you a link to reset your password
            </p>
          </div>

          <form onSubmit={handleResetPassword} className="space-y-6">
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

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? 'Sending Reset Link...' : 'Send Reset Link'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              Remember your password?{' '}
              <Link href="/signin" className="text-blue-400 hover:text-blue-300 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
