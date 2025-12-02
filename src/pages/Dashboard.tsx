import { TrendingUp, TrendingDown, DollarSign, Wrench, Building2, Users } from 'lucide-react';
import { Card } from '@/components/ui';
import { formatCurrency } from '@/lib/utils';
import { RecentToolsTable } from '@/components/features/RecentToolsTable';

interface KPICardProps {
  title: string;
  value: string;
  trend: string;
  gradient: 'primary' | 'success' | 'warning' | 'danger';
  icon: React.ReactNode;
}

function KPICard({ title, value, trend, gradient, icon }: KPICardProps) {
  const isPositive = trend.startsWith('+');
  
  return (
    <Card variant="gradient" gradient={gradient} className="p-6 relative overflow-hidden">
      <div className="absolute top-4 right-4 opacity-20">{icon}</div>
      <div className="relative z-10">
        <p className="text-sm font-medium opacity-90">{title}</p>
        <p className="text-3xl font-bold mt-2">{value}</p>
        <div className="flex items-center gap-1 mt-2 text-sm opacity-90">
          {isPositive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span>{trend}</span>
        </div>
      </div>
    </Card>
  );
}

export function Dashboard() {
  // Mock data - will be replaced with real API data
  const kpis = [
    {
      title: 'Total Budget',
      value: formatCurrency(28750),
      trend: '+12%',
      gradient: 'primary' as const,
      icon: <DollarSign className="w-12 h-12" />,
    },
    {
      title: 'Active Tools',
      value: '147',
      trend: '+8',
      gradient: 'success' as const,
      icon: <Wrench className="w-12 h-12" />,
    },
    {
      title: 'Departments',
      value: '8',
      trend: '+2',
      gradient: 'info' as const,
      icon: <Building2 className="w-12 h-12" />,
    },
    {
      title: 'Cost per User',
      value: formatCurrency(156),
      trend: '+€10',
      gradient: 'warning' as const,
      icon: <Users className="w-12 h-12" />,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-h1 font-bold text-foreground">Dashboard</h1>
        <p className="text-foreground-secondary mt-2">
          Overview of your internal tools and budget
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <KPICard key={kpi.title} {...kpi} />
        ))}
      </div>

      {/* Recent Tools Table */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-h3 font-semibold text-foreground">Recent Tools</h2>
            <p className="text-sm text-foreground-secondary mt-1">
              Latest updates to your tool catalog
            </p>
          </div>
        </div>
        <RecentToolsTable />
      </div>
    </div>
  );
}
