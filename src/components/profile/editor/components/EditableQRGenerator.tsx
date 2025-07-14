/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Profile Editor Features
 * Component: QR Code Generator - Create custom QR codes for profile sharing
 * Features: Multiple styles, colors, sizes, and customization options
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

interface EditableQRGeneratorProps {
  profile: any
  themeStyles: ThemeStyles
  isVisible: boolean
  onToggleVisibility: () => void
  onAddToProfile?: (qrData: any) => void
}

export function EditableQRGenerator({ 
  profile, 
  themeStyles, 
  isVisible, 
  onToggleVisibility,
  onAddToProfile 
}: EditableQRGeneratorProps) {
  const [qrName, setQrName] = useState('Instagram Story QR')
  const [qrStyle, setQrStyle] = useState('Classic')
  const [qrColor, setQrColor] = useState('#4F46E5') // Blue
  const [qrSize, setQrSize] = useState('Small (200x200)')

  const styles = [
    { 
      id: 'Classic', 
      name: 'Classic', 
      description: 'Traditional square design',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4z" />
        </svg>
      )
    },
    { 
      id: 'Rounded', 
      name: 'Rounded', 
      description: 'Smooth rounded corners',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    { 
      id: 'Minimal', 
      name: 'Minimal', 
      description: 'Clean and simple',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
        </svg>
      )
    },
    { 
      id: 'Branded', 
      name: 'Branded', 
      description: 'With your logo embedded',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    }
  ]

  const colors = [
    { name: 'Blue', value: '#4F46E5' },
    { name: 'Green', value: '#059669' },
    { name: 'Purple', value: '#7C3AED' },
    { name: 'Orange', value: '#EA580C' },
    { name: 'Red', value: '#DC2626' },
    { name: 'Black', value: '#000000' }
  ]

  const sizes = [
    'Small (200x200)',
    'Medium (400x400)',
    'Large (800x800)',
    'Extra Large (1200x1200)'
  ]

  const handleGenerate = () => {
    // Placeholder for QR generation logic
    console.log('Generating QR with:', { qrName, qrStyle, qrColor, qrSize })
  }

  const handleSaveToLibrary = () => {
    // Placeholder for save logic
    console.log('Saving QR to library')
  }

  return (
    <motion.div 
      className={`relative bg-black/40 backdrop-blur-sm rounded-3xl p-6 lg:p-8 border border-white/10 transition-all duration-300 hover:border-white/20 ${!isVisible ? 'opacity-50' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {/* Gradient accent overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-3xl pointer-events-none" />
      
      {/* Floating accent elements */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse delay-300" />
      <div className="absolute bottom-6 left-6 w-1 h-1 bg-purple-400/40 rounded-full animate-pulse delay-500" />

      {/* Header */}
      <div className="relative flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="relative">
            <h2 className="text-lg font-bold text-white tracking-tight">Quick QR Generator</h2>
            <div className="absolute -bottom-1 left-0 w-16 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
          </div>
          <motion.button
            onClick={onToggleVisibility}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ${
              isVisible ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={`${isVisible ? 'Hide' : 'Show'} QR Generator section`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
              isVisible ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </motion.button>
        </div>
      </div>

      {isVisible && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Customization */}
          <div className="space-y-6">
            <div>
              <h3 className="text-white font-semibold text-base mb-4">Customize Your QR Code</h3>
              
              {/* QR Code Name */}
              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-medium mb-2">QR Code Name</label>
                <input
                  type="text"
                  value={qrName}
                  onChange={(e) => setQrName(e.target.value)}
                  placeholder="e.g., Instagram Story QR"
                  className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300"
                />
              </div>

              {/* Style Selection */}
              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-medium mb-3">Style</label>
                <div className="grid grid-cols-2 gap-3">
                  {styles.map((style) => (
                    <motion.button
                      key={style.id}
                      onClick={() => setQrStyle(style.id)}
                      className={`p-4 rounded-xl border transition-all duration-300 text-left ${
                        qrStyle === style.id
                          ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/50'
                          : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          qrStyle === style.id ? 'bg-blue-500/30 text-blue-400' : 'bg-white/10 text-gray-400'
                        }`}>
                          {style.icon}
                        </div>
                        <span className="text-white font-medium text-sm">{style.name}</span>
                      </div>
                      <p className="text-gray-400 text-xs">{style.description}</p>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-medium mb-3">Color</label>
                <div className="flex gap-3">
                  {colors.map((color) => {
                    const colorClass = color.value === '#4F46E5' ? 'bg-blue-600' :
                                     color.value === '#059669' ? 'bg-green-600' :
                                     color.value === '#7C3AED' ? 'bg-purple-600' :
                                     color.value === '#EA580C' ? 'bg-orange-600' :
                                     color.value === '#DC2626' ? 'bg-red-600' : 'bg-black'
                    
                    return (
                      <motion.button
                        key={color.value}
                        onClick={() => setQrColor(color.value)}
                        className={`w-12 h-12 rounded-xl border-2 transition-all duration-300 ${colorClass} ${
                          qrColor === color.value ? 'border-white scale-110' : 'border-white/20'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        title={color.name}
                        aria-label={`Select ${color.name} color`}
                      />
                    )
                  })}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-medium mb-2">Size</label>
                <select
                  value={qrSize}
                  onChange={(e) => setQrSize(e.target.value)}
                  className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300"
                  title="QR Code Size Selection"
                  aria-label="QR Code Size Selection"
                >
                  {sizes.map((size) => (
                    <option key={size} value={size} className="bg-gray-800 text-white">
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Right Column - Preview */}
          <div className="space-y-6">
            <div>
              <h3 className="text-white font-semibold text-base mb-4">Preview</h3>
              
              {/* QR Code Preview */}
              <div className="bg-white rounded-2xl p-8 flex items-center justify-center mb-6">
                <div className="w-32 h-32 rounded-xl flex items-center justify-center text-4xl font-bold text-white bg-blue-500">
                  <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm8 2h2v2h-2v-2zm4 0h2v2h-2v-2zm-4 4h2v2h-2v-2zm4 0h2v2h-2v-2z"/>
                  </svg>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <motion.button
                  onClick={handleGenerate}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Generate & Download
                </motion.button>
                
                <motion.button
                  onClick={handleSaveToLibrary}
                  className="w-full bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  Save to Library
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}
