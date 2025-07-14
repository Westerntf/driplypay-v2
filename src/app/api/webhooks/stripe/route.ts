/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Payment System Features
 * API: Handle Stripe webhook events for tip processing
 * Features: Payment confirmation, tip recording, analytics tracking
 */
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { ProfileDatabase } from '@/lib/profile/database'
import { createAdminClient } from '@/lib/supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

const supabaseAdmin = createAdminClient()

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session

      if (session.metadata) {
        const { username, user_id, message, anonymous } = session.metadata

        // Record the tip in the database
        const { error: tipError } = await supabaseAdmin
          .from('support_messages')
          .insert({
            user_id: user_id,
            amount: session.amount_total || 0,
            currency: session.currency || 'usd',
            message: message || null,
            is_anonymous: anonymous === 'true',
            supporter_name: !anonymous ? 'Anonymous Supporter' : null, // You could get this from customer details
            stripe_session_id: session.id,
          })

        if (tipError) {
          console.error('Error recording tip:', tipError)
        }

        // Update profile total earnings
        await supabaseAdmin.rpc('increment_profile_earnings', {
          profile_user_id: user_id,
          amount: session.amount_total || 0
        })

        // Record analytics event
        await supabaseAdmin
          .from('analytics')
          .insert({
            user_id: user_id,
            event_type: 'tip_received',
            amount: session.amount_total || 0,
            metadata: {
              session_id: session.id,
              anonymous: anonymous === 'true',
              message: message || null,
            }
          })

        console.log(`Tip recorded for ${username}: $${(session.amount_total || 0) / 100}`)
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
