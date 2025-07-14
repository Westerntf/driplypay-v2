# 🚀 DriplyPay Developer Blueprint

## 🎯 Purpose
This is your **go-to reference guide** when working on ANY DriplyPay feature. Instead of searching through multiple files, just check this blueprint to find exactly what you need.

**Quick Usage**: Add this comment to any code file:
```typescript
/**
 * 🚀 Developer Reference: /BLUEPRINT.md
 * Feature: [Profile Editor | Public Profile | Payments | Analytics | QR Codes]
 */
```

## 📋 How to Use This Blueprint
1. **Working on a feature?** → Find the relevant section below
2. **Need design specs?** → Check the Design System references
3. **Looking for implementation details?** → Follow the documentation links
4. **Need component examples?** → Check the component file paths
5. **Setting up new features?** → Follow the implementation guides

---

## � **Core File Structure Quick Reference**

```
📂 Key Directories at a Glance
├── 📂 src/app/[username]/          → Public profile pages
├── 📂 src/app/dashboard/           → Creator dashboard pages  
├── 📂 src/app/api/                 → API routes & endpoints
├── 📂 src/components/profile/      → Profile-specific components
├── 📂 src/lib/profile/             → Profile utilities & functions
├── 📂 docs/profile-features/       → Complete feature documentation
├── 📂 design-system/               → Design tokens & UI components
└── 📂 database/                    → Database schema & migrations
```

---

## �🔍 Quick Feature Lookup

### **👤 Profile Editor Features**
**Working on**: `/src/app/dashboard/profile/page.tsx` or profile editing components

**You need these files**:
- 📋 **Feature Docs**: `/docs/profile-features/PROFILE_EDITOR_FEATURES.md`
- 🏗️ **Implementation Guide**: `/docs/profile-features/PROFILE_EDITOR_IMPLEMENTATION.md`
- 🎨 **UI/UX Specs**: `/docs/profile-features/UI_UX_SPECIFICATIONS.md` (Profile Editor section)
- 🎨 **Design System**: `/design-system/components.md` + `/design-system/design-tokens.ts`
- 🔧 **Components Folder**: `/src/components/profile/editor/`
- 📊 **Database**: `/docs/database/schema.sql` (profiles, social_links, payment_methods, goals tables)

**Key Design Components**: `GlassCard`, `FormInput`, `PrimaryButton`, `AvatarUploader`

---

### **🌐 Public Profile Features**
**Working on**: `/src/app/[username]/page.tsx` or public profile components

**You need these files**:
- 📋 **Feature Docs**: `/docs/profile-features/PUBLIC_PROFILE_FEATURES.md`
- 🏗️ **Implementation Guide**: `/docs/profile-features/PUBLIC_PROFILE_IMPLEMENTATION.md`
- 🎨 **UI/UX Specs**: `/docs/profile-features/UI_UX_SPECIFICATIONS.md` (Public Profile section)
- 🎨 **Design System**: `/design-system/components.md` + `/design-system/design-tokens.ts`
- 🔧 **Components Folder**: `/src/components/profile/public/`
- 📊 **Database**: `/docs/database/schema.sql` (profiles, social_links, payment_methods, goals tables)

**Key Design Components**: `GlassCard`, `PublicProfileHeader`, `ShareButton`, `ProgressBar`

---

### **💳 Payment System Features**
**Working on**: `/src/app/dashboard/payments/page.tsx` or Stripe integration

**You need these files**:
- 📋 **Feature Docs**: `/docs/profile-features/PAYMENT_SYSTEM_FEATURES.md`
- 🏗️ **Implementation Guide**: `/docs/profile-features/PAYMENT_SYSTEM_IMPLEMENTATION.md`
- 🎨 **UI/UX Specs**: `/docs/profile-features/UI_UX_SPECIFICATIONS.md` (Payment System section)
- 🎨 **Design System**: `/design-system/components.md` + `/design-system/design-tokens.ts`
- 🔧 **Components Folder**: `/src/components/profile/payments/`
- 📊 **Database**: `/docs/database/schema.sql` (payments, payment_methods, payouts tables)
- 💰 **Stripe Config**: `/src/lib/stripe.ts`

**Key Design Components**: `MetricCard`, `TransactionTable`, `StripeConnectBanner`, `StatusBadge`

---

### **📊 Analytics Features**
**Working on**: `/src/app/dashboard/analytics/page.tsx` or analytics tracking

**You need these files**:
- 📋 **Feature Docs**: `/docs/profile-features/ANALYTICS_FEATURES.md`
- 🏗️ **Implementation Guide**: `/docs/profile-features/ANALYTICS_IMPLEMENTATION.md`
- 🎨 **UI/UX Specs**: `/docs/profile-features/UI_UX_SPECIFICATIONS.md` (Analytics section)
- 🎨 **Design System**: `/design-system/components.md` + `/design-system/design-tokens.ts`
- 🔧 **Components Folder**: `/src/components/profile/analytics/`
- 📊 **Database**: `/docs/database/schema.sql` (analytics_events, profile_views tables)

**Key Design Components**: `LineChart`, `BarChart`, `PieChart`, `MetricCard`, `DateRangePicker`

---

### **📱 QR Code Features**
**Working on**: `/src/app/dashboard/qr/page.tsx` or QR generation

**You need these files**:
- 📋 **Feature Docs**: `/docs/profile-features/QR_GENERATOR_FEATURES.md`
- 🏗️ **Implementation Guide**: `/docs/profile-features/QR_GENERATOR_IMPLEMENTATION.md`
- 🎨 **UI/UX Specs**: `/docs/profile-features/UI_UX_SPECIFICATIONS.md` (QR Generator section)
- 🎨 **Design System**: `/design-system/components.md` + `/design-system/design-tokens.ts`
- 🔧 **Components Folder**: `/src/components/profile/qr/`
- 📊 **Database**: `/docs/database/schema.sql` (qr_codes, qr_scans tables)

**Key Design Components**: `QRCodeCard`, `ColorPicker`, `FileUpload`, `Modal`

---

### **🔐 Authentication Features**
**Working on**: `/src/app/auth/` or `/src/app/signup/` pages

**You need these files**:
- 🔧 **Auth Config**: `/src/lib/auth.tsx`
- 🔧 **Supabase Config**: `/src/lib/supabase.ts`
- 📊 **Database**: `/docs/database/schema.sql` (profiles, users tables)
- 🎨 **Design System**: `/design-system/components.md`

**Key Design Components**: `AuthForm`, `PrimaryButton`, `FormInput`

---

### **🎨 Theme System Features**
**Working on**: Theme switching or customization

**You need these files**:
- 🎨 **Design System**: `/design-system/design-tokens.ts` + `/design-system/colors.md`
- 🔧 **Theme Components**: `/src/components/profile/editor/ThemeCustomizer.tsx`
- 📊 **Database**: `/docs/database/schema.sql` (profiles.theme_settings)

**Key Design Components**: `ThemePresetCard`, `ColorPicker`, `ThemeProvider`

---

## 📁 File Structure Reference

### **When you need to create a NEW component, put it here:**
```
src/components/profile/
├── editor/          # Profile editing (dashboard/profile)
├── public/          # Public profile display ([username])
├── payments/        # Payment dashboard (dashboard/payments)
├── analytics/       # Analytics dashboard (dashboard/analytics)
├── qr/             # QR code management (dashboard/qr)
└── shared/         # Components used across multiple areas
```

### **When you need to create a NEW API endpoint, put it here:**
```
src/app/api/
├── profile/        # Profile CRUD operations
├── social-links/   # Social links management
├── payment-methods/ # Payment methods CRUD
├── goals/          # Goals management
├── stripe/         # Stripe integration
├── analytics/      # Analytics tracking
├── qr/            # QR code generation
└── tip/           # Tip processing
```

### **When you need database info:**
```
database/
├── schema.sql              # Main database schema
├── enhanced_schema.sql     # Enhanced schema with all tables
└── README.md              # Database setup instructions
```

---

## 🎨 Design System Quick Reference

### **Always import these first:**
```typescript
import { designTokens } from '@/design-system/design-tokens'
import { 
  GlassCard, 
  PrimaryButton, 
  SecondaryButton 
} from '@/design-system/components'
```

### **Common Design Patterns:**
- **Cards**: Always use `GlassCard` for content sections
- **Buttons**: `PrimaryButton` for main actions, `SecondaryButton` for secondary
- **Colors**: Use `designTokens.colors.background.primary` instead of hardcoded colors
- **Spacing**: Use `designTokens.spacing.section` for consistent spacing
- **Typography**: Use `designTokens.typography.fontSize.body` for consistent text

---

## 🔧 Common Code Patterns

### **Database Operations:**
```typescript
// Always import Supabase client
import { supabase } from '@/lib/supabase'

// Example CRUD pattern
const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', userId)
  .single()
```

### **Error Handling:**
```typescript
try {
  // Database operation
  const result = await someOperation()
  toast.success('Operation successful!')
} catch (error) {
  console.error('Operation failed:', error)
  toast.error('Operation failed')
}
```

### **Loading States:**
```typescript
const [isLoading, setIsLoading] = useState(false)

const handleSave = async () => {
  setIsLoading(true)
  try {
    // Save operation
  } finally {
    setIsLoading(false)
  }
}
```

---

## 🎯 Feature-Specific Quick Help

### **Need to add a new social platform?**
1. Check: `/docs/profile-features/PROFILE_EDITOR_IMPLEMENTATION.md` (Social Links section)
2. Update: `/src/components/profile/editor/PlatformSelector.tsx`
3. Add icon to: `/src/components/ui/icons.tsx`
4. Update: Database `social_links` table if needed

### **Need to add a new payment method?**
1. Check: `/docs/profile-features/PAYMENT_SYSTEM_IMPLEMENTATION.md`
2. Update: `/src/components/profile/editor/PaymentMethodsEditor.tsx`
3. Add to: `/src/lib/payments.ts`
4. Update: Database `payment_methods` table

### **Need to add a new analytics event?**
1. Check: `/docs/profile-features/ANALYTICS_IMPLEMENTATION.md`
2. Update: `/src/lib/analytics/tracking.ts`
3. Add to: Database `analytics_events` table

### **Need to add a new QR type?**
1. Check: `/docs/profile-features/QR_GENERATOR_IMPLEMENTATION.md`
2. Update: `/src/components/profile/qr/QRTypeSelector.tsx`
3. Add logic to: `/src/app/api/qr/create/route.ts`

### **Need to add a new theme?**
1. Check: `/design-system/design-tokens.ts`
2. Update: `/design-system/colors.md`
3. Add theme to: `/src/components/profile/editor/ThemeCustomizer.tsx`

---

## 🚨 Common Issues & Solutions

### **"Component not found" error?**
- Check if you imported from the right path
- Make sure you exported the component in the folder's `index.ts`
- Check the component architecture in the implementation guide

### **"Database connection failed" error?**
- Check `/src/lib/supabase.ts` configuration
- Verify environment variables in `.env.local`
- Check database schema in `/database/schema.sql`

### **"Design system component not working" error?**
- Make sure you imported from `/design-system/components`
- Check if design tokens are imported: `/design-system/design-tokens.ts`
- Verify CSS classes are applied correctly

### **"Real-time updates not working" error?**
- Check Supabase real-time subscription setup
- Verify Row Level Security policies
- Check network tab for WebSocket connections

---

## 📚 **Complete Documentation Index**

### 📋 **Feature Documentation**
- `docs/profile-features/PUBLIC_PROFILE_FEATURES.md` → Public profile specifications
- `docs/profile-features/PROFILE_EDITOR_FEATURES.md` → Profile editor specifications  
- `docs/profile-features/PAYMENT_SYSTEM_FEATURES.md` → Payment system specifications
- `docs/profile-features/ANALYTICS_FEATURES.md` → Analytics dashboard specifications
- `docs/profile-features/SHARED_COMPONENTS.md` → Reusable component specifications

### 🏗️ **Implementation Guides**
- `docs/profile-features/PUBLIC_PROFILE_IMPLEMENTATION.md` → Public profile development
- `docs/profile-features/PROFILE_EDITOR_IMPLEMENTATION.md` → Profile editor development
- `docs/profile-features/PAYMENT_SYSTEM_IMPLEMENTATION.md` → Payment system development  
- `docs/profile-features/ANALYTICS_IMPLEMENTATION.md` → Analytics development
- `docs/profile-features/QR_GENERATOR_IMPLEMENTATION.md` → QR code development

### 🎨 **UI/UX & Design**
- `docs/profile-features/UI_UX_SPECIFICATIONS.md` → Complete interface specifications
- `design-system/README.md` → Design system overview
- `design-system/components.md` → Component library specifications
- `design-system/design-tokens.ts` → CSS variables and theme system
- `design-system/colors.md` → Color system documentation
- `design-system/typography.md` → Typography specifications
- `design-system/layout-patterns.md` → Layout guidelines

### 🗄️ **Database & Setup**
- `database/schema.sql` → Core database schema
- `database/enhanced_schema.sql` → Extended schema with all features
- `database/README.md` → Database documentation
- `setup-database.md` → Database setup instructions
- `supabase/migrations/` → Database migration files

### 🗺️ **Master Planning**
- `docs/profile-features/IMPLEMENTATION_ROADMAP.md` → Phase-by-phase development plan
- `docs/PROFILE_ECOSYSTEM_ANALYSIS.md` → Complete system analysis

---

## 📞 **Need More Help?**

### 🔍 **Feature Not Listed Here?**
- 📖 Check: `docs/PROFILE_ECOSYSTEM_ANALYSIS.md` (complete system overview)
- 🗂️ Browse: `src/components/` folders for existing components
- 📋 Review: `docs/profile-features/` for all feature documentation

### 🧩 **Looking for Components?**
- 🎨 **Base UI**: `src/components/ui/` (buttons, inputs, cards, etc.)
- 🎨 **Design System**: `design-system/components.md` (specifications)
- 🏗️ **Profile Components**: `src/components/profile/` (feature-specific)

### 🔌 **API Issues?**
- 📂 **Endpoints**: Check `src/app/api/` directory structure
- 📖 **Implementation**: Read feature-specific implementation guides
- 🔧 **Config**: Verify `src/lib/` configuration files

### 🗄️ **Database Questions?**
- 📋 **Schema**: `database/README.md` and `database/schema.sql`
- 🔄 **Migrations**: `supabase/migrations/` directory
- 📝 **Types**: `src/types/supabase.ts` for TypeScript definitions

### 🎨 **Design System Questions?**
- 📖 **Overview**: `design-system/README.md`
- 🎨 **Components**: `design-system/components.md`
- 🌈 **Colors**: `design-system/colors.md`
- 📏 **Layout**: `design-system/layout-patterns.md`

---

**📌 Last Updated**: July 11, 2025  
**👥 Maintained By**: DriplyPay Development Team  
**🏷️ Version**: 2.0.0

**💡 Pro Tip**: Bookmark this page! Anytime you're stuck, just search for your feature name in this blueprint and it will tell you exactly where to look.

**🔄 Contributing**: When you add new features or components, update this blueprint to help future developers!
