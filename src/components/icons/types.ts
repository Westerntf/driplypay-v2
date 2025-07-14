/**
 * 🚀 Developer Reference: /BLUEPRINT.md → UI Components
 * Component: Icon system types and interfaces
 * Features: Consistent icon props and theming
 */

export interface IconProps {
  className?: string
  size?: number | string
  color?: string
  strokeWidth?: number
}

export interface BrandIconProps extends IconProps {
  variant?: 'default' | 'mono' | 'color'
}
