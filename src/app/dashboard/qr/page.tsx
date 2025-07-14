/**
 * 🚀 Developer Reference: /BLUEPRINT.md → QR Code Features
 * Page: QR code management and generation for profiles and payment methods
 * Features: QR generation, customization, download, tracking, analytics
 */
import { Metadata } from 'next';
import { QrCode, Download, Share2, Plus, Copy, Settings, ArrowLeft, Smartphone, Palette } from 'lucide-react';
import { 
  Section, 
  GlassCard, 
  PrimaryButton, 
  GradientText,
  SectionTitle,
  Description
} from '@/components/design-system';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'QR Codes - DriplyPay Dashboard',
  description: 'Create and manage QR codes for your payment profile to make it easy for supporters to find you.',
};

export default function QRCodesPage() {
  const qrCodes = [
    {
      id: 1,
      name: 'Main Profile QR',
      type: 'profile',
      scans: 1247,
      created: '2024-01-15',
      style: 'classic',
      color: '#3D4AFF'
    },
    {
      id: 2,
      name: 'Instagram Story QR',
      type: 'custom',
      scans: 832,
      created: '2024-01-20',
      style: 'rounded',
      color: '#10B981'
    },
    {
      id: 3,
      name: 'Business Card QR',
      type: 'minimal',
      scans: 456,
      created: '2024-01-25',
      style: 'minimal',
      color: '#8B5CF6'
    }
  ];

  const qrStyles = [
    { name: 'Classic', preview: '⬛', description: 'Traditional square design' },
    { name: 'Rounded', preview: '🔲', description: 'Smooth rounded corners' },
    { name: 'Minimal', preview: '◼️', description: 'Clean and simple' },
    { name: 'Branded', preview: '🎨', description: 'With your logo embedded' }
  ];

  const useCases = [
    {
      icon: Smartphone,
      title: 'Social Media',
      description: 'Perfect for Instagram stories, TikTok videos, and social posts',
      features: ['Optimized for mobile', 'High contrast', 'Story-friendly sizing']
    },
    {
      icon: QrCode,
      title: 'Print Materials',
      description: 'Business cards, flyers, merchandise, and physical displays',
      features: ['High resolution', 'Print-ready formats', 'Scalable vector options']
    },
    {
      icon: Share2,
      title: 'Live Events',
      description: 'Conferences, meetups, streaming overlays, and presentations',
      features: ['Large format support', 'Screen-optimized', 'Quick scan design']
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-black text-white pt-20 pb-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <Link 
            href="/dashboard"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                <GradientText>QR Codes</GradientText>
              </h1>
              <Description>
                Create custom QR codes that link directly to your payment profile. Perfect for social media, business cards, and events.
              </Description>
            </div>
            
            <PrimaryButton className="flex items-center gap-2 lg:w-auto">
              <Plus className="h-4 w-4" />
              Create QR Code
            </PrimaryButton>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <Section className="bg-black/5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Scans', value: '2,535', change: '+18.2%', color: 'text-blue-400' },
            { label: 'This Month', value: '432', change: '+25.1%', color: 'text-green-400' },
            { label: 'Active QR Codes', value: '3', change: '0', color: 'text-purple-400' },
            { label: 'Conversion Rate', value: '12.3%', change: '+2.1%', color: 'text-orange-400' }
          ].map((stat, index) => (
            <GlassCard key={index} variant="secondary">
              <div className="text-center">
                <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                  {stat.value}
                </div>
                <div className="text-white font-medium text-sm mb-1">
                  {stat.label}
                </div>
                <div className={`text-xs ${stat.change.startsWith('+') ? 'text-green-400' : stat.change === '0' ? 'text-gray-400' : 'text-red-400'}`}>
                  {stat.change !== '0' ? stat.change : 'No change'}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* QR Code Generator */}
      <Section>
        <SectionTitle className="mb-8">
          <GradientText>Quick QR Generator</GradientText>
        </SectionTitle>

        <GlassCard>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Customize Your QR Code</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-white font-medium mb-2">QR Code Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Instagram Story QR"
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Style</label>
                  <div className="grid grid-cols-2 gap-3">
                    {qrStyles.map((style, index) => (
                      <div key={index} className="p-3 border border-white/20 rounded-lg hover:bg-white/10 cursor-pointer transition-colors">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{style.preview}</span>
                          <span className="text-white font-medium">{style.name}</span>
                        </div>
                        <p className="text-gray-400 text-xs">{style.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Color</label>
                  <div className="flex gap-3">
                    {['#3D4AFF', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#000000'].map((color, index) => (
                      <button
                        key={index}
                        className="w-10 h-10 rounded-lg border-2 border-white/20 hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Size</label>
                  <select className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="small">Small (200x200)</option>
                    <option value="medium">Medium (400x400)</option>
                    <option value="large">Large (800x800)</option>
                    <option value="xl">Extra Large (1200x1200)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-6">Preview</h3>
              
              <div className="bg-white p-8 rounded-xl mb-6 inline-block">
                <div className="w-48 h-48 bg-gray-900 rounded-lg flex items-center justify-center">
                  <QrCode className="w-32 h-32 text-white" />
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                <PrimaryButton className="flex items-center justify-center gap-2">
                  <Download className="h-4 w-4" />
                  Generate & Download
                </PrimaryButton>
                <button className="px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white hover:bg-white/20 transition-colors">
                  Save to Library
                </button>
              </div>
            </div>
          </div>
        </GlassCard>
      </Section>

      {/* Existing QR Codes */}
      <Section className="bg-black/5">
        <SectionTitle className="mb-8">
          <GradientText>Your QR Codes</GradientText>
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {qrCodes.map((qr) => (
            <GlassCard key={qr.id}>
              <div className="text-center mb-4">
                <div className="bg-white p-4 rounded-lg mb-4 inline-block">
                  <div className="w-24 h-24 bg-gray-900 rounded flex items-center justify-center">
                    <QrCode className="w-16 h-16 text-white" />
                  </div>
                </div>
                
                <h3 className="font-semibold text-white mb-1">{qr.name}</h3>
                <p className="text-gray-400 text-sm capitalize">{qr.type} style</p>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total Scans:</span>
                  <span className="text-white font-medium">{qr.scans.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Created:</span>
                  <span className="text-white">{new Date(qr.created).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 bg-blue-500/20 border border-blue-500/30 rounded-md text-blue-400 hover:bg-blue-500/30 transition-colors flex items-center justify-center gap-1">
                  <Download className="h-3 w-3" />
                  Download
                </button>
                <button className="flex-1 px-3 py-2 bg-green-500/20 border border-green-500/30 rounded-md text-green-400 hover:bg-green-500/30 transition-colors flex items-center justify-center gap-1">
                  <Share2 className="h-3 w-3" />
                  Share
                </button>
                <button className="px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white hover:bg-white/20 transition-colors">
                  <Settings className="h-3 w-3" />
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* Use Cases */}
      <Section>
        <SectionTitle center className="mb-12">
          <GradientText>Perfect for Every Situation</GradientText>
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <GlassCard key={index} variant="secondary">
              <div className="text-center mb-4">
                <useCase.icon className="h-10 w-10 text-blue-400 mx-auto mb-3" />
                <h3 className="font-semibold text-white mb-2">{useCase.title}</h3>
                <p className="text-gray-300 text-sm">{useCase.description}</p>
              </div>
              
              <ul className="space-y-2">
                {useCase.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2 text-gray-300 text-sm">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* Tips & Best Practices */}
      <Section className="bg-black/5">
        <div className="text-center">
          <SectionTitle center className="mb-6">
            <GradientText>QR Code Best Practices</GradientText>
          </SectionTitle>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="text-left">
              <h4 className="font-semibold text-white mb-3">📱 For Social Media</h4>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>• Use high contrast colors for better scanning</li>
                <li>• Make sure QR code is at least 200x200 pixels</li>
                <li>• Test on different devices before posting</li>
                <li>• Add a clear call-to-action near the QR code</li>
              </ul>
            </div>
            
            <div className="text-left">
              <h4 className="font-semibold text-white mb-3">🖨️ For Print</h4>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>• Use vector formats for crisp printing</li>
                <li>• Ensure minimum 1 inch size for easy scanning</li>
                <li>• Leave white space around the QR code</li>
                <li>• Test print quality before mass production</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
