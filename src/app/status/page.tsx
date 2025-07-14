import { Metadata } from 'next';
import { CheckCircle, AlertCircle, XCircle, Clock, Activity, Server, Database, Globe, Zap, Shield } from 'lucide-react';
import { 
  Section, 
  GlassCard, 
  GradientText,
  SectionTitle,
  Description,
  HeroSection
} from '@/components/design-system';

export const metadata: Metadata = {
  title: 'System Status - DriplyPay',
  description: 'Real-time status of DriplyPay services and infrastructure.',
};

interface ServiceStatus {
  name: string;
  status: 'operational' | 'degraded' | 'outage' | 'maintenance';
  description: string;
  icon: any;
  lastUpdate: string;
}

const services: ServiceStatus[] = [
  {
    name: 'Payment Processing',
    status: 'operational',
    description: 'All payment processing systems are functioning normally',
    icon: Activity,
    lastUpdate: '2 minutes ago'
  },
  {
    name: 'API Services',
    status: 'operational',
    description: 'All API endpoints are responding normally',
    icon: Server,
    lastUpdate: '1 minute ago'
  },
  {
    name: 'Database',
    status: 'operational',
    description: 'Database performance is optimal',
    icon: Database,
    lastUpdate: '30 seconds ago'
  },
  {
    name: 'Web Application',
    status: 'operational',
    description: 'DriplyPay web app is fully operational',
    icon: Globe,
    lastUpdate: '1 minute ago'
  },
  {
    name: 'Authentication',
    status: 'operational',
    description: 'User authentication services running smoothly',
    icon: Shield,
    lastUpdate: '45 seconds ago'
  },
  {
    name: 'QR Code Generation',
    status: 'operational',
    description: 'QR code generation and delivery working perfectly',
    icon: Zap,
    lastUpdate: '3 minutes ago'
  }
];

const incidents = [
  {
    id: 1,
    title: 'Scheduled Maintenance - Database Optimization',
    status: 'completed',
    date: '2024-01-15',
    time: '02:00 - 04:00 PST',
    description: 'Performed routine database optimization to improve query performance.',
    impact: 'No service disruption'
  },
  {
    id: 2,
    title: 'Payment Processing Latency',
    status: 'resolved',
    date: '2024-01-12',
    time: '14:30 - 15:15 PST',
    description: 'Experienced increased latency in payment processing due to third-party provider issues.',
    impact: 'Minimal user impact, all payments processed successfully'
  }
];

const statusConfig = {
  operational: {
    icon: CheckCircle,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
    label: 'Operational'
  },
  degraded: {
    icon: AlertCircle,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/20',
    label: 'Degraded Performance'
  },
  outage: {
    icon: XCircle,
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20',
    label: 'Service Outage'
  },
  maintenance: {
    icon: Clock,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    label: 'Under Maintenance'
  }
};

export default function StatusPage() {
  const overallStatus = services.every(service => service.status === 'operational') ? 'operational' : 'degraded';
  const StatusIcon = statusConfig[overallStatus].icon;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection hasGlow={true} glowColor="#10B981">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
          <GradientText>System Status</GradientText>
        </h1>
        <Description center>
          Real-time monitoring of all DriplyPay services and infrastructure
        </Description>
        
        {/* Overall Status */}
        <div className="mt-8">
          <GlassCard variant="secondary" className="inline-block">
            <div className="flex items-center gap-3">
              <StatusIcon className={`h-6 w-6 ${statusConfig[overallStatus].color}`} />
              <span className="text-white font-semibold text-lg">
                All Systems {statusConfig[overallStatus].label}
              </span>
            </div>
          </GlassCard>
        </div>
      </HeroSection>

      {/* Services Status */}
      <Section className="bg-black/5">
        <SectionTitle center className="mb-12">
          <GradientText>Service Status</GradientText>
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const config = statusConfig[service.status];
            const ServiceIcon = service.icon;
            const StatusIconComponent = config.icon;

            return (
              <GlassCard key={index}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <ServiceIcon className="h-6 w-6 text-blue-400" />
                    <h3 className="font-semibold text-white">{service.name}</h3>
                  </div>
                  <div className={`p-2 rounded-lg ${config.bgColor} border ${config.borderColor}`}>
                    <StatusIconComponent className={`h-4 w-4 ${config.color}`} />
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm mb-3">{service.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${config.color}`}>
                    {config.label}
                  </span>
                  <span className="text-xs text-gray-400">
                    Updated {service.lastUpdate}
                  </span>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </Section>

      {/* Incident History */}
      <Section>
        <SectionTitle center className="mb-12">
          <GradientText>Recent Incidents</GradientText>
        </SectionTitle>

        <div className="max-w-4xl mx-auto space-y-6">
          {incidents.map((incident) => (
            <GlassCard key={incident.id}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-white mb-1">{incident.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>{incident.date}</span>
                    <span>{incident.time}</span>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  incident.status === 'resolved' ? 'bg-green-500/20 text-green-400' :
                  incident.status === 'completed' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                </div>
              </div>
              
              <p className="text-gray-300 text-sm mb-3">{incident.description}</p>
              
              <div className="pt-3 border-t border-white/10">
                <span className="text-xs text-gray-400">Impact: </span>
                <span className="text-xs text-gray-300">{incident.impact}</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* Performance Metrics */}
      <Section className="bg-black/5">
        <SectionTitle center className="mb-12">
          <GradientText>Performance Metrics</GradientText>
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Uptime', value: '99.98%', description: 'Last 30 days', color: 'text-green-400' },
            { label: 'Response Time', value: '240ms', description: 'Average API response', color: 'text-blue-400' },
            { label: 'Payment Success Rate', value: '99.95%', description: 'Last 7 days', color: 'text-purple-400' },
            { label: 'Active Users', value: '12.5K', description: 'Currently online', color: 'text-orange-400' }
          ].map((metric, index) => (
            <GlassCard key={index} variant="secondary">
              <div className="text-center">
                <div className={`text-2xl font-bold ${metric.color} mb-1`}>
                  {metric.value}
                </div>
                <div className="text-white font-medium text-sm mb-1">
                  {metric.label}
                </div>
                <div className="text-gray-400 text-xs">
                  {metric.description}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* Subscribe to Updates */}
      <Section>
        <div className="text-center">
          <SectionTitle center className="mb-6">
            <GradientText>Stay Updated</GradientText>
          </SectionTitle>
          <Description center className="mb-8">
            Subscribe to receive notifications about system updates and maintenance schedules
          </Description>
          
          <GlassCard variant="secondary" className="max-w-md mx-auto">
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </div>
          </GlassCard>
        </div>
      </Section>
    </div>
  );
}
