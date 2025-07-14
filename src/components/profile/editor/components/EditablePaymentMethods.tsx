/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Profile Editor Features
 * Component: Editable Payment Methods - Support Me Section
 * Features: Add, edit, delete payment methods with modern design
 */
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PaymentIcon } from '@/components/icons'

interface ThemeStyles {
  background: string
  accent: string
  accentBackground: string
  card: string
  button: string
  iconBackground: string
  text: string
  accent_text: string
}

interface PaymentMethod {
  id: string
  type: string
  name: string
  url: string
  preferred?: boolean
  label?: string
  handle?: string
}

interface EditablePaymentMethodsProps {
  paymentMethods: PaymentMethod[]
  themeStyles: ThemeStyles
  onUpdate: (methods: PaymentMethod[]) => void
  isVisible: boolean
  onToggleVisibility: () => void
}

export function EditablePaymentMethods({ 
  paymentMethods, 
  themeStyles, 
  onUpdate, 
  isVisible, 
  onToggleVisibility 
}: EditablePaymentMethodsProps) {
  const [isAddingMethod, setIsAddingMethod] = useState(false)
  const [editingMethod, setEditingMethod] = useState<string | null>(null)
  const [newMethod, setNewMethod] = useState({ type: '', name: '', url: '', preferred: false })
  const [editingValues, setEditingValues] = useState<any>({})

  const handleAddMethod = () => {
    if (newMethod.type && newMethod.name && newMethod.url) {
      onUpdate([...paymentMethods, { ...newMethod, id: Date.now().toString() }])
      setNewMethod({ type: '', name: '', url: '', preferred: false })
      setIsAddingMethod(false)
    }
  }

  const handleDeleteMethod = (id: string) => {
    onUpdate(paymentMethods.filter(method => method.id !== id))
  }

  const handleEditMethod = (method: PaymentMethod) => {
    setEditingMethod(method.id)
    setEditingValues({
      type: method.type || '',
      name: method.name || '',
      url: method.url || '',
      preferred: method.preferred || false
    })
  }

  const handleSaveMethodEdit = (id: string) => {
    const updatedMethods = paymentMethods.map(method => 
      method.id === id ? { ...method, ...editingValues } : method
    )
    onUpdate(updatedMethods)
    setEditingMethod(null)
    setEditingValues({})
  }

  const handleCancelMethodEdit = () => {
    setEditingMethod(null)
    setEditingValues({})
  }

  return (
    <motion.div 
      className={`relative bg-black/40 backdrop-blur-sm rounded-3xl p-6 lg:p-8 border border-white/10 transition-all duration-300 hover:border-white/20 min-h-[400px] ${!isVisible ? 'opacity-50' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {/* Gradient accent overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-3xl pointer-events-none" />
      
      {/* Floating accent elements */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse delay-150" />
      <div className="absolute bottom-6 left-6 w-1 h-1 bg-purple-400/40 rounded-full animate-pulse delay-300" />
      <div className="absolute bottom-6 left-6 w-1 h-1 bg-blue-400/40 rounded-full animate-pulse delay-300" />

      {/* Header */}
      <div className="relative flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="relative">
            <h2 className="text-lg font-bold text-white tracking-tight whitespace-nowrap">Payments</h2>
            <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
          </div>
          <motion.button
            onClick={onToggleVisibility}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ${
              isVisible ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={`${isVisible ? 'Hide' : 'Show'} Support Me section`}
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
            <span className="text-xs font-medium whitespace-nowrap">Add Payment</span>
          </motion.button>
        )}
      </div>
      
      {isVisible ? (
        <div className="space-y-4">
          {paymentMethods.map((method, index) => (
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
                <div className="space-y-4">
                  <select
                    value={editingValues.type}
                    onChange={(e) => setEditingValues({ ...editingValues, type: e.target.value })}
                    className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300 [&>option]:bg-gray-900 [&>option]:text-white"
                    aria-label="Payment method type"
                  >
                    <option value="" className="bg-gray-900 text-white">Select type</option>
                    <option value="paypal" className="bg-gray-900 text-white">PayPal</option>
                    <option value="cashapp" className="bg-gray-900 text-white">Cash App</option>
                    <option value="venmo" className="bg-gray-900 text-white">Venmo</option>
                    <option value="stripe" className="bg-gray-900 text-white">Stripe</option>
                    <option value="custom" className="bg-gray-900 text-white">Custom</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Display name"
                    value={editingValues.name}
                    onChange={(e) => setEditingValues({ ...editingValues, name: e.target.value })}
                    className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300"
                  />
                  <input
                    type="text"
                    placeholder="URL or handle"
                    value={editingValues.url}
                    onChange={(e) => setEditingValues({ ...editingValues, url: e.target.value })}
                    className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300"
                  />
                  <div className="flex gap-3">
                    <motion.button
                      onClick={() => handleSaveMethodEdit(method.id)}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2.5 rounded-xl font-medium transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Save
                    </motion.button>
                    <motion.button
                      onClick={handleCancelMethodEdit}
                      className="flex-1 bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl font-medium transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Cancel
                    </motion.button>
                  </div>
                </div>
              ) : (
                // Display view
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center border border-white/10">
                        <PaymentIcon 
                          type={method.type} 
                          className="w-6 h-6 text-white" 
                          size={24}
                        />
                      </div>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full border-2 border-black" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-semibold text-lg">{method.name}</div>
                      <div className="text-gray-400 text-sm capitalize">{method.type}</div>
                      {method.url && (
                        <div className="text-gray-500 text-xs truncate max-w-[200px]">{method.url}</div>
                      )}
                      {method.handle && (
                        <div className="text-gray-500 text-xs">@{method.handle}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <motion.button
                      onClick={() => handleEditMethod(method)}
                      className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Edit payment method"
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
                      title="Delete payment method"
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
                Add Payment Method
              </h3>
              <div className="space-y-4">
                <select
                  value={newMethod.type}
                  onChange={(e) => setNewMethod({ ...newMethod, type: e.target.value })}
                  className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300 [&>option]:bg-gray-900 [&>option]:text-white"
                  aria-label="Payment method type"
                >
                  <option value="" className="bg-gray-900 text-white">Select type</option>
                  <option value="paypal" className="bg-gray-900 text-white">PayPal</option>
                  <option value="cashapp" className="bg-gray-900 text-white">Cash App</option>
                  <option value="venmo" className="bg-gray-900 text-white">Venmo</option>
                  <option value="stripe" className="bg-gray-900 text-white">Stripe</option>
                  <option value="custom" className="bg-gray-900 text-white">Custom</option>
                </select>
                <input
                  type="text"
                  placeholder="Display name"
                  value={newMethod.name}
                  onChange={(e) => setNewMethod({ ...newMethod, name: e.target.value })}
                  className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300"
                />
                <input
                  type="text"
                  placeholder="URL or handle"
                  value={newMethod.url}
                  onChange={(e) => setNewMethod({ ...newMethod, url: e.target.value })}
                  className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300"
                />
                <div className="flex gap-3">
                  <motion.button
                    onClick={handleAddMethod}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Add Payment
                  </motion.button>
                  <motion.button
                    onClick={() => setIsAddingMethod(false)}
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        
          {paymentMethods.length === 0 && !isAddingMethod && (
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-xl text-white mb-2">Add payment methods</div>
                  <div className="text-gray-400 text-sm leading-relaxed">Let supporters send you tips and donations through your preferred payment platforms.</div>
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
                  Add your first payment method
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="text-center">
              <div className="font-semibold text-lg text-gray-300 mb-2">Support Me Section Hidden</div>
              <div className="text-gray-500 text-sm">Toggle the switch above to show this section</div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
