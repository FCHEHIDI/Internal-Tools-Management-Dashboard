import { useState } from 'react';
import { TrendingUp, DollarSign, Users, BarChart3, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Input } from '@/components/ui';
import { CostChart } from '@/components/features/CostChart';
import { DepartmentChart } from '@/components/features/DepartmentChart';
import { UsageChart } from '@/components/features/UsageChart';

export function Analytics() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-h1 font-bold text-foreground">Analytics</h1>
        <p className="text-foreground-secondary mt-2">
          Insights and analytics for your tools usage and spending
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-secondary" />
        <Input
          type="text"
          placeholder="Search analytics data..."
          className="pl-10"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 transition-all duration-300 hover:shadow-neon hover:scale-[1.02] hover:border-border-neon cursor-pointer border-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground-secondary">Total Monthly Spend</p>
              <p className="text-2xl font-bold text-foreground mt-1">€28,750</p>
              <p className="text-sm text-status-active mt-1 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +12% from last month
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-primary/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <DollarSign className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6 transition-all duration-300 hover:shadow-neon hover:scale-[1.02] hover:border-border-neon cursor-pointer border-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground-secondary">Average Cost per User</p>
              <p className="text-2xl font-bold text-foreground mt-1">€156</p>
              <p className="text-sm text-status-expiring mt-1 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +6.8% from last month
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-info/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6 transition-all duration-300 hover:shadow-neon hover:scale-[1.02] hover:border-border-neon cursor-pointer border-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground-secondary">Tools Utilization</p>
              <p className="text-2xl font-bold text-foreground mt-1">87%</p>
              <p className="text-sm text-status-active mt-1 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +3.2% from last month
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-success/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <BarChart3 className="w-6 h-6 text-status-active" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost Evolution */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Spend Evolution</CardTitle>
            <p className="text-sm text-foreground-secondary mt-1">
              Track your spending trends over time
            </p>
          </CardHeader>
          <CardContent>
            <CostChart />
          </CardContent>
        </Card>

        {/* Department Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Department Cost Breakdown</CardTitle>
            <p className="text-sm text-foreground-secondary mt-1">
              Cost distribution across departments
            </p>
          </CardHeader>
          <CardContent>
            <DepartmentChart />
          </CardContent>
        </Card>
      </div>

      {/* Usage Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Top Tools by Usage</CardTitle>
          <p className="text-sm text-foreground-secondary mt-1">
            Most actively used tools in your organization
          </p>
        </CardHeader>
        <CardContent>
          <UsageChart />
        </CardContent>
      </Card>
    </div>
  );
}
