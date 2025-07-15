/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Public Profile Features
 * Component: Demo page to showcase the new digital wallet design
 * Features: Test data for different wallet method types, theme demonstration
 */
'use client'

import { PublicWallet } from '@/components/profile/public/PublicWallet'
import { getThemeStyles } from '@/components/profile/public/theme-utils'

// Demo wallet methods data
const demoWalletMethods = [
  // External payment methods (redirect links)
  {
    id: '1',
    type: 'external' as const,
    platform: 'venmo',
    name: 'Venmo',
    handle: '@weezy',
    url: 'https://venmo.com/u/weezy',
    enabled: true,
    order_index: 1
  },
  {
    id: '2',
    type: 'external' as const,
    platform: 'cashapp',
    name: 'CashApp',
    handle: '$weezy',
    url: 'https://cash.app/$weezy',
    enabled: true,
    order_index: 2
  },
  {
    id: '3',
    type: 'external' as const,
    platform: 'paypal',
    name: 'PayPal',
    handle: 'weezy',
    url: 'https://paypal.me/weezy',
    enabled: true,
    order_index: 3
  },
  // Internal payment methods (modal forms)
  {
    id: '4',
    type: 'payid' as const,
    platform: 'payid',
    name: 'PayID',
    details: {
      email: 'weezy@example.com',
      phone: '+61 400 123 456'
    },
    enabled: true,
    order_index: 4
  },
  {
    id: '5',
    type: 'bank' as const,
    platform: 'bank',
    name: 'Bank Transfer',
    details: {
      bsb: '123-456',
      account: '987654321'
    },
    enabled: true,
    order_index: 5
  }
]

export default function WalletDemo() {
  // Test different themes
  const themes = [
    { name: 'DriplyPay', theme: 'default' },
    { name: 'Ocean', theme: 'theme1' },
    { name: 'Neon', theme: 'theme2' },
    { name: 'Luxe', theme: 'theme3' }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Digital Wallet Demo</h1>
          <p className="text-gray-400 text-lg">
            New hybrid wallet system with external links and internal payment forms
          </p>
        </div>

        {/* Theme Demos */}
        <div className="space-y-16">
          {themes.map((themeData) => {
            const themeStyles = getThemeStyles(themeData.theme)
            
            return (
              <div key={themeData.theme} className="space-y-6">
                
                {/* Theme Header */}
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {themeData.name} Theme
                  </h2>
                  <div className={`w-32 h-1 mx-auto rounded-full bg-gradient-to-r ${themeStyles.accent}`} />
                </div>

                {/* Wallet Component */}
                <div className="max-w-4xl mx-auto">
                  <PublicWallet
                    walletMethods={demoWalletMethods}
                    profileUsername="weezy"
                    themeStyles={themeStyles}
                  />
                </div>

                {/* Feature Explanation */}
                <div className="bg-gray-900/50 rounded-2xl p-6 max-w-4xl mx-auto">
                  <h3 className="text-lg font-semibold mb-4">How it works:</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                    <div>
                      <h4 className="text-white font-medium mb-2">External Links</h4>
                      <ul className="space-y-1">
                        <li>• Venmo, CashApp, PayPal</li>
                        <li>• Click to redirect</li>
                        <li>• Track click analytics</li>
                        <li>• Show platform handles</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Internal Forms</h4>
                      <ul className="space-y-1">
                        <li>• PayID (email/phone)</li>
                        <li>• Bank transfer (BSB/account)</li>
                        <li>• Copy-to-clipboard functionality</li>
                        <li>• Modal payment details</li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
            )
          })}
        </div>

        {/* Analytics Preview */}
        <div className="mt-16 bg-gray-900/50 rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-6 text-center">Analytics Capabilities</h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-green-400 mb-2">847</div>
              <div className="text-gray-400">Total Clicks</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400 mb-2">Venmo</div>
              <div className="text-gray-400">Most Popular</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400 mb-2">Instagram</div>
              <div className="text-gray-400">Top Traffic Source</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
