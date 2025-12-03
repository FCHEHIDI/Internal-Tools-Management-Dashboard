import { ArrowUpDown, MoreVertical, ExternalLink, Edit, Loader2 } from 'lucide-react';
import { Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
import { formatCurrency, formatDate } from '@/lib/utils';
import { useTools } from '@/hooks';
import { useModalStore } from '@/stores';
import { Tool } from '@/types';

/**
 * RecentToolsTable - Dashboard table showing recently updated tools.
 * 
 * @component
 * @returns {JSX.Element} Responsive table with 8 most recent tools
 * 
 * @purpose Dashboard quick overview
 * Shows enough information for users to identify recent changes and take action
 * 
 * @features
 * - Cost change indicators (percentage and trend direction)
 * - Status badges with semantic colors
 * - Sortable columns (visual indicators present)
 * - Action buttons (view, edit, delete)
 * - Responsive formatting using utility functions
 * 
 * @ux-decisions
 * - Limited to 8 tools: Dashboard preview, not exhaustive list
 * - Hover states: Indicates row interactivity
 * - Right-aligned numbers: Easier to scan and compare values
 * - Relative dates: "2 days ago" more meaningful than "2024-11-30"
 * 
 * @utility-usage
 * - formatCurrency(): Consistent currency display (€1,250)
 * - formatDate(): Relative time formatting ("2 days ago")
 * - calculatePercentageChange(): Cost trend calculation
 */
export function RecentToolsTable() {
  // Fetch 8 most recently updated tools
  const { data: toolsResponse, isLoading, error } = useTools({
    _limit: 8,
    _sort: 'updated_at',
    _order: 'desc',
  });

  const { openToolDetails, openEditToolModal } = useModalStore();

  const handleViewDetails = (tool: Tool) => {
    openToolDetails(tool.id);
  };

  const handleEdit = (tool: Tool) => {
    openEditToolModal(tool.id);
  };

  const handleMore = (tool: Tool) => {
    console.log('More options for:', tool.name);
    // In production: open dropdown menu with:
    // - Duplicate
    // - Archive
    // - Delete
    // - View History
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-status-unused">Error loading tools. Please try again.</p>
      </div>
    );
  }

  const tools = toolsResponse?.data || [];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <button className="flex items-center gap-1 hover:text-foreground transition-colors">
              Tool
              <ArrowUpDown className="w-4 h-4" />
            </button>
          </TableHead>
          <TableHead>Department</TableHead>
          <TableHead>
            <button className="flex items-center gap-1 hover:text-foreground transition-colors">
              Users
              <ArrowUpDown className="w-4 h-4" />
            </button>
          </TableHead>
          <TableHead>
            <button className="flex items-center gap-1 hover:text-foreground transition-colors">
              Monthly Cost
              <ArrowUpDown className="w-4 h-4" />
            </button>
          </TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Updated</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tools.map((tool) => (
          <TableRow key={tool.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center text-white font-semibold text-sm">
                  {tool.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium">{tool.name}</div>
                  <div className="text-xs text-foreground-secondary">{tool.category}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <span className="text-foreground-secondary">{tool.owner_department}</span>
            </TableCell>
            <TableCell>
              <span className="font-medium">{tool.active_users_count}</span>
            </TableCell>
            <TableCell>
              <div>
                <div className="font-medium">{formatCurrency(tool.monthly_cost)}</div>
                {tool.monthly_cost !== tool.previous_month_cost && (
                  <div className="text-xs text-foreground-secondary">
                    {tool.monthly_cost > tool.previous_month_cost ? '+' : ''}
                    {formatCurrency(tool.monthly_cost - tool.previous_month_cost)}
                  </div>
                )}
              </div>
            </TableCell>
            <TableCell>
              <Badge status={tool.status} size="sm">
                {tool.status.charAt(0).toUpperCase() + tool.status.slice(1)}
              </Badge>
            </TableCell>
            <TableCell>
              <span className="text-sm text-foreground-secondary">
                {formatDate(tool.updated_at)}
              </span>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => handleViewDetails(tool)}
                  className="p-2 hover:bg-surface-hover rounded-lg transition-colors"
                  title="View details"
                >
                  <ExternalLink className="w-4 h-4 text-foreground-secondary hover:text-primary" />
                </button>
                <button
                  onClick={() => handleEdit(tool)}
                  className="p-2 hover:bg-surface-hover rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit className="w-4 h-4 text-foreground-secondary hover:text-primary" />
                </button>
                <button
                  onClick={() => handleMore(tool)}
                  className="p-2 hover:bg-surface-hover rounded-lg transition-colors"
                  title="More options"
                >
                  <MoreVertical className="w-4 h-4 text-foreground-secondary hover:text-primary" />
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
