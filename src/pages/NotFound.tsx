import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
        <p className="text-xl text-foreground-secondary mb-8">Page not found</p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
