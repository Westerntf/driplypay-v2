import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight, TrendingUp, Users, Shield, DollarSign } from 'lucide-react'
import { 
  GradientText, 
  Section, 
  GlassCard, 
  PrimaryButton 
} from '@/components/design-system'

export const metadata: Metadata = {
  title: 'Blog - DriplyPay',
  description: 'Insights, tips, and stories from the creator economy. Learn how to grow your audience, increase your income, and build a sustainable creator business.',
  keywords: 'creator economy, payment platform, tips, insights, monetization, creator business',
}

// Mock blog posts data - in a real app, this would come from a CMS or API
const featuredPosts = [
  {
    id: '1',
    title: 'The Future of Creator Payments: Why Privacy Matters',
    excerpt: 'Exploring how privacy-first payment platforms are reshaping the creator economy and giving creators more control over their income.',
    category: 'Privacy',
    author: 'Sarah Chen',
    date: '2024-01-15',
    readTime: '8 min read',
    image: '/api/placeholder/600/400',
    slug: 'future-of-creator-payments-privacy',
    featured: true,
  },
  {
    id: '2',
    title: 'Building Sustainable Income as a Content Creator',
    excerpt: 'Learn proven strategies to diversify your revenue streams and build a more stable, predictable income from your creative work.',
    category: 'Monetization',
    author: 'Marcus Rodriguez',
    date: '2024-01-12',
    readTime: '12 min read',
    image: '/api/placeholder/600/400',
    slug: 'building-sustainable-creator-income',
    featured: true,
  },
]

const recentPosts = [
  {
    id: '3',
    title: 'QR Codes for Creators: Bridging Physical and Digital Payments',
    excerpt: 'How QR codes are revolutionizing in-person creator interactions and making it easier than ever to accept payments anywhere.',
    category: 'Technology',
    author: 'Alex Kim',
    date: '2024-01-10',
    readTime: '6 min read',
    image: '/api/placeholder/400/300',
    slug: 'qr-codes-for-creators',
  },
  {
    id: '4',
    title: 'Understanding Creator Analytics: What Metrics Actually Matter',
    excerpt: 'Cut through the noise and focus on the analytics that will actually help you grow your creator business and increase your earnings.',
    category: 'Analytics',
    author: 'Jordan Taylor',
    date: '2024-01-08',
    readTime: '10 min read',
    image: '/api/placeholder/400/300',
    slug: 'creator-analytics-metrics-that-matter',
  },
  {
    id: '5',
    title: 'Setting Up Your First Payment Profile: A Step-by-Step Guide',
    excerpt: 'Everything you need to know to create a professional payment profile that converts visitors into supporters.',
    category: 'Getting Started',
    author: 'Riley Johnson',
    date: '2024-01-05',
    readTime: '7 min read',
    image: '/api/placeholder/400/300',
    slug: 'setting-up-payment-profile-guide',
  },
  {
    id: '6',
    title: 'The Psychology of Creator Support: Why People Pay',
    excerpt: 'Understanding the motivations behind creator support can help you build stronger relationships with your audience.',
    category: 'Psychology',
    author: 'Dr. Emma Wilson',
    date: '2024-01-03',
    readTime: '9 min read',
    image: '/api/placeholder/400/300',
    slug: 'psychology-of-creator-support',
  },
]

const categories = [
  { name: 'All Posts', count: 24, icon: TrendingUp },
  { name: 'Getting Started', count: 8, icon: Users },
  { name: 'Monetization', count: 6, icon: DollarSign },
  { name: 'Privacy', count: 4, icon: Shield },
  { name: 'Technology', count: 3, icon: TrendingUp },
  { name: 'Analytics', count: 3, icon: TrendingUp },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <Section className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              <GradientText>Creator Economy</GradientText>
              <br />
              <span className="text-white">Insights & Stories</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover the latest trends, proven strategies, and insider tips to grow your creator business 
              and build sustainable income from your passion.
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.name}
                  className="glass-secondary px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white border border-gray-700 hover:border-gray-600 transition-all flex items-center gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                  <span className="bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full text-xs">
                    {category.count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </Section>

      {/* Featured Posts */}
      <Section className="pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Featured Articles</h2>
            <p className="text-gray-400">Our most popular and insightful content</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <GlassCard key={post.id} className="group cursor-pointer overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg mb-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <span>{post.author}</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </Section>

      {/* Recent Posts */}
      <Section className="pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Recent Posts</h2>
            <p className="text-gray-400">Stay up to date with the latest insights</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <GlassCard key={post.id} className="group cursor-pointer overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{post.author}</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </Section>

      {/* Newsletter CTA */}
      <Section className="pb-24">
        <div className="max-w-6xl mx-auto">
          <GlassCard className="text-center p-8 md:p-12">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-3xl font-bold text-white mb-4">
                Stay in the <GradientText>Loop</GradientText>
              </h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Get the latest creator economy insights, platform updates, and exclusive tips 
                delivered straight to your inbox every week.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <PrimaryButton className="px-6 py-3 whitespace-nowrap">
                  Subscribe
                </PrimaryButton>
              </div>
              
              <p className="text-xs text-gray-500 mt-4">
                No spam, unsubscribe at any time. We respect your privacy.
              </p>
            </div>
          </GlassCard>
        </div>
      </Section>
    </div>
  )
}
