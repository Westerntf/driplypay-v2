/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Database & Schema
 * Purpose: Auto-generated Supabase database types
 * Features: Type-safe database operations, table schemas, relationship types
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          username: string
          avatar_url: string | null
          bio: string | null
          support_message: string | null
          theme: 'default' | 'theme1' | 'theme2' | 'theme3'
          blur_links: boolean
          private_profile: boolean
          redirect_url: string | null
          redirect_message: string | null
          min_tip_amount: number
          email_notifications: boolean
          stripe_account_id: string | null
          stripe_customer_id: string | null
          is_pro: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          username: string
          avatar_url?: string | null
          bio?: string | null
          support_message?: string | null
          theme?: 'default' | 'theme1' | 'theme2' | 'theme3'
          blur_links?: boolean
          private_profile?: boolean
          redirect_url?: string | null
          redirect_message?: string | null
          min_tip_amount?: number
          email_notifications?: boolean
          stripe_account_id?: string | null
          stripe_customer_id?: string | null
          is_pro?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          username?: string
          avatar_url?: string | null
          bio?: string | null
          support_message?: string | null
          theme?: 'default' | 'theme1' | 'theme2' | 'theme3'
          blur_links?: boolean
          private_profile?: boolean
          redirect_url?: string | null
          redirect_message?: string | null
          min_tip_amount?: number
          email_notifications?: boolean
          stripe_account_id?: string | null
          stripe_customer_id?: string | null
          is_pro?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      payment_methods: {
        Row: {
          id: string
          user_id: string
          type: 'cashapp' | 'paypal' | 'venmo' | 'zelle' | 'crypto' | 'stripe' | 'custom'
          label: string
          url: string
          preferred: boolean
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: 'cashapp' | 'paypal' | 'venmo' | 'zelle' | 'crypto' | 'stripe' | 'custom'
          label: string
          url: string
          preferred?: boolean
          order_index?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: 'cashapp' | 'paypal' | 'venmo' | 'zelle' | 'crypto' | 'stripe' | 'custom'
          label?: string
          url?: string
          preferred?: boolean
          order_index?: number
          created_at?: string
          updated_at?: string
        }
      }
      tips: {
        Row: {
          id: string
          user_id: string
          amount: number
          currency: string
          anonymous: boolean
          message: string | null
          stripe_payment_intent_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          amount: number
          currency?: string
          anonymous?: boolean
          message?: string | null
          stripe_payment_intent_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          amount?: number
          currency?: string
          anonymous?: boolean
          message?: string | null
          stripe_payment_intent_id?: string | null
          created_at?: string
        }
      }
      qrcodes: {
        Row: {
          id: string
          user_id: string
          type: 'profile' | 'payment_method' | 'fixed_tip'
          target_id: string | null
          amount: number | null
          scans: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: 'profile' | 'payment_method' | 'fixed_tip'
          target_id?: string | null
          amount?: number | null
          scans?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: 'profile' | 'payment_method' | 'fixed_tip'
          target_id?: string | null
          amount?: number | null
          scans?: number
          created_at?: string
          updated_at?: string
        }
      }
      analytics: {
        Row: {
          id: string
          user_id: string
          event_type: 'profile_view' | 'payment_click' | 'qr_scan' | 'tip_received'
          payment_method_id: string | null
          qr_code_id: string | null
          amount: number | null
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          event_type: 'profile_view' | 'payment_click' | 'qr_scan' | 'tip_received'
          payment_method_id?: string | null
          qr_code_id?: string | null
          amount?: number | null
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          event_type?: 'profile_view' | 'payment_click' | 'qr_scan' | 'tip_received'
          payment_method_id?: string | null
          qr_code_id?: string | null
          amount?: number | null
          metadata?: Json | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
