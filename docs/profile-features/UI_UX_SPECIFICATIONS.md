# UI/UX Interface Specifications

## Overview
This document defines the exact interface elements, buttons, modals, workflows, and interactions for each feature in DriplyPay. This serves as the blueprint for building the actual components.

---

## 🎨 Theme Customization Feature

### **Basic Theme Selector**
**Interface**: Horizontal card layout with 3 preset themes
**Elements**:
- **Theme Cards**: 3 cards (Clean, Neon, Luxe) with preview thumbnails
- **Selection State**: Selected theme has blue border + checkmark
- **Apply Button**: "Apply Theme" button (appears when selection changes)
- **Preview Button**: "Live Preview" button next to each theme

**Interaction Flow**:
1. User clicks theme card → card highlights, Apply button appears
2. User clicks "Apply" → theme saves, success toast appears
3. User clicks "Live Preview" → opens preview window with that theme

### **Advanced Theme Customizer** (Pro Feature)
**Interface**: Modal/sidebar panel with tabbed sections
**Modal Structure**:
- **Header**: "Customize Theme" + Close (X) button
- **Tabs**: Colors | Fonts | Layout | Advanced
- **Footer**: Cancel | Save Changes | Reset to Default

**Colors Tab**:
- **Primary Color Picker**: Large color wheel + hex input
- **Secondary Color Picker**: Smaller color wheel
- **Background Options**: 
  - Solid color picker
  - Gradient builder (2 color stops)
  - Upload background image button
- **Preview Panel**: Live mini-profile preview

**Fonts Tab**:
- **Heading Font**: Dropdown with Google Fonts
- **Body Font**: Dropdown with Google Fonts  
- **Font Size Sliders**: Heading size, body size
- **Font Weight Toggle**: Normal/Bold options

**Layout Tab**:
- **Section Spacing**: Slider (Compact → Spacious)
- **Card Style**: Radio buttons (Rounded | Square | Minimal)
- **Animation Level**: Slider (None → Smooth → Bouncy)

**Advanced Tab** (Pro only):
- **Custom CSS Editor**: Code textarea with syntax highlighting
- **CSS Presets**: Dropdown with pre-made CSS snippets
- **Reset Warning**: "This will override your custom styles"

---

## 👤 Profile Basic Info Editor

### **Profile Header Section**
**Interface**: Card layout with avatar on left, form fields on right

**Avatar Upload**:
- **Current Avatar**: Circular image (96px) with hover overlay
- **Upload Button**: "Change Photo" appears on hover
- **Upload Modal**: 
  - Drag & drop area
  - "Browse Files" button
  - Image cropper with circular preview
  - "Save" | "Cancel" buttons

**Basic Info Form**:
- **Display Name**: Text input, 50 char limit with counter
- **Username**: Text input with "@" prefix, availability checker
  - Real-time validation with green checkmark/red X
  - "Check Availability" button if needed
- **Bio**: Textarea, 160 char limit with counter
- **Email**: Read-only field (grayed out)
- **Location**: Optional text input with location icon

**Buttons**:
- **Save Changes**: Primary button (bottom right)
- **Discard Changes**: Secondary button (appears if changes made)

### **Username Availability Checker**
**Interface**: Inline validation with status icons
**States**:
- **Typing**: Loading spinner next to input
- **Available**: Green checkmark + "Available!"
- **Taken**: Red X + "Username taken"
- **Invalid**: Red X + "Invalid characters"

---

## 🔗 Social Links Manager

### **Social Links List**
**Interface**: Vertical list of social link cards with drag handles

**Individual Link Card**:
- **Drag Handle**: ⋮⋮ icon on far left
- **Platform Icon**: Instagram/Twitter/etc. icon
- **Platform Name**: "Instagram" label
- **URL Input**: Text field with placeholder "@username"
- **Toggle Switch**: Enable/disable this link
- **Test Button**: "Test Link" button (opens in new tab)
- **Delete Button**: Red trash icon (far right)

**Add New Link**:
- **Add Button**: "+ Add Social Link" button at bottom
- **Platform Selector Modal**:
  - Grid of platform icons to choose from
  - "Custom Platform" option at bottom
  - Search bar at top for filtering platforms

### **Custom Platform Modal**
**Interface**: Form modal for adding custom platforms
**Fields**:
- **Platform Name**: Text input
- **Icon Upload**: Drag & drop for custom icon
- **URL Template**: Input with placeholder variables
- **Color**: Color picker for platform brand color

---

## 💳 Payment Methods Editor

### **Payment Methods List**
**Interface**: Card-based layout with payment method cards

**Individual Payment Card**:
- **Method Icon**: Stripe/PayPal/CashApp/Venmo icon (left)
- **Method Name**: "Stripe" + connection status
- **Handle/Username**: Input field for payment handle
- **Enable Toggle**: Switch to enable/disable method
- **Configure Button**: "Set Up" or "Configure" button
- **Delete Button**: Red trash icon (top right)

### **Stripe Connect Flow**
**Interface**: Multi-step modal process
**Step 1 - Welcome**:
- Stripe logo + "Connect with Stripe"
- Benefits list (instant payouts, lower fees, etc.)
- "Connect Stripe Account" primary button
- "Learn More" secondary button

**Step 2 - Stripe OAuth**:
- Redirects to Stripe's onboarding
- Loading state: "Connecting to Stripe..."

**Step 3 - Success**:
- Success checkmark animation
- "Stripe Connected Successfully!"
- Account details preview
- "Continue to Dashboard" button

### **Payment Method Configuration Modal**
**Interface**: Method-specific setup forms
**For External Methods (PayPal, CashApp, etc.)**:
- **Handle Input**: Username/handle field
- **Test Payment Button**: "Send Test Payment" 
- **QR Code Preview**: Shows generated QR code
- **Instructions**: How supporters will pay

---

## 🎯 Goals Management System

### **Goals Overview**
**Interface**: Card grid layout with goal cards

**Individual Goal Card**:
- **Goal Title**: Large text at top
- **Progress Bar**: Visual progress with percentage
- **Current/Target**: "$1,200 of $5,000" text
- **Description**: Smaller text below progress
- **Status Badge**: "Active" (green) or "Paused" (gray)
- **Edit Button**: Pencil icon (top right)
- **Delete Button**: Trash icon (top right, on hover)

**Add New Goal**:
- **Add Button**: Large "+ Create New Goal" card
- **Quick Goal Templates**: "New Equipment", "Monthly Goal", etc.

### **Goal Editor Modal**
**Interface**: Full-screen modal with form sections

**Goal Details Section**:
- **Title Input**: Text field with placeholder
- **Description**: Rich text editor (bold, italic, links)
- **Target Amount**: Number input with currency symbol
- **Goal Type**: Dropdown (One-time | Monthly | Equipment | Other)

**Goal Settings Section**:
- **Active Toggle**: "Make this goal active"
- **Privacy Setting**: Radio buttons (Public | Supporters Only)
- **End Date**: Optional date picker
- **Auto-deactivate**: Checkbox "Deactivate when reached"

**Goal Preview Section**:
- **Live Preview**: Shows how goal appears on public profile
- **Progress Simulation**: Slider to preview different progress levels

**Modal Footer**:
- **Delete Goal**: Red button (left side, if editing)
- **Cancel**: Secondary button
- **Save Goal**: Primary button

---

## 📊 Analytics Dashboard

### **Main Dashboard Layout**
**Interface**: Dashboard grid with metric cards and charts

**Key Metrics Cards** (Top Row):
- **Total Earnings**: Large number + percentage change
- **Profile Views**: Number + mini line chart
- **Tip Count**: Number + percentage change
- **Conversion Rate**: Percentage + trend arrow

**Charts Section**:
- **Earnings Chart**: Line chart with time period selector
- **Traffic Sources**: Pie chart with legend
- **Payment Methods**: Bar chart showing method performance

### **Detailed Analytics Modal**
**Interface**: Full-screen modal with tabbed sections
**Tabs**: Overview | Earnings | Traffic | Payments | Goals

**Earnings Tab**:
- **Date Range Picker**: Last 7 days | 30 days | 3 months | Custom
- **Earnings Breakdown**: Table with date, amount, method, supporter
- **Export Button**: "Export to CSV"
- **Filter Options**: By payment method, amount range, date

**Traffic Tab**:
- **Source Breakdown**: Social media, direct, QR codes, etc.
- **Geographic Data**: Map or country list
- **Device Types**: Mobile vs Desktop breakdown

---

## 📱 QR Code Generator

### **QR Code Manager**
**Interface**: Grid layout with QR code cards

**QR Code Card**:
- **QR Code Image**: Large QR code preview
- **Code Type**: "Profile Link" | "Fixed Amount" | "Payment Method"
- **Description**: Text description of what code does
- **Scan Count**: "Scanned 23 times"
- **Download Button**: "Download PNG"
- **Share Button**: Native share menu
- **Delete Button**: Trash icon

### **Create QR Code Modal**
**Interface**: Multi-step wizard

**Step 1 - QR Type Selection**:
- **Profile QR**: Card with profile icon
- **Fixed Amount QR**: Card with dollar icon  
- **Payment Method QR**: Card with payment icon
- **Custom Link QR**: Card with link icon

**Step 2 - QR Configuration**:
**For Fixed Amount QR**:
- **Amount Input**: Number field with currency
- **Message**: Optional message field
- **Payment Method**: Dropdown selector

**Step 3 - QR Customization**:
- **Color Picker**: QR code color selection
- **Logo Upload**: Add logo to center of QR code
- **Size Options**: Small | Medium | Large
- **Format**: PNG | SVG | PDF

**Step 4 - Preview & Download**:
- **Large QR Preview**: Shows final QR code
- **Test Scan**: "Test with your phone" instructions
- **Download Options**: Multiple format buttons
- **Save for Later**: Add to QR code collection

---

## 🔄 Live Preview System

### **Preview Panel**
**Interface**: Embedded iframe with controls

**Preview Container**:
- **Device Toggle**: Mobile | Tablet | Desktop icons
- **Theme Override**: Temporarily preview different themes
- **Zoom Controls**: Zoom in/out buttons
- **Refresh Button**: Force preview refresh

**Preview Header**:
- **Preview URL**: Shows current preview URL
- **Share Preview**: Share button for preview link
- **Open in New Tab**: External link icon

### **Preview Sync Indicator**
**Interface**: Status indicator showing sync state
**States**:
- **Synced**: Green dot + "Preview is up to date"
- **Syncing**: Spinning icon + "Updating preview..."
- **Error**: Red dot + "Preview sync failed"

---

## 🎛️ Dashboard Navigation

### **Sidebar Navigation**
**Interface**: Collapsible sidebar with section groupings

**Profile Section**:
- **Basic Info**: User icon + "Basic Info"
- **Social Links**: Link icon + "Social Links" + count badge
- **Payment Methods**: Credit card icon + "Payments" + setup status
- **Goals**: Target icon + "Goals" + active count
- **Theme**: Palette icon + "Theme & Style"

**Analytics Section**:
- **Overview**: Chart icon + "Analytics"
- **QR Codes**: QR icon + "QR Codes" + count

**Account Section**:
- **Settings**: Gear icon + "Settings"
- **Billing**: Dollar icon + "Billing" + plan badge

### **Mobile Navigation**
**Interface**: Bottom tab bar for mobile
**Tabs**: Edit | Preview | Analytics | QR | Settings

---

## 🔔 Notifications & Feedback

### **Toast Notifications**
**Interface**: Slide-in notifications (top right)
**Types**:
- **Success**: Green with checkmark icon
- **Error**: Red with X icon  
- **Warning**: Yellow with exclamation icon
- **Info**: Blue with info icon

**Examples**:
- "Profile saved successfully!"
- "Username is already taken"
- "Payment method connected"
- "Goal created and activated"

### **Progress Indicators**
**Interface**: Various loading states
**Types**:
- **Button Loading**: Spinner inside button during save
- **Section Loading**: Skeleton placeholders
- **Full Page Loading**: Center spinner with text
- **Upload Progress**: Progress bar for file uploads

---

## 🔐 Settings & Privacy

### **Privacy Settings Modal**
**Interface**: Sectioned form with toggle switches

**Profile Visibility**:
- **Public Profile**: Toggle "Anyone can view my profile"
- **Search Engines**: Toggle "Allow search engines to index"
- **Social Sharing**: Toggle "Allow profile sharing"

**Payment Privacy**:
- **Show Recent Tips**: Toggle recent activity display
- **Show Tip Amounts**: Toggle amount visibility
- **Anonymous Tips**: Toggle anonymous tip option

**Data & Analytics**:
- **Analytics Tracking**: Toggle internal analytics
- **Third-party Analytics**: Toggle external tracking
- **Data Export**: "Download my data" button

This specification provides the exact interface elements and workflows needed to build each feature. Each section can now be implemented with precise UI components and interaction patterns.
