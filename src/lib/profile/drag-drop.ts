/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Profile Features
 * Utility: Drag & drop reordering for social links and payment methods
 * Features: Array manipulation, API calls, optimistic updates
 */

import { createClient } from '@/lib/supabase'

export interface DraggableItem {
  id: string
  display_order: number
  [key: string]: any
}

export interface ReorderRequest {
  type: 'social_links' | 'payment_methods' | 'qr_codes'
  items: Array<{ id: string; display_order: number }>
}

/**
 * Reorder items in an array based on drag and drop
 */
export function reorderItems<T extends DraggableItem>(
  items: T[],
  startIndex: number,
  endIndex: number
): T[] {
  const result = Array.from(items)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  // Update display_order for all items
  return result.map((item, index) => ({
    ...item,
    display_order: index
  }))
}

/**
 * Move item to specific position and update display orders
 */
export function moveItemToPosition<T extends DraggableItem>(
  items: T[],
  itemId: string,
  newPosition: number
): T[] {
  const currentIndex = items.findIndex(item => item.id === itemId)
  if (currentIndex === -1) return items

  return reorderItems(items, currentIndex, newPosition)
}

/**
 * Get the new display order for an item based on its position
 */
export function calculateDisplayOrder(
  items: DraggableItem[],
  targetIndex: number
): number {
  if (targetIndex === 0) {
    return 0
  }
  
  if (targetIndex >= items.length) {
    return items.length
  }
  
  return targetIndex
}

/**
 * Update display orders in the database
 */
export async function updateDisplayOrders(
  type: 'social_links' | 'payment_methods' | 'qr_codes',
  items: Array<{ id: string; display_order: number }>
): Promise<void> {
  try {
    const response = await fetch('/api/profile/reorder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type,
        items
      })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to update order')
    }
  } catch (error) {
    console.error('Error updating display orders:', error)
    throw error
  }
}

/**
 * Optimistically update items and sync with database
 */
export async function handleReorder<T extends DraggableItem>(
  items: T[],
  startIndex: number,
  endIndex: number,
  type: 'social_links' | 'payment_methods' | 'qr_codes',
  onUpdate: (newItems: T[]) => void
): Promise<void> {
  // Optimistically update UI
  const newItems = reorderItems(items, startIndex, endIndex)
  onUpdate(newItems)

  try {
    // Sync with database
    const updateData = newItems.map(item => ({
      id: item.id,
      display_order: item.display_order
    }))

    await updateDisplayOrders(type, updateData)
  } catch (error) {
    // Revert on error
    onUpdate(items)
    throw error
  }
}

/**
 * Sort items by display order
 */
export function sortByDisplayOrder<T extends DraggableItem>(items: T[]): T[] {
  return items.sort((a, b) => a.display_order - b.display_order)
}

/**
 * Validate display order sequence
 */
export function validateDisplayOrder<T extends DraggableItem>(items: T[]): boolean {
  const sorted = sortByDisplayOrder(items)
  
  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i].display_order !== i) {
      return false
    }
  }
  
  return true
}

/**
 * Fix display order sequence if corrupted
 */
export function fixDisplayOrder<T extends DraggableItem>(items: T[]): T[] {
  const sorted = sortByDisplayOrder(items)
  
  return sorted.map((item, index) => ({
    ...item,
    display_order: index
  }))
}

/**
 * Get next available display order
 */
export function getNextDisplayOrder<T extends DraggableItem>(items: T[]): number {
  if (items.length === 0) return 0
  
  const maxOrder = Math.max(...items.map(item => item.display_order))
  return maxOrder + 1
}

/**
 * Insert item at specific position
 */
export function insertItemAtPosition<T extends DraggableItem>(
  items: T[],
  newItem: T,
  position: number
): T[] {
  const result = [...items]
  
  // Update display orders for items after insertion point
  for (let i = 0; i < result.length; i++) {
    if (result[i].display_order >= position) {
      result[i] = {
        ...result[i],
        display_order: result[i].display_order + 1
      }
    }
  }
  
  // Insert new item
  const itemWithOrder = {
    ...newItem,
    display_order: position
  }
  
  result.push(itemWithOrder)
  return sortByDisplayOrder(result)
}

/**
 * Remove item and update display orders
 */
export function removeItemAndUpdateOrder<T extends DraggableItem>(
  items: T[],
  itemId: string
): T[] {
  const itemIndex = items.findIndex(item => item.id === itemId)
  if (itemIndex === -1) return items
  
  const result = items.filter(item => item.id !== itemId)
  
  // Update display orders for items after removed item
  return result.map((item, index) => ({
    ...item,
    display_order: index
  }))
}

/**
 * Bulk update display orders for multiple item types
 */
export async function bulkUpdateDisplayOrders(updates: {
  social_links?: Array<{ id: string; display_order: number }>
  payment_methods?: Array<{ id: string; display_order: number }>
  qr_codes?: Array<{ id: string; display_order: number }>
}): Promise<void> {
  const promises = []
  
  if (updates.social_links) {
    promises.push(updateDisplayOrders('social_links', updates.social_links))
  }
  
  if (updates.payment_methods) {
    promises.push(updateDisplayOrders('payment_methods', updates.payment_methods))
  }
  
  if (updates.qr_codes) {
    promises.push(updateDisplayOrders('qr_codes', updates.qr_codes))
  }
  
  await Promise.all(promises)
}

/**
 * Debounced reorder function to prevent excessive API calls
 */
export function createDebouncedReorder<T extends DraggableItem>(
  delay: number = 500
) {
  let timeoutId: NodeJS.Timeout
  
  return function debouncedReorder(
    items: T[],
    startIndex: number,
    endIndex: number,
    type: 'social_links' | 'payment_methods' | 'qr_codes',
    onUpdate: (newItems: T[]) => void
  ): Promise<void> {
    // Immediately update UI
    const newItems = reorderItems(items, startIndex, endIndex)
    onUpdate(newItems)
    
    // Debounce database update
    return new Promise((resolve, reject) => {
      clearTimeout(timeoutId)
      
      timeoutId = setTimeout(async () => {
        try {
          const updateData = newItems.map(item => ({
            id: item.id,
            display_order: item.display_order
          }))
          
          await updateDisplayOrders(type, updateData)
          resolve()
        } catch (error) {
          // Revert on error
          onUpdate(items)
          reject(error)
        }
      }, delay)
    })
  }
}
