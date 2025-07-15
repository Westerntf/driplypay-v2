/**
 * 🎨 Theme Configuration Summary
 * Complete overview of the dual design system
 */

export const DESIGN_SYSTEM_CONFIG = {
  
  // User-Facing Theme (Public Profiles)
  userFacing: {
    purpose: 'Clean, welcoming interface for supporters viewing creator profiles',
    baseBackground: 'bg-black',
    cardStyle: 'Glass-morphism with theme-based accent colors',
    themes: {
      theme1: 'Ocean (blue gradients)',
      theme2: 'Neon (pink/purple gradients)', 
      theme3: 'Luxe (black/charcoal gradients)',
      clean: 'Default (blue/purple gradients)'
    },
    usage: [
      '/[username] - Public profile pages',
      '/share/* - Sharing pages',
      'Any visitor-facing interface'
    ]
  },

  // Creator-Facing Theme (Dashboard/Editor)
  creatorFacing: {
    purpose: 'Dark, professional interface for creators managing their profiles',
    baseBackground: 'bg-black (pure black)',
    cardStyle: 'Dark grey/black glass tiles (bg-gray-950/80)',
    features: [
      'Reduced eye strain with pure black backgrounds',
      'Dark glass tiles for content organization',
      'High contrast for professional work environment',
      'Minimalist aesthetic for focused workflows'
    ],
    usage: [
      '/profile-editor - Profile editing interface',
      '/dashboard/* - Creator dashboard pages',
      '/analytics - Analytics and insights',
      '/settings - Account settings',
      'Any creator-facing interface'
    ]
  },

  // Implementation Guide
  implementation: {
    detection: 'Automatic theme detection based on URL pathname',
    components: 'Shared components with theme variants',
    tokens: 'Centralized design tokens for consistency',
    migration: 'Gradual migration from existing styles'
  }

} as const

// CSS Variables for both themes
export const CSS_VARIABLES = {
  // User-facing (dynamic based on selected theme)
  user: {
    '--user-bg': '#000000',
    '--user-card-bg': 'rgba(255, 255, 255, 0.1)',
    '--user-text': '#ffffff',
    '--user-accent': 'var(--theme-accent)', // Dynamic
  },
  
  // Creator-facing (static dark theme)
  creator: {
    '--creator-bg': '#000000',
    '--creator-card-bg': 'rgba(3, 7, 18, 0.8)',
    '--creator-border': 'rgba(31, 41, 55, 0.4)',
    '--creator-text': '#ffffff',
    '--creator-text-secondary': '#d1d5db',
    '--creator-text-muted': '#6b7280',
  }
} as const

// Quick usage examples
export const USAGE_EXAMPLES = {
  
  // User-facing component
  userComponent: `
    import { Card, Button, getUserFacingTheme } from '@/design-system'
    
    function PublicProfile({ theme }) {
      const themeStyles = getUserFacingTheme(theme)
      
      return (
        <Card variant="user" theme={theme}>
          <Button theme="user" variant="primary">
            Support Creator
          </Button>
        </Card>
      )
    }
  `,

  // Creator-facing component  
  creatorComponent: `
    import { Card, Button, getCreatorFacingTheme } from '@/design-system'
    
    function ProfileEditor() {
      return (
        <div className="min-h-screen bg-black">
          <Card variant="creator">
            <Button theme="creator" variant="primary">
              Save Changes
            </Button>
          </Card>
        </div>
      )
    }
  `,

  // Automatic theme detection
  autoDetection: `
    import { detectTheme, getPageClasses } from '@/design-system'
    
    function Layout({ pathname, children }) {
      const theme = detectTheme(pathname)
      const pageClasses = getPageClasses(theme)
      
      return (
        <div className={pageClasses}>
          {children}
        </div>
      )
    }
  `

} as const
