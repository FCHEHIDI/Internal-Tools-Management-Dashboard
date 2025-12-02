import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

/**
 * Department cost breakdown data.
 * 
 * @production This would be fetched from:
 * - API: GET /api/analytics/department-costs
 * - Aggregated from tools table: GROUP BY department, SUM(monthlyCost)
 * - Could include filters: date range, status (active only), etc.
 * 
 * @color-strategy
 * Each department has a semantic color from the design system:
 * - Engineering (primary): Main focus department
 * - Sales (success): Revenue-generating
 * - Marketing (warning): High-visibility spend
 * - Design (info): Creative/support
 * - Support (danger): Operational/critical
 * 
 * @note Colors should be configurable per organization's needs
 */
const data = [
  { name: 'Engineering', value: 12500, color: 'hsl(var(--primary))' },
  { name: 'Sales', value: 8200, color: 'hsl(var(--success))' },
  { name: 'Marketing', value: 4800, color: 'hsl(var(--warning))' },
  { name: 'Design', value: 2100, color: 'hsl(var(--info))' },
  { name: 'Support', value: 1150, color: 'hsl(var(--danger))' },
];

/**
 * DepartmentChart - Donut chart showing cost distribution across departments.
 * 
 * @component
 * @returns {JSX.Element} Interactive donut chart with percentage labels
 * 
 * @why-donut-not-pie
 * Donut charts (pie with inner radius) are preferred because:
 * - Better for displaying central summary info (could show total in center)
 * - Easier to compare segment sizes
 * - Modern aesthetic that matches design system
 * 
 * @data-viz-principle
 * Pie charts work best with:
 * - 5-7 segments max (we have 5)
 * - Clear percentage differences (not all ~20%)
 * - Part-to-whole relationships (department costs = total budget)
 */
export function DepartmentChart() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          {/* 
            Pie component configuration:
            @cx, @cy: Center position (50% = centered)
            @innerRadius: 60px creates the donut hole
            @outerRadius: 100px defines segment size
            @paddingAngle: 2px gap between segments for clarity
            @label: Custom formatter showing "Department XX%"
          */}
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60} // Donut hole size
            outerRadius={100} // Chart radius
            paddingAngle={2} // Visual separation between segments
            dataKey="value" // Which field contains the numeric data
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelStyle={{
              fontSize: '12px',
              fill: 'hsl(var(--foreground))', // Theme-aware text color
            }}
          >
            {/* 
              Cell mapping: Apply individual colors to each segment
              @pattern: Required by Recharts to color segments differently
              @key: Stable keys prevent unnecessary re-renders
            */}
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--surface))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              color: 'hsl(var(--foreground))',
            }}
            formatter={(value: number) => [`€${value.toLocaleString()}`, '']}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            wrapperStyle={{
              fontSize: '14px',
              color: 'hsl(var(--foreground-secondary))',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
