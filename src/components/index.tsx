/**
 * Shared UI Components
 * 
 * This file exports reusable components used across the application:
 * - Button: Styled button component with variants (primary, secondary, outline)
 * - Card: Container component with shadow and padding
 * - LanguageSwitcher: Toggle between English and Arabic
 * - CartIcon: Shopping cart icon with item count badge
 * 
 * Note: ProductCard component has been moved to src/components/ProductCard.tsx
 */
'use client';
import { ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/utils';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  disabled = false,
}: ButtonProps) => {
  const baseClasses = 'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <div className={cn('bg-white rounded-lg shadow-md p-6', className)}>
      {children}
    </div>
  );
};

// Language Switcher Component
interface LanguageSwitcherProps {
  currentLocale: string;
}

export const LanguageSwitcher = ({ currentLocale }: LanguageSwitcherProps) => {
  const isRTL = currentLocale === 'ar';
  
  const switchLanguage = () => {
    const newLocale = currentLocale === 'en' ? 'ar' : 'en';
    const currentPath = window.location.pathname;
    const pathWithoutLocale = currentPath.replace(/^\/[a-z]{2}/, '');
    window.location.href = `/${newLocale}${pathWithoutLocale}`;
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={switchLanguage}
      className="min-w-[60px]"
    >
      {isRTL ? 'EN' : 'عربي'}
    </Button>
  );
};

// Cart Icon Component
interface CartIconProps {
  itemCount: number;
  onClick: () => void;
}

export const CartIcon = ({ itemCount, onClick }: CartIconProps) => {
  return (
    <button
      onClick={onClick}
      className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
    >
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </button>
  );
};
