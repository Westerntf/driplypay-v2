import { 
  Section, 
  GlassCard, 
  PrimaryButton, 
  GradientText,
  SectionTitle,
  Description 
} from '@/components/design-system'
import { Heart, Shield, Users, Zap } from 'lucide-react'

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Creator First',
      description: 'Every decision we make is with creators in mind. Your success is our success.'
    },
    {
      icon: Shield,
      title: 'Privacy Focused',
      description: 'Your privacy and safety are non-negotiable. We build with security at the core.'
    },
    {
      icon: Users,
      title: 'No Judgment',
      description: 'We support all creators regardless of content type. Your work is valid and valuable.'
    },
    {
      icon: Zap,
      title: 'Always Improving',
      description: 'We listen to our community and continuously evolve based on your feedback.'
    }
  ]

  const stats = [
    { number: '10,000+', label: 'Creators Served' },
    { number: '$2M+', label: 'Creator Earnings' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Support' }
  ]

  return (
    <div className="min-h-screen bg-black text-white driplypay-font-primary">
      {/* Hero Section */}
      <Section className="text-center">
        <SectionTitle center={true}>
          <span className="text-white">Built by creators, </span>
          <GradientText>for creators</GradientText>
        </SectionTitle>
        
        <Description center={true}>
          DriplyPay was founded by creators who were tired of platforms that controlled their income, 
          censored their content, and took their hard-earned money.
        </Description>
      </Section>

      {/* Story Section */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <GlassCard variant="primary">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-6">
                <GradientText>Our Story</GradientText>
              </h2>
            </div>
            
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                In 2024, we watched too many creators lose their livelihoods overnight due to arbitrary 
                platform changes, payment processor discrimination, and content policies that didn&apos;t 
                understand the creator economy.
              </p>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                We knew there had to be a better way. A platform that put creators first. That respected 
                privacy. That didn&apos;t take a cut of hard-earned money. That understood the unique needs 
                of adult content creators and sex workers.
              </p>
              
              <p className="text-gray-300 text-lg leading-relaxed">
                So we built DriplyPay - a payment platform designed from the ground up for creators who 
                want to own their income, their audience, and their future.
              </p>
            </div>
          </GlassCard>
        </div>
      </Section>

      {/* Values Section */}
      <Section className="bg-gray-900">
        <div className="text-center mb-12">
          <SectionTitle center={true}>
            <span className="text-white">Our </span>
            <GradientText>Values</GradientText>
          </SectionTitle>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {values.map((value) => {
            const Icon = value.icon
            return (
              <div key={value.title} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2 text-xl">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </Section>

      {/* Stats Section */}
      <Section>
        <div className="text-center mb-12">
          <SectionTitle center={true}>
            <GradientText>Growing Together</GradientText>
          </SectionTitle>
          <Description center={true}>
            We&apos;re proud to support thousands of creators worldwide
          </Description>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-black mb-2">
                <GradientText>{stat.number}</GradientText>
              </div>
              <div className="text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Mission Section */}
      <Section>
        <GlassCard variant="primary">
          <div className="text-center">
            <SectionTitle center={true}>
              <span className="text-white">Our </span>
              <GradientText>Mission</GradientText>
            </SectionTitle>
            
            <Description center={true}>
              To empower creators with the financial freedom and independence they deserve, 
              without judgment, censorship, or exploitation.
            </Description>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="font-bold text-white mb-2">Creator Ownership</h3>
                <p className="text-gray-400">You own your audience, your content, and your income</p>
              </div>
              
              <div className="text-center">
                <div className="text-6xl mb-4">🛡️</div>
                <h3 className="font-bold text-white mb-2">Privacy & Safety</h3>
                <p className="text-gray-400">Built-in privacy controls and security features</p>
              </div>
              
              <div className="text-center">
                <div className="text-6xl mb-4">💰</div>
                <h3 className="font-bold text-white mb-2">Fair Economics</h3>
                <p className="text-gray-400">No platform fees, no revenue sharing, ever</p>
              </div>
            </div>
          </div>
        </GlassCard>
      </Section>

      {/* Team Section */}
      <Section className="bg-gray-900">
        <div className="text-center mb-12">
          <SectionTitle center={true}>
            <span className="text-white">Meet the </span>
            <GradientText>Team</GradientText>
          </SectionTitle>
          <Description center={true}>
            A small but passionate team dedicated to creator empowerment
          </Description>
        </div>

        <div className="text-center">
          <div className="glass-secondary rounded-xl p-8 max-w-2xl mx-auto">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="font-bold text-white mb-4">Built by Creators</h3>
            <p className="text-gray-400 mb-6">
              Our team consists of former creators, developers, and advocates who understand 
              the unique challenges of the creator economy. We&apos;re building the platform 
              we wish we&apos;d had when we were starting out.
            </p>
            <p className="text-gray-500 text-sm">
              Want to join our mission? We&apos;re always looking for passionate people who 
              believe in creator empowerment.
            </p>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section>
        <GlassCard variant="primary">
          <div className="text-center">
            <SectionTitle center={true}>
              <span className="text-white">Ready to join </span>
              <GradientText>thousands of creators?</GradientText>
            </SectionTitle>
            
            <Description center={true}>
              Take control of your income and build the creator business you deserve.
            </Description>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <PrimaryButton href="/signup">
                Get Started Free
              </PrimaryButton>
              <a 
                href="/contact" 
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
              >
                Have Questions? →
              </a>
            </div>
          </div>
        </GlassCard>
      </Section>
    </div>
  )
}
