/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Profile Editor Features
 * Component: Empty Profile Tutorial - Onboarding help component
 * Features: Interactive tutorial with step-by-step guidance
 */
'use client'

import { motion } from 'framer-motion'

interface EmptyProfileTutorialProps {
  onAddSocialLink: () => void
  onAddPaymentMethod: () => void
  onAddGoal: () => void
}

export function EmptyProfileTutorial({ 
  onAddSocialLink, 
  onAddPaymentMethod, 
  onAddGoal 
}: EmptyProfileTutorialProps) {
  const steps = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.1a3 3 0 004.243-4.243c-.5-.5-1.122-.707-1.707-.707H12a4 4 0 01-4-4c0-.585.207-1.207.707-1.707l2.122-2.121a4 4 0 015.656 0z" />
        </svg>
      ),
      title: "Add Social Links",
      description: "Connect your social media accounts to build your online presence",
      action: onAddSocialLink,
      buttonText: "Add Social Link",
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      title: "Set Up Payments",
      description: "Add payment methods so supporters can send you tips and donations",
      action: onAddPaymentMethod,
      buttonText: "Add Payment Method",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Create Goals",
      description: "Set fundraising goals and track your progress publicly",
      action: onAddGoal,
      buttonText: "Create Goal",
      color: "from-purple-500 to-pink-500"
    }
  ]

  return (
    <motion.div 
      className="relative bg-black/40 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Gradient accent overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-orange-500/5 rounded-3xl pointer-events-none" />
      
      {/* Floating accent elements */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-yellow-400/30 rounded-full animate-pulse" />
      <div className="absolute bottom-6 left-6 w-1 h-1 bg-orange-400/40 rounded-full animate-pulse delay-150" />

      {/* Header */}
      <div className="text-center mb-12">
        <div className="relative inline-block">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-3xl flex items-center justify-center border border-white/10 mb-6 mx-auto">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">
          Let&apos;s build your profile!
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Get started by adding some content to your profile. Here are the essential steps to create an engaging creator profile.
        </p>
      </div>

      {/* Steps grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
          >
            {/* Step number */}
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-r from-white to-gray-200 rounded-full flex items-center justify-center text-black text-sm font-bold border-2 border-black">
              {index + 1}
            </div>

            {/* Icon */}
            <div className={`w-14 h-14 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center text-white mb-4`}>
              {step.icon}
            </div>

            {/* Content */}
            <div className="space-y-4">
              <div>
                <h3 className="text-white font-semibold text-xl mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </div>

              {/* Action button */}
              <motion.button
                onClick={step.action}
                className={`w-full bg-gradient-to-r ${step.color} hover:shadow-lg text-white px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                {step.buttonText}
              </motion.button>
            </div>

            {/* Hover effect overlay */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </motion.div>
        ))}
      </div>

      {/* Bottom tip */}
      <motion.div 
        className="mt-12 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h4 className="text-white font-semibold text-lg mb-2">Pro Tip</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              Complete all three steps to create a professional profile that converts visitors into supporters. 
              You can always edit and customize everything later!
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
