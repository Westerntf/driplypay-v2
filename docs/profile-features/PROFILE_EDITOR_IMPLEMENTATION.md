# Profile Editor Page Implementation Guide

## 📍 Page Location
**File Path**: `/src/app/dashboard/profile/page.tsx`
**Current State**: Basic form structure exists, needs database integration and design system implementation

---

## 🎨 Design System Integration

### Required Design Tokens
```typescript
// Import from design system
import { designTokens } from '@/design-system/design-tokens'

// Key tokens for this page:
designTokens.colors.background.secondary    // Card backgrounds
designTokens.colors.border.primary          // Input borders
designTokens.spacing.section                // Section spacing
designTokens.typography.fontSize.body       // Form text
designTokens.borderRadius.card              // Card corners
```

### Required Components from Design System
```typescript
// From /design-system/components.tsx
import { 
  GlassCard,           // Main section cards
  PrimaryButton,       // Save buttons
  SecondaryButton,     // Cancel/discard buttons
  FormInput,           // Text inputs
  FormTextarea,        // Bio textarea
  ToggleSwitch,        // Enable/disable toggles
  IconButton           // Action buttons (edit, delete)
} from '@/design-system/components'
```

---

## 🔧 Component Implementation Plan

### 1. Profile Basic Info Section

**File Structure**:
```
src/components/profile/editor/
├── ProfileBasicEditor.tsx          # Main component
├── AvatarUploader.tsx             # Avatar upload functionality  
├── UsernameChecker.tsx            # Username availability
└── index.ts                       # Barrel exports
```

**Design Implementation**:
```tsx
// ProfileBasicEditor.tsx
import { GlassCard, FormInput, PrimaryButton } from '@/design-system/components'
import { designTokens } from '@/design-system/design-tokens'

export function ProfileBasicEditor({ profile, onUpdate }: Props) {
  return (
    <GlassCard className="mb-6">
      <div className="flex items-start gap-6">
        {/* Avatar Section */}
        <AvatarUploader 
          currentAvatar={profile.avatar}
          size={96} // From design tokens
          onUpload={handleAvatarUpload}
        />
        
        {/* Form Section */}
        <div className="flex-1 space-y-4">
          <FormInput
            label="Display Name"
            value={profile.displayName}
            onChange={(value) => onUpdate({ displayName: value })}
            maxLength={50}
            showCharCount
            style={{ borderColor: designTokens.colors.border.primary }}
          />
          
          <UsernameChecker 
            value={profile.username}
            onChange={(value) => onUpdate({ username: value })}
            onValidation={setUsernameValid}
          />
          
          <FormTextarea
            label="Bio"
            value={profile.bio}
            onChange={(value) => onUpdate({ bio: value })}
            maxLength={160}
            showCharCount
            rows={3}
            placeholder="Tell supporters about yourself..."
          />
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-white/10">
        <SecondaryButton onClick={handleDiscard}>
          Discard Changes
        </SecondaryButton>
        <PrimaryButton 
          onClick={handleSave}
          disabled={!hasChanges || !usernameValid}
          loading={isSaving}
        >
          Save Changes
        </PrimaryButton>
      </div>
    </GlassCard>
  )
}
```

**Database Integration**:
```typescript
// lib/profile/database.ts - specific functions for this page
export async function updateProfileBasicInfo(
  userId: string, 
  updates: Partial<Profile>
): Promise<{ success: boolean; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    
    if (error) throw error
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}
```

### 2. Social Links Section

**Component Files**:
```
src/components/profile/editor/
├── SocialLinksEditor.tsx
├── SocialLinkCard.tsx
├── PlatformSelector.tsx
└── CustomPlatformModal.tsx
```

**Design Implementation**:
```tsx
// SocialLinksEditor.tsx
export function SocialLinksEditor({ socialLinks, onUpdate }: Props) {
  return (
    <GlassCard>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Social Links</h3>
        <PrimaryButton 
          size="sm"
          onClick={() => setShowPlatformSelector(true)}
        >
          + Add Link
        </PrimaryButton>
      </div>

      {/* Drag & Drop List */}
      <DragDropContext onDragEnd={handleReorder}>
        <Droppable droppableId="social-links">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {socialLinks.map((link, index) => (
                <Draggable key={link.id} draggableId={link.id} index={index}>
                  {(provided, snapshot) => (
                    <SocialLinkCard
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      dragHandleProps={provided.dragHandleProps}
                      link={link}
                      onUpdate={(updates) => updateLink(index, updates)}
                      onDelete={() => deleteLink(index)}
                      isDragging={snapshot.isDragging}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Empty State */}
      {socialLinks.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <Icons.Link className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No social links added yet</p>
          <p className="text-sm">Add your social media profiles to help supporters find you</p>
        </div>
      )}
    </GlassCard>
  )
}
```

**Individual Social Link Card**:
```tsx
// SocialLinkCard.tsx
export function SocialLinkCard({ link, onUpdate, onDelete, ...dragProps }: Props) {
  return (
    <div 
      {...dragProps}
      className={`
        flex items-center gap-4 p-4 rounded-xl mb-3 transition-all
        ${isDragging ? 'bg-white/10 shadow-lg' : 'bg-white/5 hover:bg-white/8'}
        border border-white/10
      `}
    >
      {/* Drag Handle */}
      <div {...dragHandleProps} className="cursor-grab active:cursor-grabbing">
        <Icons.DragDots className="w-5 h-5 text-gray-400" />
      </div>

      {/* Platform Icon */}
      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
        <Icons[link.platform] className="w-6 h-6 text-white" />
      </div>

      {/* Platform Info */}
      <div className="flex-1">
        <div className="font-medium text-white capitalize">{link.platform}</div>
        <FormInput
          value={link.handle}
          onChange={(value) => onUpdate({ handle: value })}
          placeholder={`@${link.platform}username`}
          className="mt-1"
          size="sm"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <ToggleSwitch
          checked={link.enabled}
          onChange={(enabled) => onUpdate({ enabled })}
          size="sm"
        />
        <IconButton
          icon={Icons.ExternalLink}
          onClick={() => testLink(link.url)}
          size="sm"
          variant="ghost"
          tooltip="Test link"
        />
        <IconButton
          icon={Icons.Trash}
          onClick={onDelete}
          size="sm"
          variant="danger"
          tooltip="Delete link"
        />
      </div>
    </div>
  )
}
```

### 3. Payment Methods Section

**Component Files**:
```
src/components/profile/editor/
├── PaymentMethodsEditor.tsx
├── PaymentMethodCard.tsx
├── StripeConnectModal.tsx
└── ExternalPaymentModal.tsx
```

**Design Implementation**:
```tsx
// PaymentMethodsEditor.tsx
export function PaymentMethodsEditor({ paymentMethods, onUpdate }: Props) {
  return (
    <GlassCard>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">Payment Methods</h3>
        <p className="text-gray-400 text-sm">Configure how supporters can tip you</p>
      </div>

      {/* Payment Method Cards */}
      <div className="space-y-4">
        {AVAILABLE_PAYMENT_METHODS.map((methodType) => {
          const method = paymentMethods.find(m => m.type === methodType)
          return (
            <PaymentMethodCard
              key={methodType}
              type={methodType}
              method={method}
              onUpdate={(updates) => updateMethod(methodType, updates)}
              onConfigure={() => configureMethod(methodType)}
              onDelete={() => deleteMethod(methodType)}
            />
          )
        })}
      </div>

      {/* Setup Instructions */}
      <div className="mt-6 p-4 bg-blue-400/10 border border-blue-400/20 rounded-xl">
        <div className="flex items-start gap-3">
          <Icons.Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-blue-300 mb-1">Setup Tips</h4>
            <ul className="text-sm text-blue-200/80 space-y-1">
              <li>• Stripe provides the lowest fees and instant payouts</li>
              <li>• Add multiple methods to give supporters options</li>
              <li>• Test each method before going live</li>
            </ul>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
```

### 4. Goals Section

**Component Files**:
```
src/components/profile/editor/
├── GoalsEditor.tsx
├── GoalCard.tsx
├── GoalCreatorModal.tsx
└── GoalProgressPreview.tsx
```

**Design Implementation**:
```tsx
// GoalsEditor.tsx
export function GoalsEditor({ goals, onUpdate }: Props) {
  return (
    <GlassCard>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white">Funding Goals</h3>
          <p className="text-gray-400 text-sm mt-1">Set goals to encourage larger tips</p>
        </div>
        <PrimaryButton onClick={() => setShowGoalCreator(true)}>
          + Create Goal
        </PrimaryButton>
      </div>

      {/* Goals Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {goals.map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            onEdit={() => editGoal(goal.id)}
            onDelete={() => deleteGoal(goal.id)}
            onToggleActive={() => toggleGoalActive(goal.id)}
          />
        ))}
        
        {/* Add Goal Card */}
        <div 
          onClick={() => setShowGoalCreator(true)}
          className="
            border-2 border-dashed border-white/20 rounded-xl p-6 
            hover:border-white/30 hover:bg-white/5 cursor-pointer 
            transition-all duration-200 min-h-[200px] 
            flex flex-col items-center justify-center text-center
          "
        >
          <Icons.Plus className="w-8 h-8 text-gray-400 mb-3" />
          <h4 className="font-medium text-white mb-1">Create New Goal</h4>
          <p className="text-sm text-gray-400">Set a funding target to motivate supporters</p>
        </div>
      </div>

      {/* Goal Templates */}
      {goals.length === 0 && (
        <div className="mt-6">
          <h4 className="font-medium text-white mb-3">Quick Templates</h4>
          <div className="grid gap-3 sm:grid-cols-3">
            {GOAL_TEMPLATES.map((template) => (
              <button
                key={template.id}
                onClick={() => createFromTemplate(template)}
                className="
                  p-3 text-left bg-white/5 hover:bg-white/10 rounded-lg 
                  border border-white/10 transition-colors
                "
              >
                <div className="font-medium text-white text-sm">{template.title}</div>
                <div className="text-xs text-gray-400 mt-1">{template.description}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </GlassCard>
  )
}
```

### 5. Theme Customization Section

**Component Files**:
```
src/components/profile/editor/
├── ThemeCustomizer.tsx
├── ThemePresetCard.tsx
├── AdvancedThemeModal.tsx
└── ColorPicker.tsx
```

**Design Implementation**:
```tsx
// ThemeCustomizer.tsx
export function ThemeCustomizer({ currentTheme, onThemeChange }: Props) {
  return (
    <GlassCard>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">Theme & Style</h3>
        <p className="text-gray-400 text-sm">Choose how your profile looks to supporters</p>
      </div>

      {/* Theme Presets */}
      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        {THEME_PRESETS.map((theme) => (
          <ThemePresetCard
            key={theme.id}
            theme={theme}
            isSelected={currentTheme.id === theme.id}
            onSelect={() => onThemeChange(theme)}
          />
        ))}
      </div>

      {/* Advanced Customization */}
      <div className="border-t border-white/10 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-white">Advanced Customization</h4>
            <p className="text-sm text-gray-400">Customize colors, fonts, and layout</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded font-medium">
              PRO
            </span>
            <SecondaryButton onClick={() => setShowAdvancedModal(true)}>
              Customize
            </SecondaryButton>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
```

---

## 📱 Mobile Responsiveness

### Breakpoint Strategy
```typescript
// Use design system breakpoints
const breakpoints = designTokens.breakpoints

// Mobile-first approach
<div className="
  grid gap-4 
  grid-cols-1 
  md:grid-cols-2 
  lg:grid-cols-3
">
```

### Mobile Navigation
```tsx
// Mobile sticky save bar
<div className="
  lg:hidden fixed bottom-0 left-0 right-0 
  bg-black/80 backdrop-blur-lg border-t border-white/10 
  p-4 z-50
">
  <div className="flex gap-3">
    <SecondaryButton className="flex-1">Discard</SecondaryButton>
    <PrimaryButton className="flex-1">Save Changes</PrimaryButton>
  </div>
</div>
```

---

## 🔌 Database Integration Points

### Required API Endpoints
```typescript
// Profile management
PUT /api/profile - Update profile data
GET /api/profile - Get current profile
POST /api/profile/avatar - Upload avatar

// Social links
PUT /api/profile/social-links - Update social links
POST /api/profile/social-links - Add social link
DELETE /api/profile/social-links/[id] - Remove social link

// Payment methods  
PUT /api/profile/payment-methods - Update payment methods
POST /api/profile/stripe-connect - Initiate Stripe Connect

// Goals
POST /api/profile/goals - Create goal
PUT /api/profile/goals/[id] - Update goal
DELETE /api/profile/goals/[id] - Delete goal

// Theme
PUT /api/profile/theme - Update theme settings
```

### Real-time Updates
```typescript
// Subscribe to profile changes for live preview
useEffect(() => {
  const subscription = supabase
    .channel('profile-changes')
    .on('postgres_changes', {
      event: 'UPDATE',
      schema: 'public',
      table: 'profiles',
      filter: `id=eq.${user.id}`
    }, (payload) => {
      // Update live preview
      updatePreview(payload.new)
    })
    .subscribe()

  return () => subscription.unsubscribe()
}, [user.id])
```

---

## ✅ Implementation Checklist

### Phase 1: Basic Structure
- [ ] Set up component files and folders
- [ ] Import design system components
- [ ] Create basic layouts with GlassCard
- [ ] Implement form inputs with design tokens

### Phase 2: Functionality  
- [ ] Add save/discard functionality
- [ ] Implement drag & drop for social links
- [ ] Connect to database APIs
- [ ] Add form validation

### Phase 3: Advanced Features
- [ ] Stripe Connect integration
- [ ] Theme customization
- [ ] Live preview updates
- [ ] Mobile optimization

### Phase 4: Polish
- [ ] Add loading states
- [ ] Implement error handling
- [ ] Add success animations
- [ ] Performance optimization

This implementation guide provides the exact blueprint for building the profile editor page with proper design system integration and database connectivity.
