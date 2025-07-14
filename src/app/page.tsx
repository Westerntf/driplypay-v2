/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Design System
 * Page: Homepage with marketing content and feature showcase
 * Features: Hero section, feature cards, call-to-action sections
 */
import Link from 'next/link'
import { 
  HeroSection, 
  HeroTitle, 
  Section, 
  GlassCard, 
  PrimaryButton, 
  GradientText,
  SectionTitle,
  Description 
} from '@/components/design-system'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white driplypay-font-primary">
      {/* Hero Section */}
      <HeroSection hasGlow={true}>
        <HeroTitle>DRIPLYPAY</HeroTitle>
        
        <div className="flex items-center justify-center mb-6">
          <h2 className="text-xl md:text-3xl font-black tracking-tight">
            <span className="text-white">THE ADULT CREATOR </span>
            <GradientText>PAYMENT PLATFORM</GradientText>
          </h2>
        </div>
        
        <Description center={true}>
          Accept tips and payments from fans with your own secure, customizable storefront.
        </Description>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <PrimaryButton href="/signup">
            Get Started
          </PrimaryButton>
          
          <Link 
            href="/dashboard" 
            className="text-white hover:text-blue-400 font-semibold text-lg transition-colors"
          >
            View Demo →
          </Link>
        </div>
      </HeroSection>

      {/* Built for Creators Section */}
      <Section>
        <GlassCard variant="primary">
          <SectionTitle center={true}>
            <GradientText>BUILT FOR CREATORS</GradientText>
            <span className="text-gray-300"> NOT PLATFORMS.</span>
          </SectionTitle>
          
          <Description center={true}>
            Accept tips and payments instantly via Stripe and Cash App. 
            No content rules, no arbitrary bans, no middleman taking your cut.
          </Description>
        </GlassCard>
      </Section>

      {/* Features Section */}
      <Section className="bg-gray-900">
        <div className="text-center mb-16">
          <SectionTitle center={true}>
            <span className="text-white">Everything you need to </span>
            <GradientText>get paid</GradientText>
          </SectionTitle>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-secondary rounded-xl p-6">
            <div className="text-white font-bold text-xl mb-3">Your content, your rules</div>
            <p className="text-gray-400">
              Full ownership of your content and customer relationships
            </p>
          </div>

          <div className="glass-secondary rounded-xl p-6">
            <div className="text-white font-bold text-xl mb-3">Instant payments</div>
            <p className="text-gray-400">
              Stripe Connect ensures fast, secure transactions worldwide
            </p>
          </div>

          <div className="glass-secondary rounded-xl p-6">
            <div className="text-white font-bold text-xl mb-3">Privacy first</div>
            <p className="text-gray-400">
              Keep your personal details private with professional payment pages
            </p>
          </div>

          <div className="glass-secondary rounded-xl p-6">
            <div className="text-white font-bold text-xl mb-3">Mobile optimized</div>
            <p className="text-gray-400">
              Beautiful, fast-loading profiles that work perfectly on any device
            </p>
          </div>
        </div>
      </Section>

      {/* How It Works Section */}
      <Section>
        <SectionTitle center={true}>
          <span className="text-white">Get started in </span>
          <GradientText>3 simple steps</GradientText>
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold text-xl mb-4">
              1
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Create your profile</h3>
            <p className="text-gray-400">
              Sign up and customize your payment page in minutes
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold text-xl mb-4">
              2
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Connect Stripe</h3>
            <p className="text-gray-400">
              Link your Stripe account for instant payment processing
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold text-xl mb-4">
              3
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Start earning</h3>
            <p className="text-gray-400">
              Share your link and start receiving tips and payments
            </p>
          </div>
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
            
            <PrimaryButton href="/signup">
              Get Started Now
            </PrimaryButton>
          </div>
        </GlassCard>
      </Section>
    </main>
  )
}
