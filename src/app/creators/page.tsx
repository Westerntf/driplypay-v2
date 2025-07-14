import { Metadata } from 'next';
import { Star, Zap, Users, TrendingUp, Shield, Heart, ArrowRight, DollarSign } from 'lucide-react';
import { 
  Section, 
  GlassCard, 
  PrimaryButton,
  GradientText,
  SectionTitle,
  Description,
  HeroSection
} from '@/components/design-system';

export const metadata: Metadata = {
  title: 'For Creators - DriplyPay',
  description: 'Discover how DriplyPay empowers creators to monetize their content and build sustainable income streams.',
};

export default function CreatorsPage() {
  const benefits = [
    {
      icon: Zap,
      title: 'Instant Setup',
      description: 'Get your payment profile live in under 5 minutes with our streamlined onboarding process.'
    },
    {
      icon: DollarSign,
      title: 'Multiple Revenue Streams',
      description: 'Accept tips, one-time payments, and recurring subscriptions all in one place.'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your financial information stays private with our advanced privacy controls.'
    },
    {
      icon: TrendingUp,
      title: 'Analytics & Insights',
      description: 'Track your earnings, understand your audience, and optimize your monetization strategy.'
    },
    {
      icon: Users,
      title: 'Build Community',
      description: 'Connect with supporters and build lasting relationships with your audience.'
    },
    {
      icon: Heart,
      title: 'Creator Support',
      description: 'Dedicated support team that understands the unique needs of content creators.'
    }
  ];

  const creatorTypes = [
    {
      title: 'Content Creators',
      description: 'YouTubers, streamers, and video creators',
      features: ['Tip jars for live streams', 'Video monetization', 'Subscriber perks']
    },
    {
      title: 'Artists & Designers',
      description: 'Digital artists, illustrators, and graphic designers',
      features: ['Commission payments', 'Art sales', 'Portfolio monetization']
    },
    {
      title: 'Musicians',
      description: 'Independent musicians and audio creators',
      features: ['Music tips', 'Concert funding', 'Album pre-orders']
    },
    {
      title: 'Writers & Bloggers',
      description: 'Authors, journalists, and content writers',
      features: ['Article tips', 'Newsletter subscriptions', 'Book sales']
    },
    {
      title: 'Educators',
      description: 'Online teachers and course creators',
      features: ['Course payments', 'Tutoring fees', 'Educational content']
    },
    {
      title: 'Podcasters',
      description: 'Audio content creators and show hosts',
      features: ['Listener support', 'Episode sponsorships', 'Premium content']
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Digital Artist',
      avatar: '🎨',
      quote: 'DriplyPay has simplified my entire payment process. I can focus on creating art instead of managing multiple payment platforms.'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'YouTuber',
      avatar: '📹',
      quote: 'The analytics dashboard helps me understand my audience better and optimize my content strategy.'
    },
    {
      name: 'Emma Thompson',
      role: 'Musician',
      avatar: '🎵',
      quote: 'My fans love how easy it is to support me. The mobile-first design makes tipping seamless during live streams.'
    }
  ];

  const stats = [
    { value: '50K+', label: 'Active Creators' },
    { value: '$2.5M+', label: 'Creator Earnings' },
    { value: '150+', label: 'Countries Supported' },
    { value: '99.8%', label: 'Uptime Guarantee' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection hasGlow={true} glowColor="#10B981">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
          <GradientText>Built for Creators</GradientText>
        </h1>
        <Description center>
          Turn your passion into sustainable income with the payment platform designed specifically for content creators.
        </Description>
        
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <PrimaryButton className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Start Creating Today
          </PrimaryButton>
          <button className="px-6 py-3 text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors">
            See Success Stories
          </button>
        </div>
      </HeroSection>

      {/* Stats Section */}
      <Section className="bg-black/5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                <GradientText>{stat.value}</GradientText>
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Benefits Section */}
      <Section>
        <SectionTitle center className="mb-12">
          <GradientText>Why Creators Choose DriplyPay</GradientText>
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <GlassCard key={index}>
              <div className="text-center">
                <benefit.icon className="h-10 w-10 text-green-400 mx-auto mb-4" />
                <h3 className="font-semibold text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-300 text-sm">{benefit.description}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* Creator Types */}
      <Section className="bg-black/5">
        <SectionTitle center className="mb-12">
          <GradientText>Perfect for Every Creator</GradientText>
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {creatorTypes.map((type, index) => (
            <GlassCard key={index} variant="secondary">
              <h3 className="font-semibold text-white mb-2">{type.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{type.description}</p>
              <ul className="space-y-2">
                {type.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2 text-gray-300 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section>
        <SectionTitle center className="mb-12">
          <GradientText>Creator Success Stories</GradientText>
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <GlassCard key={index} variant="secondary">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl">{testimonial.avatar}</div>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-gray-400 text-sm">{testimonial.role}</div>
                </div>
              </div>
              <p className="text-gray-300 text-sm italic">&quot;{testimonial.quote}&quot;</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* How It Works */}
      <Section className="bg-black/5">
        <SectionTitle center className="mb-12">
          <GradientText>How It Works</GradientText>
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: '01',
              title: 'Sign Up & Customize',
              description: 'Create your account and customize your payment profile with your branding and preferences.'
            },
            {
              step: '02',
              title: 'Add Payment Methods',
              description: 'Connect your preferred payment platforms like Stripe, PayPal, Venmo, and more.'
            },
            {
              step: '03',
              title: 'Share & Earn',
              description: 'Share your unique DriplyPay link and start receiving payments from your supporters.'
            }
          ].map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg mx-auto mb-6">
                {step.step}
              </div>
              <h3 className="font-semibold text-white mb-3">{step.title}</h3>
              <p className="text-gray-300 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Features Deep Dive */}
      <Section>
        <SectionTitle center className="mb-12">
          <GradientText>Powerful Features for Creators</GradientText>
        </SectionTitle>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <GlassCard>
            <h3 className="text-xl font-bold text-white mb-4">Advanced Analytics</h3>
            <p className="text-gray-300 mb-4">
              Get deep insights into your earnings, supporter behavior, and content performance 
              with our comprehensive analytics dashboard.
            </p>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• Revenue tracking and forecasting</li>
              <li>• Supporter demographics and insights</li>
              <li>• Payment method performance</li>
              <li>• Geographic distribution analysis</li>
            </ul>
          </GlassCard>

          <GlassCard>
            <h3 className="text-xl font-bold text-white mb-4">Customization Options</h3>
            <p className="text-gray-300 mb-4">
              Make your payment profile uniquely yours with extensive customization options 
              that match your brand and style.
            </p>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• Custom themes and color schemes</li>
              <li>• Branded QR codes with logos</li>
              <li>• Personalized thank you messages</li>
              <li>• Custom domain support</li>
            </ul>
          </GlassCard>

          <GlassCard>
            <h3 className="text-xl font-bold text-white mb-4">Mobile-First Experience</h3>
            <p className="text-gray-300 mb-4">
              Designed for the mobile generation with a seamless experience across all devices 
              and platforms where your audience engages.
            </p>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• Responsive design for all screen sizes</li>
              <li>• Fast loading times</li>
              <li>• One-tap payment processing</li>
              <li>• Social media integration</li>
            </ul>
          </GlassCard>

          <GlassCard>
            <h3 className="text-xl font-bold text-white mb-4">Creator Support</h3>
            <p className="text-gray-300 mb-4">
              Get the help you need with our dedicated creator support team that understands 
              the unique challenges of content creation.
            </p>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• 24/7 creator support chat</li>
              <li>• Onboarding assistance</li>
              <li>• Growth strategy consultations</li>
              <li>• Creator community access</li>
            </ul>
          </GlassCard>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-black/5">
        <div className="text-center">
          <SectionTitle center className="mb-6">
            <GradientText>Ready to Start Your Creator Journey?</GradientText>
          </SectionTitle>
          <Description center className="mb-8">
            Join thousands of creators who are already monetizing their passion with DriplyPay
          </Description>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PrimaryButton className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Get Started Free
            </PrimaryButton>
            <button className="px-6 py-3 text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2">
              <ArrowRight className="h-4 w-4" />
              View Creator Resources
            </button>
          </div>
        </div>
      </Section>
    </div>
  );
}
