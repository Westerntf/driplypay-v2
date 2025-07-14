# DriplyPay Layout Patterns

This document captures all the layout patterns and structural components used in the DriplyPay homepage design.

## Page Structure

### Main Layout Pattern
```tsx
<div className="min-h-screen bg-black text-white" style={{
  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif'
}}>
  <Navigation />
  <main>
    {/* Sections */}
  </main>
  <Footer />
</div>
```

## Section Layouts

### 1. Hero Section
**Full viewport height with centered content**
```tsx
<section className="relative min-h-screen flex items-center justify-center px-4 pt-16">
  <div className="text-center max-w-2xl mx-auto">
    {/* Background glow effect */}
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
      <div style={{ 
          backgroundColor: '#3D4AFF',
          opacity: 0.12,
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)'
        }} 
        className="w-full max-w-lg h-64 rounded-full blur-3xl">
      </div>
    </div>
    
    {/* Content */}
    <h1>...</h1>
    <h2>...</h2>
    <p>...</p>
    <button>...</button>
  </div>
</section>
```

**Key Patterns:**
- `min-h-screen` for full viewport
- `relative` positioning for glow effects
- `text-center max-w-2xl mx-auto` for content centering
- `pt-16` to account for fixed navigation

### 2. Content Sections
**Standard section with container**
```tsx
<section className="py-20 px-4">
  <div className="max-w-6xl mx-auto">
    {/* Section content */}
  </div>
</section>
```

**Key Patterns:**
- `py-20` (80px) vertical padding
- `px-4` (16px) horizontal padding
- `max-w-6xl mx-auto` for content container

### 3. Glass Card Container
**Glassmorphism container pattern**
```tsx
<div 
  style={{
    background: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(16px)'
  }}
  className="rounded-2xl shadow-xl px-8 py-12 w-full border border-white/10">
  {/* Content */}
</div>
```

## Grid Layouts

### 1. Three-Column Grid (How It Works)
```tsx
<div className="grid md:grid-cols-3 gap-8">
  {/* 3 equal columns on desktop, stacked on mobile */}
</div>
```

### 2. Two-Column Grid (Features)
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
  {/* 2 columns on desktop, 1 on mobile */}
</div>
```

### 3. Payment Methods Layout
```tsx
<div className="flex justify-center items-center space-x-12 md:space-x-16">
  {/* Centered horizontal layout with spacing */}
</div>
```

## Card Patterns

### 1. Gradient Border Card
**Card with gradient border effect**
```tsx
{/* Outer div with gradient background (acts as border) */}
<div 
  className="rounded-[2rem] p-[2px] mb-4"
  style={{
    background: 'linear-gradient(135deg, #60A5FA 0%, #8B5CF6 100%)'
  }}>
  {/* Inner div with card content */}
  <div 
    className="rounded-[2rem] p-6 h-full"
    style={{
      background: 'black'
    }}>
    {/* Card content */}
  </div>
</div>
```

### 2. Feature Card
**Standard feature card with glass effect**
```tsx
<div 
  className="rounded-xl p-4 md:p-5 border border-white/10"
  style={{
    background: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(16px)'
  }}>
  <div className="flex flex-col items-center text-center space-y-3">
    {/* Icon */}
    <div className="flex-shrink-0">
      <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ 
          background: 'linear-gradient(to right, #60A5FA, #8B5CF6, #60A5FA)'
        }}>
        {/* Icon component */}
      </div>
    </div>
    
    {/* Content */}
    <div>
      <h3>...</h3>
      <p>...</p>
    </div>
  </div>
</div>
```

## Content Patterns

### 1. Icon Container
**Gradient background icon container**
```tsx
<div 
  className="w-12 h-12 rounded-full flex items-center justify-center"
  style={{
    background: 'linear-gradient(135deg, #60A5FA 0%, #8B5CF6 100%)'
  }}>
  <Image 
    src="..." 
    alt="..." 
    width={24} 
    height={24} 
    className="opacity-90"
    style={{ filter: 'invert(1)' }}
  />
</div>
```

### 2. Split Text Gradient
**Text with mixed colors and gradients**
```tsx
<h2 className="text-2xl md:text-3xl font-extrabold whitespace-nowrap">
  <span style={{ color: 'white' }}>
    THE ADULT CREATOR&nbsp;
  </span>
  <span style={{ 
      backgroundImage: 'linear-gradient(to right, #60A5FA, #8B5CF6, #60A5FA)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    }}>
    PAYMENT PLATFORM
  </span>
</h2>
```

## Responsive Patterns

### Breakpoint Usage
- **Mobile First**: Start with mobile styles, add `md:` for desktop
- **Text Scaling**: `text-2xl md:text-3xl` for responsive text
- **Spacing**: `gap-4 md:gap-6` for responsive gaps
- **Grid**: `grid-cols-1 md:grid-cols-2` for responsive columns

### Common Responsive Classes
```tsx
// Typography
"text-8xl md:text-9xl"       // Hero title
"text-2xl md:text-3xl"       // Section titles
"text-base md:text-lg"       // Body text

// Spacing
"space-x-12 md:space-x-16"   // Horizontal spacing
"gap-4 md:gap-6"             // Grid gaps
"p-4 md:p-5"                 // Padding

// Layout
"grid-cols-1 md:grid-cols-2" // Grid columns
"flex-col md:flex-row"       // Flex direction
```

## Background Effects

### 1. Glow Effect
**Subtle background glow behind hero content**
```tsx
<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
  <div style={{ 
      backgroundColor: '#3D4AFF',
      opacity: 0.12,
      position: 'absolute',
      top: '20%',
      left: '50%',
      transform: 'translateX(-50%)'
    }} 
    className="w-full max-w-lg h-64 rounded-full blur-3xl">
  </div>
</div>
```

### 2. Glass Morphism
**Consistent glass effect for cards**
```css
background: rgba(0, 0, 0, 0.8);
backdrop-filter: blur(16px);
border: 1px solid rgba(255, 255, 255, 0.1);
```

## Animation Patterns

### Hover Effects
```tsx
className="transition-all duration-300 hover:opacity-90"
className="opacity-90 hover:opacity-100 transition-opacity"
```

### Button Interactions
```tsx
className="transition-all duration-300 hover:opacity-90"
style={{ boxShadow: '0 10px 15px -3px rgba(96, 165, 250, 0.3)' }}
```

## Spacing System

### Vertical Spacing
- **Sections**: `py-20` (80px)
- **Content blocks**: `mb-10` (40px)
- **Text elements**: `mb-6` (24px), `mb-4` (16px), `mb-2` (8px)

### Horizontal Spacing
- **Page margins**: `px-4` (16px)
- **Element spacing**: `space-x-12 md:space-x-16`
- **Grid gaps**: `gap-4 md:gap-6`

## Z-Index Management
- **Navigation**: Fixed with appropriate z-index
- **Glow effects**: `pointer-events-none` to avoid interference
- **Cards**: Natural stacking with relative positioning
