import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'gradient';
  gradient?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', gradient, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg transition-shadow',
          variant === 'default' &&
            'bg-surface border border-border shadow-md hover:shadow-lg',
          variant === 'gradient' && [
            'text-white border-0 shadow-lg',
            gradient === 'primary' && 'bg-gradient-primary',
            gradient === 'success' && 'bg-gradient-success',
            gradient === 'warning' && 'bg-gradient-warning',
            gradient === 'danger' && 'bg-gradient-danger',
            gradient === 'info' && 'bg-gradient-info',
          ],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pb-4', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('text-h4 font-semibold', className)} {...props} />
  )
);
CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-foreground-secondary mt-1', className)} {...props} />
));
CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
);
CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-4 flex items-center gap-4', className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';
