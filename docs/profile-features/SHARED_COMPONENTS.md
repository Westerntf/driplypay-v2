# Shared Profile Components

## Overview
Shared components are reusable UI elements and utilities used across multiple areas of the profile system. They provide consistency, reduce code duplication, and ensure a cohesive user experience throughout the platform.

## Core Shared Components

### `ProfileAvatar`
**Purpose**: Consistent avatar display across the platform
**Features**:
- Fallback avatar generation
- Multiple size variants
- Upload functionality
- Accessibility compliance
- Image optimization
- Loading states

**Props**:
```typescript
interface ProfileAvatarProps {
  src?: string
  alt: string
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  fallback?: string
  editable?: boolean
  onUpload?: (file: File) => void
  className?: string
}
```

**Usage**:
- Public profile headers
- Profile editor
- Navigation components
- Comment/activity displays

---

### `GlassCard`
**Purpose**: Consistent card styling with glassmorphism effect
**Features**:
- Theme-aware styling
- Multiple variants
- Responsive behavior
- Hover effects
- Loading states
- Custom backgrounds

**Props**:
```typescript
interface GlassCardProps {
  children: React.ReactNode
  variant?: 'default' | 'elevated' | 'flat'
  className?: string
  loading?: boolean
  onClick?: () => void
}
```

**Usage**:
- Profile sections
- Payment method cards
- Dashboard widgets
- Modal containers

---

### `GradientText`
**Purpose**: Theme-aware gradient text styling
**Features**:
- Theme integration
- Multiple gradient presets
- Animation support
- Accessibility compliance
- Custom gradients
- Responsive sizing

**Props**:
```typescript
interface GradientTextProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'accent'
  animated?: boolean
  className?: string
}
```

**Usage**:
- Headings and titles
- Call-to-action text
- Branding elements
- Emphasis text

---

### `LoadingSpinner`
**Purpose**: Consistent loading indicators
**Features**:
- Multiple spinner types
- Size variants
- Theme integration
- Accessibility features
- Custom colors
- Animation control

**Props**:
```typescript
interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg'
  variant?: 'spinner' | 'dots' | 'pulse'
  color?: string
  className?: string
}
```

**Usage**:
- Page loading states
- Button loading states
- Data fetching indicators
- Form submission states

## Form Components

### `FormField`
**Purpose**: Consistent form field wrapper with validation
**Features**:
- Label and help text
- Error state display
- Validation integration
- Required field indicators
- Accessibility features
- Responsive layout

**Props**:
```typescript
interface FormFieldProps {
  label: string
  children: React.ReactNode
  error?: string
  helpText?: string
  required?: boolean
  className?: string
}
```

**Usage**:
- Profile editing forms
- Payment setup forms
- Settings forms
- Contact forms

---

### `ValidationMessage`
**Purpose**: Display validation errors and success messages
**Features**:
- Error and success states
- Icon integration
- Animation effects
- Multiple message support
- Accessibility features
- Custom styling

**Props**:
```typescript
interface ValidationMessageProps {
  messages: ValidationMessage[]
  type: 'error' | 'success' | 'warning' | 'info'
  className?: string
}
```

**Usage**:
- Form validation feedback
- API error display
- Success confirmations
- Warning notifications

---

### `CurrencyInput`
**Purpose**: Specialized input for currency amounts
**Features**:
- Currency formatting
- Multiple currency support
- Validation rules
- Accessibility features
- Mobile optimization
- Locale support

**Props**:
```typescript
interface CurrencyInputProps {
  value: number
  onChange: (value: number) => void
  currency?: string
  min?: number
  max?: number
  placeholder?: string
  disabled?: boolean
}
```

**Usage**:
- Tip amount inputs
- Goal target amounts
- Minimum payment settings
- Fee displays

## Navigation Components

### `TabNavigation`
**Purpose**: Consistent tab navigation interface
**Features**:
- Keyboard navigation
- Active state indicators
- Mobile responsive
- Accessibility compliance
- Custom styling
- URL synchronization

**Props**:
```typescript
interface TabNavigationProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
  className?: string
}
```

**Usage**:
- Dashboard sections
- Settings pages
- Profile editor sections
- Analytics views

---

### `Breadcrumbs`
**Purpose**: Navigation breadcrumb component
**Features**:
- Hierarchical navigation
- Custom separators
- Click navigation
- Mobile truncation
- Accessibility features
- URL integration

**Props**:
```typescript
interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  onNavigate: (path: string) => void
  maxItems?: number
  className?: string
}
```

**Usage**:
- Dashboard navigation
- Settings navigation
- Help documentation
- Deep page navigation

## Data Display Components

### `StatCard`
**Purpose**: Display key statistics and metrics
**Features**:
- Trend indicators
- Icon integration
- Multiple formats
- Animation effects
- Loading states
- Click actions

**Props**:
```typescript
interface StatCardProps {
  title: string
  value: string | number
  trend?: TrendData
  icon?: React.ReactNode
  onClick?: () => void
  loading?: boolean
  format?: 'number' | 'currency' | 'percentage'
}
```

**Usage**:
- Analytics dashboard
- Revenue displays
- Performance metrics
- Goal progress

---

### `ProgressBar`
**Purpose**: Visual progress indication
**Features**:
- Animated progress
- Multiple styles
- Label support
- Color theming
- Goal tracking
- Milestone markers

**Props**:
```typescript
interface ProgressBarProps {
  value: number
  max: number
  label?: string
  showPercentage?: boolean
  animated?: boolean
  variant?: 'default' | 'success' | 'warning' | 'error'
}
```

**Usage**:
- Goal progress
- Profile completion
- Upload progress
- Loading indicators

---

### `DataTable`
**Purpose**: Tabular data display with features
**Features**:
- Sorting and filtering
- Pagination support
- Mobile responsive
- Row selection
- Export functionality
- Loading states

**Props**:
```typescript
interface DataTableProps<T> {
  data: T[]
  columns: TableColumn<T>[]
  onSort?: (column: string, direction: SortDirection) => void
  onFilter?: (filters: FilterOptions) => void
  pagination?: PaginationOptions
  loading?: boolean
}
```

**Usage**:
- Transaction history
- Analytics data
- Payment methods list
- User management

## Modal and Overlay Components

### `Modal`
**Purpose**: Consistent modal dialog interface
**Features**:
- Backdrop click handling
- Keyboard navigation
- Focus management
- Animation effects
- Mobile optimization
- Accessibility compliance

**Props**:
```typescript
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  closeOnBackdrop?: boolean
  children: React.ReactNode
}
```

**Usage**:
- Confirmation dialogs
- Form modals
- Image viewers
- Settings panels

---

### `Tooltip`
**Purpose**: Contextual help and information
**Features**:
- Multiple positioning options
- Hover and click triggers
- Keyboard accessible
- Mobile touch support
- Animation effects
- Custom styling

**Props**:
```typescript
interface TooltipProps {
  content: React.ReactNode
  children: React.ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  trigger?: 'hover' | 'click' | 'focus'
  delay?: number
}
```

**Usage**:
- Help text
- Feature explanations
- Error clarification
- Icon meanings

---

### `Dropdown`
**Purpose**: Dropdown menu component
**Features**:
- Keyboard navigation
- Search functionality
- Multi-select support
- Custom options
- Mobile optimization
- Accessibility features

**Props**:
```typescript
interface DropdownProps<T> {
  options: DropdownOption<T>[]
  value?: T | T[]
  onChange: (value: T | T[]) => void
  placeholder?: string
  searchable?: boolean
  multiple?: boolean
}
```

**Usage**:
- Form selects
- Filter controls
- Action menus
- Settings options

## Utility Components

### `CopyToClipboard`
**Purpose**: Copy text to clipboard with feedback
**Features**:
- Clipboard API integration
- Fallback for older browsers
- Success feedback
- Error handling
- Custom trigger elements
- Accessibility features

**Props**:
```typescript
interface CopyToClipboardProps {
  text: string
  children?: React.ReactNode
  onCopy?: () => void
  onError?: (error: Error) => void
  className?: string
}
```

**Usage**:
- Profile URL copying
- Payment link sharing
- Code snippets
- Reference numbers

---

### `QRCodeDisplay`
**Purpose**: QR code generation and display
**Features**:
- Dynamic QR generation
- Multiple formats
- Download functionality
- Custom styling
- Error correction
- Size variants

**Props**:
```typescript
interface QRCodeDisplayProps {
  data: string
  size?: number
  format?: 'svg' | 'canvas' | 'img'
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H'
  onDownload?: (format: string) => void
}
```

**Usage**:
- Profile QR codes
- Payment QR codes
- Share functionality
- Print materials

---

### `ImageOptimizer`
**Purpose**: Optimized image loading and display
**Features**:
- Lazy loading
- Format optimization
- Responsive images
- Placeholder support
- Error handling
- Performance monitoring

**Props**:
```typescript
interface ImageOptimizerProps {
  src: string
  alt: string
  width?: number
  height?: number
  placeholder?: string
  lazy?: boolean
  onLoad?: () => void
  onError?: () => void
}
```

**Usage**:
- Profile images
- Avatar uploads
- Background images
- Content images

## Theme and Styling

### `ThemeProvider`
**Purpose**: Theme context and management
**Features**:
- Theme switching
- CSS variable management
- Dark mode support
- Custom theme creation
- Animation preferences
- Accessibility settings

**Props**:
```typescript
interface ThemeProviderProps {
  theme: Theme
  children: React.ReactNode
  onThemeChange?: (theme: Theme) => void
}
```

**Usage**:
- App-wide theming
- Profile customization
- User preferences
- Brand styling

---

### `StyleInjector`
**Purpose**: Dynamic CSS injection for customization
**Features**:
- Custom CSS variables
- Theme overrides
- Runtime styling
- Performance optimization
- Cleanup management
- Scoped styling

**Props**:
```typescript
interface StyleInjectorProps {
  styles: CSSProperties
  scope?: string
  priority?: number
  onApply?: () => void
}
```

**Usage**:
- Custom theme variables
- Dynamic styling
- User customizations
- Brand overrides

## Integration Helpers

### `ApiErrorBoundary`
**Purpose**: Handle API errors gracefully
**Features**:
- Error catching
- Retry mechanisms
- User feedback
- Logging integration
- Fallback content
- Recovery options

**Props**:
```typescript
interface ApiErrorBoundaryProps {
  children: React.ReactNode
  onError?: (error: Error) => void
  fallback?: React.ReactNode
  retryable?: boolean
}
```

**Usage**:
- API call protection
- Data loading states
- Error recovery
- User experience

---

### `PermissionGuard`
**Purpose**: Conditional rendering based on permissions
**Features**:
- Role-based access
- Feature flags
- Subscription status
- User permissions
- Fallback content
- Loading states

**Props**:
```typescript
interface PermissionGuardProps {
  children: React.ReactNode
  permission: string | string[]
  fallback?: React.ReactNode
  loading?: boolean
}
```

**Usage**:
- Feature access control
- Pro feature gating
- Admin functionality
- Beta features

## Testing Utilities

### `TestWrapper`
**Purpose**: Provide test environment context
**Features**:
- Mock providers
- Test data setup
- Event simulation
- State management
- Cleanup utilities
- Debug helpers

**Props**:
```typescript
interface TestWrapperProps {
  children: React.ReactNode
  mockData?: any
  providers?: React.ComponentType[]
}
```

**Usage**:
- Component testing
- Integration testing
- Story book setup
- Debug environments

This comprehensive shared component system ensures consistency, maintainability, and reusability across the entire DriplyPay platform while providing the flexibility needed for different use cases and customizations.
