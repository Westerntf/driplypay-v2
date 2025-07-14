/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Profile Editor Features
 * Component: Editable Goals - Progress tracking section
 * Features: Goal management with progress bars and description editing
 */
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

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

interface Goal {
  id: string
  title: string
  description?: string
  target: number
  current: number
  currency?: string
  payment_method_id?: string
}

interface PaymentMethod {
  id: string
  type: string
  display_name: string
  url: string
}

interface EditableGoalsProps {
  goals: Goal[]
  themeStyles: ThemeStyles
  onUpdate: (goals: Goal[]) => void
  isVisible: boolean
  onToggleVisibility: () => void
  paymentMethods?: PaymentMethod[]
}

export function EditableGoals({ 
  goals, 
  themeStyles, 
  onUpdate, 
  isVisible, 
  onToggleVisibility,
  paymentMethods = []
}: EditableGoalsProps) {
  const [isAddingGoal, setIsAddingGoal] = useState(false)
  const [editingGoal, setEditingGoal] = useState<string | null>(null)
  const [newGoal, setNewGoal] = useState({ title: '', description: '', target: 0, current: 0, currency: 'USD', payment_method_id: '' })
  const [editingValues, setEditingValues] = useState<any>({})

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.target > 0) {
      onUpdate([...goals, { ...newGoal, id: Date.now().toString() }])
      setNewGoal({ title: '', description: '', target: 0, current: 0, currency: 'USD', payment_method_id: '' })
      setIsAddingGoal(false)
    }
  }

  const handleDeleteGoal = (id: string) => {
    onUpdate(goals.filter(goal => goal.id !== id))
  }

  const handleEditGoal = (goal: Goal) => {
    setEditingGoal(goal.id)
    setEditingValues({
      title: goal.title || '',
      description: goal.description || '',
      target: goal.target || 0,
      current: goal.current || 0,
      currency: goal.currency || 'USD'
    })
  }

  const handleSaveGoalEdit = (id: string) => {
    const updatedGoals = goals.map(goal => 
      goal.id === id ? { ...goal, ...editingValues } : goal
    )
    onUpdate(updatedGoals)
    setEditingGoal(null)
    setEditingValues({})
  }

  const handleCancelGoalEdit = () => {
    setEditingGoal(null)
    setEditingValues({})
  }

  const getProgressPercentage = (current: number, target: number) => {
    // Handle undefined, null, or NaN values
    const safeCurrent = (current && !isNaN(current)) ? current : 0
    const safeTarget = (target && !isNaN(target) && target > 0) ? target : 1
    return Math.min((safeCurrent / safeTarget) * 100, 100)
  }

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    // Handle undefined, null, or NaN values
    const safeAmount = (amount && !isNaN(amount)) ? amount : 0
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(safeAmount)
  }

  return (
    <motion.div 
      className={`relative bg-black/40 backdrop-blur-sm rounded-3xl p-6 lg:p-8 border border-white/10 transition-all duration-300 hover:border-white/20 min-h-[400px] ${!isVisible ? 'opacity-50' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Gradient accent overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-3xl pointer-events-none" />
      
      {/* Floating accent elements */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse delay-200" />
      <div className="absolute bottom-6 left-6 w-1 h-1 bg-purple-400/40 rounded-full animate-pulse delay-400" />

      {/* Header */}
      <div className="relative flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="relative">
            <h2 className="text-lg font-bold text-white tracking-tight">Goals</h2>
            <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
          </div>
          <motion.button
            onClick={onToggleVisibility}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ${
              isVisible ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={`${isVisible ? 'Hide' : 'Show'} Goals section`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
              isVisible ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </motion.button>
        </div>
        {isVisible && (
          <motion.button
            onClick={() => setIsAddingGoal(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-white transition-all duration-300 hover:scale-105"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="text-xs font-medium">Add Goal</span>
          </motion.button>
        )}
      </div>
      
      {isVisible ? (
        <div className="space-y-6">
          {goals.map((goal, index) => (
            <motion.div 
              key={goal.id} 
              className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              {editingGoal === goal.id ? (
                // Edit form
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Goal title"
                    value={editingValues.title}
                    onChange={(e) => setEditingValues({ ...editingValues, title: e.target.value })}
                    className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300"
                  />
                  <textarea
                    placeholder="Goal description"
                    value={editingValues.description}
                    onChange={(e) => setEditingValues({ ...editingValues, description: e.target.value })}
                    className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300 resize-none"
                    rows={3}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      placeholder="Current amount"
                      value={editingValues.current}
                      onChange={(e) => setEditingValues({ ...editingValues, current: Number(e.target.value) })}
                      className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300"
                    />
                    <input
                      type="number"
                      placeholder="Target amount"
                      value={editingValues.target}
                      onChange={(e) => setEditingValues({ ...editingValues, target: Number(e.target.value) })}
                      className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <select
                      value={editingValues.currency}
                      onChange={(e) => setEditingValues({ ...editingValues, currency: e.target.value })}
                      className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300"
                      title="Currency selection"
                      aria-label="Currency selection"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="CAD">CAD ($)</option>
                    </select>
                    <select
                      value={editingValues.payment_method_id || ''}
                      onChange={(e) => setEditingValues({ ...editingValues, payment_method_id: e.target.value })}
                      className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300"
                      title="Payment method selection"
                      aria-label="Payment method selection"
                    >
                      <option value="">Select payment method</option>
                      {paymentMethods.map((method) => (
                        <option key={method.id} value={method.id}>
                          {method.display_name} ({method.type})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-3">
                    <motion.button
                      onClick={() => handleSaveGoalEdit(goal.id)}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2.5 rounded-xl font-medium transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Save
                    </motion.button>
                    <motion.button
                      onClick={handleCancelGoalEdit}
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
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
                        <h3 className="text-white font-semibold text-lg">{goal.title}</h3>
                      </div>
                      {goal.description && (
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">{goal.description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <motion.button
                        onClick={() => handleEditGoal(goal)}
                        className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Edit goal"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </motion.button>
                      <motion.button
                        onClick={() => handleDeleteGoal(goal.id)}
                        className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Delete goal"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </motion.button>
                    </div>
                  </div>

                  {/* Progress section */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white font-medium">
                        {formatCurrency(goal.current, goal.currency)} / {formatCurrency(goal.target, goal.currency)}
                      </span>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${getProgressPercentage(goal.current, goal.target)}%` }}
                        transition={{ duration: 1, delay: index * 0.2, ease: "easeOut" }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full" />
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">
                        {getProgressPercentage(goal.current, goal.target).toFixed(1)}% complete
                      </span>
                      <span className="text-gray-500">
                        {formatCurrency(goal.target - goal.current, goal.currency)} remaining
                      </span>
                    </div>
                  </div>

                  {/* Preferred payment method */}
                  {goal.payment_method_id && (
                    <div className="mt-4 p-3 bg-white/5 rounded-xl border border-white/10">
                      {(() => {
                        const method = paymentMethods.find(m => m.id === goal.payment_method_id)
                        return method ? (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                                </svg>
                              </div>
                              <div>
                                <p className="text-white text-sm font-medium">{method.display_name}</p>
                                <p className="text-gray-400 text-xs">Preferred payment method • {method.type}</p>
                              </div>
                            </div>
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                              <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-red-400 text-sm font-medium">Payment method not found</p>
                              <p className="text-gray-500 text-xs">Please select a valid payment method</p>
                            </div>
                          </div>
                        )
                      })()}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        
          {isAddingGoal && (
            <motion.div 
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full" />
                Add New Goal
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Goal title"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300"
                />
                <textarea
                  placeholder="Goal description (optional)"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                  className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300 resize-none"
                  rows={3}
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    placeholder="Current amount"
                    value={newGoal.current}
                    onChange={(e) => setNewGoal({ ...newGoal, current: Number(e.target.value) })}
                    className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300"
                  />
                  <input
                    type="number"
                    placeholder="Target amount"
                    value={newGoal.target}
                    onChange={(e) => setNewGoal({ ...newGoal, target: Number(e.target.value) })}
                    className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={newGoal.currency}
                    onChange={(e) => setNewGoal({ ...newGoal, currency: e.target.value })}
                    className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300"
                    title="Currency selection"
                    aria-label="Currency selection"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="CAD">CAD ($)</option>
                  </select>
                  <select
                    value={newGoal.payment_method_id}
                    onChange={(e) => setNewGoal({ ...newGoal, payment_method_id: e.target.value })}
                    className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300"
                    title="Payment method selection"
                    aria-label="Payment method selection"
                  >
                    <option value="">Select payment method</option>
                    {paymentMethods.map((method) => (
                      <option key={method.id} value={method.id}>
                        {method.display_name} ({method.type})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-3">
                  <motion.button
                    onClick={handleAddGoal}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Add Goal
                  </motion.button>
                  <motion.button
                    onClick={() => setIsAddingGoal(false)}
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
        
          {goals.length === 0 && !isAddingGoal && (
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-xl text-white mb-2">Set your goals</div>
                  <div className="text-gray-400 text-sm leading-relaxed">Track fundraising goals and show your progress to supporters.</div>
                </div>
                <motion.button
                  onClick={() => setIsAddingGoal(true)}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create your first goal
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="text-center">
              <div className="font-semibold text-lg text-gray-300 mb-2">Goals Section Hidden</div>
              <div className="text-gray-500 text-sm">Toggle the switch above to show this section</div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
