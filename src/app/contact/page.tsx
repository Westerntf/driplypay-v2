import { Metadata } from 'next';
import { Mail, MessageSquare, Phone, Clock, MapPin, Send } from 'lucide-react';
import { 
  Section, 
  GlassCard, 
  PrimaryButton, 
  GradientText,
  SectionTitle,
  Description,
  HeroSection
} from '@/components/design-system';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';

export const metadata: Metadata = {
  title: 'Contact Us - DriplyPay',
  description: 'Get in touch with the DriplyPay team. We\'re here to help with any questions or support you need.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection hasGlow={true} glowColor="#3D4AFF">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
          <GradientText>Get in Touch</GradientText>
        </h1>
        <Description center>
          We&apos;re here to help! Reach out to our team for support, feedback, or any questions about DriplyPay.
        </Description>
      </HeroSection>

      {/* Contact Form & Info Section */}
      <Section className="bg-black/5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Methods */}
          <div className="lg:col-span-1 space-y-6">
            <GlassCard>
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="h-6 w-6 text-blue-400" />
                <SectionTitle className="mb-0">Get in Touch</SectionTitle>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <Mail className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="font-semibold text-white">Email</p>
                    <p className="text-sm text-gray-300">support@driplypay.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <Phone className="h-5 w-5 text-green-400" />
                  <div>
                    <p className="font-semibold text-white">Phone</p>
                    <p className="text-sm text-gray-300">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <Clock className="h-5 w-5 text-purple-400" />
                  <div>
                    <p className="font-semibold text-white">Support Hours</p>
                    <p className="text-sm text-gray-300">Mon-Fri 9AM-6PM PST</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                  <MapPin className="h-5 w-5 text-orange-400" />
                  <div>
                    <p className="font-semibold text-white">Location</p>
                    <p className="text-sm text-gray-300">San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <SectionTitle className="mb-4">Quick Links</SectionTitle>
              <div className="space-y-3">
                <a href="/help" className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-2 text-white hover:text-blue-400">
                    <MessageSquare className="h-4 w-4" />
                    <span>Help Center</span>
                  </div>
                </a>
                <a href="/status" className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-2 text-white hover:text-blue-400">
                    <Clock className="h-4 w-4" />
                    <span>System Status</span>
                  </div>
                </a>
                <a href="/features" className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-2 text-white hover:text-blue-400">
                    <Phone className="h-4 w-4" />
                    <span>Feature Requests</span>
                  </div>
                </a>
              </div>
            </GlassCard>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <GlassCard>
              <SectionTitle className="mb-6">Send us a Message</SectionTitle>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-white">First Name</Label>
                    <Input 
                      id="firstName"
                      placeholder="Your first name"
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-white">Last Name</Label>
                    <Input 
                      id="lastName"
                      placeholder="Your last name"
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email Address</Label>
                  <Input 
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-white">Subject</Label>
                  <select 
                    id="subject"
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" className="bg-black text-white">Select a topic</option>
                    <option value="support" className="bg-black text-white">General Support</option>
                    <option value="billing" className="bg-black text-white">Billing Question</option>
                    <option value="feature" className="bg-black text-white">Feature Request</option>
                    <option value="bug" className="bg-black text-white">Bug Report</option>
                    <option value="partnership" className="bg-black text-white">Partnership Inquiry</option>
                    <option value="other" className="bg-black text-white">Other</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white">Message</Label>
                  <Textarea 
                    id="message"
                    placeholder="Tell us how we can help you..."
                    rows={6}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <PrimaryButton className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Send Message
                  </PrimaryButton>
                  <button 
                    type="button"
                    className="px-6 py-3 text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    Clear Form
                  </button>
                </div>
              </form>
            </GlassCard>
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section>
        <div className="text-center mb-12">
          <SectionTitle center>
            <GradientText>Frequently Asked Questions</GradientText>
          </SectionTitle>
          <Description center>
            Quick answers to common questions about DriplyPay
          </Description>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              question: "How do I set up my payment profile?",
              answer: "Simply sign up, customize your profile, and add your preferred payment methods. Your unique link will be ready to share instantly."
            },
            {
              question: "What payment methods are supported?",
              answer: "We support Stripe, PayPal, Venmo, CashApp, Zelle, and many other popular payment platforms."
            },
            {
              question: "Are there any fees?",
              answer: "DriplyPay is free to use. Payment processors may charge their standard fees, which vary by platform."
            },
            {
              question: "How do I update my payment information?",
              answer: "Log into your dashboard and navigate to the Payment Methods section to add, edit, or remove payment options."
            }
          ].map((faq, index) => (
            <GlassCard key={index} variant="secondary">
              <h3 className="font-semibold text-white mb-3">{faq.question}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{faq.answer}</p>
            </GlassCard>
          ))}
        </div>
      </Section>
    </div>
  );
}
