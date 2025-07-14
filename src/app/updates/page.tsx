import { Metadata } from 'next';
import { Bell, Zap, Users, Shield, Sparkles, ArrowRight } from 'lucide-react';
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
  title: 'Updates - DriplyPay',
  description: 'Stay up to date with the latest features, improvements, and news from DriplyPay.',
};

export default function UpdatesPage() {
  const updates = [
    {
      date: '2024-01-15',
      version: 'v2.1.0',
      type: 'Feature Release',
      title: 'Enhanced QR Code Customization',
      description: 'New customization options for QR codes including custom colors, logos, and frames.',
      features: [
        'Custom QR code colors and styling',
        'Logo embedding in QR codes',
        'Multiple frame styles',
        'Batch QR code generation'
      ],
      status: 'live'
    },
    {
      date: '2024-01-08',
      version: 'v2.0.5',
      type: 'Security Update',
      title: 'Advanced Security Enhancements',
      description: 'Multiple security improvements and enhanced fraud detection capabilities.',
      features: [
        'Enhanced two-factor authentication',
        'Improved fraud detection algorithms',
        'Session security improvements',
        'Enhanced audit logging'
      ],
      status: 'live'
    },
    {
      date: '2024-01-01',
      version: 'v2.0.0',
      type: 'Major Release',
      title: 'DriplyPay 2.0 - Complete Platform Redesign',
      description: 'A complete redesign of the DriplyPay platform with improved performance and new features.',
      features: [
        'Brand new user interface',
        'Improved mobile experience',
        'Advanced analytics dashboard',
        'Multi-currency support',
        'Enhanced privacy controls'
      ],
      status: 'live'
    },
    {
      date: '2024-01-22',
      version: 'v2.2.0',
      type: 'Coming Soon',
      title: 'Creator Monetization Tools',
      description: 'New tools to help creators monetize their content and engage with their audience.',
      features: [
        'Subscription management',
        'Tip goals and milestones',
        'Creator analytics insights',
        'Audience engagement tools'
      ],
      status: 'upcoming'
    }
  ];

  const roadmap = [
    {
      quarter: 'Q1 2024',
      title: 'Mobile App Launch',
      description: 'Native iOS and Android apps for creators and supporters',
      status: 'in-progress'
    },
    {
      quarter: 'Q2 2024',
      title: 'Cryptocurrency Support',
      description: 'Accept Bitcoin, Ethereum, and other popular cryptocurrencies',
      status: 'planned'
    },
    {
      quarter: 'Q3 2024',
      title: 'Creator Marketplace',
      description: 'A marketplace for creators to sell digital products and services',
      status: 'planned'
    },
    {
      quarter: 'Q4 2024',
      title: 'Enterprise Solutions',
      description: 'Advanced features for organizations and large-scale creators',
      status: 'planned'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection hasGlow={true} glowColor="#8B5CF6">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
          <GradientText>Platform Updates</GradientText>
        </h1>
        <Description center>
          Stay informed about the latest features, improvements, and exciting developments in DriplyPay.
        </Description>
        
        <div className="mt-8">
          <PrimaryButton className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Subscribe to Updates
          </PrimaryButton>
        </div>
      </HeroSection>

      {/* Recent Updates */}
      <Section className="bg-black/5">
        <SectionTitle center className="mb-12">
          <GradientText>Recent Updates</GradientText>
        </SectionTitle>

        <div className="space-y-8">
          {updates.map((update, index) => (
            <GlassCard key={index}>
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      update.status === 'live' ? 'bg-green-500/20 text-green-400' :
                      update.status === 'upcoming' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-purple-500/20 text-purple-400'
                    }`}>
                      {update.status === 'live' ? 'Live' : 
                       update.status === 'upcoming' ? 'Coming Soon' : 'In Progress'}
                    </div>
                    <span className="text-gray-400 text-sm">{update.date}</span>
                    <span className="text-gray-400 text-sm">{update.version}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{update.title}</h3>
                  <p className="text-gray-300 mb-4">{update.description}</p>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-white text-sm">Key Features:</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      {update.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="lg:w-32 flex justify-center">
                  {update.type === 'Feature Release' && <Sparkles className="h-8 w-8 text-yellow-400" />}
                  {update.type === 'Security Update' && <Shield className="h-8 w-8 text-green-400" />}
                  {update.type === 'Major Release' && <Zap className="h-8 w-8 text-purple-400" />}
                  {update.type === 'Coming Soon' && <Bell className="h-8 w-8 text-blue-400" />}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* Roadmap */}
      <Section>
        <SectionTitle center className="mb-12">
          <GradientText>Roadmap</GradientText>
        </SectionTitle>
        <Description center className="mb-12">
          Get a preview of what&apos;s coming next in our development roadmap
        </Description>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roadmap.map((item, index) => (
            <GlassCard key={index} variant="secondary">
              <div className="text-center">
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${
                  item.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {item.quarter}
                </div>
                <h3 className="font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{item.description}</p>
                <div className={`text-xs font-medium ${
                  item.status === 'in-progress' ? 'text-yellow-400' : 'text-blue-400'
                }`}>
                  {item.status === 'in-progress' ? 'In Progress' : 'Planned'}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* Newsletter Signup */}
      <Section className="bg-black/5">
        <div className="text-center">
          <SectionTitle center className="mb-6">
            <GradientText>Stay Updated</GradientText>
          </SectionTitle>
          <Description center className="mb-8">
            Get notified about new features, security updates, and platform improvements
          </Description>
          
          <GlassCard variant="secondary" className="max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                <Bell className="h-4 w-4" />
                Subscribe
              </button>
            </div>
            <p className="text-gray-400 text-xs mt-3">
              We&apos;ll only send you important updates. No spam, ever.
            </p>
          </GlassCard>
        </div>
      </Section>

      {/* Feature Requests */}
      <Section>
        <div className="text-center">
          <SectionTitle center className="mb-6">
            <GradientText>Have a Feature Request?</GradientText>
          </SectionTitle>
          <Description center className="mb-8">
            We&apos;d love to hear your ideas for improving DriplyPay
          </Description>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PrimaryButton className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Submit Feature Request
            </PrimaryButton>
            <button className="px-6 py-3 text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2">
              <ArrowRight className="h-4 w-4" />
              View Community Requests
            </button>
          </div>
        </div>
      </Section>
    </div>
  );
}
