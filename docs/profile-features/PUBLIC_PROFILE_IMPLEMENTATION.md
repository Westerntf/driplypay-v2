# Public Profile Page Implementation Guide

## 📍 Page Location
**File Path**: `/src/app/[username]/page.tsx`
**Current State**: Basic display structure exists, needs database integration and design system implementation

---

## 🎨 Design System Integration

### Required Design Tokens
```typescript
// Import from design system
import { designTokens } from '@/design-system/design-tokens'

// Key tokens for this page:
designTokens.colors.background.primary      // Main page background
designTokens.colors.gradients.primary       // Profile accent elements
designTokens.spacing.page                   // Page margins
designTokens.borderRadius.card              // Card elements
designTokens.animation.spring               // Hover animations
```

### Required Components from Design System
```typescript
// From /design-system/components.tsx
import { 
  GlassCard,           // Main content cards
  PrimaryButton,       // Tip buttons
  SecondaryButton,     // Social link buttons
  ProgressBar,         // Goal progress
  Avatar,              // Profile picture
  Badge,               // Verification badge
  ShareButton          // Share functionality
} from '@/design-system/components'
```

---

## 🏗️ Component Architecture

### 1. Page Layout Structure

**Component Files**:
```
src/components/profile/public/
├── PublicProfileLayout.tsx        # Main page wrapper
├── PublicProfileHeader.tsx        # Profile info section
├── PublicSocialLinks.tsx          # Social media links
├── PublicPaymentMethods.tsx       # Payment options
├── PublicGoals.tsx                # Funding goals
├── PublicTipForm.tsx              # Tip interface
├── PublicRecentActivity.tsx       # Recent supporters
├── ProfileNotFound.tsx            # 404 state
└── index.ts                       # Barrel exports
```

### 2. Main Layout Implementation

```tsx
// PublicProfileLayout.tsx
import { designTokens } from '@/design-system/design-tokens'

export function PublicProfileLayout({ 
  profile, 
  children 
}: PublicProfileLayoutProps) {
  return (
    <div 
      className="min-h-screen"
      style={{ 
        background: designTokens.colors.background.primary,
        fontFamily: designTokens.typography.fontFamily.primary 
      }}
    >
      {/* Theme CSS Variables */}
      <style jsx>{`
        :root {
          --profile-primary-color: ${profile.theme.primaryColor};
          --profile-secondary-color: ${profile.theme.secondaryColor};
          --profile-accent-color: ${profile.theme.accentColor};
        }
      `}</style>

      {/* Navigation Header */}
      <PublicProfileHeader profile={profile} />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Profile Column */}
          <div className="lg:col-span-2 space-y-6">
            {children}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <PublicTipForm profile={profile} />
            <PublicRecentActivity profileId={profile.id} />
          </div>
        </div>
      </main>

      {/* Share/QR Footer */}
      <PublicProfileFooter profile={profile} />
    </div>
  )
}
```

### 3. Profile Header Implementation

```tsx
// PublicProfileHeader.tsx
export function PublicProfileHeader({ profile }: Props) {
  return (
    <GlassCard className="mb-6 overflow-hidden">
      {/* Background Pattern/Gradient */}
      <div 
        className="h-32 relative"
        style={{
          background: `linear-gradient(135deg, ${profile.theme.primaryColor}20, ${profile.theme.secondaryColor}20)`
        }}
      >
        {/* Theme-specific pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          {profile.theme.id === 'neon' && <NeonPattern />}
          {profile.theme.id === 'luxe' && <LuxePattern />}
        </div>
      </div>

      {/* Profile Info */}
      <div className="relative px-6 pb-6 -mt-16">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
          {/* Avatar */}
          <Avatar
            src={profile.avatar}
            alt={profile.displayName}
            size={128}
            className="border-4 border-black/50 shadow-xl"
            fallback={profile.displayName[0]}
          />

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-white">
                {profile.displayName}
              </h1>
              {profile.verified && (
                <Badge variant="verified" size="lg">
                  ✓ Verified
                </Badge>
              )}
            </div>
            
            <p className="text-gray-300 text-lg mb-1">@{profile.username}</p>
            
            {profile.bio && (
              <p className="text-gray-400 max-w-md leading-relaxed">
                {profile.bio}
              </p>
            )}

            {/* Stats */}
            <div className="flex items-center gap-6 mt-4 text-sm text-gray-400">
              {profile.location && (
                <div className="flex items-center gap-1">
                  <Icons.MapPin className="w-4 h-4" />
                  <span>{profile.location}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Icons.Calendar className="w-4 h-4" />
                <span>Joined {formatDate(profile.createdAt)}</span>
              </div>
              {profile.totalSupporters > 0 && (
                <div className="flex items-center gap-1">
                  <Icons.Users className="w-4 h-4" />
                  <span>{profile.totalSupporters} supporters</span>
                </div>
              )}
            </div>
          </div>

          {/* Share Button */}
          <ShareButton 
            url={`${process.env.NEXT_PUBLIC_APP_URL}/${profile.username}`}
            title={`Support ${profile.displayName} on DriplyPay`}
            className="self-start"
          />
        </div>
      </div>
    </GlassCard>
  )
}
```

### 4. Social Links Implementation

```tsx
// PublicSocialLinks.tsx
export function PublicSocialLinks({ socialLinks }: Props) {
  const activeLi = socialLinks.filter(link => link.enabled)
  
  if (activeLinks.length === 0) return null

  return (
    <GlassCard>
      <h2 className="text-xl font-semibold text-white mb-4">Connect</h2>
      
      <div className="grid gap-3 sm:grid-cols-2">
        {activeLinks.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackSocialClick(link.platform)}
            className="
              flex items-center gap-3 p-3 rounded-xl
              bg-white/5 hover:bg-white/10
              border border-white/10 hover:border-white/20
              transition-all duration-200
              group
            "
          >
            {/* Platform Icon */}
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
              style={{ backgroundColor: PLATFORM_COLORS[link.platform] }}
            >
              <Icons[link.platform] className="w-5 h-5" />
            </div>

            {/* Platform Info */}
            <div className="flex-1 min-w-0">
              <div className="font-medium text-white capitalize">
                {link.platform}
              </div>
              <div className="text-sm text-gray-400 truncate">
                {link.displayText || link.handle}
              </div>
            </div>

            {/* External Link Icon */}
            <Icons.ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
          </a>
        ))}
      </div>
    </GlassCard>
  )
}
```

### 5. Payment Methods Implementation

```tsx
// PublicPaymentMethods.tsx
export function PublicPaymentMethods({ paymentMethods, profile }: Props) {
  const enabledMethods = paymentMethods.filter(method => method.enabled)
  
  return (
    <GlassCard>
      <h2 className="text-xl font-semibold text-white mb-4">Support Me</h2>
      
      <div className="space-y-3">
        {enabledMethods.map((method) => (
          <PaymentMethodButton
            key={method.id}
            method={method}
            profile={profile}
            onClick={() => handlePaymentClick(method)}
          />
        ))}
      </div>

      {/* Quick Tip Amounts */}
      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-400 mb-3">Quick Tip</h3>
        <div className="grid grid-cols-3 gap-2">
          {QUICK_TIP_AMOUNTS.map((amount) => (
            <button
              key={amount}
              onClick={() => handleQuickTip(amount)}
              className="
                py-2 px-3 rounded-lg text-sm font-medium
                bg-white/5 hover:bg-white/10
                border border-white/10 hover:border-white/20
                text-white transition-all duration-200
              "
            >
              ${amount}
            </button>
          ))}
        </div>
      </div>
    </GlassCard>
  )
}

// Individual Payment Method Button
function PaymentMethodButton({ method, profile, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="
        w-full flex items-center gap-4 p-4 rounded-xl
        bg-white/5 hover:bg-white/10
        border border-white/10 hover:border-white/20
        transition-all duration-200 group
      "
    >
      {/* Method Icon */}
      <div 
        className="w-12 h-12 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: PAYMENT_METHOD_COLORS[method.type] }}
      >
        <Icons[method.type] className="w-6 h-6 text-white" />
      </div>

      {/* Method Info */}
      <div className="flex-1 text-left">
        <div className="font-medium text-white capitalize">
          {method.displayName || method.type}
        </div>
        <div className="text-sm text-gray-400">
          {method.handle ? `@${method.handle}` : 'Click to pay'}
        </div>
      </div>

      {/* Arrow */}
      <Icons.ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
    </button>
  )
}
```

### 6. Goals Display Implementation

```tsx
// PublicGoals.tsx
export function PublicGoals({ goals }: Props) {
  const activeGoals = goals.filter(goal => goal.isActive)
  
  if (activeGoals.length === 0) return null

  return (
    <GlassCard>
      <h2 className="text-xl font-semibold text-white mb-4">Current Goals</h2>
      
      <div className="space-y-4">
        {activeGoals.map((goal) => (
          <GoalProgressCard key={goal.id} goal={goal} />
        ))}
      </div>
    </GlassCard>
  )
}

// Individual Goal Card
function GoalProgressCard({ goal }: Props) {
  const progressPercentage = (goal.currentAmount / goal.targetAmount) * 100
  
  return (
    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
      {/* Goal Header */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-medium text-white flex-1">{goal.title}</h3>
        <span className="text-sm text-gray-400 ml-2">
          ${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}
        </span>
      </div>

      {/* Progress Bar */}
      <ProgressBar
        value={progressPercentage}
        className="mb-3"
        color={goal.color || 'primary'}
        animated
      />

      {/* Goal Description */}
      {goal.description && (
        <p className="text-sm text-gray-400 leading-relaxed">
          {goal.description}
        </p>
      )}

      {/* Support Button */}
      <PrimaryButton
        onClick={() => handleGoalSupport(goal)}
        size="sm"
        className="mt-3"
        gradient
      >
        Support This Goal
      </PrimaryButton>
    </div>
  )
}
```

### 7. Tip Form Implementation

```tsx
// PublicTipForm.tsx
export function PublicTipForm({ profile }: Props) {
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState(null)

  return (
    <GlassCard className="sticky top-4">
      <h2 className="text-xl font-semibold text-white mb-4">Send a Tip</h2>
      
      {/* Amount Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Amount
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="5.00"
            className="
              w-full pl-8 pr-4 py-3 rounded-xl
              bg-white/5 border border-white/10
              text-white placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-blue-400/50
            "
          />
        </div>
      </div>

      {/* Quick Amounts */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {[5, 10, 25, 50].map((quickAmount) => (
          <button
            key={quickAmount}
            onClick={() => setAmount(quickAmount.toString())}
            className={`
              py-2 px-3 rounded-lg text-sm font-medium transition-all
              ${amount === quickAmount.toString()
                ? 'bg-blue-500 text-white'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }
            `}
          >
            ${quickAmount}
          </button>
        ))}
      </div>

      {/* Message */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Message (optional)
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Say something nice..."
          rows={3}
          className="
            w-full px-4 py-3 rounded-xl resize-none
            bg-white/5 border border-white/10
            text-white placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-blue-400/50
          "
        />
      </div>

      {/* Anonymous Option */}
      <label className="flex items-center gap-3 mb-6 cursor-pointer">
        <input
          type="checkbox"
          checked={isAnonymous}
          onChange={(e) => setIsAnonymous(e.target.checked)}
          className="w-4 h-4 rounded border-gray-600 text-blue-500 focus:ring-blue-400/50"
        />
        <span className="text-sm text-gray-300">Send anonymously</span>
      </label>

      {/* Send Button */}
      <PrimaryButton
        onClick={handleSendTip}
        disabled={!amount || parseFloat(amount) < 1}
        loading={isProcessing}
        className="w-full"
        size="lg"
      >
        Send ${amount || '0'} Tip
      </PrimaryButton>

      {/* Security Note */}
      <p className="text-xs text-gray-500 mt-3 text-center">
        Secured by Stripe. Your payment info is never stored.
      </p>
    </GlassCard>
  )
}
```

---

## 🔌 Database Integration

### Page Data Fetching
```typescript
// app/[username]/page.tsx
export async function generateStaticParams() {
  // Pre-generate pages for active profiles
  const { data: profiles } = await supabase
    .from('profiles')
    .select('username')
    .eq('is_active', true)
    .limit(1000)

  return profiles?.map(profile => ({
    username: profile.username
  })) || []
}

export default async function PublicProfilePage({ 
  params 
}: { 
  params: { username: string } 
}) {
  // Fetch profile data
  const profile = await getPublicProfile(params.username)
  
  if (!profile) {
    return <ProfileNotFound username={params.username} />
  }

  // Track profile view
  await trackProfileView(profile.id, {
    timestamp: new Date(),
    userAgent: headers().get('user-agent'),
    referer: headers().get('referer')
  })

  return (
    <PublicProfileLayout profile={profile}>
      <PublicProfileHeader profile={profile} />
      <PublicSocialLinks socialLinks={profile.socialLinks} />
      <PublicPaymentMethods 
        paymentMethods={profile.paymentMethods} 
        profile={profile}
      />
      <PublicGoals goals={profile.goals} />
    </PublicProfileLayout>
  )
}
```

### API Functions
```typescript
// lib/profile/public.ts
export async function getPublicProfile(username: string): Promise<PublicProfile | null> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        *,
        social_links!inner(*),
        payment_methods!inner(*),
        goals!inner(*)
      `)
      .eq('username', username)
      .eq('is_public', true)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching public profile:', error)
    return null
  }
}

export async function trackProfileView(profileId: string, metadata: any) {
  await supabase
    .from('analytics_events')
    .insert({
      profile_id: profileId,
      event_type: 'profile_view',
      metadata
    })
}
```

---

## 📱 Mobile Optimization

### Responsive Layout
```tsx
// Mobile-first responsive design
<div className="
  grid gap-6
  grid-cols-1 
  lg:grid-cols-3
  lg:gap-8
">
  {/* Profile content - full width on mobile */}
  <div className="lg:col-span-2 order-2 lg:order-1">
    {profileContent}
  </div>
  
  {/* Tip form - sticky on mobile */}
  <div className="order-1 lg:order-2">
    <div className="lg:sticky lg:top-4">
      {tipForm}
    </div>
  </div>
</div>
```

### Mobile Tip Flow
```tsx
// Mobile-optimized tip modal
function MobileTipModal({ profile, isOpen, onClose }: Props) {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      className="sm:hidden" // Only show on mobile
      fullScreen
    >
      <div className="flex flex-col h-full">
        <TipFormHeader profile={profile} onClose={onClose} />
        <div className="flex-1 overflow-y-auto p-4">
          <TipForm profile={profile} />
        </div>
      </div>
    </Modal>
  )
}
```

---

## ⚡ Performance Optimization

### Image Optimization
```tsx
// Optimized avatar loading
<Image
  src={profile.avatar}
  alt={profile.displayName}
  width={128}
  height={128}
  className="rounded-full"
  priority={true} // Above the fold
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### SEO Implementation
```tsx
// Dynamic metadata
export async function generateMetadata({ 
  params 
}: { 
  params: { username: string } 
}): Promise<Metadata> {
  const profile = await getPublicProfile(params.username)
  
  if (!profile) {
    return {
      title: 'Profile Not Found - DriplyPay'
    }
  }

  return {
    title: `${profile.displayName} (@${profile.username}) - DriplyPay`,
    description: profile.bio || `Support ${profile.displayName} on DriplyPay`,
    openGraph: {
      title: `Support ${profile.displayName}`,
      description: profile.bio,
      images: [profile.avatar],
      url: `${process.env.NEXT_PUBLIC_APP_URL}/${profile.username}`
    },
    twitter: {
      card: 'summary_large_image',
      title: `Support ${profile.displayName}`,
      description: profile.bio
    }
  }
}
```

This implementation guide provides the exact blueprint for building a high-performance, mobile-optimized public profile page with proper design system integration.
