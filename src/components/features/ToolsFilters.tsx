import { Card, CardContent, CardHeader, CardTitle, Label, Badge } from '@/components/ui';
import { useFiltersStore } from '@/stores';
import { useTools } from '@/hooks';
import { useMemo } from 'react';

/**
 * ToolsFilters - Sidebar filter component for the tools catalog.
 * 
 * @component
 * @returns {JSX.Element} Multi-category filter sidebar
 * 
 * @architecture Uses Zustand store for global filter state
 * Production enhancements:
 * - URL search params for shareable filtered views
 * - TanStack Query for dynamic count updates
 * 
 * @filter-strategy
 * - Status: Radio behavior (single selection, toggle off)
 * - Department: Radio behavior (single selection, toggle off)
 * - Category: Multi-select checkboxes
 * - Cost Range: Numeric range inputs (future)
 * 
 * @ux-patterns
 * - Counts next to options (transparency, prevent dead ends)
 * - Active state highlighting (clear visual feedback)
 * - Toggle behavior (click again to deselect)
 * - Sticky sidebar (remains visible during scroll - future)
 */
export function ToolsFilters() {
  const { 
    selectedCategories, 
    selectedDepartments, 
    selectedStatus,
    minCost,
    maxCost,
    toggleCategory,
    toggleDepartment,
    toggleStatus,
    setMinCost,
    setMaxCost,
  } = useFiltersStore();

  // Fetch all tools to calculate accurate counts
  const { data: allToolsResponse } = useTools({ _limit: 1000 });
  const allTools = allToolsResponse?.data || [];

  // Calculate actual counts based on current data
  const filterCounts = useMemo(() => {
    const statusCounts: Record<string, number> = { active: 0, expiring: 0, unused: 0 };
    const departmentCounts: Record<string, number> = {};
    const categoryCounts: Record<string, number> = {};

    allTools.forEach((tool) => {
      // Count status
      if (tool.status) {
        statusCounts[tool.status] = (statusCounts[tool.status] || 0) + 1;
      }
      
      // Count departments
      if (tool.owner_department) {
        departmentCounts[tool.owner_department] = (departmentCounts[tool.owner_department] || 0) + 1;
      }
      
      // Count categories
      if (tool.category) {
        categoryCounts[tool.category] = (categoryCounts[tool.category] || 0) + 1;
      }
    });

    return { statusCounts, departmentCounts, categoryCounts };
  }, [allTools]);

  const statuses = [
    { value: 'active', label: 'Active', count: filterCounts.statusCounts.active || 0 },
    { value: 'expiring', label: 'Expiring', count: filterCounts.statusCounts.expiring || 0 },
    { value: 'unused', label: 'Unused', count: filterCounts.statusCounts.unused || 0 },
  ];

  const departments = Object.entries(filterCounts.departmentCounts).map(([value, count]) => ({
    value: value.toLowerCase(),
    label: value,
    count,
  }));

  const categories = Object.entries(filterCounts.categoryCounts).map(([value, count]) => ({
    value: value.toLowerCase(),
    label: value,
    count,
  }));

  return (
    <div className="space-y-6">
      {/* 
        Status Filter Card:
        @pattern: Single-select with toggle-off capability
        @visual: Button list with active state highlighting
        @interaction: Click to select, click again to deselect (show all)
      */}
      {/* Status Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {statuses.map((status) => (
            <button
              key={status.value}
              onClick={() => toggleStatus(status.value)}
              className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                selectedStatus.includes(status.value)
                  ? 'bg-primary/10 text-primary' // Active: Primary accent
                  : 'hover:bg-surface-hover' // Hover: Subtle background
              }`}
            >
              <span className="text-sm font-medium">{status.label}</span>
              {/* 
                Count Badge:
                @purpose: Shows available items for transparency
                @ux-benefit: Prevents "empty result" frustration
                @production: Update dynamically when other filters change
              */}
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
              onClick={() => toggleDepartment(dept.value)}
              className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                selectedDepartments.includes(dept.value)
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
              onClick={() => toggleCategory(category.value)}
              className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                selectedCategories.includes(category.value)
                  ? 'bg-primary/10 text-primary'
                  : 'hover:bg-surface-hover'
              }`}
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
                value={minCost || ''}
                onChange={(e) => setMinCost(e.target.value ? Number(e.target.value) : null)}
                className="w-full mt-1 px-3 py-2 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <Label>Max Cost (€)</Label>
              <input
                type="number"
                placeholder="10000"
                value={maxCost || ''}
                onChange={(e) => setMaxCost(e.target.value ? Number(e.target.value) : null)}
                className="w-full mt-1 px-3 py-2 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
