import { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Wrench, Building2, Users, Search } from 'lucide-react';
import { Card, Input } from '@/components/ui';
import { formatCurrency, cn } from '@/lib/utils';
import { RecentToolsTable } from '@/components/features/RecentToolsTable';
import { AddToolWidget } from '@/components/features/AddToolWidget';

interface KPICardProps {
  title: string;
  value: string;
  trend: string;
  gradient: 'gold' | 'platinum' | 'sapphire' | 'ruby';
  icon: React.ReactNode;
}

function KPICard({ title, value, trend, gradient, icon }: KPICardProps) {
  const isPositive = trend.startsWith('+');
  
  // Map gradient to color classes for hover effect
  const colorMap = {
    gold: 'group-hover:text-[#d4af37]',
    platinum: 'group-hover:text-[#e5e4e2]',
    sapphire: 'group-hover:text-[#0f52ba]',
    ruby: 'group-hover:text-[#e0115f]',
  } as const;
  
  const hoverColor = colorMap[gradient as keyof typeof colorMap];
  
  return (
    <Card variant="bordered" borderColor="platinum" className="p-6 relative overflow-hidden hover-shake cursor-pointer group">
      <div className={cn("absolute top-4 right-4 opacity-20 transition-colors duration-300", hoverColor)}>{icon}</div>
      <div className="relative z-10">
        <p className={cn("text-sm font-medium opacity-90 transition-colors duration-300", hoverColor)}>{title}</p>
        <p className={cn("text-3xl font-bold mt-2 transition-colors duration-300", hoverColor)}>{value}</p>
        <div className={cn("flex items-center gap-1 mt-2 text-sm opacity-90 transition-colors duration-300", hoverColor)}>
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
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Mock data - will be replaced with real API data
  const kpis = [
    {
      title: 'Total Budget',
      value: formatCurrency(28750),
      trend: '+12%',
      gradient: 'gold' as const,
      icon: <DollarSign className="w-12 h-12" />,
    },
    {
      title: 'Active Tools',
      value: '147',
      trend: '+8',
      gradient: 'platinum' as const,
      icon: <Wrench className="w-12 h-12" />,
    },
    {
      title: 'Departments',
      value: '8',
      trend: '+2',
      gradient: 'sapphire' as const,
      icon: <Building2 className="w-12 h-12" />,
    },
    {
      title: 'Cost per User',
      value: formatCurrency(156),
      trend: '+€10',
      gradient: 'ruby' as const,
      icon: <Users className="w-12 h-12" />,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-h1 font-bold bg-gradient-to-r from-cyan-300 via-blue-600 to-cyan-300 bg-clip-text text-transparent animate-gradient-title">
          Dashboard
        </h1>
        <div className="overflow-hidden mt-2">
          <p className="text-foreground-secondary animate-scroll-left whitespace-nowrap">
            Overview of your internal tools and budget
          </p>
        </div>
      </div>

      {/* Add Tool Widget - Modern contextual engagement */}
      <AddToolWidget
        user={{
          name: 'Fares',
          lastAction: {
            action: 'Added',
            toolName: 'Figma',
            timeAgo: '2 hours ago',
          },
          quarterlySavings: 12000,
        }}
        campaign={{
          title: '🚀 Q4 Budget Planning is Here',
          description: 'Review your tool usage and optimize costs for next quarter. Our AI can identify potential savings of up to €15K.',
          badge: 'NEW',
          primaryCta: {
            label: 'Add Tool to Review',
            action: 'add-tool' as const,
          },
          secondaryCta: {
            label: 'Learn About AI Optimizer',
            action: 'learn-more' as const,
            url: 'https://example.com/ai-optimizer',
          },
        }}
        onSubmit={(data) => {
          console.log('Tool submitted:', data);
          // In production: 
          // - Call API to create tool
          // - Invalidate React Query cache
          // - Show success toast
        }}
        onDismiss={() => {
          console.log('Widget dismissed');
          // In production:
          // - Store preference in localStorage
          // - Track dismissal event
        }}
      />

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
            <h2 className="text-h3 font-semibold bg-gradient-to-r from-cyan-300 via-blue-600 to-cyan-300 bg-clip-text text-transparent animate-gradient-title">Recent Tools</h2>
            <div className="overflow-hidden mt-1">
              <p className="text-sm text-foreground-secondary animate-scroll-left whitespace-nowrap">
                Latest updates to your tool catalog
              </p>
            </div>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-secondary" />
            <Input
              type="text"
              placeholder="Search recent tools..."
              className="pl-10"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>
        
        <RecentToolsTable searchQuery={searchQuery} />
      </div>
    </div>
  );
}
