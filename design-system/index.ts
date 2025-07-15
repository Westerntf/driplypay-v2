/**
 * 🎨 DriplyPay Design System
 * Main export file for the design system
 */

// Design tokens
export { designTokens, colors, typography, spacing, borderRadius, shadows, transitions } from './tokens'

// Themes
export { getUserFacingTheme, getThemeStyles, type ThemeStyles } from './themes/user-facing'
export { 
  getCreatorFacingTheme, 
  creatorThemeCSSVars, 
  creatorThemeClasses,
  type CreatorThemeStyles 
} from './themes/creator-facing'

// Components
export { Card, Button, Input, GlassPanel } from './components'

// Utils
export { cn, getThemeType, applyThemeVars, withOpacity, breakpoints, animations } from './utils'

// Theme provider hook (to be implemented)
export type DesignSystemTheme = 'user' | 'creator'

/**
 * Quick theme detection based on pathname
 */
export function detectTheme(pathname: string): DesignSystemTheme {
  if (pathname.includes('/dashboard') || 
      pathname.includes('/profile-editor') ||
      pathname.includes('/analytics') ||
      pathname.includes('/settings')) {
    return 'creator'
  }
  return 'user'
}

/**
 * Apply appropriate theme classes to page
 */
export function getPageClasses(theme: DesignSystemTheme): string {
  if (theme === 'creator') {
    return 'min-h-screen bg-black text-white'
  }
  return 'min-h-screen bg-black text-white' // User pages also use black bg
}

/**
 * Get appropriate container classes
 */
export function getContainerClasses(theme: DesignSystemTheme): string {
  return 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
}
