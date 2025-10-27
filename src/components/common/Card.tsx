/**
 * Card Component
 * Container component with shadow and padding
 */
'use client';
import { ReactNode } from 'react';
import { cn } from '@/utils';

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
