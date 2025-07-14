<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# DriplyPay - Copilot Instructions

## 🚀 IMPORTANT: Blueprint System
**ALWAYS check `/BLUEPRINT.md` first** - it's your complete reference guide for finding ALL relevant files, documentation, and resources for any feature you're working on. Every major file has a blueprint comment pointing you there.

## Project Overview
DriplyPay is a mobile-first payment profile platform for creators. It's built with Next.js 14 (App Router), TypeScript, TailwindCSS, Supabase, and Stripe.

## Key Technologies
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS with custom theme variables
- **Database/Auth**: Supabase
- **Payments**: Stripe (Connect + Checkout)
- **Deployment**: Vercel

## Code Style Guidelines
- Use TypeScript for all files
- Follow Next.js App Router patterns
- Use server components by default, client components only when needed
- Implement proper error handling with try/catch
- Use Zod for form validation
- Follow TailwindCSS utility-first approach
- Use proper semantic HTML and accessibility practices

## Component Structure
- Components are in `src/components/` organized by feature
- **Profile components**: `src/components/profile/[editor|public|payments|analytics|qr|shared]/`
- Use the `@/` import alias for src directory imports
- Follow the pattern: `ComponentName.tsx` for components
- Export components as named exports, not default
- **Always add blueprint comments** to new files:
  ```tsx
  /**
   * 🚀 Developer Reference: /BLUEPRINT.md → [Feature Name]
   * Component: [Description]
   * Features: [Key features]
   */
  ```

## API Routes
- Use App Router API routes in `src/app/api/`
- **Organize by feature**: `/api/[profile|social-links|payment-methods|goals|stripe|analytics|qr|tip]/`
- Implement proper error handling
- Use TypeScript for request/response types
- Follow RESTful conventions
- **Add blueprint comments** to API files:
  ```typescript
  /**
   * 🚀 Developer Reference: /BLUEPRINT.md → [Feature Name]
   * API: [Description]
   * Features: [Key features]
   */
  ```

## Database Schema
Key tables: profiles, payment_methods, tips, analytics, qrcodes
- **Check**: `database/schema.sql` for current structure
- **Migrations**: `supabase/migrations/` for changes
- Always use proper TypeScript types for database operations
- Use Supabase client-side and server-side appropriately
- **Reference**: `docs/PROFILE_ECOSYSTEM_ANALYSIS.md` for data relationships

## Authentication
- Use Supabase Auth with magic link login
- Protect routes with proper middleware
- Handle auth state properly in components

## Stripe Integration
- Use Stripe Connect Standard for creator payouts
- Implement Stripe Checkout for Pro subscriptions
- Handle webhooks properly with proper validation

## Styling Themes
Support for three themes: clean, neon, luxe
- **Design tokens**: Use `design-system/design-tokens.ts` for consistent theming
- **Components**: Import from `design-system/components.md` specifications
- Use CSS variables for theme switching
- Mobile-first responsive design
- Dark mode support
- **Reference**: `design-system/README.md` for complete design system guide

## File Organization
- Keep related functionality together
- Use barrel exports (index.ts) for cleaner imports
- Separate business logic from presentation components
- **Follow the blueprint structure**: Check `/BLUEPRINT.md` for exact folder organization
- **Profile features**: Organized in `src/components/profile/[feature]/`
- **Documentation**: All features documented in `docs/profile-features/`

## 📁 Complete Documentation System

### **Master Reference Guide**
- **`/BLUEPRINT.md`** - Your go-to reference for finding ALL relevant files for any feature
- **`docs/profile-features/IMPLEMENTATION_ROADMAP.md`** - Phase-by-phase development plan
- **`docs/PROFILE_ECOSYSTEM_ANALYSIS.md`** - Complete system overview

### **Feature-Specific Implementation Guides**
- **`docs/profile-features/PROFILE_EDITOR_IMPLEMENTATION.md`** - Profile editing features
- **`docs/profile-features/PUBLIC_PROFILE_IMPLEMENTATION.md`** - Public profile features  
- **`docs/profile-features/PAYMENT_SYSTEM_IMPLEMENTATION.md`** - Stripe integration & payments
- **`docs/profile-features/ANALYTICS_IMPLEMENTATION.md`** - Analytics dashboard
- **`docs/profile-features/QR_GENERATOR_IMPLEMENTATION.md`** - QR code generation

### **UI/UX & Design System**
- **`docs/profile-features/UI_UX_SPECIFICATIONS.md`** - Complete interface specifications
- **`design-system/components.md`** - Component library specifications
- **`design-system/design-tokens.ts`** - CSS variables and theme system
- **`design-system/README.md`** - Design system overview

### **How to Use the Documentation**
1. **Working on a feature?** → Check `/BLUEPRINT.md` for your feature section
2. **Need implementation details?** → Follow links to implementation guides
3. **Need UI specs?** → Check UI/UX specifications
4. **Need design components?** → Use design system documentation

When generating code, prioritize:
1. **Check `/BLUEPRINT.md` first** for relevant documentation and patterns
2. Type safety
3. Performance
4. Accessibility
5. Mobile-first design
6. Clean, maintainable code structure
7. **Follow existing implementation guides** for consistency

## 🎯 Quick Development Workflow

### **Starting a New Feature**
1. **Check `/BLUEPRINT.md`** → Find your feature section
2. **Read implementation guide** → Follow step-by-step instructions
3. **Use design system** → Import from `design-system/components.md`
4. **Add blueprint comment** → Direct future developers to documentation
5. **Follow existing patterns** → Check similar components for consistency

### **Troubleshooting**
- **Component not found?** → Check `/BLUEPRINT.md` for correct import paths
- **Design inconsistency?** → Use `design-system/design-tokens.ts`
- **Database issues?** → Reference `docs/PROFILE_ECOSYSTEM_ANALYSIS.md`
- **API problems?** → Check implementation guides for endpoint patterns

### **Best Practices**
- Always add descriptive blueprint comments to new files
- Use design system components instead of custom CSS
- Follow the folder structure outlined in `/BLUEPRINT.md`
- Check implementation guides before starting new features
- Test on mobile devices using design system responsive patterns
