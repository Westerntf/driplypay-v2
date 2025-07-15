/**
 * 🌐 User-Facing Theme (Public Profiles)
 * Based on existing public profile design
 * For supporters viewing creator profiles
 */

import { colors } from '../tokens'

export interface ThemeStyles {
  background: string
  accent: string
  accentBackground: string
  card: string
  button: string
  iconBackground: string
  text: string
  accent_text: string
}

// Public profile themes (existing design)
export function getUserFacingTheme(themeName: string): ThemeStyles {
  switch (themeName) {
    case 'theme1': // Ocean Theme
      return {
        background: 'bg-black',
        accent: 'from-blue-950 via-blue-700 to-blue-300',
        accentBackground: 'bg-gradient-to-r from-blue-950 via-blue-700 to-blue-300',
        card: 'bg-black/40 backdrop-blur-sm border-blue-400/20 hover:border-blue-400/40',
        button: 'bg-gradient-to-r from-blue-950 via-blue-700 to-blue-300 hover:from-blue-900 hover:via-blue-600 hover:to-blue-200 shadow-lg shadow-blue-500/30',
        iconBackground: 'bg-gradient-to-r from-blue-950 via-blue-700 to-blue-300',
        text: 'text-white',
        accent_text: 'text-blue-300'
      }

    case 'theme2': // Neon Theme  
      return {
        background: 'bg-black',
        accent: 'from-pink-900 via-purple-600 to-purple-400',
        accentBackground: 'bg-gradient-to-r from-pink-900 via-purple-600 to-purple-400',
        card: 'bg-black/40 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/40',
        button: 'bg-gradient-to-r from-pink-900 via-purple-600 to-purple-400 hover:from-pink-800 hover:via-purple-500 hover:to-purple-300 shadow-lg shadow-purple-500/40',
        iconBackground: 'bg-gradient-to-r from-pink-900 via-purple-600 to-purple-400',
        text: 'text-white',
        accent_text: 'text-purple-400'
      }

    case 'theme3': // Luxe Theme
      return {
        background: 'bg-black',
        accent: 'from-black via-gray-800 to-gray-600',
        accentBackground: 'bg-gradient-to-r from-black via-gray-800 to-gray-600',
        card: 'bg-black/40 backdrop-blur-sm border-gray-600/20 hover:border-gray-600/40',
        button: 'bg-gradient-to-r from-black via-gray-800 to-gray-600 hover:from-gray-900 hover:via-gray-700 hover:to-gray-500 shadow-lg shadow-gray-700/30',
        iconBackground: 'bg-gradient-to-r from-black via-gray-800 to-gray-600',
        text: 'text-white',
        accent_text: 'text-gray-400'
      }

    default: // Clean Theme (default)
      return {
        background: 'bg-black',
        accent: 'from-blue-600 to-purple-600',
        accentBackground: 'bg-gradient-to-r from-blue-600 to-purple-600',
        card: 'bg-white/10 backdrop-blur-md border-white/20 hover:border-white/30',
        button: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg',
        iconBackground: 'bg-gradient-to-r from-blue-600 to-purple-600',
        text: 'text-white',
        accent_text: 'text-blue-400'
      }
  }
}

// Utility to get theme for public profiles (backward compatibility)
export const getThemeStyles = getUserFacingTheme
