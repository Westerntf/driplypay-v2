# 🔐 DriplyPay Security & Auth Guidelines

> **Critical:** Security is non-negotiable. One vulnerability can destroy creator trust and platform reputation.

---

## 🚨 Security First Principles

### Core Security Rules - NEVER BREAK THESE
1. **NEVER trust user input** - Always validate and sanitize
2. **NEVER expose sensitive data** - No API keys, passwords, or personal info in client
3. **ALWAYS use HTTPS** - No exceptions, even in development
4. **NEVER skip authentication** - Every protected route must be secured
5. **ALWAYS validate file uploads** - Check type, size, and content
6. **NEVER store passwords in plain text** - Supabase Auth handles hashing automatically
7. **ALWAYS use RLS policies** - Database-level security for all tables

---

## 🔑 Authentication Standards

### DriplyPay Authentication Approach
DriplyPay uses **standard email/password authentication** through Supabase Auth instead of complex social provider linking. This provides:
- **Simple creator onboarding** - No complex OAuth flows
- **Universal compatibility** - Works with all email providers
- **Creator control** - Not dependent on social platform policies
- **Supabase security** - Automatic password hashing and session management

### Supabase Auth Implementation
```typescript
// ✅ CORRECT - Protected route pattern
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function ProtectedPage() {
  const supabase = createServerComponentClient({ cookies })
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/signin')
  }

  // Component content here
  return <div>Protected content</div>
}

// ❌ WRONG - Client-side only protection
function UnsafePage() {
  const { user } = useUser() // Can be bypassed
  if (!user) return <SignIn />
  return <ProtectedContent />
}
```

### Auth Component Patterns
```typescript
// ✅ CORRECT - Server-side auth wrapper
import { AuthWrapper } from '@/components/auth/AuthWrapper'

export default function ProfileEditor() {
  return (
    <AuthWrapper requireAuth>
      <ProfileEditorContent />
    </AuthWrapper>
  )
}

// Auth wrapper implementation
export async function AuthWrapper({ 
  children, 
  requireAuth = false,
  redirectTo = '/signin' 
}) {
  if (requireAuth) {
    const supabase = createServerComponentClient({ cookies })
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      redirect(redirectTo)
    }
  }
  
  return <>{children}</>
}
```

### User Session Management
```typescript
// ✅ CORRECT - Secure session handling
export async function getUserProfile(userId: string) {
  const supabase = createServerComponentClient({ cookies })
  
  // Always verify the requesting user matches the profile
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.id !== userId) {
    throw new Error('Unauthorized')
  }
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
    
  if (error) throw error
  return data
}

// ❌ WRONG - No user verification
export async function unsafeGetProfile(userId: string) {
  // Anyone can request any user's profile!
  return await supabase.from('profiles').select('*').eq('id', userId).single()
}
```

---

## 📁 File Upload Security

### Image Upload Standards
```typescript
// ✅ CORRECT - Secure image upload
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const MAX_DIMENSIONS = { width: 2048, height: 2048 }

export async function uploadProfileImage(file: File, userId: string): Promise<string> {
  // 1. Validate file type
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Invalid file type. Only JPEG, PNG, WebP, and GIF allowed.')
  }
  
  // 2. Validate file size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File too large. Maximum size is 5MB.')
  }
  
  // 3. Validate image dimensions
  const dimensions = await getImageDimensions(file)
  if (dimensions.width > MAX_DIMENSIONS.width || dimensions.height > MAX_DIMENSIONS.height) {
    throw new Error('Image dimensions too large. Maximum 2048x2048.')
  }
  
  // 4. Generate secure filename
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}/${Date.now()}.${fileExt}`
  
  // 5. Upload to Supabase Storage
  const supabase = createClientComponentClient()
  const { data, error } = await supabase.storage
    .from('profile-images')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    })
    
  if (error) throw error
  
  // 6. Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('profile-images')
    .getPublicUrl(fileName)
    
  return publicUrl
}

// Helper function to get image dimensions
async function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve({ width: img.width, height: img.height })
    img.onerror = reject
    img.src = URL.createObjectURL(file)
  })
}
```

### File Upload Component Pattern
```typescript
// ✅ CORRECT - Secure upload component
import { useState } from 'react'
import { useUser } from '@supabase/auth-helpers-react'

export function SecureImageUpload({ onUploadComplete }: { onUploadComplete: (url: string) => void }) {
  const { user } = useUser()
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setError(null)
      setUploading(true)
      
      const file = event.target.files?.[0]
      if (!file || !user) return
      
      // Use our secure upload function
      const url = await uploadProfileImage(file, user.id)
      onUploadComplete(url)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }
  
  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading || !user}
      />
      {uploading && <p>Uploading...</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}
```

---

## 🛡️ Data Validation & Sanitization

### Input Validation Rules
```typescript
// ✅ CORRECT - Comprehensive validation
import { z } from 'zod'

// Profile validation schema
export const profileSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be less than 30 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores, and hyphens')
    .refine(val => !val.includes('admin'), 'Username cannot contain "admin"'),
  
  display_name: z.string()
    .min(1, 'Display name is required')
    .max(50, 'Display name must be less than 50 characters')
    .refine(val => val.trim().length > 0, 'Display name cannot be empty'),
  
  bio: z.string()
    .max(500, 'Bio must be less than 500 characters')
    .optional(),
    
  theme: z.enum(['ocean', 'neon', 'luxe', 'clean']),
})

// Wallet method validation
export const walletMethodSchema = z.object({
  platform: z.enum(['stripe', 'paypal', 'cashapp', 'venmo', 'bitcoin']),
  url: z.string()
    .url('Invalid URL format')
    .refine(val => {
      // Platform-specific URL validation
      if (val.includes('stripe.com')) return val.includes('checkout') || val.includes('payment-links')
      if (val.includes('paypal.me')) return true
      if (val.includes('cash.app')) return true
      return false
    }, 'Invalid platform URL'),
  
  display_name: z.string()
    .min(1, 'Display name is required')
    .max(50, 'Display name must be less than 50 characters'),
})

// Usage in API routes
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = profileSchema.parse(body)
    
    // Continue with validated data
    // ...
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: error.errors }, { status: 400 })
    }
    return Response.json({ error: 'Internal error' }, { status: 500 })
  }
}
```

### URL Sanitization
```typescript
// ✅ CORRECT - URL sanitization for payment methods
export function sanitizePaymentUrl(url: string, platform: string): string {
  try {
    const urlObj = new URL(url)
    
    // Remove tracking parameters
    const allowedParams = {
      'stripe': ['price', 'mode', 'success_url', 'cancel_url'],
      'paypal': [],
      'cashapp': [],
      'venmo': [],
    }
    
    const allowed = allowedParams[platform] || []
    const searchParams = new URLSearchParams()
    
    allowed.forEach(param => {
      const value = urlObj.searchParams.get(param)
      if (value) searchParams.set(param, value)
    })
    
    urlObj.search = searchParams.toString()
    return urlObj.toString()
  } catch {
    throw new Error('Invalid URL')
  }
}
```

---

## 🔒 API Security Patterns

### Secure API Route Pattern
```typescript
// ✅ CORRECT - Secure API route
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // 1. Verify authentication
    const supabase = createServerComponentClient({ cookies })
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // 2. Parse and validate request body
    const body = await request.json()
    const validatedData = profileSchema.parse(body)
    
    // 3. Additional authorization checks
    if (validatedData.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    
    // 4. Rate limiting (implement with Redis or similar)
    const rateLimitKey = `api:${user.id}:${Date.now()}`
    // ... rate limiting logic
    
    // 5. Perform operation with validated data
    const { data, error } = await supabase
      .from('profiles')
      .update(validatedData)
      .eq('id', user.id)
      .select()
      .single()
    
    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }
    
    return NextResponse.json({ data })
    
  } catch (error) {
    console.error('API error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

### Rate Limiting Pattern
```typescript
// ✅ CORRECT - Rate limiting for sensitive operations
const RATE_LIMITS = {
  profile_update: { requests: 10, window: 60 * 1000 }, // 10 requests per minute
  image_upload: { requests: 5, window: 60 * 1000 },   // 5 uploads per minute
  wallet_method_add: { requests: 20, window: 60 * 1000 }, // 20 additions per minute
}

export async function checkRateLimit(userId: string, operation: string): Promise<boolean> {
  const limit = RATE_LIMITS[operation]
  if (!limit) return true
  
  // Implementation depends on your chosen store (Redis, Upstash, etc.)
  // This is a simplified example
  const key = `rate_limit:${userId}:${operation}`
  const current = await redis.get(key) || 0
  
  if (current >= limit.requests) {
    return false
  }
  
  await redis.setex(key, limit.window / 1000, current + 1)
  return true
}
```

---

## 🔐 Environment & Configuration Security

### Environment Variables
```bash
# ✅ CORRECT - Secure environment setup
# Public variables (safe to expose to client)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Private variables (NEVER expose to client)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
DATABASE_URL=postgresql://...
STRIPE_SECRET_KEY=sk_...

# Security keys
JWT_SECRET=your_very_long_random_string
ENCRYPTION_KEY=another_very_long_random_string

# Upload limits
MAX_FILE_SIZE=5242880  # 5MB in bytes
MAX_FILES_PER_USER=100
```

### Configuration Validation
```typescript
// ✅ CORRECT - Validate environment on startup
const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
] as const

export function validateEnvironment() {
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`)
    }
  }
}

// Call this in your app startup
validateEnvironment()
```

---

## 🚨 Security Monitoring & Logging

### Audit Logging
```typescript
// ✅ CORRECT - Security audit logging
export async function logSecurityEvent(
  event: 'login' | 'logout' | 'profile_update' | 'file_upload' | 'unauthorized_access',
  userId: string | null,
  metadata: Record<string, any> = {}
) {
  const auditLog = {
    event,
    user_id: userId,
    ip_address: metadata.ip,
    user_agent: metadata.userAgent,
    timestamp: new Date().toISOString(),
    metadata,
  }
  
  // Log to your chosen system (Supabase, external service, etc.)
  await supabase.from('audit_logs').insert(auditLog)
  
  // Also log security events to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Security Event:', auditLog)
  }
}

// Usage in API routes
export async function POST(request: NextRequest) {
  const ip = request.ip || request.headers.get('x-forwarded-for')
  const userAgent = request.headers.get('user-agent')
  
  try {
    // ... authentication logic
    
    await logSecurityEvent('profile_update', user.id, {
      ip,
      userAgent,
      action: 'update_profile'
    })
    
  } catch (error) {
    await logSecurityEvent('unauthorized_access', null, {
      ip,
      userAgent,
      error: error.message
    })
  }
}
```

---

## 📋 Security Checklist

### Before Deploying ANY Feature
- [ ] Authentication verified on all protected routes
- [ ] Input validation implemented and tested
- [ ] File uploads secured (type, size, content validation)
- [ ] RLS policies created and tested
- [ ] Rate limiting implemented for sensitive operations
- [ ] Error handling doesn't leak sensitive information
- [ ] Audit logging implemented
- [ ] Environment variables properly secured
- [ ] HTTPS enforced in production
- [ ] Security headers configured

### Code Review Security Questions
1. Can this be accessed without authentication?
2. Are all user inputs validated and sanitized?
3. Could this leak sensitive information?
4. Are file uploads properly secured?
5. Is this operation rate-limited?
6. Are database queries protected by RLS?
7. Are errors handled securely?
8. Is logging comprehensive but not excessive?

---

## 🎯 Production Security Requirements

### HTTPS & Headers
```typescript
// next.config.js security headers
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
]

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}
```

### Deployment Security
- **Never commit secrets** to version control
- **Use environment variables** for all configuration
- **Enable Supabase RLS** on all tables
- **Configure CORS** properly for your domain
- **Set up monitoring** for suspicious activity
- **Regular security updates** for all dependencies

---

**Remember:** Security is not optional for a creator monetization platform. Every vulnerability puts creator earnings and personal data at risk. When in doubt, choose the more secure option and ask for security review.

**🔐 Security Mantra: Trust but verify. Validate everything. Log all the things.**
