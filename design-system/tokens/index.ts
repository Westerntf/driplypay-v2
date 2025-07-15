/**
 * 🎨 DriplyPay Design Tokens
 * Central source of truth for all design values
 */

// 🏆 OFFICIAL DRIPLYPAY BRAND COLORS (Luxe Theme)
export const driplyPayBrand = {
  // Primary brand gradient: Black to Charcoal
  primary: {
    gradient: 'from-black via-gray-800 to-gray-600',
    gradientHover: 'from-gray-900 via-gray-700 to-gray-500',
    gradientBg: 'bg-gradient-to-r from-black via-gray-800 to-gray-600',
    shadow: 'shadow-gray-700/30',
  },
  
  // Brand borders and accents
  accent: {
    border: 'border-gray-600/20',
    borderHover: 'border-gray-600/40',
    text: 'text-gray-400',
  },
  
  // Glass-morphism with Luxe theme
  glass: {
    card: 'bg-black/40 backdrop-blur-sm border-gray-600/20 hover:border-gray-600/40',
    premium: 'bg-black/60 backdrop-blur-lg border-gray-600/30',
  },
  
  // Always pure black background
  background: 'bg-black',
}

// Core color primitives
export const colors = {
  // Base colors
  black: '#000000',
  white: '#ffffff',
  
  // Grays for creator interface
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6', 
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    850: '#1a202c', // Custom darker gray
    900: '#111827',
    950: '#0f0f0f', // Custom very dark gray
  },

  // Theme colors for public profiles
  blue: {
    300: '#93c5fd',
    400: '#60a5fa', 
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },

  purple: {
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6', 
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
  },

  pink: {
    400: '#f472b6',
    500: '#ec4899',
    600: '#db2777',
    700: '#be185d',
    800: '#9d174d',
    900: '#831843',
  },

  // Semantic colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
}

// Typography scale
export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['Fira Code', 'monospace'],
  },
  
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
  },

  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
}

// Spacing scale
export const spacing = {
  0: '0px',
  1: '0.25rem',
  2: '0.5rem', 
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
}

// Border radius
export const borderRadius = {
  none: '0',
  sm: '0.125rem',
  base: '0.25rem', 
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  full: '9999px',
}

// Shadows
export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  
  // Special glass shadows
  glass: '0 8px 32px 0 rgb(31 38 135 / 0.37)',
  glassBlue: '0 8px 32px 0 rgb(59 130 246 / 0.3)',
  glassPurple: '0 8px 32px 0 rgb(139 92 246 / 0.3)',
}

// Transitions
export const transitions = {
  fast: '150ms ease',
  base: '250ms ease', 
  slow: '500ms ease',
  spring: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
}

export const designTokens = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  transitions,
  driplyPayBrand,
}
