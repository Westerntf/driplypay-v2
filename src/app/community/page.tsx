import { Metadata } from 'next'
import Link from 'next/link'
import { Users, MessageCircle, Heart, Star, Calendar, MapPin, ExternalLink, ArrowRight } from 'lucide-react'
import { 
  GradientText, 
  Section, 
  GlassCard, 
  PrimaryButton 
} from '@/components/design-system'

export const metadata: Metadata = {
  title: 'Community - DriplyPay',
  description: 'Join the DriplyPay creator community. Connect with fellow creators, share experiences, and grow together in the creator economy.',
  keywords: 'creator community, network, collaboration, creator economy, support',
}

// Mock community data - in a real app, this would come from an API
const communityStats = [
  { label: 'Active Creators', value: '12,000+', icon: Users },
  { label: 'Monthly Posts', value: '3,500+', icon: MessageCircle },
  { label: 'Success Stories', value: '850+', icon: Heart },
  { label: 'Community Rating', value: '4.9/5', icon: Star },
]

const upcomingEvents = [
  {
    id: '1',
    title: 'Creator Economy Trends 2024',
    type: 'Webinar',
    date: '2024-01-25',
    time: '2:00 PM EST',
    attendees: 156,
    description: 'Join industry experts as we explore the latest trends shaping the creator economy.',
    speaker: 'Sarah Chen, Creator Strategist',
  },
  {
    id: '2',
    title: 'Monthly Creator Meetup - Virtual',
    type: 'Meetup',
    date: '2024-01-30',
    time: '7:00 PM EST',
    attendees: 89,
    description: 'Network with fellow creators and share your latest projects and challenges.',
    speaker: 'Community-led discussion',
  },
  {
    id: '3',
    title: 'Monetization Masterclass',
    type: 'Workshop',
    date: '2024-02-05',
    time: '1:00 PM EST',
    attendees: 234,
    description: 'Learn proven strategies to increase your creator income and build sustainable revenue.',
    speaker: 'Marcus Rodriguez, Growth Expert',
  },
]

const featuredDiscussions = [
  {
    id: '1',
    title: 'How I grew from $100 to $10K/month in 6 months',
    author: 'Alex Kim',
    category: 'Success Stories',
    replies: 43,
    likes: 156,
    timeAgo: '2 hours ago',
    preview: 'Sharing my journey and the exact strategies that helped me scale my creator business...',
  },
  {
    id: '2',
    title: 'Best practices for setting up payment profiles',
    author: 'Jordan Taylor',
    category: 'Tips & Tricks',
    replies: 28,
    likes: 92,
    timeAgo: '5 hours ago',
    preview: 'After testing dozens of configurations, here are the setups that convert best...',
  },
  {
    id: '3',
    title: 'Privacy-first payments: Why it matters for creators',
    author: 'Riley Johnson',
    category: 'Privacy',
    replies: 67,
    likes: 203,
    timeAgo: '1 day ago',
    preview: 'Breaking down why privacy-focused payment platforms are becoming essential...',
  },
  {
    id: '4',
    title: 'Building audience without sacrificing authenticity',
    author: 'Sam Wilson',
    category: 'Growth',
    replies: 35,
    likes: 128,
    timeAgo: '2 days ago',
    preview: 'Lessons learned from growing to 50K followers while staying true to my values...',
  },
]

const communityChannels = [
  {
    name: 'General Discussion',
    description: 'Open discussions about the creator economy',
    members: 8924,
    icon: MessageCircle,
  },
  {
    name: 'Success Stories',
    description: 'Share your wins and celebrate others',
    members: 3456,
    icon: Heart,
  },
  {
    name: 'Tips & Tricks',
    description: 'Practical advice and best practices',
    members: 5678,
    icon: Star,
  },
  {
    name: 'Feature Requests',
    description: 'Suggest new features and improvements',
    members: 2134,
    icon: Users,
  },
]

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <Section className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              <span className="text-white">Join the </span>
              <GradientText>Creator</GradientText>
              <br />
              <span className="text-white">Community</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Connect with thousands of creators, share experiences, learn from each other, 
              and grow your creator business together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PrimaryButton className="px-8 py-3">
                Join Community
              </PrimaryButton>
              <button className="glass-secondary px-8 py-3 rounded-lg font-semibold text-white border border-gray-700 hover:border-gray-600 transition-all">
                Browse Discussions
              </button>
            </div>
          </div>

          {/* Community Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {communityStats.map((stat) => {
              const Icon = stat.icon
              return (
                <GlassCard key={stat.label} className="text-center p-6">
                  <Icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </GlassCard>
              )
            })}
          </div>
        </div>
      </Section>

      {/* Featured Discussions */}
      <Section className="pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Trending Discussions</h2>
            <p className="text-gray-400">See what the community is talking about</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredDiscussions.map((discussion) => (
              <GlassCard key={discussion.id} className="p-6 hover:border-gray-600 transition-colors cursor-pointer group">
                <div className="flex items-start justify-between mb-3">
                  <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs font-medium">
                    {discussion.category}
                  </span>
                  <span className="text-xs text-gray-500">{discussion.timeAgo}</span>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {discussion.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {discussion.preview}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{discussion.author}</span>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {discussion.replies}
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {discussion.likes}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </Section>

      {/* Community Channels */}
      <Section className="pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Community Channels</h2>
            <p className="text-gray-400">Find the perfect space for your interests</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {communityChannels.map((channel) => {
              const Icon = channel.icon
              return (
                <GlassCard key={channel.name} className="p-6 hover:border-gray-600 transition-colors cursor-pointer group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-purple-300 transition-colors">
                        {channel.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-3">
                        {channel.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {channel.members.toLocaleString()} members
                        </span>
                        <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                </GlassCard>
              )
            })}
          </div>
        </div>
      </Section>

      {/* Upcoming Events */}
      <Section className="pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Upcoming Events</h2>
            <p className="text-gray-400">Join us for workshops, meetups, and learning sessions</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <GlassCard key={event.id} className="p-6 group cursor-pointer hover:border-gray-600 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-xs font-medium">
                    {event.type}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Users className="w-3 h-3" />
                    {event.attendees}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
                  {event.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {event.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>Virtual Event</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{event.speaker}</span>
                  <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
                    Register
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </Section>

      {/* Community Guidelines CTA */}
      <Section className="pb-24">
        <div className="max-w-6xl mx-auto">
          <GlassCard className="text-center p-8 md:p-12">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready to <GradientText>Connect</GradientText>?
              </h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Join thousands of creators who are building their businesses together. 
                Our community is built on respect, collaboration, and mutual support.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <PrimaryButton className="px-8 py-3">
                  Join Community
                </PrimaryButton>
                <Link 
                  href="/help"
                  className="glass-secondary px-8 py-3 rounded-lg font-semibold text-white border border-gray-700 hover:border-gray-600 transition-all inline-flex items-center gap-2"
                >
                  View Guidelines
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
              
              <p className="text-xs text-gray-500 mt-6">
                By joining, you agree to our community guidelines and code of conduct.
              </p>
            </div>
          </GlassCard>
        </div>
      </Section>
    </div>
  )
}
