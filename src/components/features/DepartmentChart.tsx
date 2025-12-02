import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Engineering', value: 12500, color: 'hsl(var(--primary))' },
  { name: 'Sales', value: 8200, color: 'hsl(var(--success))' },
  { name: 'Marketing', value: 4800, color: 'hsl(var(--warning))' },
  { name: 'Design', value: 2100, color: 'hsl(var(--info))' },
  { name: 'Support', value: 1150, color: 'hsl(var(--danger))' },
];

export function DepartmentChart() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelStyle={{
              fontSize: '12px',
              fill: 'hsl(var(--foreground))',
            }}
          >
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
