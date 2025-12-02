import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Wrench, BarChart3, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeSwitcher } from '@/components/features/ThemeSwitcher';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Tools', href: '/tools', icon: Wrench },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Header() {
  const location = useLocation();

  return (
    <header className="border-b border-border bg-surface sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">IT</span>
            </div>
            <span className="font-bold text-foreground">TechCorp</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground-secondary hover:bg-surface-hover hover:text-foreground'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <button className="w-8 h-8 rounded-full bg-gradient-primary text-white flex items-center justify-center font-medium">
              FC
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
