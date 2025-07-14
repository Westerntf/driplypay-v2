# QR Code Generator Implementation Guide

## 📍 Page Location
**File Path**: `/src/app/dashboard/qr/page.tsx`
**Current State**: Basic display structure exists, needs QR generation and design system implementation

---

## 🎨 Design System Integration

### Required Design Tokens
```typescript
// Import from design system  
import { designTokens } from '@/design-system/design-tokens'

// Key tokens for this page:
designTokens.colors.background.secondary    // QR card backgrounds
designTokens.colors.border.primary          // QR card borders
designTokens.spacing.card                   // Card spacing
designTokens.borderRadius.card              // Card corners
designTokens.colors.qr.foreground          // QR code color
designTokens.colors.qr.background          // QR background color
```

### Required Components from Design System
```typescript
// From /design-system/components.tsx
import { 
  GlassCard,           // QR code containers
  PrimaryButton,       // Create/download buttons
  SecondaryButton,     // Action buttons
  Modal,               // QR creation modal
  ColorPicker,         // QR customization
  FileUpload,          // Logo upload
  Badge,               // QR type badges
  DropdownMenu         // QR actions menu
} from '@/design-system/components'
```

---

## 🏗️ Component Architecture

### 1. QR Dashboard Layout

**Component Files**:
```
src/components/profile/qr/
├── QRDashboard.tsx              # Main QR manager layout
├── QRCodeGrid.tsx               # Grid of existing QR codes
├── QRCodeCard.tsx               # Individual QR code display
├── CreateQRModal.tsx            # QR creation wizard
├── QRTypeSelector.tsx           # QR type selection
├── QRCustomizer.tsx             # QR appearance customization
├── QRPreview.tsx                # Live QR preview
├── QRDownloadOptions.tsx        # Download format options
├── QRStatsModal.tsx             # QR code analytics
└── index.ts                     # Barrel exports
```

### 2. Main QR Dashboard Implementation

```tsx
// QRDashboard.tsx
export function QRDashboard({ userId }: Props) {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const { data: qrCodes, isLoading, refetch } = useQRCodes(userId)

  if (isLoading) {
    return <QRDashboardSkeleton />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">QR Codes</h1>
          <p className="text-gray-400 mt-1">
            Generate QR codes for your profile and payment methods
          </p>
        </div>
        
        <PrimaryButton 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2"
        >
          <Icons.Plus className="w-4 h-4" />
          Create QR Code
        </PrimaryButton>
      </div>

      {/* QR Codes Grid */}
      <QRCodeGrid qrCodes={qrCodes} onUpdate={refetch} />

      {/* Create QR Modal */}
      <CreateQRModal 
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={refetch}
      />

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <QuickActionCard
          title="Profile QR"
          description="Share your complete profile"
          icon={Icons.User}
          onClick={() => createQuickQR('profile')}
        />
        <QuickActionCard
          title="Tip QR"
          description="Direct link to tip form"
          icon={Icons.Heart}
          onClick={() => createQuickQR('tip')}
        />
        <QuickActionCard
          title="Custom QR"
          description="Link to any URL"
          icon={Icons.Link}
          onClick={() => setShowCreateModal(true)}
        />
      </div>
    </div>
  )
}

// Quick Action Card Component
function QuickActionCard({ title, description, icon: Icon, onClick }: Props) {
  return (
    <GlassCard 
      className="p-4 cursor-pointer hover:bg-white/10 transition-colors"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <Icon className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h3 className="font-medium text-white">{title}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>
    </GlassCard>
  )
}
```

### 3. QR Code Grid Implementation

```tsx
// QRCodeGrid.tsx
export function QRCodeGrid({ qrCodes, onUpdate }: Props) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'created' | 'scans' | 'type'>('created')

  const sortedQRCodes = useMemo(() => {
    return [...qrCodes].sort((a, b) => {
      switch (sortBy) {
        case 'scans':
          return b.scanCount - a.scanCount
        case 'type':
          return a.type.localeCompare(b.type)
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })
  }, [qrCodes, sortBy])

  return (
    <div>
      {/* Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="
              px-3 py-2 rounded-lg bg-white/5 border border-white/10
              text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50
            "
          >
            <option value="created">Sort by Date</option>
            <option value="scans">Sort by Scans</option>
            <option value="type">Sort by Type</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-500' : 'bg-white/5'}`}
          >
            <Icons.Grid className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-500' : 'bg-white/5'}`}
          >
            <Icons.List className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* QR Codes */}
      <div className={`
        ${viewMode === 'grid' 
          ? 'grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
          : 'space-y-3'
        }
      `}>
        {sortedQRCodes.map((qrCode) => (
          <QRCodeCard
            key={qrCode.id}
            qrCode={qrCode}
            viewMode={viewMode}
            onUpdate={onUpdate}
          />
        ))}
      </div>

      {/* Empty State */}
      {qrCodes.length === 0 && (
        <div className="text-center py-12">
          <Icons.QrCode className="w-16 h-16 mx-auto mb-4 text-gray-400 opacity-50" />
          <h3 className="text-lg font-medium text-white mb-2">No QR codes yet</h3>
          <p className="text-gray-400 mb-4">
            Create your first QR code to start sharing your profile
          </p>
          <PrimaryButton onClick={() => setShowCreateModal(true)}>
            Create QR Code
          </PrimaryButton>
        </div>
      )}
    </div>
  )
}
```

### 4. QR Code Card Implementation

```tsx
// QRCodeCard.tsx
export function QRCodeCard({ qrCode, viewMode, onUpdate }: Props) {
  const [showStatsModal, setShowStatsModal] = useState(false)

  const downloadQR = async (format: 'png' | 'svg' | 'pdf') => {
    try {
      const response = await fetch(`/api/qr/${qrCode.id}/download?format=${format}`)
      const blob = await response.blob()
      
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${qrCode.name}.${format}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      toast.error('Failed to download QR code')
    }
  }

  const duplicateQR = async () => {
    try {
      await fetch('/api/qr/duplicate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qrCodeId: qrCode.id })
      })
      onUpdate()
      toast.success('QR code duplicated successfully')
    } catch (error) {
      toast.error('Failed to duplicate QR code')
    }
  }

  const deleteQR = async () => {
    if (!confirm('Are you sure you want to delete this QR code?')) return
    
    try {
      await fetch(`/api/qr/${qrCode.id}`, { method: 'DELETE' })
      onUpdate()
      toast.success('QR code deleted successfully')
    } catch (error) {
      toast.error('Failed to delete QR code')
    }
  }

  if (viewMode === 'list') {
    return (
      <GlassCard className="p-4">
        <div className="flex items-center gap-4">
          {/* QR Code Preview */}
          <div className="w-16 h-16 bg-white rounded-lg p-2 flex-shrink-0">
            <img 
              src={qrCode.imageUrl} 
              alt={qrCode.name}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium text-white truncate">{qrCode.name}</h3>
              <Badge variant={getTypeBadgeVariant(qrCode.type)}>
                {qrCode.type}
              </Badge>
            </div>
            <p className="text-sm text-gray-400 truncate">{qrCode.description}</p>
            <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
              <span>{qrCode.scanCount} scans</span>
              <span>Created {formatDate(qrCode.createdAt)}</span>
            </div>
          </div>

          {/* Actions */}
          <DropdownMenu>
            <DropdownMenuItem onClick={() => downloadQR('png')}>
              Download PNG
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => downloadQR('svg')}>
              Download SVG
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setShowStatsModal(true)}>
              View Stats
            </DropdownMenuItem>
            <DropdownMenuItem onClick={duplicateQR}>
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem onClick={deleteQR} variant="danger">
              Delete
            </DropdownMenuItem>
          </DropdownMenu>
        </div>
      </GlassCard>
    )
  }

  return (
    <GlassCard className="p-4">
      {/* QR Code Image */}
      <div className="relative mb-4">
        <div className="w-full aspect-square bg-white rounded-lg p-4">
          <img 
            src={qrCode.imageUrl} 
            alt={qrCode.name}
            className="w-full h-full object-contain"
          />
        </div>
        
        {/* Type Badge */}
        <Badge 
          variant={getTypeBadgeVariant(qrCode.type)}
          className="absolute top-2 left-2"
        >
          {qrCode.type}
        </Badge>

        {/* Quick Actions */}
        <div className="absolute top-2 right-2 flex gap-1">
          <button
            onClick={() => downloadQR('png')}
            className="p-1 bg-black/50 rounded text-white hover:bg-black/70"
          >
            <Icons.Download className="w-4 h-4" />
          </button>
          <DropdownMenu>
            <DropdownMenuItem onClick={() => setShowStatsModal(true)}>
              View Stats
            </DropdownMenuItem>
            <DropdownMenuItem onClick={duplicateQR}>
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem onClick={deleteQR} variant="danger">
              Delete
            </DropdownMenuItem>
          </DropdownMenu>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-2">
        <h3 className="font-medium text-white truncate">{qrCode.name}</h3>
        <p className="text-sm text-gray-400 line-clamp-2">{qrCode.description}</p>
        
        {/* Stats */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">{qrCode.scanCount} scans</span>
          <span className="text-gray-400">{formatDate(qrCode.createdAt)}</span>
        </div>
      </div>

      {/* QR Stats Modal */}
      <QRStatsModal
        isOpen={showStatsModal}
        onClose={() => setShowStatsModal(false)}
        qrCode={qrCode}
      />
    </GlassCard>
  )
}
```

### 5. Create QR Modal Implementation

```tsx
// CreateQRModal.tsx
export function CreateQRModal({ isOpen, onClose, onSuccess }: Props) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<QRFormData>({
    type: 'profile',
    name: '',
    description: '',
    url: '',
    amount: null,
    paymentMethod: null,
    customization: {
      foregroundColor: '#000000',
      backgroundColor: '#FFFFFF',
      logoFile: null,
      size: 'medium',
      errorCorrection: 'M'
    }
  })

  const totalSteps = formData.type === 'custom' ? 4 : 3

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/qr/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) throw new Error('Failed to create QR code')

      onSuccess()
      onClose()
      toast.success('QR code created successfully')
    } catch (error) {
      toast.error('Failed to create QR code')
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Create QR Code</h2>
          <div className="text-sm text-gray-400">
            Step {step} of {totalSteps}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          ></div>
        </div>

        {/* Step Content */}
        <div className="min-h-[400px]">
          {step === 1 && (
            <QRTypeSelector 
              value={formData.type}
              onChange={(type) => setFormData(prev => ({ ...prev, type }))}
            />
          )}
          
          {step === 2 && (
            <QRConfigurationStep
              formData={formData}
              onChange={setFormData}
            />
          )}
          
          {step === 3 && (
            <QRCustomizationStep
              formData={formData}
              onChange={setFormData}
            />
          )}
          
          {step === 4 && formData.type === 'custom' && (
            <QRPreviewStep
              formData={formData}
              onChange={setFormData}
            />
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-between mt-6">
          <div>
            {step > 1 && (
              <SecondaryButton onClick={handleBack}>
                Back
              </SecondaryButton>
            )}
          </div>
          
          <div className="flex gap-3">
            <SecondaryButton onClick={onClose}>
              Cancel
            </SecondaryButton>
            {step < totalSteps ? (
              <PrimaryButton onClick={handleNext}>
                Next
              </PrimaryButton>
            ) : (
              <PrimaryButton onClick={handleSubmit}>
                Create QR Code
              </PrimaryButton>
            )}
          </div>
        </div>
      </div>
    </Modal>
  )
}
```

### 6. QR Type Selector Implementation

```tsx
// QRTypeSelector.tsx
export function QRTypeSelector({ value, onChange }: Props) {
  const qrTypes = [
    {
      id: 'profile',
      title: 'Profile QR',
      description: 'Link directly to your DriplyPay profile',
      icon: Icons.User,
      features: ['Complete profile view', 'All payment methods', 'Social links']
    },
    {
      id: 'tip',
      title: 'Direct Tip QR',
      description: 'Opens tip form with pre-filled amount',
      icon: Icons.Heart,
      features: ['Skip profile page', 'Faster conversion', 'Custom amount']
    },
    {
      id: 'payment_method',
      title: 'Payment Method QR',
      description: 'Link to specific payment method',
      icon: Icons.CreditCard,
      features: ['Single payment option', 'Reduced friction', 'Method-specific']
    },
    {
      id: 'custom',
      title: 'Custom Link QR',
      description: 'Link to any URL you choose',
      icon: Icons.Link,
      features: ['Any website', 'Full customization', 'External links']
    }
  ]

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium text-white mb-2">
          What type of QR code do you want to create?
        </h3>
        <p className="text-gray-400">
          Choose the type that best fits your needs
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {qrTypes.map((type) => (
          <div
            key={type.id}
            onClick={() => onChange(type.id)}
            className={`
              p-4 rounded-xl border-2 cursor-pointer transition-all
              ${value === type.id
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-white/10 bg-white/5 hover:border-white/20'
              }
            `}
          >
            <div className="flex items-start gap-3">
              <div className={`
                p-2 rounded-lg
                ${value === type.id ? 'bg-blue-500' : 'bg-white/10'}
              `}>
                <type.icon className="w-5 h-5 text-white" />
              </div>
              
              <div className="flex-1">
                <h4 className="font-medium text-white mb-1">{type.title}</h4>
                <p className="text-sm text-gray-400 mb-3">{type.description}</p>
                
                <ul className="space-y-1">
                  {type.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-xs text-gray-300">
                      <Icons.Check className="w-3 h-3 text-green-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

### 7. QR Customization Implementation

```tsx
// QRCustomizer.tsx
export function QRCustomizer({ formData, onChange }: Props) {
  const updateCustomization = (updates: Partial<QRCustomization>) => {
    onChange({
      ...formData,
      customization: { ...formData.customization, ...updates }
    })
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium text-white mb-2">
          Customize Your QR Code
        </h3>
        <p className="text-gray-400">
          Personalize the appearance of your QR code
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Customization Options */}
        <div className="space-y-6">
          {/* Colors */}
          <div>
            <h4 className="font-medium text-white mb-3">Colors</h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Foreground Color
                </label>
                <ColorPicker
                  value={formData.customization.foregroundColor}
                  onChange={(color) => updateCustomization({ foregroundColor: color })}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Background Color
                </label>
                <ColorPicker
                  value={formData.customization.backgroundColor}
                  onChange={(color) => updateCustomization({ backgroundColor: color })}
                />
              </div>
            </div>
          </div>

          {/* Logo Upload */}
          <div>
            <h4 className="font-medium text-white mb-3">Logo (Optional)</h4>
            <FileUpload
              accept="image/*"
              maxSize={1024 * 1024} // 1MB
              onUpload={(file) => updateCustomization({ logoFile: file })}
              className="border-dashed border-2 border-white/20 rounded-lg p-6"
            >
              <div className="text-center">
                <Icons.Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-400">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG up to 1MB
                </p>
              </div>
            </FileUpload>
          </div>

          {/* Size */}
          <div>
            <h4 className="font-medium text-white mb-3">Size</h4>
            <div className="grid gap-2 grid-cols-3">
              {['small', 'medium', 'large'].map((size) => (
                <button
                  key={size}
                  onClick={() => updateCustomization({ size })}
                  className={`
                    py-2 px-3 rounded-lg text-sm capitalize transition-colors
                    ${formData.customization.size === size
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }
                  `}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Error Correction */}
          <div>
            <h4 className="font-medium text-white mb-3">Error Correction</h4>
            <select
              value={formData.customization.errorCorrection}
              onChange={(e) => updateCustomization({ errorCorrection: e.target.value })}
              className="
                w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10
                text-white focus:outline-none focus:ring-2 focus:ring-blue-400/50
              "
            >
              <option value="L">Low (7%)</option>
              <option value="M">Medium (15%)</option>
              <option value="Q">Quartile (25%)</option>
              <option value="H">High (30%)</option>
            </select>
            <p className="text-xs text-gray-400 mt-1">
              Higher levels allow the QR code to work even if partially damaged
            </p>
          </div>
        </div>

        {/* Live Preview */}
        <div className="flex flex-col items-center">
          <h4 className="font-medium text-white mb-3">Preview</h4>
          <QRPreview formData={formData} />
          
          {/* Preview Controls */}
          <div className="mt-4 space-y-2 w-full max-w-xs">
            <button className="w-full py-2 px-3 bg-white/5 rounded-lg text-sm text-gray-300 hover:bg-white/10">
              Test Scan with Phone
            </button>
            <div className="grid gap-2 grid-cols-3">
              <button className="py-1 px-2 bg-white/5 rounded text-xs text-gray-300">
                PNG
              </button>
              <button className="py-1 px-2 bg-white/5 rounded text-xs text-gray-300">
                SVG
              </button>
              <button className="py-1 px-2 bg-white/5 rounded text-xs text-gray-300">
                PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

---

## 🔌 Database Integration

### QR Code Management API
```typescript
// app/api/qr/create/route.ts
export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const formData = await request.json()
    
    // Generate QR code URL based on type
    const qrUrl = generateQRUrl(formData, session.user.id)
    
    // Generate QR code image
    const qrCodeImage = await generateQRCodeImage(qrUrl, formData.customization)
    
    // Store in database
    const { data, error } = await supabase
      .from('qr_codes')
      .insert({
        user_id: session.user.id,
        name: formData.name,
        description: formData.description,
        type: formData.type,
        url: qrUrl,
        image_url: qrCodeImage.url,
        customization: formData.customization,
        scan_count: 0
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, qrCode: data })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create QR code' }, { status: 500 })
  }
}

// QR URL generation
function generateQRUrl(formData: QRFormData, userId: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL

  switch (formData.type) {
    case 'profile':
      return `${baseUrl}/qr/${userId}/profile`
    case 'tip':
      return `${baseUrl}/qr/${userId}/tip${formData.amount ? `?amount=${formData.amount}` : ''}`
    case 'payment_method':
      return `${baseUrl}/qr/${userId}/payment/${formData.paymentMethod}`
    case 'custom':
      return formData.url
    default:
      throw new Error('Invalid QR type')
  }
}
```

### QR Code Tracking
```typescript
// app/qr/[userId]/[type]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { userId: string; type: string } }
) {
  try {
    // Track QR scan
    await supabase
      .from('qr_scans')
      .insert({
        user_id: params.userId,
        qr_type: params.type,
        scanned_at: new Date(),
        user_agent: request.headers.get('user-agent'),
        ip_address: getClientIP(request)
      })

    // Increment scan count
    await supabase
      .from('qr_codes')
      .update({ scan_count: supabase.raw('scan_count + 1') })
      .eq('user_id', params.userId)
      .eq('type', params.type)

    // Redirect to appropriate page
    const redirectUrl = getRedirectUrl(params.userId, params.type, request.url)
    return NextResponse.redirect(redirectUrl)
  } catch (error) {
    // Fallback redirect to profile
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/${params.userId}`)
  }
}
```

This implementation guide provides a complete QR code generation and management system with customization options, analytics tracking, and proper database integration.
