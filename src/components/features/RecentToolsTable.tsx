import { ArrowUpDown, MoreVertical, ExternalLink, Edit, Trash2 } from 'lucide-react';
import { Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Tool } from '@/types';

// Mock data - will be replaced with API data
const mockTools: Tool[] = [
  {
    id: 1,
    name: 'Slack',
    description: 'Team communication platform',
    vendor: 'Slack Technologies',
    category: 'Communication',
    monthly_cost: 1250,
    previous_month_cost: 1180,
    owner_department: 'Engineering',
    status: 'active',
    website_url: 'https://slack.com',
    active_users_count: 42,
    icon_url: '',
    created_at: '2023-01-10T08:00:00Z',
    updated_at: '2024-11-30T15:30:00Z',
  },
  {
    id: 2,
    name: 'Figma',
    description: 'Design and prototyping tool',
    vendor: 'Figma Inc',
    category: 'Design',
    monthly_cost: 450,
    previous_month_cost: 450,
    owner_department: 'Design',
    status: 'active',
    website_url: 'https://figma.com',
    active_users_count: 12,
    icon_url: '',
    created_at: '2023-02-15T10:00:00Z',
    updated_at: '2024-11-29T12:00:00Z',
  },
  {
    id: 3,
    name: 'Jira',
    description: 'Project management tool',
    vendor: 'Atlassian',
    category: 'Development',
    monthly_cost: 850,
    previous_month_cost: 800,
    owner_department: 'Engineering',
    status: 'active',
    website_url: 'https://jira.com',
    active_users_count: 35,
    icon_url: '',
    created_at: '2023-01-05T09:00:00Z',
    updated_at: '2024-11-28T14:20:00Z',
  },
  {
    id: 4,
    name: 'HubSpot',
    description: 'CRM and marketing platform',
    vendor: 'HubSpot',
    category: 'Marketing',
    monthly_cost: 1500,
    previous_month_cost: 1500,
    owner_department: 'Marketing',
    status: 'expiring',
    website_url: 'https://hubspot.com',
    active_users_count: 18,
    icon_url: '',
    created_at: '2023-03-20T11:00:00Z',
    updated_at: '2024-11-27T16:45:00Z',
  },
  {
    id: 5,
    name: 'Notion',
    description: 'Documentation and collaboration',
    vendor: 'Notion Labs',
    category: 'Productivity',
    monthly_cost: 320,
    previous_month_cost: 280,
    owner_department: 'Operations',
    status: 'active',
    website_url: 'https://notion.so',
    active_users_count: 28,
    icon_url: '',
    created_at: '2023-04-10T08:30:00Z',
    updated_at: '2024-11-26T10:15:00Z',
  },
  {
    id: 6,
    name: 'Datadog',
    description: 'Monitoring and analytics',
    vendor: 'Datadog Inc',
    category: 'Development',
    monthly_cost: 2100,
    previous_month_cost: 2100,
    owner_department: 'Engineering',
    status: 'active',
    website_url: 'https://datadog.com',
    active_users_count: 15,
    icon_url: '',
    created_at: '2023-02-01T07:00:00Z',
    updated_at: '2024-11-25T13:30:00Z',
  },
  {
    id: 7,
    name: 'Zoom',
    description: 'Video conferencing',
    vendor: 'Zoom Video Communications',
    category: 'Communication',
    monthly_cost: 180,
    previous_month_cost: 180,
    owner_department: 'Operations',
    status: 'unused',
    website_url: 'https://zoom.us',
    active_users_count: 5,
    icon_url: '',
    created_at: '2023-01-15T09:00:00Z',
    updated_at: '2024-11-24T11:00:00Z',
  },
  {
    id: 8,
    name: 'GitHub',
    description: 'Code repository and CI/CD',
    vendor: 'GitHub Inc',
    category: 'Development',
    monthly_cost: 890,
    previous_month_cost: 850,
    owner_department: 'Engineering',
    status: 'active',
    website_url: 'https://github.com',
    active_users_count: 38,
    icon_url: '',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2024-11-23T09:45:00Z',
  },
];

export function RecentToolsTable() {
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
        {mockTools.map((tool) => (
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
                  className="p-2 hover:bg-surface-hover rounded-lg transition-colors"
                  title="View details"
                >
                  <ExternalLink className="w-4 h-4 text-foreground-secondary" />
                </button>
                <button
                  className="p-2 hover:bg-surface-hover rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit className="w-4 h-4 text-foreground-secondary" />
                </button>
                <button
                  className="p-2 hover:bg-surface-hover rounded-lg transition-colors"
                  title="More options"
                >
                  <MoreVertical className="w-4 h-4 text-foreground-secondary" />
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
