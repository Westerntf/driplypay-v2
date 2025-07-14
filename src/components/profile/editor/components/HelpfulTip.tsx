/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Profile Editor Features
 * Component: Helpful Tip - Contextual help and guidance
 * Features: Floating tip component with animations
 */
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface HelpfulTipProps {
  title: string
  description: string
  type?: 'info' | 'warning' | 'success' | 'tip'
  action?: {
    text: string
    onClick: () => void
  }
  dismissible?: boolean
  onDismiss?: () => void
}

export function HelpfulTip({ 
  title, 
  description, 
  type = 'tip', 
  action, 
  dismissible = true,
  onDismiss 
}: HelpfulTipProps) {
  const [isVisible, setIsVisible] = useState(true)

  const handleDismiss = () => {
    setIsVisible(false)
    onDismiss?.()
  }

  const typeStyles = {
    info: {
      gradient: 'from-blue-500/10 to-cyan-500/10',
      border: 'border-blue-500/20',
      icon: 'text-blue-400',
      iconBg: 'from-blue-500 to-cyan-500'
    },
    warning: {
      gradient: 'from-yellow-500/10 to-orange-500/10',
      border: 'border-yellow-500/20',
      icon: 'text-yellow-400',
      iconBg: 'from-yellow-500 to-orange-500'
    },
    success: {
      gradient: 'from-green-500/10 to-emerald-500/10',
      border: 'border-green-500/20',
      icon: 'text-green-400',
      iconBg: 'from-green-500 to-emerald-500'
    },
    tip: {
      gradient: 'from-purple-500/10 to-pink-500/10',
      border: 'border-purple-500/20',
      icon: 'text-purple-400',
      iconBg: 'from-purple-500 to-pink-500'
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'info':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'warning':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        )
      case 'success':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'tip':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        )
    }
  }

  const currentStyle = typeStyles[type]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`relative bg-gradient-to-r ${currentStyle.gradient} backdrop-blur-sm rounded-2xl p-6 border ${currentStyle.border}`}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Background accent */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl pointer-events-none" />
          
          {/* Floating accent elements */}
          <div className={`absolute top-3 right-3 w-1.5 h-1.5 ${currentStyle.icon} rounded-full animate-pulse`} />

          <div className="relative flex items-start gap-4">
            {/* Icon */}
            <div className={`w-10 h-10 bg-gradient-to-r ${currentStyle.iconBg} rounded-full flex items-center justify-center flex-shrink-0 text-white`}>
              {getIcon()}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4 className="text-white font-semibold text-lg mb-2">{title}</h4>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">{description}</p>

              {/* Action buttons */}
              <div className="flex items-center gap-3">
                {action && (
                  <motion.button
                    onClick={action.onClick}
                    className={`bg-gradient-to-r ${currentStyle.iconBg} hover:shadow-lg text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {action.text}
                  </motion.button>
                )}
                
                {dismissible && (
                  <motion.button
                    onClick={handleDismiss}
                    className="text-gray-400 hover:text-white text-sm font-medium transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Dismiss
                  </motion.button>
                )}
              </div>
            </div>

            {/* Close button */}
            {dismissible && (
              <motion.button
                onClick={handleDismiss}
                className={`w-8 h-8 ${currentStyle.icon} hover:text-white rounded-lg hover:bg-white/10 flex items-center justify-center transition-all duration-300 flex-shrink-0`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Dismiss tip"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
