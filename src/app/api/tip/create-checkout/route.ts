/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Payment System Features
 * API: Create Stripe Checkout session for tips/support
 * Features: Stripe integration, custom amounts, anonymous tips, messages
 */
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { ProfileDatabase } from '@/lib/profile/database'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(request: NextRequest) {
  try {
    const { username, amount, message, anonymous = false } = await request.json()

    // Validate input
    if (!username || !amount || amount < 50) { // Minimum $0.50
      return NextResponse.json(
        { error: 'Invalid username or amount' },
        { status: 400 }
      )
    }

    // Get profile to verify user exists and get Stripe account
    const profile = await ProfileDatabase.getProfileByUsername(username)
    
    if (!profile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      )
    }

    // Check minimum tip amount
    if (amount < profile.min_tip_amount) {
      return NextResponse.json(
        { error: `Minimum tip amount is $${profile.min_tip_amount / 100}` },
        { status: 400 }
      )
    }

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Support @${profile.username}`,
              description: message || 'Thank you for your support!',
            },
            unit_amount: amount, // amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/${username}?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/${username}`,
      metadata: {
        username: profile.username,
        user_id: profile.user_id,
        message: message || '',
        anonymous: anonymous.toString(),
      },
      // If user has connected Stripe account, use application fees
      ...(profile.stripe_account_id && {
        payment_intent_data: {
          application_fee_amount: Math.round(amount * 0.05), // 5% platform fee
          transfer_data: {
            destination: profile.stripe_account_id,
          },
        },
      }),
    })

    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url 
    })

  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
