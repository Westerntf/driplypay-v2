# DriplyPay Layout & Spacing System

## Container Widths

### Page Containers
```css
/* Main content container */
max-width: 96rem; /* max-w-6xl = 1152px */

/* Hero content container */
max-width: 42rem; /* max-w-2xl = 672px */

/* Card containers */
max-width: 36rem; /* max-w-xl = 576px */
```

## Spacing Scale

### Section Spacing
```css
/* Vertical section padding */
padding: 5rem 1rem; /* py-20 px-4 = 80px vertical, 16px horizontal */

/* Hero section additional top padding */
padding-top: 4rem; /* pt-16 = 64px */
```

### Component Spacing

#### Margins (Bottom)
```css
/* Large spacing between major sections */
margin-bottom: 4rem; /* mb-16 = 64px */

/* Medium spacing between components */
margin-bottom: 2rem; /* mb-8 = 32px */

/* Small spacing between related elements */
margin-bottom: 1.5rem; /* mb-6 = 24px */

/* Minimal spacing */
margin-bottom: 1rem; /* mb-4 = 16px */
margin-bottom: 0.5rem; /* mb-2 = 8px */
```

#### Button Spacing
```css
/* CTA button bottom margin (creates space to payment card) */
margin-bottom: 8rem; /* mb-32 = 128px */

/* Standard button bottom margin */
margin-bottom: 6.25rem; /* mb-25 = 100px */
```

### Grid Layouts

#### Feature Grid
```css
/* Desktop: 4 columns, Tablet: 2 columns, Mobile: 1 column */
grid-template-columns: repeat(4, 1fr); /* lg:grid-cols-4 */
grid-template-columns: repeat(2, 1fr); /* md:grid-cols-2 */
gap: 1.5rem; /* gap-6 = 24px */
```

#### How It Works Grid
```css
/* Desktop: 3 columns, Mobile: 1 column */
grid-template-columns: repeat(3, 1fr); /* md:grid-cols-3 */
gap: 2rem; /* gap-8 = 32px */
```

#### Additional Features Grid
```css
/* Desktop: 2 columns, Mobile: 1 column */
grid-template-columns: repeat(2, 1fr); /* md:grid-cols-2 */
gap: 3rem; /* gap-12 = 48px */
```

## Responsive Breakpoints

### Tailwind Breakpoints Used
```css
/* Mobile first (default) */
/* No prefix - applies to all screen sizes */

/* md: 768px and up (tablet) */
@media (min-width: 768px) { }

/* lg: 1024px and up (desktop) */
@media (min-width: 1024px) { }
```

### Responsive Patterns

#### Text Sizing
```css
/* Mobile → Desktop */
text-2xl md:text-3xl    /* 24px → 30px */
text-lg md:text-xl      /* 18px → 20px */
text-sm md:text-base    /* 14px → 16px */
text-8xl md:text-9xl    /* 96px → 128px */
```

#### Spacing
```css
/* Horizontal spacing adjustments */
space-x-8 md:space-x-12  /* 32px → 48px between items */
px-6 md:px-8            /* 24px → 32px horizontal padding */
```

## Layout Patterns

### Centered Content
```css
/* Horizontal centering */
margin: 0 auto;
text-align: center;

/* Flexbox centering */
display: flex;
align-items: center;
justify-content: center;
```

### Full Height Sections
```css
/* Hero section */
min-height: 100vh; /* min-h-screen */

/* Flexbox vertical centering */
display: flex;
align-items: center;
justify-content: center;
```

### Card Layouts
```css
/* Payment methods card positioning */
display: flex;
justify-content: center; /* Centers the card horizontally */
margin-bottom: 4rem; /* Space below card */

/* Card internal spacing */
padding: 2rem 1.5rem; /* py-8 px-6 = 32px vertical, 24px horizontal */
```

## Z-Index Layers

### Layer Hierarchy
```css
/* Background effects (glow) */
z-index: -1;

/* Content layer */
z-index: 0; /* default */

/* Overlay elements */
z-index: 10;

/* Modals/dropdowns */
z-index: 50;
```

## Layout Guidelines

1. **Use consistent container widths** - max-w-6xl for main content, max-w-2xl for hero
2. **Maintain vertical rhythm** - use consistent spacing multiples (4, 8, 16, 32px)
3. **Mobile-first responsive design** - start with mobile layout, enhance for desktop
4. **Center important content** - hero sections and cards should be horizontally centered
5. **Use flexbox for alignment** - prefer flexbox over floats or positioning
6. **Maintain consistent grid gaps** - use spacing that matches your spacing scale
7. **Consider reading width** - keep text containers narrow for better readability
