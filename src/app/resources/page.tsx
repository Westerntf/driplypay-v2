import { Metadata } from 'next';
import { BookOpen, Video, FileText, Download, ExternalLink, Users, Lightbulb, TrendingUp } from 'lucide-react';
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
  title: 'Creator Resources - DriplyPay',
  description: 'Free resources, guides, and tools to help creators grow their audience and monetize their content.',
};

export default function ResourcesPage() {
  const resourceCategories = [
    {
      icon: BookOpen,
      title: 'Getting Started Guides',
      description: 'Step-by-step guides for new creators',
      resources: [
        'Setting up your first payment profile',
        'Choosing the right payment methods',
        'Optimizing your profile for conversions',
        'Building trust with your audience'
      ]
    },
    {
      icon: TrendingUp,
      title: 'Growth & Marketing',
      description: 'Strategies to grow your audience and income',
      resources: [
        'Social media marketing for creators',
        'Building a loyal community',
        'Content monetization strategies',
        'Cross-platform promotion tactics'
      ]
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Watch and learn with our video content',
      resources: [
        'Platform walkthrough videos',
        'Best practices for creators',
        'Success story interviews',
        'Feature deep-dive tutorials'
      ]
    },
    {
      icon: FileText,
      title: 'Templates & Tools',
      description: 'Ready-to-use resources for your content',
      resources: [
        'Social media post templates',
        'Email newsletter templates',
        'QR code design templates',
        'Analytics tracking sheets'
      ]
    }
  ];

  const featuredGuides = [
    {
      title: 'The Complete Creator Monetization Guide',
      description: 'Learn the fundamentals of turning your passion into sustainable income with proven strategies and real-world examples.',
      category: 'Monetization',
      readTime: '15 min read',
      featured: true
    },
    {
      title: 'Building Your Creator Brand',
      description: 'Develop a strong personal brand that resonates with your audience and attracts more supporters.',
      category: 'Branding',
      readTime: '10 min read',
      featured: true
    },
    {
      title: 'Mastering Social Media for Creators',
      description: 'Platform-specific strategies for growing your following and driving traffic to your payment profile.',
      category: 'Marketing',
      readTime: '12 min read',
      featured: true
    }
  ];

  const tools = [
    {
      icon: Download,
      title: 'QR Code Generator',
      description: 'Create custom QR codes for your payment profile',
      type: 'Web Tool'
    },
    {
      icon: FileText,
      title: 'Revenue Calculator',
      description: 'Estimate your potential earnings with different strategies',
      type: 'Calculator'
    },
    {
      icon: Users,
      title: 'Community Forum',
      description: 'Connect with other creators and share experiences',
      type: 'Community'
    },
    {
      icon: Video,
      title: 'Creator Masterclass',
      description: 'Free video course on creator monetization',
      type: 'Course'
    }
  ];

  const downloadableResources = [
    {
      title: 'Creator Starter Kit',
      description: 'Everything you need to launch your creator journey',
      format: 'PDF Package',
      size: '2.5 MB'
    },
    {
      title: 'Social Media Templates',
      description: 'Ready-to-use templates for all major platforms',
      format: 'Design Files',
      size: '15 MB'
    },
    {
      title: 'Analytics Tracking Sheet',
      description: 'Spreadsheet template for tracking your growth',
      format: 'Excel/Google Sheets',
      size: '150 KB'
    },
    {
      title: 'Creator Tax Guide',
      description: 'Tax considerations for content creators',
      format: 'PDF Guide',
      size: '800 KB'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection hasGlow={true} glowColor="#F59E0B">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
          <GradientText>Creator Resources</GradientText>
        </h1>
        <Description center>
          Free guides, tools, and resources to help you grow your audience and maximize your creator income.
        </Description>
      </HeroSection>

      {/* Resource Categories */}
      <Section className="bg-black/5">
        <SectionTitle center className="mb-12">
          <GradientText>Browse by Category</GradientText>
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resourceCategories.map((category, index) => (
            <GlassCard key={index}>
              <div className="text-center mb-6">
                <category.icon className="h-10 w-10 text-orange-400 mx-auto mb-4" />
                <h3 className="font-semibold text-white mb-2">{category.title}</h3>
                <p className="text-gray-300 text-sm">{category.description}</p>
              </div>
              
              <ul className="space-y-2">
                {category.resources.map((resource, resourceIndex) => (
                  <li key={resourceIndex} className="flex items-start gap-2 text-gray-300 text-sm">
                    <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="hover:text-white cursor-pointer transition-colors">{resource}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* Featured Guides */}
      <Section>
        <SectionTitle center className="mb-12">
          <GradientText>Featured Guides</GradientText>
        </SectionTitle>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featuredGuides.map((guide, index) => (
            <GlassCard key={index}>
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded-full">
                    {guide.category}
                  </span>
                  <span className="text-gray-400 text-xs">{guide.readTime}</span>
                </div>
                <h3 className="font-semibold text-white mb-2">{guide.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{guide.description}</p>
              </div>
              
              <button className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                <BookOpen className="h-4 w-4" />
                Read Guide
              </button>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* Tools & Calculators */}
      <Section className="bg-black/5">
        <SectionTitle center className="mb-12">
          <GradientText>Creator Tools</GradientText>
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <GlassCard key={index} variant="secondary">
              <div className="text-center">
                <tool.icon className="h-8 w-8 text-blue-400 mx-auto mb-4" />
                <h3 className="font-semibold text-white mb-2">{tool.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{tool.description}</p>
                <div className="text-xs text-gray-400 mb-4">{tool.type}</div>
                <button className="w-full px-3 py-2 bg-blue-500/20 border border-blue-500/30 rounded-md text-blue-400 hover:bg-blue-500/30 transition-colors text-sm">
                  Access Tool
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* Downloadable Resources */}
      <Section>
        <SectionTitle center className="mb-12">
          <GradientText>Downloadable Resources</GradientText>
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {downloadableResources.map((resource, index) => (
            <GlassCard key={index}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-2">{resource.title}</h3>
                  <p className="text-gray-300 text-sm mb-3">{resource.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span>{resource.format}</span>
                    <span>{resource.size}</span>
                  </div>
                </div>
                <button className="ml-4 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-md text-green-400 hover:bg-green-500/30 transition-colors flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* Learning Path */}
      <Section className="bg-black/5">
        <SectionTitle center className="mb-12">
          <GradientText>Creator Learning Path</GradientText>
        </SectionTitle>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Learning path line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-green-500"></div>
            
            <div className="space-y-8">
              {[
                {
                  step: 1,
                  title: 'Foundation',
                  description: 'Learn the basics of creator monetization',
                  duration: '1-2 weeks',
                  color: 'text-purple-400'
                },
                {
                  step: 2,
                  title: 'Setup & Optimization',
                  description: 'Create and optimize your payment profile',
                  duration: '1 week',
                  color: 'text-blue-400'
                },
                {
                  step: 3,
                  title: 'Growth Strategies',
                  description: 'Implement audience growth and engagement tactics',
                  duration: '2-4 weeks',
                  color: 'text-cyan-400'
                },
                {
                  step: 4,
                  title: 'Scale & Optimize',
                  description: 'Advanced strategies for scaling your income',
                  duration: 'Ongoing',
                  color: 'text-green-400'
                }
              ].map((phase, index) => (
                <div key={index} className="relative flex items-start gap-6">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-green-500 flex items-center justify-center text-white font-bold text-lg z-10`}>
                    {phase.step}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold mb-2 ${phase.color}`}>{phase.title}</h3>
                    <p className="text-gray-300 text-sm mb-2">{phase.description}</p>
                    <span className="text-gray-400 text-xs">{phase.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section>
        <div className="text-center">
          <SectionTitle center className="mb-6">
            <GradientText>Ready to Level Up Your Creator Game?</GradientText>
          </SectionTitle>
          <Description center className="mb-8">
            Join our creator community and get access to exclusive resources and support
          </Description>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PrimaryButton className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Join Creator Community
            </PrimaryButton>
            <button className="px-6 py-3 text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              Browse All Resources
            </button>
          </div>
        </div>
      </Section>
    </div>
  );
}
