# DriplyPay Design System Usage Guide

This guide explains how to implement the DriplyPay design patterns consistently across the platform using the provided design system files.

## 📁 Design System Files

- `design-tokens.ts` - Central source of design values (colors, spacing, typography)
- `components.tsx` - Reusable React components implementing homepage patterns
- `utilities.css` - CSS utility classes for common styling patterns
- `layout-patterns.md` - Documentation of layout structures
- This file (`usage-guide.md`) - Implementation instructions

## 🚀 Quick Start

### 1. Import Design System Files

```tsx
// In your React components
import { 
  Section, 
  HeroSection, 
  GlassCard, 
  PrimaryButton,
  GradientText,
  FeatureCard 
} from '@/design-system/components';
import { designTokens } from '@/design-system/design-tokens';

// In your CSS files
@import '/design-system/utilities.css';
```

### 2. Use CSS Classes (Fastest Method)

```tsx
// Apply homepage styling with utility classes
<div className="glass-primary card-feature">
  <h2 className="text-section-title gradient-text-primary">Title</h2>
  <p className="text-description">Description text</p>
  <button className="btn-primary">Get Started</button>
</div>
```

### 3. Use React Components (Recommended)

```tsx
<Section>
  <GlassCard variant="primary">
    <SectionTitle>
      <GradientText>Built for Creators</GradientText>
    </SectionTitle>
    <p className="text-description">Description text</p>
    <PrimaryButton>Get Started</PrimaryButton>
  </GlassCard>
</Section>
```

## 🎨 Common Design Patterns

### Hero Section Pattern
```tsx
<HeroSection hasGlow={true}>
  <HeroTitle>DRIPLYPAY</HeroTitle>
  <div className="flex items-center justify-center mb-6">
    <SplitText parts={[
      { text: "THE ADULT CREATOR ", color: "white" },
      { text: "PAYMENT PLATFORM", isGradient: true }
    ]} />
  </div>
  <p className="text-description">
    Accept tips and payments from fans with your own secure, customizable storefront.
  </p>
  <PrimaryButton>Get Started</PrimaryButton>
</HeroSection>
```

### Glass Card Section
```tsx
<Section>
  <GlassCard variant="primary">
    <SectionTitle center={true}>
      <GradientText>BUILT FOR CREATORS</GradientText>
      <span className="text-gray-300"> NOT PLATFORMS.</span>
    </SectionTitle>
    <p className="text-description">
      Accept tips and payments instantly via Stripe and Cash App.
    </p>
  </GlassCard>
</Section>
```

### Feature Grid
```tsx
<Section>
  <TwoColumnGrid>
    <FeatureCard
      icon="/images/rules.svg"
      iconAlt="Rules"
      title={<span className="text-white">Your content, your rules</span>}
      description="Full ownership of your content and customer relationships"
    />
    <FeatureCard
      icon="/images/anonymous.svg"
      iconAlt="Anonymous"
      title={
        <>
          <span className="text-white">Accept anonymous tips </span>
          <GradientText>in seconds</GradientText>
        </>
      }
      description="Quick and easy tipping system"
    />
  </TwoColumnGrid>
</Section>
```

### How It Works Steps
```tsx
<Section>
  <ThreeColumnGrid>
    <StepCard
      icon="/images/coin.svg"
      iconAlt="Coin"
      title={
        <>
          <GradientText>CUSTOM</GradientText>
          <span className="text-white"> Tip Menu</span>
        </>
      }
      description="Add services, content, custom requests"
      subDescription="Set price, description, delivery type"
    />
    {/* Repeat for other steps */}
  </ThreeColumnGrid>
</Section>
```

## 🎯 Design Token Usage

### Colors
```tsx
// Using design tokens directly
<div style={{ 
  background: designTokens.colors.background.secondary,
  color: designTokens.colors.foreground.primary 
}}>
  Content
</div>

// Using CSS custom properties (recommended)
<div className="glass-primary text-white">
  Content
</div>
```

### Typography
```tsx
// Hero text
<h1 className="text-hero gradient-text-primary">
  DRIPLYPAY
</h1>

// Section titles
<h2 className="text-section-title">
  <GradientText>Title</GradientText>
</h2>

// Body text
<p className="text-description">
  Description text
</p>
```

### Spacing and Layout
```tsx
// Standard section
<section className="section-container">
  <div className="content-container">
    {/* Content */}
  </div>
</section>

// Using components
<Section>
  {/* Auto-applies correct spacing */}
</Section>
```

## 🔧 Customization Guidelines

### Extending Colors
```typescript
// In design-tokens.ts
export const customColors = {
  ...designTokens.colors,
  brand: {
    custom: '#your-color',
  }
};
```

### Creating New Components
```tsx
// Follow the pattern of existing components
export const CustomCard: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div 
      style={{
        background: designTokens.colors.background.secondary,
        backdropFilter: designTokens.effects.backdrop.blur,
      }}
      className="rounded-2xl p-6 border border-white/10"
    >
      {children}
    </div>
  );
};
```

### Adding New Utilities
```css
/* In utilities.css */
.custom-gradient {
  background: linear-gradient(to right, #your-color1, #your-color2);
}

.custom-card {
  @apply glass-primary rounded-xl p-6;
}
```

## 📱 Responsive Implementation

### Mobile-First Approach
```tsx
// Text sizing
<h1 className="text-6xl md:text-8xl">Title</h1>

// Grid layout
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
  {/* Content */}
</div>

// Spacing
<div className="px-4 py-12 md:py-20">
  {/* Content */}
</div>
```

### Using Responsive Components
```tsx
// Components automatically handle responsive behavior
<ThreeColumnGrid>
  {/* Automatically stacks on mobile */}
</ThreeColumnGrid>

<PaymentMethods methods={paymentMethods} />
{/* Responsive spacing built-in */}
```

## ✨ Animation and Interactions

### Hover Effects
```tsx
// Using utility classes
<button className="btn-primary hover-lift">
  Button
</button>

// Using components (hover effects included)
<PrimaryButton>
  Button
</PrimaryButton>
```

### Transitions
```tsx
// Smooth transitions
<div className="transition-default hover-opacity">
  Content
</div>
```

## 🎨 Advanced Patterns

### Gradient Text Combinations
```tsx
<SplitText parts={[
  { text: "Regular text ", color: "#ffffff" },
  { text: "GRADIENT TEXT", isGradient: true },
  { text: " more text", color: "#E5E7EB" }
]} />
```

### Custom Glass Effects
```tsx
// Different glass intensities
<GlassCard variant="primary">Strong glass effect</GlassCard>
<GlassCard variant="secondary">Lighter glass effect</GlassCard>

// Or use CSS classes
<div className="glass-light">Custom glass</div>
```

### Gradient Borders
```tsx
// Using component
<GradientBorderCard>
  <h3>Card with gradient border</h3>
</GradientBorderCard>

// Using CSS classes
<div className="card-gradient-border">
  <div className="card-gradient-inner">
    Content
  </div>
</div>
```

## 🚧 Common Patterns by Page Type

### Dashboard Pages
```tsx
<div className="min-h-screen bg-black text-white driplypay-font-primary">
  <Navigation />
  <main className="pt-16">
    <Section>
      <SectionTitle>Dashboard</SectionTitle>
      <TwoColumnGrid>
        <GlassCard variant="secondary">
          {/* Stats */}
        </GlassCard>
        <GlassCard variant="secondary">
          {/* More stats */}
        </GlassCard>
      </TwoColumnGrid>
    </Section>
  </main>
</div>
```

### Form Pages
```tsx
<HeroSection hasGlow={false}>
  <SectionTitle>
    <GradientText>Sign Up</GradientText>
  </SectionTitle>
  <GlassCard variant="secondary" className="max-w-md mx-auto">
    {/* Form content */}
    <PrimaryButton>Submit</PrimaryButton>
  </GlassCard>
</HeroSection>
```

### Profile Pages
```tsx
<Section>
  <div className="max-w-4xl mx-auto">
    <GlassCard variant="primary">
      <div className="flex items-center space-x-6 mb-8">
        <IconContainer size="lg">
          {/* Profile icon */}
        </IconContainer>
        <div>
          <h1 className="text-section-title">
            <GradientText>Creator Name</GradientText>
          </h1>
        </div>
      </div>
      {/* Profile content */}
    </GlassCard>
  </div>
</Section>
```

## 🎯 Best Practices

1. **Consistency**: Always use the design system components and tokens
2. **Performance**: Import only what you need from the design system
3. **Accessibility**: Components include focus states and ARIA support
4. **Mobile-First**: Start with mobile design, enhance for desktop
5. **Maintainability**: Use components over inline styles when possible

## 🔍 Debugging Tips

- Use browser dev tools to inspect CSS custom properties
- Check that design-tokens.ts is properly imported
- Verify Tailwind CSS is processing the utility classes
- Ensure components have proper TypeScript types

This design system ensures consistent implementation of the DriplyPay homepage aesthetic across all pages while maintaining flexibility for customization.
