/**
 * Temporary demo page to showcase the new DriplyPay dropdown styles
 */
'use client'

import { useState } from 'react'

export default function DropdownDemoPage() {
  const [socialPlatform, setSocialPlatform] = useState('')
  const [paymentType, setPaymentType] = useState('')
  const [goalPayment, setGoalPayment] = useState('')

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">DriplyPay Styled Dropdowns Demo</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Social Platform Dropdown */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Social Platform Selector</h2>
            <select
              value={socialPlatform}
              onChange={(e) => setSocialPlatform(e.target.value)}
              className="driply-dropdown"
            >
              <option value="">Select Platform</option>
              <option value="Instagram">Instagram</option>
              <option value="Twitter">Twitter/X</option>
              <option value="TikTok">TikTok</option>
              <option value="YouTube">YouTube</option>
              <option value="OnlyFans">OnlyFans</option>
              <option value="Twitch">Twitch</option>
              <option value="Discord">Discord</option>
              <option value="Website">Website</option>
              <option value="Other">Other</option>
            </select>
            
            <input
              type="text"
              placeholder="Username"
              className="driply-input"
            />
            
            <div className="flex gap-2">
              <button className="driply-button-primary">Save</button>
              <button className="driply-button-secondary">Cancel</button>
            </div>
          </div>

          {/* Payment Method Type */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Payment Method Type</h2>
            <select
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value)}
              className="driply-dropdown"
            >
              <option value="">Select type</option>
              <option value="paypal">PayPal</option>
              <option value="cashapp">Cash App</option>
              <option value="venmo">Venmo</option>
              <option value="stripe">Stripe</option>
              <option value="custom">Custom</option>
            </select>
            
            <input
              type="text"
              placeholder="Display name"
              className="driply-input"
            />
            
            <div className="flex gap-2">
              <button className="driply-button-success">Create</button>
              <button className="driply-button-danger">Delete</button>
            </div>
          </div>

          {/* Goal Payment Method */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Goal Payment Method</h2>
            <select
              value={goalPayment}
              onChange={(e) => setGoalPayment(e.target.value)}
              className="driply-dropdown"
            >
              <option value="">No preferred method</option>
              <option value="1">PayID Me Baby x (custom)</option>
              <option value="2">My PayPal (paypal)</option>
              <option value="3">Cash App (cashapp)</option>
            </select>
            
            <input
              type="number"
              placeholder="Target amount ($)"
              className="driply-input"
            />
            
            <div className="flex gap-2">
              <button className="driply-button-primary">Update Goal</button>
            </div>
          </div>
        </div>

        <div className="mt-12 p-6 bg-gray-800/30 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">🎨 Design Features</h3>
          <ul className="text-gray-300 space-y-2">
            <li>• Custom dropdown arrow with smooth animations</li>
            <li>• Consistent purple accent colors matching DriplyPay theme</li>
            <li>• Dark mode optimized with proper contrast</li>
            <li>• Hover and focus states with subtle transitions</li>
            <li>• Responsive design for all screen sizes</li>
            <li>• Modern glassmorphism styling</li>
          </ul>
        </div>

        <div className="mt-8 text-center">
          <a href="/profile-editor" className="driply-button-primary text-lg px-8 py-3">
            Go to Profile Editor
          </a>
        </div>
      </div>
    </div>
  )
}
