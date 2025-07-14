import { Metadata } from 'next';
import { Shield, Lock, Eye, Key, Server, Users } from 'lucide-react';
import { 
  Section, 
  GlassCard, 
  GradientText,
  SectionTitle,
  Description,
  HeroSection
} from '@/components/design-system';

export const metadata: Metadata = {
  title: 'Security - DriplyPay',
  description: 'Learn about DriplyPay\'s security measures and how we protect your data and transactions.',
};

export default function SecurityPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection hasGlow={true} glowColor="#DC2626">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
          <GradientText>Security</GradientText>
        </h1>
        <Description center>
          Your security is our top priority. Learn about the measures we take to protect your data and transactions.
        </Description>
      </HeroSection>

      {/* Security Features */}
      <Section className="bg-black/5">
        <SectionTitle center className="mb-12">
          <GradientText>Security Features</GradientText>
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: Shield,
              title: 'End-to-End Encryption',
              description: 'All data is encrypted in transit and at rest using industry-standard protocols'
            },
            {
              icon: Lock,
              title: 'Secure Authentication',
              description: 'Multi-factor authentication and secure login processes protect your account'
            },
            {
              icon: Eye,
              title: 'Privacy Controls',
              description: 'Granular privacy settings give you complete control over your data'
            },
            {
              icon: Key,
              title: 'API Security',
              description: 'Secure API endpoints with rate limiting and authentication'
            },
            {
              icon: Server,
              title: 'Infrastructure Security',
              description: 'SOC 2 compliant hosting with 24/7 monitoring and threat detection'
            },
            {
              icon: Users,
              title: 'Access Controls',
              description: 'Role-based permissions and least-privilege access principles'
            }
          ].map((feature, index) => (
            <GlassCard key={index}>
              <div className="text-center">
                <feature.icon className="h-10 w-10 text-red-400 mx-auto mb-4" />
                <h3 className="font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.description}</p>
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
              <h2 className="text-2xl font-bold text-white mb-6">Data Protection</h2>
              
              <h3 className="text-xl font-semibold text-white mb-4">Encryption Standards</h3>
              <p className="text-gray-300 mb-6">
                We use AES-256 encryption for data at rest and TLS 1.3 for data in transit. 
                All payment information is tokenized and never stored directly on our servers.
              </p>

              <h3 className="text-xl font-semibold text-white mb-4">Data Minimization</h3>
              <p className="text-gray-300 mb-6">
                We only collect and store the minimum amount of data necessary to provide our 
                services. Personal data is automatically purged according to our retention policies.
              </p>

              <h2 className="text-2xl font-bold text-white mb-6">Authentication & Access</h2>
              
              <h3 className="text-xl font-semibold text-white mb-4">Multi-Factor Authentication</h3>
              <p className="text-gray-300 mb-6">
                We strongly recommend enabling two-factor authentication (2FA) for your account. 
                We support authenticator apps, SMS, and hardware security keys.
              </p>

              <h3 className="text-xl font-semibold text-white mb-4">Session Management</h3>
              <p className="text-gray-300 mb-6">
                Sessions are securely managed with automatic timeout, secure session tokens, 
                and protection against session hijacking attacks.
              </p>

              <h2 className="text-2xl font-bold text-white mb-6">Infrastructure Security</h2>
              
              <h3 className="text-xl font-semibold text-white mb-4">Cloud Security</h3>
              <p className="text-gray-300 mb-6">
                Our infrastructure is hosted on enterprise-grade cloud platforms with:
              </p>
              <ul className="text-gray-300 space-y-2 mb-6">
                <li>• SOC 2 Type II compliance</li>
                <li>• ISO 27001 certification</li>
                <li>• PCI DSS Level 1 compliance</li>
                <li>• GDPR compliance</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-4">Network Security</h3>
              <p className="text-gray-300 mb-6">
                We implement multiple layers of network security including:
              </p>
              <ul className="text-gray-300 space-y-2 mb-6">
                <li>• Web Application Firewall (WAF)</li>
                <li>• DDoS protection</li>
                <li>• Intrusion detection systems</li>
                <li>• Network segmentation</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-6">Payment Security</h2>
              
              <h3 className="text-xl font-semibold text-white mb-4">PCI Compliance</h3>
              <p className="text-gray-300 mb-6">
                We are PCI DSS compliant and work only with PCI-compliant payment processors. 
                Credit card data is never stored on our servers and is handled securely by 
                our payment partners.
              </p>

              <h3 className="text-xl font-semibold text-white mb-4">Fraud Prevention</h3>
              <p className="text-gray-300 mb-6">
                Advanced fraud detection systems monitor transactions in real-time to identify 
                and prevent suspicious activities.
              </p>

              <h2 className="text-2xl font-bold text-white mb-6">Monitoring & Response</h2>
              
              <h3 className="text-xl font-semibold text-white mb-4">24/7 Monitoring</h3>
              <p className="text-gray-300 mb-6">
                Our security team monitors our systems around the clock using automated tools 
                and manual processes to detect and respond to threats.
              </p>

              <h3 className="text-xl font-semibold text-white mb-4">Incident Response</h3>
              <p className="text-gray-300 mb-6">
                We have a comprehensive incident response plan that includes:
              </p>
              <ul className="text-gray-300 space-y-2 mb-6">
                <li>• Immediate threat containment</li>
                <li>• Forensic analysis and investigation</li>
                <li>• User notification procedures</li>
                <li>• System recovery and restoration</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-6">Employee Security</h2>
              
              <h3 className="text-xl font-semibold text-white mb-4">Security Training</h3>
              <p className="text-gray-300 mb-6">
                All employees undergo comprehensive security training and regular updates on 
                the latest security threats and best practices.
              </p>

              <h3 className="text-xl font-semibold text-white mb-4">Access Controls</h3>
              <p className="text-gray-300 mb-6">
                Employee access to systems and data is granted on a need-to-know basis with 
                regular access reviews and immediate revocation upon role changes.
              </p>

              <h2 className="text-2xl font-bold text-white mb-6">Security Audits</h2>
              
              <h3 className="text-xl font-semibold text-white mb-4">Regular Audits</h3>
              <p className="text-gray-300 mb-6">
                We conduct regular security audits and penetration testing by third-party 
                security firms to identify and address potential vulnerabilities.
              </p>

              <h3 className="text-xl font-semibold text-white mb-4">Vulnerability Management</h3>
              <p className="text-gray-300 mb-6">
                Our vulnerability management program includes automated scanning, manual testing, 
                and rapid patching of identified security issues.
              </p>

              <h2 className="text-2xl font-bold text-white mb-6">Your Role in Security</h2>
              
              <h3 className="text-xl font-semibold text-white mb-4">Best Practices</h3>
              <p className="text-gray-300 mb-6">
                Help us keep your account secure by following these best practices:
              </p>
              <ul className="text-gray-300 space-y-2 mb-6">
                <li>• Use a strong, unique password for your DriplyPay account</li>
                <li>• Enable two-factor authentication</li>
                <li>• Keep your contact information up to date</li>
                <li>• Log out of shared devices</li>
                <li>• Report suspicious activities immediately</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-6">Security Certifications</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-800/50 rounded-lg p-6">
                  <h4 className="font-semibold text-white mb-3">Industry Standards</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• SOC 2 Type II Certified</li>
                    <li>• ISO 27001 Compliant</li>
                    <li>• PCI DSS Level 1</li>
                    <li>• GDPR Compliant</li>
                  </ul>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-6">
                  <h4 className="font-semibold text-white mb-3">Security Frameworks</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• NIST Cybersecurity Framework</li>
                    <li>• OWASP Security Standards</li>
                    <li>• CIS Critical Security Controls</li>
                    <li>• SANS Security Guidelines</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-6">Report Security Issues</h2>
              
              <p className="text-gray-300 mb-6">
                If you discover a security vulnerability, please report it responsibly by 
                contacting our security team. We have a bug bounty program for qualifying 
                security issues.
              </p>

              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 mb-8">
                <h4 className="text-lg font-semibold text-white mb-3">Security Contact</h4>
                <ul className="text-gray-300 space-y-2">
                  <li>Email: security@driplypay.com</li>
                  <li>PGP Key: Available on request</li>
                  <li>Response Time: Within 24 hours</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-white mb-6">Transparency</h2>
              
              <p className="text-gray-300 mb-4">
                We believe in transparency and will promptly disclose any security incidents 
                that may affect our users. Our incident disclosure policy includes:
              </p>
              <ul className="text-gray-300 space-y-2">
                <li>• Immediate notification of critical incidents</li>
                <li>• Regular updates during incident resolution</li>
                <li>• Post-incident reports with lessons learned</li>
                <li>• Annual security transparency reports</li>
              </ul>
            </div>
          </GlassCard>
        </div>
      </Section>
    </div>
  );
}
