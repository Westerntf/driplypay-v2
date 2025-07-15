/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Public Profile Features
 * Component: Digital wallet for public profile with click-based payment tracking
 * Features: Wallet-style payment cards, external links vs internal modals, click analytics ready
 */
'use client'

import { useState } from 'react'
import { Wallet, Copy, ExternalLink, X, Check, Phone, Mail, CreditCard } from 'lucide-react'
import { PaymentIcon } from '@/components/icons'
import { createPortal } from 'react-dom'

interface WalletMethod {
  id: string
  name: string
  type: 'external' | 'payid' | 'bank' // external = redirect, payid/bank = modal
  platform: string // venmo, cashapp, paypal, payid, bank, etc.
  handle?: string // @username for external
  url?: string // for external links
  details?: {
    email?: string
    phone?: string
    bsb?: string
    account?: string
  }
  enabled: boolean
  order_index?: number
}

interface PublicWalletProps {
  walletMethods: WalletMethod[]
  profileUsername: string
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

export function PublicWallet({ walletMethods, profileUsername, themeStyles }: PublicWalletProps) {
  const [selectedMethod, setSelectedMethod] = useState<WalletMethod | null>(null)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  // Extract theme identifier for CSS classes
  const getThemeClass = () => {
    if (themeStyles.accent.includes('purple') || themeStyles.accent.includes('fuchsia')) return 'theme-driply'
    if (themeStyles.accent.includes('blue') || themeStyles.accent.includes('cyan')) return 'theme-ocean'
    if (themeStyles.accent.includes('green') || themeStyles.accent.includes('emerald')) return 'theme-neon'
    if (themeStyles.accent.includes('red') || themeStyles.accent.includes('rose')) return 'theme-luxe'
    return 'theme-driply'
  }

  const themeClass = getThemeClass()

  if (!walletMethods || walletMethods.length === 0) {
    // Temporarily show demo data when no wallet methods exist
    const demoWalletMethods = [
      {
        id: 'demo-1',
        type: 'external' as const,
        platform: 'venmo',
        name: 'Venmo',
        handle: '@western',
        url: 'https://venmo.com/u/western',
        enabled: true,
        order_index: 1
      },
      {
        id: 'demo-2',
        type: 'external' as const,
        platform: 'cashapp',
        name: 'CashApp',
        handle: '$western',
        url: 'https://cash.app/$western',
        enabled: true,
        order_index: 2
      },
      {
        id: 'demo-3',
        type: 'payid' as const,
        platform: 'payid',
        name: 'PayID',
        details: {
          email: 'western@example.com',
          phone: '+61 400 123 456'
        },
        enabled: true,
        order_index: 3
      }
    ]
    
    // Use demo data temporarily
    walletMethods = demoWalletMethods
  }

  // Filter enabled methods and sort by order_index
  const enabledMethods = walletMethods
    .filter(method => method.enabled !== false)
    .sort((a, b) => (a.order_index || 0) - (b.order_index || 0))

  if (enabledMethods.length === 0) {
    return null
  }

  // Handle payment method click
  const handleMethodClick = (method: WalletMethod) => {
    if (method.type === 'external' && method.url) {
      // Track click and redirect
      console.log('Click tracked:', method.platform, method.id)
      window.open(method.url, '_blank', 'noopener,noreferrer')
    } else {
      // Open modal for internal payment methods
      setSelectedMethod(method)
    }
  }

  // Copy to clipboard function
  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // Close modal
  const closeModal = () => {
    setSelectedMethod(null)
    setCopiedField(null)
  }

  // Calculate dynamic grid layout
  const getLayoutConfig = () => {
    const count = enabledMethods.length
    
    switch (count) {
      case 1:
        return { gridClass: 'grid-cols-1', cardSize: 'large' }
      case 2:
        return { gridClass: 'grid-cols-2', cardSize: 'medium' }
      case 3:
        return { gridClass: 'grid-cols-3', cardSize: 'small' }
      case 4:
        return { gridClass: 'grid-cols-2 sm:grid-cols-4', cardSize: 'small' }
      default:
        return { gridClass: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4', cardSize: 'extra-small' }
    }
  }

  const layoutConfig = getLayoutConfig()

  // Render payment card
  const renderPaymentCard = (method: WalletMethod, index: number) => {
    const isExternal = method.type === 'external'
    
    return (
      <button
        key={method.id}
        onClick={() => handleMethodClick(method)}
        className={`group relative overflow-hidden rounded-xl border-2 transition-all duration-300 bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-sm hover:scale-[1.02] hover:shadow-xl border-white/10 hover:border-white/30 ${themeClass}`}
        title={isExternal ? `Pay via ${method.platform}` : `Send payment details`}
      >
        {/* Gradient overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-r ${themeStyles.accent} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
        
        {/* External link indicator */}
        {isExternal && (
          <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
            <ExternalLink className="w-2.5 h-2.5 text-white" />
          </div>
        )}
        
        <div className="relative p-4 flex flex-col items-center gap-3">
          {/* Payment Icon */}
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${themeStyles.accent} p-0.5 group-hover:scale-110 transition-transform duration-300`}>
            <div className="w-full h-full rounded-xl bg-black/80 flex items-center justify-center backdrop-blur-sm">
              <PaymentIcon 
                type={method.platform} 
                className="w-6 h-6 text-white"
              />
            </div>
          </div>
          
          {/* Method Info */}
          <div className="text-center">
            <h3 className="text-white font-semibold text-sm">{method.name}</h3>
            {method.handle && (
              <p className="text-gray-400 text-xs mt-1">{method.handle}</p>
            )}
          </div>
          
          {/* Action Button */}
          <div className={`px-3 py-1.5 rounded-lg bg-gradient-to-r ${themeStyles.accent} opacity-80 group-hover:opacity-100 transition-opacity`}>
            <span className="text-white font-medium text-xs">
              {isExternal ? 'Pay Now' : 'Get Details'}
            </span>
          </div>
        </div>

        {/* Shine effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-out" />
      </button>
    )
  }

  return (
    <div className={`relative ${themeClass}`}>
      {/* Digital Wallet Container - Matches Social Links Style */}
      <div className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-xl ${themeStyles.card} p-3 sm:p-4 lg:p-6`}>
        {/* Gradient Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
        <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${themeStyles.accent} opacity-10 rounded-full blur-3xl`} />
        <div className={`absolute -bottom-20 -left-20 w-32 h-32 bg-gradient-to-tr ${themeStyles.accent} opacity-5 rounded-full blur-2xl`} />
        
        <div className="relative z-10">
          {/* Header Section - Matches Social Links */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between lg:flex-row lg:items-center lg:justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-0">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-r ${themeStyles.accent} p-0.5`}>
                <div className="w-full h-full rounded-xl sm:rounded-2xl bg-black/80 flex items-center justify-center backdrop-blur-sm">
                  <Wallet className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-base sm:text-lg lg:text-xl font-bold text-white">Support</h2>
                <p className="text-xs sm:text-xs lg:text-sm text-gray-400">Show your appreciation</p>
              </div>
            </div>
            
            {/* Payment Stats */}
            <div className="flex items-center gap-1 sm:gap-2 text-gray-400 text-left sm:text-right">
              <CreditCard className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm">
                {enabledMethods.length} method{enabledMethods.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Payment Methods Grid */}
          <div className={`grid ${layoutConfig.gridClass} gap-2 sm:gap-3`}>
            {enabledMethods.map((method, index) => renderPaymentCard(method, index))}
          </div>
        </div>
      </div>
      
      {/* Floating Wallet Elements */}
      <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-gradient-to-r from-green-500/10 to-blue-500/10 blur-xl" />
      <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-xl" />

      {/* Payment Details Modal */}
      {selectedMethod && typeof window !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 bg-black/80 z-[999999] flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div 
            className="relative w-full max-w-md bg-gradient-to-br from-black/90 to-black/95 backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${themeStyles.accent} p-0.5`}>
                  <div className="w-full h-full rounded-xl bg-black/80 flex items-center justify-center">
                    <PaymentIcon type={selectedMethod.platform} className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-semibold">{selectedMethod.name}</h3>
                  <p className="text-gray-400 text-sm">Payment Details</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                title="Close payment details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Payment Details */}
            <div className="space-y-4">
              {selectedMethod.type === 'payid' && selectedMethod.details && (
                <>
                  {selectedMethod.details.email && (
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-gray-400 text-sm">PayID Email</p>
                            <p className="text-white font-mono">{selectedMethod.details.email}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => copyToClipboard(selectedMethod.details!.email!, 'email')}
                          className={`p-2 rounded-lg transition-colors ${
                            copiedField === 'email' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-white/10 text-gray-400 hover:text-white'
                          }`}
                          title={copiedField === 'email' ? 'Copied!' : 'Copy email'}
                        >
                          {copiedField === 'email' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  )}

                  {selectedMethod.details.phone && (
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-gray-400 text-sm">PayID Phone</p>
                            <p className="text-white font-mono">{selectedMethod.details.phone}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => copyToClipboard(selectedMethod.details!.phone!, 'phone')}
                          className={`p-2 rounded-lg transition-colors ${
                            copiedField === 'phone' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-white/10 text-gray-400 hover:text-white'
                          }`}
                          title={copiedField === 'phone' ? 'Copied!' : 'Copy phone number'}
                        >
                          {copiedField === 'phone' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}

              {selectedMethod.type === 'bank' && selectedMethod.details && (
                <>
                  {selectedMethod.details.bsb && (
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CreditCard className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-gray-400 text-sm">BSB</p>
                            <p className="text-white font-mono">{selectedMethod.details.bsb}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => copyToClipboard(selectedMethod.details!.bsb!, 'bsb')}
                          className={`p-2 rounded-lg transition-colors ${
                            copiedField === 'bsb' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-white/10 text-gray-400 hover:text-white'
                          }`}
                          title={copiedField === 'bsb' ? 'Copied!' : 'Copy BSB'}
                        >
                          {copiedField === 'bsb' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  )}

                  {selectedMethod.details.account && (
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CreditCard className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-gray-400 text-sm">Account Number</p>
                            <p className="text-white font-mono">{selectedMethod.details.account}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => copyToClipboard(selectedMethod.details!.account!, 'account')}
                          className={`p-2 rounded-lg transition-colors ${
                            copiedField === 'account' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-white/10 text-gray-400 hover:text-white'
                          }`}
                          title={copiedField === 'account' ? 'Copied!' : 'Copy account number'}
                        >
                          {copiedField === 'account' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Instructions */}
            <div className="mt-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <p className="text-blue-400 text-sm leading-relaxed">
                Copy the details above and use them in your banking app or payment platform to send support to @{profileUsername}.
              </p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
