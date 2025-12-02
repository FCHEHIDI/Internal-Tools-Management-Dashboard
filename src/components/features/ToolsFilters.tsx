import { Card, CardContent, CardHeader, CardTitle, Label, Badge } from '@/components/ui';

interface ToolsFiltersProps {
  selectedFilters: {
    categories: string[];
    departments: string[];
    status: string[];
  };
  onFilterChange: (filters: {
    categories: string[];
    departments: string[];
    status: string[];
  }) => void;
}

/**
 * ToolsFilters - Sidebar filter component for the tools catalog.
 * 
 * @component
 * @returns {JSX.Element} Multi-category filter sidebar
 * 
 * @architecture Currently uses controlled component pattern
 * Production should integrate with:
 * - Zustand store for global filter state
 * - URL search params for shareable filtered views
 * - TanStack Query for dynamic count updates
 * 
 * @filter-strategy
 * - Status: Radio behavior (single selection, toggle off)
 * - Department: Radio behavior (single selection, toggle off)
 * - Category: Multi-select checkboxes (future)
 * - Cost Range: Numeric range inputs
 * 
 * @ux-patterns
 * - Counts next to options (transparency, prevent dead ends)
 * - Active state highlighting (clear visual feedback)
 * - Toggle behavior (click again to deselect)
 * - Sticky sidebar (remains visible during scroll - future)
 */
export function ToolsFilters({ selectedFilters, onFilterChange }: ToolsFiltersProps) {
  /**
   * Toggle status filter
   */
  const toggleStatus = (value: string) => {
    const newStatus = selectedFilters.status.includes(value)
      ? []
      : [value];
    onFilterChange({ ...selectedFilters, status: newStatus });
  };

  /**
   * Toggle department filter
   */
  const toggleDepartment = (value: string) => {
    const newDepartments = selectedFilters.departments.includes(value)
      ? []
      : [value];
    onFilterChange({ ...selectedFilters, departments: newDepartments });
  };

  /**
   * Toggle category filter
   */
  const toggleCategory = (value: string) => {
    const newCategories = selectedFilters.categories.includes(value)
      ? selectedFilters.categories.filter(c => c !== value)
      : [...selectedFilters.categories, value];
    onFilterChange({ ...selectedFilters, categories: newCategories });
  };

  /**
   * Filter option arrays with counts.
   * 
   * @production Replace with:
   * - API endpoint: GET /api/filters/counts
   * - Updated dynamically based on active filters
   * - Example: When "Engineering" selected, status counts show Engineering tools only
   * 
   * @data-structure Array of {value, label, count}
   * - value: Internal identifier for filtering
   * - label: User-facing display text
   * - count: Number of tools matching this criteria
   */
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
                selectedFilters.status.includes(status.value)
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
                selectedFilters.departments.includes(dept.value)
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
                selectedFilters.categories.includes(category.value)
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
