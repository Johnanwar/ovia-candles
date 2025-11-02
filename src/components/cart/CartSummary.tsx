/**
 * Cart Summary Component
 * Order summary with totals and checkout functionality
 */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Cart } from '@/types';
import { Button } from '@/components/common';

interface CartSummaryProps {
  cart: Cart;
  locale: string;
  showButton?: boolean;
  showPromoCode?: boolean;
}

export const CartSummary = ({ cart, locale, showButton = true, showPromoCode = true }: CartSummaryProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const t = useTranslations('cart');

  const currency = cart.items.length > 0 ? cart.items[0].product.currency : 'EGP';
  
  const shippingThreshold = 500;
  const shippingCost = cart.total >= shippingThreshold ? 0 : 50;
  const tax = cart.total * 0.1;
  const finalTotal = cart.total + shippingCost + tax;

  const handleCheckout = () => {
    router.push(`/${locale}/checkout`);
  };

  return (
    <div className="bg-[var(--color-background-secondary)] rounded-xl p-4 sm:p-6 lg:sticky lg:top-8">
      <h2 className="text-xl font-semibold text-[var(--color-text)] mb-6">
        {t('orderSummary')}
      </h2>

      {/* Order Details */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-[var(--color-text-secondary)]">
            {t('items')}
          </span>
          <span className="text-[var(--color-text)] font-medium">
            {cart.itemCount} {cart.itemCount !== 1 ? t('itemsPlural') : t('item')}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-[var(--color-text-secondary)]">
            {t('subtotal')}
          </span>
          <span className="text-[var(--color-text)] font-medium">
            {cart.total.toLocaleString()} {currency}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-[var(--color-text-secondary)]">
            {t('shipping')}
          </span>
          <span className="text-[var(--color-text)] font-medium">
            {shippingCost === 0 ? (
              <span className="text-[var(--color-success)] font-semibold">
                {t('free')}
              </span>
            ) : (
              `${shippingCost.toLocaleString()} ${currency}`
            )}
          </span>
        </div>

        {shippingCost > 0 && (
          <div className="text-sm text-[var(--color-text-tertiary)] bg-[var(--color-primary-light)] p-2 rounded-lg">
            {t('freeShippingMessage', { 
              amount: `${(shippingThreshold - cart.total).toLocaleString()} ${currency}` 
            })}
          </div>
        )}

        <div className="flex justify-between items-center">
          <span className="text-[var(--color-text-secondary)]">
            {t('tax')}
          </span>
          <span className="text-[var(--color-text)] font-medium">
            {tax.toLocaleString()} {currency}
          </span>
        </div>

        <div className="border-t border-[var(--color-border)] pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-[var(--color-text)]">
              {t('total')}
            </span>
            <span className="text-xl sm:text-2xl font-bold text-[var(--color-primary)]">
              {finalTotal.toLocaleString()} {currency}
            </span>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      {showButton && (
        <Button
          variant="primary"
          size="lg"
          onClick={handleCheckout}
          disabled={isProcessing || cart.items.length === 0}
          className="w-full mb-4"
        >
          {isProcessing ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t('processing')}
            </div>
          ) : (
            t('proceedToCheckout')
          )}
        </Button>
      )}

      {/* Security Badge */}
      {/* <div className="text-center">
        <div className="flex items-center justify-center space-x-2 text-sm text-[var(--color-text-tertiary)]">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 1l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          <span>{isRTL ? 'دفع آمن ومحمي' : 'Secure & Protected Payment'}</span>
        </div>
      </div> */}

      {/* Promo Code */}
      {showPromoCode && (
        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-[var(--color-border)]">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder={t('promoCode')}
              className="flex-1 px-3 py-2 text-sm sm:text-base border border-[var(--color-border)] rounded-lg bg-[var(--color-background)] text-[var(--color-text)] placeholder-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
            />
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              {t('apply')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
