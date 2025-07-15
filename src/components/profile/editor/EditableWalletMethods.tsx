/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Profile Editor Features
 * Component: Editable wallet methods for profile editor
 * Features: Dashboard-style design, add/edit/delete wallet methods, external vs internal payment types
 */
'use client'

import { useState } from 'react'
import { Wallet, Plus, Edit2, Trash2, ExternalLink, Copy, Phone, Mail, CreditCard } from 'lucide-react'
import { PaymentIcon } from '@/components/icons'
import toast from 'react-hot-toast'

interface WalletMethod {
  id: string
  type: 'external' | 'payid' | 'bank'
  platform: string
  name: string
  handle?: string
  url?: string
  details?: {
    email?: string
    phone?: string
    bsb?: string
    account?: string
  }
  enabled: boolean
  order_index: number
}

interface EditableWalletMethodsProps {
  walletMethods: WalletMethod[]
  onUpdate: (methods: WalletMethod[]) => void
  themeStyles?: any
  isVisible?: boolean
  onToggleVisibility?: () => void
}

const EXTERNAL_PLATFORMS = [
  { value: 'venmo', label: 'Venmo' },
  { value: 'cashapp', label: 'CashApp' },
  { value: 'paypal', label: 'PayPal' },
  { value: 'zelle', label: 'Zelle' },
  { value: 'revolut', label: 'Revolut' },
  { value: 'custom', label: 'Custom Link' }
]

const INTERNAL_PLATFORMS = [
  { value: 'payid', label: 'PayID' },
  { value: 'bank', label: 'Bank Transfer' }
]

export function EditableWalletMethods({ walletMethods, onUpdate, themeStyles, isVisible = true, onToggleVisibility }: EditableWalletMethodsProps) {
  const [isAddingMethod, setIsAddingMethod] = useState(false)
  const [editingMethod, setEditingMethod] = useState<WalletMethod | null>(null)
  const [newMethodType, setNewMethodType] = useState<'external' | 'payid' | 'bank'>('external')

  // Add new wallet method
  const handleAddMethod = () => {
    const newMethod: WalletMethod = {
      id: `temp-${Date.now()}`,
      type: newMethodType,
      platform: newMethodType === 'external' ? 'venmo' : newMethodType,
      name: '',
      handle: '',
      url: '',
      details: {},
      enabled: true,
      order_index: walletMethods.length
    }
    setEditingMethod(newMethod)
    setIsAddingMethod(true)
  }

  // Save method (add or edit)
  const handleSaveMethod = (method: WalletMethod) => {
    if (!method.name.trim()) {
      toast.error('Method name is required')
      return
    }

    if (method.type === 'external' && !method.url?.trim()) {
      toast.error('URL is required for external payment methods')
      return
    }

    if (method.type === 'payid' && !method.details?.email && !method.details?.phone) {
      toast.error('Email or phone is required for PayID')
      return
    }

    if (method.type === 'bank' && (!method.details?.bsb || !method.details?.account)) {
      toast.error('BSB and account number are required for bank transfer')
      return
    }

    let updatedMethods
    if (isAddingMethod) {
      updatedMethods = [...walletMethods, { ...method, id: `new-${Date.now()}` }]
    } else {
      updatedMethods = walletMethods.map(m => m.id === method.id ? method : m)
    }

    onUpdate(updatedMethods)
    setEditingMethod(null)
    setIsAddingMethod(false)
    toast.success(isAddingMethod ? 'Wallet method added' : 'Wallet method updated')
  }

  // Delete method
  const handleDeleteMethod = (methodId: string) => {
    const updatedMethods = walletMethods.filter(m => m.id !== methodId)
    onUpdate(updatedMethods)
    toast.success('Wallet method removed')
  }

  // Toggle enabled
  const handleToggleEnabled = (methodId: string) => {
    const updatedMethods = walletMethods.map(method =>
      method.id === methodId ? { ...method, enabled: !method.enabled } : method
    )
    onUpdate(updatedMethods)
  }

  // Render method form
  const renderMethodForm = (method: WalletMethod) => {
    return (
      <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 space-y-6">
        {/* Method Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">Payment Type</label>
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setNewMethodType('external')}
              className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                method.type === 'external'
                  ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                  : 'border-gray-600 bg-gray-700/50 text-gray-300 hover:border-gray-500'
              }`}
            >
              <ExternalLink className="w-4 h-4 mx-auto mb-1" />
              External Link
            </button>
            <button
              type="button"
              onClick={() => setNewMethodType('payid')}
              className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                method.type === 'payid'
                  ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                  : 'border-gray-600 bg-gray-700/50 text-gray-300 hover:border-gray-500'
              }`}
            >
              <Mail className="w-4 h-4 mx-auto mb-1" />
              PayID
            </button>
            <button
              type="button"
              onClick={() => setNewMethodType('bank')}
              className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                method.type === 'bank'
                  ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                  : 'border-gray-600 bg-gray-700/50 text-gray-300 hover:border-gray-500'
              }`}
            >
              <CreditCard className="w-4 h-4 mx-auto mb-1" />
              Bank Transfer
            </button>
          </div>
        </div>

        {/* Platform Selection (for external) */}
        {method.type === 'external' && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Platform</label>
            <select
              value={method.platform}
              onChange={(e) => setEditingMethod({ ...method, platform: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-label="Select payment platform"
            >
              {EXTERNAL_PLATFORMS.map(platform => (
                <option key={platform.value} value={platform.value}>
                  {platform.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Method Name */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Display Name</label>
          <input
            type="text"
            value={method.name}
            onChange={(e) => setEditingMethod({ ...method, name: e.target.value })}
            placeholder="e.g., My Venmo, PayID, Bank Account"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* External Payment Fields */}
        {method.type === 'external' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Handle/Username</label>
              <input
                type="text"
                value={method.handle || ''}
                onChange={(e) => setEditingMethod({ ...method, handle: e.target.value })}
                placeholder="@username or $handle"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Payment URL</label>
              <input
                type="url"
                value={method.url || ''}
                onChange={(e) => setEditingMethod({ ...method, url: e.target.value })}
                placeholder="https://venmo.com/u/username"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </>
        )}

        {/* PayID Fields */}
        {method.type === 'payid' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={method.details?.email || ''}
                onChange={(e) => setEditingMethod({ 
                  ...method, 
                  details: { ...method.details, email: e.target.value }
                })}
                placeholder="your@email.com"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
              <input
                type="tel"
                value={method.details?.phone || ''}
                onChange={(e) => setEditingMethod({ 
                  ...method, 
                  details: { ...method.details, phone: e.target.value }
                })}
                placeholder="+61 400 123 456"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Bank Transfer Fields */}
        {method.type === 'bank' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">BSB</label>
              <input
                type="text"
                value={method.details?.bsb || ''}
                onChange={(e) => setEditingMethod({ 
                  ...method, 
                  details: { ...method.details, bsb: e.target.value }
                })}
                placeholder="123-456"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Account Number</label>
              <input
                type="text"
                value={method.details?.account || ''}
                onChange={(e) => setEditingMethod({ 
                  ...method, 
                  details: { ...method.details, account: e.target.value }
                })}
                placeholder="987654321"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={() => handleSaveMethod(method)}
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            {isAddingMethod ? 'Add Method' : 'Save Changes'}
          </button>
          <button
            onClick={() => {
              setEditingMethod(null)
              setIsAddingMethod(false)
            }}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-900/50 rounded-xl border border-gray-700 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center">
            <Wallet className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Digital Wallet</h3>
            <p className="text-sm text-gray-400">Manage your payment methods</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {onToggleVisibility && (
            <button
              onClick={onToggleVisibility}
              className={`p-2 rounded-lg transition-colors ${
                isVisible 
                  ? 'text-blue-400 hover:text-blue-300 hover:bg-blue-900/20' 
                  : 'text-gray-400 hover:text-gray-300 hover:bg-gray-700'
              }`}
              title={isVisible ? 'Hide wallet section' : 'Show wallet section'}
            >
              {isVisible ? '👁️' : '👁️‍🗨️'}
            </button>
          )}
          <button
            onClick={handleAddMethod}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Method
          </button>
        </div>
      </div>

      {/* Content - only show if visible */}
      {isVisible && (
        <>
          {/* Methods List */}
          <div className="space-y-4">
        {walletMethods.map((method) => (
          <div
            key={method.id}
            className="bg-gray-800/50 rounded-xl border border-gray-700 p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gray-700 flex items-center justify-center">
                <PaymentIcon type={method.platform} className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-white">{method.name}</h4>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="capitalize">{method.type}</span>
                  {method.handle && (
                    <>
                      <span>•</span>
                      <span>{method.handle}</span>
                    </>
                  )}
                  {method.type === 'external' && (
                    <ExternalLink className="w-3 h-3" />
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Enable/Disable Toggle */}
              <button
                onClick={() => handleToggleEnabled(method.id)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  method.enabled ? 'bg-blue-600' : 'bg-gray-600'
                }`}
                aria-label={method.enabled ? 'Disable payment method' : 'Enable payment method'}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    method.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>

              {/* Edit Button */}
              <button
                onClick={() => setEditingMethod(method)}
                className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-700 rounded-lg transition-colors"
                title="Edit method"
              >
                <Edit2 className="w-4 h-4" />
              </button>

              {/* Delete Button */}
              <button
                onClick={() => handleDeleteMethod(method.id)}
                className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
                title="Delete method"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {walletMethods.length === 0 && !editingMethod && (
          <div className="text-center py-8 text-gray-400">
            <Wallet className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No payment methods added yet</p>
            <p className="text-sm">Add your first payment method to get started</p>
          </div>
        )}
      </div>

      {/* Edit/Add Form */}
      {editingMethod && (
        <div className="mt-6">
          {renderMethodForm(editingMethod)}
        </div>
      )}
        </>
      )}
    </div>
  )
}
