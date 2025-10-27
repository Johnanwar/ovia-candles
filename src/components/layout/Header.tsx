'use client';

import { LanguageSwitcher, CartIcon } from '@/components/common';
import { useCart } from '@/hooks';
import Link from 'next/link';

interface HeaderProps {
  locale: string;
}

export const Header = ({ locale }: HeaderProps) => {
  const { cart } = useCart();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href={`/${locale}`} className="text-xl font-bold text-gray-900">
              Ovia Candles
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
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
