# DriplyPay Typography System

## Font Family
```css
font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif;
```
**System fonts for clean, native appearance across all platforms**

## Typography Scale

### Display Text (Logo)
```css
/* Desktop */
font-size: 9rem; /* text-9xl */
font-weight: 900; /* font-extrabold */
letter-spacing: -0.04em;
line-height: 1;

/* Mobile */
font-size: 8rem; /* text-8xl */
```
**Usage:** Main "DRIPLYPAY" logo only

### Headings

#### H1 - Main Tagline
```css
/* Desktop */
font-size: 1.875rem; /* text-3xl */
font-weight: 900; /* font-extrabold */
letter-spacing: -0.02em;

/* Mobile */
font-size: 1.5rem; /* text-2xl */
```
**Usage:** "THE ADULT CREATOR PAYMENT PLATFORM"

#### H2 - Section Headers
```css
font-size: 3rem; /* text-5xl */
font-weight: 700; /* font-bold */

/* Mobile */
font-size: 2.25rem; /* text-4xl */
```
**Usage:** "How it Works", "Ready to get started?"

#### H3 - Card Titles
```css
/* Desktop */
font-size: 1.25rem; /* text-xl */
font-weight: 900; /* font-extrabold */

/* Mobile */
font-size: 1.125rem; /* text-lg */
```
**Usage:** "BUILT FOR CREATORS NOT PLATFORMS"

### Body Text

#### Large Body
```css
font-size: 1.25rem; /* text-xl */
font-weight: 600; /* font-semibold */
color: #E5E7EB; /* gray-200 */
```
**Usage:** Main description text under tagline

#### Regular Body
```css
/* Desktop */
font-size: 1rem; /* text-base */
font-weight: 500; /* font-medium */

/* Mobile */
font-size: 0.875rem; /* text-sm */
```
**Usage:** Card descriptions, feature text

#### Small Text
```css
font-size: 0.875rem; /* text-sm */
font-weight: 400; /* font-normal */
color: #9CA3AF; /* gray-400 */
```
**Usage:** Secondary information, fine print

## Typography Patterns

### Gradient Text Effect
```css
background-image: linear-gradient(to right, #60A5FA, #8B5CF6, #60A5FA);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
font-weight: 900;
letter-spacing: -0.02em;
```

### Responsive Text Sizing
Always use responsive classes:
```css
/* Pattern: text-{mobile} md:text-{desktop} */
class="text-2xl md:text-3xl"
class="text-lg md:text-xl"
class="text-sm md:text-base"
```

### Text Spacing
```css
/* Tight tracking for large text */
letter-spacing: -0.04em; /* For display text */
letter-spacing: -0.02em; /* For headings */

/* Line height */
line-height: 1; /* For display text */
line-height: 1.2; /* For headings */
line-height: 1.5; /* For body text */
```

## Usage Guidelines

1. **Use system fonts** for performance and native feel
2. **Maintain font weight hierarchy** - 900 for display, 700-800 for headings, 400-600 for body
3. **Apply responsive sizing** to all text elements
4. **Use gradient text sparingly** - only for key brand messaging
5. **Ensure proper contrast** - always test text against dark backgrounds
6. **Use whitespace-nowrap** for text that should stay on one line across devices
