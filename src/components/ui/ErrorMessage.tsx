import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message?: string;
  className?: string;
}

/**
 * Reusable error message component for consistent error display
 */
export function ErrorMessage({ 
  message = 'An error occurred. Please try again.', 
  className = '' 
}: ErrorMessageProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-8 ${className}`}>
      <AlertCircle className="w-12 h-12 text-status-unused mb-3" />
      <p className="text-status-unused text-center">{message}</p>
    </div>
  );
}
