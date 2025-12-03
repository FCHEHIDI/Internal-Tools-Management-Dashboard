import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Loader2 } from 'lucide-react';
import { useDepartmentCosts } from '@/hooks';

const PRIMARY_COLOR = '#60a5fa'; // Light blue
const HOVER_COLOR = '#c0c0c0'; // Silver

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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { data: departmentData, isLoading, error } = useDepartmentCosts();

  const onPieEnter = (_: unknown, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  if (isLoading) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !departmentData) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <p className="text-status-unused">Error loading department data</p>
      </div>
    );
  }

  const data = departmentData;

  const onClick = (_: unknown, index: number) => {
    console.log('Selected department:', data[index].name);
    // In production: trigger filter, show details, navigate to department view
  };

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
            outerRadius={activeIndex !== null ? 105 : 100} // Expand on hover
            paddingAngle={2} // Visual separation between segments
            dataKey="value" // Which field contains the numeric data
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
            onClick={onClick}
            style={{ cursor: 'pointer' }}
          >
            {/* 
              Cell mapping: Apply individual colors to each segment
              @pattern: Required by Recharts to color segments differently
              @key: Stable keys prevent unnecessary re-renders
              @opacity: Dim non-active segments on hover
            */}
            {data.map((_, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={activeIndex === index ? HOVER_COLOR : PRIMARY_COLOR}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#374151',
              border: '1px solid #6b7280',
              borderRadius: '8px',
              color: '#fef3c7',
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
