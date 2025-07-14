import { Metadata } from 'next';
import { Settings, Bell, Shield, Palette, Globe, Trash2, ArrowLeft, Key, Mail, Smartphone } from 'lucide-react';
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
  title: 'Settings - DriplyPay Dashboard',
  description: 'Manage your account settings, notifications, security, and preferences.',
};

export default function SettingsPage() {
  const settingsCategories = [
    {
      icon: Settings,
      title: 'General',
      description: 'Basic account and profile settings',
      active: true
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Email and push notification preferences',
      active: false
    },
    {
      icon: Shield,
      title: 'Security',
      description: 'Password, 2FA, and security settings',
      active: false
    },
    {
      icon: Palette,
      title: 'Appearance',
      description: 'Themes, customization, and branding',
      active: false
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
          
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              <GradientText>Settings</GradientText>
            </h1>
            <Description>
              Manage your account preferences, security settings, and customize your DriplyPay experience.
            </Description>
          </div>
        </div>
      </div>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <div className="space-y-2">
              {settingsCategories.map((category, index) => (
                <button
                  key={index}
                  className={`w-full p-4 rounded-lg text-left transition-colors ${
                    category.active 
                      ? 'bg-blue-500/20 border border-blue-500/30 text-blue-400' 
                      : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <category.icon className="h-5 w-5" />
                    <span className="font-medium">{category.title}</span>
                  </div>
                  <p className="text-xs opacity-80">{category.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Account Information */}
            <GlassCard>
              <SectionTitle className="mb-6">
                <GradientText>Account Information</GradientText>
              </SectionTitle>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    defaultValue="Alex Creator"
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    defaultValue="alex@example.com"
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-medium mb-2">Time Zone</label>
                  <select className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="pst">Pacific Standard Time (PST)</option>
                    <option value="est">Eastern Standard Time (EST)</option>
                    <option value="cst">Central Standard Time (CST)</option>
                    <option value="mst">Mountain Standard Time (MST)</option>
                  </select>
                </div>
              </div>
            </GlassCard>

            {/* Notification Settings */}
            <GlassCard>
              <SectionTitle className="mb-6">
                <GradientText>Notification Preferences</GradientText>
              </SectionTitle>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Email Notifications</h3>
                  <div className="space-y-4">
                    {[
                      { title: 'New Tips Received', description: 'Get notified when someone sends you a tip', defaultChecked: true },
                      { title: 'Weekly Summary', description: 'Weekly overview of your earnings and activity', defaultChecked: true },
                      { title: 'Security Alerts', description: 'Important security and account notifications', defaultChecked: true },
                      { title: 'Product Updates', description: 'New features and platform updates', defaultChecked: false },
                      { title: 'Marketing Emails', description: 'Tips, best practices, and promotional content', defaultChecked: false }
                    ].map((notification, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div>
                          <div className="font-medium text-white">{notification.title}</div>
                          <div className="text-sm text-gray-400">{notification.description}</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            defaultChecked={notification.defaultChecked}
                            className="sr-only peer" 
                          />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Push Notifications</h3>
                  <div className="space-y-4">
                    {[
                      { title: 'Real-time Tips', description: 'Instant notifications for new tips', defaultChecked: true },
                      { title: 'Daily Summary', description: 'End-of-day activity summary', defaultChecked: false }
                    ].map((notification, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div>
                          <div className="font-medium text-white">{notification.title}</div>
                          <div className="text-sm text-gray-400">{notification.description}</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            defaultChecked={notification.defaultChecked}
                            className="sr-only peer" 
                          />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Security Settings */}
            <GlassCard>
              <SectionTitle className="mb-6">
                <GradientText>Security & Privacy</GradientText>
              </SectionTitle>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Password & Authentication</h3>
                    <div className="space-y-3">
                      <button className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors flex items-center gap-3">
                        <Key className="h-5 w-5" />
                        <span>Change Password</span>
                      </button>
                      <button className="w-full p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-500/30 transition-colors flex items-center gap-3">
                        <Smartphone className="h-5 w-5" />
                        <span>Setup Two-Factor Auth</span>
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Active Sessions</h3>
                    <div className="space-y-2">
                      <div className="p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-white font-medium">Current Session</div>
                            <div className="text-gray-400 text-sm">MacBook Pro • San Francisco</div>
                          </div>
                          <span className="text-green-400 text-sm">Active</span>
                        </div>
                      </div>
                      <button className="text-red-400 text-sm hover:text-red-300">
                        Sign out all other sessions
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Privacy Controls</h3>
                  <div className="space-y-4">
                    {[
                      { title: 'Public Profile', description: 'Allow your profile to be discoverable', defaultChecked: true },
                      { title: 'Analytics Tracking', description: 'Help us improve DriplyPay with usage analytics', defaultChecked: true },
                      { title: 'Third-party Integrations', description: 'Allow connections with external services', defaultChecked: false }
                    ].map((setting, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div>
                          <div className="font-medium text-white">{setting.title}</div>
                          <div className="text-sm text-gray-400">{setting.description}</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            defaultChecked={setting.defaultChecked}
                            className="sr-only peer" 
                          />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Danger Zone */}
            <GlassCard>
              <SectionTitle className="mb-6">
                <span className="text-red-400">Danger Zone</span>
              </SectionTitle>

              <div className="space-y-4">
                <div className="p-4 border border-red-500/30 rounded-lg bg-red-500/10">
                  <h3 className="text-lg font-semibold text-white mb-2">Export Account Data</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Download a copy of all your account data including tips, analytics, and profile information.
                  </p>
                  <button className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-md text-blue-400 hover:bg-blue-500/30 transition-colors">
                    Request Data Export
                  </button>
                </div>

                <div className="p-4 border border-red-500/30 rounded-lg bg-red-500/10">
                  <h3 className="text-lg font-semibold text-white mb-2">Deactivate Account</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Temporarily disable your account. You can reactivate it at any time.
                  </p>
                  <button className="px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-md text-yellow-400 hover:bg-yellow-500/30 transition-colors">
                    Deactivate Account
                  </button>
                </div>

                <div className="p-4 border border-red-500/30 rounded-lg bg-red-500/10">
                  <h3 className="text-lg font-semibold text-white mb-2">Delete Account</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <button className="px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-md text-red-400 hover:bg-red-500/30 transition-colors flex items-center gap-2">
                    <Trash2 className="h-4 w-4" />
                    Delete Account
                  </button>
                </div>
              </div>
            </GlassCard>

            {/* Save Changes */}
            <div className="flex justify-end gap-4">
              <button className="px-6 py-3 text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors">
                Cancel
              </button>
              <PrimaryButton>
                Save Changes
              </PrimaryButton>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
