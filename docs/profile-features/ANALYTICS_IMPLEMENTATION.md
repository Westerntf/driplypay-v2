# Analytics Dashboard Implementation Guide

## 📍 Page Location
**File Path**: `/src/app/dashboard/analytics/page.tsx`
**Current State**: Basic display structure exists, needs database integration and design system implementation

---

## 🎨 Design System Integration

### Required Design Tokens
```typescript
// Import from design system  
import { designTokens } from '@/design-system/design-tokens'

// Key tokens for this page:
designTokens.colors.chart.primary           // Chart primary colors
designTokens.colors.chart.secondary         // Chart secondary colors
designTokens.colors.success                 // Positive metrics
designTokens.colors.warning                 // Warning states
designTokens.typography.fontSize.metric     // Large metric numbers
designTokens.spacing.chart                  // Chart spacing
designTokens.borderRadius.chart             // Chart container radius
```

### Required Components from Design System
```typescript
// From /design-system/components.tsx
import { 
  MetricCard,          // Key performance metrics
  GlassCard,           // Content sections
  LineChart,           // Time series charts
  BarChart,            // Comparison charts
  PieChart,            // Distribution charts
  DateRangePicker,     // Date selection
  ExportButton,        // Data export
  FilterDropdown       // Data filtering
} from '@/design-system/components'
```

---

## 🏗️ Component Architecture

### 1. Analytics Dashboard Layout

**Component Files**:
```
src/components/profile/analytics/
├── AnalyticsDashboard.tsx         # Main dashboard layout
├── KeyMetrics.tsx                 # Overview metrics cards
├── TrafficChart.tsx               # Profile views over time
├── ConversionChart.tsx            # Tip conversion rates
├── PaymentMethodChart.tsx         # Payment method breakdown
├── GeographicChart.tsx            # Visitor locations
├── RealtimeActivity.tsx           # Live activity feed
├── AnalyticsFilters.tsx           # Date and filter controls
├── ExportModal.tsx                # Data export interface
└── index.ts                       # Barrel exports
```

### 2. Main Dashboard Implementation

```tsx
// AnalyticsDashboard.tsx
export function AnalyticsDashboard({ userId }: Props) {
  const [dateRange, setDateRange] = useState({
    start: subDays(new Date(), 30),
    end: new Date()
  })
  const [filters, setFilters] = useState({
    source: 'all',
    device: 'all',
    country: 'all'
  })

  const { data: analytics, isLoading } = useAnalytics(userId, dateRange, filters)
  const { data: realtime } = useRealtimeAnalytics(userId)

  if (isLoading) {
    return <AnalyticsDashboardSkeleton />
  }

  return (
    <div className="space-y-6">
      {/* Filters and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <AnalyticsFilters 
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          filters={filters}
          onFiltersChange={setFilters}
        />
        
        <div className="flex gap-3">
          <ExportButton 
            data={analytics}
            filename={`analytics-${format(new Date(), 'yyyy-MM-dd')}`}
          />
          <SecondaryButton onClick={() => refreshAnalytics()}>
            <Icons.RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </SecondaryButton>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <KeyMetrics metrics={analytics.overview} />

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Traffic Chart */}
        <GlassCard className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">Profile Views</h3>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className="w-3 h-3 rounded-full bg-blue-400"></div>
              <span>Daily Views</span>
            </div>
          </div>
          <TrafficChart data={analytics.traffic} />
        </GlassCard>

        {/* Conversion Rates */}
        <GlassCard>
          <h3 className="text-xl font-semibold text-white mb-4">Conversion Rates</h3>
          <ConversionChart data={analytics.conversions} />
        </GlassCard>

        {/* Payment Methods */}
        <GlassCard>
          <h3 className="text-xl font-semibold text-white mb-4">Payment Method Usage</h3>
          <PaymentMethodChart data={analytics.paymentMethods} />
        </GlassCard>

        {/* Geographic Distribution */}
        <GlassCard>
          <h3 className="text-xl font-semibold text-white mb-4">Top Countries</h3>
          <GeographicChart data={analytics.geographic} />
        </GlassCard>

        {/* Real-time Activity */}
        <GlassCard>
          <h3 className="text-xl font-semibold text-white mb-4">Live Activity</h3>
          <RealtimeActivity data={realtime} />
        </GlassCard>
      </div>

      {/* Detailed Analytics Modal Trigger */}
      <div className="text-center">
        <SecondaryButton 
          onClick={() => setShowDetailedModal(true)}
          size="lg"
        >
          View Detailed Analytics
        </SecondaryButton>
      </div>
    </div>
  )
}
```

### 3. Key Metrics Implementation

```tsx
// KeyMetrics.tsx
export function KeyMetrics({ metrics }: Props) {
  const keyMetrics = [
    {
      title: 'Total Views',
      value: metrics.totalViews,
      change: metrics.viewsChange,
      icon: Icons.Eye,
      format: 'number',
      color: 'blue'
    },
    {
      title: 'Unique Visitors',
      value: metrics.uniqueVisitors,
      change: metrics.visitorsChange,
      icon: Icons.Users,
      format: 'number',
      color: 'purple'
    },
    {
      title: 'Tips Received',
      value: metrics.totalTips,
      change: metrics.tipsChange,
      icon: Icons.Heart,
      format: 'number',
      color: 'green'
    },
    {
      title: 'Conversion Rate',
      value: metrics.conversionRate,
      change: metrics.conversionChange,
      icon: Icons.TrendingUp,
      format: 'percentage',
      color: 'yellow'
    },
    {
      title: 'Avg. Tip Amount',
      value: metrics.averageTip,
      change: metrics.averageChange,
      icon: Icons.DollarSign,
      format: 'currency',
      color: 'emerald'
    },
    {
      title: 'Social Clicks',
      value: metrics.socialClicks,
      change: metrics.socialChange,
      icon: Icons.ExternalLink,
      format: 'number',
      color: 'pink'
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {keyMetrics.map((metric) => (
        <AnalyticsMetricCard key={metric.title} {...metric} />
      ))}
    </div>
  )
}

// Individual Analytics Metric Card
function AnalyticsMetricCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  format, 
  color 
}: AnalyticsMetricProps) {
  const formatValue = (value: number, format: string) => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(value)
      case 'percentage':
        return `${value.toFixed(1)}%`
      case 'number':
        return value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value.toString()
      default:
        return value.toString()
    }
  }

  const isPositive = change >= 0
  const changeColor = isPositive ? 'text-green-400' : 'text-red-400'
  const changeIcon = isPositive ? Icons.ArrowUp : Icons.ArrowDown

  return (
    <GlassCard className="p-4 hover:bg-white/10 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div 
          className={`p-2 rounded-lg bg-${color}-500/20`}
        >
          <Icon className={`w-5 h-5 text-${color}-400`} />
        </div>
        
        <div className={`flex items-center gap-1 text-xs ${changeColor}`}>
          <changeIcon className="w-3 h-3" />
          <span>{Math.abs(change).toFixed(1)}%</span>
        </div>
      </div>
      
      <div className="space-y-1">
        <p className="text-xl font-bold text-white">
          {formatValue(value, format)}
        </p>
        <p className="text-xs text-gray-400 leading-tight">{title}</p>
      </div>
    </GlassCard>
  )
}
```

### 4. Traffic Chart Implementation

```tsx
// TrafficChart.tsx
export function TrafficChart({ data }: Props) {
  const chartData = data.map(item => ({
    date: format(new Date(item.date), 'MMM dd'),
    views: item.views,
    uniqueViews: item.uniqueViews
  }))

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="rgba(255,255,255,0.1)" 
          />
          <XAxis 
            dataKey="date" 
            stroke="#9CA3AF"
            fontSize={12}
          />
          <YAxis 
            stroke="#9CA3AF"
            fontSize={12}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: 'white'
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="views"
            stroke="#60A5FA"
            strokeWidth={2}
            dot={{ fill: '#60A5FA', r: 4 }}
            name="Total Views"
          />
          <Line
            type="monotone"
            dataKey="uniqueViews"
            stroke="#8B5CF6"
            strokeWidth={2}
            dot={{ fill: '#8B5CF6', r: 4 }}
            name="Unique Views"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
```

### 5. Payment Method Chart Implementation

```tsx
// PaymentMethodChart.tsx
export function PaymentMethodChart({ data }: Props) {
  const COLORS = {
    stripe: '#635BFF',
    paypal: '#0070BA',
    cashapp: '#00D632',
    venmo: '#008CFF',
    other: '#6B7280'
  }

  const chartData = data.map(item => ({
    ...item,
    fill: COLORS[item.method] || COLORS.other
  }))

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="count"
            label={({ method, percentage }) => `${method} ${percentage}%`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: 'white'
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        {chartData.map((item) => (
          <div key={item.method} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.fill }}
            ></div>
            <span className="text-gray-300 capitalize">{item.method}</span>
            <span className="text-gray-400 ml-auto">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
```

### 6. Real-time Activity Implementation

```tsx
// RealtimeActivity.tsx
export function RealtimeActivity({ data }: Props) {
  const [activities, setActivities] = useState(data || [])

  // Subscribe to real-time updates
  useEffect(() => {
    const subscription = supabase
      .channel('analytics-realtime')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'analytics_events'
      }, (payload) => {
        setActivities(prev => [payload.new, ...prev.slice(0, 19)])
      })
      .subscribe()

    return () => subscription.unsubscribe()
  }, [])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'profile_view':
        return Icons.Eye
      case 'social_click':
        return Icons.ExternalLink
      case 'payment_click':
        return Icons.CreditCard
      case 'tip_completed':
        return Icons.Heart
      default:
        return Icons.Activity
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'profile_view':
        return 'text-blue-400'
      case 'social_click':
        return 'text-purple-400'
      case 'payment_click':
        return 'text-yellow-400'
      case 'tip_completed':
        return 'text-green-400'
      default:
        return 'text-gray-400'
    }
  }

  return (
    <div className="space-y-3">
      {/* Live Indicator */}
      <div className="flex items-center gap-2 text-sm">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-green-400">Live</span>
        <span className="text-gray-400">• Last updated {formatDistanceToNow(new Date())}</span>
      </div>

      {/* Activity Feed */}
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {activities.map((activity) => {
          const Icon = getActivityIcon(activity.eventType)
          const colorClass = getActivityColor(activity.eventType)
          
          return (
            <div 
              key={activity.id} 
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5"
            >
              <Icon className={`w-4 h-4 ${colorClass}`} />
              
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white truncate">
                  {formatActivityMessage(activity)}
                </p>
                <p className="text-xs text-gray-400">
                  {formatDistanceToNow(new Date(activity.timestamp))} ago
                </p>
              </div>

              {activity.metadata?.amount && (
                <span className="text-sm font-medium text-green-400">
                  +${activity.metadata.amount}
                </span>
              )}
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {activities.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <Icons.Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No recent activity</p>
        </div>
      )}
    </div>
  )
}

// Helper function to format activity messages
function formatActivityMessage(activity: AnalyticsEvent): string {
  switch (activity.eventType) {
    case 'profile_view':
      return `Profile viewed from ${activity.metadata?.country || 'unknown location'}`
    case 'social_click':
      return `${activity.metadata?.platform || 'Social'} link clicked`
    case 'payment_click':
      return `${activity.metadata?.method || 'Payment'} method clicked`
    case 'tip_completed':
      return `Tip received via ${activity.metadata?.method || 'unknown method'}`
    default:
      return 'Unknown activity'
  }
}
```

### 7. Analytics Filters Implementation

```tsx
// AnalyticsFilters.tsx
export function AnalyticsFilters({ 
  dateRange, 
  onDateRangeChange,
  filters,
  onFiltersChange 
}: Props) {
  const datePresets = [
    { label: 'Last 7 days', value: 7 },
    { label: 'Last 30 days', value: 30 },
    { label: 'Last 90 days', value: 90 },
    { label: 'Last year', value: 365 }
  ]

  const handlePresetSelect = (days: number) => {
    onDateRangeChange({
      start: subDays(new Date(), days),
      end: new Date()
    })
  }

  return (
    <div className="flex flex-wrap gap-4 items-center">
      {/* Date Range Presets */}
      <div className="flex gap-2">
        {datePresets.map((preset) => (
          <button
            key={preset.value}
            onClick={() => handlePresetSelect(preset.value)}
            className={`
              px-3 py-1 rounded-lg text-sm transition-colors
              ${isDaysSelected(preset.value, dateRange)
                ? 'bg-blue-500 text-white'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }
            `}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Custom Date Range */}
      <DateRangePicker
        startDate={dateRange.start}
        endDate={dateRange.end}
        onChange={onDateRangeChange}
        className="bg-white/5 border-white/10"
      />

      {/* Source Filter */}
      <FilterDropdown
        label="Source"
        value={filters.source}
        onChange={(value) => onFiltersChange({ ...filters, source: value })}
        options={[
          { label: 'All Sources', value: 'all' },
          { label: 'Direct', value: 'direct' },
          { label: 'Social Media', value: 'social' },
          { label: 'QR Code', value: 'qr' },
          { label: 'Search', value: 'search' }
        ]}
      />

      {/* Device Filter */}
      <FilterDropdown
        label="Device"
        value={filters.device}
        onChange={(value) => onFiltersChange({ ...filters, device: value })}
        options={[
          { label: 'All Devices', value: 'all' },
          { label: 'Mobile', value: 'mobile' },
          { label: 'Desktop', value: 'desktop' },
          { label: 'Tablet', value: 'tablet' }
        ]}
      />
    </div>
  )
}
```

---

## 🔌 Database Integration

### Analytics Data Fetching
```typescript
// lib/analytics/database.ts
export async function getAnalyticsData(
  userId: string,
  dateRange: { start: Date; end: Date },
  filters: AnalyticsFilters
): Promise<AnalyticsData> {
  try {
    // Base query
    let query = supabase
      .from('analytics_events')
      .select(`
        *,
        profiles(username, display_name)
      `)
      .eq('profile_id', userId)
      .gte('created_at', dateRange.start.toISOString())
      .lte('created_at', dateRange.end.toISOString())

    // Apply filters
    if (filters.source !== 'all') {
      query = query.eq('metadata->>source', filters.source)
    }
    if (filters.device !== 'all') {
      query = query.eq('metadata->>device', filters.device)
    }

    const { data: events, error } = await query

    if (error) throw error

    // Process data into analytics format
    return processAnalyticsData(events, dateRange)
  } catch (error) {
    console.error('Error fetching analytics:', error)
    throw error
  }
}

function processAnalyticsData(events: any[], dateRange: DateRange): AnalyticsData {
  const overview = calculateOverviewMetrics(events, dateRange)
  const traffic = calculateTrafficData(events, dateRange)
  const conversions = calculateConversionData(events)
  const paymentMethods = calculatePaymentMethodData(events)
  const geographic = calculateGeographicData(events)

  return {
    overview,
    traffic,
    conversions,
    paymentMethods,
    geographic
  }
}
```

### Real-time Analytics
```typescript
// lib/analytics/realtime.ts
export function useRealtimeAnalytics(userId: string) {
  const [data, setData] = useState<RealtimeActivity[]>([])

  useEffect(() => {
    // Fetch initial data
    const fetchInitial = async () => {
      const { data: events } = await supabase
        .from('analytics_events')
        .select('*')
        .eq('profile_id', userId)
        .order('created_at', { ascending: false })
        .limit(20)

      setData(events || [])
    }

    fetchInitial()

    // Subscribe to real-time updates
    const subscription = supabase
      .channel(`analytics-${userId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'analytics_events',
        filter: `profile_id=eq.${userId}`
      }, (payload) => {
        setData(prev => [payload.new as RealtimeActivity, ...prev.slice(0, 19)])
      })
      .subscribe()

    return () => subscription.unsubscribe()
  }, [userId])

  return { data }
}
```

### Analytics Event Tracking
```typescript
// lib/analytics/tracking.ts
export async function trackEvent(
  profileId: string,
  eventType: string,
  metadata: Record<string, any> = {}
): Promise<void> {
  try {
    await supabase
      .from('analytics_events')
      .insert({
        profile_id: profileId,
        event_type: eventType,
        metadata: {
          ...metadata,
          timestamp: new Date().toISOString(),
          user_agent: navigator.userAgent,
          url: window.location.href
        }
      })
  } catch (error) {
    console.error('Error tracking event:', error)
  }
}

// Specific tracking functions
export const trackProfileView = (profileId: string, source?: string) =>
  trackEvent(profileId, 'profile_view', { source })

export const trackSocialClick = (profileId: string, platform: string) =>
  trackEvent(profileId, 'social_click', { platform })

export const trackPaymentClick = (profileId: string, method: string) =>
  trackEvent(profileId, 'payment_click', { method })

export const trackTipCompleted = (profileId: string, amount: number, method: string) =>
  trackEvent(profileId, 'tip_completed', { amount, method })
```

---

## 📊 Data Export Implementation

### Export Modal Component
```tsx
// ExportModal.tsx
export function ExportModal({ isOpen, onClose, data }: Props) {
  const [exportFormat, setExportFormat] = useState<'csv' | 'json'>('csv')
  const [dateRange, setDateRange] = useState({
    start: subDays(new Date(), 30),
    end: new Date()
  })
  const [includeMetadata, setIncludeMetadata] = useState(true)

  const handleExport = async () => {
    try {
      const exportData = await generateExportData(data, {
        format: exportFormat,
        dateRange,
        includeMetadata
      })

      downloadFile(exportData, `analytics-${format(new Date(), 'yyyy-MM-dd')}.${exportFormat}`)
      onClose()
    } catch (error) {
      toast.error('Failed to export data')
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Export Analytics Data</h2>
        
        {/* Export Options */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Export Format
            </label>
            <div className="flex gap-3">
              {['csv', 'json'].map((format) => (
                <label key={format} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value={format}
                    checked={exportFormat === format}
                    onChange={(e) => setExportFormat(e.target.value as 'csv' | 'json')}
                    className="text-blue-500"
                  />
                  <span className="text-white uppercase">{format}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Date Range
            </label>
            <DateRangePicker
              startDate={dateRange.start}
              endDate={dateRange.end}
              onChange={setDateRange}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeMetadata}
                onChange={(e) => setIncludeMetadata(e.target.checked)}
                className="text-blue-500"
              />
              <span className="text-white">Include metadata (device, location, etc.)</span>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <SecondaryButton onClick={onClose}>
            Cancel
          </SecondaryButton>
          <PrimaryButton onClick={handleExport}>
            Export Data
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  )
}
```

This implementation guide provides a comprehensive analytics dashboard with real-time updates, interactive charts, and data export capabilities, all integrated with your design system and database.
