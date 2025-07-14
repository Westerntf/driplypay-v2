/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Public Profile Features
 * Utility: Theme style helper for public profiles
 * Features: Theme-based styling, consistent design tokens, modern glass-morphism design
 */

export function getThemeStyles(theme: string) {
  switch (theme) {
    case 'theme1': // Ocean Theme - Light to Dark Blue
      return {
        // Background always stays black for all themes
        background: 'bg-black',
        // Ocean gradient - light blue to dark blue
        accent: 'from-sky-300 via-blue-500 to-blue-800',
        accentBackground: 'bg-gradient-to-r from-sky-300 via-blue-500 to-blue-800',
        // Glass-morphism cards with ocean blue accent
        card: 'bg-black/40 backdrop-blur-sm border-blue-400/20 hover:border-blue-400/40',
        // Ocean gradient buttons with hover effects
        button: 'bg-gradient-to-r from-sky-300 via-blue-500 to-blue-800 hover:from-sky-200 hover:via-blue-400 hover:to-blue-700 shadow-lg shadow-blue-500/30',
        // Icon backgrounds with ocean gradient
        iconBackground: 'bg-gradient-to-r from-sky-300 via-blue-500 to-blue-800',
        // Text colors
        text: 'text-white',
        accent_text: 'text-sky-300'
      }
    case 'theme2': // Neon Theme - Mint to Dark Green
      return {
        background: 'bg-black',
        // Mint to dark green gradient (using teal/emerald colors)
        accent: 'from-teal-300 via-emerald-500 to-green-800',
        accentBackground: 'bg-gradient-to-r from-teal-300 via-emerald-500 to-green-800',
        // Neon mint glass cards
        card: 'bg-black/40 backdrop-blur-sm border-emerald-400/20 hover:border-emerald-400/40',
        // Neon mint glow buttons with stronger shadows
        button: 'bg-gradient-to-r from-teal-300 via-emerald-500 to-green-800 hover:from-teal-200 hover:via-emerald-400 hover:to-green-700 shadow-lg shadow-emerald-500/30',
        iconBackground: 'bg-gradient-to-r from-teal-300 via-emerald-500 to-green-800',
        text: 'text-white',
        accent_text: 'text-teal-300'
      }
    case 'theme3': // Luxe Theme - Dark to Light Red
      return {
        background: 'bg-black',
        // Dark red to light red gradient
        accent: 'from-red-800 via-red-500 to-red-300',
        accentBackground: 'bg-gradient-to-r from-red-800 via-red-500 to-red-300',
        // Luxurious red glass cards
        card: 'bg-black/40 backdrop-blur-sm border-red-500/20 hover:border-red-500/40',
        // Premium red gradient buttons with strong shadows
        button: 'bg-gradient-to-r from-red-800 via-red-500 to-red-300 hover:from-red-700 hover:via-red-400 hover:to-red-200 shadow-lg shadow-red-500/30',
        iconBackground: 'bg-gradient-to-r from-red-800 via-red-500 to-red-300',
        text: 'text-white',
        accent_text: 'text-red-300'
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
