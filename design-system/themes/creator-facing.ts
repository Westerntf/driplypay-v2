/**
 * 🎛️ Creator-Facing Theme (Dashboard/Editor)
 * Dark theme with pure black backgrounds and dark glass tiles
 * Optimized for creator workflows and reduced eye strain
 */

import { colors } from '../tokens'

export interface CreatorThemeStyles {
  // Page backgrounds
  pageBackground: string
  sectionBackground: string
  
  // Card/tile styles
  cardBackground: string
  cardBorder: string
  cardHover: string
  
  // Interactive elements
  buttonPrimary: string
  buttonSecondary: string
  buttonDanger: string
  
  // Input elements
  inputBackground: string
  inputBorder: string
  inputFocus: string
  
  // Text styles
  textPrimary: string
  textSecondary: string
  textMuted: string
  textAccent: string
  
  // Status colors
  success: string
  warning: string
  error: string
  info: string
  
  // Special elements
  divider: string
  overlay: string
  glassMorphism: string
}

export function getCreatorFacingTheme(): CreatorThemeStyles {
  return {
    // Pure black backgrounds as requested
    pageBackground: 'bg-black',
    sectionBackground: 'bg-black',
    
    // Dark glass tiles - darker grey/black glass effect
    cardBackground: 'bg-gray-950/80 backdrop-blur-sm',
    cardBorder: 'border-gray-800/40',
    cardHover: 'hover:bg-gray-950/90 hover:border-gray-700/60',
    
    // Button styles adapted for dark theme
    buttonPrimary: 'bg-white text-black hover:bg-gray-100 active:bg-gray-200',
    buttonSecondary: 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700',
    buttonDanger: 'bg-red-900/80 text-red-100 hover:bg-red-800/90 border-red-800/40',
    
    // Input styles for dark theme
    inputBackground: 'bg-gray-900/60 backdrop-blur-sm',
    inputBorder: 'border-gray-700/40',
    inputFocus: 'focus:border-gray-600 focus:ring-gray-600/20',
    
    // Text hierarchy optimized for dark backgrounds
    textPrimary: 'text-white',
    textSecondary: 'text-gray-300',
    textMuted: 'text-gray-500',
    textAccent: 'text-blue-400',
    
    // Status colors optimized for dark theme
    success: 'text-green-400 bg-green-900/20 border-green-800/40',
    warning: 'text-yellow-400 bg-yellow-900/20 border-yellow-800/40', 
    error: 'text-red-400 bg-red-900/20 border-red-800/40',
    info: 'text-blue-400 bg-blue-900/20 border-blue-800/40',
    
    // Utility styles
    divider: 'border-gray-800/40',
    overlay: 'bg-black/60 backdrop-blur-lg',
    glassMorphism: 'bg-gray-950/40 backdrop-blur-md border-gray-800/30',
  }
}

// CSS custom properties for the creator theme
export const creatorThemeCSSVars = {
  '--creator-bg-page': '#000000',
  '--creator-bg-card': 'rgba(3, 7, 18, 0.8)',
  '--creator-border': 'rgba(31, 41, 55, 0.4)',
  '--creator-text-primary': '#ffffff',
  '--creator-text-secondary': '#d1d5db',
  '--creator-text-muted': '#6b7280',
}

// Utility classes for creator theme
export const creatorThemeClasses = {
  // Layout
  page: 'min-h-screen bg-black text-white',
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  
  // Cards
  card: 'bg-gray-950/80 backdrop-blur-sm border border-gray-800/40 rounded-xl',
  cardInteractive: 'bg-gray-950/80 backdrop-blur-sm border border-gray-800/40 rounded-xl hover:bg-gray-950/90 hover:border-gray-700/60 transition-all duration-200',
  
  // Navigation
  nav: 'bg-gray-950/90 backdrop-blur-xl border-b border-gray-800/40',
  navItem: 'text-gray-300 hover:text-white hover:bg-gray-800/40 rounded-lg px-3 py-2 transition-all duration-200',
  
  // Forms
  input: 'bg-gray-900/60 backdrop-blur-sm border border-gray-700/40 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-gray-600 focus:ring-gray-600/20',
  textarea: 'bg-gray-900/60 backdrop-blur-sm border border-gray-700/40 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-gray-600 focus:ring-gray-600/20 resize-none',
  select: 'bg-gray-900/60 backdrop-blur-sm border border-gray-700/40 rounded-lg px-4 py-2 text-white focus:border-gray-600 focus:ring-gray-600/20',
  
  // Buttons
  btnPrimary: 'bg-white text-black hover:bg-gray-100 active:bg-gray-200 font-medium rounded-lg px-4 py-2 transition-all duration-200',
  btnSecondary: 'bg-gray-800 text-white border border-gray-700 hover:bg-gray-700 font-medium rounded-lg px-4 py-2 transition-all duration-200',
  btnGhost: 'text-gray-300 hover:text-white hover:bg-gray-800/40 font-medium rounded-lg px-4 py-2 transition-all duration-200',
}
