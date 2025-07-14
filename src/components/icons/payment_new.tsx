/**
 * 🚀 Developer Reference: /BLUEPRINT.md → UI Components
 * Component: Payment method icons
 * Features: PayPal, Cash App, Venmo, Stripe icons using public folder assets
 */

import Image from 'next/image'
import { IconProps } from './types'

// Main Payment Icon component that maps payment types to actual icons
export const PaymentIcon = ({ type, className = "w-6 h-6", size = 24 }: { type: string } & IconProps) => {
  const typeLower = type.toLowerCase()
  
  // Map payment types to icon file names
  const iconMap: Record<string, string> = {
    paypal: 'paypal.svg',
    cashapp: 'cashapp.svg',
    'cash app': 'cashapp.svg',
    venmo: 'venmo.svg',
    stripe: 'stripe.svg',
    custom: 'payment.svg'
  }
  
  const iconFile = iconMap[typeLower] || 'payment.svg'
  
  return (
    <Image
      src={`/${iconFile}`}
      alt={`${type} icon`}
      width={typeof size === 'number' ? size : 24}
      height={typeof size === 'number' ? size : 24}
      className={className}
    />
  )
}

// Legacy function for backward compatibility
export const getPaymentIcon = (type: string, props: IconProps = {}) => {
  return <PaymentIcon type={type} {...props} />
}
