import { ArrowUpDown, MoreVertical, ExternalLink, Edit } from 'lucide-react';
import { Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, LoadingSpinner, ErrorMessage } from '@/components/ui';
import { formatCurrency, formatDate } from '@/lib/utils';
import { useTools } from '@/hooks';
import { useModalStore } from '@/stores';
import { Tool } from '@/types';
import { useMemo } from 'react';

/**
 * RecentToolsTable - Dashboard table showing recently updated tools.
 * 
 * @component
 * @param {string} searchQuery - Optional search query to filter tools
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
 * - Search filtering by name, category, or department
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

interface RecentToolsTableProps {
  searchQuery?: string;
}

export function RecentToolsTable({ searchQuery = '' }: RecentToolsTableProps) {
  // Fetch 8 most recently updated tools
  const { data: toolsResponse, isLoading, error } = useTools({
    _limit: 8,
    _sort: 'updated_at',
    _order: 'desc',
  });

  const { openToolDetails, openEditToolModal } = useModalStore();

  // Filter tools based on search query
  const filteredTools = useMemo(() => {
    const tools = toolsResponse?.data || [];
    
    if (!searchQuery.trim()) {
      return tools;
    }

    const query = searchQuery.toLowerCase();
    return tools.filter((tool) => 
      (tool.name || '').toLowerCase().includes(query) ||
      (tool.category || '').toLowerCase().includes(query) ||
      (tool.owner_department || '').toLowerCase().includes(query)
    );
  }, [toolsResponse, searchQuery]);

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
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message="Failed to load recent tools." />;
  }

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
        {filteredTools.map((tool) => (
          <TableRow key={tool.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center text-white font-semibold text-sm">
                  {tool.name?.charAt(0) || '?'}
                </div>
                <div>
                  <div className="font-medium">{tool.name || 'Unknown'}</div>
                  <div className="text-xs text-foreground-secondary">{tool.category || 'N/A'}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <span className="text-foreground-secondary">{tool.owner_department || 'N/A'}</span>
            </TableCell>
            <TableCell>
              <span className="font-medium">{tool.active_users_count || 0}</span>
            </TableCell>
            <TableCell>
              <div>
                <div className="font-medium">{formatCurrency(tool.monthly_cost || 0)}</div>
                {tool.monthly_cost !== tool.previous_month_cost && (
                  <div className="text-xs text-foreground-secondary">
                    {tool.monthly_cost > tool.previous_month_cost ? '+' : ''}
                    {formatCurrency(tool.monthly_cost - tool.previous_month_cost)}
                  </div>
                )}
              </div>
            </TableCell>
            <TableCell>
              <Badge status={tool.status || 'active'} size="sm">
                {(tool.status || 'active').charAt(0).toUpperCase() + (tool.status || 'active').slice(1)}
              </Badge>
            </TableCell>
            <TableCell>
              <span className="text-sm text-foreground-secondary">
                {tool.updated_at ? formatDate(tool.updated_at) : 'N/A'}
              </span>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-1">
                <button
                  onClick={() => handleViewDetails(tool)}
                  className="p-2 sm:p-2.5 hover:bg-surface-hover rounded-lg transition-colors min-h-[44px] sm:min-h-0 min-w-[44px] sm:min-w-0 flex items-center justify-center"
                  title="View details"
                  aria-label="View details"
                >
                  <ExternalLink className="w-4 h-4 text-foreground-secondary hover:text-primary" />
                </button>
                <button
                  onClick={() => handleEdit(tool)}
                  className="p-2 sm:p-2.5 hover:bg-surface-hover rounded-lg transition-colors min-h-[44px] sm:min-h-0 min-w-[44px] sm:min-w-0 flex items-center justify-center"
                  title="Edit"
                  aria-label="Edit tool"
                >
                  <Edit className="w-4 h-4 text-foreground-secondary hover:text-primary" />
                </button>
                <button
                  onClick={() => handleMore(tool)}
                  className="p-2 sm:p-2.5 hover:bg-surface-hover rounded-lg transition-colors min-h-[44px] sm:min-h-0 min-w-[44px] sm:min-w-0 flex items-center justify-center"
                  title="More options"
                  aria-label="More options"
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
