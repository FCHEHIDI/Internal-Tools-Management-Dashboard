import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Wrench, BarChart3, Settings, Menu, X, Bell, User, LogOut, HelpCircle, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import logo from '@/assets/logo.svg';
import { useUser } from '@/contexts/UserContext';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Tools', href: '/tools', icon: Wrench },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Header() {
  const location = useLocation();
  const { avatarUrl } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);
  const closeUserMenu = () => setIsUserMenuOpen(false);

  // Close user menu when clicking outside
  const handleUserMenuBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      closeUserMenu();
    }
  };

  return (
    <header className="border-b border-border bg-surface sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="TechCorp Logo" className="w-10 h-10" />
            <span className="font-bold text-lg bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(0,212,255,0.5)] animate-pulse">
              TechCorp
            </span>
          </Link>

          {/* Desktop Navigation */}
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

          {/* User Menu & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Notifications */}
            <div className="relative group">
              <button 
                className="relative p-2 hover:bg-surface-hover rounded-lg transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5 text-foreground-secondary" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-status-expiring rounded-full border-2 border-surface"></span>
              </button>
              <div className="absolute top-full right-0 mt-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
                Coming Soon
              </div>
            </div>

            {/* User Avatar Dropdown (Desktop) */}
            <div 
              className="hidden sm:block relative"
              onBlur={handleUserMenuBlur}
              tabIndex={-1}
            >
              <button 
                onClick={toggleUserMenu}
                className="flex items-center gap-2 p-1.5 hover:bg-surface-hover rounded-lg transition-colors"
                aria-label="User menu"
                aria-expanded={isUserMenuOpen}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-primary text-white flex items-center justify-center font-medium text-sm overflow-hidden">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    'FC'
                  )}
                </div>
                <ChevronDown className={cn(
                  "w-4 h-4 text-foreground-secondary transition-transform",
                  isUserMenuOpen && "rotate-180"
                )} />
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-surface border border-border rounded-lg shadow-lg py-2 z-50">
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-sm font-medium text-foreground">Fares Chehidi</p>
                    <p className="text-xs text-foreground-secondary mt-0.5">fares@techcorp.com</p>
                  </div>
                  
                  <div className="py-1">
                    <Link
                      to="/settings"
                      onClick={closeUserMenu}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-foreground-secondary hover:bg-surface-hover hover:text-foreground transition-colors"
                    >
                      <User className="w-4 h-4" />
                      Profile Settings
                    </Link>
                    <div className="relative group">
                      <button
                        onClick={closeUserMenu}
                        className="flex w-full items-center gap-3 px-4 py-2 text-sm text-foreground-secondary hover:bg-surface-hover hover:text-foreground transition-colors"
                      >
                        <HelpCircle className="w-4 h-4" />
                        Help & Support
                      </button>
                      <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
                        Coming Soon
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border pt-1 mt-1">
                    <button
                      onClick={() => {
                        closeUserMenu();
                        console.log('Logout clicked');
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-status-unused hover:bg-surface-hover transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="sm:hidden p-2 hover:bg-surface-hover rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <nav className="sm:hidden py-4 border-t border-border">
            {/* Mobile User Info */}
            <div className="px-4 py-3 mb-2 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-primary text-white flex items-center justify-center font-medium">
                  FC
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Fares Chehidi</p>
                  <p className="text-xs text-foreground-secondary">fares@techcorp.com</p>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-1 mb-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={closeMobileMenu}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors min-h-[44px]',
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground-secondary hover:bg-surface-hover hover:text-foreground'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Mobile User Actions */}
            <div className="border-t border-border pt-2 space-y-1">
              <Link
                to="/settings"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 px-4 py-3 text-base text-foreground-secondary hover:bg-surface-hover hover:text-foreground transition-colors min-h-[44px]"
              >
                <User className="w-5 h-5" />
                Profile Settings
              </Link>
              <button
                onClick={closeMobileMenu}
                className="w-full flex items-center gap-3 px-4 py-3 text-base text-foreground-secondary hover:bg-surface-hover hover:text-foreground transition-colors min-h-[44px]"
              >
                <HelpCircle className="w-5 h-5" />
                Help & Support
              </button>
              <button
                onClick={() => {
                  closeMobileMenu();
                  console.log('Logout clicked');
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-base text-status-unused hover:bg-surface-hover transition-colors min-h-[44px]"
              >
                <LogOut className="w-5 h-5" />
                Log Out
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
