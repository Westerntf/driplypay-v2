/**
 * Profile Components Index
 * 
 * This file exports all profile-related components organized by category.
 * Each category represents a different aspect of the profile system:
 * 
 * - public: Components for displaying profiles to visitors
 * - editor: Components for creators to edit their profiles  
 * - payments: Components for payment processing and management
 * - analytics: Components for tracking and displaying analytics
 * - shared: Reusable components used across multiple areas
 */

// Public Profile Components (for visitors viewing profiles)
export * from './public'

// Profile Editor Components (for creators editing their profiles)
export { EditablePublicProfile } from './editor/EditablePublicProfile'

// TODO: Uncomment these when components are created
// Payment-Related Components (for payment processing and management)
// export * from './payments'

// Analytics Components (for tracking and displaying data)
// export * from './analytics'

// Shared Components (reusable across different areas)
// export * from './shared'

// Re-export types for convenience
export type {
  PublicProfile,
  ProfileGoal,
  PublicPaymentMethod,
  PublicSocialLink,
  Support
} from '@/types'
