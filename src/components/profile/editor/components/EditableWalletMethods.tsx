/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Profile Editor Features
 * Component: Wallet methods editor for profile editing interface
 * Features: Digital wallet configuration, external links, internal payment details, click analytics tracking
 */
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PaymentIcon } from '@/components/icons'

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

interface EditableWalletMethodsProps {
  walletMethods: WalletMethod[]
  onUpdate: (methods: WalletMethod[]) => void
  isVisible: boolean
  onToggleVisibility: () => void
}

const platformOptions = [
  { value: 'venmo', label: 'Venmo', type: 'external' },
  { value: 'cashapp', label: 'Cash App', type: 'external' },
  { value: 'paypal', label: 'PayPal', type: 'external' },
  { value: 'zelle', label: 'Zelle', type: 'external' },
  { value: 'payid', label: 'PayID', type: 'payid' },
  { value: 'bank', label: 'Bank Transfer', type: 'bank' },
  { value: 'custom', label: 'Custom', type: 'external' }
]

export function EditableWalletMethods({ 
  walletMethods, 
  onUpdate, 
  isVisible, 
  onToggleVisibility 
}: EditableWalletMethodsProps) {
  const [isAddingMethod, setIsAddingMethod] = useState(false)
  const [editingMethod, setEditingMethod] = useState<string | null>(null)
  const [newMethod, setNewMethod] = useState<Partial<WalletMethod>>({
    name: '',
    platform: '',
    type: 'external',
    handle: '',
    url: '',
    enabled: true
  })
  const [editingValues, setEditingValues] = useState<Partial<WalletMethod>>({})

  const handleAddMethod = () => {
    if (!newMethod.platform || !newMethod.name) return

    const method: WalletMethod = {
      id: `wallet_${Date.now()}`,
      name: newMethod.name || '',
      platform: newMethod.platform || '',
      type: newMethod.type || 'external',
      handle: newMethod.handle,
      url: newMethod.url,
      details: newMethod.details,
      enabled: true,
      order_index: walletMethods.length
    }

    onUpdate([...walletMethods, method])
    setNewMethod({
      name: '',
      platform: '',
      type: 'external',
      handle: '',
      url: '',
      enabled: true
    })
    setIsAddingMethod(false)
  }

  const handleEditMethod = (method: WalletMethod) => {
    setEditingMethod(method.id)
    setEditingValues(method)
  }

  const handleSaveMethodEdit = (methodId: string) => {
    const updatedMethods = walletMethods.map(method => 
      method.id === methodId ? { ...method, ...editingValues } : method
    )
    onUpdate(updatedMethods)
    setEditingMethod(null)
    setEditingValues({})
  }

  const handleCancelMethodEdit = () => {
    setEditingMethod(null)
    setEditingValues({})
  }

  const handleDeleteMethod = (methodId: string) => {
    const updatedMethods = walletMethods.filter(method => method.id !== methodId)
    onUpdate(updatedMethods)
  }

  const handlePlatformChange = (platform: string, isEditing = false) => {
    const selectedPlatform = platformOptions.find(p => p.value === platform)
    const type = (selectedPlatform?.type as 'external' | 'payid' | 'bank') || 'external'
    
    if (isEditing) {
      setEditingValues({ 
        ...editingValues, 
        platform, 
        type,
        // Clear fields that don't apply to the new type
        ...(type === 'external' ? { details: undefined } : { handle: '', url: '' })
      })
    } else {
      setNewMethod({ 
        ...newMethod, 
        platform, 
        type,
        // Clear fields that don't apply to the new type
        ...(type === 'external' ? { details: undefined } : { handle: '', url: '' })
      })
    }
  }

  const renderMethodForm = (
    values: Partial<WalletMethod>,
    onChange: (updates: Partial<WalletMethod>) => void,
    onSave: () => void,
    onCancel: () => void,
    isEditing = false
  ) => (
    <div className="space-y-4">
      <select
        value={values.platform || ''}
        onChange={(e) => handlePlatformChange(e.target.value, isEditing)}
        className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300 [&>option]:bg-gray-900 [&>option]:text-white"
        aria-label="Wallet platform"
      >
        <option value="" className="bg-gray-900 text-white">Select platform</option>
        {platformOptions.map(option => (
          <option key={option.value} value={option.value} className="bg-gray-900 text-white">
            {option.label}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Display name (e.g., 'My Venmo')"
        value={values.name || ''}
        onChange={(e) => onChange({ ...values, name: e.target.value })}
        className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300"
      />

      {values.type === 'external' && (
        <>
          <input
            type="text"
            placeholder="Handle (e.g., '@username')"
            value={values.handle || ''}
            onChange={(e) => onChange({ ...values, handle: e.target.value })}
            className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300"
          />
          <input
            type="url"
            placeholder="URL (optional)"
            value={values.url || ''}
            onChange={(e) => onChange({ ...values, url: e.target.value })}
            className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300"
          />
        </>
      )}

      {values.type === 'payid' && (
        <input
          type="email"
          placeholder="PayID email address"
          value={values.details?.email || ''}
          onChange={(e) => onChange({ 
            ...values, 
            details: { ...values.details, email: e.target.value }
          })}
          className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300"
        />
      )}

      {values.type === 'bank' && (
        <>
          <input
            type="text"
            placeholder="BSB (Bank State Branch)"
            value={values.details?.bsb || ''}
            onChange={(e) => onChange({ 
              ...values, 
              details: { ...values.details, bsb: e.target.value }
            })}
            className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300"
          />
          <input
            type="text"
            placeholder="Account number"
            value={values.details?.account || ''}
            onChange={(e) => onChange({ 
              ...values, 
              details: { ...values.details, account: e.target.value }
            })}
            className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300"
          />
        </>
      )}

      <div className="flex gap-3">
        <motion.button
          onClick={onSave}
          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2.5 rounded-xl font-medium transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isEditing ? 'Save' : 'Add Wallet Method'}
        </motion.button>
        <motion.button
          onClick={onCancel}
          className="flex-1 bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl font-medium transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Cancel
        </motion.button>
      </div>
    </div>
  )

  return (
    <motion.div 
      className="relative bg-gradient-to-br from-black/40 via-black/30 to-black/20 backdrop-blur-xl rounded-3xl p-8 border border-white/10 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Floating orbs */}
      <div className="absolute top-6 right-6 w-3 h-3 bg-purple-400/30 rounded-full animate-pulse" />
      <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse delay-150" />
      <div className="absolute bottom-6 left-6 w-1 h-1 bg-purple-400/40 rounded-full animate-pulse delay-300" />

      {/* Header */}
      <div className="relative flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="relative">
            <h2 className="text-lg font-bold text-white tracking-tight whitespace-nowrap">Digital Wallet</h2>
            <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
          </div>
          <motion.button
            onClick={onToggleVisibility}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ${
              isVisible ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={`${isVisible ? 'Hide' : 'Show'} Digital Wallet section`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
              isVisible ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </motion.button>
        </div>
        {isVisible && (
          <motion.button
            onClick={() => setIsAddingMethod(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-white transition-all duration-300 hover:scale-105 min-w-0 shrink-0"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="text-xs font-medium whitespace-nowrap">Add Method</span>
          </motion.button>
        )}
      </div>
      
      {isVisible ? (
        <div className="space-y-4">
          {walletMethods.map((method, index) => (
            <motion.div 
              key={method.id} 
              className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:border-white/20 transition-all duration-300"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              {editingMethod === method.id ? (
                // Edit form
                renderMethodForm(
                  editingValues,
                  setEditingValues,
                  () => handleSaveMethodEdit(method.id),
                  handleCancelMethodEdit,
                  true
                )
              ) : (
                // Display view
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center border border-white/10">
                        <PaymentIcon 
                          type={method.platform} 
                          className="w-6 h-6 text-white" 
                          size={24}
                        />
                      </div>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full border-2 border-black" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-semibold text-lg">{method.name}</div>
                      <div className="text-gray-400 text-sm capitalize flex items-center gap-2">
                        {method.platform}
                        {method.type === 'external' && (
                          <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">External</span>
                        )}
                        {(method.type === 'payid' || method.type === 'bank') && (
                          <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">Modal</span>
                        )}
                      </div>
                      {method.handle && (
                        <div className="text-gray-500 text-xs">{method.handle}</div>
                      )}
                      {method.details?.email && (
                        <div className="text-gray-500 text-xs">{method.details.email}</div>
                      )}
                      {method.details?.bsb && method.details?.account && (
                        <div className="text-gray-500 text-xs">BSB: {method.details.bsb}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <motion.button
                      onClick={() => handleEditMethod(method)}
                      className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Edit wallet method"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </motion.button>
                    <motion.button
                      onClick={() => handleDeleteMethod(method.id)}
                      className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Delete wallet method"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        
          {isAddingMethod && (
            <motion.div 
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full" />
                Add Wallet Method
              </h3>
              {renderMethodForm(
                newMethod,
                setNewMethod,
                handleAddMethod,
                () => setIsAddingMethod(false)
              )}
            </motion.div>
          )}
        
          {walletMethods.length === 0 && !isAddingMethod && (
            <motion.div 
              className="text-center py-16 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex flex-col items-center gap-6 text-gray-400 max-w-sm">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl flex items-center justify-center border border-white/10">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h11M9 21V3m3 18h8a2 2 0 002-2V8a2 2 0 00-2-2h-8m0 0V3a2 2 0 012-2h4a2 2 0 012 2v3m0 0h2m-2 0h-2M9 7h1m1 0h1M9 10h1m1 0h1m-5 3h1m1 0h1" />
                    </svg>
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-xl text-white mb-2">Set up your digital wallet</div>
                  <div className="text-gray-400 text-sm leading-relaxed">Add your payment methods for easy supporter access. Choose between external links and secure modal displays.</div>
                </div>
                <motion.button
                  onClick={() => setIsAddingMethod(true)}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add your first wallet method
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      ) : (
        <motion.div 
          className="text-center py-16 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center gap-6 text-gray-500">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-600/20 to-gray-700/20 rounded-3xl flex items-center justify-center border border-white/5">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h11M9 21V3m3 18h8a2 2 0 002-2V8a2 2 0 00-2-2h-8m0 0V3a2 2 0 012-2h4a2 2 0 012 2v3m0 0h2m-2 0h-2M9 7h1m1 0h1M9 10h1m1 0h1m-5 3h1m1 0h1" />
              </svg>
            </div>
            <div className="text-center">
              <div className="font-semibold text-lg text-gray-300 mb-2">Digital Wallet Hidden</div>
              <div className="text-gray-500 text-sm">Toggle the switch above to show this section</div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
