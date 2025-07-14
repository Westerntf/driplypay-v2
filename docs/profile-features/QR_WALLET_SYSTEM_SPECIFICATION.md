# QR Code Wallet System - Complete Specification

## 🚀 Developer Reference: /BLUEPRINT.md → QR Code Features
**Status**: Implementation Required  
**Priority**: High  
**Completion**: 0%

---

## 📋 What is the QR Code Wallet System?

The QR Code Wallet System is a comprehensive solution that allows creators to generate, customize, store, and share QR codes for different purposes (profile, payments, social links). It acts as a digital wallet where users can quickly access and display specific QR codes at parties, events, or social interactions.

### Why Does This Exist?

**Problem**: Creators need an easy way to share different links (social media, payment methods, profile) in real-world scenarios without typing URLs or usernames.

**Solution**: A digital wallet of customized QR codes that can be instantly accessed and displayed, with each QR code having the appropriate logo embedded (payment provider logos, social platform logos, or profile branding).

**Use Case**: At a party, a creator opens their profile, clicks their "QR Wallet," selects their Instagram QR code (with Instagram logo embedded), and shows it to someone who scans it to instantly follow them.

---

## 🎯 Core Features

### 1. QR Code Types
- **Profile QR**: Links to full profile page
- **Payment QR**: Direct links to specific payment methods (Venmo, PayPal, CashApp, etc.)
- **Social QR**: Direct links to social media accounts (Instagram, TikTok, Twitter, etc.)

### 2. Logo Embedding System
- **Payment QRs**: Embed official payment provider logos (Venmo, PayPal, Stripe, etc.)
- **Social QRs**: Embed official social platform logos (Instagram, TikTok, Twitter, etc.)
- **Profile QRs**: Embed user's avatar or DriplyPay wallet logo

### 3. QR Wallet Interface
- **Editor Wallet**: Full editing capabilities, manage all QR codes
- **Public Wallet**: Quick access wallet for sharing at events
- **Mobile Optimized**: Touch-friendly interface for easy selection

---

## 🏗️ System Architecture

### Database Schema Requirements

```sql
-- QR Codes table
CREATE TABLE qr_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- QR Code Info
  name VARCHAR(100) NOT NULL,
  type VARCHAR(20) NOT NULL, -- 'profile', 'payment', 'social'
  url TEXT NOT NULL,
  
  -- Visual Customization
  style VARCHAR(20) DEFAULT 'classic', -- 'classic', 'rounded', 'minimal', 'branded'
  color VARCHAR(7) DEFAULT '#4F46E5', -- Hex color
  size VARCHAR(20) DEFAULT 'medium', -- 'small', 'medium', 'large', 'xlarge'
  logo_type VARCHAR(20), -- 'payment', 'social', 'profile', 'custom'
  logo_identifier VARCHAR(50), -- e.g., 'venmo', 'instagram', 'profile'
  
  -- QR Code Data
  qr_data_url TEXT, -- Generated QR code as data URL
  
  -- Metadata
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_qr_codes_profile_id ON qr_codes(profile_id);
CREATE INDEX idx_qr_codes_type ON qr_codes(type);
CREATE INDEX idx_qr_codes_active ON qr_codes(is_active);
```

### Component Structure

```
src/components/profile/qr/
├── shared/
│   ├── QRCodeDisplay.tsx        # Displays a single QR code
│   ├── QRCodeGenerator.tsx      # Generates QR codes with customization
│   ├── LogoEmbedder.tsx         # Handles logo embedding logic
│   └── QRCodePreview.tsx        # Preview component
├── editor/
│   ├── QRWalletEditor.tsx       # Full QR management interface
│   ├── QRCodeCreator.tsx        # Create new QR codes
│   ├── QRCodeCustomizer.tsx     # Customize existing QR codes
│   └── QRLibraryManager.tsx     # Manage QR code library
├── public/
│   ├── QRWalletPublic.tsx       # Public wallet for quick access
│   ├── QRWalletModal.tsx        # Full-screen QR display modal
│   └── QRQuickAccess.tsx        # Compact wallet widget
└── utils/
    ├── qr-generator.ts          # QR generation utilities
    ├── logo-mapper.ts           # Maps platforms to logos
    └── qr-storage.ts            # QR code CRUD operations
```

---

## 🎨 User Interface Design

### 1. Editor Interface (Edit Profile Page)

```tsx
// QR Wallet Section in EditablePublicProfile.tsx
<EditableQRWallet 
  profile={profile}
  themeStyles={themeStyles}
  isVisible={showQRWallet}
  onToggleVisibility={() => handleToggleVisibility('qr_wallet', !showQRWallet)}
/>
```

**Features**:
- Grid layout of existing QR codes
- "Create New QR" button
- Edit/Delete options for each QR
- Drag-and-drop reordering
- Preview functionality

### 2. Public Interface (Public Profile Page)

```tsx
// QR Wallet Widget in PublicProfile.tsx
<QRWalletPublic 
  qrCodes={profile.qr_codes}
  themeStyles={themeStyles}
  isVisible={showQRWallet}
/>
```

**Features**:
- Compact wallet icon/button
- Modal overlay with QR grid
- Full-screen QR display
- Quick share options
- Mobile-optimized touch interface

---

## 🔧 Technical Implementation Steps

### Phase 1: Database & API Setup
1. **Create Migration**: Add `qr_codes` table
2. **API Routes**: CRUD operations for QR codes
   - `GET /api/qr/[profileId]` - Get all QR codes
   - `POST /api/qr` - Create new QR code
   - `PUT /api/qr/[id]` - Update QR code
   - `DELETE /api/qr/[id]` - Delete QR code
3. **QR Generation Library**: Install and configure `qrcode` npm package

### Phase 2: Core Components
1. **QR Generator Utility**: Create QR codes with logos
2. **Logo Mapper**: Map platforms to their official logos
3. **QR Display Component**: Reusable QR code display
4. **Basic CRUD Interface**: Create, read, update, delete QR codes

### Phase 3: Editor Interface
1. **QR Wallet Editor**: Full management interface
2. **QR Code Creator**: Modal for creating new QR codes
3. **Customization Options**: Style, color, size selection
4. **Integration**: Add to EditablePublicProfile

### Phase 4: Public Interface
1. **QR Wallet Button**: Add to public profile
2. **QR Wallet Modal**: Full-screen QR selection
3. **QR Display Modal**: Full-screen individual QR display
4. **Mobile Optimization**: Touch-friendly interface

### Phase 5: Advanced Features
1. **Analytics**: Track QR code scans
2. **Sharing**: Direct sharing options
3. **Export**: Download QR codes as images
4. **Backup**: Export/import QR code data

---

## 🎨 Design Specifications

### QR Code Styles
```typescript
interface QRStyle {
  id: string
  name: string
  description: string
  config: {
    errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H'
    type: 'image/png' | 'image/jpeg' | 'image/svg+xml'
    quality: number
    margin: number
    color: {
      dark: string
      light: string
    }
    width: number
  }
}

const QR_STYLES: QRStyle[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional square design',
    config: {
      errorCorrectionLevel: 'M',
      type: 'image/png',
      quality: 0.92,
      margin: 1,
      color: { dark: '#000000', light: '#FFFFFF' },
      width: 256
    }
  },
  // ... more styles
]
```

### Logo Embedding Configuration
```typescript
interface LogoConfig {
  platform: string
  logoPath: string
  embedSize: number // Percentage of QR size
  position: 'center' | 'bottom-right'
  backgroundColor?: string
  borderRadius?: number
}

const LOGO_CONFIGS: Record<string, LogoConfig> = {
  venmo: {
    platform: 'venmo',
    logoPath: '/logos/venmo.svg',
    embedSize: 20,
    position: 'center',
    backgroundColor: '#3D95CE',
    borderRadius: 8
  },
  instagram: {
    platform: 'instagram',
    logoPath: '/logos/instagram.svg',
    embedSize: 18,
    position: 'center',
    backgroundColor: '#E4405F',
    borderRadius: 12
  },
  // ... more platforms
}
```

### Theme Integration
```typescript
// QR codes should adapt to profile themes
const getQRThemeColors = (theme: string) => {
  const themeStyles = getThemeStyles(theme)
  return {
    dark: themeStyles.accent.replace('from-', '').split(' ')[0], // Extract primary color
    light: '#FFFFFF',
    background: themeStyles.card
  }
}
```

---

## 📱 Mobile Experience

### Public Wallet Interface
- **Floating Action Button**: Always accessible wallet icon
- **Swipe Gestures**: Swipe between QR codes
- **Full-Screen Display**: Optimal scanning experience
- **Quick Actions**: Share, copy link, download

### Touch Interactions
- **Tap**: Select QR code
- **Long Press**: Show options menu
- **Swipe**: Navigate between QR codes
- **Pinch**: Zoom QR code for better scanning

---

## 🔐 Security & Privacy

### Data Protection
- QR codes contain only public URLs
- No sensitive information embedded
- User controls all QR code visibility
- Optional expiration dates for QR codes

### URL Validation
```typescript
const validateQRUrl = (url: string, type: 'profile' | 'payment' | 'social') => {
  // Validate URL format and domain restrictions
  // Prevent malicious URLs
  // Ensure URL matches the specified type
}
```

---

## 📊 Analytics Integration

### QR Code Metrics
- Scan count per QR code
- Geographic scan data
- Time-based usage patterns
- Popular QR code types

### Database Schema Addition
```sql
CREATE TABLE qr_code_scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  qr_code_id UUID REFERENCES qr_codes(id) ON DELETE CASCADE,
  scanned_at TIMESTAMPTZ DEFAULT NOW(),
  user_agent TEXT,
  ip_address INET,
  country VARCHAR(2),
  city VARCHAR(100)
);
```

---

## 🚀 Implementation Priority

### High Priority (MVP)
1. Database schema and migrations
2. Basic QR generation utility
3. CRUD API endpoints
4. Simple editor interface
5. Basic public wallet

### Medium Priority
1. Logo embedding system
2. Advanced customization options
3. Mobile optimization
4. Export functionality

### Low Priority (Future)
1. Analytics and tracking
2. Advanced sharing options
3. QR code expiration
4. Batch operations

---

## 🧪 Testing Strategy

### Unit Tests
- QR generation utilities
- Logo embedding functions
- URL validation
- CRUD operations

### Integration Tests
- API endpoint functionality
- Database operations
- File upload handling

### E2E Tests
- Complete QR creation flow
- Public wallet usage
- Mobile scanning experience

---

## 📚 Dependencies

### Required Packages
```json
{
  "qrcode": "^1.5.3",           // QR code generation
  "canvas": "^2.11.2",          // Image manipulation
  "@types/qrcode": "^1.5.0",    // TypeScript types
  "react-qr-code": "^2.0.12"    // React QR component (optional)
}
```

### Optional Enhancements
```json
{
  "qr-scanner": "^1.4.2",       // QR scanning (for testing)
  "html2canvas": "^1.4.1",      // Screenshot functionality
  "file-saver": "^2.0.5"        // File download utility
}
```

---

## 🎯 Success Metrics

### User Engagement
- Number of QR codes created per user
- QR code usage frequency
- Scan success rate

### Technical Performance
- QR generation speed (< 500ms)
- Image load time (< 200ms)
- Mobile responsiveness score (> 95)

### Business Impact
- Increased profile sharing
- Higher social media follow rates
- Enhanced payment conversion

---

This specification provides the complete roadmap for implementing the QR Code Wallet System. Each phase builds upon the previous one, ensuring a solid foundation while delivering incremental value to users.
