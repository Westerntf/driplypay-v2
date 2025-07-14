# DriplyPay Component Library

## Glass Card Component

### Payment Methods Card
```tsx
<div 
  style={{
    background: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(16px)'
  }}
  className="rounded-2xl shadow-xl px-6 py-8 max-w-xl w-full border border-white/10">
  {/* Content */}
</div>
```

**Key Properties:**
- Semi-transparent black background (80% opacity)
- 16px backdrop blur for glass effect
- 24px border radius (rounded-2xl)
- White border with 10% opacity
- Maximum width of 576px (max-w-xl)
- Padding: 24px horizontal, 32px vertical

## Button Components

### Primary CTA Button
```tsx
<button 
  style={{ 
    background: 'linear-gradient(to right, #60A5FA, #8B5CF6, #60A5FA)',
    color: 'white',
    boxShadow: '0 10px 15px -3px rgba(96, 165, 250, 0.3)',
    minWidth: '240px'
  }} 
  className="font-semibold py-4 px-16 rounded-xl text-lg transition-all duration-300 hover:opacity-90">
  Get Started
</button>
```

**Properties:**
- Brand gradient background
- Blue glow shadow effect
- Minimum width of 240px
- 16px vertical, 64px horizontal padding
- 12px border radius (rounded-xl)
- Hover: 90% opacity transition
- 300ms transition duration

### Secondary Button
```tsx
<button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105">
  Get Started Free
</button>
```

## Feature Cards

### How It Works Cards
```tsx
<div className="text-center">
  <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-6 mb-4">
    <div className="text-3xl mb-2">📋</div>
    <h3 className="text-xl font-semibold text-white mb-2">Custom Tip Menu</h3>
  </div>
  <p className="text-gray-400">Add services, content, custom requests</p>
  <p className="text-gray-400 text-sm mt-2">Set price, description, delivery type</p>
</div>
```

### Feature List Items
```tsx
<div className="text-left">
  <div className="text-green-400 mb-2">✓</div>
  <h3 className="text-white font-semibold mb-2">Keep 100% of your content</h3>
  <p className="text-gray-400 text-sm">Full control over your content and audience</p>
</div>
```

## Logo/Payment Icons

### Payment Method Icons
```tsx
<div className="flex justify-center items-center space-x-8 md:space-x-12">
  <div className="flex items-center">
    <Image 
      src="/images/stripe.svg" 
      alt="Stripe" 
      width={48} 
      height={28} 
      className="opacity-90 hover:opacity-100 transition-opacity drop-shadow-md"
    />
  </div>
  <div className="flex items-center">
    <Image 
      src="/images/cashapp.svg" 
      alt="Cash App" 
      width={40} 
      height={40} 
      className="opacity-90 hover:opacity-100 transition-opacity drop-shadow-md"
    />
  </div>
</div>
```

## Layout Components

### Section Container
```tsx
<section className="py-20 px-4">
  <div className="max-w-6xl mx-auto">
    {/* Content */}
  </div>
</section>
```

### Hero Section
```tsx
<section className="relative min-h-screen flex items-center justify-center px-4 pt-16">
  <div className="text-center max-w-2xl mx-auto">
    {/* Content */}
  </div>
</section>
```

## Glow Effects

### Background Glow
```tsx
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
```

## Component Guidelines

1. **Glass morphism cards** should always use `rgba(0, 0, 0, 0.8)` background with `blur(16px)`
2. **All interactive elements** should have hover states and transitions
3. **Icons should be consistent sizes** - 40-48px for payment methods
4. **Gradients should follow brand colors** - blue to purple spectrum
5. **Maintain consistent spacing** using Tailwind's spacing scale
6. **Always include proper accessibility** attributes (alt text, etc.)
