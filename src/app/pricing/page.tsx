import { 
  Section, 
  GlassCard, 
  PrimaryButton, 
  GradientText,
  SectionTitle,
  Description 
} from '@/components/design-system'
import { Check, Star } from 'lucide-react'

export default function PricingPage() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        'Your own payment profile page',
        'Up to 3 payment methods',
        'Basic QR code generation',
        'Community support',
        'DriplyPay branding'
      ],
      cta: 'Get Started Free',
      href: '/signup',
      popular: false
    },
    {
      name: 'Pro',
      price: '$9',
      period: 'per month',
      description: 'For serious creators',
      features: [
        'Everything in Free',
        'Unlimited payment methods',
        'Custom domain support',
        'Advanced analytics',
        'Priority support',
        'Remove DriplyPay branding',
        'Custom themes',
        'Tip scheduling'
      ],
      cta: 'Start Pro Trial',
      href: '/signup?plan=pro',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'For agencies and teams',
      features: [
        'Everything in Pro',
        'Multiple team members',
        'White-label solution',
        'Custom integrations',
        'Dedicated support',
        'SLA guarantee',
        'Custom contracts'
      ],
      cta: 'Contact Sales',
      href: '/contact',
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white driplypay-font-primary">
      {/* Hero Section */}
      <Section className="text-center">
        <SectionTitle center={true}>
          <span className="text-white">Simple pricing for </span>
          <GradientText>every creator</GradientText>
        </SectionTitle>
        
        <Description center={true}>
          Start free and upgrade when you&apos;re ready. No hidden fees, no surprises.
        </Description>
      </Section>

      {/* Pricing Cards */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div key={plan.name} className="relative">
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <GlassCard 
                variant={plan.popular ? 'primary' : 'secondary'} 
                className={`h-full ${plan.popular ? 'ring-2 ring-blue-400/20' : ''}`}
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-black">
                      <GradientText>{plan.price}</GradientText>
                    </span>
                    <span className="text-gray-400 ml-2">/{plan.period}</span>
                  </div>
                  <p className="text-gray-300">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <PrimaryButton 
                  href={plan.href}
                  className={`w-full ${!plan.popular ? 'opacity-80' : ''}`}
                >
                  {plan.cta}
                </PrimaryButton>
              </GlassCard>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ Section */}
      <Section className="bg-gray-900">
        <div className="text-center mb-12">
          <SectionTitle center={true}>
            <span className="text-white">Frequently asked </span>
            <GradientText>questions</GradientText>
          </SectionTitle>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {[
            {
              q: 'Is the free plan really free forever?',
              a: 'Yes! Our free plan includes everything you need to start accepting payments. You can upgrade to Pro anytime for additional features.'
            },
            {
              q: 'What payment methods can I accept?',
              a: 'You can add any payment method - CashApp, PayPal, Venmo, Zelle, crypto wallets, or any custom link. Pro users get unlimited payment methods.'
            },
            {
              q: 'Do you take a cut of my earnings?',
              a: 'No! Unlike other platforms, we never take a percentage of your earnings. You keep 100% of what you earn (minus standard payment processor fees).'
            },
            {
              q: 'Can I use my own domain?',
              a: 'Pro users can connect their own custom domain (like tips.yourname.com) for a more professional appearance.'
            },
            {
              q: 'Is this safe for adult content creators?',
              a: 'Absolutely. DriplyPay is built specifically for adult content creators with privacy and safety as our top priorities.'
            }
          ].map((faq, index) => (
            <div key={index} className="glass-secondary rounded-xl p-6">
              <h3 className="font-bold text-white mb-3">{faq.q}</h3>
              <p className="text-gray-300">{faq.a}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section>
        <GlassCard variant="primary">
          <div className="text-center">
            <SectionTitle center={true}>
              <span className="text-white">Ready to start </span>
              <GradientText>earning?</GradientText>
            </SectionTitle>
            
            <Description center={true}>
              Join thousands of creators who&apos;ve taken control of their income with DriplyPay.
            </Description>
            
            <PrimaryButton href="/signup">
              Get Started Free
            </PrimaryButton>
          </div>
        </GlassCard>
      </Section>
    </div>
  )
}
