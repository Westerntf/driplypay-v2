import { 
  Section, 
  GlassCard, 
  PrimaryButton, 
  GradientText,
  SectionTitle,
  Description 
} from '@/components/design-system'
import { 
  Shield, 
  Smartphone, 
  Zap, 
  Eye, 
  QrCode, 
  BarChart3, 
  Palette, 
  Globe,
  Lock,
  CreditCard,
  Users,
  Star
} from 'lucide-react'

export default function FeaturesPage() {
  const mainFeatures = [
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Keep your personal details private while maintaining a professional payment presence. No real name required.'
    },
    {
      icon: Smartphone,
      title: 'Mobile Optimized',
      description: 'Perfect mobile experience for you and your supporters. Fast loading, beautiful design on every device.'
    },
    {
      icon: Zap,
      title: 'Instant Payments',
      description: 'Direct integration with Stripe, CashApp, PayPal and more. Your supporters pay you directly - no middleman.'
    },
    {
      icon: Eye,
      title: 'Link Privacy',
      description: 'Optional link blurring keeps your payment methods private until supporters are ready to tip.'
    },
    {
      icon: QrCode,
      title: 'QR Codes',
      description: 'Generate QR codes for in-person tips, events, or anywhere you need quick payment access.'
    },
    {
      icon: BarChart3,
      title: 'Analytics',
      description: 'Track profile views, clicks, and earnings with detailed analytics and insights.'
    },
    {
      icon: Palette,
      title: 'Custom Themes',
      description: 'Choose from Clean, Neon, or Luxe themes. Pro users can fully customize their brand appearance.'
    },
    {
      icon: Globe,
      title: 'Custom Domains',
      description: 'Pro users can use their own domain (tips.yourname.com) for maximum professionalism.'
    }
  ]

  const platformFeatures = [
    {
      icon: Lock,
      title: 'No Content Rules',
      description: 'We don\'t police your content. Focus on creating while we handle payments.'
    },
    {
      icon: CreditCard,
      title: 'Keep 100% of Earnings',
      description: 'No platform fees. No revenue sharing. You keep everything you earn.'
    },
    {
      icon: Users,
      title: 'Own Your Audience',
      description: 'Direct relationships with supporters. No platform controlling your income.'
    },
    {
      icon: Star,
      title: 'Creator-Focused',
      description: 'Built by creators, for creators. Every feature designed with your needs in mind.'
    }
  ]

  const comparisonFeatures = [
    { feature: 'Custom Payment Page', driplypay: true, others: false },
    { feature: 'No Platform Fees', driplypay: true, others: false },
    { feature: 'Adult Content Friendly', driplypay: true, others: false },
    { feature: 'Privacy Controls', driplypay: true, others: false },
    { feature: 'QR Code Generation', driplypay: true, others: false },
    { feature: 'Custom Domains', driplypay: true, others: false },
    { feature: 'No Content Moderation', driplypay: true, others: false },
    { feature: 'Direct Fan Relationships', driplypay: true, others: false }
  ]

  return (
    <div className="min-h-screen bg-black text-white driplypay-font-primary">
      {/* Hero Section */}
      <Section className="text-center">
        <SectionTitle center={true}>
          <span className="text-white">Everything you need to </span>
          <GradientText>get paid</GradientText>
        </SectionTitle>
        
        <Description center={true}>
          DriplyPay combines the simplicity of link-in-bio with the power of direct payments. 
          Built specifically for creators who want to own their income.
        </Description>
      </Section>

      {/* Main Features Grid */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mainFeatures.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className="glass-secondary rounded-xl p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </Section>

      {/* Platform Benefits */}
      <Section className="bg-gray-900">
        <div className="text-center mb-12">
          <SectionTitle center={true}>
            <GradientText>Built for creators</GradientText>
            <span className="text-white">, not platforms</span>
          </SectionTitle>
          <Description center={true}>
            Unlike other platforms that control your content and take your money, 
            DriplyPay puts you in complete control.
          </Description>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {platformFeatures.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </Section>

      {/* Comparison Table */}
      <Section>
        <div className="text-center mb-12">
          <SectionTitle center={true}>
            <span className="text-white">DriplyPay vs </span>
            <GradientText>Other Platforms</GradientText>
          </SectionTitle>
        </div>

        <div className="max-w-4xl mx-auto">
          <GlassCard variant="primary">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-4 px-6 font-bold text-white">Feature</th>
                    <th className="text-center py-4 px-6 font-bold">
                      <GradientText>DriplyPay</GradientText>
                    </th>
                    <th className="text-center py-4 px-6 font-bold text-gray-400">Other Platforms</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((row, index) => (
                    <tr key={row.feature} className={index !== comparisonFeatures.length - 1 ? 'border-b border-gray-800' : ''}>
                      <td className="py-4 px-6 text-gray-300">{row.feature}</td>
                      <td className="py-4 px-6 text-center">
                        {row.driplypay ? (
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        ) : (
                          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mx-auto">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {row.others ? (
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        ) : (
                          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mx-auto">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>
      </Section>

      {/* CTA Section */}
      <Section>
        <GlassCard variant="primary">
          <div className="text-center">
            <SectionTitle center={true}>
              <span className="text-white">Ready to take control of </span>
              <GradientText>your income?</GradientText>
            </SectionTitle>
            
            <Description center={true}>
              Join thousands of creators who&apos;ve made the switch to DriplyPay.
            </Description>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <PrimaryButton href="/signup">
                Get Started Free
              </PrimaryButton>
              <a 
                href="/pricing" 
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
              >
                View Pricing →
              </a>
            </div>
          </div>
        </GlassCard>
      </Section>
    </div>
  )
}
