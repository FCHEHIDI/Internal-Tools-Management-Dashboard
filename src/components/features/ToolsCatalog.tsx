import { ExternalLink, Edit, Trash2, Users, DollarSign } from 'lucide-react';
import { Card, Badge } from '@/components/ui';
import { formatCurrency } from '@/lib/utils';
import { Tool } from '@/types';

// Mock data - will be replaced with API
const mockTools: Tool[] = [
  {
    id: 1,
    name: 'Slack',
    description: 'Team communication and collaboration platform for messaging and file sharing',
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
    description: 'Collaborative design and prototyping tool for UI/UX designers',
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
    description: 'Project management and issue tracking for agile teams',
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
    description: 'CRM and marketing automation platform',
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
    description: 'All-in-one workspace for notes, docs, and collaboration',
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
    description: 'Monitoring and analytics platform for infrastructure and applications',
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
];

export function ToolsCatalog() {
  return (
    <div>
      {/* Header with count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-foreground-secondary">
          Showing <span className="font-medium text-foreground">{mockTools.length}</span> tools
        </p>
        <select className="px-3 py-2 bg-surface border border-border rounded-lg text-sm text-foreground">
          <option>Sort by: Recently Updated</option>
          <option>Sort by: Name (A-Z)</option>
          <option>Sort by: Cost (High to Low)</option>
          <option>Sort by: Cost (Low to High)</option>
          <option>Sort by: Users (Most to Least)</option>
        </select>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockTools.map((tool) => (
          <Card key={tool.id} className="p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center text-white font-bold text-xl">
                  {tool.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{tool.name}</h3>
                    <Badge status={tool.status} size="sm">
                      {tool.status.charAt(0).toUpperCase() + tool.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-foreground-secondary">{tool.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
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
                  className="p-2 hover:bg-surface-hover rounded-lg transition-colors text-status-unused"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-sm text-foreground-secondary mt-3 line-clamp-2">
              {tool.description}
            </p>

            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-foreground-secondary">
                  <Users className="w-4 h-4" />
                  <span>{tool.active_users_count} users</span>
                </div>
                <div className="flex items-center gap-1 text-foreground-secondary">
                  <span className="text-xs">Department:</span>
                  <span className="font-medium text-foreground">{tool.owner_department}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4 text-foreground-secondary" />
                <span className="font-semibold text-foreground">
                  {formatCurrency(tool.monthly_cost)}
                </span>
                <span className="text-xs text-foreground-secondary">/mo</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <button className="px-4 py-2 border border-border rounded-lg hover:bg-surface-hover transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed">
          Previous
        </button>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-lg bg-primary text-white font-medium">1</button>
          <button className="w-8 h-8 rounded-lg hover:bg-surface-hover transition-colors">
            2
          </button>
          <button className="w-8 h-8 rounded-lg hover:bg-surface-hover transition-colors">
            3
          </button>
        </div>
        <button className="px-4 py-2 border border-border rounded-lg hover:bg-surface-hover transition-colors text-sm font-medium">
          Next
        </button>
      </div>
    </div>
  );
}
