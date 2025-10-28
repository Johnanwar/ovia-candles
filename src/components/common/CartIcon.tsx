/**
 * Cart Icon Component
 * Shopping cart icon with item count badge
 * Uses theme system for consistent styling
 */
'use client';

interface CartIconProps {
  itemCount: number;
  onClick: () => void;
}

export const CartIcon = ({ itemCount, onClick }: CartIconProps) => {
  return (
    <button
      onClick={onClick}
      className="relative p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-all duration-200 hover:scale-110 rounded-lg hover:bg-[var(--color-background-secondary)]"
      aria-label={`Shopping cart with ${itemCount} items`}
    >
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-[var(--color-error)] text-[var(--color-text-inverse)] text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium shadow-sm animate-pulse">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </button>
  );
};
