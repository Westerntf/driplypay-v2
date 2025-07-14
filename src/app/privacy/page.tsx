import { Metadata } from 'next';
import { Shield, Eye, Lock, UserCheck } from 'lucide-react';
import { 
  Section, 
  GlassCard, 
  GradientText,
  SectionTitle,
  Description,
  HeroSection
} from '@/components/design-system';

export const metadata: Metadata = {
  title: 'Privacy Policy - DriplyPay',
  description: 'Learn how DriplyPay protects your privacy and handles your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection hasGlow={true} glowColor="#10B981">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
          <GradientText>Privacy Policy</GradientText>
        </h1>
        <Description center>
          Your privacy is our priority. Learn how we protect and handle your personal information.
        </Description>
        <div className="mt-6 text-gray-400 text-sm">
          Last updated: January 15, 2024
        </div>
      </HeroSection>

      {/* Privacy Principles */}
      <Section className="bg-black/5">
        <SectionTitle center className="mb-12">
          <GradientText>Our Privacy Principles</GradientText>
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              icon: Shield,
              title: 'Data Protection',
              description: 'We use industry-standard encryption to protect your data'
            },
            {
              icon: Eye,
              title: 'Transparency',
              description: 'Clear, honest communication about how we use your data'
            },
            {
              icon: Lock,
              title: 'Minimal Collection',
              description: 'We only collect data necessary for our services'
            },
            {
              icon: UserCheck,
              title: 'Your Control',
              description: 'You decide what data to share and can delete it anytime'
            }
          ].map((principle, index) => (
            <GlassCard key={index} variant="secondary">
              <div className="text-center">
                <principle.icon className="h-8 w-8 text-blue-400 mx-auto mb-4" />
                <h3 className="font-semibold text-white mb-2">{principle.title}</h3>
                <p className="text-gray-300 text-sm">{principle.description}</p>
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
              <h2 className="text-2xl font-bold text-white mb-6">Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-white mb-4">Personal Information</h3>
              <p className="text-gray-300 mb-6">
                When you create an account with DriplyPay, we collect information such as your name, 
                email address, and profile information. This helps us provide personalized services 
                and maintain your account security.
              </p>

              <h3 className="text-xl font-semibold text-white mb-4">Payment Information</h3>
              <p className="text-gray-300 mb-6">
                To facilitate payments, we securely store your payment method details through our 
                trusted payment processors (Stripe, PayPal, etc.). We never store sensitive payment 
                information directly on our servers.
              </p>

              <h3 className="text-xl font-semibold text-white mb-4">Usage Data</h3>
              <p className="text-gray-300 mb-6">
                We collect information about how you use DriplyPay, including pages visited, 
                features used, and interaction patterns. This helps us improve our services 
                and user experience.
              </p>

              <h2 className="text-2xl font-bold text-white mb-6 mt-12">How We Use Your Information</h2>
              
              <ul className="text-gray-300 space-y-3 mb-8">
                <li>• Provide and maintain our payment platform services</li>
                <li>• Process transactions and manage your payment profile</li>
                <li>• Send important updates about your account and our services</li>
                <li>• Improve our platform based on user feedback and usage patterns</li>
                <li>• Provide customer support and respond to your inquiries</li>
                <li>• Comply with legal obligations and prevent fraud</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-6">Data Sharing and Disclosure</h2>
              
              <p className="text-gray-300 mb-6">
                We do not sell, trade, or rent your personal information to third parties. 
                We may share your information only in the following circumstances:
              </p>

              <ul className="text-gray-300 space-y-3 mb-8">
                <li>• With payment processors to facilitate transactions</li>
                <li>• With service providers who assist in operating our platform</li>
                <li>• When required by law or to protect our rights</li>
                <li>• In the event of a merger or acquisition (with prior notice)</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-6">Data Security</h2>
              
              <p className="text-gray-300 mb-6">
                We implement robust security measures to protect your personal information:
              </p>

              <ul className="text-gray-300 space-y-3 mb-8">
                <li>• End-to-end encryption for all sensitive data</li>
                <li>• Regular security audits and vulnerability assessments</li>
                <li>• Secure server infrastructure with 24/7 monitoring</li>
                <li>• Employee access controls and regular security training</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-6">Your Rights and Choices</h2>
              
              <p className="text-gray-300 mb-6">You have the following rights regarding your personal information:</p>

              <ul className="text-gray-300 space-y-3 mb-8">
                <li>• Access and review your personal data</li>
                <li>• Correct inaccurate or incomplete information</li>
                <li>• Delete your account and associated data</li>
                <li>• Export your data in a portable format</li>
                <li>• Opt out of non-essential communications</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-6">Cookies and Tracking</h2>
              
              <p className="text-gray-300 mb-6">
                We use cookies and similar technologies to enhance your experience on our platform. 
                You can control cookie settings through your browser preferences. For more details, 
                please see our <a href="/cookies" className="text-blue-400 hover:text-blue-300">Cookie Policy</a>.
              </p>

              <h2 className="text-2xl font-bold text-white mb-6">Updates to This Policy</h2>
              
              <p className="text-gray-300 mb-6">
                We may update this Privacy Policy from time to time. We will notify you of any 
                significant changes by email or through our platform. Your continued use of 
                DriplyPay after changes take effect constitutes acceptance of the updated policy.
              </p>

              <h2 className="text-2xl font-bold text-white mb-6">Contact Us</h2>
              
              <p className="text-gray-300 mb-4">
                If you have any questions about this Privacy Policy or our data practices, 
                please contact us:
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
