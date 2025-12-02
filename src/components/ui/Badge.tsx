import { HTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ToolStatus } from '@/types';

const badgeVariants = cva(
  'inline-flex items-center rounded-full font-medium transition-colors border',
  {
    variants: {
      variant: {
        active: 'bg-status-active/10 text-status-active border-status-active/20',
        expiring: 'bg-status-expiring/10 text-status-expiring border-status-expiring/20',
        unused: 'bg-status-unused/10 text-status-unused border-status-unused/20',
        default: 'bg-surface text-foreground-secondary border-border',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-sm',
        lg: 'px-3 py-1.5 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  status?: ToolStatus;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, status, children, ...props }, ref) => {
    const statusVariant = status === 'active' ? 'active' : status === 'expiring' ? 'expiring' : status === 'unused' ? 'unused' : variant;
    
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant: statusVariant, size, className }))}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
