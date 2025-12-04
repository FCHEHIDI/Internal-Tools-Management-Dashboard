import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'gradient' | 'bordered';
  gradient?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'gold' | 'platinum' | 'sapphire' | 'ruby';
  borderColor?: 'gold' | 'platinum' | 'sapphire' | 'ruby';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', gradient, borderColor, children, ...props }, ref) => {
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
            gradient === 'gold' && 'bg-gradient-gold',
            gradient === 'platinum' && 'bg-gradient-platinum',
            gradient === 'sapphire' && 'bg-gradient-sapphire',
            gradient === 'ruby' && 'bg-gradient-ruby',
          ],
          variant === 'bordered' && [
            'bg-surface/50 backdrop-blur-sm border-2 shadow-md hover:shadow-lg',
            borderColor === 'gold' && 'border-[#d4af37] hover:border-[#b8860b]',
            borderColor === 'platinum' && 'border-[#e5e4e2] hover:border-[#9c9c9c]',
            borderColor === 'sapphire' && 'border-[#0f52ba] hover:border-[#0d47a1]',
            borderColor === 'ruby' && 'border-[#e0115f] hover:border-[#c41e3a]',
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
