# Feature Implementation Checklist - QR Wallet, Social Stories & Drag/Drop

## 🚀 Developer Reference: /BLUEPRINT.md → Profile Features
**Status**: In Progress  
**Priority**: High  
**Completion**: 45%

---

## 📋 Overview

This checklist covers three major feature implementations:
1. **QR Code Wallet System** - Generate, customize, and share QR codes
2. **Social Stories Feature** - Instagram/Snapchat-style photo stories for social links
3. **Drag & Drop Reordering** - Reorganize payment methods and social links

---

## 🗃️ Database Changes

### ✅ Phase 1: Core Schema Updates

- [x] **Apply display_order migration** ✅ COMPLETED
  - File: `supabase/migrations/20250113000001_complete_driplyPay_schema.sql`
  - What: Includes `display_order` column in `social_links` and `payment_methods` tables
  - Why: Enables drag & drop reordering functionality

- [ ] **Apply social stories migration** ⚠️ NEEDS IMPLEMENTATION
  - File: `supabase/migrations/20250713000002_create_social_stories_system.sql`
  - What: Creates `social_stories` table for photo uploads with captions and payment toggles
  - Why: Enables Instagram/Snapchat-style stories for social links
  - Status: Migration file exists but is empty

- [x] **QR codes system** ✅ COMPLETED
  - File: `supabase/migrations/20250113000001_complete_driplyPay_schema.sql`
  - What: Complete `qr_codes` table with linking, customization, and analytics
  - Why: Enables comprehensive QR code wallet functionality
  - Features: Links to payments/social/goals, visual customization, scan tracking

### ✅ Phase 2: Database Functions & Triggers

- [ ] **Create reordering function**
  ```sql
  -- Function to handle drag & drop reordering
  CREATE OR REPLACE FUNCTION update_display_order(
    table_name TEXT,
    item_id UUID,
    new_order INTEGER,
    profile_id UUID
  ) RETURNS VOID
  ```
  - What: Handles bulk reordering when items are dragged
  - Why: Maintains consistent ordering across all items

- [ ] **Create story cleanup trigger**
  ```sql
  -- Auto-delete old stories after 24 hours
  CREATE OR REPLACE FUNCTION cleanup_expired_stories()
  ```
  - What: Automatically removes expired stories
  - Why: Keeps database clean and mimics social media behavior

---

## 🔧 API Development

### ✅ Phase 1: Drag & Drop APIs

- [x] **Create reordering API endpoint** ✅ COMPLETED
  - File: `src/app/api/profile/reorder/route.ts`
  - What: Handles bulk reordering of social links and payment methods
  - How: Accept array of items with new order positions

### ✅ Phase 2: Social Stories APIs

- [ ] **Create story upload API**
  - File: `src/app/api/social-stories/route.ts`
  - What: Handles photo upload and story creation
  - How: Multer/FormData handling with image optimization

- [ ] **Create story management API**
  - File: `src/app/api/social-stories/[id]/route.ts`
  - What: CRUD operations for individual stories
  - How: GET, PUT, DELETE endpoints with validation

### ✅ Phase 3: QR Code APIs

- [ ] **Create QR generation API**
  - File: `src/app/api/qr/generate/route.ts`
  - What: Generates QR codes with logo embedding
  - How: Uses `qrcode` library with canvas for logo overlay

- [ ] **Create QR management API**
  - File: `src/app/api/qr/[profileId]/route.ts`
  - What: CRUD operations for QR codes
  - How: Standard REST endpoints with validation

---

## 🎨 Component Development

### ✅ Phase 1: Drag & Drop Components

- [ ] **Create DraggableList component**
  - File: `src/components/profile/shared/DraggableList.tsx`
  - What: Reusable drag & drop list component
  - How: Uses `@dnd-kit/core` for smooth drag interactions
  ```tsx
  <DraggableList
    items={socialLinks}
    onReorder={handleReorder}
    renderItem={(item) => <SocialLinkItem {...item} />}
  />
  ```

- [ ] **Update EditableSocialLinks component**
  - File: `src/components/profile/editor/components/EditableSocialLinks.tsx`
  - What: Add drag handles and reordering logic
  - How: Integrate DraggableList wrapper

- [ ] **Update EditablePaymentMethods component**
  - File: `src/components/profile/editor/components/EditablePaymentMethods.tsx`
  - What: Add drag handles and reordering logic
  - How: Integrate DraggableList wrapper

### ✅ Phase 2: Social Stories Components

- [ ] **Create SocialStoryUploader component**
  - File: `src/components/profile/editor/components/SocialStoryUploader.tsx`
  - What: Photo upload interface with caption and payment toggle
  - How: Drag & drop file upload with preview
  ```tsx
  <SocialStoryUploader
    socialLinkId={link.id}
    onStoryCreated={handleStoryCreated}
    themeStyles={themeStyles}
  />
  ```

- [ ] **Create StoryViewer component**
  - File: `src/components/profile/shared/StoryViewer.tsx`
  - What: Full-screen story display with caption and payment button
  - How: Modal overlay with swipe gestures

- [ ] **Create PulsatingIcon component**
  - File: `src/components/profile/shared/PulsatingIcon.tsx`
  - What: Animated social icon when story is available
  - How: CSS animations with conditional rendering
  ```tsx
  <PulsatingIcon
    icon={socialIcon}
    hasStory={hasActiveStory}
    onClick={openStoryViewer}
  />
  ```

### ✅ Phase 3: QR Code Components

- [ ] **Create QRCodeGenerator component**
  - File: `src/components/profile/qr/shared/QRCodeGenerator.tsx`
  - What: Generate QR codes with logo embedding
  - How: Canvas-based generation with customization options

- [ ] **Create QRWalletEditor component**
  - File: `src/components/profile/qr/editor/QRWalletEditor.tsx`
  - What: Full QR management interface for profile editor
  - How: Grid layout with create, edit, delete, reorder

- [ ] **Create QRWalletPublic component**
  - File: `src/components/profile/qr/public/QRWalletPublic.tsx`
  - What: Public QR wallet for quick access
  - How: Floating button with modal overlay

---

## 🎯 Integration Updates

### ✅ Phase 1: Profile Editor Integration

- [ ] **Update EditablePublicProfile.tsx**
  - What: Add QR wallet section and story management
  - How: New sections with visibility toggles
  ```tsx
  // Add to existing sections
  {showQRWallet && (
    <QRWalletEditor
      profile={profile}
      themeStyles={themeStyles}
      onQRUpdate={handleQRUpdate}
    />
  )}
  ```

- [ ] **Update social links section**
  - What: Add story upload buttons and pulsating icons
  - How: Integrate story components within existing layout

- [ ] **Update payment methods section**
  - What: Add drag handles and reordering
  - How: Wrap existing items with draggable components

### ✅ Phase 2: Public Profile Integration

- [ ] **Update PublicProfile.tsx**
  - What: Add QR wallet button and story viewers
  - How: Floating action button and modal integrations

- [ ] **Update social links display**
  - What: Add pulsating effects and story click handlers
  - How: Conditional rendering based on story availability

---

## 🛠️ Utility Development

### ✅ Phase 1: Core Utilities

- [x] **Create drag & drop utilities** ✅ COMPLETED
  - File: `src/lib/profile/drag-drop.ts`
  - What: Reordering logic and API calls
  - How: Helper functions for array manipulation

- [x] **Create story utilities** ✅ COMPLETED
  - File: `src/lib/profile/stories.ts`
  - What: Story management and expiration logic
  - How: CRUD operations and cleanup functions

- [x] **Create QR generation utilities** ✅ COMPLETED
  - File: `src/lib/profile/qr-generator.ts`
  - What: QR code generation with logo embedding
  - How: Canvas manipulation and image processing

### ✅ Phase 2: Image Processing

- [ ] **Update image upload utilities**
  - File: `src/lib/image-upload.ts`
  - What: Add story image optimization
  - How: Resize and compress images for stories

- [ ] **Create logo embedding utility**
  - File: `src/lib/profile/logo-embedder.ts`
  - What: Embed platform logos in QR codes
  - How: Canvas overlay with proper positioning

---

## 📱 Mobile Optimization

### ✅ Phase 1: Touch Interactions

- [ ] **Optimize drag & drop for mobile**
  - What: Touch-friendly drag handles and feedback
  - How: Larger touch targets and haptic feedback

- [ ] **Optimize story viewer for mobile**
  - What: Swipe gestures and full-screen display
  - How: Touch gestures with momentum scrolling

- [ ] **Optimize QR wallet for mobile**
  - What: Large QR codes optimized for scanning
  - How: Full-screen display with zoom capabilities

### ✅ Phase 2: Performance

- [ ] **Implement lazy loading**
  - What: Load QR codes and stories on demand
  - How: React.lazy and Intersection Observer

- [ ] **Optimize image loading**
  - What: Progressive loading for story images
  - How: Placeholder blur with progressive enhancement

---

## 🎨 Design System Updates

### ✅ Phase 1: Animation Library

- [ ] **Add drag & drop animations**
  - File: `src/components/ui/animations.tsx`
  - What: Smooth drag transitions and drop feedback
  - How: Framer Motion spring animations

- [ ] **Add pulsating animation**
  - File: `src/components/ui/animations.tsx`
  - What: Social icon pulsating effect
  - How: CSS keyframes with React integration

### ✅ Phase 2: Theme Integration

- [ ] **Update theme colors for QR codes**
  - File: `design-system/design-tokens.ts`
  - What: QR code colors that match profile themes
  - How: Dynamic color mapping functions

- [ ] **Add story overlay styles**
  - File: `design-system/components.md`
  - What: Story viewer overlay and caption styles
  - How: Theme-aware modal components

---

## 🧪 Testing Requirements

### ✅ Phase 1: Unit Tests

- [ ] **Test drag & drop utilities**
  - File: `src/lib/profile/__tests__/drag-drop.test.ts`
  - What: Reordering logic and edge cases
  - How: Jest with mock API calls

- [ ] **Test QR generation**
  - File: `src/lib/profile/__tests__/qr-generator.test.ts`
  - What: QR code generation with various inputs
  - How: Canvas testing with image comparison

### ✅ Phase 2: Integration Tests

- [ ] **Test story upload flow**
  - File: `src/components/profile/__tests__/story-upload.test.tsx`
  - What: Complete story creation process
  - How: React Testing Library with file upload mocks

- [ ] **Test QR wallet functionality**
  - File: `src/components/profile/__tests__/qr-wallet.test.tsx`
  - What: QR creation, editing, and deletion
  - How: Component testing with API mocks

---

## 📦 Dependencies

### ✅ Phase 1: Required Packages

- [ ] **Install drag & drop library**
  ```bash
  npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
  ```

- [ ] **Install QR code library**
  ```bash
  npm install qrcode @types/qrcode canvas
  ```

- [ ] **Install image processing**
  ```bash
  npm install sharp react-image-crop
  ```

### ✅ Phase 2: Optional Enhancements

- [ ] **Install gesture library**
  ```bash
  npm install @use-gesture/react
  ```

- [ ] **Install animation library**
  ```bash
  npm install framer-motion
  ```

---

## 🚀 Deployment Checklist

### ✅ Phase 1: Database Deployment

- [ ] **Run migrations in staging**
  - What: Test all database changes
  - How: Supabase CLI migration commands

- [ ] **Verify indexes and performance**
  - What: Ensure query performance is optimal
  - How: Database query analysis

### ✅ Phase 2: Feature Flags

- [ ] **Implement feature toggles**
  - What: Gradual rollout of new features
  - How: Environment variables and user-based toggles

- [ ] **Monitor performance metrics**
  - What: Track feature usage and performance
  - How: Analytics and error monitoring

---

## 📈 Success Metrics

### ✅ User Engagement Metrics

- [ ] **Track QR code creation rate**
  - What: Number of QR codes created per user
  - Target: Average 3+ QR codes per active user

- [ ] **Track story upload rate**
  - What: Percentage of social links with active stories
  - Target: 40%+ of social links have stories

- [ ] **Track reordering usage**
  - What: Percentage of users who reorder their links
  - Target: 60%+ of users customize their order

### ✅ Technical Performance Metrics

- [ ] **QR generation speed**
  - Target: < 500ms generation time
  - Method: Performance monitoring

- [ ] **Story upload success rate**
  - Target: > 95% successful uploads
  - Method: Error tracking and retry logic

- [ ] **Mobile performance**
  - Target: > 90 Lighthouse mobile score
  - Method: Regular performance audits

---

## 🎯 Implementation Priority

### 🔥 High Priority (Week 1)
1. Database migrations
2. Basic drag & drop for reordering
3. QR code generation utility
4. API endpoints for all features

### 🚀 Medium Priority (Week 2)
1. Social stories upload and display
2. QR wallet editor interface
3. Mobile optimization
4. Basic testing

### ✨ Low Priority (Week 3)
1. Advanced QR customization
2. Story analytics
3. Performance optimization
4. Comprehensive testing

---

## 📝 Notes & Considerations

### Technical Considerations
- **Image Storage**: All images stored in Supabase Storage with proper CDN caching
- **Performance**: Lazy loading and progressive enhancement for mobile users
- **Security**: Proper validation and sanitization for all user inputs
- **Accessibility**: Keyboard navigation and screen reader support

### Business Considerations
- **User Education**: Tooltips and tutorials for new features
- **Analytics**: Track feature adoption and user behavior
- **Feedback**: Collect user feedback on new functionalities
- **Support**: Documentation for customer support team

---

This checklist provides a comprehensive roadmap for implementing all three major features. Each item includes specific details on what needs to be done, how to implement it, and why it's necessary for the overall functionality.
