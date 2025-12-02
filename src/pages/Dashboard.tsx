export function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-h1 font-bold text-foreground">Dashboard</h1>
        <p className="text-foreground-secondary mt-2">
          Welcome to the Internal Tools Management Dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI Cards will go here */}
        <div className="bg-gradient-primary rounded-lg p-6 text-white">
          <h3 className="text-sm font-medium opacity-90">Total Budget</h3>
          <p className="text-3xl font-bold mt-2">€28,750</p>
          <p className="text-sm mt-2 opacity-75">+12% from last month</p>
        </div>
      </div>
    </div>
  );
}
