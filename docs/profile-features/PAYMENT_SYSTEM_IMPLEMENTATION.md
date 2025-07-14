# Payment System Implementation Guide

## 📍 Page Location
**File Path**: `/src/app/dashboard/payments/page.tsx`
**Current State**: Basic display structure exists, needs Stripe integration and design system implementation

---

## 🎨 Design System Integration

### Required Design Tokens
```typescript
// Import from design system  
import { designTokens } from '@/design-system/design-tokens'

// Key tokens for this page:
designTokens.colors.payment.stripe          // Stripe brand color
designTokens.colors.success                 // Success states
designTokens.colors.warning                 // Warning states
designTokens.typography.fontSize.metric     // Large numbers
designTokens.spacing.metric                 // Metric card spacing
```

### Required Components from Design System
```typescript
// From /design-system/components.tsx
import { 
  MetricCard,          // Earnings metrics
  GlassCard,           // Content sections
  DataTable,           // Transaction tables
  PrimaryButton,       // Action buttons
  StatusBadge,         // Payment status
  Chart,               // Revenue charts
  LoadingSpinner       // Loading states
} from '@/design-system/components'
```

---

## 🏗️ Component Architecture

### 1. Payment Dashboard Layout

**Component Files**:
```
src/components/profile/payments/
├── PaymentDashboard.tsx           # Main dashboard layout
├── EarningsMetrics.tsx           # Key metrics cards
├── RevenueChart.tsx              # Earnings chart
├── TransactionTable.tsx          # Recent transactions
├── PaymentMethodStats.tsx        # Method performance
├── PayoutSettings.tsx            # Payout configuration
├── StripeConnectBanner.tsx       # Stripe setup prompts
└── index.ts                      # Barrel exports
```

### 2. Main Dashboard Implementation

```tsx
// PaymentDashboard.tsx
export function PaymentDashboard({ userId }: Props) {
  const { data: earnings, isLoading } = useEarnings(userId)
  const { data: transactions } = useTransactions(userId)
  const { data: payoutSettings } = usePayoutSettings(userId)

  if (isLoading) {
    return <PaymentDashboardSkeleton />
  }

  return (
    <div className="space-y-6">
      {/* Stripe Connect Banner */}
      {!payoutSettings?.stripeConnected && (
        <StripeConnectBanner />
      )}

      {/* Key Metrics */}
      <EarningsMetrics earnings={earnings} />

      {/* Charts and Details */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <GlassCard>
          <h3 className="text-xl font-semibold text-white mb-4">Earnings Over Time</h3>
          <RevenueChart data={earnings.chartData} />
        </GlassCard>

        {/* Payment Method Performance */}
        <GlassCard>
          <h3 className="text-xl font-semibold text-white mb-4">Payment Method Performance</h3>
          <PaymentMethodStats data={earnings.methodStats} />
        </GlassCard>
      </div>

      {/* Recent Transactions */}
      <GlassCard>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">Recent Transactions</h3>
          <SecondaryButton onClick={() => exportTransactions()}>
            Export CSV
          </SecondaryButton>
        </div>
        <TransactionTable transactions={transactions} />
      </GlassCard>

      {/* Payout Settings */}
      <GlassCard>
        <h3 className="text-xl font-semibold text-white mb-4">Payout Settings</h3>
        <PayoutSettings settings={payoutSettings} onUpdate={updatePayoutSettings} />
      </GlassCard>
    </div>
  )
}
```

### 3. Earnings Metrics Implementation

```tsx
// EarningsMetrics.tsx
export function EarningsMetrics({ earnings }: Props) {
  const metrics = [
    {
      title: 'Total Earnings',
      value: earnings.total,
      change: earnings.totalChange,
      icon: Icons.DollarSign,
      format: 'currency'
    },
    {
      title: 'This Month',
      value: earnings.thisMonth,
      change: earnings.monthChange,
      icon: Icons.TrendingUp,
      format: 'currency'
    },
    {
      title: 'Total Tips',
      value: earnings.tipCount,
      change: earnings.tipCountChange,
      icon: Icons.Heart,
      format: 'number'
    },
    {
      title: 'Conversion Rate',
      value: earnings.conversionRate,
      change: earnings.conversionChange,
      icon: Icons.Target,
      format: 'percentage'
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <MetricCard key={metric.title} {...metric} />
      ))}
    </div>
  )
}

// Individual Metric Card
function MetricCard({ title, value, change, icon: Icon, format }: MetricProps) {
  const formatValue = (value: number, format: string) => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(value)
      case 'percentage':
        return `${value.toFixed(1)}%`
      default:
        return value.toLocaleString()
    }
  }

  const isPositive = change >= 0
  const changeColor = isPositive ? 'text-green-400' : 'text-red-400'
  const changeIcon = isPositive ? Icons.TrendingUp : Icons.TrendingDown

  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-2">
        <Icon className="w-8 h-8 text-blue-400" />
        <div className={`flex items-center gap-1 text-sm ${changeColor}`}>
          <changeIcon className="w-4 h-4" />
          <span>{Math.abs(change).toFixed(1)}%</span>
        </div>
      </div>
      
      <div className="space-y-1">
        <p className="text-2xl font-bold text-white">
          {formatValue(value, format)}
        </p>
        <p className="text-sm text-gray-400">{title}</p>
      </div>
    </GlassCard>
  )
}
```

### 4. Transaction Table Implementation

```tsx
// TransactionTable.tsx
export function TransactionTable({ transactions }: Props) {
  const [sortField, setSortField] = useState('createdAt')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [filterStatus, setFilterStatus] = useState('all')

  const filteredTransactions = useMemo(() => {
    let filtered = transactions

    if (filterStatus !== 'all') {
      filtered = filtered.filter(t => t.status === filterStatus)
    }

    return filtered.sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })
  }, [transactions, sortField, sortDirection, filterStatus])

  return (
    <div>
      {/* Filters */}
      <div className="flex items-center gap-4 mb-4">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="
            px-3 py-2 rounded-lg bg-white/5 border border-white/10
            text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50
          "
        >
          <option value="all">All Transactions</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <TableHeader
                label="Date"
                field="createdAt"
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={(field, direction) => {
                  setSortField(field)
                  setSortDirection(direction)
                }}
              />
              <TableHeader label="Amount" field="amount" />
              <TableHeader label="Method" field="paymentMethod" />
              <TableHeader label="Supporter" field="supporterName" />
              <TableHeader label="Status" field="status" />
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction) => (
              <TransactionRow key={transaction.id} transaction={transaction} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredTransactions.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <Icons.CreditCard className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No transactions found</p>
          <p className="text-sm">Transactions will appear here once you start receiving tips</p>
        </div>
      )}
    </div>
  )
}

// Individual Transaction Row
function TransactionRow({ transaction }: Props) {
  return (
    <tr className="border-b border-white/5 hover:bg-white/5">
      <td className="py-3 px-4 text-sm text-gray-300">
        {formatDate(transaction.createdAt)}
      </td>
      <td className="py-3 px-4 text-sm font-medium text-white">
        ${transaction.amount.toFixed(2)}
      </td>
      <td className="py-3 px-4 text-sm text-gray-300">
        <div className="flex items-center gap-2">
          <Icons[transaction.paymentMethod] className="w-4 h-4" />
          <span className="capitalize">{transaction.paymentMethod}</span>
        </div>
      </td>
      <td className="py-3 px-4 text-sm text-gray-300">
        {transaction.isAnonymous ? (
          <span className="italic">Anonymous</span>
        ) : (
          transaction.supporterName || 'Unknown'
        )}
      </td>
      <td className="py-3 px-4">
        <StatusBadge status={transaction.status} />
      </td>
      <td className="py-3 px-4">
        <DropdownMenu>
          <DropdownMenuItem onClick={() => viewTransaction(transaction.id)}>
            View Details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => downloadReceipt(transaction.id)}>
            Download Receipt
          </DropdownMenuItem>
          {transaction.message && (
            <DropdownMenuItem onClick={() => viewMessage(transaction.message)}>
              View Message
            </DropdownMenuItem>
          )}
        </DropdownMenu>
      </td>
    </tr>
  )
}
```

### 5. Stripe Connect Integration

```tsx
// StripeConnectBanner.tsx
export function StripeConnectBanner() {
  const [isConnecting, setIsConnecting] = useState(false)

  const handleStripeConnect = async () => {
    setIsConnecting(true)
    try {
      const response = await fetch('/api/stripe/connect/onboard', {
        method: 'POST'
      })
      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      console.error('Stripe Connect error:', error)
      setIsConnecting(false)
    }
  }

  return (
    <GlassCard className="border-l-4 border-blue-400 bg-blue-400/5">
      <div className="flex items-start gap-4">
        {/* Stripe Logo */}
        <div className="w-12 h-12 rounded-lg bg-stripe flex items-center justify-center">
          <Icons.Stripe className="w-6 h-6 text-white" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="font-semibold text-white mb-2">
            Connect with Stripe to Receive Payouts
          </h3>
          <p className="text-gray-300 mb-4 leading-relaxed">
            Connect your Stripe account to receive tips directly to your bank account. 
            Stripe provides secure payment processing with industry-leading fraud protection.
          </p>

          {/* Benefits */}
          <ul className="text-sm text-gray-400 space-y-1 mb-4">
            <li>• Instant payouts to your bank account</li>
            <li>• Industry-leading security and fraud protection</li>
            <li>• Lower processing fees (2.9% + 30¢ per transaction)</li>
            <li>• Global payment support</li>
          </ul>

          {/* Connect Button */}
          <PrimaryButton
            onClick={handleStripeConnect}
            loading={isConnecting}
            className="inline-flex items-center gap-2"
          >
            <Icons.Stripe className="w-4 h-4" />
            Connect Stripe Account
          </PrimaryButton>
        </div>

        {/* Dismiss */}
        <button
          onClick={() => dismissBanner()}
          className="text-gray-400 hover:text-white"
        >
          <Icons.X className="w-5 h-5" />
        </button>
      </div>
    </GlassCard>
  )
}
```

### 6. Payout Settings Implementation

```tsx
// PayoutSettings.tsx
export function PayoutSettings({ settings, onUpdate }: Props) {
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState(settings)

  const handleSave = async () => {
    try {
      await onUpdate(formData)
      setEditMode(false)
      toast.success('Payout settings updated successfully')
    } catch (error) {
      toast.error('Failed to update payout settings')
    }
  }

  return (
    <div className="space-y-6">
      {/* Stripe Account Status */}
      <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-stripe flex items-center justify-center">
            <Icons.Stripe className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-medium text-white">Stripe Account</div>
            <div className="text-sm text-gray-400">
              {settings.stripeConnected ? (
                <>Connected • {settings.stripeAccountId}</>
              ) : (
                'Not connected'
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <StatusBadge 
            status={settings.stripeConnected ? 'connected' : 'disconnected'} 
          />
          {settings.stripeConnected ? (
            <SecondaryButton onClick={() => manageStripeAccount()}>
              Manage Account
            </SecondaryButton>
          ) : (
            <PrimaryButton onClick={() => connectStripe()}>
              Connect
            </PrimaryButton>
          )}
        </div>
      </div>

      {/* Payout Schedule */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-white">Payout Schedule</h4>
          <button
            onClick={() => setEditMode(!editMode)}
            className="text-blue-400 hover:text-blue-300 text-sm"
          >
            {editMode ? 'Cancel' : 'Edit'}
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Payout Frequency
            </label>
            <select
              value={formData.payoutFrequency}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                payoutFrequency: e.target.value 
              }))}
              disabled={!editMode}
              className="
                w-full px-3 py-2 rounded-lg 
                bg-white/5 border border-white/10
                text-white disabled:opacity-50
                focus:outline-none focus:ring-2 focus:ring-blue-400/50
              "
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Minimum Payout Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
              <input
                type="number"
                value={formData.minimumPayout}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  minimumPayout: parseFloat(e.target.value) 
                }))}
                disabled={!editMode}
                min="1"
                step="1"
                className="
                  w-full pl-8 pr-4 py-2 rounded-lg
                  bg-white/5 border border-white/10
                  text-white disabled:opacity-50
                  focus:outline-none focus:ring-2 focus:ring-blue-400/50
                "
              />
            </div>
          </div>
        </div>

        {editMode && (
          <div className="flex justify-end gap-3 mt-4">
            <SecondaryButton onClick={() => setEditMode(false)}>
              Cancel
            </SecondaryButton>
            <PrimaryButton onClick={handleSave}>
              Save Changes
            </PrimaryButton>
          </div>
        )}
      </div>

      {/* Recent Payouts */}
      <div>
        <h4 className="font-medium text-white mb-4">Recent Payouts</h4>
        <div className="space-y-3">
          {settings.recentPayouts?.map((payout) => (
            <div
              key={payout.id}
              className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
            >
              <div>
                <div className="font-medium text-white">
                  ${payout.amount.toFixed(2)}
                </div>
                <div className="text-sm text-gray-400">
                  {formatDate(payout.date)} • {payout.description}
                </div>
              </div>
              <StatusBadge status={payout.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

---

## 🔌 Stripe Integration

### API Endpoints
```typescript
// app/api/stripe/connect/onboard/route.ts
export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const accountLink = await stripe.accountLinks.create({
      account: session.user.stripeAccountId,
      refresh_url: `${process.env.NEXTAUTH_URL}/dashboard/payments?setup=refresh`,
      return_url: `${process.env.NEXTAUTH_URL}/dashboard/payments?setup=complete`,
      type: 'account_onboarding',
    })

    return NextResponse.json({ url: accountLink.url })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create onboarding link' }, { status: 500 })
  }
}

// app/api/stripe/webhooks/route.ts
export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )

    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSuccess(event.data.object)
        break
      case 'account.updated':
        await handleAccountUpdate(event.data.object)
        break
      case 'transfer.created':
        await handlePayout(event.data.object)
        break
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 })
  }
}
```

### Database Operations
```typescript
// lib/payments/database.ts
export async function createPaymentRecord(paymentData: PaymentData) {
  const { data, error } = await supabase
    .from('payments')
    .insert({
      profile_id: paymentData.profileId,
      amount: paymentData.amount,
      currency: paymentData.currency,
      payment_method: paymentData.method,
      stripe_payment_intent_id: paymentData.stripePaymentIntentId,
      supporter_name: paymentData.supporterName,
      supporter_email: paymentData.supporterEmail,
      message: paymentData.message,
      is_anonymous: paymentData.isAnonymous,
      status: 'pending'
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updatePaymentStatus(paymentId: string, status: string) {
  const { error } = await supabase
    .from('payments')
    .update({ status, updated_at: new Date() })
    .eq('id', paymentId)

  if (error) throw error
}
```

This implementation guide provides the complete blueprint for building a robust payment system with Stripe integration, proper error handling, and design system consistency.
