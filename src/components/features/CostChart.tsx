import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { month: 'Jan', cost: 24500, budget: 26000 },
  { month: 'Feb', cost: 25200, budget: 26000 },
  { month: 'Mar', cost: 26800, budget: 27000 },
  { month: 'Apr', cost: 27500, budget: 28000 },
  { month: 'May', cost: 28200, budget: 29000 },
  { month: 'Jun', cost: 28750, budget: 30000 },
];

export function CostChart() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis 
            dataKey="month" 
            className="text-xs fill-foreground-secondary"
            stroke="hsl(var(--border))"
          />
          <YAxis 
            className="text-xs fill-foreground-secondary"
            stroke="hsl(var(--border))"
            tickFormatter={(value) => `€${value / 1000}k`}
          />
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
            wrapperStyle={{
              paddingTop: '20px',
              fontSize: '14px',
              color: 'hsl(var(--foreground-secondary))',
            }}
          />
          <Line
            type="monotone"
            dataKey="cost"
            name="Actual Cost"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--primary))', r: 4 }}
            activeDot={{ r: 6 }}
          />
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
