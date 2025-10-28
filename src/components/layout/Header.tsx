/**
 * Header Component
 * Application header with theme switcher, language switcher, and cart icon
 * Uses theme system for consistent styling
 */
'use client';

import { LanguageSwitcher, CartIcon, ThemeSwitcher } from '@/components/common';
import { useCart } from '@/hooks';
import Link from 'next/link';

interface HeaderProps {
  locale: string;
}

export const Header = ({ locale }: HeaderProps) => {
  const { cart } = useCart();

  return (
    <header className="bg-[var(--color-background)] border-b border-[var(--color-border)] shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href={`/${locale}`} className="text-xl font-bold text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors duration-200">
              Ovia Candles
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeSwitcher />
            <LanguageSwitcher currentLocale={locale} />
            <CartIcon 
              itemCount={cart.itemCount} 
              onClick={() => {/* TODO: Open cart modal */}} 
            />
          </div>
        </div>
      </div>
    </header>
  );
};
