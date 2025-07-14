import { Metadata } from 'next';
import { FileText, Shield, AlertTriangle, Users } from 'lucide-react';
import { 
  Section, 
  GlassCard, 
  GradientText,
  SectionTitle,
  Description,
  HeroSection
} from '@/components/design-system';

export const metadata: Metadata = {
  title: 'Terms of Service - DriplyPay',
  description: 'Read the terms and conditions for using DriplyPay platform and services.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection hasGlow={true} glowColor="#3D4AFF">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
          <GradientText>Terms of Service</GradientText>
        </h1>
        <Description center>
          The terms and conditions governing your use of the DriplyPay platform and services.
        </Description>
        <div className="mt-6 text-gray-400 text-sm">
          Last updated: January 15, 2024
        </div>
      </HeroSection>

      {/* Key Points */}
      <Section className="bg-black/5">
        <SectionTitle center className="mb-12">
          <GradientText>Key Points</GradientText>
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              icon: FileText,
              title: 'Agreement',
              description: 'By using DriplyPay, you agree to these terms and conditions'
            },
            {
              icon: Shield,
              title: 'Responsible Use',
              description: 'Use our platform legally and respect other users'
            },
            {
              icon: AlertTriangle,
              title: 'Compliance',
              description: 'Follow all applicable laws and payment regulations'
            },
            {
              icon: Users,
              title: 'Community',
              description: 'Help us maintain a safe environment for all creators'
            }
          ].map((point, index) => (
            <GlassCard key={index} variant="secondary">
              <div className="text-center">
                <point.icon className="h-8 w-8 text-blue-400 mx-auto mb-4" />
                <h3 className="font-semibold text-white mb-2">{point.title}</h3>
                <p className="text-gray-300 text-sm">{point.description}</p>
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
              <h2 className="text-2xl font-bold text-white mb-6">1. Acceptance of Terms</h2>
              
              <p className="text-gray-300 mb-6">
                By accessing or using DriplyPay (&quot;the Service&quot;), you agree to be bound by these 
                Terms of Service (&quot;Terms&quot;). If you disagree with any part of these terms, 
                you may not access the Service.
              </p>

              <h2 className="text-2xl font-bold text-white mb-6">2. Description of Service</h2>
              
              <p className="text-gray-300 mb-6">
                DriplyPay is a payment profile platform that allows creators to accept payments 
                through a unified, mobile-first interface. Our services include:
              </p>

              <ul className="text-gray-300 space-y-3 mb-8">
                <li>• Payment profile creation and customization</li>
                <li>• Integration with multiple payment providers</li>
                <li>• QR code generation for easy payment sharing</li>
                <li>• Analytics and reporting tools</li>
                <li>• Privacy and security features</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-6">3. User Accounts</h2>
              
              <h3 className="text-xl font-semibold text-white mb-4">Account Creation</h3>
              <p className="text-gray-300 mb-6">
                To use DriplyPay, you must create an account with accurate, complete, and 
                up-to-date information. You are responsible for safeguarding your account 
                credentials and all activities under your account.
              </p>

              <h3 className="text-xl font-semibold text-white mb-4">Account Responsibilities</h3>
              <ul className="text-gray-300 space-y-3 mb-8">
                <li>• Maintain the security of your login credentials</li>
                <li>• Notify us immediately of any unauthorized access</li>
                <li>• Ensure all information provided is accurate and current</li>
                <li>• Comply with all applicable laws and regulations</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-6">4. Acceptable Use</h2>
              
              <p className="text-gray-300 mb-6">You agree not to use DriplyPay for any of the following:</p>

              <ul className="text-gray-300 space-y-3 mb-8">
                <li>• Illegal activities or content that violates any laws</li>
                <li>• Fraudulent transactions or money laundering</li>
                <li>• Adult content, gambling, or restricted industries</li>
                <li>• Harassment, spam, or malicious activities</li>
                <li>• Violating the rights of others or third-party services</li>
                <li>• Attempting to compromise the security of our platform</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-6">5. Payment Processing</h2>
              
              <h3 className="text-xl font-semibold text-white mb-4">Third-Party Processors</h3>
              <p className="text-gray-300 mb-6">
                DriplyPay integrates with third-party payment processors (Stripe, PayPal, etc.). 
                Your use of these services is subject to their respective terms and conditions.
              </p>

              <h3 className="text-xl font-semibold text-white mb-4">Fees and Charges</h3>
              <p className="text-gray-300 mb-6">
                DriplyPay&apos;s core features are free to use. Payment processors may charge 
                their standard transaction fees. Any premium features will be clearly disclosed 
                with pricing before purchase.
              </p>

              <h2 className="text-2xl font-bold text-white mb-6">6. Privacy and Data</h2>
              
              <p className="text-gray-300 mb-6">
                Your privacy is important to us. Please review our 
                <a href="/privacy" className="text-blue-400 hover:text-blue-300"> Privacy Policy</a> 
                to understand how we collect, use, and protect your information.
              </p>

              <h2 className="text-2xl font-bold text-white mb-6">7. Intellectual Property</h2>
              
              <h3 className="text-xl font-semibold text-white mb-4">Our Content</h3>
              <p className="text-gray-300 mb-6">
                The DriplyPay platform, including its software, design, and content, is owned by 
                DriplyPay and protected by intellectual property laws.
              </p>

              <h3 className="text-xl font-semibold text-white mb-4">Your Content</h3>
              <p className="text-gray-300 mb-6">
                You retain ownership of any content you upload to DriplyPay. By using our service, 
                you grant us a limited license to use, store, and display your content as necessary 
                to provide our services.
              </p>

              <h2 className="text-2xl font-bold text-white mb-6">8. Termination</h2>
              
              <p className="text-gray-300 mb-6">
                Either party may terminate this agreement at any time. DriplyPay reserves the 
                right to suspend or terminate accounts that violate these terms or for any 
                reason with reasonable notice.
              </p>

              <h2 className="text-2xl font-bold text-white mb-6">9. Disclaimers and Limitations</h2>
              
              <h3 className="text-xl font-semibold text-white mb-4">Service Availability</h3>
              <p className="text-gray-300 mb-6">
                While we strive for 100% uptime, DriplyPay is provided &quot;as is&quot; without 
                warranties of any kind. We do not guarantee uninterrupted or error-free service.
              </p>

              <h3 className="text-xl font-semibold text-white mb-4">Limitation of Liability</h3>
              <p className="text-gray-300 mb-6">
                DriplyPay shall not be liable for any indirect, incidental, special, or 
                consequential damages arising from your use of the service.
              </p>

              <h2 className="text-2xl font-bold text-white mb-6">10. Changes to Terms</h2>
              
              <p className="text-gray-300 mb-6">
                We may update these Terms of Service from time to time. We will notify users 
                of significant changes by email or through the platform. Continued use of 
                DriplyPay after changes take effect constitutes acceptance of the new terms.
              </p>

              <h2 className="text-2xl font-bold text-white mb-6">11. Governing Law</h2>
              
              <p className="text-gray-300 mb-6">
                These Terms are governed by the laws of the State of California, United States. 
                Any disputes will be resolved in the courts of San Francisco County, California.
              </p>

              <h2 className="text-2xl font-bold text-white mb-6">12. Contact Information</h2>
              
              <p className="text-gray-300 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>

              <ul className="text-gray-300 space-y-2">
                <li>Email: legal@driplypay.com</li>
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
