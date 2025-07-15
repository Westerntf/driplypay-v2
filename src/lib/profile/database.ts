/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Database & Schema
 * Purpose: Core database operations for all profile features
 * Features: Profile CRUD, real-time subscriptions, error handling
 */

import { supabase, createAdminClient } from '@/lib/supabase'
import { Profile, SocialLink, PaymentMethod, ProfileGoal } from '@/types'

// Service role client for server-side operations (bypasses RLS)
const supabaseAdmin = createAdminClient()

// Type alias for consistency
export type Goal = ProfileGoal

// Profile Operations
export class ProfileDatabase {
  
  // Get profile by username (for public profiles)
  static async getProfileByUsername(username: string) {
    try {
      // Use admin client for server-side fetching (bypasses RLS)
      const client = typeof window === 'undefined' ? supabaseAdmin : supabase

      // First get the profile
      const { data: profile, error: profileError } = await client
        .from('profiles')
        .select('*')
        .eq('username', username)
        .single()

      if (profileError || !profile) {
        console.error('Error fetching profile:', profileError)
        return null
      }

      // Then get related data using the user_id
      const [socialLinksResult, paymentMethodsResult, walletMethodsResult, goalsResult, recentTipsResult] = await Promise.all([
        client.from('social_links').select('*').eq('user_id', profile.user_id),
        client.from('payment_methods').select('*').eq('user_id', profile.user_id),
        client.from('wallet_methods').select('*').eq('user_id', profile.user_id),
        client.from('goals').select('*').eq('user_id', profile.user_id),
        client
          .from('support_messages')
          .select('*')
          .eq('user_id', profile.user_id)
          .order('created_at', { ascending: false })
          .limit(10)
      ])

      // Map payment methods to component expected format
      const mappedPaymentMethods = (paymentMethodsResult.data || []).map((method: any) => ({
        id: method.id,
        type: method.type,
        name: method.name, // Use name field from database
        label: method.name, // Map name to label for component compatibility
        handle: method.handle,
        url: method.url,
        enabled: method.enabled,
        preferred: method.preferred,
        order_index: method.display_order
      }))

      // Map wallet methods to component expected format
      const mappedWalletMethods = (walletMethodsResult.data || []).map((method: any) => ({
        id: method.id,
        type: method.type, // 'external', 'payid', 'bank'
        platform: method.platform, // 'venmo', 'cashapp', 'payid', etc.
        name: method.name,
        handle: method.handle,
        url: method.url,
        details: method.details, // JSONB field for PayID/Bank details
        enabled: method.enabled,
        order_index: method.order_index
      }))

      // Map social links to component expected format
      const mappedSocialLinks = (socialLinksResult.data || []).map((link: any) => ({
        id: link.id,
        platform: link.platform,
        label: link.label, // Keep original label field for display
        url: link.url,
        enabled: link.enabled,
        order_index: link.display_order,
        photo_url: link.photo_url,
        photo_caption: link.photo_caption,
        wallet_method_id: link.wallet_method_id
      }))

      // Combine the data
      return {
        ...profile,
        social_links: mappedSocialLinks,
        payment_methods: mappedPaymentMethods,
        wallet_methods: mappedWalletMethods,
        goals: goalsResult.data || [],
        recent_tips: recentTipsResult.data || []
      }
    } catch (error) {
      console.error('Profile fetch error:', error)
      return null
    }
  }

  // Get profile by user ID (for dashboard)
  static async getProfileByUserId(userId: string) {
    try {
      // First get the profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (profileError || !profile) {
        console.error('Error fetching user profile:', profileError)
        return null
      }

      // Then get related data using the user_id
      const [socialLinksResult, paymentMethodsResult, goalsResult] = await Promise.all([
        supabase.from('social_links').select('*').eq('user_id', profile.user_id),
        supabase.from('payment_methods').select('*').eq('user_id', profile.user_id),
        supabase.from('goals').select('*').eq('user_id', profile.user_id)
      ])

      // Map payment methods to new format for frontend compatibility
      const mappedPaymentMethods = (paymentMethodsResult.data || []).map((method: any) => ({
        ...method,
        name: method.name, // Use the actual name field
        label: method.name, // Map name to label for component compatibility
        enabled: method.enabled, // Use actual enabled field
      }))

      // Combine the data
      return {
        ...profile,
        social_links: socialLinksResult.data || [],
        payment_methods: mappedPaymentMethods,
        goals: goalsResult.data || []
      }
    } catch (error) {
      console.error('User profile fetch error:', error)
      return null
    }
  }

  // Create new profile
  static async createProfile(profileData: Partial<Profile>) {
    try {
      // Use admin client for write operations (bypasses RLS)
      const { data, error } = await supabaseAdmin
        .from('profiles')
        .insert([profileData])
        .select()
        .single()

      if (error) {
        console.error('Error creating profile:', error)
        throw error
      }

      return data
    } catch (error) {
      console.error('Profile creation error:', error)
      throw error
    }
  }

  // Update profile
  static async updateProfile(userId: string, updates: Partial<Profile>) {
    try {
      // Use admin client for write operations (bypasses RLS)
      const { data, error } = await supabaseAdmin
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .select()
        .single()

      if (error) {
        console.error('Error updating profile:', error)
        throw error
      }

      return data
    } catch (error) {
      console.error('Profile update error:', error)
      throw error
    }
  }

  // Check if username is available
  static async isUsernameAvailable(username: string, excludeUserId?: string) {
    try {
      // Use admin client for server-side operations (bypasses RLS)
      const client = typeof window === 'undefined' ? supabaseAdmin : supabase
      
      let query = client
        .from('profiles')
        .select('id')
        .eq('username', username.toLowerCase())

      if (excludeUserId) {
        query = query.neq('user_id', excludeUserId)
      }

      const { data, error } = await query

      if (error) {
        console.error('Error checking username:', error)
        return false
      }

      return data.length === 0
    } catch (error) {
      console.error('Username check error:', error)
      return false
    }
  }
}

// Social Links Operations
export class SocialLinksDatabase {
  
  // Get social links for a user
  static async getSocialLinks(userId: string) {
    try {
      const { data, error } = await supabase
        .from('social_links')
        .select('*')
        .eq('user_id', userId)
        .order('display_order', { ascending: true })

      if (error) {
        console.error('Error fetching social links:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Social links fetch error:', error)
      return []
    }
  }

  // Add social link
  static async addSocialLink(linkData: Partial<SocialLink>) {
    try {
      // Use admin client for write operations (bypasses RLS)
      const { data, error } = await supabaseAdmin
        .from('social_links')
        .insert([linkData])
        .select()
        .single()

      if (error) {
        console.error('Error adding social link:', error)
        throw error
      }

      return data
    } catch (error) {
      console.error('Social link creation error:', error)
      throw error
    }
  }

  // Update social link
  static async updateSocialLink(id: string, updates: Partial<SocialLink>) {
    try {
      // Use admin client for write operations (bypasses RLS)
      const { data, error } = await supabaseAdmin
        .from('social_links')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Error updating social link:', error)
        throw error
      }

      return data
    } catch (error) {
      console.error('Social link update error:', error)
      throw error
    }
  }

  // Delete social link
  static async deleteSocialLink(id: string) {
    try {
      // Use admin client for write operations (bypasses RLS)
      const { error } = await supabaseAdmin
        .from('social_links')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting social link:', error)
        throw error
      }

      return true
    } catch (error) {
      console.error('Social link deletion error:', error)
      throw error
    }
  }

  // Update social links order
  static async updateSocialLinksOrder(links: Array<{ id: string; order_index: number }>) {
    try {
      // Use admin client for write operations (bypasses RLS)
      const updates = links.map(link => 
        supabaseAdmin
          .from('social_links')
          .update({ display_order: link.order_index })
          .eq('id', link.id)
      )

      await Promise.all(updates)
      return true
    } catch (error) {
      console.error('Social links order update error:', error)
      throw error
    }
  }
}

// Payment Methods Operations
export class PaymentMethodsDatabase {
  
  // Get payment methods for a user
  static async getPaymentMethods(userId: string) {
    try {
      const { data, error } = await supabase
        .from('payment_methods')
        .select('*')
        .eq('user_id', userId)
        .order('display_order', { ascending: true })

      if (error) {
        console.error('Error fetching payment methods:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Payment methods fetch error:', error)
      return []
    }
  }

  // Add payment method
  static async addPaymentMethod(methodData: Partial<PaymentMethod>) {
    try {
      console.log('Attempting to insert payment method:', methodData)
      
      // Use admin client for write operations (bypasses RLS)
      const { data, error } = await supabaseAdmin
        .from('payment_methods')
        .insert([methodData])
        .select()
        .single()

      if (error) {
        console.error('Supabase error adding payment method:', error)
        throw new Error(`Database error: ${error.message} (Code: ${error.code})`)
      }

      console.log('Successfully created payment method:', data)
      return data
    } catch (error) {
      console.error('Payment method creation error:', error)
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Unknown error creating payment method')
    }
  }

  // Update payment method
  static async updatePaymentMethod(id: string, updates: Partial<PaymentMethod>) {
    try {
      // Use admin client for write operations (bypasses RLS)
      const { data, error } = await supabaseAdmin
        .from('payment_methods')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Error updating payment method:', error)
        throw error
      }

      return data
    } catch (error) {
      console.error('Payment method update error:', error)
      throw error
    }
  }

  // Delete payment method
  static async deletePaymentMethod(id: string) {
    try {
      // Use admin client for write operations (bypasses RLS)
      const { error } = await supabaseAdmin
        .from('payment_methods')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting payment method:', error)
        throw error
      }

      return true
    } catch (error) {
      console.error('Payment method deletion error:', error)
      throw error
    }
  }
}

// Goals Operations
export class GoalsDatabase {
  
  // Get goals for a user
  static async getGoals(userId: string) {
    try {
      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching goals:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Goals fetch error:', error)
      return []
    }
  }

  // Add goal
  static async addGoal(goalData: Partial<Goal>) {
    try {
      // Use admin client for write operations (bypasses RLS)
      const { data, error } = await supabaseAdmin
        .from('goals')
        .insert([goalData])
        .select()
        .single()

      if (error) {
        console.error('Error adding goal:', error)
        throw error
      }

      return data
    } catch (error) {
      console.error('Goal creation error:', error)
      throw error
    }
  }

  // Update goal
  static async updateGoal(id: string, updates: Partial<Goal>) {
    try {
      // Use admin client for write operations (bypasses RLS)
      const { data, error } = await supabaseAdmin
        .from('goals')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Error updating goal:', error)
        throw error
      }

      return data
    } catch (error) {
      console.error('Goal update error:', error)
      throw error
    }
  }

  // Delete goal
  static async deleteGoal(id: string) {
    try {
      // Use admin client for write operations (bypasses RLS)
      const { error } = await supabaseAdmin
        .from('goals')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting goal:', error)
        throw error
      }

      return true
    } catch (error) {
      console.error('Goal deletion error:', error)
      throw error
    }
  }
}

// Real-time subscriptions for live updates
export class RealtimeDatabase {
  
  // Subscribe to profile changes
  static subscribeToProfile(userId: string, callback: (payload: any) => void) {
    return supabase
      .channel(`profile-${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles',
          filter: `user_id=eq.${userId}`
        },
        callback
      )
      .subscribe()
  }

  // Subscribe to social links changes
  static subscribeToSocialLinks(userId: string, callback: (payload: any) => void) {
    return supabase
      .channel(`social-links-${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'social_links',
          filter: `user_id=eq.${userId}`
        },
        callback
      )
      .subscribe()
  }

  // Subscribe to payment methods changes
  static subscribeToPaymentMethods(userId: string, callback: (payload: any) => void) {
    return supabase
      .channel(`payment-methods-${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'payment_methods',
          filter: `user_id=eq.${userId}`
        },
        callback
      )
      .subscribe()
  }

  // Subscribe to goals changes
  static subscribeToGoals(userId: string, callback: (payload: any) => void) {
    return supabase
      .channel(`goals-${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'goals',
          filter: `user_id=eq.${userId}`
        },
        callback
      )
      .subscribe()
  }
}

// Direct exports for convenience (maintaining backward compatibility)
export const getPaymentMethods = PaymentMethodsDatabase.getPaymentMethods
export const createPaymentMethod = PaymentMethodsDatabase.addPaymentMethod
export const updatePaymentMethod = PaymentMethodsDatabase.updatePaymentMethod
export const deletePaymentMethod = PaymentMethodsDatabase.deletePaymentMethod

// Direct exports for goals
export const getGoals = GoalsDatabase.getGoals
export const createGoal = GoalsDatabase.addGoal
export const updateGoal = GoalsDatabase.updateGoal
export const deleteGoal = GoalsDatabase.deleteGoal
