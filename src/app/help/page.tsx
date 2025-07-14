import { 
  Section, 
  GlassCard, 
  PrimaryButton, 
  GradientText,
  SectionTitle,
  Description 
} from '@/components/design-system'
import { Search, MessageCircle, Book, Users, ArrowRight } from 'lucide-react'

export default function HelpCenterPage() {
  const categories = [
    {
      icon: Book,
      title: 'Getting Started',
      description: 'Learn the basics of setting up your DriplyPay profile',
      articles: [
        'Creating your first payment profile',
        'Adding payment methods',
        'Customizing your profile theme',
        'Setting up privacy controls'
      ]
    },
    {
      icon: MessageCircle,
      title: 'Payments & Tips',
      description: 'Everything about receiving and managing payments',
      articles: [
        'How payments work',
        'Supported payment methods',
        'Understanding fees',
        'Payment troubleshooting'
      ]
    },
    {
      icon: Users,
      title: 'Account Management',
      description: 'Managing your account settings and preferences',
      articles: [
        'Updating your profile',
        'Privacy and security settings',
        'Changing your username',
        'Deleting your account'
      ]
    }
  ]

  const popularArticles = [
    'How to add CashApp to your profile',
    'Setting up Stripe Connect',
    'Creating QR codes for tips',
    'Understanding analytics',
    'Troubleshooting payment issues',
    'Privacy settings explained'
  ]

  return (
    <div className="min-h-screen bg-black text-white driplypay-font-primary pt-16">
      {/* Hero Section */}
      <Section className="text-center">
        <SectionTitle center={true}>
          <GradientText>Help Center</GradientText>
        </SectionTitle>
        
        <Description center={true}>
          Find answers to your questions and get the most out of DriplyPay
        </Description>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mt-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for help articles..."
              className="w-full pl-12 pr-4 py-4 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
            />
          </div>
        </div>
      </Section>

      {/* Categories */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <GlassCard key={category.title} variant="secondary">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-white text-xl mb-2">{category.title}</h3>
                  <p className="text-gray-400">{category.description}</p>
                </div>
                
                <ul className="space-y-3">
                  {category.articles.map((article) => (
                    <li key={article} className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors cursor-pointer">
                      <ArrowRight className="w-4 h-4 text-blue-400" />
                      <span className="text-sm">{article}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            )
          })}
        </div>
      </Section>

      {/* Popular Articles */}
      <Section className="bg-gray-900">
        <SectionTitle center={true}>
          <span className="text-white">Popular </span>
          <GradientText>Articles</GradientText>
        </SectionTitle>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {popularArticles.map((article) => (
              <div key={article} className="glass-secondary rounded-lg p-4 hover:bg-gray-800 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <span className="text-white">{article}</span>
                  <ArrowRight className="w-4 h-4 text-blue-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Contact CTA */}
      <Section>
        <GlassCard variant="primary">
          <div className="text-center">
            <SectionTitle center={true}>
              <span className="text-white">Still need </span>
              <GradientText>help?</GradientText>
            </SectionTitle>
            
            <Description center={true}>
              Can&apos;t find what you&apos;re looking for? Our support team is here to help.
            </Description>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <PrimaryButton href="/contact">
                Contact Support
              </PrimaryButton>
              <a 
                href="mailto:help@driplypay.com" 
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
              >
                Email us directly →
              </a>
            </div>
          </div>
        </GlassCard>
      </Section>
    </div>
  )
}
