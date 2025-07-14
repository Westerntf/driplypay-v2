import { Metadata } from 'next';
import { Cookie, Settings, Eye, ToggleLeft } from 'lucide-react';
import { 
  Section, 
  GlassCard, 
  GradientText,
  SectionTitle,
  Description,
  HeroSection
} from '@/components/design-system';

export const metadata: Metadata = {
  title: 'Cookie Policy - DriplyPay',
  description: 'Learn about how DriplyPay uses cookies and similar technologies to improve your experience.',
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection hasGlow={true} glowColor="#F59E0B">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
          <GradientText>Cookie Policy</GradientText>
        </h1>
        <Description center>
          Learn how we use cookies and similar technologies to enhance your DriplyPay experience.
        </Description>
        <div className="mt-6 text-gray-400 text-sm">
          Last updated: January 15, 2024
        </div>
      </HeroSection>

      {/* Cookie Types */}
      <Section className="bg-black/5">
        <SectionTitle center className="mb-12">
          <GradientText>Types of Cookies We Use</GradientText>
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              icon: Cookie,
              title: 'Essential',
              description: 'Required for basic functionality and security',
              color: 'text-green-400'
            },
            {
              icon: Settings,
              title: 'Functional',
              description: 'Remember your preferences and settings',
              color: 'text-blue-400'
            },
            {
              icon: Eye,
              title: 'Analytics',
              description: 'Help us understand how you use our platform',
              color: 'text-purple-400'
            },
            {
              icon: ToggleLeft,
              title: 'Marketing',
              description: 'Show you relevant content and advertisements',
              color: 'text-orange-400'
            }
          ].map((type, index) => (
            <GlassCard key={index} variant="secondary">
              <div className="text-center">
                <type.icon className={`h-8 w-8 ${type.color} mx-auto mb-4`} />
                <h3 className="font-semibold text-white mb-2">{type.title}</h3>
                <p className="text-gray-300 text-sm">{type.description}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* Main Content */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <GlassCard>
            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-white mb-6">What Are Cookies?</h2>
              
              <p className="text-gray-300 mb-6">
                Cookies are small text files that are stored on your device when you visit a website. 
                They help websites remember information about your visit, which can make your next 
                visit easier and the site more useful to you.
              </p>

              <h2 className="text-2xl font-bold text-white mb-6">How We Use Cookies</h2>
              
              <h3 className="text-xl font-semibold text-white mb-4">Essential Cookies</h3>
              <p className="text-gray-300 mb-4">
                These cookies are necessary for the website to function properly. They include:
              </p>
              <ul className="text-gray-300 space-y-2 mb-6">
                <li>• Authentication cookies to keep you logged in</li>
                <li>• Security cookies to protect against fraud</li>
                <li>• Session cookies to maintain your current session</li>
                <li>• Load balancing cookies to distribute traffic</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-4">Functional Cookies</h3>
              <p className="text-gray-300 mb-4">
                These cookies enhance your experience by remembering your choices:
              </p>
              <ul className="text-gray-300 space-y-2 mb-6">
                <li>• Theme preferences (dark/light mode)</li>
                <li>• Language and region settings</li>
                <li>• Dashboard layout preferences</li>
                <li>• Notification settings</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-4">Analytics Cookies</h3>
              <p className="text-gray-300 mb-4">
                We use these cookies to understand how visitors interact with our website:
              </p>
              <ul className="text-gray-300 space-y-2 mb-6">
                <li>• Page views and time spent on pages</li>
                <li>• Click patterns and user journeys</li>
                <li>• Device and browser information</li>
                <li>• Performance metrics and error tracking</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-4">Marketing Cookies</h3>
              <p className="text-gray-300 mb-4">
                These cookies help us show you relevant content:
              </p>
              <ul className="text-gray-300 space-y-2 mb-6">
                <li>• Personalized content recommendations</li>
                <li>• Social media integration</li>
                <li>• Advertising effectiveness measurement</li>
                <li>• Cross-device user identification</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-6">Third-Party Cookies</h2>
              
              <p className="text-gray-300 mb-6">
                We may use third-party services that set their own cookies. These include:
              </p>

              <div className="bg-gray-800/50 rounded-lg p-6 mb-8">
                <h4 className="text-lg font-semibold text-white mb-4">Third-Party Services</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="font-medium text-white mb-2">Analytics</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Google Analytics</li>
                      <li>• Mixpanel</li>
                      <li>• Hotjar</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-2">Support</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Intercom</li>
                      <li>• Zendesk</li>
                      <li>• LogRocket</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-2">Payment</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Stripe</li>
                      <li>• PayPal</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-2">Security</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Cloudflare</li>
                      <li>• reCAPTCHA</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-6">Managing Your Cookie Preferences</h2>
              
              <h3 className="text-xl font-semibold text-white mb-4">Browser Settings</h3>
              <p className="text-gray-300 mb-6">
                You can control cookies through your browser settings. Most browsers allow you to:
              </p>
              <ul className="text-gray-300 space-y-2 mb-6">
                <li>• View and delete existing cookies</li>
                <li>• Block all cookies or cookies from specific websites</li>
                <li>• Set preferences for first-party and third-party cookies</li>
                <li>• Receive notifications when cookies are set</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-4">DriplyPay Cookie Preferences</h3>
              <p className="text-gray-300 mb-6">
                You can manage your cookie preferences directly in your DriplyPay account settings. 
                Note that disabling certain cookies may affect the functionality of our platform.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6 mb-8">
                <h4 className="text-lg font-semibold text-white mb-3">Cookie Preference Center</h4>
                <p className="text-gray-300 text-sm mb-4">
                  Manage your cookie preferences for a personalized experience.
                </p>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:opacity-90 transition-opacity">
                  Manage Preferences
                </button>
              </div>

              <h2 className="text-2xl font-bold text-white mb-6">Cookie Retention</h2>
              
              <p className="text-gray-300 mb-6">
                Different types of cookies are stored for different periods:
              </p>

              <div className="overflow-x-auto mb-8">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-white font-semibold">Cookie Type</th>
                      <th className="text-left py-3 px-4 text-white font-semibold">Duration</th>
                      <th className="text-left py-3 px-4 text-white font-semibold">Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-800">
                      <td className="py-3 px-4">Session Cookies</td>
                      <td className="py-3 px-4">Until browser closes</td>
                      <td className="py-3 px-4">Maintain your session</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 px-4">Authentication</td>
                      <td className="py-3 px-4">30 days</td>
                      <td className="py-3 px-4">Keep you logged in</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 px-4">Preferences</td>
                      <td className="py-3 px-4">1 year</td>
                      <td className="py-3 px-4">Remember your settings</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">Analytics</td>
                      <td className="py-3 px-4">2 years</td>
                      <td className="py-3 px-4">Understand usage patterns</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-2xl font-bold text-white mb-6">Updates to This Policy</h2>
              
              <p className="text-gray-300 mb-6">
                We may update this Cookie Policy from time to time to reflect changes in our 
                practices or applicable laws. We will notify you of any significant changes 
                by posting the updated policy on our website.
              </p>

              <h2 className="text-2xl font-bold text-white mb-6">Contact Us</h2>
              
              <p className="text-gray-300 mb-4">
                If you have any questions about our use of cookies, please contact us:
              </p>

              <ul className="text-gray-300 space-y-2">
                <li>Email: privacy@driplypay.com</li>
                <li>Address: 123 Creator Street, San Francisco, CA 94102</li>
                <li>Phone: +1 (555) 123-4567</li>
              </ul>
            </div>
          </GlassCard>
        </div>
      </Section>
    </div>
  );
}
