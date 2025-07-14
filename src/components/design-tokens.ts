/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Design System
 * Purpose: Design tokens and CSS variables for consistent theming
 * Features: Color system, typography, spacing, theme switching
 * 
 * DriplyPay Design Tokens
 * Central source of truth for all design values used across the platform
 * Based on the homepage design patterns
 */

export const designTokens = {
  // Brand Colors
  colors: {
    // Background Colors
    background: {
      primary: '#000000',           // Main black background
      secondary: 'rgba(0, 0, 0, 0.8)', // Glass morphism background
      tertiary: 'rgba(0, 0, 0, 0.6)',  // Lighter glass background
    },
    
    // Foreground Colors
    foreground: {
      primary: '#ffffff',           // Pure white text
      secondary: '#E5E7EB',         // Light gray text (descriptions)
      tertiary: '#9CA3AF',          // Medium gray text
      quaternary: '#6B7280',        // Dark gray text (muted)
    },
    
    // Brand Gradients
    gradients: {
      primary: 'linear-gradient(to right, #60A5FA, #8B5CF6, #60A5FA)', // Main brand gradient
      secondary: 'linear-gradient(135deg, #60A5FA 0%, #8B5CF6 100%)',   // Card borders
      glow: '#3D4AFF',                                                    // Glow effect color
    },
    
    // Border Colors
    border: {
      primary: 'rgba(255, 255, 255, 0.1)',  // Subtle white border
      secondary: 'rgba(255, 255, 255, 0.05)', // Very subtle border
    },
    
    // Payment Brand Colors (for consistency)
    payment: {
      stripe: '#635BFF',
      cashapp: '#00D632',
    }
  },

  // Typography
  typography: {
    // Font Families
    fontFamily: {
      primary: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif',
    },
    
    // Font Weights
    fontWeight: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    
    // Font Sizes (based on homepage usage)
    fontSize: {
      hero: '8rem',      // 128px - Hero title (DRIPLYPAY)
      heroMobile: '6rem', // 96px - Hero title mobile
      title: '3rem',     // 48px - Section titles
      subtitle: '2rem',  // 32px - Subtitles
      large: '1.5rem',   // 24px - Large text
      body: '1.125rem',  // 18px - Body text
      small: '0.875rem', // 14px - Small text
      tiny: '0.75rem',   // 12px - Tiny text
    },
    
    // Letter Spacing
    letterSpacing: {
      tight: '-0.04em',  // Hero text
      normal: '-0.02em', // Subtitle text
      wide: '0.025em',   // Body text
    },
  },

  // Spacing (based on homepage patterns)
  spacing: {
    // Component spacing
    component: {
      xs: '0.5rem',   // 8px
      sm: '1rem',     // 16px
      md: '1.5rem',   // 24px
      lg: '2rem',     // 32px
      xl: '3rem',     // 48px
      xxl: '4rem',    // 64px
      xxxl: '5rem',   // 80px
    },
    
    // Section spacing
    section: {
      padding: '5rem', // 80px - py-20
      margin: '2.5rem', // 40px - my-10
    },
  },

  // Effects
  effects: {
    // Box Shadows
    shadows: {
      glow: '0 10px 15px -3px rgba(96, 165, 250, 0.3)',
      card: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    },
    
    // Backdrop Filters
    blur: {
      light: 'blur(8px)',
      medium: 'blur(16px)',
      heavy: 'blur(24px)',
    },
  },

  // Border Radius
  borderRadius: {
    small: '0.375rem',   // 6px
    medium: '0.5rem',    // 8px
    large: '0.75rem',    // 12px
    xl: '1rem',          // 16px
    xxl: '1.5rem',       // 24px
    full: '9999px',      // Full circle
  },
};
