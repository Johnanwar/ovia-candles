/**
 * Cart Content Component
 * Main cart functionality with items and summary
 */
'use client';

import { useCartContext } from '@/contexts/CartContext';
import { CartItem } from './CartItem';
import { CartSummary } from './CartSummary';
import { Button } from '@/components/common';
import Link from 'next/link';

interface CartContentProps {
  locale: string;
}

export const CartContent = ({ locale }: CartContentProps) => {
  const { cart, clearCart } = useCartContext();
  const isRTL = locale === 'ar';

  if (cart.items.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="mb-8">
          <svg 
            className="mx-auto h-24 w-24 text-[var(--color-text-tertiary)]" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" 
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-[var(--color-text)] mb-4">
          {isRTL ? 'سلة التسوق فارغة' : 'Your cart is empty'}
        </h3>
        <p className="text-[var(--color-text-secondary)] mb-8">
          {isRTL ? 'ابدأ التسوق لإضافة منتجات إلى سلة التسوق' : 'Start shopping to add products to your cart'}
        </p>
        <Link href={`/${locale}/products`}>
          <Button variant="primary" size="lg">
            {isRTL ? 'ابدأ التسوق' : 'Start Shopping'}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2">
        <div className="bg-[var(--color-background-secondary)] rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-[var(--color-text)]">
              {isRTL ? 'العناصر في السلة' : 'Cart Items'}
            </h2>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearCart}
              className="text-[var(--color-error)] hover:text-[var(--color-error)] hover:bg-[var(--color-error-light)]"
            >
              {isRTL ? 'مسح الكل' : 'Clear All'}
            </Button>
          </div>
          
          <div className="space-y-4">
            {cart.items.map((item) => (
              <CartItem 
                key={item.product.id} 
                item={item} 
                locale={locale}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Cart Summary */}
      <div className="lg:col-span-1">
        <CartSummary cart={cart} locale={locale} />
      </div>
    </div>
  );
};
