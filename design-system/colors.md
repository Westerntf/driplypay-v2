# DriplyPay Color Palette

## Primary Colors

### Brand Gradient
```css
background: linear-gradient(to right, #60A5FA, #8B5CF6, #60A5FA)
/* Blue-400 → Purple-500 → Blue-400 */
```
**Usage:** Main logo, primary buttons, accent text

### Background Colors
```css
/* Main background */
background: #000000 /* Pure black */

/* Card backgrounds */
background: rgba(0, 0, 0, 0.8) /* Semi-transparent black */

/* Section backgrounds */
background: #374151 /* Gray-800 for "How It Works" section */
```

## Text Colors

### Primary Text
```css
color: #FFFFFF /* Pure white for main headings */
color: #E5E7EB /* Gray-200 for descriptions */
color: #9CA3AF /* Gray-400 for secondary text */
```

### Accent Text
```css
/* Gradient text (same as brand gradient) */
background-image: linear-gradient(to right, #60A5FA, #8B5CF6, #60A5FA);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

### Interactive Text
```css
color: #60A5FA /* Blue-400 for links */
color: #8B5CF6 /* Purple-500 for hover states */
```

## Status Colors

### Success
```css
color: #10B981 /* Green-500 for checkmarks and success states */
```

### Borders
```css
border-color: rgba(255, 255, 255, 0.1) /* White with 10% opacity */
```

## Usage Guidelines

1. **Always use pure black (#000000) for main backgrounds**
2. **Use the brand gradient sparingly** - only for key elements like logos and primary CTAs
3. **Maintain high contrast** - white/light text on dark backgrounds
4. **Use rgba() for transparency effects** - creates depth and layering
5. **Gradient text should be reserved** for brand messaging and important headings
