/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Payment System Features
 * Purpose: Stripe configuration and payment processing utilities
 * Features: Stripe Connect, payment processing, webhook handling
 */
import Stripe from 'stripe'
import { loadStripe } from '@stripe/stripe-js'

// Server-side Stripe
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

// Client-side Stripe
export const getStripe = () => {
  return loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
}

// Stripe Connect helpers
export async function createConnectAccountLink(accountId: string) {
  return await stripe.accountLinks.create({
    account: accountId,
    refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/payments?refresh=true`,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/payments?connected=true`,
    type: 'account_onboarding',
  })
}

export async function createConnectAccount(email: string) {
  return await stripe.accounts.create({
    type: 'standard',
    email,
  })
}

// Checkout helpers
export async function createCheckoutSession({
  customerId,
  successUrl,
  cancelUrl,
  priceId,
}: {
  customerId?: string
  successUrl: string
  cancelUrl: string
  priceId: string
}) {
  return await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: successUrl,
    cancel_url: cancelUrl,
    subscription_data: {
      trial_period_days: 7,
    },
  })
}

// Tip helpers
export async function createTipCheckoutSession({
  amount,
  stripeAccountId,
  successUrl,
  cancelUrl,
  metadata = {},
}: {
  amount: number
  stripeAccountId: string
  successUrl: string
  cancelUrl: string
  metadata?: Record<string, string>
}) {
  return await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Tip',
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata,
    payment_intent_data: {
      application_fee_amount: Math.round(amount * 0.05), // 5% platform fee
      transfer_data: {
        destination: stripeAccountId,
      },
    },
  })
}

// Customer helpers
export async function createCustomer(email: string, name?: string) {
  return await stripe.customers.create({
    email,
    name,
  })
}

export async function getCustomer(customerId: string) {
  return await stripe.customers.retrieve(customerId)
}

// Webhook helpers
export function constructWebhookEvent(body: string, signature: string) {
  return stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
  )
}

// Billing portal
export async function createBillingPortalSession(
  customerId: string,
  returnUrl: string
) {
  return await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })
}

// Format currency for display
export function formatStripeCurrency(amount: number, currency = 'usd'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100)
}
