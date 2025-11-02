/**
 * Checkout Content Component
 * Client-side checkout functionality
 */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useCartContext } from '@/contexts/CartContext';
import { CheckoutForm, CheckoutFormData } from './CheckoutForm';
import { CartSummary } from '@/components/cart';
import { Button } from '@/components/common';
import { sendOrderEmail } from '@/app/actions/sendOrderEmail';
import Link from 'next/link';
import { toast } from 'sonner';

interface CheckoutContentProps {
  locale: string;
}

export const CheckoutContent = ({ locale }: CheckoutContentProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { cart, clearCart } = useCartContext();
  const router = useRouter();
  const t = useTranslations('checkout');
  const tCart = useTranslations('cart');

  const handleSubmit = async (formData: CheckoutFormData) => {
    if (cart.items.length === 0) {
      toast.error(t('orderError'));
      router.push(`/${locale}/cart`);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await sendOrderEmail(cart, formData, locale);

      if (result.success) {
        toast.success(t('orderPlaced'), {
          description: t('orderPlacedMessage'),
        });

        // Clear cart after successful order
        clearCart();

        // Redirect to home after successful order
        setTimeout(() => {
          router.push(`/${locale}`);
        }, 2000);
      } else {
        toast.error(t('orderError'), {
          description: result.message || t('orderErrorMessage'),
        });
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error(t('orderError'), {
        description: t('orderErrorMessage'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--color-background)]">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-[var(--color-text)] mb-4">
              {tCart('empty')}
            </h1>
            <p className="text-[var(--color-text-secondary)] mb-8">
              {tCart('emptyMessage')}
            </p>
            <Link href={`/${locale}/cart`}>
              <Button variant="primary" size="lg">
                {tCart('startShopping')}
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <Link href={`/${locale}/cart`}>
            <Button variant="outline" size="sm" className="mb-4">
              ← {t('backToCart')}
            </Button>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)]">
            {t('title')}
          </h1>
          <p className="text-sm sm:text-base text-[var(--color-text-secondary)] mt-1 sm:mt-2">
            {t('orderConfirmation')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <CheckoutForm
              locale={locale}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <CartSummary
              cart={cart}
              locale={locale}
              showButton={false}
              showPromoCode={false}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

