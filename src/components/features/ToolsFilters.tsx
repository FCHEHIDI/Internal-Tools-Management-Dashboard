import { Card, CardContent, CardHeader, CardTitle, Label, Badge } from '@/components/ui';
import { useState } from 'react';

export function ToolsFilters() {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  const statuses = [
    { value: 'active', label: 'Active', count: 18 },
    { value: 'expiring', label: 'Expiring', count: 4 },
    { value: 'unused', label: 'Unused', count: 2 },
  ];

  const departments = [
    { value: 'engineering', label: 'Engineering', count: 12 },
    { value: 'design', label: 'Design', count: 5 },
    { value: 'marketing', label: 'Marketing', count: 6 },
    { value: 'operations', label: 'Operations', count: 4 },
    { value: 'sales', label: 'Sales', count: 3 },
  ];

  const categories = [
    { value: 'development', label: 'Development', count: 8 },
    { value: 'design', label: 'Design', count: 4 },
    { value: 'communication', label: 'Communication', count: 5 },
    { value: 'productivity', label: 'Productivity', count: 6 },
    { value: 'marketing', label: 'Marketing', count: 3 },
  ];

  return (
    <div className="space-y-6">
      {/* Status Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {statuses.map((status) => (
            <button
              key={status.value}
              onClick={() => setSelectedStatus(status.value === selectedStatus ? null : status.value)}
              className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                selectedStatus === status.value
                  ? 'bg-primary/10 text-primary'
                  : 'hover:bg-surface-hover'
              }`}
            >
              <span className="text-sm font-medium">{status.label}</span>
              <Badge size="sm" variant="default">
                {status.count}
              </Badge>
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Department Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Department</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {departments.map((dept) => (
            <button
              key={dept.value}
              onClick={() =>
                setSelectedDepartment(dept.value === selectedDepartment ? null : dept.value)
              }
              className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                selectedDepartment === dept.value
                  ? 'bg-primary/10 text-primary'
                  : 'hover:bg-surface-hover'
              }`}
            >
              <span className="text-sm font-medium">{dept.label}</span>
              <Badge size="sm" variant="default">
                {dept.count}
              </Badge>
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Category Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Category</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.value}
              className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-surface-hover transition-colors"
            >
              <span className="text-sm font-medium">{category.label}</span>
              <Badge size="sm" variant="default">
                {category.count}
              </Badge>
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Cost Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Cost Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Min Cost (€)</Label>
              <input
                type="number"
                placeholder="0"
                className="w-full mt-1 px-3 py-2 bg-surface border border-border rounded-lg text-sm"
              />
            </div>
            <div>
              <Label>Max Cost (€)</Label>
              <input
                type="number"
                placeholder="10000"
                className="w-full mt-1 px-3 py-2 bg-surface border border-border rounded-lg text-sm"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
