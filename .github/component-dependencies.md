# 🔗 DriplyPay Component Dependencies & Data Flow

> **Critical Reference:** How components communicate and what data they need to function properly.

---

## 📊 Core Data Models

### Profile Model (Main Entity)
```typescript
interface Profile {
  id: string
  user_id: string              // Auth user ID (critical for RLS)
  username: string             // Public URL identifier
  display_name?: string        // Display name (50 char limit)
  bio?: string                // Bio text (160 char limit)
  avatar_url?: string         // Profile image URL
  banner_url?: string         // Banner image URL
  location?: string           // Location text (100 char limit)
  theme: string               // Theme: 'ocean', 'neon', 'luxe', 'clean'
  is_verified?: boolean       // Verification status
  created_at: string
  updated_at: string
  
  // Section visibility toggles
  show_social_links?: boolean
  show_wallet_methods?: boolean
  show_goals?: boolean
  
  // Related data (loaded separately)
  wallet_methods?: WalletMethod[]
  social_links?: SocialLink[]
  goals?: Goal[]
}
```

### Wallet Method Model (Payment Systems)
```typescript
interface WalletMethod {
  id: string
  user_id: string             // CRITICAL: Must match profile.user_id
  name: string                // Display name for the method
  type: 'external' | 'payid' | 'bank'  // Determines UI behavior
  platform: string           // venmo, cashapp, paypal, payid, bank, custom
  handle?: string             // @username for external services
  url?: string               // Direct link for external services
  details?: {                // For internal methods (payid/bank)
    email?: string
    phone?: string
    bsb?: string
    account?: string
  }
  enabled: boolean           // Show/hide in public profile
  order_index: number        // Display order
  created_at: string
  updated_at: string
}
```

### Social Link Model (Social Media)
```typescript
interface SocialLink {
  id: string
  user_id: string             // CRITICAL: Must match profile.user_id
  platform: string           // instagram, twitter, tiktok, youtube, etc.
  username: string           // Display username/handle
  url: string               // Full URL to profile
  photo_url?: string        // Story photo URL
  photo_caption?: string    // Story photo caption
  wallet_method_id?: string // Optional: Link to specific payment method
  display_order: number    // Order in list
  created_at: string
  updated_at: string
}
```

---

## 🔄 Critical Data Flow Patterns

### 1. Profile Editor Page Flow
```
ProfileEditorPage (/profile-editor/page.tsx)
│
├── Loads user profile with useAuth()
├── Fetches complete profile data from database
│   ├── profiles table → main profile data
│   ├── wallet_methods table → payment methods
│   ├── social_links table → social media links
│   └── goals table → vision board items
│
└── Passes data to EditablePublicProfile
    │
    ├── Handles profile updates via onProfileUpdate callback
    ├── Manages image uploads (avatar/banner)
    ├── Controls section visibility toggles
    │
    └── Child Components:
        ├── EditableSocialLinks
        ├── EditableWalletMethods
        ├── EditableGoals
        ├── EditableThemeSelector
        └── QRCodeManager
```

### 2. Public Profile Page Flow
```
PublicProfilePage (/[username]/page.tsx)
│
├── Uses ProfileDatabase.getProfileByUsername()
├── Loads all related data in parallel
│   ├── social_links
│   ├── payment_methods (legacy)
│   ├── wallet_methods (current)
│   ├── goals
│   └── recent tips
│
└── Passes data to Public Components:
    ├── PublicProfileHeader
    ├── PublicSocialLinks
    ├── PublicWallet
    ├── PublicPaymentMethods (legacy)
    └── PublicGoals
```

---

## 🔑 Critical Dependencies

### Authentication Dependencies
```typescript
// ALL profile operations require authenticated user
const { user, profile, loading } = useAuth()

// CRITICAL: user.id must match profile.user_id for RLS
const isOwner = user?.id === profile?.user_id
```

### Database Query Dependencies
```typescript
// Profile queries MUST use user_id (not profile.id)
await supabase
  .from('wallet_methods')
  .select('*')
  .eq('user_id', user.id)  // NOT profile.id

// Order matters for display
.order('order_index', { ascending: true })
```

### Image Upload Dependencies
```typescript
// Image uploads require:
uploadProfileImage(
  file: File,
  userId: string,    // MUST be authenticated user.id
  type: 'avatar' | 'banner'  // Determines storage path
)

// Returns: { url, path, error? }
// URL gets stored in profile.avatar_url or profile.banner_url
```

---

## 📱 Component Communication Patterns

### Parent → Child Data Flow
```typescript
// EditablePublicProfile passes data down
<EditableWalletMethods
  walletMethods={profile.wallet_methods || []}
  onUpdate={(methods) => onProfileUpdate({ wallet_methods: methods })}
  isVisible={showWalletMethods}
  onToggleVisibility={() => handleToggleVisibility('wallet_methods', !showWalletMethods)}
/>

// EditableSocialLinks needs additional context
<EditableSocialLinks
  socialLinks={profile.social_links || []}
  themeStyles={themeStyles}
  onUpdate={(links) => onProfileUpdate({ social_links: links })}
  isVisible={showSocialLinks}
  onToggleVisibility={() => handleToggleVisibility('social_links', !showSocialLinks)}
  walletMethods={profile.wallet_methods || []}  // For payment linking
  userId={userId}  // For photo uploads
/>
```

### Update Callback Pattern
```typescript
// Child components call onUpdate to modify parent state
const handleMethodUpdate = (updatedMethods: WalletMethod[]) => {
  // Update local state immediately for UI responsiveness
  setLocalMethods(updatedMethods)
  
  // Call parent update function
  onUpdate(updatedMethods)
  
  // Parent will sync to database
}
```

### Database Sync Pattern
```typescript
// Profile Editor syncs changes to database
const onProfileUpdate = async (updates: Partial<Profile>) => {
  try {
    // Update different tables based on update type
    if (updates.wallet_methods) {
      await syncWalletMethods(updates.wallet_methods)
    }
    if (updates.social_links) {
      await syncSocialLinks(updates.social_links)
    }
    if (updates.goals) {
      await syncGoals(updates.goals)
    }
    
    // Update main profile table
    const profileUpdates = { ...updates }
    delete profileUpdates.wallet_methods
    delete profileUpdates.social_links
    delete profileUpdates.goals
    
    if (Object.keys(profileUpdates).length > 0) {
      await supabase
        .from('profiles')
        .update(profileUpdates)
        .eq('user_id', user.id)
    }
    
  } catch (error) {
    console.error('Profile update failed:', error)
  }
}
```

---

## 🖼️ Image Upload Flow

### Avatar/Banner Upload Process
```typescript
1. User clicks "Edit Avatar/Banner" button
2. ImageUploadModal opens with type: 'avatar' | 'banner'
3. User selects file → validated client-side
4. uploadProfileImage() called:
   ├── Creates FormData with file, userId, type
   ├── Sends to /api/upload/image endpoint
   ├── Server validates and uploads to Supabase Storage
   └── Returns { url, path, error? }
5. Success: onProfileUpdate({ avatar_url: url }) or { banner_url: url }
6. Modal closes, UI updates immediately
```

### Social Story Photo Upload
```typescript
1. User clicks camera icon on social link
2. Photo modal opens for specific link
3. File selected and uploaded via same uploadProfileImage()
4. Success: Link updated with photo_url and optional caption
5. Database synced via updateSocialLink()
```

---

## 🔗 Inter-Component Dependencies

### Social Links ↔ Wallet Methods
```typescript
// Social links can be connected to specific payment methods
interface SocialLink {
  wallet_method_id?: string  // Optional connection
}

// EditableSocialLinks needs wallet methods for linking UI
walletMethods={profile.wallet_methods || []}
```

### Theme System Dependencies
```typescript
// All components need theme styles
const themeStyles = getThemeStyles(profile.theme)

// Theme selector updates entire profile
onUpdate({ theme: newTheme })
```

### Visibility Controls
```typescript
// Section visibility affects both editor and public views
show_social_links: boolean    // Show/hide social section
show_wallet_methods: boolean  // Show/hide payment section  
show_goals: boolean          // Show/hide vision board
```

---

## ⚠️ Critical Pitfalls to Avoid

### 1. ID Mismatch Errors
```typescript
// ❌ WRONG - Using profile.id instead of user_id
.eq('profile_id', profile.id)

// ✅ CORRECT - Always use user_id for relationships
.eq('user_id', user.id)
```

### 2. Missing Authentication Checks
```typescript
// ❌ WRONG - No auth check
const handleUpdate = async (data) => {
  await supabase.from('wallet_methods').insert(data)
}

// ✅ CORRECT - Always verify user
const handleUpdate = async (data) => {
  if (!user?.id) throw new Error('Not authenticated')
  await supabase.from('wallet_methods').insert({
    ...data,
    user_id: user.id
  })
}
```

### 3. State Sync Issues
```typescript
// ❌ WRONG - Not syncing local and parent state
const [localData, setLocalData] = useState(propData)
// Missing useEffect to sync when propData changes

// ✅ CORRECT - Always sync with parent data
useEffect(() => {
  setLocalData(propData)
}, [propData])
```

### 4. Missing Error Handling
```typescript
// ❌ WRONG - No error handling
await uploadImage(file)

// ✅ CORRECT - Handle all error cases
try {
  const result = await uploadImage(file)
  if (result.error) {
    toast.error(result.error)
    return
  }
  // Handle success
} catch (error) {
  toast.error('Upload failed')
}
```

---

## 📋 Component Development Checklist

### Before Creating New Components
- [ ] Does it need authentication? Add user checks
- [ ] Does it modify data? Add proper onUpdate callback
- [ ] Does it need theme support? Accept themeStyles prop
- [ ] Does it handle errors? Add try/catch and user feedback
- [ ] Does it sync state? Add useEffect for prop changes
- [ ] Does it use user_id correctly? Never use profile.id for queries

### Before Connecting Components
- [ ] Are the data types compatible?
- [ ] Do the IDs match correctly (user_id consistency)?
- [ ] Is the update flow working (child → parent → database)?
- [ ] Are loading states handled?
- [ ] Are error states displayed to users?

---

**Remember:** The `user_id` field is the golden thread that connects everything. When in doubt, trace the user_id flow through your components to ensure data consistency.

**🔗 Integration Mantra: Authenticate first, validate always, sync everything.**
