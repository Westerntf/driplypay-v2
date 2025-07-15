/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Profile Editor Features
 * Component: Editable Theme Selector - Theme customization section
 * Features: Theme selection with live preview and style customization
 */
'use client'

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

interface EditableThemeSelectorProps {
  selectedTheme: string
  themeStyles: ThemeStyles
  onThemeChange: (theme: string) => void
  isVisible: boolean
  onToggleVisibility: () => void
}

export function EditableThemeSelector({ 
  selectedTheme, 
  themeStyles, 
  onThemeChange, 
  isVisible, 
  onToggleVisibility 
}: EditableThemeSelectorProps) {
  const themes = [
    {
      id: 'default',
      name: 'DriplyPay',
      description: 'Brand gradient (default)',
      colors: ['#60A5FA', '#A855F7', '#3B82F6'],
      accent: '#7C3AED',
      preview: 'from-blue-400 via-purple-500 to-blue-600'
    },
    {
      id: 'theme1',
      name: 'Ocean',
      description: 'Dark blue to light blue gradient',
      colors: ['#172554', '#1D4ED8', '#93C5FD'],
      accent: '#1D4ED8',
      preview: 'from-blue-950 via-blue-700 to-blue-300'
    },
    {
      id: 'theme2',
      name: 'Neon',
      description: 'Dark pink to light purple',
      colors: ['#831843', '#9333EA', '#C084FC'],
      accent: '#9333EA',
      preview: 'from-pink-900 via-purple-600 to-purple-400'
    },
    {
      id: 'theme3',
      name: 'Luxe',
      description: 'Black to charcoal gradient',
      colors: ['#000000', '#374151', '#6B7280'],
      accent: '#374151',
      preview: 'from-black via-gray-800 to-gray-600'
    }
  ]

  return (
    <motion.div 
      className={`relative bg-black/40 backdrop-blur-sm rounded-3xl p-8 border border-white/10 transition-all duration-300 hover:border-white/20 ${!isVisible ? 'opacity-50' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {/* Gradient accent overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 rounded-3xl pointer-events-none" />
      
      {/* Floating accent elements */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse delay-250" />
      <div className="absolute bottom-6 left-6 w-1 h-1 bg-cyan-400/40 rounded-full animate-pulse delay-500" />

      {/* Header */}
      <div className="relative flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="relative">
            <h2 className="text-2xl font-bold text-white tracking-tight">Theme</h2>
            <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full" />
          </div>
          <motion.button
            onClick={onToggleVisibility}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ${
              isVisible ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-gray-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={`${isVisible ? 'Hide' : 'Show'} Theme section`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
              isVisible ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </motion.button>
        </div>
      </div>
      
      {isVisible ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {themes.map((theme, index) => (
              <motion.button
                key={theme.id}
                onClick={() => onThemeChange(theme.id)}
                className={`relative group p-8 rounded-2xl border-2 transition-all duration-300 ${
                  selectedTheme === theme.id
                    ? 'border-blue-400 bg-blue-500/10' 
                    : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Theme preview */}
                <div className="relative mb-6">
                  <div className="h-24 rounded-xl overflow-hidden border border-white/10">
                    <div 
                      className="h-full relative bg-gray-900"
                      data-theme={theme.id}
                    >
                      {/* Preview elements */}
                      <div className="absolute top-3 left-3 w-10 h-2.5 rounded bg-gray-700" />
                      <div className="absolute top-7 left-3 w-14 h-1.5 rounded bg-gray-600" />
                      <div 
                        className={`absolute bottom-3 right-3 w-8 h-8 rounded-lg bg-gradient-to-r ${theme.preview}`}
                      />
                      <div 
                        className={`absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-gradient-to-r ${theme.preview}`}
                      />
                    </div>
                  </div>
                  
                  {/* Selected indicator */}
                  {selectedTheme === theme.id && (
                    <motion.div
                      className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, type: "spring" }}
                    >
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  )}
                </div>

                {/* Theme info */}
                <div className="text-left">
                  <h3 className="text-white font-semibold text-lg mb-1">{theme.name}</h3>
                  <p className="text-gray-400 text-sm">{theme.description}</p>
                </div>

                {/* Color palette */}
                <div className="flex gap-2 mt-4">
                  <div className="w-4 h-4 rounded-full border border-white/20 bg-gray-900" />
                  <div className="w-4 h-4 rounded-full border border-white/20 bg-gray-700" />
                  <div className="w-4 h-4 rounded-full border border-white/20 bg-gray-600" />
                  <div
                    className={`w-4 h-4 rounded-full border border-white/20 bg-gradient-to-r ${theme.preview}`}
                  />
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.button>
            ))}
          </div>

          {/* Theme customization section */}
          <motion.div 
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full" />
              Current Theme: {themes.find(t => t.id === selectedTheme)?.name}
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {/* Background preview */}
              <div className="space-y-2">
                <label className="text-gray-400 text-sm font-medium">Background</label>
                <div className="h-12 rounded-xl border border-white/20 bg-gray-900" />
              </div>
              
              {/* Card preview */}
              <div className="space-y-2">
                <label className="text-gray-400 text-sm font-medium">Cards</label>
                <div className="h-12 rounded-xl border border-white/20 bg-white/5" />
              </div>
              
              {/* Accent preview */}
              <div className="space-y-2">
                <label className="text-gray-400 text-sm font-medium">Accent</label>
                <div className={`h-12 rounded-xl border border-white/20 bg-gradient-to-r ${themes.find(t => t.id === selectedTheme)?.preview || 'from-blue-400 via-purple-500 to-blue-600'}`} />
              </div>
              
              {/* Button preview */}
              <div className="space-y-2">
                <label className="text-gray-400 text-sm font-medium">Buttons</label>
                <div className={`h-12 rounded-xl border border-white/20 flex items-center justify-center text-white text-xs font-medium bg-gradient-to-r ${themes.find(t => t.id === selectedTheme)?.preview || 'from-blue-400 via-purple-500 to-blue-600'}`}>
                  Preview
                </div>
              </div>
            </div>

            {/* Theme description */}
            <div className="mt-6 p-4 bg-black/40 rounded-xl border border-white/10">
              <p className="text-gray-300 text-sm leading-relaxed">
                <span className="font-medium text-white">
                  {themes.find(t => t.id === selectedTheme)?.name}
                </span>{' '}
                theme is perfect for {themes.find(t => t.id === selectedTheme)?.description.toLowerCase()} profiles. 
                Your visitors will see your content styled with these colors and design elements.
              </p>
            </div>
          </motion.div>
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <div className="text-center">
              <div className="font-semibold text-lg text-gray-300 mb-2">Theme Section Hidden</div>
              <div className="text-gray-500 text-sm">Toggle the switch above to show this section</div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
