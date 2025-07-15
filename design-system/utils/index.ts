/**
 * 🛠️ Design System Utilities
 */

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility for merging Tailwind CSS classes
 * Combines clsx and tailwind-merge for optimal class handling
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Theme detection utility
 */
export function getThemeType(pathname: string): 'user' | 'creator' {
  // Creator-facing pages (dashboard, editor, etc.)
  if (pathname.includes('/dashboard') || 
      pathname.includes('/profile-editor') ||
      pathname.includes('/analytics') ||
      pathname.includes('/settings')) {
    return 'creator'
  }
  
  // User-facing pages (public profiles, etc.)
  return 'user'
}

/**
 * CSS custom properties helper
 */
export function applyThemeVars(vars: Record<string, string>) {
  if (typeof document !== 'undefined') {
    Object.entries(vars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value)
    })
  }
}

/**
 * Color opacity utilities
 */
export function withOpacity(color: string, opacity: number): string {
  return `${color}/${Math.round(opacity * 100)}`
}

/**
 * Responsive breakpoint utilities
 */
export const breakpoints = {
  sm: '640px',
  md: '768px', 
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}

/**
 * Animation utilities
 */
export const animations = {
  fadeIn: 'animate-in fade-in duration-200',
  fadeOut: 'animate-out fade-out duration-200',
  slideUp: 'animate-in slide-in-from-bottom-4 duration-300',
  slideDown: 'animate-in slide-in-from-top-4 duration-300',
  scaleIn: 'animate-in zoom-in-95 duration-200',
}
