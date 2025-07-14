/**
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
    
    // Container spacing
    container: {
      padding: '1rem', // 16px - px-4
      maxWidth: '72rem', // 1152px - max-w-6xl
    },
  },

  // Border Radius
  borderRadius: {
    sm: '0.375rem',   // 6px
    md: '0.75rem',    // 12px
    lg: '1rem',       // 16px
    xl: '1.5rem',     // 24px
    xxl: '2rem',      // 32px - Cards and buttons
    full: '9999px',   // Circular
  },

  // Shadows and Effects
  effects: {
    // Box Shadows
    shadows: {
      glow: '0 10px 15px -3px rgba(96, 165, 250, 0.3)', // Button glow
      card: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',     // Card shadow
    },
    
    // Backdrop Filters
    backdrop: {
      blur: 'blur(16px)', // Glass morphism effect
    },
    
    // Opacity levels
    opacity: {
      low: 0.1,
      medium: 0.3,
      high: 0.6,
      higher: 0.8,
      highest: 0.9,
    },
  },

  // Layout Grid
  layout: {
    // Breakpoints (Tailwind defaults)
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    
    // Grid configurations
    grid: {
      features: 'grid-cols-1 md:grid-cols-2', // Feature grid
      steps: 'md:grid-cols-3',                  // How it works grid
      payments: 'flex justify-center items-center space-x-12 md:space-x-16',
    },
  },

  // Animation and Transitions
  animations: {
    transition: {
      default: 'transition-all duration-300',
      fast: 'transition-all duration-200',
      slow: 'transition-all duration-500',
    },
    
    hover: {
      opacity: 'hover:opacity-90',
      scale: 'hover:scale-105',
      glow: 'hover:shadow-lg',
    },
  },

  // Component Specific Tokens
  components: {
    // Button styles
    button: {
      primary: {
        background: 'linear-gradient(to right, #60A5FA, #8B5CF6, #60A5FA)',
        color: '#ffffff',
        padding: 'py-4 px-16',
        borderRadius: 'rounded-xl',
        fontSize: 'text-lg',
        fontWeight: 'font-semibold',
        minWidth: '240px',
        boxShadow: '0 10px 15px -3px rgba(96, 165, 250, 0.3)',
      },
    },
    
    // Card styles
    card: {
      glass: {
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(16px)',
        border: 'border border-white/10',
        borderRadius: 'rounded-2xl',
        padding: 'px-8 py-12',
      },
      
      feature: {
        background: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(16px)',
        border: 'border border-white/10',
        borderRadius: 'rounded-xl',
        padding: 'p-4 md:p-5',
      },
      
      gradient: {
        border: 'linear-gradient(135deg, #60A5FA 0%, #8B5CF6 100%)',
        borderWidth: 'p-[2px]',
        borderRadius: 'rounded-[2rem]',
        innerBackground: 'black',
        innerRadius: 'rounded-[2rem]',
        innerPadding: 'p-6',
      },
    },
    
    // Icon container
    icon: {
      container: {
        background: 'linear-gradient(135deg, #60A5FA 0%, #8B5CF6 100%)',
        size: 'w-12 h-12',
        borderRadius: 'rounded-full',
        display: 'flex items-center justify-center',
      },
      
      size: {
        small: '24px',
        medium: '32px',
        large: '48px',
      },
      
      filter: 'filter: invert(1)', // Make icons white
    },
  },
} as const;

// Export individual token categories for easier imports
export const { colors, typography, spacing, borderRadius, effects, layout, animations, components } = designTokens;

// Helper functions for common patterns
export const gradientTextStyle = {
  backgroundImage: colors.gradients.primary,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

export const glassCard = {
  background: 'rgba(0, 0, 0, 0.8)',
  backdropFilter: 'blur(16px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
};

export const gradientBorder = {
  background: colors.gradients.secondary,
  padding: '2px',
  borderRadius: '2rem',
};
