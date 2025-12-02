import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

/**
 * Mock data representing 6 months of cost evolution.
 * 
 * @production In a real application, this would come from:
 * - TanStack Query hook: useQuery(['cost-analytics', { period: '6months' }])
 * - API endpoint: GET /api/analytics/cost-evolution?period=6m
 * - Props passed from parent with date range filters
 * 
 * @data-structure
 * - month: Display label for X-axis
 * - cost: Actual spending per month
 * - budget: Allocated budget for comparison
 */
const data = [
  { month: 'Jan', cost: 24500, budget: 26000 },
  { month: 'Feb', cost: 25200, budget: 26000 },
  { month: 'Mar', cost: 26800, budget: 27000 },
  { month: 'Apr', cost: 27500, budget: 28000 },
  { month: 'May', cost: 28200, budget: 29000 },
  { month: 'Jun', cost: 28750, budget: 30000 },
];

/**
 * CostChart - Line chart visualizing monthly spend evolution vs budget.
 * 
 * @component
 * @returns {JSX.Element} Responsive line chart with dual lines (actual vs budget)
 * 
 * @chart-library Recharts
 * Chosen for: Composability, React-friendly API, responsive by default
 * Alternative: Chart.js (imperative), Victory (heavier bundle)
 * 
 * @ux-decisions
 * - Dual lines: Easy comparison between actual and budgeted costs
 * - Dashed line for budget: Visual distinction from actual data
 * - Currency formatting: Uses k suffix for readability (€24k vs €24,000)
 * - Hover tooltips: Shows exact values with full formatting
 * 
 * @accessibility
 * - Color not sole indicator (solid vs dashed lines)
 * - Tooltips provide screen reader content
 * - Semantic color usage via CSS variables (theme-aware)
 */
export function CostChart() {
  return (
    <div className="h-[300px]">
      {/* ResponsiveContainer: Ensures chart adapts to parent container size */}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          {/* Grid lines for easier value reading */}
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          
          {/* X-Axis: Month labels */}
          <XAxis 
            dataKey="month" 
            className="text-xs fill-foreground-secondary"
            stroke="hsl(var(--border))" // Theme-aware border color
          />
          
          {/* Y-Axis: Cost values with compact formatting */}
          <YAxis 
            className="text-xs fill-foreground-secondary"
            stroke="hsl(var(--border))"
            tickFormatter={(value) => `€${value / 1000}k`} // Convert 24500 → €24k
          />
          {/* 
            Tooltip: Shows detailed values on hover
            @styling: Matches app theme using CSS variables
            @formatter: Displays full currency with thousand separators (€24,500)
          */}
          <Tooltip
            contentStyle={{
              backgroundColor: '#374151',
              border: '1px solid #6b7280',
              borderRadius: '8px',
              color: '#fef3c7',
            }}
            formatter={(value: number) => [`€${value.toLocaleString()}`, '']}
          />
          
          {/* Legend: Identifies which line represents what */}
          <Legend 
            wrapperStyle={{
              paddingTop: '20px',
              fontSize: '14px',
              color: 'hsl(var(--foreground-secondary))',
            }}
          />
          
          {/* 
            Primary Line: Actual Cost
            @type: monotone = smooth curves between points
            @stroke: Primary brand color for emphasis
            @dots: Visible data points for precision
            @activeDot: Larger on hover for interactivity
          */}
          <Line
            type="monotone"
            dataKey="cost"
            name="Actual Cost"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--primary))', r: 4 }}
            activeDot={{ r: 6 }}
          />
          
          {/* 
            Secondary Line: Budget
            @visual-distinction: Dashed line to differentiate from actual
            @dot: false = cleaner look for reference line
            @color: Muted to de-emphasize (it's context, not primary data)
          */}
          <Line
            type="monotone"
            dataKey="budget"
            name="Budget"
            stroke="hsl(var(--foreground-secondary))"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
