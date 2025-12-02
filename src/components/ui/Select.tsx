import { cva, type VariantProps } from 'class-variance-authority';
import { SelectHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

const selectVariants = cva(
  'flex w-full appearance-none rounded-lg border bg-background px-3 py-2 text-sm text-foreground transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-border hover:border-primary/50',
        error: 'border-status-error focus-visible:ring-status-error',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement>,
    VariantProps<typeof selectVariants> {}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={cn(selectVariants({ variant, className }), 'pr-8')}
          ref={ref}
          {...props}
        />
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-secondary pointer-events-none" />
      </div>
    );
  }
);
Select.displayName = 'Select';

export { Select };
