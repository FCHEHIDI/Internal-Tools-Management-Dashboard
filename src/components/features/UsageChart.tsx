import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Slack', users: 156, cost: 5890 },
  { name: 'GitHub', users: 124, cost: 4250 },
  { name: 'Figma', users: 89, cost: 3780 },
  { name: 'Jira', users: 78, cost: 3200 },
  { name: 'Notion', users: 145, cost: 2950 },
  { name: 'Zoom', users: 156, cost: 2750 },
];

const colors = [
  'hsl(var(--primary))',
  'hsl(var(--success))',
  'hsl(var(--warning))',
  'hsl(var(--info))',
  'hsl(var(--danger))',
  'hsl(var(--purple))',
];

export function UsageChart() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" horizontal={false} />
          <XAxis 
            type="number"
            className="text-xs fill-foreground-secondary"
            stroke="hsl(var(--border))"
          />
          <YAxis 
            type="category"
            dataKey="name"
            className="text-xs fill-foreground-secondary"
            stroke="hsl(var(--border))"
            width={80}
          />
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
