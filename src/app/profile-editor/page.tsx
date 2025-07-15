/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Profile Editor Features
 * Page: Live profile editor page - WYSIWYG editing experience
 * Features: Real-time editing, same styling as public profile, inline editing
 */
'use client'

import { useState, useCallback, useEffect } from 'react'
import { useAuth } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import { EditablePublicProfile } from '@/components/profile/editor/EditablePublicProfile'
import { UserIcon, EditIcon, CreditCardIcon, ExternalLinkIcon, SettingsIcon } from '@/components/icons'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

export default function ProfileEditorPage() {
  const { user, profile: authProfile, loading: authLoading } = useAuth()
  const [profile, setProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isNewUser, setIsNewUser] = useState(false)

  console.log('🔍 ProfileEditor Debug:', {
    user: user?.id,
    authProfile: authProfile?.id,
    authLoading,
    isLoading,
    profile: profile?.id
  })

  // Check if this is a new user for onboarding
  const checkIfNewUser = (profileData: any) => {
    if (!profileData) return false
    
    // Consider new if:
    // - Created within last 60 minutes (extended time for testing)
    // - Has minimal data (no social links, payment methods, or goals)
    // - No profile photo or banner
    const createdAt = new Date(profileData.created_at)
    const sixtyMinutesAgo = new Date(Date.now() - 60 * 60 * 1000)
    const isRecentlyCreated = createdAt > sixtyMinutesAgo
    
    const hasMinimalData = (
      (!profileData.wallet_methods || profileData.wallet_methods.length === 0) &&
      (!profileData.social_links || profileData.social_links.length === 0) &&
      (!profileData.bio || profileData.bio.trim() === '') &&
      (!profileData.profile_image || profileData.profile_image.trim() === '') &&
      (!profileData.banner_image || profileData.banner_image.trim() === '')
    )
    
    console.log('🔍 New user check:', {
      createdAt: createdAt.toISOString(),
      isRecentlyCreated,
      hasMinimalData,
      walletMethods: profileData.wallet_methods?.length || 0,
      socialLinks: profileData.social_links?.length || 0,
      bio: profileData.bio || 'empty',
      profileImage: profileData.profile_image || 'empty',
      bannerImage: profileData.banner_image || 'empty'
    })
    
    return isRecentlyCreated && hasMinimalData
  }

  // Load profile data from database
  useEffect(() => {
    const loadProfile = async () => {
      if (!user?.id) return

      try {
        setIsLoading(true)
        
        // Get complete profile with all data using direct Supabase queries
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single()
          
        if (profileError) throw profileError

        // Fetch wallet methods
        const { data: walletMethodsData } = await supabase
          .from('wallet_methods')
          .select('*')
          .eq('user_id', user.id)
          .order('order_index', { ascending: true })

        // Map wallet methods to component expected format
        const walletMethods = (walletMethodsData || []).map((method: any) => ({
          id: method.id,
          type: method.type,
          platform: method.platform,
          name: method.name,
          handle: method.handle,
          url: method.url,
          details: method.details,
          enabled: method.enabled,
          order_index: method.order_index
        }))

        // Try to get social_links and goals, but don't fail if tables don't exist
        let socialLinks: any[] = []
        let goals: any[] = []
        
        try {
          const { data: socialLinksData } = await supabase
            .from('social_links')
            .select('*')
            .eq('user_id', user.id)
            .order('display_order', { ascending: true })
          // Map database fields to component expected fields
          socialLinks = (socialLinksData || []).map(link => ({
            id: link.id,
            platform: link.platform,
            username: link.label || '', // map label back to username for display
            url: link.url,
            // Include photo story fields
            photo_url: link.photo_url,
            photo_caption: link.photo_caption,
            wallet_method_id: link.wallet_method_id
          }))
        } catch (error) {
          console.warn('social_links table might not exist:', error)
        }

        try {
          const { data: goalsData } = await supabase
            .from('goals')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
          // Map database fields to component expected fields
          goals = (goalsData || []).map(goal => ({
            ...goal,
            target: goal.target_amount / 100, // Convert from cents to dollars
            current: goal.current_amount / 100 // Convert from cents to dollars
          }))
        } catch (error) {
          console.warn('goals table might not exist:', error)
        }
        
        // Combine all data into complete profile object
        const completeProfile = {
          ...profileData,
          wallet_methods: walletMethods || [],
          social_links: socialLinks,
          goals: goals
        }
        
        setProfile(completeProfile)
        setIsNewUser(checkIfNewUser(completeProfile))
      } catch (error) {
        console.error('Error loading profile:', error)
        toast.error('Failed to load profile data')
        // Fallback to auth profile if available
        if (authProfile) {
          setProfile({
            ...authProfile,
            wallet_methods: [],
            social_links: [],
            goals: []
          })
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadProfile()
  }, [user?.id, authProfile])

  const handleProfileUpdate = useCallback(async (updates: Partial<any>) => {
    if (!user?.id || !profile) return

    console.log('🔄 Profile update started:', updates)
    console.log('🔄 Update keys:', Object.keys(updates))
    
    // Update local state immediately for responsive UI
    setProfile((prev: any) => ({ ...prev, ...updates }))
    
    // Check specifically for goals
    if (updates.goals) {
      console.log('🎯 Goals update detected:', updates.goals)
    } else {
      console.log('🎯 No goals in this update')
    }
    
    try {
      // Handle wallet methods updates
      if (updates.wallet_methods) {
        console.log('💰 Updating wallet methods:', updates.wallet_methods)
        
        // Delete existing wallet methods for this user
        const { error: deleteWalletError } = await supabase
          .from('wallet_methods')
          .delete()
          .eq('user_id', user.id)
          
        if (deleteWalletError) {
          console.error('❌ Error deleting wallet methods:', deleteWalletError)
          throw deleteWalletError
        }
        
        // Insert new wallet methods
        if (updates.wallet_methods.length > 0) {
          const walletMethodsToInsert = updates.wallet_methods.map((method: any, index: number) => ({
            user_id: user.id,
            type: method.type || 'external',
            platform: method.platform || 'custom',
            name: method.name || '',
            handle: method.handle || null,
            url: method.url || null,
            details: method.details || {},
            enabled: method.enabled ?? true,
            order_index: index,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }))
          
          console.log('💰 Inserting wallet methods:', walletMethodsToInsert)
          
          const { data: insertedWalletMethods, error: walletError } = await supabase
            .from('wallet_methods')
            .insert(walletMethodsToInsert)
            .select()
            
          if (walletError) {
            console.error('❌ Error inserting wallet methods:', walletError)
            throw walletError
          }
          
          console.log('✅ Wallet methods saved successfully')
        }
      }
      
      // Handle social links updates with proper UPSERT to maintain IDs
      if (updates.social_links) {
        console.log('🔗 Updating social links with UPSERT strategy:', updates.social_links)
        
        try {
          // Get existing social links to preserve IDs
          const { data: existingLinks } = await supabase
            .from('social_links')
            .select('*')
            .eq('user_id', user.id)
          
          console.log('📋 Existing social links:', existingLinks)
          
          if (updates.social_links.length > 0) {
            const socialLinksToUpsert = updates.social_links.map((link: any, index: number) => {
              // Normalize platform names to match database constraints
              let normalizedPlatform = (link.platform || '').toLowerCase().trim()
              
              // Map common platform variations to database values
              const platformMap: { [key: string]: string } = {
                'instagram': 'instagram',
                'ig': 'instagram',
                'twitter': 'twitter',
                'x': 'twitter',
                'x.com': 'twitter',
                'youtube': 'youtube',
                'yt': 'youtube',
                'tiktok': 'tiktok',
                'onlyfans': 'onlyfans',
                'of': 'onlyfans',
                'twitch': 'twitch',
                'discord': 'discord',
                'linkedin': 'linkedin'
              }
              
              // Use mapped platform or default to 'custom'
              const dbPlatform = platformMap[normalizedPlatform] || 'custom'
              
              // Find matching existing link by platform and URL to preserve ID
              const existingLink = existingLinks?.find(existing => 
                existing.platform === dbPlatform && existing.url === link.url
              )
              
              return {
                ...(existingLink?.id && { id: existingLink.id }), // Preserve existing ID if found
                user_id: user.id,
                platform: dbPlatform,
                url: link.url || '',
                label: link.username || link.platform || '',
                enabled: true,
                display_order: index,
                // Include photo story fields
                photo_url: link.photo_url || null,
                photo_caption: link.photo_caption || null,
                wallet_method_id: link.wallet_method_id || null,
                username: link.username || '', // Add username field
                order_index: index, // Add order_index field
                updated_at: new Date().toISOString(),
                ...(existingLink?.id ? {} : { created_at: new Date().toISOString() }) // Only set created_at for new records
              }
            })
            
            console.log('� Upserting social links (preserving IDs):', socialLinksToUpsert)
            
            // Use UPSERT to preserve existing IDs and only update changes
            const { data: upsertedLinks, error: socialError } = await supabase
              .from('social_links')
              .upsert(socialLinksToUpsert, {
                onConflict: 'id', // Use ID as conflict resolution
                ignoreDuplicates: false // Update existing records
              })
              .select()
              
            if (socialError) {
              console.error('❌ Error upserting social links:', socialError)
              throw socialError
            }
            
            console.log('✅ Social links upserted successfully:', upsertedLinks)
            
            // Clean up any orphaned links (links that exist in DB but not in the current update)
            if (existingLinks && existingLinks.length > 0) {
              const currentUrls = updates.social_links.map((link: any) => link.url)
              const linksToDelete = existingLinks.filter(existing => 
                !currentUrls.includes(existing.url)
              )
              
              if (linksToDelete.length > 0) {
                console.log('🗑️ Cleaning up orphaned links:', linksToDelete.map(l => l.id))
                const { error: deleteError } = await supabase
                  .from('social_links')
                  .delete()
                  .in('id', linksToDelete.map(l => l.id))
                
                if (deleteError) {
                  console.warn('⚠️ Error cleaning up orphaned links:', deleteError)
                  // Don't throw - this is cleanup, not critical
                }
              }
            }
          } else {
            // If no social links provided, clean up all existing links
            console.log('🗑️ No social links provided, cleaning up all existing links')
            const { error: deleteError } = await supabase
              .from('social_links')
              .delete()
              .eq('user_id', user.id)
              
            if (deleteError && deleteError.code !== 'PGRST116') {
              console.warn('⚠️ Error deleting all social links:', deleteError)
            }
          }
        } catch (error: any) {
          if (error.code === 'PGRST116' || error.message?.includes('relation') || error.message?.includes('does not exist')) {
            console.warn('⚠️ Social links table does not exist, skipping social links save')
            // Continue without failing - just skip social links
          } else {
            throw error
          }
        }
      }
      
      // Handle goals updates
      if (updates.goals) {
        console.log('🎯 Updating goals:', updates.goals)
        
        try {
          // Delete existing goals for this user
          const { error: deleteError } = await supabase
            .from('goals')
            .delete()
            .eq('user_id', user.id)
            
          if (deleteError && deleteError.code !== 'PGRST116') { // Ignore "table doesn't exist" error
            console.error('❌ Error deleting goals:', deleteError)
            throw deleteError
          }
          
          // Insert new goals
          if (updates.goals.length > 0) {
            const goalsToInsert = updates.goals.map((goal: any) => {
              return {
                user_id: user.id,
                title: goal.title || '',
                description: goal.description || '',
                target_amount: Math.round((goal.target || goal.target_amount || 0) * 100), // Convert to cents
                current_amount: Math.round((goal.current || goal.current_amount || 0) * 100), // Convert to cents
                is_active: true,
                wallet_method_id: goal.wallet_method_id || null, // Use wallet method instead of payment method
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              }
            })
            
            console.log('🎯 Inserting goals:', goalsToInsert)
            
            const { error: goalsError } = await supabase
              .from('goals')
              .insert(goalsToInsert)
              
            if (goalsError) {
              console.error('❌ Error inserting goals:', goalsError)
              throw goalsError
            }
            
            console.log('✅ Goals saved successfully')
          }
        } catch (error: any) {
          if (error.code === 'PGRST116' || error.message?.includes('relation') || error.message?.includes('does not exist')) {
            console.warn('⚠️ Goals table does not exist, skipping goals save')
            // Continue without failing - just skip goals
          } else {
            throw error
          }
        }
      }
      
      // Update basic profile fields
      const profileFields = { ...updates }
      delete profileFields.wallet_methods
      delete profileFields.social_links
      delete profileFields.goals
      
      if (Object.keys(profileFields).length > 0) {
        console.log('👤 Updating profile fields:', profileFields)
        
        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            ...profileFields,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', user.id)
          
        if (updateError) {
          console.error('❌ Error updating profile:', updateError)
          throw updateError
        }
        
        console.log('✅ Profile fields saved successfully')
      }
      
      // Reload complete profile data to get new IDs and ensure state consistency
      console.log('🔄 Reloading profile data after update...')
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()

      // Fetch updated wallet methods
      const { data: walletMethodsData } = await supabase
        .from('wallet_methods')
        .select('*')
        .eq('user_id', user.id)
        .order('order_index', { ascending: true })

      // Map wallet methods to component expected format
      const walletMethods = (walletMethodsData || []).map((method: any) => ({
        id: method.id,
        type: method.type,
        platform: method.platform,
        name: method.name,
        handle: method.handle,
        url: method.url,
        details: method.details,
        enabled: method.enabled,
        order_index: method.order_index
      }))

      let socialLinks: any[] = []
      let goals: any[] = []
      
      try {
        const { data: socialLinksData } = await supabase
          .from('social_links')
          .select('*')
          .eq('user_id', user.id)
          .order('display_order', { ascending: true })
        socialLinks = (socialLinksData || []).map(link => ({
          id: link.id,
          platform: link.platform,
          username: link.label || '',
          url: link.url
        }))
      } catch (error) {
        console.warn('social_links table might not exist:', error)
      }

      try {
        const { data: goalsData } = await supabase
          .from('goals')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
        // Map database fields to component expected fields
        goals = (goalsData || []).map(goal => ({
          ...goal,
          target: goal.target_amount / 100, // Convert from cents to dollars
          current: goal.current_amount / 100 // Convert from cents to dollars
        }))
      } catch (error) {
        console.warn('goals table might not exist:', error)
      }
      
      // Update local state with fresh data
      const updatedProfile = {
        ...profileData,
        wallet_methods: walletMethods,
        social_links: socialLinks,
        goals: goals
      }
      setProfile(updatedProfile)
      
      toast.success('Profile updated successfully!')
      console.log('🎉 Profile update completed successfully!')
      console.log('🔄 Fresh profile data loaded:', updatedProfile)
    } catch (error) {
      console.error('💥 Error updating profile:', error)
      toast.error('Failed to update profile')
      throw error // Re-throw to let the component handle the error state
    }
  }, [user?.id, profile])

  // Show loading state
  if (authLoading || isLoading) {
    console.log('🔄 ProfileEditor showing loading state')
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading your profile...</p>
        </div>
      </div>
    )
  }

  // Show message if no user authenticated
  if (!user) {
    console.log('❌ ProfileEditor: No user found, should redirect to signin')
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-white mb-4">Please sign in to access the profile editor.</p>
          <Link href="/signin" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg inline-block">
            Sign In
          </Link>
        </div>
      </div>
    )
  }

  // Show message if no profile found
  if (!profile) {
    console.log('❌ ProfileEditor: User found but no profile')
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-white mb-4">No profile found. Please create a profile first.</p>
          <button
            onClick={() => window.location.href = '/setup-profile'}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Create Profile
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Editable Profile */}
      <EditablePublicProfile 
        profile={profile} 
        userId={user?.id || ''}
        onProfileUpdate={handleProfileUpdate}
        isNewUser={isNewUser}
      />
      
      {/* Floating Action Button for New Users */}
      {isNewUser && (
        <div className="fixed bottom-6 right-6 z-50">
          <Link
            href="/dashboard"
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 transition-all duration-200 hover:scale-105"
          >
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Continue to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  )
}
