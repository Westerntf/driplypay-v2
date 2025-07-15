# 🎨 DriplyPay Design System

## Overview
A dual-theme design system optimized for two distinct user experiences:

1. **User-Facing (Public Profiles)** - Based on existing public profile aesthetics
2. **Creator-Facing (Dashboard/Editor)** - Dark glass theme with pure black backgrounds

## 📁 Structure
```
design-system/
├── tokens/              # Design tokens (colors, spacing, typography)
├── components/          # Reusable UI components
├── themes/             # Theme configurations
└── utils/              # Design utilities and helpers
```

## 🎯 Design Principles

### User-Facing (Public)
- Clean, welcoming interface for supporters
- Theme-based customization for creators
- Glass-morphism with vibrant gradients
- Optimized for conversion and engagement

### Creator-Facing (Dashboard)
- Pure black backgrounds for reduced eye strain
- Dark grey/black glass tiles for content
- Minimal distractions for focused work
- Professional, powerful interface feel

## Quick Import
```tsx
// Import the design system
import { 
  UserFacingTheme, 
  CreatorFacingTheme,
  DesignTokens 
} from '@/design-system'
```
