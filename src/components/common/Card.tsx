/**
 * Card Component
 * Container component with shadow and padding
 * Uses theme system for consistent styling
 */
'use client';
import { ReactNode } from 'react';
import { cn } from '@/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined';
}

export const Card = ({ children, className, variant = 'default' }: CardProps) => {
  const variantClasses = {
    default: 'bg-[var(--color-background)] border border-[var(--color-border)] shadow-sm',
    elevated: 'bg-[var(--color-background)] shadow-md hover:shadow-lg',
    outlined: 'bg-[var(--color-background)] border border-[var(--color-border-secondary)]',
  };

  return (
    <div className={cn(
      'rounded-lg p-6 transition-all duration-200',
      variantClasses[variant],
      className
    )}>
      {children}
    </div>
  );
};
