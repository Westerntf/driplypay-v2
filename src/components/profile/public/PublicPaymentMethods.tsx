/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Public Profile Features
 * Component: Modern payment methods and tip functionality
 * Features: Enhanced design, payment method grid, quick tip amounts, custom amounts, Stripe integration
 */
'use client'

import { useState } from 'react'
import { DollarSign } from 'lucide-react'
import { PaymentIcon } from '@/components/icons'
import './animations.css'

interface PaymentMethod {
  id: string
  type: string
  name: string
  handle: string | null
  url: string | null
  preferred: boolean
  enabled: boolean
  order_index: number
  [key: string]: any
}

interface PublicPaymentMethodsProps {
  paymentMethods: PaymentMethod[]
  profileUsername: string
  minTipAmount: number
  themeStyles: {
    background: string
    accent: string
    accentBackground: string
    card: string
    button: string
    iconBackground: string
    text: string
    accent_text: string
  }
}

export function PublicPaymentMethods({ 
  paymentMethods, 
  profileUsername, 
  minTipAmount,
  themeStyles 
}: PublicPaymentMethodsProps) {
  const [customAmount, setCustomAmount] = useState('')
  const [message, setMessage] = useState('')
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)

  // Debug logging
  console.log('PublicPaymentMethods - Data:', {
    paymentMethods,
    paymentMethodsLength: paymentMethods?.length,
    enabledMethods: paymentMethods?.filter(m => m.enabled)?.length
  })

  const quickAmounts = [5, 10, 25, 50, 100]

  const handleQuickTip = async (amount: number) => {
    try {
      const response = await fetch('/api/tip/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: profileUsername,
          amount: amount * 100, // Convert to cents
          message: message,
          anonymous: false,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session')
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Payment error:', error)
      alert('Failed to process payment. Please try again.')
    }
  }

  const handleCustomTip = async () => {
    const amount = parseFloat(customAmount)
    if (amount < minTipAmount / 100) {
      alert(`Minimum tip amount is $${minTipAmount / 100}`)
      return
    }
    
    try {
      const response = await fetch('/api/tip/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: profileUsername,
          amount: Math.round(amount * 100), // Convert to cents
          message: message,
          anonymous: false,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session')
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Payment error:', error)
      alert('Failed to process payment. Please try again.')
    }
  }

  const handlePaymentMethodClick = (method: PaymentMethod) => {
    if (method.type === 'stripe') {
      setSelectedMethod(method.id)
    } else if (method.url) {
      // Open external payment method
      window.open(method.url, '_blank')
    }
  }

  if (!paymentMethods || paymentMethods.length === 0) {
    return null
  }

  return (
    <div className="relative">
      {/* Main Container with Premium Glass Effect */}
      <div className={`relative overflow-hidden rounded-3xl border ${themeStyles.card} backdrop-blur-xl bg-black/40`}>
        {/* Gradient Background Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${themeStyles.accent} opacity-5`} />
        
        {/* Content */}
        <div className="relative p-6 sm:p-8">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${themeStyles.accent} p-0.5`}>
                <div className="w-full h-full rounded-2xl bg-black/80 flex items-center justify-center backdrop-blur-sm">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
              Support @{profileUsername}
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto">
              Show your appreciation with a tip and help support the content you love
            </p>
          </div>

          {/* Quick Tip Amounts - Premium Card Design */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-1 h-6 bg-gradient-to-b ${themeStyles.accent} rounded-full`} />
              <h3 className="text-lg font-semibold text-white">Quick Support</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {quickAmounts.map((amount, index) => (
                <button
                  key={amount}
                  onClick={() => handleQuickTip(amount)}
                  className={`payment-grid-item group relative overflow-hidden rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${themeStyles.card} bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm animate-fadeInUp shine-effect`}
                >
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${themeStyles.accent} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                  
                  <div className="relative p-3 sm:p-4 lg:p-6 text-center">
                    <div className="text-white font-bold text-base sm:text-lg lg:text-xl mb-1">${amount}</div>
                    <div className={`text-xs font-medium ${themeStyles.accent_text} group-hover:text-white transition-colors`}>
                      One-time
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Payment Methods Section - Moved up */}
          {paymentMethods && paymentMethods.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-1 h-6 bg-gradient-to-b ${themeStyles.accent} rounded-full`} />
                <h3 className="text-lg font-semibold text-white">Payment Methods</h3>
                <div className="text-sm text-gray-500">Choose your preferred method</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {paymentMethods
                  .filter(method => method.enabled)
                  .sort((a, b) => a.order_index - b.order_index)
                  .map((method, index) => (
                    <button
                      key={method.id}
                      onClick={() => handlePaymentMethodClick(method)}
                      className={`payment-method-item group relative overflow-hidden rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 text-left bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm hover:scale-105 hover:shadow-2xl ${themeStyles.card} animate-fadeInUp shine-effect`}
                    >
                      {/* Gradient overlay on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${themeStyles.accent} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                      
                      <div className="relative p-4 sm:p-5">
                        <div className="flex items-center gap-4">
                          {/* Enhanced Icon Container */}
                          <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-r ${themeStyles.accent} p-0.5`}>
                            <div className="w-full h-full rounded-xl bg-black/80 flex items-center justify-center backdrop-blur-sm">
                              <PaymentIcon 
                                type={method.type} 
                                className="w-6 h-6 text-white" 
                              />
                            </div>
                          </div>
                          
                          {/* Payment Method Info */}
                          <div className="flex-1 min-w-0">
                            <h4 className={`text-white font-semibold group-hover:${themeStyles.accent_text} transition-colors text-base mb-1`}>
                              {method.name}
                            </h4>
                            {method.handle && (
                              <p className="text-gray-400 text-sm truncate">{method.handle}</p>
                            )}
                            {method.url && method.type === 'custom' && (
                              <p className="text-gray-400 text-sm truncate">{method.url}</p>
                            )}
                            {method.preferred && (
                              <div className="flex items-center gap-1 mt-1">
                                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${themeStyles.accent}`} />
                                <span className={`text-xs font-medium ${themeStyles.accent_text}`}>
                                  Recommended
                                </span>
                              </div>
                            )}
                          </div>
                          
                          {/* Arrow Indicator */}
                          <div className={`w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:${themeStyles.accent} transition-all duration-300`}>
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Custom Amount Section - Enhanced */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-1 h-6 bg-gradient-to-b ${themeStyles.accent} rounded-full`} />
              <h3 className="text-lg font-semibold text-white">Custom Amount</h3>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <DollarSign className={`w-5 h-5 ${themeStyles.accent_text}`} />
                </div>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="Enter amount"
                  className={`w-full pl-12 pr-4 py-4 bg-black/40 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:border-opacity-30 focus:outline-none transition-all duration-300 backdrop-blur-sm ${themeStyles.card} focus:shadow-lg focus:scale-[1.02] bg-gradient-to-br from-white/5 to-white/2`}
                />
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${themeStyles.accent} opacity-0 pointer-events-none transition-opacity duration-300 peer-focus:opacity-10`} />
              </div>
              <button
                onClick={handleCustomTip}
                disabled={!customAmount || parseFloat(customAmount) < minTipAmount / 100}
                className={`w-full py-4 px-6 rounded-2xl text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-2xl bg-gradient-to-r ${themeStyles.accent} hover:shadow-purple-500/25`}
              >
                <span className="relative z-10">Send Custom Tip</span>
              </button>
            </div>
          </div>

          {/* Message Section - Enhanced */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-1 h-6 bg-gradient-to-b ${themeStyles.accent} rounded-full`} />
              <h3 className="text-lg font-semibold text-white">Add a Message</h3>
              <span className="text-sm text-gray-500">(Optional)</span>
            </div>
            <div className="relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your thoughts, encouragement, or just say hi..."
                rows={4}
                className={`w-full p-4 bg-black/40 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:border-opacity-30 focus:outline-none transition-all duration-300 resize-none backdrop-blur-sm ${themeStyles.card} focus:shadow-lg focus:scale-[1.01] bg-gradient-to-br from-white/5 to-white/2`}
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                {message.length}/200
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Elements for Extra Visual Appeal */}
      <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl" />
      <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-xl" />
    </div>
  )
}
