/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Public Profile Features
 * Component: Enhanced goals display with progress tracking and achievements
 * Features: Progress visualization, achievement cards, motivational design
 */
'use client'

import { Target, TrendingUp, Star, ExternalLink, Award } from 'lucide-react'
import { PaymentIcon } from '@/components/icons'
import './animations.css'

interface Goal {
  id: string
  title: string
  description?: string
  target_amount: number
  current_amount: number
  payment_method_id?: string
  [key: string]: any
}

interface PaymentMethod {
  id: string
  type: string
  label?: string
  name?: string
  url: string
}

interface PublicGoalsProps {
  goals: Goal[]
  paymentMethods?: PaymentMethod[]
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

function formatCurrency(cents: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(cents / 100)
}

export function PublicGoals({ goals, paymentMethods = [], themeStyles }: PublicGoalsProps) {
  if (!goals || goals.length === 0) {
    return null
  }

  // Helper function to get payment method by ID
  const getPaymentMethod = (id: string) => {
    return paymentMethods.find(method => method.id === id)
  }

  // Helper function to get progress percentage
  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100)
  }

  // Helper function to check if goal is achieved
  const isGoalAchieved = (current: number, target: number) => {
    return current >= target
  }

  return (
    <div className="relative">
      {/* Enhanced Goals Container */}
      <div className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-xl ${themeStyles.card} p-6 sm:p-8`}>
        {/* Gradient Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
        <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${themeStyles.accent} opacity-10 rounded-full blur-3xl`} />
        <div className={`absolute -bottom-20 -left-20 w-32 h-32 bg-gradient-to-tr ${themeStyles.accent} opacity-5 rounded-full blur-2xl`} />
        
        <div className="relative z-10">
          {/* Header Section */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${themeStyles.accent} p-0.5`}>
                <div className="w-full h-full rounded-2xl bg-black/80 flex items-center justify-center backdrop-blur-sm">
                  <Target className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Goals</h2>
                <p className="text-sm text-gray-400">Track progress and achievements</p>
              </div>
            </div>
          </div>

          {/* Goals List */}
          <div className="space-y-4">
            {goals.map((goal, index) => {
              const progressPercentage = getProgressPercentage(goal.current_amount, goal.target_amount)
              const isAchieved = isGoalAchieved(goal.current_amount, goal.target_amount)
              
              return (
                <div
                  key={goal.id}
                  className={`goal-item group relative overflow-hidden rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 bg-gradient-to-r from-white/5 to-transparent backdrop-blur-sm hover:scale-[1.01] hover:shadow-2xl ${themeStyles.card} animate-fadeInUp`}
                >
                  {/* Achievement Badge */}
                  {isAchieved && (
                    <div className="absolute top-4 right-4 z-20">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${themeStyles.accent} flex items-center justify-center`}>
                        <Award className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}

                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${themeStyles.accent} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  <div className="relative p-6">
                    {/* Goal Header */}
                    <div className="mb-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className={`text-lg font-semibold text-white group-hover:${themeStyles.accent_text} transition-colors mb-1`}>
                            {goal.title}
                          </h3>
                          {goal.description && (
                            <p className="text-gray-400 text-sm leading-relaxed">
                              {goal.description}
                            </p>
                          )}
                        </div>
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg bg-gradient-to-r ${themeStyles.accent} bg-opacity-20`}>
                          <TrendingUp className="w-4 h-4 text-white" />
                          <span className="text-white text-xs font-medium">
                            {Math.round(progressPercentage)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Section */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-400 text-sm font-medium">Progress</span>
                        <span className="text-white font-semibold">
                          {formatCurrency(goal.current_amount)} / {formatCurrency(goal.target_amount)}
                        </span>
                      </div>
                      
                      {/* Enhanced Progress Bar */}
                      <div className="relative">
                        <div className="w-full bg-gray-800/50 rounded-full h-3 overflow-hidden">
                          {/* Progress bar requires dynamic width calculation */}
                          <div 
                            className={`h-full bg-gradient-to-r ${themeStyles.accent} transition-all duration-700 ease-out relative overflow-hidden`}
                            style={{ width: `${progressPercentage}%` }}
                          >
                            {/* Progress bar shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-pulse" />
                          </div>
                        </div>
                        
                        {/* Progress Milestone Indicators */}
                        <div className="absolute -top-1 w-full h-5 flex justify-between items-center px-1">
                          {[25, 50, 75].map((milestone) => (
                            <div
                              key={milestone}
                              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                                progressPercentage >= milestone 
                                  ? `bg-gradient-to-r ${themeStyles.accent}` 
                                  : 'bg-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Remaining Amount */}
                      {!isAchieved && (
                        <div className="mt-2 text-center">
                          <span className="text-gray-400 text-xs">
                            {formatCurrency(goal.target_amount - goal.current_amount)} remaining
                          </span>
                        </div>
                      )}

                      {/* Achievement Message */}
                      {isAchieved && (
                        <div className="mt-2 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span className="text-yellow-400 text-sm font-medium">Goal Achieved!</span>
                            <Star className="w-4 h-4 text-yellow-400" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Preferred Payment Method */}
                    {goal.payment_method_id && getPaymentMethod(goal.payment_method_id) && (
                      <div className="pt-4 border-t border-white/10">
                        <div className="text-sm text-gray-400 mb-3 flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          <span>Preferred contribution method</span>
                        </div>
                        <a
                          href={getPaymentMethod(goal.payment_method_id)?.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/payment flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-white/5 to-white/2 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02]"
                        >
                          {/* Payment Method Icon */}
                          <div className={`relative w-10 h-10 rounded-lg bg-gradient-to-r ${themeStyles.accent} p-0.5 group-hover/payment:scale-110 transition-transform duration-300`}>
                            <div className="w-full h-full rounded-lg bg-black/80 flex items-center justify-center backdrop-blur-sm">
                              <PaymentIcon 
                                type={getPaymentMethod(goal.payment_method_id)?.type || 'custom'} 
                                className="w-5 h-5 text-white" 
                              />
                            </div>
                          </div>
                          
                          {/* Payment Method Info */}
                          <div className="flex-1 text-left">
                            <div className={`text-white font-medium group-hover/payment:${themeStyles.accent_text} transition-colors`}>
                              {getPaymentMethod(goal.payment_method_id)?.label || getPaymentMethod(goal.payment_method_id)?.name}
                            </div>
                            <div className="text-gray-400 text-sm capitalize">
                              {getPaymentMethod(goal.payment_method_id)?.type} • Recommended
                            </div>
                          </div>
                          
                          {/* Contribute Button */}
                          <div className="flex items-center gap-2">
                            <div className={`px-3 py-1.5 rounded-lg bg-gradient-to-r ${themeStyles.accent} opacity-80 group-hover/payment:opacity-100 transition-opacity`}>
                              <span className="text-white text-xs font-medium">Contribute</span>
                            </div>
                            <div className="w-6 h-6 rounded-md bg-white/10 group-hover/payment:bg-white/20 flex items-center justify-center transition-colors">
                              <ExternalLink className="w-3 h-3 text-white" />
                            </div>
                          </div>
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Shine effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-out" />
                </div>
              )
            })}
          </div>

          {/* Goals Summary Footer */}
          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="flex items-center justify-center gap-2 text-gray-400">
              <Award className="w-4 h-4" />
              <span className="text-sm">
                {goals.filter(goal => isGoalAchieved(goal.current_amount, goal.target_amount)).length} of {goals.length} goals achieved
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Achievement Elements */}
      <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-gradient-to-r from-yellow-500/10 to-orange-500/10 blur-xl" />
      <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-gradient-to-r from-green-500/10 to-blue-500/10 blur-xl" />
    </div>
  )
}
