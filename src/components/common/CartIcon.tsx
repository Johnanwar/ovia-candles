/**
 * Enhanced Cart Icon Component
 * Modern shopping cart icon with item count badge and smooth animations
 * Uses theme system for consistent styling with gold brand colors
 */
'use client';

import { useState, useEffect } from 'react';

interface CartIconProps {
  itemCount: number;
  onClick: () => void;
  className?: string;
}

export const CartIcon = ({ itemCount, onClick, className = '' }: CartIconProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [previousCount, setPreviousCount] = useState(itemCount);

  // Trigger animation when item count changes
  useEffect(() => {
    if (itemCount !== previousCount && itemCount > previousCount) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 600);
    }
    setPreviousCount(itemCount);
  }, [itemCount, previousCount]);


  return (
    <button
      onClick={onClick}
      className={`group relative p-3 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-all duration-300 hover:scale-110 rounded-xl hover:bg-[var(--color-primary-light)] border border-transparent hover:border-[var(--color-primary)] hover:shadow-lg ${className}`}
      aria-label={`Shopping cart with ${itemCount} items`}
    >
      {/* Enhanced Cart SVG Icon */}
      <svg 
        className={`h-6 w-6 transition-all duration-300 group-hover:scale-110 ${isAnimating ? 'animate-bounce' : ''}`} 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        strokeWidth={2}
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" 
        />
      </svg>

      {/* Enhanced Badge */}
      {itemCount > 0 && (
        <span 
          className={`absolute -top-2 -right-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-hover)] text-[var(--color-text-inverse)] text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg border-2 border-[var(--color-background)] transition-all duration-300 ${
            isAnimating ? 'animate-pulse scale-125' : 'scale-100'
          }`}
        >
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}

      {/* Subtle glow effect on hover */}
      <div className="absolute inset-0 rounded-xl bg-[var(--color-primary)] opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
    </button>
  );
};
