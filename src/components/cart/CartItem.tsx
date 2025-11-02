/**
 * Cart Item Component
 * Individual cart item with quantity controls and remove functionality
 */
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useCartContext } from '@/contexts/CartContext';
import { Button } from '@/components/common';
import { CartItem as CartItemType } from '@/types';
import Link from 'next/link';
import Image from 'next/image';

interface CartItemProps {
  item: CartItemType;
  locale: string;
}

export const CartItem = ({ item, locale }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCartContext();
  const [isUpdating, setIsUpdating] = useState(false);
  const t = useTranslations('cart');
  const isRTL = locale === 'ar';

  const handleQuantityChange = async (newQuantity: number) => {
    if (isUpdating) return;
    
    setIsUpdating(true);
    updateQuantity(item.product.id, newQuantity);
    
    setTimeout(() => setIsUpdating(false), 200);
  };

  const handleRemove = () => {
    removeFromCart(item.product.id);
  };

  const productName = isRTL ? item.product.nameAr : item.product.name;
  const productDescription = isRTL ? item.product.descriptionAr : item.product.description;

  return (
    <div className="bg-[var(--color-background)] rounded-lg p-4 sm:p-6 border border-[var(--color-border)] hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col sm:flex-row items-start gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0 w-full sm:w-auto">
          <Link href={`/${locale}/products/${item.product.id}`}>
            <div className="relative w-full sm:w-20 h-48 sm:h-20 rounded-lg overflow-hidden bg-[var(--color-background-secondary)]">
              {(item.product.images && item.product.images.length > 0) || item.product.image ? (
                <Image
                  src={item.product.images?.[0] || item.product.image}
                  alt={productName}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-200"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[var(--color-text-tertiary)]">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
              )}
            </div>
          </Link>
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0 w-full">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1 min-w-0">
              <Link href={`/${locale}/products/${item.product.id}`}>
                <h3 className="text-base sm:text-lg font-semibold text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors duration-200 line-clamp-2">
                  {productName}
                </h3>
              </Link>
              
              {productDescription && (
                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1 line-clamp-2">
                  {productDescription}
                </p>
              )}

              <div className="flex flex-wrap items-center mt-2 sm:mt-3 gap-2">
                <span className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
                  {t('price')}
                </span>
                <span className="text-base sm:text-lg font-bold text-[var(--color-primary)]">
                  {item.product.price.toLocaleString()} {item.product.currency}
                </span>
                {item.product.originalPrice && (
                  <span className="text-xs sm:text-sm text-[var(--color-text-tertiary)] line-through">
                    {item.product.originalPrice.toLocaleString()} {item.product.currency}
                  </span>
                )}
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 sm:gap-2">
              {/* Quantity Selector */}
              <div className="flex items-center border border-[var(--color-border)] rounded-lg overflow-hidden">
                <button
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  disabled={isUpdating || item.quantity <= 1}
                  className="px-3 py-2 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-light)] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label={t('decreaseQuantity')}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                
                <span className="px-4 py-2 text-[var(--color-text)] font-medium min-w-[3rem] text-center border-x border-[var(--color-border)]">
                  {item.quantity}
                </span>
                
                <button
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  disabled={isUpdating}
                  className="px-3 py-2 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-light)] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label={t('increaseQuantity')}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>

              {/* Remove Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleRemove}
                className="text-[var(--color-error)] hover:text-[var(--color-error)] hover:bg-[var(--color-error-light)] border-[var(--color-error)] hover:border-[var(--color-error)] whitespace-nowrap"
              >
                <svg className="w-4 h-4 sm:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span className="hidden sm:inline">{t('remove')}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Item Total */}
      <div className="mt-4 pt-4 border-t border-[var(--color-border)] flex justify-between items-center">
        <span className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
          {t('subtotal')}
        </span>
        <span className="text-lg sm:text-xl font-bold text-[var(--color-primary)]">
          {(item.product.price * item.quantity).toLocaleString()} {item.product.currency}
        </span>
      </div>
    </div>
  );
};
