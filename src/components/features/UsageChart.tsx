import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { LoadingSpinner, ErrorMessage } from '@/components/ui';
import { useTopTools } from '@/hooks';

const PRIMARY_COLOR = '#60a5fa'; // Light blue
const HOVER_COLOR = '#d4af37'; // Metallic Gold

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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { data: topToolsData, isLoading, error } = useTopTools(6);

  const onBarEnter = (_: unknown, index: number) => {
    setActiveIndex(index);
  };

  const onBarLeave = () => {
    setActiveIndex(null);
  };

  if (isLoading) {
    return <LoadingSpinner className="h-[300px]" />;
  }

  if (error || !topToolsData) {
    return <ErrorMessage message="Failed to load usage data" className="h-[300px]" />;
  }

  const data = topToolsData;

  const handleClick = (data: unknown) => {
    const bar = data as { name: string; users: number; cost: number };
    console.log('Selected tool:', bar.name, 'Users:', bar.users);
    // In production: navigate to tool details, show breakdown, filter views
  };

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        {/* layout="vertical": Horizontal bars (counterintuitive naming by Recharts) */}
        <BarChart data={data} layout="vertical">
          {/* 
            Grid: Only vertical lines (horizontal={false})
            Reason: Horizontal lines would clutter between closely-spaced bars
          */}
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" horizontal={false} fill="transparent" />
          
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
            cursor={{ fill: 'rgba(212, 175, 55, 0.1)', stroke: 'rgba(212, 175, 55, 0.3)', strokeWidth: 1 }}
            contentStyle={{
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              borderRadius: '8px',
              fontSize: '12px',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 0 20px rgba(212, 175, 55, 0.2)',
            }}
            itemStyle={{
              color: '#d4af37',
              fontSize: '12px',
            }}
            labelStyle={{
              color: '#d4af37',
              fontSize: '12px',
              fontWeight: 'bold',
            }}
            formatter={(value: number, name: string) => {
              if (name === 'users') return [`${value} users`];
              return [`\u20ac${value.toLocaleString()}`];
            }}
          />
          
          {/* 
            Bar configuration:
            @dataKey: "users" = the metric being visualized
            @radius: [topLeft, topRight, bottomRight, bottomLeft]
                     [0, 8, 8, 0] = rounded right corners only (bar direction)
            @cells: Each bar colored individually from colors array
            @modulo: Wraps around if more data points than colors
            @opacity: Dim non-active bars on hover for focus
          */}
          <Bar 
            dataKey="users" 
            radius={[0, 8, 8, 0]}
            onClick={handleClick}
            style={{ cursor: 'pointer' }}
            fill={PRIMARY_COLOR}
          >
            {data.map((_entry: { name: string; users: number; cost: number }, index: number) => (
              <Cell 
                key={`cell-${index}`} 
                fill={PRIMARY_COLOR}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
