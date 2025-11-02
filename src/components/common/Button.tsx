/**
 * Button Component
 * Styled button with variants (primary, secondary, outline) and sizes (sm, md, lg)
 * Uses theme system for consistent styling
 */
'use client';
import { ReactNode } from 'react';
import { cn } from '@/utils';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  disabled = false,
  type = 'button',
}: ButtonProps) => {
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-[var(--color-primary)] text-[var(--color-text-inverse)] hover:bg-[var(--color-primary-hover)] focus:ring-[var(--color-primary)] active:bg-[var(--color-primary-active)] shadow-sm hover:shadow-md',
    secondary: 'bg-[var(--color-secondary)] text-[var(--color-text-inverse)] hover:bg-[var(--color-secondary-hover)] focus:ring-[var(--color-secondary)] active:bg-[var(--color-secondary-active)] shadow-sm hover:shadow-md',
    outline: 'border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-background-secondary)] focus:ring-[var(--color-primary)] active:bg-[var(--color-background-tertiary)]',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      type={type}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
