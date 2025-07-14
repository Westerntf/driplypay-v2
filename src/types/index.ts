/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Database & Schema
 * Purpose: TypeScript type definitions for all DriplyPay features
 * Features: Profile types, payment types, analytics types, UI component types
 */
export interface Profile {
  id: string
  user_id: string
  username: string
  display_name?: string
  avatar_url?: string
  banner_url?: string
  bio?: string
  location?: string
  support_message?: string
  theme: 'default' | 'theme1' | 'theme2' | 'theme3'
  blur_links: boolean
  private_profile: boolean
  redirect_url?: string
  redirect_message?: string
  min_tip_amount: number
  tip_amounts: number[]
  custom_tip_enabled: boolean
  email_notifications: boolean
  stripe_account_id?: string
  stripe_customer_id?: string
  is_pro: boolean
  is_verified: boolean
  followers_count: number
  total_earnings: number
  // Section visibility controls
  show_social_links: boolean
  show_payment_methods: boolean
  show_goals: boolean
  created_at: string
  updated_at: string
}

export interface PaymentMethod {
  id: string
  user_id: string
  type: 'cashapp' | 'paypal' | 'venmo' | 'zelle' | 'crypto' | 'stripe' | 'custom'
  name: string // Changed from label to name to match database
  label?: string // Keep label for backward compatibility
  handle?: string
  url: string
  enabled: boolean
  preferred: boolean
  order_index: number
  created_at: string
  updated_at: string
}

export interface Tip {
  id: string
  user_id: string
  amount: number
  currency: string
  anonymous: boolean
  message?: string
  stripe_payment_intent_id?: string
  created_at: string
}

export interface QRCode {
  id: string
  user_id: string
  type: 'profile' | 'payment_method' | 'fixed_tip'
  target_id?: string
  amount?: number
  scans: number
  created_at: string
  updated_at: string
}

export interface Analytics {
  id: string
  user_id: string
  event_type: 'profile_view' | 'payment_click' | 'qr_scan' | 'tip_received'
  payment_method_id?: string
  qr_code_id?: string
  amount?: number
  metadata?: Record<string, any>
  created_at: string
}

export interface SocialLink {
  id: string
  user_id: string
  platform: 'twitter' | 'instagram' | 'tiktok' | 'onlyfans' | 'custom'
  url: string
  label?: string
  enabled: boolean
  order_index: number // Keep for component compatibility, maps to display_order in DB
  created_at: string
  updated_at: string
}

export interface ProfileGoal {
  id: string
  user_id: string
  title: string
  description?: string
  target_amount: number
  current_amount: number
  is_active: boolean
  achieved_at?: string
  created_at: string
  updated_at: string
}

export type Theme = 'default' | 'theme1' | 'theme2' | 'theme3'

export interface DashboardStats {
  total_views: number
  total_tips: number
  total_qr_scans: number
  total_payment_clicks: number
  top_payment_method?: {
    label: string
    clicks: number
  }
  recent_activity: Analytics[]
}

export interface ActivityEvent {
  id: string
  type: 'tip' | 'click' | 'scan' | 'view'
  description: string
  amount?: number
  timestamp: string
}

export interface ApiResponse<T = any> {
  data?: T
  error?: string
  message?: string
}

// Extended profile for public display and live preview
export interface PublicProfile extends Profile {
  displayName: string
  isVerified: boolean
  bannerImage?: string
  location?: string
  joinedDate: string
  followersCount: number
  totalEarnings: number
  paymentMethods: PublicPaymentMethod[]
  tipAmounts: number[]
  customTipEnabled: boolean
  socialLinks: PublicSocialLink[]
  goals: ProfileGoal[]
  recentSupports: Support[]
}

export interface PublicPaymentMethod {
  type: string
  enabled: boolean
  name: string
  handle?: string
}

export interface PublicSocialLink {
  platform: string
  url: string
  enabled: boolean
}



export interface Support {
  id: string
  amount: number
  message?: string
  timestamp: string
  anonymous: boolean
  supporterName?: string | null
}

// Live preview types
export interface LivePreviewData {
  profile: Partial<PublicProfile>
  isPreview: boolean
}
