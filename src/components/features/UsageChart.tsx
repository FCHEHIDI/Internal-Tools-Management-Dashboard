import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

/**
 * Top tools by active user count.
 * 
 * @production Data source:
 * - API: GET /api/analytics/top-tools?sortBy=users&limit=6
 * - Calculated from: users_count field in tools table
 * - Could filter by: department, date range, status
 * 
 * @sorting Intentionally sorted by user count descending
 * Shows most-adopted tools first (key insight for stakeholders)
 * 
 * @insight This data helps identify:
 * - Which tools have high adoption (ROI indicators)
 * - Cost per user efficiency (cost / users ratio)
 * - Potential consolidation opportunities (overlapping tools)
 */
const data = [
  { name: 'Slack', users: 156, cost: 5890 },
  { name: 'GitHub', users: 124, cost: 4250 },
  { name: 'Figma', users: 89, cost: 3780 },
  { name: 'Jira', users: 78, cost: 3200 },
  { name: 'Notion', users: 145, cost: 2950 },
  { name: 'Zoom', users: 156, cost: 2750 },
];

/**
 * Color palette for bar chart diversity.
 * 
 * @design-system Uses semantic colors from CSS variables
 * @pattern Each bar gets a unique color for visual distinction
 * @why Not just one color: Helps users track specific tools across the chart
 */
const colors = [
  'hsl(var(--primary))',
  'hsl(var(--success))',
  'hsl(var(--warning))',
  'hsl(var(--info))',
  'hsl(var(--danger))',
  'hsl(var(--purple))',
];

/**
 * UsageChart - Horizontal bar chart displaying top tools by usage.
 * 
 * @component
 * @returns {JSX.Element} Horizontal bar chart with color-coded tools
 * 
 * @why-horizontal
 * Horizontal bars are better than vertical when:
 * - Labels are text (tool names) - easier to read horizontally
 * - Comparing magnitudes rather than trends over time
 * - Space-efficient in dashboard layouts
 * 
 * @chart-type Bar Chart
 * Best for: Categorical comparisons, ranking, part-to-whole analysis
 */
export function UsageChart() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        {/* layout="vertical": Horizontal bars (counterintuitive naming by Recharts) */}
        <BarChart data={data} layout="vertical">
          {/* 
            Grid: Only vertical lines (horizontal={false})
            Reason: Horizontal lines would clutter between closely-spaced bars
          */}
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" horizontal={false} />
          
          {/* 
            X-Axis: Numeric values (user count)
            @type: number = continuous scale
            @position: Bottom (for vertical layout)
          */}
          <XAxis 
            type="number"
            className="text-xs fill-foreground-secondary"
            stroke="hsl(var(--border))"
          />
          
          {/* 
            Y-Axis: Tool names (categories)
            @type: category = discrete labels
            @width: 80px ensures tool names don't truncate
            @dataKey: "name" field contains the labels
          */}
          <YAxis 
            type="category"
            dataKey="name"
            className="text-xs fill-foreground-secondary"
            stroke="hsl(var(--border))"
            width={80}
          />
          {/* 
            Tooltip with conditional formatting:
            @formatter: Shows both user count and cost in readable format
            @logic: Checks field name to apply correct formatting
            - users: "156 users"
            - cost: "€5,890"
          */}
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--surface))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              color: 'hsl(var(--foreground))',
            }}
            formatter={(value: number, name: string) => {
              if (name === 'users') return [`${value} users`, 'Active Users'];
              return [`€${value.toLocaleString()}`, 'Monthly Cost'];
            }}
          />
          
          {/* 
            Bar configuration:
            @dataKey: "users" = the metric being visualized
            @radius: [topLeft, topRight, bottomRight, bottomLeft]
                     [0, 8, 8, 0] = rounded right corners only (bar direction)
            @cells: Each bar colored individually from colors array
            @modulo: Wraps around if more data points than colors
          */}
          <Bar dataKey="users" radius={[0, 8, 8, 0]}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
