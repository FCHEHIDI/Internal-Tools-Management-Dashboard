import { Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';

/**
 * ThemeSwitcher - Toggle component for dark/light theme switching.
 * 
 * @component
 * @returns {JSX.Element} Icon button that toggles between sun and moon
 * 
 * @features
 * - Persists preference to localStorage
 * - Respects system color scheme preference on first visit
 * - Smooth transitions via CSS (defined in index.css)
 * - Accessible with aria-label for screen readers
 * 
 * @architecture-consideration
 * Currently uses local state. For larger apps, consider:
 * - Zustand store: Shared theme state across components
 * - React Context: Theme provider wrapping entire app
 * - URL param: Allow sharing themed links (?theme=dark)
 * 
 * @production-enhancement
 * Could add:
 * - System preference listener (updates if OS theme changes)
 * - Auto theme based on time of day
 * - Multiple theme options (not just dark/light)
 */
export function ThemeSwitcher() {
  /**
   * Theme state: 'light' | 'dark'
   * 
   * @default 'dark' - Initial value before useEffect runs
   * @persistence localStorage key: 'theme'
   */
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  /**
   * Initialize theme on mount.
   * 
   * @effect Runs once on component mount (empty dependency array)
   * 
   * @logic Priority order:
   * 1. Check localStorage for saved preference
   * 2. Fall back to system preference (prefers-color-scheme media query)
   * 3. Default to 'light' if neither available (shouldn't happen)
   * 
   * @ux-principle Respecting user's system preferences creates a native feel
   */
  useEffect(() => {
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Determine initial theme
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  /**
   * Apply theme to DOM.
   * 
   * @param {('light' | 'dark')} newTheme - Theme to apply
   * @returns {void}
   * 
   * @implementation
   * Adds class to <html> element which triggers CSS variable changes.
   * All colors defined with CSS variables (--background, --foreground, etc.)
   * automatically update based on .light or .dark class.
   * 
   * @why-html-element
   * Applied to documentElement (html tag) instead of body because:
   * - Available before React app mounts (prevents flash)
   * - Affects entire document including portals
   * - Standard practice for theming systems
   */
  const applyTheme = (newTheme: 'light' | 'dark') => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newTheme);
  };

  /**
   * Toggle between themes.
   * 
   * @returns {void}
   * 
   * @flow
   * 1. Calculate opposite theme
   * 2. Update component state
   * 3. Apply to DOM
   * 4. Persist to localStorage
   * 
   * @note Order matters: Apply before persisting ensures visual update happens first
   */
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <Button
      variant="ghost" // Minimal styling to avoid stealing visual focus
      size="sm" // Compact size for header placement
      onClick={toggleTheme}
      className="h-9 w-9 p-0" // Square button, icon-only
      aria-label="Toggle theme" // Screen reader accessibility
    >
      {/* 
        Conditional icon rendering:
        @pattern: Show Sun when in dark mode (suggests switching to light)
        @ux-principle: Icon represents the result of the action, not current state
        @alternative-approach: Some apps show current state (Moon for dark mode)
        There's debate on this - we follow iOS/macOS convention
      */}
      {theme === 'dark' ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </Button>
  );
}
