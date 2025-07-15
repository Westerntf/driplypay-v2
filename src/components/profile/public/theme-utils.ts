/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Public Profile Features
 * Utility: Theme style helper for public profiles
 * Features: Theme-based styling, consistent design tokens, modern glass-morphism design
 */

export function getThemeStyles(theme: string) {
  switch (theme) {
    case 'theme1': // Ocean Theme - Dark Blue to Light Blue
      return {
        // Background always stays black for all themes
        background: 'bg-black',
        // Ocean gradient - dark blue (almost black) to light blue (deep ocean to surface)
        accent: 'from-blue-950 via-blue-700 to-blue-300',
        accentBackground: 'bg-gradient-to-r from-blue-950 via-blue-700 to-blue-300',
        // Glass-morphism cards with ocean blue accent
        card: 'bg-black/40 backdrop-blur-sm border-blue-400/20 hover:border-blue-400/40',
        // Ocean gradient buttons with hover effects
        button: 'bg-gradient-to-r from-blue-950 via-blue-700 to-blue-300 hover:from-blue-900 hover:via-blue-600 hover:to-blue-200 shadow-lg shadow-blue-500/30',
        // Icon backgrounds with ocean gradient
        iconBackground: 'bg-gradient-to-r from-blue-950 via-blue-700 to-blue-300',
        // Text colors
        text: 'text-white',
        accent_text: 'text-blue-300'
      }
    case 'theme2': // Neon Theme - Dark Pink to Light Purple
      return {
        background: 'bg-black',
        // Dark pink to light purple gradient - vibrant neon aesthetic
        accent: 'from-pink-900 via-purple-600 to-purple-400',
        accentBackground: 'bg-gradient-to-r from-pink-900 via-purple-600 to-purple-400',
        // Neon purple glass cards with glow effect
        card: 'bg-black/40 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/40',
        // Neon purple gradient buttons with strong glow shadows
        button: 'bg-gradient-to-r from-pink-900 via-purple-600 to-purple-400 hover:from-pink-800 hover:via-purple-500 hover:to-purple-300 shadow-lg shadow-purple-500/40',
        iconBackground: 'bg-gradient-to-r from-pink-900 via-purple-600 to-purple-400',
        text: 'text-white',
        accent_text: 'text-purple-400'
      }
    case 'theme3': // Luxe Theme - Black to Charcoal
      return {
        background: 'bg-black',
        // Black to charcoal gradient - elegant and sophisticated
        accent: 'from-black via-gray-800 to-gray-600',
        accentBackground: 'bg-gradient-to-r from-black via-gray-800 to-gray-600',
        // Elegant charcoal glass cards
        card: 'bg-black/40 backdrop-blur-sm border-gray-600/20 hover:border-gray-600/40',
        // Sophisticated charcoal gradient buttons with subtle shadows
        button: 'bg-gradient-to-r from-black via-gray-800 to-gray-600 hover:from-gray-900 hover:via-gray-700 hover:to-gray-500 shadow-lg shadow-gray-700/30',
        iconBackground: 'bg-gradient-to-r from-black via-gray-800 to-gray-600',
        text: 'text-white',
        accent_text: 'text-gray-300'
      }
    case 'default': // Default DriplyPay brand gradient
    default: // Fallback to default for unknown themes
      return {
        background: 'bg-black',
        // Brand gradient from design system
        accent: 'from-blue-400 via-purple-500 to-blue-600',
        accentBackground: 'bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600',
        // Modern glass cards
        card: 'bg-black/40 backdrop-blur-sm border-white/10 hover:border-white/20',
        // Brand gradient buttons
        button: 'bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 hover:from-blue-500 hover:via-purple-600 hover:to-blue-700 shadow-lg shadow-purple-500/25',
        iconBackground: 'bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600',
        text: 'text-white',
        accent_text: 'text-blue-300'
      }
  }
}
