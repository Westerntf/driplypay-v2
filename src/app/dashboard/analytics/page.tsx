/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Analytics Features
 * Page: Analytics dashboard for tracking profile performance and earnings
 * Features: View stats, payment performance, supporter analytics, revenue trends
 */
import { Metadata } from 'next';
import { BarChart3, TrendingUp, Users, DollarSign, Calendar, ArrowLeft, Download, Filter } from 'lucide-react';
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
  title: 'Analytics - DriplyPay Dashboard',
  description: 'Track your earnings, understand your audience, and optimize your monetization strategy.',
};

export default function AnalyticsPage() {
  const timeRanges = ['7d', '30d', '90d', '1y', 'All'];
  const currentRange = '30d';

  const keyMetrics = [
    {
      title: 'Total Revenue',
      value: '$2,847.50',
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'text-green-400'
    },
    {
      title: 'Total Tips',
      value: '147',
      change: '+8.2%',
      changeType: 'positive',
      icon: Users,
      color: 'text-blue-400'
    },
    {
      title: 'Average Tip',
      value: '$19.37',
      change: '+3.7%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'text-purple-400'
    },
    {
      title: 'Profile Views',
      value: '1,234',
      change: '-2.1%',
      changeType: 'negative',
      icon: BarChart3,
      color: 'text-orange-400'
    }
  ];

  const recentTips = [
    { id: 1, amount: '$25.00', supporter: 'Alex M.', method: 'Stripe', date: '2 hours ago', message: 'Love your content!' },
    { id: 2, amount: '$10.00', supporter: 'Sarah K.', method: 'PayPal', date: '5 hours ago', message: '' },
    { id: 3, amount: '$50.00', supporter: 'Mike R.', method: 'Venmo', date: '1 day ago', message: 'Keep up the great work!' },
    { id: 4, amount: '$15.00', supporter: 'Anonymous', method: 'CashApp', date: '1 day ago', message: 'Thanks for the tutorial' },
    { id: 5, amount: '$30.00', supporter: 'Emma L.', method: 'Stripe', date: '2 days ago', message: 'Amazing content as always!' }
  ];

  const topSupporters = [
    { name: 'Mike R.', total: '$235.00', tips: 8, avatar: '🧑‍💻' },
    { name: 'Sarah K.', total: '$180.00', tips: 12, avatar: '👩‍🎨' },
    { name: 'Alex M.', total: '$150.00', tips: 6, avatar: '👨‍🎤' },
    { name: 'Emma L.', total: '$120.00', tips: 9, avatar: '👩‍💼' }
  ];

  const paymentMethodStats = [
    { method: 'Stripe', percentage: 45, amount: '$1,281.38', color: 'bg-blue-500' },
    { method: 'PayPal', percentage: 28, amount: '$797.30', color: 'bg-yellow-500' },
    { method: 'Venmo', percentage: 18, amount: '$512.55', color: 'bg-cyan-500' },
    { method: 'CashApp', percentage: 9, amount: '$256.27', color: 'bg-green-500' }
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
                <GradientText>Analytics</GradientText>
              </h1>
              <Description>
                Track your earnings, understand your supporters, and optimize your monetization strategy.
              </Description>
            </div>
            
            <div className="flex items-center gap-3">
              <select className="px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                {timeRanges.map(range => (
                  <option key={range} value={range} selected={range === currentRange}>
                    Last {range === '7d' ? '7 days' : range === '30d' ? '30 days' : range === '90d' ? '90 days' : range === '1y' ? 'year' : 'all time'}
                  </option>
                ))}
              </select>
              <button className="px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white hover:bg-white/20 transition-colors flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <Section className="bg-black/5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {keyMetrics.map((metric, index) => (
            <GlassCard key={index} variant="secondary">
              <div className="flex items-start justify-between">
                <div>
                  <div className={`text-2xl font-bold ${metric.color} mb-1`}>
                    {metric.value}
                  </div>
                  <div className="text-white font-medium text-sm mb-2">
                    {metric.title}
                  </div>
                  <div className={`text-xs flex items-center gap-1 ${
                    metric.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    <TrendingUp className={`h-3 w-3 ${metric.changeType === 'negative' ? 'rotate-180' : ''}`} />
                    {metric.change}
                  </div>
                </div>
                <metric.icon className={`h-8 w-8 ${metric.color} opacity-80`} />
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* Revenue Chart */}
      <Section>
        <SectionTitle className="mb-8">
          <GradientText>Revenue Trends</GradientText>
        </SectionTitle>

        <GlassCard>
          <div className="h-80 flex items-center justify-center bg-gray-900/50 rounded-lg">
            <div className="text-center">
              <BarChart3 className="h-16 w-16 text-blue-400 mx-auto mb-4" />
              <p className="text-gray-300">Revenue chart visualization would go here</p>
              <p className="text-gray-400 text-sm">Integration with charting library like Chart.js or D3</p>
            </div>
          </div>
        </GlassCard>
      </Section>

      {/* Payment Methods & Top Supporters */}
      <Section className="bg-black/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Method Breakdown */}
          <GlassCard>
            <SectionTitle className="mb-6">
              <GradientText>Payment Methods</GradientText>
            </SectionTitle>
            
            <div className="space-y-4">
              {paymentMethodStats.map((method, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">{method.method}</span>
                    <div className="text-right">
                      <div className="text-white font-bold">{method.amount}</div>
                      <div className="text-gray-400 text-xs">{method.percentage}%</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${method.color}`}
                      style={{ width: `${method.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Top Supporters */}
          <GlassCard>
            <SectionTitle className="mb-6">
              <GradientText>Top Supporters</GradientText>
            </SectionTitle>
            
            <div className="space-y-4">
              {topSupporters.map((supporter, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{supporter.avatar}</div>
                    <div>
                      <div className="font-medium text-white">{supporter.name}</div>
                      <div className="text-gray-400 text-sm">{supporter.tips} tips</div>
                    </div>
                  </div>
                  <div className="text-green-400 font-bold">{supporter.total}</div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </Section>

      {/* Recent Activity */}
      <Section>
        <SectionTitle className="mb-8">
          <GradientText>Recent Tips</GradientText>
        </SectionTitle>

        <GlassCard>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Amount</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Supporter</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Method</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Date</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Message</th>
                </tr>
              </thead>
              <tbody>
                {recentTips.map((tip) => (
                  <tr key={tip.id} className="border-b border-gray-800 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4">
                      <span className="font-bold text-green-400">{tip.amount}</span>
                    </td>
                    <td className="py-3 px-4 text-white">{tip.supporter}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                        {tip.method}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-400">{tip.date}</td>
                    <td className="py-3 px-4 text-gray-300 max-w-xs truncate">
                      {tip.message || <span className="text-gray-500 italic">No message</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 text-center">
            <button className="px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white hover:bg-white/20 transition-colors">
              View All Tips
            </button>
          </div>
        </GlassCard>
      </Section>

      {/* Insights & Recommendations */}
      <Section className="bg-black/5">
        <SectionTitle center className="mb-12">
          <GradientText>Insights & Recommendations</GradientText>
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard variant="secondary">
            <div className="text-center">
              <div className="text-3xl mb-3">📈</div>
              <h3 className="font-semibold text-white mb-2">Peak Hours</h3>
              <p className="text-gray-300 text-sm mb-3">
                Most tips come between 7-9 PM. Consider posting content during these hours.
              </p>
              <span className="text-blue-400 text-xs">Based on last 30 days</span>
            </div>
          </GlassCard>

          <GlassCard variant="secondary">
            <div className="text-center">
              <div className="text-3xl mb-3">💡</div>
              <h3 className="font-semibold text-white mb-2">Tip Amounts</h3>
              <p className="text-gray-300 text-sm mb-3">
                Consider adding $15 and $25 suggested amounts to increase average tips.
              </p>
              <span className="text-green-400 text-xs">Optimization tip</span>
            </div>
          </GlassCard>

          <GlassCard variant="secondary">
            <div className="text-center">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-semibold text-white mb-2">Growth Opportunity</h3>
              <p className="text-gray-300 text-sm mb-3">
                Your QR code scans are up 25%. Consider adding QR codes to more content.
              </p>
              <span className="text-purple-400 text-xs">Growth insight</span>
            </div>
          </GlassCard>
        </div>
      </Section>
    </div>
  );
}
