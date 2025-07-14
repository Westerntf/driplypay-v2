/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Profile Editor Features
 * Component: Section Visibility Controls - Manage what sections are visible
 * Features: Toggle visibility of profile sections with visual feedback
 */
'use client'

import { motion } from 'framer-motion'

interface SectionVisibilityState {
  socialLinksVisible: boolean
  paymentMethodsVisible: boolean
  goalsVisible: boolean
  aboutVisible: boolean
  themeVisible: boolean
}

interface SectionVisibilityControlsProps {
  visibility: SectionVisibilityState
  onToggle: (section: keyof SectionVisibilityState) => void
}

export function SectionVisibilityControls({ 
  visibility, 
  onToggle 
}: SectionVisibilityControlsProps) {
  const sections = [
    {
      key: 'socialLinksVisible' as keyof SectionVisibilityState,
      label: 'Social Links',
      description: 'Connect to your social media',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.1a3 3 0 004.243-4.243c-.5-.5-1.122-.707-1.707-.707H12a4 4 0 01-4-4c0-.585.207-1.207.707-1.707l2.122-2.121a4 4 0 015.656 0z" />
        </svg>
      ),
      color: 'from-blue-500 to-purple-500'
    },
    {
      key: 'paymentMethodsVisible' as keyof SectionVisibilityState,
      label: 'Support Me',
      description: 'Payment methods for donations',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      color: 'from-green-500 to-emerald-500'
    },
    {
      key: 'goalsVisible' as keyof SectionVisibilityState,
      label: 'Goals',
      description: 'Fundraising progress tracking',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: 'from-purple-500 to-pink-500'
    },
    {
      key: 'themeVisible' as keyof SectionVisibilityState,
      label: 'Theme',
      description: 'Customize your profile appearance',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      color: 'from-blue-500 to-cyan-500'
    }
  ]

  return (
    <motion.div 
      className="relative bg-black/40 backdrop-blur-sm rounded-3xl p-8 border border-white/10 transition-all duration-300 hover:border-white/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      {/* Gradient accent overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 rounded-3xl pointer-events-none" />
      
      {/* Floating accent elements */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-indigo-400/30 rounded-full animate-pulse delay-300" />
      <div className="absolute bottom-6 left-6 w-1 h-1 bg-purple-400/40 rounded-full animate-pulse delay-600" />

      {/* Header */}
      <div className="relative flex items-center justify-between mb-8">
        <div className="relative">
          <h2 className="text-2xl font-bold text-white tracking-tight">Section Visibility</h2>
          <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full" />
        </div>
        <div className="text-gray-400 text-sm">
          {Object.values(visibility).filter(Boolean).length} of {Object.keys(visibility).length} sections visible
        </div>
      </div>

      {/* Controls grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sections.map((section, index) => {
          const isVisible = visibility[section.key]
          
          return (
            <motion.div
              key={section.key}
              className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 ${
                isVisible ? 'border-white/20 bg-white/10' : 'border-white/10 hover:border-white/15'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  {/* Section icon */}
                  <div className={`w-12 h-12 bg-gradient-to-r ${section.color} rounded-2xl flex items-center justify-center text-white`}>
                    {section.icon}
                  </div>
                  
                  {/* Section info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-lg">{section.label}</h3>
                    <p className="text-gray-400 text-sm">{section.description}</p>
                  </div>
                </div>

                {/* Toggle switch */}
                <motion.button
                  onClick={() => onToggle(section.key)}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 ${
                    isVisible ? `bg-gradient-to-r ${section.color}` : 'bg-gray-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title={`${isVisible ? 'Hide' : 'Show'} ${section.label} section`}
                >
                  <span 
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
                      isVisible ? 'translate-x-6' : 'translate-x-1'
                    }`} 
                  />
                </motion.button>
              </div>

              {/* Status indicator */}
              <div className="flex items-center gap-2 mt-4">
                <div className={`w-2 h-2 rounded-full ${isVisible ? 'bg-green-400' : 'bg-gray-500'}`} />
                <span className={`text-xs font-medium ${isVisible ? 'text-green-400' : 'text-gray-500'}`}>
                  {isVisible ? 'Visible to visitors' : 'Hidden from visitors'}
                </span>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          )
        })}
      </div>

      {/* Quick actions */}
      <motion.div 
        className="mt-8 flex flex-wrap gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <motion.button
          onClick={() => {
            Object.keys(visibility).forEach(key => {
              onToggle(key as keyof SectionVisibilityState)
            })
          }}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl text-sm font-medium transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Show All
        </motion.button>

        <motion.button
          onClick={() => {
            Object.keys(visibility).forEach(key => {
              if (visibility[key as keyof SectionVisibilityState]) {
                onToggle(key as keyof SectionVisibilityState)
              }
            })
          }}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-medium transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M9.878 9.878l6.364-6.364" />
          </svg>
          Hide All
        </motion.button>
      </motion.div>

      {/* Pro tip */}
      <motion.div 
        className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <p className="text-gray-300 text-sm leading-relaxed">
              <span className="font-medium text-white">Tip:</span> Hidden sections won&apos;t appear on your public profile, 
              but you can always toggle them back on later. Use this to control what information visitors see.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
